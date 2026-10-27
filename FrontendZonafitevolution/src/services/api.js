const API_URL = import.meta.env.VITE_API_URL;
export const EVENTO_SESION_EXPIRADA = "zonafit:sesion-expirada";
let tokenSesion = null;

export function establecerTokenSesion(token) {
  tokenSesion = token || null;
}

export function limpiarTokenSesion() {
  tokenSesion = null;
}

export async function peticion(ruta, opciones = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        "Content-Type": "application/json",
        ...(tokenSesion && { Authorization: `Bearer ${tokenSesion}` }),
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
