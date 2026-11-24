const API_URL = import.meta.env.VITE_API_URL;
export const EVENTO_SESION_EXPIRADA = "zonafit:sesion-expirada";
const CLAVE_SESION = "zonafitSesion";

function leerSesionGuardada() {
  try {
    const sesion = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
    if (!sesion?.token || !sesion?.usuario) return null;
    const { exp } = JSON.parse(atob(sesion.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (!exp || exp * 1000 <= Date.now()) return null;
    return sesion;
  } catch {
    return null;
  }
}

function guardarSesion(sesion) {
  try {
    if (sesion) sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    else sessionStorage.removeItem(CLAVE_SESION);
  } catch {
    // Navegación privada o almacenamiento bloqueado: la sesión queda solo en memoria
  }
}

let sesionActual = leerSesionGuardada();
if (!sesionActual) guardarSesion(null);

export function obtenerUsuarioGuardado() {
  return sesionActual?.usuario ?? null;
}

export function establecerSesion(token, usuario) {
  sesionActual = token && usuario ? { token, usuario } : null;
  guardarSesion(sesionActual);
}

export function limpiarTokenSesion() {
  establecerSesion(null, null);
}

export async function peticion(ruta, opciones = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        "Content-Type": "application/json",
        ...(sesionActual && { Authorization: `Bearer ${sesionActual.token}` }),
        ...opciones.headers,
      },
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const datos = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && ruta !== "/auth/login") {
      limpiarTokenSesion();
      window.dispatchEvent(new CustomEvent(EVENTO_SESION_EXPIRADA, {
        detail: { expirada: datos.error === "Token inválido o expirado" },
      }));
    }
    const error = new Error(datos.error || "Error en la petición");
    error.status = res.status;
    throw error;
  }

  return datos;
}
