import { peticion } from "./api";

function exigirId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Identificador de plan no válido.");
  }
  return id;
}

function exigirPlan(dato) {
  if (!dato || typeof dato !== "object" || !Number.isInteger(dato.id)) {
    throw new Error("Respuesta inesperada del servidor al consultar el plan.");
  }
  return dato;
}

// GET /api/planes
export async function listarPlanes() {
  const datos = await peticion("/planes");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar los planes.");
  }
  return datos.filter((p) => p && typeof p === "object" && Number.isInteger(p.id));
}

// POST /api/planes  { nombre, duracion_dias, precio } (solo Admin)
export async function crearPlan(datos) {
  return exigirPlan(await peticion("/planes", { method: "POST", body: JSON.stringify(datos) }));
}

// PUT /api/planes/:id  { nombre, duracion_dias, precio } (solo Admin)
export async function actualizarPlan(id, { nombre, duracion_dias, precio }) {
  return exigirPlan(
    await peticion(`/planes/${exigirId(id)}`, {
      method: "PUT",
      body: JSON.stringify({ nombre, duracion_dias, precio }),
    }),
  );
}

// PUT /api/planes/:id  { activo: true } (solo Admin): vuelve a ofrecer el plan en nuevas asignaciones
export async function activarPlan(id) {
  return exigirPlan(
    await peticion(`/planes/${exigirId(id)}`, { method: "PUT", body: JSON.stringify({ activo: true }) }),
  );
}

// PATCH /api/planes/:id/desactivar (solo Admin): oculta el plan de nuevas asignaciones sin afectar el historial
export function desactivarPlan(id) {
  return peticion(`/planes/${exigirId(id)}/desactivar`, { method: "PATCH" });
}
