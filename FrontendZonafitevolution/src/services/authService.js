import { peticion } from "./api";

export function iniciarSesion(correo, contrasena) {
  return peticion("/auth/login", {
    method: "POST",
    body: JSON.stringify({ correo, contrasena }),
  });
}
