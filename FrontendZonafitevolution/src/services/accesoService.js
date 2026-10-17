import { peticion } from "./api";
import { normalizarIdentificador, validarIdentificador } from "../utils/validacionesAcceso";

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

// POST /api/acceso-fisico/validar  { identificadorSimulado }
// Devuelve { cliente, permitido, motivo }. Una huella que no existe (404) se entrega como acceso denegado, sin cliente.
export async function validarAcceso(identificador) {
  const error = validarIdentificador(identificador);
  if (error) throw new Error(error);

  let respuesta;
  try {
    respuesta = await peticion("/acceso-fisico/validar", {
      method: "POST",
      body: JSON.stringify({ identificadorSimulado: normalizarIdentificador(identificador) }),
    });
  } catch (err) {
    if (err.message === MOTIVO_HUELLA_NO_RECONOCIDA) {
      return { cliente: null, permitido: false, motivo: MOTIVO_HUELLA_NO_RECONOCIDA };
    }
    throw err;
  }

  if (!respuesta || typeof respuesta !== "object" || typeof respuesta.permitido !== "boolean") {
    throw new Error("Respuesta inesperada del servidor al validar el acceso.");
  }
  return {
    cliente: respuesta.cliente && typeof respuesta.cliente === "object" ? respuesta.cliente : null,
    permitido: respuesta.permitido,
    motivo: String(respuesta.motivo ?? ""),
  };
}
