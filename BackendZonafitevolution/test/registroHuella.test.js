const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const biometriaService = require('../src/services/biometria.service');
const As608Lector = require('../src/hardware/as608Lector.adapter');

test('el lector informa las etapas de registro en orden', async (prueba) => {
  const lector = new As608Lector({ puerto: 'prueba' });
  const etapas = [];
  const buffers = [];
  prueba.mock.method(lector, 'conectar', async () => {});
  prueba.mock.method(lector, 'leerHuellaEnBuffer', async (bufferId) => { buffers.push(bufferId); });
  prueba.mock.method(lector, 'buscar', async () => null);
  prueba.mock.method(lector, 'esperarSinDedo', async () => {});
  prueba.mock.method(lector, 'enviar', async () => Buffer.from([0]));
  prueba.mock.method(lector, 'buscarPaginaLibre', async () => 1);
  prueba.mock.method(lector, 'templateDePagina', () => 'plantilla');

  const resultado = await lector.registrar(undefined, etapa => etapas.push(etapa));
  assert.equal(resultado, 'plantilla');
  assert.deepEqual(buffers, [1, 2]);
  assert.deepEqual(etapas, ['conectando', 'primera', 'retirar', 'segunda', 'procesando']);
});

test('el estado de registro está protegido y aislado por usuario', async (prueba) => {
  process.env.JWT_SECRET ||= 'secreto-de-prueba';
  const token = jwt.sign({ id: 7001, rol_id: 2 }, process.env.JWT_SECRET);
  const otroToken = jwt.sign({ id: 7002, rol_id: 2 }, process.env.JWT_SECRET);
  const capturaId = '12345678-1234-1234-1234-123456789abc';
  let iniciar;
  let terminar;
  const iniciada = new Promise(resolve => { iniciar = resolve; });
  const pendiente = new Promise(resolve => { terminar = resolve; });
  prueba.mock.method(biometriaService, 'registrarHuella', async (datos, alCambiarEtapa) => {
    assert.equal(datos.captura_id, capturaId);
    alCambiarEtapa('retirar');
    iniciar();
    await pendiente;
    return { mensaje: 'Huella registrada correctamente' };
  });

  const servidor = app.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  prueba.after(() => new Promise(resolve => servidor.close(resolve)));
  const base = `http://127.0.0.1:${servidor.address().port}/api/biometria`;
  const estado = `${base}/registro/estado/${capturaId}`;
  const cabeceras = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const registro = fetch(`${base}/registrar`, {
    method: 'POST', headers: cabeceras, body: JSON.stringify({ cliente_id: 1, captura_id: capturaId })
  });
  await iniciada;
  try {
    const propia = await fetch(estado, { headers: cabeceras });
    assert.deepEqual(await propia.json(), { etapa: 'retirar' });
    const ajena = await fetch(estado, { headers: { Authorization: `Bearer ${otroToken}` } });
    assert.deepEqual(await ajena.json(), { etapa: 'preparando' });
    const anonima = await fetch(estado);
    assert.equal(anonima.status, 401);
  } finally {
    terminar();
    assert.equal((await registro).status, 201);
  }
});