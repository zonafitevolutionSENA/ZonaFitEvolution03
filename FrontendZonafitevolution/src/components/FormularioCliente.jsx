import { useState } from "react";
import { LIMITES, hayErrores, prepararCliente, validarCliente } from "../utils/validacionesCliente";
import Campo from "./Campo";

const SIN_ERRORES = { nombre: "", cedula: "", correo: "", telefono: "", aceptaTerminos: "", aceptaAvisos: "" };

function fechaCorta(valor) {
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? "" : fecha.toLocaleDateString("es-CO");
}

// Resumen de los términos y del tratamiento de datos que el cliente acepta (Ley 1581 de 2012).
// Es el mismo contenido del formato firmado (docs/legal/autorizacion-datos-biometricos.md).
function TextoTerminos() {
  return (
    <details>
      <summary>Ver términos y tratamiento de datos</summary>
      <p>
        <strong>Responsable:</strong> Gimnasio Zona Fit Evolution. Los datos de identificación y contacto (nombre, cédula,
        correo y teléfono) y el registro de ingresos se usan para gestionar la membresía, controlar el acceso a las
        instalaciones y llevar el historial de ingresos.
      </p>
      <p>
        La huella dactilar es un dato sensible y su registro es voluntario: se pide por separado con el formato firmado
        y en el sistema solo se guarda un código irreversible, nunca la imagen.
      </p>
      <p>
        El cliente puede conocer, actualizar, rectificar y suprimir sus datos y revocar esta autorización solicitándolo
        en la recepción. Los datos no se venden ni se entregan a terceros, salvo orden de autoridad competente. Puede
        presentar quejas ante la Superintendencia de Industria y Comercio.
      </p>
      <p>
        <strong>Avisos por correo (opcional):</strong> si se autorizan, el gimnasio envía un correo 7 días antes de que
        venza la membresía. Se pueden dejar de recibir en cualquier momento pidiéndolo en la recepción.
      </p>
    </details>
  );
}

// Formulario para registrar o editar un cliente. No llama a la API: entrega los datos limpios con `alGuardar`.
// En edición la cédula se muestra bloqueada porque el backend no permite cambiarla.
function FormularioCliente({ cliente = null, cedulasExistentes = [], alGuardar, alCancelar }) {
  const editando = Boolean(cliente);
  const [valores, setValores] = useState({
    nombre: cliente?.nombre ?? "",
    cedula: cliente?.cedula ?? "",
    correo: cliente?.correo ?? "",
    telefono: cliente?.telefono ?? "",
    aceptaTerminos: false,
    aceptaAvisos: Boolean(cliente?.acepta_avisos),
  });
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Un cliente que ya aceptó los términos no tiene que volver a marcarlos al editar
  const terminosPrevios = editando && Boolean(cliente?.acepta_terminos);
  const opciones = { validarCedulaCampo: !editando, cedulasExistentes, terminosPrevios };

  function cambiar(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    // El error del campo se limpia al corregirlo
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
    if (errorGeneral) setErrorGeneral("");
  }

  // Valida un solo campo al salir de él
  function validarAlSalir(campo) {
    const resultado = validarCliente(valores, opciones);
    setErrores((e) => ({ ...e, [campo]: resultado[campo] ?? "" }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita envíos duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = validarCliente(valores, opciones);
    setErrores({ ...SIN_ERRORES, ...resultado });
    if (hayErrores(resultado)) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      return;
    }

    setGuardando(true);
    setErrorGeneral("");
    try {
      await alGuardar(prepararCliente(valores));
    } catch (err) {
      setErrorGeneral(err.message);
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label={editando ? "Editar cliente" : "Registrar cliente"}>
      <h3>{editando ? "Editar cliente" : "Registrar cliente"}</h3>

      <Campo
        id="nombre"
        etiqueta="Nombre completo *"
        type="text"
        autoComplete="off"
        maxLength={LIMITES.nombreMax}
        value={valores.nombre}
        onChange={(e) => cambiar("nombre", e.target.value)}
        onBlur={() => validarAlSalir("nombre")}
        error={errores.nombre}
        disabled={guardando}
      />

      <Campo
        id="cedula"
        etiqueta="Cédula *"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={LIMITES.cedulaMax}
        value={valores.cedula}
        // Solo se aceptan dígitos al escribir o pegar
        onChange={(e) => cambiar("cedula", e.target.value.replace(/\D/g, ""))}
        onBlur={() => validarAlSalir("cedula")}
        error={errores.cedula}
        ayuda={editando ? "La cédula no se puede modificar." : `Solo números, de ${LIMITES.cedulaMin} a ${LIMITES.cedulaMax} dígitos.`}
        disabled={guardando || editando}
        readOnly={editando}
      />

      <Campo
        id="correo"
        // El correo es obligatorio; se marca con * como los demás campos requeridos.
        etiqueta="Correo *"
        type="email"
        autoComplete="off"
        maxLength={LIMITES.correoMax}
        value={valores.correo}
        onChange={(e) => cambiar("correo", e.target.value)}
        onBlur={() => validarAlSalir("correo")}
        error={errores.correo}
        disabled={guardando}
      />

      <Campo
        id="telefono"
        etiqueta="Teléfono (opcional)"
        type="tel"
        inputMode="tel"
        autoComplete="off"
        maxLength={LIMITES.telefonoMax}
        value={valores.telefono}
        // Solo caracteres propios de un teléfono
        onChange={(e) => cambiar("telefono", e.target.value.replace(/[^\d+\s\-().]/g, ""))}
        onBlur={() => validarAlSalir("telefono")}
        error={errores.telefono}
        ayuda="De 7 a 15 dígitos; puede empezar con +."
        disabled={guardando}
      />

      <fieldset>
        <legend>Tratamiento de datos</legend>
        {terminosPrevios ? (
          <p>Aceptó los términos y el tratamiento de datos el {fechaCorta(cliente.terminos_aceptados_en)}.</p>
        ) : (
          <div>
            <div className="gestion-check">
              <input
                id="acepta-terminos"
                type="checkbox"
                checked={valores.aceptaTerminos}
                onChange={(e) => cambiar("aceptaTerminos", e.target.checked)}
                aria-invalid={errores.aceptaTerminos ? "true" : undefined}
                aria-describedby={errores.aceptaTerminos ? "acepta-terminos-error" : undefined}
                disabled={guardando}
              />
              <label htmlFor="acepta-terminos">
                {editando
                  ? "El cliente acepta los términos y el tratamiento de sus datos personales"
                  : "El cliente acepta los términos y el tratamiento de sus datos personales *"}
              </label>
            </div>
            {errores.aceptaTerminos && (
              <p id="acepta-terminos-error" className="mensaje-error" role="alert">{errores.aceptaTerminos}</p>
            )}
          </div>
        )}
        <TextoTerminos />

        <div className="gestion-check">
          <input
            id="acepta-avisos"
            type="checkbox"
            checked={valores.aceptaAvisos}
            onChange={(e) => cambiar("aceptaAvisos", e.target.checked)}
            aria-invalid={errores.aceptaAvisos ? "true" : undefined}
            aria-describedby={errores.aceptaAvisos ? "acepta-avisos-error" : "acepta-avisos-ayuda"}
            disabled={guardando}
          />
          <label htmlFor="acepta-avisos">Acepta recibir por correo el aviso de vencimiento de su membresía (opcional)</label>
        </div>
        {errores.aceptaAvisos ? (
          <p id="acepta-avisos-error" className="mensaje-error" role="alert">{errores.aceptaAvisos}</p>
        ) : (
          <small id="acepta-avisos-ayuda">Un solo correo, 7 días antes de que venza, en planes de 15 días o más.</small>
        )}
      </fieldset>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      <button type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Registrar cliente"}
      </button>
      <button type="button" onClick={alCancelar} disabled={guardando}>
        Cancelar
      </button>
    </form>
  );
}

export default FormularioCliente;
