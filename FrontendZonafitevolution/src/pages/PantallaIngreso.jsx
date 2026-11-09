import { useEffect, useState } from "react";
import { LIMITES_HUELLA, normalizarIdentificador, validarIdentificador } from "../utils/validacionesAcceso";
import "../PantallasGestion.css";

const API_URL = import.meta.env.VITE_API_URL;

async function consultarPantalla(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}/acceso-fisico/pantalla${ruta}`, opciones);
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    const error = new Error(datos.error || "No se pudo consultar el lector.");
    error.status = respuesta.status;
    throw error;
  }
  return datos;
}

function PantallaIngreso() {
  const [usaSimulador, setUsaSimulador] = useState(null);
  const [identificador, setIdentificador] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [validando, setValidando] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    let temporizador;

    async function iniciar() {
      try {
        const info = await consultarPantalla("/lector", { signal: controlador.signal });
        if (typeof info.requiereIdentificador !== "boolean") throw new Error("Respuesta inesperada del lector.");
        setUsaSimulador(info.requiereIdentificador);
        setError("");
        if (!info.requiereIdentificador) leerSensor();
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor." : err.message);
      }
    }

    async function leerSensor() {
      try {
        const datos = await consultarPantalla("/validar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
          signal: controlador.signal,
        });
        if (typeof datos.permitido !== "boolean") throw new Error("Respuesta inesperada al validar el acceso.");
        setError("");
        setResultado(datos);
        temporizador = setTimeout(() => {
          setResultado(null);
          leerSensor();
        }, 8000);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (err.status === 404 && err.message === "Huella no reconocida") {
          setResultado({ permitido: false, motivo: err.message });
          temporizador = setTimeout(() => {
            setResultado(null);
            leerSensor();
          }, 8000);
        } else if (err.status === 408 || err.status === 409) {
          temporizador = setTimeout(leerSensor, 1000);
        } else {
          setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor." : err.message);
        }
      }
    }

    iniciar();
    return () => {
      controlador.abort();
      clearTimeout(temporizador);
    };
  }, [intento]);

  useEffect(() => {
    if (!resultado || !usaSimulador) return undefined;
    const temporizador = setTimeout(() => setResultado(null), 8000);
    return () => clearTimeout(temporizador);
  }, [resultado, usaSimulador]);

  useEffect(() => {
    if (!usaSimulador || resultado || !identificador.trim()) return undefined;
    const controlador = new AbortController();
    const temporizador = setTimeout(async () => {
      const errorCampo = validarIdentificador(identificador);
      if (errorCampo) {
        setError(errorCampo);
        return;
      }
      setValidando(true);
      setError("");
      try {
        const datos = await consultarPantalla("/validar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identificadorSimulado: normalizarIdentificador(identificador) }),
          signal: controlador.signal,
        });
        if (typeof datos.permitido !== "boolean") throw new Error("Respuesta inesperada al validar el acceso.");
        setResultado(datos);
        setIdentificador("");
      } catch (err) {
        if (err.name === "AbortError") return;
        if (err.status === 404 && err.message === "Huella no reconocida") {
          setResultado({ permitido: false, motivo: err.message });
          setIdentificador("");
        } else {
          setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor." : err.message);
        }
      } finally {
        if (!controlador.signal.aborted) setValidando(false);
      }
    }, 1500);
    return () => {
      clearTimeout(temporizador);
      controlador.abort();
    };
  }, [identificador, resultado, usaSimulador, intento]);

  return (
    <main className={`gestion-page acceso-resultado pantalla-ingreso ${resultado ? (resultado.permitido ? "acceso-permitido" : "acceso-denegado") : ""}`}>
      <div className="acceso-resultado-contenido" role="status" aria-live="polite">
        <p className="pantalla-ingreso-marca">ZONA FIT <span>EVOLUTION</span></p>
        {resultado ? (
          <>
            <span className="acceso-resultado-indicador" aria-hidden="true">{resultado.permitido ? "✓" : "×"}</span>
            <p className="acceso-resultado-etiqueta">{resultado.permitido ? "Bienvenido/a a Zona Fit" : "Control de acceso"}</p>
            <h1>{resultado.permitido ? "Acceso permitido" : "Acceso denegado"}</h1>
            {resultado.cliente?.nombre && <p className="acceso-resultado-cliente">Cliente: {resultado.cliente.nombre}</p>}
            <p className="acceso-resultado-motivo">{resultado.motivo}</p>
            {Number.isInteger(resultado.ingresos_restantes) && <p className="acceso-resultado-detalle">Ingresos restantes: {resultado.ingresos_restantes}</p>}
          </>
        ) : <h1>{usaSimulador === null ? "Conectando lector" : "Esperando lectura"}</h1>}
      </div>
      {error && <p className="mensaje-error" role="alert">{error}</p>}
      {error && usaSimulador === null && <button className="acceso-resultado-volver" type="button" onClick={() => setIntento((actual) => actual + 1)}>Reintentar</button>}
      {error && usaSimulador === false && <button className="acceso-resultado-volver" type="button" onClick={() => setIntento((actual) => actual + 1)}>Reintentar</button>}
      {error && usaSimulador === true && identificador && !validarIdentificador(identificador) && <button className="acceso-resultado-volver" type="button" onClick={() => setIntento((actual) => actual + 1)}>Reintentar</button>}
      {usaSimulador && !resultado && (
        <div className="pantalla-ingreso-simulador">
          <label htmlFor="huella-ingreso">Huella simulada</label>
          <input id="huella-ingreso" value={identificador} onChange={(evento) => { setIdentificador(evento.target.value); setError(""); }} maxLength={LIMITES_HUELLA.max} autoComplete="off" disabled={validando} />
          {validando && <p role="status">Validando...</p>}
        </div>
      )}
    </main>
  );
}

export default PantallaIngreso;