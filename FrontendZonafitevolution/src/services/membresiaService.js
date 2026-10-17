import { peticion } from "./api";
import { ESTADOS } from "../utils/estadoMembresia";

// GET /api/membresias
export async function listarMembresias() {
  const datos = await peticion("/membresias");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar las membresías.");
  }
  return datos.filter((m) => m && typeof m === "object" && Number.isInteger(m.id));
}

// PATCH /api/membresias/:id/estado  { estado }
export async function cambiarEstadoMembresia(id, estado) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Identificador de membresía no válido.");
  }
  if (!ESTADOS.includes(estado)) {
    throw new Error("Estado de membresía no válido.");
  }

  const membresia = await peticion(`/membresias/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
  if (!membresia || typeof membresia !== "object") {
    throw new Error("Respuesta inesperada del servidor al cambiar el estado.");
  }
  return membresia;
}
