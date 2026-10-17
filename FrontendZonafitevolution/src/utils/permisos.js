// Secciones del panel y qué roles pueden verlas (1 = Administrador, 2 = Empleado)
export const ROL_ADMIN = 1;
export const ROL_EMPLEADO = 2;

export const SECCIONES = [
  { id: "inicio", etiqueta: "Inicio", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "clientes", etiqueta: "Clientes", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "membresias", etiqueta: "Membresías", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "planes", etiqueta: "Planes", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "acceso", etiqueta: "Control de acceso", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "historial", etiqueta: "Historial", roles: [ROL_ADMIN, ROL_EMPLEADO] },
  { id: "personal", etiqueta: "Personal", roles: [ROL_ADMIN], soloAdmin: true },
];

export function etiquetaRol(rolId) {
  return rolId === ROL_ADMIN ? "Administrador" : "Empleado";
}

export function seccionesPermitidas(rolId) {
  return SECCIONES.filter((s) => s.roles.includes(rolId));
}

export function seccionPermitida(rolId, seccionId) {
  return seccionesPermitidas(rolId).some((s) => s.id === seccionId);
}
