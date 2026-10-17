// Validaciones del formulario de planes. Cada validador devuelve "" si el valor es correcto o el mensaje de error.
// Los límites coinciden con la tabla `planes` (nombre hasta 50 caracteres, precio DECIMAL(10,2)) y con las reglas del backend.

export const LIMITES_PLAN = {
  nombreMin: 2,
  nombreMax: 50,
  duracionMin: 1,
  duracionMax: 3650,
  precioMax: 50000000,
};

const REGEX_NOMBRE = /^[\p{L}\p{N}][\p{L}\p{N}\p{M} .-]*$/u;
const REGEX_DURACION = /^\d+$/;
const REGEX_PRECIO = /^\d{1,8}(\.\d{1,2})?$/;

// Quita caracteres de control, unifica Unicode y colapsa espacios
export function normalizarNombrePlan(valor) {
  return String(valor ?? "")
    .normalize("NFC")
    .replace(/\p{Cc}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function validarNombrePlan(valor) {
  const nombre = normalizarNombrePlan(valor);
  if (!nombre) return "El nombre del plan es obligatorio.";
  if (nombre.length < LIMITES_PLAN.nombreMin) return `El nombre debe tener al menos ${LIMITES_PLAN.nombreMin} caracteres.`;
  if (nombre.length > LIMITES_PLAN.nombreMax) return `El nombre no puede superar ${LIMITES_PLAN.nombreMax} caracteres.`;
  if (!REGEX_NOMBRE.test(nombre)) return "El nombre solo puede tener letras, números, espacios, puntos y guiones.";
  return "";
}

export function validarDuracion(valor) {
  const texto = String(valor ?? "").trim();
  if (!texto) return "La duración es obligatoria.";
  if (!REGEX_DURACION.test(texto)) return "La duración debe ser un número entero de días.";
  const dias = Number(texto);
  if (dias < LIMITES_PLAN.duracionMin || dias > LIMITES_PLAN.duracionMax) {
    return `La duración debe estar entre ${LIMITES_PLAN.duracionMin} y ${LIMITES_PLAN.duracionMax} días.`;
  }
  return "";
}

export function validarPrecio(valor) {
  const texto = String(valor ?? "").trim();
  if (!texto) return "El precio es obligatorio.";
  if (!REGEX_PRECIO.test(texto)) return "El precio debe ser un número, sin puntos de miles ni signos (máximo 2 decimales).";
  const precio = Number(texto);
  if (precio <= 0) return "El precio debe ser mayor a 0.";
  if (precio > LIMITES_PLAN.precioMax) return "El precio no puede superar 50.000.000.";
  return "";
}

// `otrosNombres` evita crear dos planes con el mismo nombre (sin distinguir mayúsculas) antes de llamar al servidor
export function validarPlan(valores, { otrosNombres = [] } = {}) {
  const errores = {
    nombre: validarNombrePlan(valores.nombre),
    duracion: validarDuracion(valores.duracion),
    precio: validarPrecio(valores.precio),
  };
  if (!errores.nombre) {
    const nombre = normalizarNombrePlan(valores.nombre).toLowerCase();
    if (otrosNombres.some((n) => String(n).trim().toLowerCase() === nombre)) {
      errores.nombre = "Ya existe un plan con ese nombre.";
    }
  }
  return errores;
}

export function hayErroresPlan(errores) {
  return Object.values(errores).some(Boolean);
}

// Datos listos para enviar a la API
export function prepararPlan(valores) {
  return {
    nombre: normalizarNombrePlan(valores.nombre),
    duracion_dias: Number(String(valores.duracion).trim()),
    precio: Number(String(valores.precio).trim()),
  };
}
