import { peticion } from "./api";
import { ESTADOS, membresiasVencidas } from "../utils/estadoMembresia";

// GET /api/membresias
export async function listarMembresias() {
  const datos = await peticion("/membresias");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar las membresías.");
  }
  return datos.filter((m) => m && typeof m === "object" && Number.isInteger(m.id));
}

// Peticiones en curso por membresía: si la pantalla pide lo mismo dos veces a la vez, se envía una sola
const enCurso = new Map();

function marcarUnaVencida(id) {
  if (!enCurso.has(id)) {
    const promesa = cambiarEstadoMembresia(id, "vencida").finally(() => enCurso.delete(id));
    enCurso.set(id, promesa);
  }
  return enCurso.get(id);
}

// Pasa a "vencida" toda membresía activa cuya fecha de fin ya pasó.
// Devuelve cuántas se actualizaron y cuántas fallaron; un fallo no detiene a las demás.
export async function marcarVencidas(membresias) {
  const pendientes = membresiasVencidas(membresias);
  const resultados = await Promise.allSettled(pendientes.map((m) => marcarUnaVencida(m.id)));
  const actualizadas = resultados.filter((r) => r.status === "fulfilled").length;
  return { actualizadas, fallidas: pendientes.length - actualizadas };
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
