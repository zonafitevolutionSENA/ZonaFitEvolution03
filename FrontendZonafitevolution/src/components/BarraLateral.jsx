import { seccionesPermitidas } from "../utils/permisos";

// Menú lateral: solo muestra las secciones que el rol puede usar y marca la activa
function BarraLateral({ rolId, activa, alNavegar, alCerrarSesion, cerrando = false }) {
  const secciones = seccionesPermitidas(rolId);

  return (
    <aside className="app-sidebar">
      <div className="app-brand-wrap">
        <span className="app-brand-mark" aria-hidden="true" />
        <h2 className="app-brand">
          <span className="app-brand-main">ZONA FIT</span>
          <span className="app-brand-sub">EVOLUTION</span>
        </h2>
      </div>
      <nav className="app-nav" aria-label="Navegación principal">
        <ul className="app-nav-list">
          {secciones.map((s) => (
            <li key={s.id} className="app-nav-item">
              <button
                type="button"
                className={`app-nav-button ${activa === s.id ? "is-active" : ""}`}
                onClick={() => alNavegar(s.id)}
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
    </aside>
  );
}

export default BarraLateral;
