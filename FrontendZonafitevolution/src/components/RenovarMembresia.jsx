import { useMemo, useState } from "react";
import { ETIQUETAS_ESTADO, diaDe, hoyLocal } from "../utils/estadoMembresia";
import { inicioRenovacion, validarCedulaRenovacion, validarPlanMembresia } from "../utils/validacionesMembresia";
import Campo from "./Campo";

const formatoPrecio = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

// Renovación rápida: se busca al cliente por cédula y se elige el plan. No llama a la API: usa `alBuscar` y `alRenovar`.
function RenovarMembresia({ planes, alBuscar, alRenovar, alCancelar }) {
  const [cedula, setCedula] = useState("");
  const [errorCedula, setErrorCedula] = useState("");
  const [cliente, setCliente] = useState(null);
  const [plan, setPlan] = useState("");
  const [errorPlan, setErrorPlan] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const planesActivos = useMemo(
    () => planes.filter((p) => p.activo).sort((a, b) => Number(a.duracion_dias) - Number(b.duracion_dias)),
    [planes],
  );
  const ocupado = buscando || guardando;

  function cambiarCedula(valor) {
    // Solo dígitos; al cambiar la cédula se descarta el cliente encontrado
    setCedula(valor.replace(/\D/g, ""));
    setErrorCedula("");
    setErrorGeneral("");
    setCliente(null);
    setPlan("");
    setErrorPlan("");
  }

  async function buscar(evento) {
    evento.preventDefault();
    if (ocupado) return;
    const error = validarCedulaRenovacion(cedula);
    setErrorCedula(error);
    if (error) return;

    setBuscando(true);
    setErrorGeneral("");
    setCliente(null);
    try {
      setCliente(await alBuscar(cedula.trim()));
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setBuscando(false);
    }
  }

  async function renovar(evento) {
    evento.preventDefault();
    if (ocupado || !cliente) return;
    const error = validarPlanMembresia(plan, planes);
    setErrorPlan(error);
    if (error) return;

    setGuardando(true);
    setErrorGeneral("");
    try {
      await alRenovar({ cedula: cedula.trim(), plan_id: Number(plan) });
    } catch (err) {
      setErrorGeneral(err.message);
      setGuardando(false);
    }
  }

  const fin = diaDe(cliente?.fecha_fin);

  return (
    <section aria-label="Renovar por cédula">
      <h3>Renovar por cédula</h3>

      <form onSubmit={buscar} noValidate aria-label="Buscar cliente por cédula">
        <Campo
          id="cedula-renovacion"
          etiqueta="Cédula del cliente *"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={15}
          value={cedula}
          onChange={(e) => cambiarCedula(e.target.value)}
          error={errorCedula}
          ayuda="Solo números, de 6 a 15 dígitos."
          disabled={ocupado}
        />
        <button type="submit" disabled={ocupado}>{buscando ? "Buscando..." : "Buscar cliente"}</button>
      </form>

      {cliente && (
        <form onSubmit={renovar} noValidate aria-label="Renovar membresía">
          <p>
            <strong>{cliente.nombre}</strong> — cédula {cliente.cedula}
          </p>
          <p>
            Membresía actual:{" "}
            {cliente.membresia_id
              ? `${ETIQUETAS_ESTADO[cliente.estado] ?? cliente.estado}${cliente.nombre_plan ? ` (${cliente.nombre_plan})` : ""}${fin ? ` · vence ${fin}` : ""}`
              : "Sin membresía"}
          </p>

          <div>
            <label htmlFor="plan-renovacion">Plan para la renovación *</label>
            <select
              id="plan-renovacion"
              value={plan}
              onChange={(e) => { setPlan(e.target.value); setErrorPlan(""); setErrorGeneral(""); }}
              aria-invalid={errorPlan ? "true" : undefined}
              disabled={ocupado}
            >
              <option value="">Selecciona un plan</option>
              {planesActivos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} — {p.duracion_dias} {Number(p.duracion_dias) === 1 ? "día" : "días"} — {formatoPrecio.format(Number(p.precio))}
                </option>
              ))}
            </select>
            {errorPlan ? (
              <p className="mensaje-error" role="alert">{errorPlan}</p>
            ) : (
              <small>La nueva membresía empezará el {inicioRenovacion(cliente, hoyLocal())}.</small>
            )}
          </div>

          <button type="submit" disabled={ocupado}>{guardando ? "Renovando..." : "Renovar membresía"}</button>
        </form>
      )}

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      <button className="gestion-button-quiet" type="button" onClick={alCancelar} disabled={ocupado}>Cancelar</button>
    </section>
  );
}

export default RenovarMembresia;
