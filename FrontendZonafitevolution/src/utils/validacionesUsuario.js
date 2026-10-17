// Validaciones del formulario de personal (usuarios del sistema). Cada validador devuelve "" si es correcto o el mensaje de error.
import { ROL_ADMIN, ROL_EMPLEADO } from "./permisos";
import { validarNombre } from "./validacionesCliente";

export const LIMITES_USUARIO = { correoMax: 100, contrasenaMin: 8, contrasenaMax: 72 };

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export { validarNombre };

export function validarCorreoUsuario(valor, correosExistentes = []) {
  const correo = String(valor ?? "").trim().toLowerCase();
  if (!correo) return "El correo es obligatorio.";
  if (correo.length > LIMITES_USUARIO.correoMax) return `El correo no puede superar ${LIMITES_USUARIO.correoMax} caracteres.`;
  if (!REGEX_CORREO.test(correo)) return "El formato del correo no es válido.";
  if (correosExistentes.some((c) => String(c).trim().toLowerCase() === correo)) {
    return "Ya existe un usuario con ese correo.";
  }
  return "";
}

// La contraseña nunca se recorta ni se normaliza. bcrypt solo usa los primeros 72 bytes, por eso ese es el máximo.
export function validarContrasena(valor) {
  const texto = String(valor ?? "");
  if (!texto) return "La contraseña es obligatoria.";
  if (texto.length < LIMITES_USUARIO.contrasenaMin) {
    return `La contraseña debe tener al menos ${LIMITES_USUARIO.contrasenaMin} caracteres.`;
  }
  if (new TextEncoder().encode(texto).length > LIMITES_USUARIO.contrasenaMax) {
    return `La contraseña no puede superar ${LIMITES_USUARIO.contrasenaMax} bytes (evita demasiados símbolos especiales).`;
  }
  if (/\s/.test(texto)) return "La contraseña no puede tener espacios.";
  if (!/\p{L}/u.test(texto) || !/\d/.test(texto)) return "La contraseña debe combinar letras y números.";
  return "";
}

export function validarConfirmacion(contrasena, confirmacion) {
  if (!confirmacion) return "Confirma la contraseña.";
  if (contrasena !== confirmacion) return "Las contraseñas no coinciden.";
  return "";
}

export function validarRol(valor) {
  const id = Number(valor);
  if (!valor) return "Selecciona un rol.";
  if (id !== ROL_ADMIN && id !== ROL_EMPLEADO) return "El rol seleccionado no es válido.";
  return "";
}

export function validarUsuario(valores, { correosExistentes = [] } = {}) {
  return {
    nombre: validarNombre(valores.nombre),
    correo: validarCorreoUsuario(valores.correo, correosExistentes),
    contrasena: validarContrasena(valores.contrasena),
    confirmacion: validarConfirmacion(valores.contrasena, valores.confirmacion),
    rol: validarRol(valores.rol),
  };
}

export function hayErroresUsuario(errores) {
  return Object.values(errores).some(Boolean);
}

// ¿Se puede eliminar este usuario? No la propia cuenta ni al último administrador
export function motivoNoEliminable(usuario, usuarioActual, todos) {
  if (usuario.id === usuarioActual.id) return "No puedes eliminar tu propia cuenta.";
  const admins = todos.filter((u) => u.rol_id === ROL_ADMIN);
  if (usuario.rol_id === ROL_ADMIN && admins.length <= 1) return "No se puede eliminar al último administrador.";
  return "";
}
