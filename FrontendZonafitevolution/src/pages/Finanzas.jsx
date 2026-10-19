import { useEffect, useMemo, useState } from "react";
import TablaPagos from "../components/TablaPagos";
import { obtenerRegistroFinanciero } from "../services/finanzasService";
import {
  FILTROS_ESTADO_PAGO,
  ORDENES_RESUMEN,
  construirPagos,
  filtrarPagos,
  filtrarResumenes,
  limpiarTextoFiltro,
  ordenarResumenes,
  pesos,
  resumirPorCliente,
  totalesGenerales,
} from "../utils/finanzas";
import { MAX_TEXTO_FILTRO, diaLocal, hayErroresRango, validarRangoFechas } from "../utils/filtrosHistorial";
import { ROL_ADMIN } from "../utils/permisos";
import "../PantallasGestion.css";

const FILTROS_INICIALES = { texto: "", estado: "todos", desde: "", hasta: "", orden: "total", soloConPagos: true };

// Registro financiero (solo Admin): resumen de pagos de cada cliente.
// Cada membresía cuenta como un pago por el precio de su plan.
function Finanzas({ usuario }) {
  const esAdmin = usuario?.rol_id === ROL_ADMIN;
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(esAdmin);
  const [error, setError] = useState("");
  const [recarga, setRecarga] = useState(0);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  // Un usuario que no es Admin nunca consulta datos financieros
  useEffect(() => {
    if (!esAdmin) return undefined;
    let vigente = true;
    obtenerRegistroFinanciero()
      .then((resultado) => {
        if (!vigente) return;
        setDatos(resultado);
        setError("");
      })
      .catch((err) => vigente && setError(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [esAdmin, recarga]);

  const errores = validarRangoFechas(filtros.desde, filtros.hasta);

  const pagos = useMemo(() => (datos ? construirPagos(datos.membresias, datos.planes) : []), [datos]);

  const resumenes = useMemo(() => {
    if (!datos) return [];
    const delPeriodo = filtrarPagos(pagos, filtros);
    const todos = resumirPorCliente(datos.clientes, delPeriodo);
    return ordenarResumenes(filtrarResumenes(todos, filtros), filtros.orden);
  }, [datos, pagos, filtros]);

  const totales = useMemo(() => totalesGenerales(resumenes), [resumenes]);

  if (!esAdmin) {
    return (
      <section className="gestion-page gestion-finanzas">
        <h1>Registro financiero</h1>
        <p className="mensaje-error" role="alert">Esta sección es solo para administradores.</p>
      </section>
    );
  }

  function cambiar(campo, valor) {
    setFiltros((f) => ({ ...f, [campo]: valor }));
  }

  function elegir(campo, valor, opciones) {
    // Solo se aceptan valores definidos
    if (opciones.some((o) => o.id === valor)) cambiar(campo, valor);
  }

  function actualizar() {
    // Evita consultas duplicadas por doble clic
    if (cargando) return;
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  const hoy = diaLocal(new Date());
  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(FILTROS_INICIALES);

  return (
    <section className="gestion-page gestion-finanzas">
      <h1>Registro financiero</h1>
      <p className="gestion-intro">Resumen de pagos de cada cliente. Cada membresía cuenta como un pago por el precio actual de su plan.</p>

      <div className="gestion-actions">
        <button type="button" onClick={actualizar} disabled={cargando}>
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {error && <p className="mensaje-error" role="alert">{error}</p>}
      {cargando && !datos && !error && <p>Cargando registro financiero...</p>}

      {datos && (
        <>
          <form className="gestion-filtros-finanzas" onSubmit={(e) => e.preventDefault()} noValidate aria-label="Filtros del registro financiero">
            <div className="gestion-field">
              <label htmlFor="texto-finanzas">Buscar cliente</label>
              <input
                id="texto-finanzas"
                type="search"
                placeholder="Nombre o cédula"
                maxLength={MAX_TEXTO_FILTRO}
                autoComplete="off"
                value={filtros.texto}
                onChange={(e) => cambiar("texto", limpiarTextoFiltro(e.target.value))}
              />
            </div>

            <div className="gestion-field">
              <label htmlFor="estado-finanzas">Estado de la membresía</label>
              <select
                id="estado-finanzas"
                value={filtros.estado}
                onChange={(e) => elegir("estado", e.target.value, FILTROS_ESTADO_PAGO)}
              >
                {FILTROS_ESTADO_PAGO.map((o) => (
                  <option key={o.id} value={o.id}>{o.etiqueta}</option>
                ))}
              </select>
            </div>

            <div className="gestion-field">
              <label htmlFor="desde-finanzas">Desde</label>
              <input
                id="desde-finanzas"
                type="date"
                max={hoy}
                value={filtros.desde}
                onChange={(e) => cambiar("desde", e.target.value)}
                aria-invalid={errores.desde ? "true" : undefined}
              />
              {errores.desde && <p className="mensaje-error" role="alert">{errores.desde}</p>}
            </div>

            <div className="gestion-field">
              <label htmlFor="hasta-finanzas">Hasta</label>
              <input
                id="hasta-finanzas"
                type="date"
                max={hoy}
                value={filtros.hasta}
                onChange={(e) => cambiar("hasta", e.target.value)}
                aria-invalid={errores.hasta ? "true" : undefined}
              />
              {errores.hasta && <p className="mensaje-error" role="alert">{errores.hasta}</p>}
            </div>

            <div className="gestion-field">
              <label htmlFor="orden-finanzas">Ordenar por</label>
              <select
                id="orden-finanzas"
                value={filtros.orden}
                onChange={(e) => elegir("orden", e.target.value, ORDENES_RESUMEN)}
              >
                {ORDENES_RESUMEN.map((o) => (
                  <option key={o.id} value={o.id}>{o.etiqueta}</option>
                ))}
              </select>
            </div>

            <div className="gestion-check">
              <input
                id="solo-pagos-finanzas"
                type="checkbox"
                checked={filtros.soloConPagos}
                onChange={(e) => cambiar("soloConPagos", e.target.checked)}
              />
              <label htmlFor="solo-pagos-finanzas">Solo clientes con pagos</label>
            </div>

            <button className="gestion-button-quiet" type="button" onClick={() => setFiltros(FILTROS_INICIALES)} disabled={!hayFiltros}>
              Limpiar filtros
            </button>
          </form>

          {hayErroresRango(errores) && <p className="mensaje-error" role="alert">El rango de fechas no es válido: no se aplica hasta que lo corrijas.</p>}

          <dl className="gestion-totales" aria-label="Totales">
            <div>
              <dt>Total recaudado</dt>
              <dd>{pesos(totales.total)}</dd>
            </div>
            <div>
              <dt>Pagos registrados</dt>
              <dd>{totales.pagos}</dd>
            </div>
            <div>
              <dt>Clientes con pagos</dt>
              <dd>{totales.clientesConPagos}</dd>
            </div>
          </dl>

          {totales.sinPrecio > 0 && (
            <p role="status">
              {totales.sinPrecio} pago(s) no se sumaron al total porque su plan ya no existe o no tiene un precio válido.
            </p>
          )}

          {datos.clientes.length === 0 && <p>Aún no hay clientes registrados.</p>}
          {datos.clientes.length > 0 && resumenes.length === 0 && (
            <p>Ningún cliente coincide con los filtros.</p>
          )}
          {resumenes.length > 0 && (
            <>
              <p className="gestion-result-count">Mostrando {resumenes.length} de {datos.clientes.length} clientes</p>
              <TablaPagos resumenes={resumenes} />
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Finanzas;
