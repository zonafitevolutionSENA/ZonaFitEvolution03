import { useState } from "react";
import { etiquetaRol } from "../utils/permisos";

// Barra superior: campana con membresías por vencer, datos del usuario y botón para regresar
function Encabezado({ usuario, porVencer, errorNotificaciones, alReintentar, puedeRegresar = false, alRegresar }) {
  const [abierto, setAbierto] = useState(false);
  const cantidad = porVencer ? porVencer.length : 0;

  return (
    <header className="app-header">
      <div className="app-header-notif">
        <button
          className="app-notif-button"
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="panel-notificaciones"
        >
          Notificaciones ({cantidad})
        </button>
        {abierto && (
          <div className="app-notif-panel" id="panel-notificaciones" role="region" aria-label="Notificaciones">
            {errorNotificaciones ? (
              <>
                <p className="mensaje-error" role="alert">{errorNotificaciones}</p>
                <button type="button" className="app-notif-retry" onClick={alReintentar}>Reintentar</button>
              </>
            ) : cantidad === 0 ? (
              <p>No hay membresías por vencer en los próximos 7 días.</p>
            ) : (
              <ul>
                {porVencer.map((m) => (
                  <li key={m.id}>
                    {m.cliente} · plan {m.plan} · vence {m.fechaFin}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="app-header-derecha">
        <p className="app-user-line">
          <strong>{usuario.nombre}</strong> · {etiquetaRol(usuario.rol_id)}
        </p>
        <button
          className="app-back-button"
          type="button"
          onClick={alRegresar}
          disabled={!puedeRegresar}
          aria-label="Volver a la pantalla anterior"
          title={puedeRegresar ? "Volver a la pantalla anterior" : "No hay una pantalla anterior"}
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Encabezado;
