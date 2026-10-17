import { peticion } from "./api";

function exigirId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Identificador de cliente no válido.");
  }
  return id;
}

function exigirCliente(dato) {
  if (!dato || typeof dato !== "object" || !Number.isInteger(dato.id)) {
    throw new Error("Respuesta inesperada del servidor al consultar el cliente.");
  }
  return dato;
}

// GET /api/clientes
export async function listarClientes() {
  const datos = await peticion("/clientes");
  if (!Array.isArray(datos)) {
    throw new Error("Respuesta inesperada del servidor al consultar los clientes.");
  }
  return datos.filter((c) => c && typeof c === "object" && Number.isInteger(c.id));
}

// POST /api/clientes  { nombre, cedula, correo, telefono }
export async function crearCliente(datos) {
  const cliente = await peticion("/clientes", {
    method: "POST",
    body: JSON.stringify(datos),
  });
  return exigirCliente(cliente);
}

// PUT /api/clientes/:id  { nombre, correo, telefono } (la cédula no se modifica)
export async function actualizarCliente(id, { nombre, correo, telefono }) {
  const cliente = await peticion(`/clientes/${exigirId(id)}`, {
    method: "PUT",
    body: JSON.stringify({ nombre, correo, telefono }),
  });
  return exigirCliente(cliente);
}

// DELETE /api/clientes/:id (solo Admin)
export function eliminarCliente(id) {
  return peticion(`/clientes/${exigirId(id)}`, { method: "DELETE" });
}
