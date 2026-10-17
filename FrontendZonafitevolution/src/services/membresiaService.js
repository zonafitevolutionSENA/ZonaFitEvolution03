import { peticion } from "./api";
import { ESTADOS, membresiasVencidas } from "../utils/estadoMembresia";

// GET /api/membresias
export async function listarMembresias() {
  const datos = await peticion("/membresias");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar las membresías.");
  }
  return datos.filter((m) => m && typeof m === "object" && Number.isInteger(m.id));
}

// POST /api/membresias  { plan_id, fecha_inicio, cliente_id }
export async function crearMembresia({ plan_id, fecha_inicio, cliente_id }) {
  if (!Number.isInteger(plan_id) || plan_id <= 0 || !Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("Cliente o plan no válido.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(fecha_inicio))) {
    throw new Error("La fecha de inicio debe tener el formato AAAA-MM-DD.");
  }
  return exigirMembresia(
    await peticion("/membresias", { method: "POST", body: JSON.stringify({ plan_id, fecha_inicio, cliente_id }) }),
  );
}

// GET /api/membresias/buscar/:cedula → datos del cliente y su membresía más reciente
// (membresia_id, estado, fecha_fin y nombre_plan vienen en null si nunca tuvo una)
export async function buscarClienteParaRenovar(cedula) {
  const texto = String(cedula ?? "").trim();
  if (!/^\d{6,15}$/.test(texto)) {
    throw new Error("La cédula debe tener entre 6 y 15 dígitos.");
  }
  const info = await peticion(`/membresias/buscar/${texto}`);
  if (!info || typeof info !== "object" || !Number.isInteger(info.id)) {
    throw new Error("Respuesta inesperada del servidor al buscar el cliente.");
  }
  return info;
}

// POST /api/membresias/renovar  { cedula, plan_id }
export async function renovarMembresia({ cedula, plan_id }) {
  const texto = String(cedula ?? "").trim();
  if (!/^\d{6,15}$/.test(texto) || !Number.isInteger(plan_id) || plan_id <= 0) {
    throw new Error("Cédula o plan no válido.");
  }
  return exigirMembresia(
    await peticion("/membresias/renovar", { method: "POST", body: JSON.stringify({ cedula: texto, plan_id }) }),
  );
}

function exigirMembresia(dato) {
  if (!dato || typeof dato !== "object" || !Number.isInteger(dato.id)) {
    throw new Error("Respuesta inesperada del servidor al consultar la membresía.");
  }
  return dato;
}

// Lista las membresías ya al día: las activas con fecha de fin pasada se pasan a "vencida" y se vuelve a consultar.
// `fallidas` cuenta los cambios que el servidor rechazó; `errorRecarga` avisa si falló la segunda consulta.
export async function listarMembresiasAlDia() {
  const lista = await listarMembresias();
  const { actualizadas, fallidas } = await marcarVencidas(lista);
  let membresias = lista;
  let errorRecarga = "";
  if (actualizadas > 0) {
    try {
      membresias = await listarMembresias();
    } catch (err) {
      errorRecarga = err.message;
    }
  }
  return { membresias, vencidas: actualizadas, fallidas, errorRecarga };
}

// Peticiones en curso por membresía: si la pantalla pide lo mismo dos veces a la vez, se envía una sola
const enCurso = new Map();

function marcarUnaVencida(id) {
  if (!enCurso.has(id)) {
    const promesa = cambiarEstadoMembresia(id, "vencida").finally(() => enCurso.delete(id));
    enCurso.set(id, promesa);
  }
  return enCurso.get(id);
}

// Pasa a "vencida" toda membresía activa cuya fecha de fin ya pasó.
// Devuelve cuántas se actualizaron y cuántas fallaron; un fallo no detiene a las demás.
export async function marcarVencidas(membresias) {
  const pendientes = membresiasVencidas(membresias);
  const resultados = await Promise.allSettled(pendientes.map((m) => marcarUnaVencida(m.id)));
  const actualizadas = resultados.filter((r) => r.status === "fulfilled").length;
  return { actualizadas, fallidas: pendientes.length - actualizadas };
}

// PATCH /api/membresias/:id/estado  { estado }
export async function cambiarEstadoMembresia(id, estado) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Identificador de membresía no válido.");
  }
  if (!ESTADOS.includes(estado)) {
    throw new Error("Estado de membresía no válido.");
  }

  const membresia = await peticion(`/membresias/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
  if (!membresia || typeof membresia !== "object") {
    throw new Error("Respuesta inesperada del servidor al cambiar el estado.");
  }
  return membresia;
}
