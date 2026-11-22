// Pruebas unitarias de la lógica de negocio crítica: estados de acceso (patrón State) y reglas de membresías.
// Los repositorios se reemplazan con mocks, así no se necesita base de datos.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const obtenerEstado = require('../src/estadosAcceso/estadoAcceso.factory');
const membresiaService = require('../src/services/membresia.service');
const membresiaRepository = require('../src/repositories/membresia.repository');
const clienteRepository = require('../src/repositories/cliente.repository');
const planRepository = require('../src/repositories/plan.repository');
const { hoyISO, sumarDias } = require('../src/utils/fechas');
const ROLES = require('../src/utils/roles');

const hoy = hoyISO();
const ayer = sumarDias(hoy, -1);
const enDiezDias = sumarDias(hoy, 10);

describe('estados de acceso (RN-002, RN-009)', () => {
  test('sin membresía: denegado', () => {
    assert.deepEqual(obtenerEstado(null).evaluar(null), { permitido: false, motivo: 'El cliente no tiene ninguna membresía registrada' });
  });

  test('activa y vigente: permitido', () => {
    const m = { estado: 'activa', fecha_fin: enDiezDias, ingresos_totales: null };
    assert.equal(obtenerEstado(m).evaluar(m).permitido, true);
  });

  test('activa con fecha de fin pasada: denegado por vencida', () => {
    const m = { estado: 'activa', fecha_fin: ayer, ingresos_totales: null };
    assert.deepEqual(obtenerEstado(m).evaluar(m), { permitido: false, motivo: 'Membresía vencida' });
  });

  test('tiquetera sin usar (sin fecha de fin): permitido', () => {
    const m = { estado: 'activa', fecha_fin: null, ingresos_totales: 10, ingresos_usados: 0 };
    assert.equal(obtenerEstado(m).evaluar(m).permitido, true);
  });

  test('tiquetera sin ingresos disponibles: denegado', () => {
    const m = { estado: 'activa', fecha_fin: enDiezDias, ingresos_totales: 10, ingresos_usados: 10 };
    assert.deepEqual(obtenerEstado(m).evaluar(m), { permitido: false, motivo: 'Tiquetera sin ingresos disponibles' });
  });

  test('pendiente, vencida y cancelada: denegado', () => {
    for (const estado of ['pendiente', 'vencida', 'cancelada']) {
      const m = { estado, fecha_inicio: enDiezDias, fecha_fin: enDiezDias, ingresos_totales: null };
      assert.equal(obtenerEstado(m).evaluar(m).permitido, false, estado);
    }
  });
});

describe('renovación de membresías (RN-003, RN-005)', () => {
  const cliente = { id: 7, cedula: '1036123456' };
  const plan = { id: 3, activo: 1, duracion_dias: 30, max_ingresos: null };

  function prepararMocks(t, { activa = null, pendiente = null } = {}) {
    t.mock.method(clienteRepository, 'obtenerPorCedula', async () => cliente);
    t.mock.method(planRepository, 'obtenerPorId', async () => plan);
    t.mock.method(membresiaRepository, 'obtenerActivaPorCliente', async () => activa);
    t.mock.method(membresiaRepository, 'obtenerPendientePorCliente', async () => pendiente);
    const crear = t.mock.method(membresiaRepository, 'crearReemplazando', async () => 99);
    t.mock.method(membresiaRepository, 'obtenerConCliente', async () => ({ id: 99 }));
    return crear;
  }

  test('con una activa vigente, la nueva queda pendiente desde el día siguiente al fin', async (t) => {
    const crear = prepararMocks(t, { activa: { id: 1, fecha_fin: enDiezDias, ingresos_totales: null, ingresos_usados: 0 } });
    await membresiaService.renovarMembresia({ cedula: cliente.cedula, plan_id: plan.id });
    const datos = crear.mock.calls[0].arguments[0];
    assert.equal(datos.estado, 'pendiente');
    assert.equal(datos.fecha_inicio, sumarDias(enDiezDias, 1));
    assert.equal(datos.anterior, null);
  });

  test('con la activa ya vencida por fecha, la nueva empieza hoy y la anterior queda vencida', async (t) => {
    const crear = prepararMocks(t, { activa: { id: 1, fecha_fin: ayer, ingresos_totales: null, ingresos_usados: 0 } });
    await membresiaService.renovarMembresia({ cedula: cliente.cedula, plan_id: plan.id });
    const datos = crear.mock.calls[0].arguments[0];
    assert.equal(datos.estado, 'activa');
    assert.equal(datos.fecha_inicio, hoy);
    assert.deepEqual(datos.anterior, { id: 1, estado: 'vencida' });
  });

  test('sin membresía activa, la nueva empieza hoy', async (t) => {
    const crear = prepararMocks(t);
    await membresiaService.renovarMembresia({ cedula: cliente.cedula, plan_id: plan.id });
    assert.equal(crear.mock.calls[0].arguments[0].fecha_inicio, hoy);
  });

  test('solo se permite una membresía pendiente (409)', async (t) => {
    const crear = prepararMocks(t, { pendiente: { id: 5, fecha_inicio: enDiezDias } });
    await assert.rejects(membresiaService.renovarMembresia({ cedula: cliente.cedula, plan_id: plan.id }), { status: 409 });
    assert.equal(crear.mock.callCount(), 0);
  });

  test('plan inactivo: 404', async (t) => {
    prepararMocks(t);
    t.mock.method(planRepository, 'obtenerPorId', async () => ({ ...plan, activo: 0 }));
    await assert.rejects(membresiaService.renovarMembresia({ cedula: cliente.cedula, plan_id: plan.id }), { status: 404 });
  });
});

describe('cambio de estado de membresías', () => {
  test('solo el Administrador reactiva (403 para el Empleado)', async () => {
    await assert.rejects(membresiaService.cambiarEstado(1, 'activa', ROLES.EMPLEADO), { status: 403 });
  });

  test('una membresía pendiente solo se puede cancelar (409)', async (t) => {
    t.mock.method(membresiaRepository, 'obtenerConCliente', async () => ({ id: 1, estado: 'pendiente', cliente_id: 7 }));
    await assert.rejects(membresiaService.cambiarEstado(1, 'vencida', ROLES.ADMIN), { status: 409 });
  });

  test('no se reactiva si el cliente ya tiene otra activa (409)', async (t) => {
    t.mock.method(membresiaRepository, 'obtenerConCliente', async () => ({ id: 1, estado: 'cancelada', cliente_id: 7, fecha_fin: enDiezDias }));
    t.mock.method(membresiaRepository, 'obtenerActivaPorCliente', async () => ({ id: 2 }));
    const actualizar = t.mock.method(membresiaRepository, 'actualizarEstado', async () => true);
    await assert.rejects(membresiaService.cambiarEstado(1, 'activa', ROLES.ADMIN), { status: 409 });
    assert.equal(actualizar.mock.callCount(), 0);
  });

  test('estado no permitido: 400', async () => {
    await assert.rejects(membresiaService.cambiarEstado(1, 'borrada', ROLES.ADMIN), { status: 400 });
  });
});
