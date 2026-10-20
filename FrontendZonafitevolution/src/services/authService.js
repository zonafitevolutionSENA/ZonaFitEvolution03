import { peticion } from "./api";
import { establecerTokenSesion } from "./api";

export async function iniciarSesion(correo, contrasena) {
  const resultado = await peticion("/auth/login", {
    method: "POST",
    body: JSON.stringify({ correo, contrasena }),
  });
  establecerTokenSesion(resultado.token);
  return resultado;
}
