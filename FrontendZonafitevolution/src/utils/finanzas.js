// Cálculos del registro financiero. Cada membresía es un pago por el precio actual de su plan
// (la membresía no guarda el precio pagado). Todas las funciones son puras: no llaman a la API.
import { ETIQUETAS_ESTADO, diaDe } from "./estadoMembresia";
import { diaLocal, hayErroresRango, validarRangoFechas } from "./filtrosHistorial";
import { simplificarTexto } from "./busquedaClientes";

export const FILTROS_ESTADO_PAGO = [
  { id: "todos", etiqueta: "Todas" },
  ...Object.entries(ETIQUETAS_ESTADO).map(([id, etiqueta]) => ({ id, etiqueta })),
];

export const ORDENES_RESUMEN = [
  { id: "total", etiqueta: "Mayor total pagado" },
  { id: "pagos", etiqueta: "Más pagos" },
  { id: "reciente", etiqueta: "Pago más reciente" },
  { id: "nombre", etiqueta: "Nombre (A-Z)" },
];

const formatoPesos = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export function pesos(valor) {
  return formatoPesos.format(Number(valor) || 0);
}

// Día del pago: cuando se registró la membresía; si no viene esa fecha, el día de inicio
export function diaDelPago(membresia) {
  if (membresia.fecha_creacion) {
    const fecha = new Date(membresia.fecha_creacion);
    if (!Number.isNaN(fecha.getTime())) return diaLocal(fecha);
  }
  return diaDe(membresia.fecha_inicio);
}

// Precio del plan, o null si el plan no existe o su precio no es un número válido
export function montoDelPlan(plan) {
  if (!plan) return null;
  const monto = Number(plan.precio);
  return Number.isFinite(monto) && monto >= 0 ? monto : null;
}

export function construirPagos(membresias, planes) {
  const porId = new Map(planes.map((p) => [p.id, p]));
  return membresias
    .filter((m) => Number.isInteger(m.cliente_id))
    .map((m) => {
      const plan = porId.get(m.plan_id) ?? null;
      return {
        id: m.id,
        clienteId: m.cliente_id,
        plan: plan?.nombre ?? "Plan desconocido",
        monto: montoDelPlan(plan),
        dia: diaDelPago(m),
        estado: m.estado,
        inicio: diaDe(m.fecha_inicio),
        fin: diaDe(m.fecha_fin),
      };
    });
}

// Filtra los pagos por estado de la membresía y rango de días. Un rango inválido no filtra por fechas.
export function filtrarPagos(pagos, { estado, desde, hasta }) {
  const rangoValido = !hayErroresRango(validarRangoFechas(desde, hasta));
  return pagos.filter((p) => {
    if (estado && estado !== "todos" && p.estado !== estado) return false;
    if (rangoValido) {
      if (desde && (!p.dia || p.dia < desde)) return false;
      if (hasta && (!p.dia || p.dia > hasta)) return false;
    }
    return true;
  });
}

// Un resumen por cliente: pagos (del más reciente al más antiguo), cantidad, total y último pago
export function resumirPorCliente(clientes, pagos) {
  const porCliente = new Map();
  for (const p of pagos) {
    if (!porCliente.has(p.clienteId)) porCliente.set(p.clienteId, []);
    porCliente.get(p.clienteId).push(p);
  }

  return clientes.map((cliente) => {
    const lista = [...(porCliente.get(cliente.id) ?? [])].sort(
      (a, b) => b.dia.localeCompare(a.dia) || b.id - a.id,
    );
    const conMonto = lista.filter((p) => p.monto !== null);
    const total = conMonto.reduce((suma, p) => suma + p.monto, 0);
    return {
      cliente,
      pagos: lista,
      cantidad: lista.length,
      total: Math.round(total * 100) / 100,
      sinPrecio: lista.length - conMonto.length,
      ultimo: lista[0]?.dia ?? "",
    };
  });
}

export function limpiarTextoFiltro(valor) {
  return String(valor ?? "").replace(/\p{Cc}/gu, "").replace(/\s{2,}/g, " ");
}

// Filtra por nombre o cédula (sin importar mayúsculas ni tildes) y, si se pide, deja solo clientes con pagos
export function filtrarResumenes(resumenes, { texto, soloConPagos }) {
  const palabras = simplificarTexto(limpiarTextoFiltro(texto)).split(/\s+/).filter(Boolean);
  return resumenes.filter((r) => {
    if (soloConPagos && r.cantidad === 0) return false;
    const base = simplificarTexto(`${r.cliente.nombre} ${r.cliente.cedula}`);
    return palabras.every((p) => base.includes(p));
  });
}

export function ordenarResumenes(resumenes, orden) {
  const porNombre = (a, b) => String(a.cliente.nombre).localeCompare(String(b.cliente.nombre), "es");
  const copia = [...resumenes];
  switch (orden) {
    case "pagos":
      return copia.sort((a, b) => b.cantidad - a.cantidad || porNombre(a, b));
    case "reciente":
      return copia.sort((a, b) => b.ultimo.localeCompare(a.ultimo) || porNombre(a, b));
    case "nombre":
      return copia.sort(porNombre);
    default:
      return copia.sort((a, b) => b.total - a.total || porNombre(a, b));
  }
}

export function totalesGenerales(resumenes) {
  const total = resumenes.reduce((suma, r) => suma + r.total, 0);
  return {
    total: Math.round(total * 100) / 100,
    pagos: resumenes.reduce((suma, r) => suma + r.cantidad, 0),
    clientesConPagos: resumenes.filter((r) => r.cantidad > 0).length,
    sinPrecio: resumenes.reduce((suma, r) => suma + r.sinPrecio, 0),
  };
}
