import { listarHistorial } from "./accesoService";
import { listarClientes } from "./clienteService";
import { listarMembresias } from "./membresiaService";
import { listarPlanes } from "./planService";

function aTexto(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function sumarDias(fechaISO, dias) {
  const f = new Date(`${fechaISO}T00:00:00Z`);
  f.setUTCDate(f.getUTCDate() + dias);
  return f.toISOString().slice(0, 10);
}

const dia = (fecha) => String(fecha).slice(0, 10);
const FECHA_VALIDA = /^\d{4}-\d{2}-\d{2}/;

// Últimos movimientos de acceso para la tarjeta "Actividad reciente"
export async function obtenerActividadReciente(limite = 5) {
  const accesos = await listarHistorial();

  return accesos.slice(0, limite).map((a) => ({
    id: a.id,
    cliente: a.cliente,
    fechaHora: a.fechaHora,
    permitido: a.permitido,
    tipo: a.permitido ? "Entrada" : a.motivo || "Acceso denegado",
  }));
}

// Membresías activas que vencen en los próximos 7 días (campana de notificaciones)
export async function obtenerPorVencer() {
  const [rawClientes, rawMembresias, rawPlanes] = await Promise.all([
    listarClientes(),
    listarMembresias(),
    listarPlanes(),
  ]);

  const clientes = rawClientes;
  const planes = rawPlanes;
  // Se descartan membresías con fechas inválidas para no falsear los resultados
  const membresias = rawMembresias.filter((m) =>
    FECHA_VALIDA.test(String(m.fecha_fin)),
  );

  const hoy = aTexto(new Date());
  const limite = sumarDias(hoy, 7);
  const clientePorId = new Map(clientes.map((c) => [c.id, c]));
  const planPorId = new Map(planes.map((p) => [p.id, p]));

  return membresias
    .filter((m) => m.estado === "activa" && dia(m.fecha_fin) >= hoy && dia(m.fecha_fin) <= limite)
    .sort((a, b) => dia(a.fecha_fin).localeCompare(dia(b.fecha_fin)))
    .map((m) => ({
      id: m.id,
      cliente: clientePorId.get(m.cliente_id)?.nombre ?? "—",
      plan: planPorId.get(m.plan_id)?.nombre ?? "—",
      fechaFin: dia(m.fecha_fin),
    }));
}
