// Un solo ingreso por día en cualquier plan (CR-008), con ventana de 30 minutos para lecturas repetidas.
// Los repositorios y el lector se reemplazan con mocks, así no se necesita base de datos ni sensor.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const accesoFisicoService = require('../src/services/accesoFisico.service');
const biometriaService = require('../src/services/biometria.service');
const membresiaRepository = require('../src/repositories/membresia.repository');
const registroAccesoRepository = require('../src/repositories/registroAcceso.repository');
const { hoyISO, sumarDias } = require('../src/utils/fechas');

const hoy = hoyISO();
const cliente = { id: 5, nombre: 'Socio de prueba', cedula: '900000001' };
const mensual = { id: 20, estado: 'activa', fecha_inicio: hoy, fecha_fin: sumarDias(hoy, 30), ingresos_totales: null };
const tiquetera = {
  id: 21, estado: 'activa', fecha_inicio: hoy, fecha_fin: sumarDias(hoy, 20),
  ingresos_totales: 6, ingresos_usados: 2, duracion_dias: 30, fecha_ultimo_ingreso: sumarDias(hoy, -3)
};

function prepararMocks(t, { membresia, ingresoDeHoy }) {
  t.mock.method(biometriaService, 'identificarPorHuella', async () => cliente);
  t.mock.method(membresiaRepository, 'obtenerUltimaPorCliente', async () => membresia);
  t.mock.method(registroAccesoRepository, 'obtenerPrimerIngresoDeHoy', async () => ingresoDeHoy);
  return {
    crear: t.mock.method(registroAccesoRepository, 'crear', async () => 1),
    consumir: t.mock.method(membresiaRepository, 'consumirIngreso', async () => true)
  };
}

describe('un solo ingreso por día (CR-008)', () => {
  test('primer ingreso del día con plan por tiempo: permitido y registrado', async (t) => {
    const { crear } = prepararMocks(t, { membresia: mensual, ingresoDeHoy: null });
    const r = await accesoFisicoService.validarAcceso();
    assert.equal(r.permitido, true);
    assert.equal(crear.mock.callCount(), 1);
    assert.equal(crear.mock.calls[0].arguments[0].resultado, 'permitido');
  });

  test('lectura repetida dentro de 30 minutos: mismo ingreso, sin registrar otro', async (t) => {
    const { crear } = prepararMocks(t, { membresia: mensual, ingresoDeHoy: { hora: '06:15', minutos: 4 } });
    const r = await accesoFisicoService.validarAcceso();
    assert.equal(r.permitido, true);
    assert.equal(r.motivo, 'Ingreso ya registrado hoy a las 06:15');
    assert.equal(crear.mock.callCount(), 0);
  });

  test('segundo ingreso pasados 30 minutos: denegado y registrado', async (t) => {
    const { crear } = prepararMocks(t, { membresia: mensual, ingresoDeHoy: { hora: '06:15', minutos: 30 } });
    const r = await accesoFisicoService.validarAcceso();
    assert.equal(r.permitido, false);
    assert.equal(r.motivo, 'Ya ingresó hoy a las 06:15: solo se permite un ingreso por día');
    assert.equal(crear.mock.calls[0].arguments[0].resultado, 'denegado');
  });

  test('tiquetera: el primer ingreso del día descuenta un ingreso', async (t) => {
    const { consumir } = prepararMocks(t, { membresia: { ...tiquetera }, ingresoDeHoy: null });
    const r = await accesoFisicoService.validarAcceso();
    assert.equal(r.permitido, true);
    assert.equal(consumir.mock.callCount(), 1);
    assert.equal(r.ingresos_restantes, 3);
  });

  test('tiquetera: lectura repetida no descuenta y un segundo ingreso se niega sin descontar', async (t) => {
    let mocks = prepararMocks(t, { membresia: { ...tiquetera }, ingresoDeHoy: { hora: '07:00', minutos: 10 } });
    assert.equal((await accesoFisicoService.validarAcceso()).permitido, true);
    assert.equal(mocks.consumir.mock.callCount(), 0);

    t.mock.restoreAll();
    mocks = prepararMocks(t, { membresia: { ...tiquetera }, ingresoDeHoy: { hora: '07:00', minutos: 95 } });
    assert.equal((await accesoFisicoService.validarAcceso()).permitido, false);
    assert.equal(mocks.consumir.mock.callCount(), 0);
  });

  test('membresía vencida: se niega por la membresía sin consultar ingresos del día', async (t) => {
    const vencida = { ...mensual, fecha_fin: sumarDias(hoy, -1) };
    prepararMocks(t, { membresia: vencida, ingresoDeHoy: null });
    const consulta = registroAccesoRepository.obtenerPrimerIngresoDeHoy;
    const r = await accesoFisicoService.validarAcceso();
    assert.equal(r.permitido, false);
    assert.equal(r.motivo, 'Membresía vencida');
    assert.equal(consulta.mock.callCount(), 0);
  });
});

describe('retención del historial de accesos (DAT-05)', () => {
  test('la depuración borra los registros con más de 3 meses', async (t) => {
    const eliminar = t.mock.method(registroAccesoRepository, 'eliminarAnterioresA', async () => 12);
    assert.equal(await accesoFisicoService.depurarHistorial(), 12);
    assert.equal(eliminar.mock.calls[0].arguments[0], 3);
  });
});
