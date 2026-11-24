const nodemailer = require('nodemailer');

// Envío de correos. Hay dos formas, y se usa la primera que esté configurada:
// 1. Brevo por HTTPS (BREVO_API_KEY + CORREO_REMITENTE): la de producción. Railway bloquea el SMTP en
//    los planes Trial y Hobby, pero deja salir HTTPS, que es lo que recomienda para enviar correos.
// 2. Gmail por SMTP (CORREO_USUARIO + CORREO_CONTRASENA_APP): sirve en local. CORREO_CONTRASENA_APP es una
//    contraseña de aplicación de Google (requiere la verificación en dos pasos), no la contraseña normal.
const URL_BREVO = 'https://api.brevo.com/v3/smtp/email';
const ESPERA_MAXIMA_MS = 10000;
const NOMBRE_REMITENTE = 'Zona Fit Evolution';
let transporte = null;

function usaBrevo() {
  return Boolean(process.env.BREVO_API_KEY && process.env.CORREO_REMITENTE);
}

function usaGmail() {
  return Boolean(process.env.CORREO_USUARIO && process.env.CORREO_CONTRASENA_APP);
}

function estaConfigurado() {
  return usaBrevo() || usaGmail();
}

function obtenerTransporte() {
  if (!transporte) {
    transporte = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CORREO_USUARIO,
        // Google muestra la contraseña de aplicación en grupos separados por espacios
        pass: process.env.CORREO_CONTRASENA_APP.replace(/\s/g, '')
      }
    });
  }
  return transporte;
}

function escaparHtml(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, caracter => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[caracter]);
}

function plantilla(titulo, parrafos) {
  const cuerpo = parrafos.map(parrafo => `<p style="margin:0 0 14px;font-size:15px;line-height:1.5">${parrafo}</p>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#111214;color:#f2f2f2;padding:28px;border-radius:12px">
  <h1 style="margin:0 0 18px;font-size:20px;color:#f5d000">${titulo}</h1>${cuerpo}
  <p style="margin:24px 0 0;font-size:12px;color:#9a9a9a">Zona Fit Evolution · Este es un mensaje automático, no lo respondas.</p>
</div>`;
}

async function enviarConBrevo({ para, asunto, texto, html }) {
  const respuesta = await fetch(URL_BREVO, {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY.trim(),
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      sender: { name: NOMBRE_REMITENTE, email: process.env.CORREO_REMITENTE.trim() },
      to: [{ email: para }],
      subject: asunto,
      textContent: texto,
      htmlContent: html
    }),
    signal: AbortSignal.timeout(ESPERA_MAXIMA_MS)
  });
  if (!respuesta.ok) {
    // Brevo explica el motivo en el cuerpo (clave inválida, remitente sin verificar…); nunca incluye la clave
    const detalle = (await respuesta.text().catch(() => '')).slice(0, 300);
    throw new Error(`Brevo respondió ${respuesta.status}: ${detalle}`);
  }
}

async function enviarConGmail({ para, asunto, texto, html }) {
  await obtenerTransporte().sendMail({
    from: `"${NOMBRE_REMITENTE}" <${process.env.CORREO_USUARIO}>`,
    to: para,
    subject: asunto,
    text: texto,
    html
  });
}

async function enviar(mensaje) {
  if (usaBrevo()) return enviarConBrevo(mensaje);
  return enviarConGmail(mensaje);
}

async function enviarCodigoRecuperacion({ para, nombre, codigo, minutos }) {
  await enviar({
    para,
    asunto: `${codigo} es tu código para restablecer la contraseña`,
    texto: `Hola ${nombre}:\n\nTu código para restablecer la contraseña de Zona Fit Evolution es: ${codigo}\n\n` +
      `Vence en ${minutos} minutos y solo se puede usar una vez.\n` +
      'Si no lo solicitaste, ignora este correo: tu contraseña no cambiará.',
    html: plantilla('Restablecer contraseña', [
      `Hola ${escaparHtml(nombre)}:`,
      'Tu código de verificación es:',
      `<span style="display:inline-block;font-size:30px;font-weight:bold;letter-spacing:8px;color:#f5d000">${codigo}</span>`,
      `Vence en ${minutos} minutos y solo se puede usar una vez.`,
      'Si no lo solicitaste, ignora este correo: tu contraseña no cambiará.'
    ])
  });
}

async function enviarAvisoCambio({ para, nombre }) {
  await enviar({
    para,
    asunto: 'Tu contraseña fue cambiada',
    texto: `Hola ${nombre}:\n\nLa contraseña de tu cuenta de Zona Fit Evolution se cambió y las sesiones abiertas se cerraron.\n` +
      'Si no fuiste tú, avisa de inmediato al administrador del gimnasio.',
    html: plantilla('Tu contraseña fue cambiada', [
      `Hola ${escaparHtml(nombre)}:`,
      'La contraseña de tu cuenta se cambió y las sesiones abiertas se cerraron.',
      'Si no fuiste tú, avisa de inmediato al administrador del gimnasio.'
    ])
  });
}

module.exports = { estaConfigurado, enviarCodigoRecuperacion, enviarAvisoCambio };
