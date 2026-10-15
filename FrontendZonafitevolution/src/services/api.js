const API_URL = import.meta.env.VITE_API_URL;

export async function peticion(ruta, opciones = {}) {
  const token = localStorage.getItem("token");

  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...opciones.headers,
      },
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const datos = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(datos.error || "Error en la petición");
  }

  return datos;
}
