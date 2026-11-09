const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const app = require('../src/app');
const biometriaService = require('../src/services/biometria.service');
const accesoFisicoService = require('../src/services/accesoFisico.service');
const As608Lector = require('../src/hardware/as608Lector.adapter');
const ErrorDominio = require('../src/utils/errores');

test('pantalla de ingreso local', async (contexto) => {
  const servidor = app.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  contexto.after(() => new Promise(resolve => servidor.close(resolve)));
  const base = `http://127.0.0.1:${servidor.address().port}/api/acceso-fisico`;
  const cabeceras = { Origin: 'http://127.0.0.1:5173', 'Content-Type': 'application/json' };

  await contexto.test('acepta solo el origen local y mantiene protegido el historial', async (prueba) => {
    prueba.mock.method(biometriaService, 'obtenerInfoLector', () => ({ requiereIdentificador: true }));
    const local = await fetch(`${base}/pantalla/lector`, { headers: cabeceras });
    assert.equal(local.status, 200);
    assert.deepEqual(await local.json(), { requiereIdentificador: true });
    const externo = await fetch(`${base}/pantalla/lector`, { headers: { Origin: 'https://externo.example' } });
    assert.equal(externo.status, 403);
    const historial = await fetch(`${base}/historial`, { headers: cabeceras });
    assert.equal(historial.status, 401);
  });

  await contexto.test('valida sin sesión y no expone la cédula', async (prueba) => {
    prueba.mock.method(biometriaService, 'obtenerInfoLector', () => ({ requiereIdentificador: true }));
    prueba.mock.method(accesoFisicoService, 'validarAcceso', async (datos) => {
      assert.equal(datos.identificadorSimulado, 'dedo_prueba');
      return { cliente: { id: 1, nombre: 'Cliente Prueba', cedula: '123456' }, permitido: true, motivo: 'Membresía activa y vigente' };
    });
    const respuesta = await fetch(`${base}/pantalla/validar`, {
      method: 'POST', headers: cabeceras, body: JSON.stringify({ identificadorSimulado: 'dedo_prueba' })
    });
    assert.equal(respuesta.status, 200);
    assert.deepEqual(await respuesta.json(), {
      cliente: { nombre: 'Cliente Prueba' }, permitido: true, motivo: 'Membresía activa y vigente'
    });
  });

  await contexto.test('rechaza lecturas simultáneas', async (prueba) => {
    prueba.mock.method(biometriaService, 'obtenerInfoLector', () => ({ requiereIdentificador: true }));
    let inicio;
    let terminar;
    const iniciada = new Promise(resolve => { inicio = resolve; });
    const pendiente = new Promise(resolve => { terminar = resolve; });
    prueba.mock.method(accesoFisicoService, 'validarAcceso', async () => {
      inicio();
      return pendiente;
    });
    const opciones = { method: 'POST', headers: cabeceras, body: JSON.stringify({ identificadorSimulado: 'dedo_prueba' }) };
    const primera = fetch(`${base}/pantalla/validar`, opciones);
    await iniciada;
    try {
      const segunda = await fetch(`${base}/pantalla/validar`, opciones);
      assert.equal(segunda.status, 409);
    } finally {
      terminar({ cliente: null, permitido: false, motivo: 'Prueba' });
      await primera;
    }
  });

  await contexto.test('cancela la lectura cuando se cierra la pantalla', async (prueba) => {
    prueba.mock.method(biometriaService, 'obtenerInfoLector', () => ({ requiereIdentificador: false }));
    let inicio;
    let avisoCancelacion;
    const iniciada = new Promise(resolve => { inicio = resolve; });
    const cancelada = new Promise(resolve => { avisoCancelacion = resolve; });
    prueba.mock.method(accesoFisicoService, 'validarAcceso', async ({ signal }) => {
      inicio();
      return new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => {
          avisoCancelacion();
          reject(new ErrorDominio('Lectura cancelada', 499));
        }, { once: true });
      });
    });
    const controlador = new AbortController();
    const solicitud = fetch(`${base}/pantalla/validar`, {
      method: 'POST', headers: cabeceras, body: '{}', signal: controlador.signal
    }).catch(error => error);
    await iniciada;
    controlador.abort();
    await cancelada;
    assert.equal((await solicitud).name, 'AbortError');
  });
});

test('el sensor exige retirar el dedo y admite cancelar la espera', async (prueba) => {
  const lector = new As608Lector({ puerto: 'prueba' });
  let retiros = 0;
  prueba.mock.method(lector, 'conectar', async () => {});
  prueba.mock.method(lector, 'leerHuellaEnBuffer', async () => {});
  prueba.mock.method(lector, 'esperarSinDedo', async () => { retiros++; });
  prueba.mock.method(lector, 'buscar', async () => 1);
  prueba.mock.method(lector, 'templateDePagina', () => 'plantilla');
  await lector.capturar();
  await lector.capturar();
  assert.equal(retiros, 1);
  const controlador = new AbortController();
  controlador.abort();
  await assert.rejects(lector.capturar(undefined, controlador.signal), /cancelada/);
});