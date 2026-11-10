const { test } = require('node:test');
const assert = require('node:assert/strict');
const As608Lector = require('../src/hardware/as608Lector.adapter');
const LectorBiometrico = require('../src/hardware/lectorBiometrico.interface');
const biometriaRepository = require('../src/repositories/biometria.repository');
const biometriaService = require('../src/services/biometria.service');

// Lector con el sensor simulado: `encontradas` dice qué devuelve cada búsqueda, en orden
function lectorDePrueba(prueba, encontradas) {
  const lector = new As608Lector({ puerto: 'prueba' });
  const comandos = [];
  const busquedas = [];
  prueba.mock.method(lector, 'conectar', async () => {});
  prueba.mock.method(lector, 'leerHuellaEnBuffer', async () => {});
  prueba.mock.method(lector, 'esperarSinDedo', async () => {});
  prueba.mock.method(lector, 'buscar', async (bufferId) => {
    busquedas.push(bufferId);
    return encontradas.shift() ?? null;
  });
  prueba.mock.method(lector, 'enviar', async (comando) => {
    comandos.push(comando);
    return Buffer.from([0]);
  });
  prueba.mock.method(lector, 'buscarPaginaLibre', async () => 9);
  prueba.mock.method(lector, 'templateDePagina', (pagina) => `pagina-${pagina}`);
  return { lector, comandos, busquedas };
}

const STORE = 0x06;

test('no guarda una huella que el sensor reconoce en la segunda lectura', async (prueba) => {
  const { lector, comandos, busquedas } = lectorDePrueba(prueba, [null, 4]);
  const resultado = await lector.registrar();
  assert.equal(resultado, 'pagina-4');
  assert.deepEqual(busquedas, [1, 2]);
  assert.ok(!comandos.includes(STORE));
});

test('no vuelve a buscar con la plantilla combinada (el AS608 responde 0x17 sin imagen nueva)', async (prueba) => {
  const { lector, busquedas } = lectorDePrueba(prueba, [null, null]);
  await lector.registrar();
  assert.deepEqual(busquedas, [1, 2]);
});

test('el código 0x17 del lector se informa con un mensaje claro', async () => {
  const lector = new As608Lector({ puerto: 'prueba' });
  lector.enviar = async () => Buffer.from([0x17]);
  await assert.rejects(lector.buscar(1), /no detectó un dedo nuevo/);
});

test('guarda en una posición libre la huella que no está en el sensor', async (prueba) => {
  const { lector, comandos, busquedas } = lectorDePrueba(prueba, [null, null]);
  const resultado = await lector.registrar();
  assert.equal(resultado, 'pagina-9');
  assert.deepEqual(busquedas, [1, 2]);
  assert.ok(comandos.includes(STORE));
});

test('el lector borra del sensor la posición que corresponde al template', async (prueba) => {
  const lector = new As608Lector({ puerto: 'prueba' });
  lector.capacidad = 10;
  const enviados = [];
  prueba.mock.method(lector, 'conectar', async () => {});
  prueba.mock.method(lector, 'templateDePagina', (pagina) => `pagina-${pagina}`);
  prueba.mock.method(lector, 'enviar', async (comando, parametros) => {
    enviados.push([comando, ...parametros]);
    return Buffer.from([0]);
  });

  assert.equal(await lector.eliminar('pagina-7'), true);
  assert.deepEqual(enviados, [[0x0c, 0x00, 0x07, 0x00, 0x01]]);
  assert.equal(await lector.eliminar('no-existe'), false);
  assert.equal(enviados.length, 1);
});

test('eliminar la huella de un cliente la borra del lector antes que de la base de datos', async (prueba) => {
  const orden = [];
  prueba.mock.method(biometriaRepository, 'obtenerPorClienteId', async () => ({ template_hash: 'pagina-3' }));
  prueba.mock.method(biometriaRepository, 'eliminarPorClienteId', async () => {
    orden.push('base de datos');
    return true;
  });
  for (const Clase of [As608Lector, LectorBiometrico]) {
    prueba.mock.method(Clase.prototype, 'eliminar', async (template) => {
      orden.push(`lector:${template}`);
      return true;
    });
  }

  await biometriaService.eliminarHuella('12');
  assert.deepEqual(orden, ['lector:pagina-3', 'base de datos']);
});

test('si el lector no puede borrar la huella, la base de datos no cambia', async (prueba) => {
  const eliminarBD = prueba.mock.method(biometriaRepository, 'eliminarPorClienteId', async () => true);
  prueba.mock.method(biometriaRepository, 'obtenerPorClienteId', async () => ({ template_hash: 'pagina-3' }));
  for (const Clase of [As608Lector, LectorBiometrico]) {
    prueba.mock.method(Clase.prototype, 'eliminar', async () => {
      throw new Error('lector desconectado');
    });
  }

  await assert.rejects(biometriaService.eliminarHuella('12'), /lector desconectado/);
  assert.equal(eliminarBD.mock.callCount(), 0);
});
