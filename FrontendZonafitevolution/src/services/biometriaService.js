import { peticion } from "./api";
import { normalizarIdentificador, validarIdentificador } from "../utils/validacionesAcceso";

// GET /api/biometria/lector → { tipo, requiereIdentificador }
// Indica si se usa el simulador (texto) o el lector físico (el dedo se pone en el sensor)
export async function obtenerInfoLector() {
  const datos = await peticion("/biometria/lector");
  if (!datos || typeof datos !== "object" || typeof datos.requiereIdentificador !== "boolean") {
    throw new Error("Respuesta inesperada del servidor al consultar el lector de huellas.");
  }
  return { tipo: String(datos.tipo ?? ""), usaSensor: !datos.requiereIdentificador };
}

// POST /api/biometria/registrar  { cliente_id, identificadorSimulado }
// Con el lector físico solo se envía el cliente: la huella se toma del sensor (dos lecturas)
export async function registrarHuella({ cliente_id, identificador, usaSensor = false, capturaId }) {
  if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("Cliente no válido.");
  }
  if (!usaSensor) {
    const error = validarIdentificador(identificador);
    if (error) throw new Error(error);
  }

  const cuerpo = usaSensor ? { cliente_id, captura_id: capturaId } : { cliente_id, identificadorSimulado: normalizarIdentificador(identificador) };
  const respuesta = await peticion("/biometria/registrar", {
    method: "POST",
    body: JSON.stringify(cuerpo),
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
