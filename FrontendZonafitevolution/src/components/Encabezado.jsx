import { useState } from "react";
import { etiquetaRol } from "../utils/permisos";

// Barra superior: campana con membresías por vencer y datos del usuario
function Encabezado({ usuario, porVencer, errorNotificaciones, alReintentar }) {
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
      <p className="app-user-line">
        <strong>{usuario.nombre}</strong> · {etiquetaRol(usuario.rol_id)}
      </p>
    </header>
  );
}

export default Encabezado;
