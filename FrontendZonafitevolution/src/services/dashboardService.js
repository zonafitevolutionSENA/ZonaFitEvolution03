import { peticion } from "./api";

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

const numeroSeguro = (valor) => (Number.isFinite(Number(valor)) ? Number(valor) : 0);

// Arma el resumen del dashboard con los endpoints que ya existen en el backend
// (clientes, membresías, planes e historial de acceso). No requiere cambios en el backend.
export async function obtenerResumen() {
  const [rawClientes, rawMembresias, rawPlanes, rawAccesos] = await Promise.all([
    peticion("/clientes"),
    peticion("/membresias"),
    peticion("/planes"),
    peticion("/acceso-fisico/historial"),
  ]);

  const clientes = exigirLista(rawClientes, "los clientes");
  const planes = exigirLista(rawPlanes, "los planes");
  const accesos = exigirLista(rawAccesos, "el historial de acceso");
  // Se descartan membresías con fechas inválidas para no falsear los conteos
  const membresias = exigirLista(rawMembresias, "las membresías").filter(
    (m) => FECHA_VALIDA.test(String(m.fecha_inicio)) && FECHA_VALIDA.test(String(m.fecha_fin)),
  );

  const hoy = aTexto(new Date());
  const enSieteDias = sumarDias(hoy, 7);
  const inicioMes = `${hoy.slice(0, 8)}01`;

  const clientePorId = new Map(clientes.map((c) => [c.id, c]));
  const planPorId = new Map(planes.map((p) => [p.id, p]));

  const vigentes = membresias.filter((m) => m.estado === "activa" && dia(m.fecha_fin) >= hoy);
  const porVencer = vigentes
    .filter((m) => dia(m.fecha_fin) <= enSieteDias)
    .sort((a, b) => dia(a.fecha_fin).localeCompare(dia(b.fecha_fin)));

  const vencidas = membresias.filter(
    (m) => m.estado === "vencida" || (m.estado === "activa" && dia(m.fecha_fin) < hoy),
  );

  const ingresosMes = membresias
    .filter((m) => m.estado !== "cancelada" && dia(m.fecha_inicio) >= inicioMes)
    .reduce((suma, m) => suma + numeroSeguro(planPorId.get(m.plan_id)?.precio), 0);

  const conteoPlanes = new Map();
  for (const m of vigentes) {
    const nombre = planPorId.get(m.plan_id)?.nombre ?? "Sin plan";
    conteoPlanes.set(nombre, (conteoPlanes.get(nombre) ?? 0) + 1);
  }

  // El historial del backend trae solo los 50 accesos más recientes
  const accesosHoy = accesos.filter((a) => {
    const f = new Date(a.fecha_hora);
    return !Number.isNaN(f.getTime()) && aTexto(f) === hoy;
  });

  return {
    fecha: hoy,
    clientesTotal: clientes.length,
    membresias: {
      activas: vigentes.length,
      porVencer: porVencer.length,
      vencidas: vencidas.length,
      canceladas: membresias.filter((m) => m.estado === "cancelada").length,
    },
    ingresosMes,
    accesosHoy: {
      permitidos: accesosHoy.filter((a) => a.resultado === "permitido").length,
      denegados: accesosHoy.filter((a) => a.resultado === "denegado").length,
    },
    porVencer: porVencer.slice(0, 10).map((m) => ({
      id: m.id,
      cliente: clientePorId.get(m.cliente_id)?.nombre ?? "—",
      plan: planPorId.get(m.plan_id)?.nombre ?? "—",
      fechaFin: dia(m.fecha_fin),
    })),
    activasPorPlan: [...conteoPlanes.entries()]
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total),
  };
}
