import { peticion } from "./api";

// POST /api/biometria/registrar  { cliente_id, captura_id }
// La huella se toma del lector (dos lecturas del mismo dedo); `captura_id` permite consultar la etapa de la lectura
export async function registrarHuella({ cliente_id, capturaId }) {
  if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("Cliente no válido.");
  }

  const respuesta = await peticion("/biometria/registrar", {
    method: "POST",
    body: JSON.stringify({ cliente_id, captura_id: capturaId }),
  });
  if (!respuesta || typeof respuesta !== "object") {
    throw new Error("Respuesta inesperada del servidor al registrar la huella.");
  }
  return respuesta;
}

export async function obtenerEstadoRegistro(capturaId) {
  const datos = await peticion(`/biometria/registro/estado/${encodeURIComponent(capturaId)}`);
  if (!datos || typeof datos.etapa !== "string") {
    throw new Error("Respuesta inesperada al consultar la lectura.");
  }
  return datos.etapa;
}
