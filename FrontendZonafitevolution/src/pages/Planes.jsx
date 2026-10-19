import { useCallback, useEffect, useMemo, useState } from "react";
import FormularioPlan from "../components/FormularioPlan";
import {
  activarPlan,
  actualizarPlan,
  crearPlan,
  desactivarPlan,
  listarPlanes,
} from "../services/planService";
import { ROL_ADMIN } from "../utils/permisos";
import "../PantallasGestion.css";

const FILTROS = [
  { id: "todos", etiqueta: "Todos" },
  { id: "activos", etiqueta: "Activos" },
  { id: "inactivos", etiqueta: "Inactivos" },
];

const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function textoPrecio(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? formatoPrecio.format(numero) : "—";
}

// Planes: todos ven el catálogo; solo el Admin crea, edita, activa y desactiva.
// Los planes no se eliminan: se desactivan para no afectar el historial de membresías.
function Planes({ usuario }) {
  const [planes, setPlanes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [recarga, setRecarga] = useState(0);
  // null = solo lista · "nuevo" = formulario de creación · objeto = plan que se edita
  const [formulario, setFormulario] = useState(null);
  const [cambiandoId, setCambiandoId] = useState(null);

  const esAdmin = usuario.rol_id === ROL_ADMIN;

  const cargar = useCallback(() => {
    setCargando(true);
    return listarPlanes()
      .then((lista) => {
        setPlanes(lista);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    let vigente = true;
    listarPlanes()
      .then((lista) => {
        if (!vigente) return;
        setPlanes(lista);
        setError("");
      })
      .catch((err) => vigente && setError(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [recarga]);

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

  const visibles = useMemo(() => {
    const ordenados = [...planes].sort((a, b) => Number(a.duracion_dias) - Number(b.duracion_dias));
    if (filtro === "activos") return ordenados.filter((p) => p.activo);
    if (filtro === "inactivos") return ordenados.filter((p) => !p.activo);
    return ordenados;
  }, [planes, filtro]);

  // Nombres de los demás planes (al editar, el propio plan no cuenta como repetido)
  const otrosNombres = useMemo(() => {
    const propio = formulario && formulario !== "nuevo" ? formulario.id : null;
    return planes.filter((p) => p.id !== propio).map((p) => p.nombre);
  }, [planes, formulario]);

  async function guardar(datos) {
    if (!esAdmin) throw new Error("Solo el administrador puede gestionar planes.");
    if (formulario === "nuevo") {
      await crearPlan(datos);
      setAviso(`Plan "${datos.nombre}" creado correctamente.`);
    } else {
      await actualizarPlan(formulario.id, datos);
      setAviso(`Plan "${datos.nombre}" actualizado correctamente.`);
    }
    setFormulario(null);
    await cargar();
  }

  async function cambiarEstado(plan) {
    // Solo el Admin (el backend también lo exige) y un cambio a la vez
    if (!esAdmin || cambiandoId !== null) return;
    const activar = !plan.activo;
    const pregunta = activar
      ? `¿Activar el plan "${plan.nombre}"? Volverá a estar disponible para nuevas membresías.`
      : `¿Desactivar el plan "${plan.nombre}"? No se podrá asignar a nuevas membresías; las que ya existen no cambian.`;
    if (!window.confirm(pregunta)) return;

    setCambiandoId(plan.id);
    setError("");
    setAviso("");
    try {
      await (activar ? activarPlan(plan.id) : desactivarPlan(plan.id));
      await cargar();
      setAviso(`Plan "${plan.nombre}" ${activar ? "activado" : "desactivado"} correctamente.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setCambiandoId(null);
    }
  }

  const ocupado = cargando || cambiandoId !== null;

  return (
    <section className="gestion-page gestion-planes">
      <h1>Planes</h1>

      {formulario ? (
        <FormularioPlan
          key={formulario === "nuevo" ? "nuevo" : formulario.id}
          plan={formulario === "nuevo" ? null : formulario}
          otrosNombres={otrosNombres}
          alGuardar={guardar}
          alCancelar={() => setFormulario(null)}
        />
      ) : (
        <>
          <div className="gestion-actions">
            {esAdmin && (
              <button type="button" onClick={() => { setAviso(""); setFormulario("nuevo"); }} disabled={ocupado}>
                Crear plan
              </button>
            )}
            <button type="button" onClick={actualizarLista} disabled={cargando}>
              {cargando ? "Actualizando..." : "Actualizar"}
            </button>
          </div>

          <div className="gestion-filters">
            <div className="gestion-field">
              <label htmlFor="filtro-planes">Mostrar</label>
              <select id="filtro-planes" value={filtro} onChange={(e) => elegirFiltro(e.target.value)}>
                {FILTROS.map((f) => (
                  <option key={f.id} value={f.id}>{f.etiqueta}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {aviso && <p role="status">{aviso}</p>}
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      {!formulario && (
        <>
          {cargando && planes.length === 0 && !error && <p>Cargando planes...</p>}
          {!cargando && !error && planes.length === 0 && <p>Aún no hay planes registrados.</p>}
          {!cargando && planes.length > 0 && visibles.length === 0 && <p>Ningún plan coincide con el filtro.</p>}

          {visibles.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  {esAdmin && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.duracion_dias} {Number(p.duracion_dias) === 1 ? "día" : "días"}</td>
                    <td>{textoPrecio(p.precio)}</td>
                    <td>{p.activo ? "Activo" : "Inactivo"}</td>
                    {esAdmin && (
                      <td>
                        <button type="button" onClick={() => { setAviso(""); setFormulario(p); }} disabled={ocupado}>
                          Editar
                        </button>
                        <button type="button" onClick={() => cambiarEstado(p)} disabled={ocupado}>
                          {cambiandoId === p.id ? "Guardando..." : p.activo ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    )}
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

export default Planes;
