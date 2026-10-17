import { peticion } from "./api";
import { normalizarIdentificador, validarIdentificador } from "../utils/validacionesAcceso";

// POST /api/biometria/registrar  { cliente_id, identificadorSimulado }
export async function registrarHuella({ cliente_id, identificador }) {
  if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("Cliente no válido.");
  }
  const error = validarIdentificador(identificador);
  if (error) throw new Error(error);

  const respuesta = await peticion("/biometria/registrar", {
    method: "POST",
    body: JSON.stringify({ cliente_id, identificadorSimulado: normalizarIdentificador(identificador) }),
  });
  if (!respuesta || typeof respuesta !== "object") {
    throw new Error("Respuesta inesperada del servidor al registrar la huella.");
  }
  return respuesta;
}
