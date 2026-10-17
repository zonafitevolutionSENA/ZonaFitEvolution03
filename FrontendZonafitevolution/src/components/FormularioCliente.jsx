import { useState } from "react";
import { LIMITES, hayErrores, prepararCliente, validarCliente } from "../utils/validacionesCliente";
import Campo from "./Campo";

const SIN_ERRORES = { nombre: "", cedula: "", correo: "", telefono: "" };

// Formulario para registrar o editar un cliente. No llama a la API: entrega los datos limpios con `alGuardar`.
// En edición la cédula se muestra bloqueada porque el backend no permite cambiarla.
function FormularioCliente({ cliente = null, cedulasExistentes = [], alGuardar, alCancelar }) {
  const editando = Boolean(cliente);
  const [valores, setValores] = useState({
    nombre: cliente?.nombre ?? "",
    cedula: cliente?.cedula ?? "",
    correo: cliente?.correo ?? "",
    telefono: cliente?.telefono ?? "",
  });
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  const opciones = { validarCedulaCampo: !editando, cedulasExistentes };

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
        etiqueta="Correo (opcional)"
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
