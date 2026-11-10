import { peticion } from "./api";

const MOTIVO_HUELLA_NO_RECONOCIDA = "Huella no reconocida";

// GET /api/acceso-fisico/historial → los 50 eventos más recientes, del más nuevo al más antiguo.
// Se descartan filas con resultado o fecha inválidos; `cliente` es "Huella no reconocida" si no hubo cliente.
export async function listarHistorial() {
  const datos = await peticion("/acceso-fisico/historial");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar el historial de acceso.");
  }

  return datos
    .filter((a) => a && typeof a === "object")
    .filter((a) => a.resultado === "permitido" || a.resultado === "denegado")
    .filter((a) => !Number.isNaN(new Date(a.fecha_hora).getTime()))
    .map((a) => ({
      id: a.id,
      cliente: typeof a.nombre_cliente === "string" && a.nombre_cliente.trim() ? a.nombre_cliente : MOTIVO_HUELLA_NO_RECONOCIDA,
      fechaHora: new Date(a.fecha_hora),
      permitido: a.resultado === "permitido",
      motivo: String(a.motivo ?? ""),
    }));
}
