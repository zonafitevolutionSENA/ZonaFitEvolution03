// Reglas para mostrar y cambiar el estado de la membresía de un cliente.
// Los clientes no se eliminan: lo que cambia es el estado de su membresía.

// ANTERIOR: export const ESTADOS = ["activa", "vencida", "cancelada"];
// NUEVO: se agrega "pendiente" (membresía comprada con otra activa, se activa sola en su fecha de inicio)
// para que se liste, se filtre y se etiquete en las pantallas.
export const ESTADOS = ["pendiente", "activa", "vencida", "cancelada"];

export const ETIQUETAS_ESTADO = {
  pendiente: "Pendiente",
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

// Tiquetera: membresía con una cantidad limitada de ingresos (ingresos_totales viene en null en las membresías por tiempo)
export function esTiquetera(membresia) {
  return membresia?.ingresos_totales !== null && membresia?.ingresos_totales !== undefined;
}

// Ingresos que le quedan a una tiquetera (null si la membresía es por tiempo)
export function ingresosRestantes(membresia) {
  if (!esTiquetera(membresia)) return null;
  return Math.max(Number(membresia.ingresos_totales) - Number(membresia.ingresos_usados ?? 0), 0);
}

// ¿Todavía se puede usar? Por tiempo: la fecha de fin no pasó. Tiquetera: le quedan ingresos y no venció
// (sin fecha de fin = aún no se usa, el plazo empieza en el primer ingreso)
export function estaVigente(membresia, hoy = hoyLocal()) {
  const fin = diaDe(membresia?.fecha_fin);
  if (esTiquetera(membresia)) return ingresosRestantes(membresia) > 0 && (fin === "" || fin >= hoy);
  return fin !== "" && fin >= hoy;
}

// Texto del estado de una membresía, con los ingresos y el vencimiento cuando corresponde
export function textoMembresia(membresia) {
  const fin = diaDe(membresia?.fecha_fin);
  let texto = ETIQUETAS_ESTADO[membresia?.estado] ?? String(membresia?.estado ?? "");
  if (esTiquetera(membresia)) {
    texto += ` · ${ingresosRestantes(membresia)} de ${membresia.ingresos_totales} ingresos disponibles`;
  }
  if (fin) texto += ` · vence ${fin}`;
  else if (esTiquetera(membresia) && membresia.estado === "activa") texto += " · el plazo empieza en el primer ingreso";
  return texto;
}

// Membresías activas que ya no se pueden usar: la fecha de fin pasó (vencen al terminar ese día) o a la tiquetera se le acabaron los ingresos
export function membresiasVencidas(membresias, hoy = hoyLocal()) {
  return membresias.filter((m) => {
    if (m.estado !== "activa") return false;
    if (esTiquetera(m) && ingresosRestantes(m) === 0) return true;
    const fin = diaDe(m.fecha_fin);
    return fin !== "" && fin < hoy;
  });
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
// Reactivar solo se ofrece a quien tenga permiso (Administrador): el Empleado no puede reabrir membresías.
export function accionesPermitidas(membresia, membresiasDelCliente, hoy = hoyLocal(), puedeReactivar = true) {
  if (!membresia) return [];
  const fin = diaDe(membresia.fecha_fin);

  // NUEVO: una pendiente solo se puede cancelar; la activación la hace la tarea diaria del servidor.
  if (membresia.estado === "pendiente") return [{ estado: "cancelada", etiqueta: "Cancelar membresía" }];

  if (membresia.estado === "activa") {
    if ((fin && fin < hoy) || (esTiquetera(membresia) && ingresosRestantes(membresia) === 0)) return [{ estado: "vencida", etiqueta: "Marcar como vencida" }];
    return [{ estado: "cancelada", etiqueta: "Cancelar membresía" }];
  }

  if (membresia.estado === "cancelada") {
    const hayOtraActiva = membresiasDelCliente.some((m) => m.estado === "activa" && m.id !== membresia.id);
    if (puedeReactivar && estaVigente(membresia, hoy) && !hayOtraActiva) {
      return [{ estado: "activa", etiqueta: "Reactivar membresía" }];
    }
  }

  return [];
}
