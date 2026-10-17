// Búsqueda de clientes por nombre o cédula para los formularios que piden elegir un cliente.
// Con cientos de clientes una lista desplegable es incómoda: se escribe y se elige entre pocas coincidencias.

export const MIN_BUSQUEDA_CLIENTE = 2;
export const MAX_BUSQUEDA_CLIENTE = 50;
export const MAX_RESULTADOS_CLIENTE = 8;

// Quita caracteres de control y limita el largo al escribir o pegar
export function limpiarBusquedaCliente(valor) {
  return String(valor ?? "")
    .replace(/\p{Cc}/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, MAX_BUSQUEDA_CLIENTE);
}

// Minúsculas y sin tildes, para que "jose" encuentre "José"
function simplificar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

// Devuelve las coincidencias (máximo MAX_RESULTADOS_CLIENTE) y cuántas hay en total.
// Cada palabra escrita debe aparecer en el nombre o en la cédula.
export function filtrarClientes(clientes, texto) {
  const palabras = simplificar(texto).split(/\s+/).filter(Boolean);
  if (palabras.join("").length < MIN_BUSQUEDA_CLIENTE) {
    return { resultados: [], total: 0, suficiente: false };
  }

  const coincidencias = clientes
    .filter((c) => {
      const base = simplificar(`${c.nombre} ${c.cedula}`);
      return palabras.every((p) => base.includes(p));
    })
    .sort((a, b) => String(a.nombre).localeCompare(String(b.nombre), "es"));

  return {
    resultados: coincidencias.slice(0, MAX_RESULTADOS_CLIENTE),
    total: coincidencias.length,
    suficiente: true,
  };
}
