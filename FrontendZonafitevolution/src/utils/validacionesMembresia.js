// Validaciones de los formularios de membresías. Cada validador devuelve "" si el valor es correcto o el mensaje de error.
import { diaDe, estaVigente, hoyLocal } from "./estadoMembresia";
import { validarCedula } from "./validacionesCliente";

// La fecha de inicio no puede ser anterior a hoy y puede ir hasta 1 año adelante
export const DIAS_ATRAS_MAX = 0;
export const DIAS_ADELANTE_MAX = 365;

export function sumarDias(fechaISO, dias) {
  const f = new Date(`${fechaISO}T00:00:00Z`);
  f.setUTCDate(f.getUTCDate() + dias);
  return f.toISOString().slice(0, 10);
}

export function limitesFechaInicio(hoy = hoyLocal()) {
  return { min: sumarDias(hoy, -DIAS_ATRAS_MAX), max: sumarDias(hoy, DIAS_ADELANTE_MAX) };
}

// Una fecha AAAA-MM-DD debe existir de verdad (rechaza 2026-02-30)
function fechaExiste(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const f = new Date(`${texto}T00:00:00Z`);
  return !Number.isNaN(f.getTime()) && f.toISOString().startsWith(texto);
}

export function validarFechaInicio(valor, hoy = hoyLocal()) {
  const texto = String(valor ?? "").trim();
  if (!texto) return "La fecha de inicio es obligatoria.";
  if (!fechaExiste(texto)) return "La fecha de inicio no es válida.";
  const { min, max } = limitesFechaInicio(hoy);
  if (texto < min) return "La fecha de inicio no puede ser anterior a hoy.";
  if (texto > max) return "La fecha de inicio no puede superar un año desde hoy.";
  return "";
}

export function membresiaVigenteDe(clienteId, membresias, hoy = hoyLocal()) {
  return membresias.find((m) => m.cliente_id === clienteId && m.estado === "activa" && estaVigente(m, hoy)) ?? null;
}

export function membresiaPendienteDe(clienteId, membresias) {
  return membresias.find((m) => m.cliente_id === clienteId && m.estado === "pendiente") ?? null;
}

// Primer día en que puede iniciar una membresía nueva: el siguiente al fin de la activa, o null si no hay activa con fecha de fin
export function inicioMinimoTrasActiva(clienteId, membresias, hoy = hoyLocal()) {
  const fin = diaDe(membresiaVigenteDe(clienteId, membresias, hoy)?.fecha_fin);
  return fin ? sumarDias(fin, 1) : null;
}

export function validarClienteMembresia(valor, clientes, membresias, hoy = hoyLocal()) {
  if (!valor) return "Selecciona un cliente.";
  const id = Number(valor);
  if (!Number.isInteger(id) || !clientes.some((c) => c.id === id)) return "El cliente seleccionado no existe.";
  // ANTERIOR: si el cliente tenía una membresía activa y vigente se devolvía
  // "Este cliente ya tiene una membresía activa. Usa «Renovar por cédula»." y no se podía asignar.
  // NUEVO: con una activa se permite asignar (quedará pendiente). Se bloquea si ya hay una pendiente
  // (el servidor admite una sola) o si la activa es una tiquetera sin usar (aún no tiene fecha de fin).
  const pendiente = membresiaPendienteDe(id, membresias);
  if (pendiente) {
    return `Este cliente ya tiene una membresía pendiente que inicia el ${diaDe(pendiente.fecha_inicio)}.`;
  }
  const vigente = membresiaVigenteDe(id, membresias, hoy);
  if (vigente && !diaDe(vigente.fecha_fin)) {
    return "Este cliente tiene una tiquetera sin usar: su fecha de fin se fija en el primer ingreso. Usa «Renovar por cédula».";
  }
  return "";
}

export function validarInicioTrasActiva(valorCliente, fecha, membresias, hoy = hoyLocal()) {
  const minimo = inicioMinimoTrasActiva(Number(valorCliente), membresias, hoy);
  if (minimo && String(fecha) < minimo) {
    return `El cliente tiene una membresía activa; la nueva debe iniciar desde el ${minimo}.`;
  }
  return "";
}

// Solo se pueden elegir planes activos
export function validarPlanMembresia(valor, planes) {
  if (!valor) return "Selecciona un plan.";
  const id = Number(valor);
  const plan = planes.find((p) => p.id === id);
  if (!Number.isInteger(id) || !plan) return "El plan seleccionado no existe.";
  if (!plan.activo) return "El plan seleccionado no está disponible.";
  return "";
}

export const validarCedulaRenovacion = validarCedula;

export function validarAsignacion(valores, { clientes, planes, membresias, hoy = hoyLocal() }) {
  return {
    cliente: validarClienteMembresia(valores.cliente, clientes, membresias, hoy),
    plan: validarPlanMembresia(valores.plan, planes),
    // ANTERIOR: fecha: validarFechaInicio(valores.fecha, hoy),
    // NUEVO: además, si el cliente tiene una activa, la fecha debe ser posterior a su fin (evita periodos solapados).
    fecha: validarFechaInicio(valores.fecha, hoy) || validarInicioTrasActiva(valores.cliente, valores.fecha, membresias, hoy),
  };
}

export function hayErroresMembresia(errores) {
  return Object.values(errores).some(Boolean);
}

// Fecha de fin que calculará el servidor: inicio + duración del plan
export function fechaFinEstimada(fechaInicio, plan) {
  // Tiquetera: la duración cuenta desde el primer ingreso, así que todavía no hay fecha de fin
  if (!plan || plan.max_ingresos || !fechaExiste(String(fechaInicio))) return "";
  return sumarDias(fechaInicio, Number(plan.duracion_dias));
}

// Inicio de una renovación: si la membresía activa sigue vigente, empieza al día siguiente de su fin; si no, hoy
export function inicioRenovacion(info, hoy = hoyLocal()) {
  const fin = diaDe(info?.fecha_fin);
  if (info?.estado === "activa" && fin && fin >= hoy) return sumarDias(fin, 1);
  return hoy;
}
