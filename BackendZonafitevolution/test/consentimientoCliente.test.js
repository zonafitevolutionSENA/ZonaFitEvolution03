// Consentimientos del cliente (Ley 1581, CR-010): para registrar debe aceptar los términos y el tratamiento
// de datos; los avisos por correo son opcionales. El repositorio es un mock: no se usa base de datos.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const clienteService = require('../src/services/cliente.service');
const clienteRepository = require('../src/repositories/cliente.repository');
const Cliente = require('../src/models/cliente.model');

const DATOS = { nombre: 'Ana Pérez', cedula: '1234567', correo: 'ANA@Correo.com ', telefono: null };

function prepararRegistro(t) {
  t.mock.method(clienteRepository, 'obtenerPorCedula', async () => null);
  t.mock.method(clienteRepository, 'obtenerPorId', async () => new Cliente({ id: 7, ...DATOS }));
  return t.mock.method(clienteRepository, 'crear', async () => 7);
}

describe('registro con consentimientos', () => {
  test('sin aceptar los términos no se registra', async (t) => {
    const crear = prepararRegistro(t);
    for (const acepta_terminos of [undefined, false]) {
      await assert.rejects(clienteService.registrarCliente({ ...DATOS, acepta_terminos }), {
        status: 400, message: /aceptar los términos y el tratamiento de datos/
      });
    }
    assert.equal(crear.mock.callCount(), 0);
  });

  test('los consentimientos deben ser booleanos, no texto', async (t) => {
    prepararRegistro(t);
    await assert.rejects(clienteService.registrarCliente({ ...DATOS, acepta_terminos: 'true' }), { status: 400, message: /verdadero o falso/ });
    await assert.rejects(clienteService.registrarCliente({ ...DATOS, acepta_terminos: true, acepta_avisos: 1 }), { status: 400, message: /verdadero o falso/ });
  });

  test('con los términos aceptados se registra; los avisos quedan desactivados si no los acepta', async (t) => {
    const crear = prepararRegistro(t);
    await clienteService.registrarCliente({ ...DATOS, acepta_terminos: true });
    assert.equal(crear.mock.calls[0].arguments[0].aceptaAvisos, false);
    assert.equal(crear.mock.calls[0].arguments[0].correo, 'ana@correo.com');
  });

  test('si acepta los avisos, se registran junto con los términos', async (t) => {
    const crear = prepararRegistro(t);
    await clienteService.registrarCliente({ ...DATOS, acepta_terminos: true, acepta_avisos: true });
    assert.equal(crear.mock.calls[0].arguments[0].aceptaAvisos, true);
  });
});

describe('edición de consentimientos', () => {
  function prepararEdicion(t, existente) {
    t.mock.method(clienteRepository, 'obtenerPorId', async () => new Cliente({ id: 7, ...DATOS, ...existente }));
    return t.mock.method(clienteRepository, 'actualizar', async () => true);
  }

  test('un cliente antiguo sin términos no puede activar avisos sin aceptarlos', async (t) => {
    const actualizar = prepararEdicion(t, { terminos_aceptados_en: null });
    await assert.rejects(clienteService.actualizarCliente(7, { ...DATOS, acepta_avisos: true }), {
      status: 400, message: /aceptar primero los términos/
    });
    assert.equal(actualizar.mock.callCount(), 0);
  });

  test('un cliente antiguo puede aceptar términos y avisos al editar', async (t) => {
    const actualizar = prepararEdicion(t, { terminos_aceptados_en: null });
    await clienteService.actualizarCliente(7, { ...DATOS, acepta_terminos: true, acepta_avisos: true });
    const cambios = actualizar.mock.calls[0].arguments[1];
    assert.equal(cambios.aceptaTerminos, true);
    assert.equal(cambios.aceptaAvisos, true);
  });

  test('los avisos se pueden retirar, y si no se envían no cambian', async (t) => {
    const actualizar = prepararEdicion(t, { terminos_aceptados_en: new Date(), avisos_aceptados_en: new Date() });
    await clienteService.actualizarCliente(7, { ...DATOS, acepta_avisos: false });
    assert.equal(actualizar.mock.calls[0].arguments[1].aceptaAvisos, false);
    await clienteService.actualizarCliente(7, { ...DATOS });
    assert.equal(actualizar.mock.calls[1].arguments[1].aceptaAvisos, undefined);
  });

  test('el modelo expone los consentimientos como booleanos y sus fechas como constancia', () => {
    const fecha = new Date('2026-11-24T13:00:00');
    const cliente = new Cliente({ id: 1, ...DATOS, terminos_aceptados_en: fecha, avisos_aceptados_en: null });
    assert.equal(cliente.acepta_terminos, true);
    assert.equal(cliente.acepta_avisos, false);
    assert.equal(cliente.terminos_aceptados_en, fecha);
    assert.equal(cliente.avisos_aceptados_en, null);
  });
});
