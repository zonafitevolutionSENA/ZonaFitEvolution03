import { peticion } from "./api";
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

// El servidor debe responder con listas; si no, se corta con un mensaje claro en vez de romper la pantalla
function exigirLista(datos, nombre) {
  if (!Array.isArray(datos)) {
    throw new Error(`Respuesta inesperada del servidor al consultar ${nombre}.`);
  }
  return datos.filter((fila) => fila && typeof fila === "object");
}

// Últimos movimientos de acceso para la tarjeta "Actividad reciente"
export async function obtenerActividadReciente(limite = 5) {
  const accesos = exigirLista(await peticion("/acceso-fisico/historial"), "el historial de acceso");

  return accesos
    .filter((a) => a.resultado === "permitido" || a.resultado === "denegado")
    .filter((a) => !Number.isNaN(new Date(a.fecha_hora).getTime()))
    .slice(0, limite)
    .map((a) => ({
      id: a.id,
      cliente: typeof a.nombre_cliente === "string" && a.nombre_cliente.trim() ? a.nombre_cliente : "Huella no reconocida",
      fechaHora: new Date(a.fecha_hora),
      permitido: a.resultado === "permitido",
      tipo: a.resultado === "permitido" ? "Entrada" : String(a.motivo ?? "Acceso denegado"),
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
