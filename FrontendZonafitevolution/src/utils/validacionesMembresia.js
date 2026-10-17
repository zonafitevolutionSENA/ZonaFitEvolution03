// Validaciones de los formularios de membresías. Cada validador devuelve "" si el valor es correcto o el mensaje de error.
import { diaDe, hoyLocal } from "./estadoMembresia";
import { validarCedula } from "./validacionesCliente";

// La fecha de inicio puede ir hasta 30 días atrás (registro tardío) y hasta 1 año adelante
export const DIAS_ATRAS_MAX = 30;
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
  if (texto < min) return `La fecha de inicio no puede ser anterior a ${DIAS_ATRAS_MAX} días atrás.`;
  if (texto > max) return "La fecha de inicio no puede superar un año desde hoy.";
  return "";
}

// ¿El cliente ya tiene una membresía activa y vigente? (el backend no permite dos activas a la vez)
export function tieneMembresiaVigente(clienteId, membresias, hoy = hoyLocal()) {
  return membresias.some((m) => m.cliente_id === clienteId && m.estado === "activa" && diaDe(m.fecha_fin) >= hoy);
}

export function validarClienteMembresia(valor, clientes, membresias, hoy = hoyLocal()) {
  if (!valor) return "Selecciona un cliente.";
  const id = Number(valor);
  if (!Number.isInteger(id) || !clientes.some((c) => c.id === id)) return "El cliente seleccionado no existe.";
  if (tieneMembresiaVigente(id, membresias, hoy)) {
    return "Este cliente ya tiene una membresía activa. Usa «Renovar por cédula».";
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
    fecha: validarFechaInicio(valores.fecha, hoy),
  };
}

export function hayErroresMembresia(errores) {
  return Object.values(errores).some(Boolean);
}

// Fecha de fin que calculará el servidor: inicio + duración del plan
export function fechaFinEstimada(fechaInicio, plan) {
  if (!plan || !fechaExiste(String(fechaInicio))) return "";
  return sumarDias(fechaInicio, Number(plan.duracion_dias));
}

// Inicio de una renovación: si la membresía activa sigue vigente, empieza al día siguiente de su fin; si no, hoy
export function inicioRenovacion(info, hoy = hoyLocal()) {
  const fin = diaDe(info?.fecha_fin);
  if (info?.estado === "activa" && fin && fin >= hoy) return sumarDias(fin, 1);
  return hoy;
}
