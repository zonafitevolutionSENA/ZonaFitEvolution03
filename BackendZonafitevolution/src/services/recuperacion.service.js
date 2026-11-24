const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario.repository');
const recuperacionRepository = require('../repositories/recuperacion.repository');
const correoService = require('./correo.service');
const ErrorDominio = require('../utils/errores');
const { validarContrasena } = require('../utils/contrasena');
const log = require('../utils/logger')('recuperacion');

const MINUTOS_CODIGO = 10;
const MAX_INTENTOS = 5;
const PROPOSITO = 'restablecer-contrasena';
const MENSAJE_SOLICITUD = 'Si el correo está registrado, te enviamos un código de verificación. Revisa tu bandeja de entrada y la carpeta de spam.';
const ERROR_CODIGO = 'El código no es válido o ya venció. Solicita uno nuevo.';
const ERROR_VERIFICACION = 'La verificación venció o ya se usó. Vuelve a solicitar el código.';

function normalizarCorreo(correo) {
  const texto = typeof correo === 'string' ? correo.trim().toLowerCase() : '';
  if (!texto || texto.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
    throw new ErrorDominio('Escribe un correo válido');
  }
  return texto;
}

function exigirSecreto() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está configurado');
  }
}

// Paso 1. La respuesta es la misma exista o no el correo, para no revelar qué cuentas hay.
// El correo se envía sin esperar la respuesta del proveedor: así tampoco se nota por el tiempo.
async function solicitarCodigo({ correo } = {}) {
  const correoLimpio = normalizarCorreo(correo);
  if (!correoService.estaConfigurado()) {
    throw new ErrorDominio('La recuperación de contraseña no está disponible en este momento. Contacta al administrador.', 503);
  }

  const usuario = await usuarioRepository.obtenerPorCorreo(correoLimpio);
  if (!usuario) {
    await bcrypt.hash('relleno', 10);
    return { mensaje: MENSAJE_SOLICITUD };
  }

  const codigo = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  await recuperacionRepository.crear({
    usuario_id: usuario.id,
    codigo_hash: await bcrypt.hash(codigo, 10),
    minutos: MINUTOS_CODIGO
  });

  correoService.enviarCodigoRecuperacion({ para: usuario.correo, nombre: usuario.nombre, codigo, minutos: MINUTOS_CODIGO })
    .catch(error => log.error('No se pudo enviar el código de recuperación', { usuario_id: usuario.id, motivo: error.message }));

  return { mensaje: MENSAJE_SOLICITUD };
}

// Paso 2. Si el código es correcto entrega un token temporal que solo sirve para el paso 3
async function verificarCodigo({ correo, codigo } = {}) {
  const correoLimpio = normalizarCorreo(correo);
  const codigoLimpio = typeof codigo === 'string' || typeof codigo === 'number' ? String(codigo).trim() : '';
  if (!/^\d{6}$/.test(codigoLimpio)) {
    throw new ErrorDominio('El código debe tener 6 dígitos');
  }
  exigirSecreto();

  const usuario = await usuarioRepository.obtenerPorCorreo(correoLimpio);
  const recuperacion = usuario ? await recuperacionRepository.obtenerVigente(usuario.id) : null;
  if (!recuperacion || !(await recuperacionRepository.reservarIntento(recuperacion.id, MAX_INTENTOS))) {
    throw new ErrorDominio(ERROR_CODIGO);
  }

  if (!(await bcrypt.compare(codigoLimpio, recuperacion.codigo_hash))) {
    const restantes = MAX_INTENTOS - recuperacion.intentos - 1;
    throw new ErrorDominio(restantes > 0
      ? `Código incorrecto. Te ${restantes === 1 ? 'queda 1 intento' : `quedan ${restantes} intentos`}.`
      : ERROR_CODIGO);
  }

  const tokenRestablecer = jwt.sign(
    { proposito: PROPOSITO, id: usuario.id, rid: recuperacion.id },
    process.env.JWT_SECRET,
    { expiresIn: `${MINUTOS_CODIGO}m` }
  );
  return { tokenRestablecer };
}

// Paso 3. Cambia la contraseña, gasta el código y cierra las sesiones abiertas (contrasena_cambiada_en)
async function restablecerContrasena({ tokenRestablecer, contrasena } = {}) {
  exigirSecreto();
  let datos = null;
  try {
    datos = jwt.verify(String(tokenRestablecer || ''), process.env.JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    datos = null;
  }
  if (!datos || datos.proposito !== PROPOSITO) {
    throw new ErrorDominio(ERROR_VERIFICACION);
  }

  validarContrasena(contrasena);

  const usuario = await usuarioRepository.obtenerPorId(datos.id);
  if (!usuario) {
    throw new ErrorDominio(ERROR_VERIFICACION);
  }
  if (await bcrypt.compare(contrasena, usuario.contrasena)) {
    throw new ErrorDominio('La nueva contraseña debe ser distinta de la anterior');
  }

  const cambiada = await recuperacionRepository.restablecer({
    id: datos.rid,
    usuario_id: usuario.id,
    contrasena: await bcrypt.hash(contrasena, 10)
  });
  if (!cambiada) {
    throw new ErrorDominio(ERROR_VERIFICACION);
  }

  correoService.enviarAvisoCambio({ para: usuario.correo, nombre: usuario.nombre })
    .catch(error => log.error('No se pudo enviar el aviso de cambio de contraseña', { usuario_id: usuario.id, motivo: error.message }));

  return { mensaje: 'Contraseña actualizada. Ya puedes iniciar sesión con la nueva contraseña.' };
}

module.exports = { solicitarCodigo, verificarCodigo, restablecerContrasena, PROPOSITO };
