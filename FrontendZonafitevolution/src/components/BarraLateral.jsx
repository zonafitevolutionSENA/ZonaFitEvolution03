import { seccionesPermitidas } from "../utils/permisos";

// Menú lateral: solo muestra las secciones que el rol puede usar y marca la activa
function BarraLateral({ rolId, activa, alNavegar, alCerrarSesion, cerrando = false }) {
  const secciones = seccionesPermitidas(rolId);

  return (
    <aside>
      <h2>Zona Fit Evolution</h2>
      <nav aria-label="Navegación principal">
        <ul>
          {secciones.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => alNavegar(s.id)}
                aria-current={activa === s.id ? "page" : undefined}
                disabled={activa === s.id}
              >
                {s.etiqueta}
                {s.soloAdmin && " (solo admin)"}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" onClick={alCerrarSesion} disabled={cerrando}>
        Cerrar sesión
      </button>
    </aside>
  );
}

export default BarraLateral;
