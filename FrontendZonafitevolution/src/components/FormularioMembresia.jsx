import { useMemo, useState } from "react";
import {
  fechaFinEstimada,
  hayErroresMembresia,
  inicioMinimoTrasActiva,
  limitesFechaInicio,
  validarAsignacion,
  validarClienteMembresia,
} from "../utils/validacionesMembresia";
import { hoyLocal } from "../utils/estadoMembresia";
import BuscadorCliente from "./BuscadorCliente";

const SIN_ERRORES = { cliente: "", plan: "", fecha: "" };

const formatoPrecio = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

// Formulario para asignar una membresía a un cliente. No llama a la API: entrega los datos con `alGuardar`.
function FormularioMembresia({ clientes, planes, membresias, alGuardar, alCancelar }) {
  const [valores, setValores] = useState({ cliente: "", plan: "", fecha: hoyLocal() });
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  const planesActivos = useMemo(
    () => planes.filter((p) => p.activo).sort((a, b) => Number(a.duracion_dias) - Number(b.duracion_dias)),
    [planes],
  );
  const { min, max } = limitesFechaInicio();
  const plan = planesActivos.find((p) => String(p.id) === valores.plan);
  const fin = fechaFinEstimada(valores.fecha, plan);
  const contexto = { clientes, planes, membresias };
  const inicioMinimo = valores.cliente ? inicioMinimoTrasActiva(Number(valores.cliente), membresias) : null;
  const quedaraPendiente = Boolean(inicioMinimo) || valores.fecha > hoyLocal();

  function cambiar(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
    if (errorGeneral) setErrorGeneral("");
  }

  // ANTERIOR: al elegir un cliente se avisaba de inmediato si ya tenía una membresía activa
  // y solo se guardaba el cliente: setValores((v) => ({ ...v, cliente: id }));
  // NUEVO: si tiene una activa, la fecha de inicio se mueve al día siguiente de su fin para que
  // la nueva quede pendiente sin solaparse.
  function elegirCliente(id) {
    const minimo = id ? inicioMinimoTrasActiva(Number(id), membresias) : null;
    setValores((v) => ({ ...v, cliente: id, fecha: minimo && v.fecha < minimo ? minimo : v.fecha }));
    setErrores((e) => ({ ...e, cliente: id ? validarClienteMembresia(id, clientes, membresias) : "" }));
    if (errorGeneral) setErrorGeneral("");
  }

  function validarAlSalir(campo) {
    setErrores((e) => ({ ...e, [campo]: validarAsignacion(valores, contexto)[campo] }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita envíos duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = validarAsignacion(valores, contexto);
    setErrores(resultado);
    if (hayErroresMembresia(resultado)) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      return;
    }

    setGuardando(true);
    setErrorGeneral("");
    try {
      await alGuardar({
        cliente_id: Number(valores.cliente),
        plan_id: Number(valores.plan),
        fecha_inicio: valores.fecha,
      });
    } catch (err) {
      setErrorGeneral(err.message);
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Asignar membresía">
      <h3>Asignar membresía</h3>

      <BuscadorCliente
        id="cliente-membresia"
        etiqueta="Cliente *"
        clientes={clientes}
        valor={valores.cliente}
        alCambiar={elegirCliente}
        error={errores.cliente}
        disabled={guardando}
      />

      <div>
        <label htmlFor="plan-membresia">Plan *</label>
        <select
          id="plan-membresia"
          value={valores.plan}
          onChange={(e) => cambiar("plan", e.target.value)}
          onBlur={() => validarAlSalir("plan")}
          aria-invalid={errores.plan ? "true" : undefined}
          disabled={guardando}
        >
          <option value="">Selecciona un plan</option>
          {planesActivos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.duracion_dias} {Number(p.duracion_dias) === 1 ? "día" : "días"}{p.max_ingresos ? ` · ${p.max_ingresos} ingresos` : ""} — {formatoPrecio.format(Number(p.precio))}
            </option>
          ))}
        </select>
        {errores.plan && <p className="mensaje-error" role="alert">{errores.plan}</p>}
      </div>

      <div>
        <label htmlFor="fecha-membresia">Fecha de inicio *</label>
        <input
          id="fecha-membresia"
          type="date"
          min={min}
          max={max}
          value={valores.fecha}
          onChange={(e) => cambiar("fecha", e.target.value)}
          onBlur={() => validarAlSalir("fecha")}
          aria-invalid={errores.fecha ? "true" : undefined}
          disabled={guardando}
        />
        {errores.fecha ? (
          <p className="mensaje-error" role="alert">{errores.fecha}</p>
        ) : (
          plan?.max_ingresos ? (
            <small>
              Incluye {plan.max_ingresos} ingresos. Los {plan.duracion_dias} días cuentan desde el primer ingreso.
              {/* NUEVO: aviso cuando la tiquetera quedará pendiente hasta su fecha de inicio */}
              {quedaraPendiente && ` Quedará pendiente y se activará automáticamente el ${valores.fecha}.`}
            </small>
          ) : (
            // ANTERIOR: fin && <small>Vencerá el {fin}.</small>
            // NUEVO: se informa cuando la membresía quedará pendiente hasta su fecha de inicio.
            fin && (
              <small>
                Vencerá el {fin}.
                {quedaraPendiente && ` Quedará pendiente y se activará automáticamente el ${valores.fecha}.`}
              </small>
            )
          )
        )}
      </div>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      <button type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : "Asignar membresía"}
      </button>
      <button type="button" onClick={alCancelar} disabled={guardando}>
        Cancelar
      </button>
    </form>
  );
}

export default FormularioMembresia;
