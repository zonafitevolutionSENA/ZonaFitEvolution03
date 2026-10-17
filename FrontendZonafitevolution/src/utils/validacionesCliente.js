// Validaciones del formulario de clientes. Cada validador devuelve "" si el valor es correcto o el mensaje de error.
// Los límites coinciden con la tabla `clientes` y con las reglas del backend (cédula: 6 a 15 dígitos).

export const LIMITES = {
  nombreMin: 3,
  nombreMax: 100,
  cedulaMin: 6,
  cedulaMax: 15,
  correoMax: 100,
  telefonoMax: 20,
};

const REGEX_NOMBRE = /^\p{L}[\p{L}\p{M}'.\- ]*$/u;
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_CEDULA = /^\d+$/;
const REGEX_TELEFONO = /^\+?\d{7,15}$/;

// Quita caracteres de control, unifica Unicode y colapsa espacios
export function normalizarTexto(valor) {
  return String(valor ?? "")
    .normalize("NFC")
    .replace(/\p{Cc}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Teléfono: se permiten espacios, guiones y paréntesis al escribir; se guarda solo "+" y dígitos
export function normalizarTelefono(valor) {
  return String(valor ?? "").replace(/[\s\-().]/g, "");
}

export function validarNombre(valor) {
  const nombre = normalizarTexto(valor);
  if (!nombre) return "El nombre es obligatorio.";
  if (nombre.length < LIMITES.nombreMin) return `El nombre debe tener al menos ${LIMITES.nombreMin} caracteres.`;
  if (nombre.length > LIMITES.nombreMax) return `El nombre no puede superar ${LIMITES.nombreMax} caracteres.`;
  if (!REGEX_NOMBRE.test(nombre)) return "El nombre solo puede tener letras, espacios, apóstrofes, puntos y guiones.";
  return "";
}

export function validarCedula(valor) {
  const cedula = String(valor ?? "").trim();
  if (!cedula) return "La cédula es obligatoria.";
  if (!REGEX_CEDULA.test(cedula)) return "La cédula solo puede tener números.";
  if (cedula.length < LIMITES.cedulaMin || cedula.length > LIMITES.cedulaMax) {
    return `La cédula debe tener entre ${LIMITES.cedulaMin} y ${LIMITES.cedulaMax} dígitos.`;
  }
  return "";
}

// El correo es opcional: vacío es válido
export function validarCorreo(valor) {
  const correo = String(valor ?? "").trim();
  if (!correo) return "";
  if (correo.length > LIMITES.correoMax) return `El correo no puede superar ${LIMITES.correoMax} caracteres.`;
  if (!REGEX_CORREO.test(correo)) return "El formato del correo no es válido.";
  return "";
}

// El teléfono es opcional: vacío es válido
export function validarTelefono(valor) {
  const telefono = normalizarTelefono(valor);
  if (!telefono) return "";
  if (!REGEX_TELEFONO.test(telefono)) return "El teléfono debe tener entre 7 y 15 dígitos (puede empezar con +).";
  if (telefono.length > LIMITES.telefonoMax) return `El teléfono no puede superar ${LIMITES.telefonoMax} caracteres.`;
  return "";
}

// Valida todos los campos. `cedulasExistentes` evita registrar dos veces la misma cédula antes de llamar al servidor.
export function validarCliente(valores, { validarCedulaCampo = true, cedulasExistentes = [] } = {}) {
  const errores = {
    nombre: validarNombre(valores.nombre),
    correo: validarCorreo(valores.correo),
    telefono: validarTelefono(valores.telefono),
  };

  if (validarCedulaCampo) {
    errores.cedula = validarCedula(valores.cedula);
    if (!errores.cedula && cedulasExistentes.includes(String(valores.cedula).trim())) {
      errores.cedula = "Ya existe un cliente con esa cédula.";
    }
  }

  return errores;
}

export function hayErrores(errores) {
  return Object.values(errores).some(Boolean);
}

// Datos listos para enviar a la API: texto limpio y vacíos opcionales como null
export function prepararCliente(valores) {
  const correo = String(valores.correo ?? "").trim().toLowerCase();
  const telefono = normalizarTelefono(valores.telefono);
  return {
    nombre: normalizarTexto(valores.nombre),
    cedula: String(valores.cedula ?? "").trim(),
    correo: correo || null,
    telefono: telefono || null,
  };
}
