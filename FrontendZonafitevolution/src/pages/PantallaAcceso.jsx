import { useEffect, useState } from "react";
import "../PantallasGestion.css";

function PantallaAcceso() {
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    let temporizador;

    function mostrar(nuevoResultado) {
      if (!nuevoResultado || typeof nuevoResultado.permitido !== "boolean") return;
      clearTimeout(temporizador);
      setResultado(nuevoResultado);
      temporizador = setTimeout(() => {
        if (window.opener) window.close();
        else setResultado(null);
      }, 8000);
    }

    function recibirMensaje(evento) {
      if (evento.origin !== window.location.origin || evento.source !== window.opener || evento.data?.tipo !== "zonafit:resultado-acceso") return;
      mostrar(evento.data.resultado);
    }

    if (window.opener) {
      window.addEventListener("message", recibirMensaje);
      window.opener.postMessage({ tipo: "zonafit:pantalla-lista" }, window.location.origin);
    }

    return () => {
      clearTimeout(temporizador);
      window.removeEventListener("message", recibirMensaje);
    };
  }, []);

  return (
    <main className={`gestion-page acceso-resultado pantalla-ingreso ${resultado ? (resultado.permitido ? "acceso-permitido" : "acceso-denegado") : ""}`}>
      <div className="acceso-resultado-contenido" role="status" aria-live="polite">
        <p className="pantalla-ingreso-marca">ZONA FIT <span>EVOLUTION</span></p>
        {resultado ? (
          <>
            <span className="acceso-resultado-indicador" aria-hidden="true">{resultado.permitido ? "✓" : "×"}</span>
            <p className="acceso-resultado-etiqueta">{resultado.permitido ? "Bienvenido/a a Zona Fit" : "Control de acceso"}</p>
            <h1>{resultado.permitido ? "Acceso permitido" : "Acceso denegado"}</h1>
            {resultado.nombre && <p className="acceso-resultado-cliente">Cliente: {resultado.nombre}</p>}
            <p className="acceso-resultado-motivo">{resultado.motivo}</p>
            {resultado.ingresosRestantes !== null && resultado.ingresosRestantes !== undefined && (
              <p className="acceso-resultado-detalle">
                Ingresos restantes: {resultado.ingresosRestantes}
                {resultado.vence ? ` · vence ${resultado.vence}` : ""}
              </p>
            )}
          </>
        ) : (
          <h1>Esperando lectura</h1>
        )}
      </div>
    </main>
  );
}

export default PantallaAcceso;