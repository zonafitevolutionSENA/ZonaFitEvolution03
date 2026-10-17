import { listarClientes } from "./clienteService";
import { listarMembresias } from "./membresiaService";
import { listarPlanes } from "./planService";

// El backend aún no tiene un módulo de pagos: el registro financiero se calcula con los datos que ya existen.
// Cada membresía cuenta como un pago por el precio de su plan. Solo lee datos; no modifica nada.
export async function obtenerRegistroFinanciero() {
  const [clientes, membresias, planes] = await Promise.all([
    listarClientes(),
    listarMembresias(),
    listarPlanes(),
  ]);
  return { clientes, membresias, planes };
}
