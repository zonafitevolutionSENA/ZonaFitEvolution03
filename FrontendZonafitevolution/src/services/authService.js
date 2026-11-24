import { peticion, establecerSesion } from "./api";

export async function iniciarSesion(correo, contrasena) {
  const resultado = await peticion("/auth/login", {
    method: "POST",
    body: JSON.stringify({ correo, contrasena }),
  });
  establecerSesion(resultado.token, resultado.usuario);
  return resultado;
}

// Olvidé mi contraseña: 1) código al correo, 2) verificar el código, 3) nueva contraseña
export function solicitarCodigoRecuperacion(correo) {
  return peticion("/auth/recuperar", {
    method: "POST",
    body: JSON.stringify({ correo }),
  });
}

export function verificarCodigoRecuperacion(correo, codigo) {
  return peticion("/auth/recuperar/verificar", {
    method: "POST",
    body: JSON.stringify({ correo, codigo }),
  });
}

export function restablecerContrasena(tokenRestablecer, contrasena) {
  return peticion("/auth/recuperar/restablecer", {
    method: "POST",
    body: JSON.stringify({ tokenRestablecer, contrasena }),
  });
}
