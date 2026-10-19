import { useEffect, useMemo, useState } from "react";
import { listarHistorial } from "../services/accesoService";
import {
  FILTROS_RESULTADO,
  MAX_TEXTO_FILTRO,
  diaLocal,
  filtrarHistorial,
  hayErroresRango,
  validarRangoFechas,
} from "../utils/filtrosHistorial";
import "../PantallasGestion.css";

const formatoHora = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const FILTROS_INICIALES = { resultado: "todos", texto: "", desde: "", hasta: "" };

// Historial: los 50 accesos más recientes, con filtros por resultado, texto y fechas
function Historial() {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [recarga, setRecarga] = useState(0);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  useEffect(() => {
    let vigente = true;
    listarHistorial()
      .then((lista) => {
        if (!vigente) return;
        setFilas(lista);
        setError("");
      })
      .catch((err) => vigente && setError(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [recarga]);

  function actualizar() {
    // Evita consultas duplicadas por doble clic
    if (cargando) return;
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  function cambiar(campo, valor) {
    setFiltros((f) => ({ ...f, [campo]: valor }));
  }

  function elegirResultado(valor) {
    // Solo se aceptan los resultados definidos
    if (FILTROS_RESULTADO.some((r) => r.id === valor)) cambiar("resultado", valor);
  }

  const hoy = diaLocal(new Date());
  const erroresRango = validarRangoFechas(filtros.desde, filtros.hasta, hoy);
  const visibles = useMemo(() => filtrarHistorial(filas, filtros), [filas, filtros]);
  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(FILTROS_INICIALES);

  return (
    <section className="gestion-page gestion-historial">
      <h1>Historial de accesos</h1>
      <p className="gestion-intro">Se muestran los 50 eventos más recientes.</p>

      <div className="gestion-actions">
        <button type="button" onClick={actualizar} disabled={cargando}>
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      <div className="gestion-history-filters">
        <div className="gestion-field">
          <label htmlFor="resultado-historial">Resultado</label>
          <select id="resultado-historial" value={filtros.resultado} onChange={(e) => elegirResultado(e.target.value)}>
            {FILTROS_RESULTADO.map((r) => (
              <option key={r.id} value={r.id}>{r.etiqueta}</option>
            ))}
          </select>
        </div>

        <div className="gestion-field">
          <label htmlFor="texto-historial">Buscar</label>
          <input
            id="texto-historial"
            type="search"
            placeholder="Cliente o motivo"
            maxLength={MAX_TEXTO_FILTRO}
            autoComplete="off"
            value={filtros.texto}
            onChange={(e) => cambiar("texto", e.target.value.replace(/\p{Cc}/gu, ""))}
          />
        </div>

        <div className="gestion-field">
          <label htmlFor="desde-historial">Desde</label>
          <input
            id="desde-historial"
            type="date"
            max={hoy}
            value={filtros.desde}
            onChange={(e) => cambiar("desde", e.target.value)}
            aria-invalid={erroresRango.desde ? "true" : undefined}
          />
          {erroresRango.desde && <p className="mensaje-error" role="alert">{erroresRango.desde}</p>}
        </div>

        <div className="gestion-field">
          <label htmlFor="hasta-historial">Hasta</label>
          <input
            id="hasta-historial"
            type="date"
            max={hoy}
            value={filtros.hasta}
            onChange={(e) => cambiar("hasta", e.target.value)}
            aria-invalid={erroresRango.hasta ? "true" : undefined}
          />
          {erroresRango.hasta && <p className="mensaje-error" role="alert">{erroresRango.hasta}</p>}
        </div>

        <button className="gestion-button-quiet" type="button" onClick={() => setFiltros(FILTROS_INICIALES)} disabled={!hayFiltros}>
          Limpiar filtros
        </button>
      </div>

      {error && <p className="mensaje-error" role="alert">{error}</p>}
      {hayErroresRango(erroresRango) && <p role="status">Corrige las fechas para filtrar por rango.</p>}

      {cargando && filas.length === 0 && !error && <p>Cargando historial...</p>}
      {!cargando && !error && filas.length === 0 && <p>Aún no hay accesos registrados.</p>}
      {!cargando && filas.length > 0 && visibles.length === 0 && <p>Ningún acceso coincide con los filtros.</p>}

      {visibles.length > 0 && (
        <>
          <p className="gestion-result-count">
            Mostrando {visibles.length} de {filas.length} accesos
          </p>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha y hora</th>
                <th>Resultado</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((f) => (
                <tr key={f.id}>
                  <td>{f.cliente}</td>
                  <td>{formatoHora.format(f.fechaHora)}</td>
                  <td>{f.permitido ? "Acceso permitido" : "Acceso denegado"}</td>
                  <td>{f.motivo || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default Historial;
