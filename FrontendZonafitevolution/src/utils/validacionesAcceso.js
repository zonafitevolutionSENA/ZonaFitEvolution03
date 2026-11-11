// Validaciones del registro de huella. Cada validador devuelve "" si es correcto o el mensaje de error.

export function validarClienteHuella(valor, clientes) {
  if (!valor) return "Selecciona un cliente.";
  const id = Number(valor);
  if (!Number.isInteger(id) || !clientes.some((c) => c.id === id)) return "El cliente seleccionado no existe.";
  return "";
}
