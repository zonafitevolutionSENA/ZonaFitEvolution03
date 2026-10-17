// Validaciones de control de acceso y registro de huella simulada. Cada validador devuelve "" si es correcto o el mensaje de error.

export const LIMITES_HUELLA = { min: 3, max: 50 };

const REGEX_IDENTIFICADOR = /^[A-Za-z0-9_.-]+$/;

// La huella simulada se envía sin espacios sobrantes (el backend la usa tal cual para generar el template)
export function normalizarIdentificador(valor) {
  return String(valor ?? "").trim();
}

export function validarIdentificador(valor) {
  const texto = normalizarIdentificador(valor);
  if (!texto) return "El identificador de la huella es obligatorio.";
  if (texto.length < LIMITES_HUELLA.min) return `El identificador debe tener al menos ${LIMITES_HUELLA.min} caracteres.`;
  if (texto.length > LIMITES_HUELLA.max) return `El identificador no puede superar ${LIMITES_HUELLA.max} caracteres.`;
  if (!REGEX_IDENTIFICADOR.test(texto)) {
    return "El identificador solo puede tener letras, números, punto, guion y guion bajo (sin espacios).";
  }
  return "";
}

export function validarClienteHuella(valor, clientes) {
  if (!valor) return "Selecciona un cliente.";
  const id = Number(valor);
  if (!Number.isInteger(id) || !clientes.some((c) => c.id === id)) return "El cliente seleccionado no existe.";
  return "";
}
