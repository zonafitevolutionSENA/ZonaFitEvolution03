import { useState } from "react";
import { seccionesPermitidas } from "../utils/permisos";

// Menú lateral: solo muestra las secciones que el rol puede usar y marca la activa
function BarraLateral({ rolId, activa, alNavegar, alCerrarSesion, cerrando = false }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const secciones = seccionesPermitidas(rolId);

  return (
    <aside className={`app-sidebar${menuAbierto ? " is-open" : ""}`}>
      <div className="app-sidebar-top">
        <div className="app-brand-wrap">
          <span className="app-brand-mark" aria-hidden="true" />
          <h2 className="app-brand">
            <span className="app-brand-main">ZONA FIT</span>
            <span className="app-brand-sub">EVOLUTION</span>
          </h2>
        </div>
        <button
          className="app-menu-toggle"
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="app-primary-menu"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span className="app-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <div className="app-sidebar-menu" id="app-primary-menu">
        <nav className="app-nav" id="app-primary-nav" aria-label="Navegación principal">
          <ul className="app-nav-list">
            {secciones.map((s) => (
              <li key={s.id} className="app-nav-item">
                <button
                  type="button"
                  className={`app-nav-button ${activa === s.id ? "is-active" : ""}`}
                  onClick={() => {
                    alNavegar(s.id);
                    setMenuAbierto(false);
                  }}
                  aria-current={activa === s.id ? "page" : undefined}
                  disabled={activa === s.id}
                >
                  <span>{s.etiqueta}</span>
                  {s.soloAdmin && <span className="app-nav-tag">solo admin</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button className="app-logout" type="button" onClick={alCerrarSesion} disabled={cerrando}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default BarraLateral;
