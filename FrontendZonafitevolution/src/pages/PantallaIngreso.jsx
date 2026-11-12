import { useEffect, useState } from "react";
import "../PantallasGestion.css";

const API_URL = import.meta.env.VITE_API_URL;
// Tiempo que se muestra el resultado antes de volver a esperar la siguiente huella
const TIEMPO_RESULTADO_MS = 2000;
// Mientras el lector o el servidor no están disponibles (por ejemplo, al prender el portátil),
// la pantalla vuelve a intentar sola cada 5 s, sin que nadie oprima un botón
const ESPERA_RECONEXION_MS = 5000;

// El token llega una vez en la URL (?pantalla=acceso&token=...), se guarda en el navegador
// y se quita de la barra de direcciones para que no quede a la vista
function tokenPantalla() {
  const parametros = new URLSearchParams(window.location.search);
  const desdeUrl = parametros.get("token");
  try {
    if (desdeUrl) {
      localStorage.setItem("zonafitTokenPantalla", desdeUrl);
      parametros.delete("token");
      window.history.replaceState(null, "", `?${parametros.toString()}`);
    }
    return localStorage.getItem("zonafitTokenPantalla") || "";
  } catch {
    return desdeUrl || "";
  }
}

async function consultarPantalla(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}/acceso-fisico/pantalla${ruta}`, {
    ...opciones,
    headers: { ...opciones.headers, "X-Pantalla-Token": tokenPantalla() },
  });
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    const error = new Error(datos.error || "No se pudo consultar el lector.");
    error.status = respuesta.status;
    throw error;
  }
  return datos;
}

function PantallaIngreso() {
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [conectando, setConectando] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    let temporizador;

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
        setConectando(false);
        setResultado(datos);
        temporizador = setTimeout(() => {
          setResultado(null);
          leerSensor();
        }, TIEMPO_RESULTADO_MS);
      } catch (err) {
        if (err.name === "AbortError") return;
        // 503 = el agente del lector aún no se conecta; TypeError = sin conexión con el servidor
        if (err.status === 503 || err instanceof TypeError) {
          setError("");
          setConectando(true);
          temporizador = setTimeout(leerSensor, ESPERA_RECONEXION_MS);
          return;
        }
        setConectando(false);
        if (err.status === 404 && err.message === "Huella no reconocida") {
          setResultado({ permitido: false, motivo: err.message });
          temporizador = setTimeout(() => {
            setResultado(null);
            leerSensor();
          }, TIEMPO_RESULTADO_MS);
        } else if (err.status === 408 || err.status === 409) {
          temporizador = setTimeout(leerSensor, 1000);
        } else {
          setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor." : err.message);
        }
      }
    }

    // Cada lectura espera el dedo en el sensor; al terminar se muestra el resultado y se vuelve a leer
    leerSensor();
    return () => {
      controlador.abort();
      clearTimeout(temporizador);
    };
  }, [intento]);

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
        ) : conectando ? (
          <>
            <h1>Conectando con el lector…</h1>
            <p className="acceso-resultado-motivo">La pantalla se activará sola en unos segundos.</p>
          </>
        ) : <h1>Esperando lectura</h1>}
      </div>
      {error && <p className="mensaje-error" role="alert">{error}</p>}
      {error && <button className="acceso-resultado-volver" type="button" onClick={() => { setError(""); setIntento((actual) => actual + 1); }}>Reintentar</button>}
    </main>
  );
}

export default PantallaIngreso;