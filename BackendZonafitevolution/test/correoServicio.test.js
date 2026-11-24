// Envío de correos: Brevo por HTTPS en producción (Railway bloquea el SMTP en Trial y Hobby)
// y Gmail por SMTP como alternativa en local. No se envía nada real: fetch y nodemailer son mocks.
const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');

const VARIABLES = ['BREVO_API_KEY', 'CORREO_REMITENTE', 'CORREO_USUARIO', 'CORREO_CONTRASENA_APP'];
let guardadas;

function cargarServicio() {
  delete require.cache[require.resolve('../src/services/correo.service')];
  return require('../src/services/correo.service');
}

describe('servicio de correo', () => {
  beforeEach(() => {
    guardadas = Object.fromEntries(VARIABLES.map(v => [v, process.env[v]]));
    VARIABLES.forEach(v => delete process.env[v]);
  });

  afterEach(() => {
    for (const [variable, valor] of Object.entries(guardadas)) {
      if (valor === undefined) delete process.env[variable];
      else process.env[variable] = valor;
    }
  });

  test('sin variables no está configurado', () => {
    assert.equal(cargarServicio().estaConfigurado(), false);
  });

  test('con Brevo envía por HTTPS con la clave en la cabecera y el remitente verificado', async (t) => {
    process.env.BREVO_API_KEY = ' clave-de-prueba ';
    process.env.CORREO_REMITENTE = 'gimnasio@zonafit.com';
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('{"messageId":"1"}', { status: 201 }));
    const smtp = t.mock.method(nodemailer, 'createTransport', () => ({ sendMail: async () => {} }));
    const correo = cargarServicio();

    assert.equal(correo.estaConfigurado(), true);
    await correo.enviarCodigoRecuperacion({ para: 'ana@zonafit.com', nombre: 'Ana <b>', codigo: '123456', minutos: 10 });

    assert.equal(fetchMock.mock.callCount(), 1);
    const [url, opciones] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, 'https://api.brevo.com/v3/smtp/email');
    assert.equal(opciones.method, 'POST');
    assert.equal(opciones.headers['api-key'], 'clave-de-prueba');
    assert.ok(opciones.signal, 'la petición debe tener tiempo máximo');
    const cuerpo = JSON.parse(opciones.body);
    assert.deepEqual(cuerpo.sender, { name: 'Zona Fit Evolution', email: 'gimnasio@zonafit.com' });
    assert.deepEqual(cuerpo.to, [{ email: 'ana@zonafit.com' }]);
    assert.match(cuerpo.subject, /^123456 /);
    assert.match(cuerpo.textContent, /123456/);
    assert.match(cuerpo.htmlContent, /Ana &lt;b&gt;/, 'el nombre se escapa en el HTML');
    assert.equal(smtp.mock.callCount(), 0, 'con Brevo no se usa SMTP');
  });

  test('si Brevo rechaza el envío, el error explica el motivo sin mostrar la clave', async (t) => {
    process.env.BREVO_API_KEY = 'clave-secreta';
    process.env.CORREO_REMITENTE = 'gimnasio@zonafit.com';
    t.mock.method(globalThis, 'fetch', async () => new Response('{"code":"unauthorized","message":"Key not found"}', { status: 401 }));
    const correo = cargarServicio();

    await assert.rejects(
      correo.enviarAvisoCambio({ para: 'ana@zonafit.com', nombre: 'Ana' }),
      (error) => /Brevo respondió 401/.test(error.message) && /Key not found/.test(error.message) && !error.message.includes('clave-secreta')
    );
  });

  test('Brevo tiene prioridad sobre Gmail cuando ambos están configurados', async (t) => {
    process.env.BREVO_API_KEY = 'clave';
    process.env.CORREO_REMITENTE = 'gimnasio@zonafit.com';
    process.env.CORREO_USUARIO = 'zonafit@gmail.com';
    process.env.CORREO_CONTRASENA_APP = 'abcd efgh ijkl mnop';
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 201 }));
    const smtp = t.mock.method(nodemailer, 'createTransport', () => ({ sendMail: async () => {} }));

    await cargarServicio().enviarAvisoCambio({ para: 'ana@zonafit.com', nombre: 'Ana' });
    assert.equal(fetchMock.mock.callCount(), 1);
    assert.equal(smtp.mock.callCount(), 0);
  });

  test('solo con Gmail envía por SMTP y quita los espacios de la contraseña de aplicación', async (t) => {
    process.env.CORREO_USUARIO = 'zonafit@gmail.com';
    process.env.CORREO_CONTRASENA_APP = 'abcd efgh ijkl mnop';
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 201 }));
    const enviados = [];
    const smtp = t.mock.method(nodemailer, 'createTransport', () => ({ sendMail: async (m) => { enviados.push(m); } }));
    const correo = cargarServicio();

    assert.equal(correo.estaConfigurado(), true);
    await correo.enviarCodigoRecuperacion({ para: 'ana@zonafit.com', nombre: 'Ana', codigo: '654321', minutos: 10 });

    assert.equal(fetchMock.mock.callCount(), 0);
    assert.equal(smtp.mock.calls[0].arguments[0].auth.pass, 'abcdefghijklmnop');
    assert.equal(enviados[0].from, '"Zona Fit Evolution" <zonafit@gmail.com>');
    assert.equal(enviados[0].to, 'ana@zonafit.com');
  });
});
