// Reglas para mostrar y cambiar el estado de la membresía de un cliente.
// Los clientes no se eliminan: lo que cambia es el estado de su membresía.

export const ESTADOS = ["activa", "vencida", "cancelada"];

export const ETIQUETAS_ESTADO = {
  activa: "Activa",
  vencida: "Vencida",
  cancelada: "Cancelada",
};

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

// Fecha como texto AAAA-MM-DD, o "" si no es válida
export function diaDe(fecha) {
  const texto = String(fecha ?? "").slice(0, 10);
  return FECHA.test(texto) ? texto : "";
}

export function hoyLocal() {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

// Membresía que representa al cliente: la activa si existe; si no, la de fecha de fin más reciente
export function membresiaActual(membresiasDelCliente) {
  const validas = membresiasDelCliente.filter((m) => ESTADOS.includes(m.estado));
  const activas = validas.filter((m) => m.estado === "activa");
  const candidatas = activas.length > 0 ? activas : validas;
  const ordenadas = [...candidatas].sort(
    (a, b) => diaDe(b.fecha_fin).localeCompare(diaDe(a.fecha_fin)) || b.id - a.id,
  );
  return ordenadas[0] ?? null;
}

// Cambios de estado que se pueden ofrecer para una membresía:
// - activa vigente → cancelar · activa con fecha de fin pasada → marcar como vencida
// - cancelada aún vigente y sin otra activa → reactivar · vencida → ninguno (se renueva desde Membresías)
export function accionesPermitidas(membresia, membresiasDelCliente, hoy = hoyLocal()) {
  if (!membresia) return [];
  const fin = diaDe(membresia.fecha_fin);

  if (membresia.estado === "activa") {
    if (fin && fin < hoy) return [{ estado: "vencida", etiqueta: "Marcar como vencida" }];
    return [{ estado: "cancelada", etiqueta: "Cancelar membresía" }];
  }

  if (membresia.estado === "cancelada") {
    const hayOtraActiva = membresiasDelCliente.some((m) => m.estado === "activa" && m.id !== membresia.id);
    if (fin && fin >= hoy && !hayOtraActiva) {
      return [{ estado: "activa", etiqueta: "Reactivar membresía" }];
    }
  }

  return [];
}
