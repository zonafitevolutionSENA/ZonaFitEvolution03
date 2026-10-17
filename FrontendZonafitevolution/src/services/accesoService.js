import { peticion } from "./api";
import { normalizarIdentificador, validarIdentificador } from "../utils/validacionesAcceso";

const MOTIVO_HUELLA_NO_RECONOCIDA = "Huella no reconocida";

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
