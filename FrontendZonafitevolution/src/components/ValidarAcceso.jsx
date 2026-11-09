import { useState } from "react";
import { LIMITES_HUELLA, validarIdentificador } from "../utils/validacionesAcceso";
import Campo from "./Campo";

function ValidarAcceso({ alValidar, usaSensor = false }) {
  const [identificador, setIdentificador] = useState("");
  const [errorCampo, setErrorCampo] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [validando, setValidando] = useState(false);

  function cambiar(valor) {
    // Sin espacios ni caracteres no permitidos al escribir o pegar
    setIdentificador(valor.replace(/[^A-Za-z0-9_.-]/g, ""));
    setErrorCampo("");
    setErrorGeneral("");
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita validaciones duplicadas por doble clic o Enter repetido
    if (validando) return;

    const error = usaSensor ? "" : validarIdentificador(identificador);
    setErrorCampo(error);
    if (error) return;

    setErrorGeneral("");
    const ventana = window.open("?pantalla=acceso&temporal=1", "_blank", "popup,width=850,height=700");
    if (!ventana) {
      setErrorGeneral("Permite las ventanas emergentes para mostrar el resultado de acceso.");
      return;
    }

    let pantallaLista = false;
    let resultadoPendiente = null;
    let temporizador;

    function enviarResultado() {
      if (!pantallaLista || !resultadoPendiente) return;
      ventana.postMessage({ tipo: "zonafit:resultado-acceso", resultado: resultadoPendiente }, window.location.origin);
      window.removeEventListener("message", recibirMensaje);
      clearTimeout(temporizador);
    }

    function recibirMensaje(mensaje) {
      if (mensaje.origin !== window.location.origin || mensaje.source !== ventana || mensaje.data?.tipo !== "zonafit:pantalla-lista") return;
      pantallaLista = true;
      enviarResultado();
    }

    window.addEventListener("message", recibirMensaje);
    setValidando(true);
    try {
      const resultado = await alValidar(identificador, usaSensor);
      resultadoPendiente = {
        permitido: resultado.permitido,
        nombre: resultado.cliente?.nombre || "",
        motivo: resultado.motivo,
        ingresosRestantes: resultado.ingresosRestantes,
        vence: resultado.vence,
      };
      if (!pantallaLista) {
        temporizador = setTimeout(() => {
          window.removeEventListener("message", recibirMensaje);
          setErrorGeneral("No se pudo abrir la pantalla de ingreso. Revisa las ventanas emergentes del navegador.");
        }, 5000);
      }
      enviarResultado();
      setIdentificador("");
    } catch (err) {
      window.removeEventListener("message", recibirMensaje);
      clearTimeout(temporizador);
      ventana.close();
      setErrorGeneral(err.message);
    } finally {
      setValidando(false);
    }
  }

  function limpiar() {
    setIdentificador("");
    setErrorCampo("");
    setErrorGeneral("");
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
      <button type="button" onClick={limpiar} disabled={validando || (identificador === "" && !errorGeneral)}>
        Limpiar
      </button>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

    </form>
  );
}

export default ValidarAcceso;
