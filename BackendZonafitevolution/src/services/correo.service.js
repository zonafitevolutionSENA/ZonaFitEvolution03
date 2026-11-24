const nodemailer = require('nodemailer');

// Envío de correos con Gmail. CORREO_CONTRASENA_APP es una contraseña de aplicación de Google
// (requiere la verificación en dos pasos activa en esa cuenta), no la contraseña normal.
let transporte = null;

function estaConfigurado() {
  return Boolean(process.env.CORREO_USUARIO && process.env.CORREO_CONTRASENA_APP);
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

async function enviar({ para, asunto, texto, html }) {
  await obtenerTransporte().sendMail({
    from: `"Zona Fit Evolution" <${process.env.CORREO_USUARIO}>`,
    to: para,
    subject: asunto,
    text: texto,
    html
  });
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
