import { useState } from "react";
import { LIMITES_HUELLA, validarIdentificador } from "../utils/validacionesAcceso";
import Campo from "./Campo";

// Formulario de validación de acceso. No llama a la API: usa `alValidar` y muestra su resultado.
// Con `usaSensor` la huella se lee del lector físico y no se pide el texto simulado.
function ValidarAcceso({ alValidar, usaSensor = false }) {
  const [identificador, setIdentificador] = useState("");
  const [errorCampo, setErrorCampo] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [resultado, setResultado] = useState(null);
  const [validando, setValidando] = useState(false);

  function cambiar(valor) {
    // Sin espacios ni caracteres no permitidos al escribir o pegar
    setIdentificador(valor.replace(/[^A-Za-z0-9_.-]/g, ""));
    setErrorCampo("");
    setErrorGeneral("");
    setResultado(null);
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita validaciones duplicadas por doble clic o Enter repetido
    if (validando) return;

    const error = usaSensor ? "" : validarIdentificador(identificador);
    setErrorCampo(error);
    if (error) return;

    setValidando(true);
    setErrorGeneral("");
    setResultado(null);
    try {
      setResultado(await alValidar(identificador, usaSensor));
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setValidando(false);
    }
  }

  function limpiar() {
    setIdentificador("");
    setErrorCampo("");
    setErrorGeneral("");
    setResultado(null);
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Validar acceso">
      <h2>Validar acceso</h2>

      {usaSensor ? (
        <p>Al presionar "Validar acceso", el cliente debe colocar el dedo en el lector (15 segundos).</p>
      ) : (
      <Campo
        id="huella-validar"
        etiqueta="Huella simulada *"
        type="text"
        autoComplete="off"
        maxLength={LIMITES_HUELLA.max}
        value={identificador}
        onChange={(e) => cambiar(e.target.value)}
        error={errorCampo}
        ayuda="Identificador de la huella (por ejemplo, dedo_mario)."
        disabled={validando}
      />
      )}

      <button type="submit" disabled={validando}>
        {validando ? (usaSensor ? "Coloca el dedo en el lector..." : "Validando...") : "Validar acceso"}
      </button>
      <button type="button" onClick={limpiar} disabled={validando || (identificador === "" && !resultado && !errorGeneral)}>
        Limpiar
      </button>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      {resultado && (
        <div role="status" aria-live="polite">
          <h3>{resultado.permitido ? "Acceso permitido" : "Acceso denegado"}</h3>
          {resultado.cliente && (
            <p>
              {resultado.cliente.nombre} — cédula {resultado.cliente.cedula}
            </p>
          )}
          <p>{resultado.motivo}</p>
          {resultado.ingresosRestantes !== null && resultado.ingresosRestantes !== undefined && (
            <p>
              Ingresos restantes: {resultado.ingresosRestantes}
              {resultado.vence ? ` · vence ${resultado.vence}` : ""}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

export default ValidarAcceso;
