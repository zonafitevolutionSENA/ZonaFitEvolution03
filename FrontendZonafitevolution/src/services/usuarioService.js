import { peticion } from "./api";

function exigirId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Identificador de usuario no válido.");
  }
  return id;
}

// GET /api/usuarios (solo Admin). La API nunca devuelve la contraseña.
export async function listarUsuarios() {
  const datos = await peticion("/usuarios");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar el personal.");
  }
  return datos.filter((u) => u && typeof u === "object" && Number.isInteger(u.id));
}

// POST /api/usuarios  { nombre, correo, contrasena, rol_id } (solo Admin)
export async function crearUsuario({ nombre, correo, contrasena, rol_id }) {
  const usuario = await peticion("/usuarios", {
    method: "POST",
    body: JSON.stringify({ nombre, correo, contrasena, rol_id }),
  });
  if (!usuario || typeof usuario !== "object" || !Number.isInteger(usuario.id)) {
    throw new Error("Respuesta inesperada del servidor al crear el usuario.");
  }
  return usuario;
}

// DELETE /api/usuarios/:id (solo Admin)
export function eliminarUsuario(id) {
  return peticion(`/usuarios/${exigirId(id)}`, { method: "DELETE" });
}
