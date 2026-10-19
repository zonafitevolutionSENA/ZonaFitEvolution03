import { useCallback, useEffect, useMemo, useState } from "react";
import FormularioMembresia from "../components/FormularioMembresia";
import RenovarMembresia from "../components/RenovarMembresia";
import { listarClientes } from "../services/clienteService";
import {
  buscarClienteParaRenovar,
  crearMembresia,
  listarMembresiasAlDia,
  renovarMembresia,
} from "../services/membresiaService";
import { listarPlanes } from "../services/planService";
import { ETIQUETAS_ESTADO, ESTADOS, diaDe } from "../utils/estadoMembresia";
import { normalizarTexto } from "../utils/validacionesCliente";
import "../PantallasGestion.css";

const MAX_BUSQUEDA = 50;
const FILTROS = [{ id: "todos", etiqueta: "Todos" }, ...ESTADOS.map((e) => ({ id: e, etiqueta: ETIQUETAS_ESTADO[e] }))];

// Carga clientes, planes y membresías; las membresías activas con fecha de fin pasada se pasan a "vencida"
async function cargarDatos() {
  const [clientes, planes, alDia] = await Promise.all([listarClientes(), listarPlanes(), listarMembresiasAlDia()]);
  let error = alDia.errorRecarga;
  if (alDia.fallidas > 0) {
    error = `No se pudo marcar como vencidas ${alDia.fallidas} membresía(s). Inténtalo de nuevo más tarde.`;
  }
  return { clientes, planes, membresias: alDia.membresias, vencidas: alDia.vencidas, error };
}

// Membresías: listado, asignación a un cliente y renovación rápida por cédula
function Membresias({ iniciarEnRenovar = false }) {
  const [datos, setDatos] = useState({ clientes: [], planes: [], membresias: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [recarga, setRecarga] = useState(0);
  // null = solo lista · "asignar" · "renovar"
  const [modo, setModo] = useState(iniciarEnRenovar ? "renovar" : null);

  const aplicar = useCallback((resultado) => {
    setDatos({ clientes: resultado.clientes, planes: resultado.planes, membresias: resultado.membresias });
    setError(resultado.error);
    if (resultado.vencidas > 0) {
      setAviso(`${resultado.vencidas} membresía(s) con fecha de fin pasada se marcaron como vencidas automáticamente.`);
    }
  }, []);

  const cargar = useCallback(() => {
    setCargando(true);
    return cargarDatos()
      .then(aplicar)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [aplicar]);

  useEffect(() => {
    let vigente = true;
    cargarDatos()
      .then((resultado) => vigente && aplicar(resultado))
      .catch((err) => vigente && setError(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [recarga, aplicar]);

  function actualizarLista() {
    // Evita consultas duplicadas por doble clic
    if (cargando) return;
    setAviso("");
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  function elegirFiltro(valor) {
    // Solo se aceptan los filtros definidos
    if (FILTROS.some((f) => f.id === valor)) setFiltro(valor);
  }

  const filas = useMemo(() => {
    const clientePorId = new Map(datos.clientes.map((c) => [c.id, c]));
    const planPorId = new Map(datos.planes.map((p) => [p.id, p]));
    const termino = normalizarTexto(busqueda).toLowerCase();

    return datos.membresias
      .map((m) => ({
        id: m.id,
        cliente: clientePorId.get(m.cliente_id)?.nombre ?? "—",
        cedula: clientePorId.get(m.cliente_id)?.cedula ?? "—",
        plan: planPorId.get(m.plan_id)?.nombre ?? "—",
        inicio: diaDe(m.fecha_inicio) || "—",
        fin: diaDe(m.fecha_fin) || "—",
        estado: m.estado,
      }))
      .filter((f) => ESTADOS.includes(f.estado))
      .filter((f) => filtro === "todos" || f.estado === filtro)
      .filter((f) => !termino || `${f.cliente} ${f.cedula} ${f.plan}`.toLowerCase().includes(termino))
      .sort((a, b) => b.fin.localeCompare(a.fin) || b.id - a.id);
  }, [datos, filtro, busqueda]);

  async function asignar(valores) {
    const nueva = await crearMembresia(valores);
    setModo(null);
    await cargar();
    setAviso(`Membresía asignada correctamente a ${nueva.nombre_cliente ?? "el cliente"}.`);
  }

  async function renovar(valores) {
    const nueva = await renovarMembresia(valores);
    setModo(null);
    await cargar();
    setAviso(`Membresía renovada correctamente para ${nueva.nombre_cliente ?? "el cliente"}.`);
  }

  function abrir(nuevoModo) {
    setAviso("");
    setModo(nuevoModo);
  }

  return (
    <section className="gestion-page gestion-membresias">
      <h1>Membresías</h1>

      {modo === "asignar" && (
        <FormularioMembresia
          clientes={datos.clientes}
          planes={datos.planes}
          membresias={datos.membresias}
          alGuardar={asignar}
          alCancelar={() => setModo(null)}
        />
      )}

      {modo === "renovar" && (
        <RenovarMembresia
          planes={datos.planes}
          alBuscar={buscarClienteParaRenovar}
          alRenovar={renovar}
          alCancelar={() => setModo(null)}
        />
      )}

      {!modo && (
        <>
          <div className="gestion-actions">
            <button type="button" onClick={() => abrir("asignar")} disabled={cargando}>Asignar membresía</button>
            <button type="button" onClick={() => abrir("renovar")} disabled={cargando}>Renovar por cédula</button>
            <button type="button" onClick={actualizarLista} disabled={cargando}>
              {cargando ? "Actualizando..." : "Actualizar"}
            </button>
          </div>

          <div className="gestion-filters gestion-filters-membresias">
            <div className="gestion-field">
              <label htmlFor="filtro-membresias">Estado</label>
              <select id="filtro-membresias" value={filtro} onChange={(e) => elegirFiltro(e.target.value)}>
                {FILTROS.map((f) => (
                  <option key={f.id} value={f.id}>{f.etiqueta}</option>
                ))}
              </select>
            </div>

            <div className="gestion-field">
              <label htmlFor="busqueda-membresias">Buscar</label>
              <input
                id="busqueda-membresias"
                type="search"
                placeholder="Cliente, cédula o plan"
                maxLength={MAX_BUSQUEDA}
                autoComplete="off"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value.replace(/\p{Cc}/gu, ""))}
              />
            </div>
            <button className="gestion-button-quiet" type="button" onClick={() => setBusqueda("")} disabled={busqueda === ""}>
              Limpiar búsqueda
            </button>
          </div>
        </>
      )}

      {aviso && <p role="status">{aviso}</p>}
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      {!modo && (
        <>
          {cargando && datos.membresias.length === 0 && !error && <p>Cargando membresías...</p>}
          {!cargando && !error && datos.membresias.length === 0 && <p>Aún no hay membresías registradas.</p>}
          {!cargando && datos.membresias.length > 0 && filas.length === 0 && (
            <p>Ninguna membresía coincide con el filtro o la búsqueda.</p>
          )}

          {filas.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Cédula</th>
                  <th>Plan</th>
                  <th>Inicio</th>
                  <th>Vence</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.id}>
                    <td>{f.cliente}</td>
                    <td>{f.cedula}</td>
                    <td>{f.plan}</td>
                    <td>{f.inicio}</td>
                    <td>{f.fin}</td>
                    <td>{ETIQUETAS_ESTADO[f.estado]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}

export default Membresias;
