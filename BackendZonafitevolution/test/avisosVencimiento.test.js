// Aviso por correo 7 días antes del vencimiento (CR-010): un solo aviso por membresía, planes de 15 días o
// más y solo a clientes que lo autorizaron. Repositorio y correo son mocks: no se envía nada real.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const avisoService = require('../src/services/avisoMembresia.service');
const avisoRepository = require('../src/repositories/avisoMembresia.repository');
const correoService = require('../src/services/correo.service');
const avisosJob = require('../src/jobs/avisos.job');

const MENSUALIDAD = {
  membresia_id: 31, fecha_fin: '2026-12-01', cliente_id: 4, nombre: 'Ana', correo: 'ana@correo.com',
  nombre_plan: 'Mensualidad', ingresos_totales: null, ingresos_usados: 0, dias_restantes: 7
};
const TIQUETERA = { ...MENSUALIDAD, membresia_id: 32, nombre_plan: 'Tiquetera x12', ingresos_totales: 12, ingresos_usados: 9, dias_restantes: 3 };

function preparar(t, { pendientes, configurado = true, falla = () => false }) {
  t.mock.method(correoService, 'estaConfigurado', () => configurado);
  const consulta = t.mock.method(avisoRepository, 'obtenerPorAvisar', async () => pendientes);
  const registro = t.mock.method(avisoRepository, 'registrarEnvio', async () => true);
  const envio = t.mock.method(correoService, 'enviarAvisoVencimiento', async (datos) => {
    if (falla(datos)) throw new Error('Brevo respondió 500');
  });
  return { consulta, registro, envio };
}

describe('avisos de vencimiento', () => {
  test('consulta 7 días de anticipación, planes de 15 días o más y respeta el límite diario', async (t) => {
    const { consulta } = preparar(t, { pendientes: [] });
    await avisoService.enviarAvisosDeVencimiento();
    assert.deepEqual(consulta.mock.calls[0].arguments[0], {
      tipo: 'vencimiento_7d', dias: 7, duracionMinima: 15, limite: avisoService.MAXIMO_POR_EJECUCION
    });
    assert.ok(avisoService.MAXIMO_POR_EJECUCION < 300, 'debe quedar margen bajo el límite gratis de Brevo');
  });

  test('envía cada aviso con la fecha legible y lo registra para no repetirlo', async (t) => {
    const { envio, registro } = preparar(t, { pendientes: [MENSUALIDAD] });
    const resultado = await avisoService.enviarAvisosDeVencimiento();
    assert.deepEqual(resultado, { pendientes: 1, enviados: 1, fallidos: 0, omitido: false });
    assert.deepEqual(envio.mock.calls[0].arguments[0], {
      para: 'ana@correo.com', nombre: 'Ana', plan: 'Mensualidad', fechaFin: '01/12/2026', diasRestantes: 7, ingresosRestantes: null
    });
    assert.deepEqual(registro.mock.calls[0].arguments[0], { membresiaId: 31, tipo: 'vencimiento_7d' });
  });

  test('en una tiquetera incluye los ingresos que le quedan', async (t) => {
    const { envio } = preparar(t, { pendientes: [TIQUETERA] });
    await avisoService.enviarAvisosDeVencimiento();
    assert.equal(envio.mock.calls[0].arguments[0].ingresosRestantes, 3);
  });

  test('si un envío falla no se marca como enviado (se reintenta) y los demás siguen', async (t) => {
    const { registro } = preparar(t, { pendientes: [MENSUALIDAD, TIQUETERA], falla: (d) => d.plan === 'Mensualidad' });
    const resultado = await avisoService.enviarAvisosDeVencimiento();
    assert.deepEqual(resultado, { pendientes: 2, enviados: 1, fallidos: 1, omitido: false });
    assert.equal(registro.mock.callCount(), 1);
    assert.equal(registro.mock.calls[0].arguments[0].membresiaId, 32);
  });

  test('sin correo configurado no consulta ni envía nada', async (t) => {
    const { consulta, envio } = preparar(t, { pendientes: [MENSUALIDAD], configurado: false });
    const resultado = await avisoService.enviarAvisosDeVencimiento();
    assert.equal(resultado.omitido, true);
    assert.equal(consulta.mock.callCount(), 0);
    assert.equal(envio.mock.callCount(), 0);
  });
});

describe('programación de los avisos', () => {
  test('la siguiente ejecución es a las 8:00', () => {
    const ms = avisosJob.milisegundosHastaProximaEjecucion(new Date(2026, 10, 24, 7, 30));
    assert.equal(ms, 30 * 60 * 1000);
    const manana = avisosJob.milisegundosHastaProximaEjecucion(new Date(2026, 10, 24, 9, 0));
    assert.equal(manana, 23 * 60 * 60 * 1000);
  });

  test('al arrancar solo envía en horario de 8:00 a 20:00', () => {
    assert.equal(avisosJob.esHoraDeEnvio(new Date(2026, 10, 24, 2, 0)), false);
    assert.equal(avisosJob.esHoraDeEnvio(new Date(2026, 10, 24, 8, 0)), true);
    assert.equal(avisosJob.esHoraDeEnvio(new Date(2026, 10, 24, 19, 59)), true);
    assert.equal(avisosJob.esHoraDeEnvio(new Date(2026, 10, 24, 20, 0)), false);
  });
});

describe('correo del aviso', () => {
  test('dice cuándo vence, los ingresos de la tiquetera y cómo dejar de recibirlo', async (t) => {
    const VARIABLES = ['BREVO_API_KEY', 'CORREO_REMITENTE'];
    const guardadas = Object.fromEntries(VARIABLES.map(v => [v, process.env[v]]));
    process.env.BREVO_API_KEY = 'clave';
    process.env.CORREO_REMITENTE = 'zonafit@correo.com';
    t.after(() => VARIABLES.forEach(v => (guardadas[v] === undefined ? delete process.env[v] : (process.env[v] = guardadas[v]))));
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 201 }));
    delete require.cache[require.resolve('../src/services/correo.service')];
    const correo = require('../src/services/correo.service');

    await correo.enviarAvisoVencimiento({ para: 'ana@correo.com', nombre: 'Ana', plan: 'Tiquetera x12', fechaFin: '27/11/2026', diasRestantes: 3, ingresosRestantes: 1 });
    const cuerpo = JSON.parse(fetchMock.mock.calls[0].arguments[1].body);
    assert.equal(cuerpo.subject, 'Tu membresía Tiquetera x12 vence en 3 días');
    assert.match(cuerpo.textContent, /el 27\/11\/2026\. Te queda 1 ingreso\./);
    assert.match(cuerpo.textContent, /pídelo en la recepción/);

    await correo.enviarAvisoVencimiento({ para: 'ana@correo.com', nombre: 'Ana', plan: 'Mensualidad', fechaFin: '25/11/2026', diasRestantes: 1 });
    assert.equal(JSON.parse(fetchMock.mock.calls[1].arguments[1].body).subject, 'Tu membresía Mensualidad vence mañana');
  });
});
