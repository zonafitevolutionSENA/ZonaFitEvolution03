import { useState } from "react";
import { LIMITES_PLAN, hayErroresPlan, prepararPlan, validarPlan } from "../utils/validacionesPlan";
import Campo from "./Campo";

const SIN_ERRORES = { nombre: "", duracion: "", precio: "" };

// Formulario para crear o editar un plan. No llama a la API: entrega los datos limpios con `alGuardar`.
function FormularioPlan({ plan = null, otrosNombres = [], alGuardar, alCancelar }) {
  const editando = Boolean(plan);
  const [valores, setValores] = useState({
    nombre: plan?.nombre ?? "",
    duracion: plan ? String(plan.duracion_dias) : "",
    precio: plan ? String(Number(plan.precio)) : "",
  });
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  function cambiar(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
    if (errorGeneral) setErrorGeneral("");
  }

  function validarAlSalir(campo) {
    setErrores((e) => ({ ...e, [campo]: validarPlan(valores, { otrosNombres })[campo] }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita envíos duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = validarPlan(valores, { otrosNombres });
    setErrores(resultado);
    if (hayErroresPlan(resultado)) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      return;
    }

    setGuardando(true);
    setErrorGeneral("");
    try {
      await alGuardar(prepararPlan(valores));
    } catch (err) {
      setErrorGeneral(err.message);
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label={editando ? "Editar plan" : "Crear plan"}>
      <h3>{editando ? "Editar plan" : "Crear plan"}</h3>

      <Campo
        id="nombre-plan"
        etiqueta="Nombre del plan *"
        type="text"
        autoComplete="off"
        maxLength={LIMITES_PLAN.nombreMax}
        value={valores.nombre}
        onChange={(e) => cambiar("nombre", e.target.value)}
        onBlur={() => validarAlSalir("nombre")}
        error={errores.nombre}
        disabled={guardando}
      />

      <Campo
        id="duracion-plan"
        etiqueta="Duración en días *"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={4}
        value={valores.duracion}
        // Solo dígitos al escribir o pegar
        onChange={(e) => cambiar("duracion", e.target.value.replace(/\D/g, ""))}
        onBlur={() => validarAlSalir("duracion")}
        error={errores.duracion}
        ayuda={`Entre ${LIMITES_PLAN.duracionMin} y ${LIMITES_PLAN.duracionMax} días.`}
        disabled={guardando}
      />

      <Campo
        id="precio-plan"
        etiqueta="Precio (COP) *"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        maxLength={11}
        value={valores.precio}
        // Solo dígitos y un punto decimal
        onChange={(e) => cambiar("precio", e.target.value.replace(/[^\d.]/g, ""))}
        onBlur={() => validarAlSalir("precio")}
        error={errores.precio}
        ayuda="Solo números, sin puntos de miles. Máximo 50.000.000."
        disabled={guardando}
      />

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      <button type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Crear plan"}
      </button>
      <button type="button" onClick={alCancelar} disabled={guardando}>
        Cancelar
      </button>
    </form>
  );
}

export default FormularioPlan;
