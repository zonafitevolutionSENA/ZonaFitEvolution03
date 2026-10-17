import { useCallback, useEffect, useMemo, useState } from "react";
import FormularioCliente from "../components/FormularioCliente";
import { actualizarCliente, crearCliente, listarClientes } from "../services/clienteService";
import { cambiarEstadoMembresia, listarMembresias } from "../services/membresiaService";
import {
  ETIQUETAS_ESTADO,
  accionesPermitidas,
  diaDe,
  membresiaActual,
} from "../utils/estadoMembresia";
import { normalizarTexto } from "../utils/validacionesCliente";

const MAX_BUSQUEDA = 50;

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function textoFecha(valor) {
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? "—" : formatoFecha.format(fecha);
}

// Carga clientes y membresías a la vez; si fallan las membresías, la lista de clientes igual se muestra
async function cargarDatos() {
  const [clientes, membresias] = await Promise.allSettled([listarClientes(), listarMembresias()]);
  if (clientes.status === "rejected") throw clientes.reason;
  return {
    clientes: clientes.value,
    membresias: membresias.status === "fulfilled" ? membresias.value : [],
    errorMembresias: membresias.status === "rejected" ? membresias.reason.message : "",
  };
}

// Clientes: lista, búsqueda, registro, edición y cambio del estado de la membresía.
// Los clientes no se eliminan: lo que cambia es el estado de su membresía.
function Clientes({ iniciarEnRegistro = false }) {
  const [clientes, setClientes] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [recarga, setRecarga] = useState(0);
  // null = solo lista · "nuevo" = formulario de registro · objeto = cliente que se edita
  const [formulario, setFormulario] = useState(iniciarEnRegistro ? "nuevo" : null);
  const [cambiandoId, setCambiandoId] = useState(null);

  const aplicar = useCallback((datos) => {
    setClientes(datos.clientes);
    setMembresias(datos.membresias);
    setError(datos.errorMembresias ? `No se pudo consultar las membresías: ${datos.errorMembresias}` : "");
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
      .then((datos) => vigente && aplicar(datos))
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

  const visibles = useMemo(() => {
    const termino = normalizarTexto(busqueda).toLowerCase();
    const ordenados = [...clientes].sort((a, b) =>
      String(a.nombre ?? "").localeCompare(String(b.nombre ?? ""), "es"),
    );
    if (!termino) return ordenados;
    return ordenados.filter((c) =>
      [c.nombre, c.cedula, c.correo, c.telefono].some((v) => String(v ?? "").toLowerCase().includes(termino)),
    );
  }, [clientes, busqueda]);

  const membresiasPorCliente = useMemo(() => {
    const mapa = new Map();
    for (const m of membresias) {
      if (!mapa.has(m.cliente_id)) mapa.set(m.cliente_id, []);
      mapa.get(m.cliente_id).push(m);
    }
    return mapa;
  }, [membresias]);

  const cedulasExistentes = useMemo(() => clientes.map((c) => String(c.cedula)), [clientes]);

  function abrirRegistro() {
    setAviso("");
    setFormulario("nuevo");
  }

  function abrirEdicion(cliente) {
    setAviso("");
    setFormulario(cliente);
  }

  async function guardar(datos) {
    if (formulario === "nuevo") {
      await crearCliente(datos);
      setAviso(`Cliente "${datos.nombre}" registrado correctamente.`);
    } else {
      await actualizarCliente(formulario.id, datos);
      setAviso(`Cliente "${datos.nombre}" actualizado correctamente.`);
    }
    setFormulario(null);
    await cargar();
  }

  async function cambiarEstado(cliente, membresia, accion) {
    // Un cambio a la vez: evita envíos duplicados por doble clic
    if (cambiandoId !== null) return;
    if (!window.confirm(`¿${accion.etiqueta} de "${cliente.nombre}"?`)) return;

    setCambiandoId(membresia.id);
    setError("");
    setAviso("");
    try {
      await cambiarEstadoMembresia(membresia.id, accion.estado);
      await cargar();
      setAviso(`La membresía de "${cliente.nombre}" ahora está ${ETIQUETAS_ESTADO[accion.estado].toLowerCase()}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setCambiandoId(null);
    }
  }

  const ocupado = cargando || cambiandoId !== null;

  return (
    <section>
      <h1>Clientes</h1>

      {formulario ? (
        <FormularioCliente
          // La clave reinicia el formulario al cambiar de cliente
          key={formulario === "nuevo" ? "nuevo" : formulario.id}
          cliente={formulario === "nuevo" ? null : formulario}
          cedulasExistentes={cedulasExistentes}
          alGuardar={guardar}
          alCancelar={() => setFormulario(null)}
        />
      ) : (
        <>
          <button type="button" onClick={abrirRegistro}>Registrar cliente</button>
          <button type="button" onClick={actualizarLista} disabled={cargando}>
            {cargando ? "Actualizando..." : "Actualizar"}
          </button>

          <div>
            <label htmlFor="busqueda-clientes">Buscar</label>
            <input
              id="busqueda-clientes"
              type="search"
              placeholder="Nombre, cédula, correo o teléfono"
              maxLength={MAX_BUSQUEDA}
              autoComplete="off"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value.replace(/\p{Cc}/gu, ""))}
            />
            <button type="button" onClick={() => setBusqueda("")} disabled={busqueda === ""}>
              Limpiar búsqueda
            </button>
          </div>
        </>
      )}

      {aviso && <p role="status">{aviso}</p>}
      {error && (
        <p className="mensaje-error" role="alert">{error}</p>
      )}

      {!formulario && (
        <>
          {cargando && clientes.length === 0 && !error && <p>Cargando clientes...</p>}
          {!cargando && !error && clientes.length === 0 && <p>Aún no hay clientes registrados.</p>}
          {!cargando && clientes.length > 0 && visibles.length === 0 && (
            <p>Ningún cliente coincide con la búsqueda.</p>
          )}

          {visibles.length > 0 && (
            <>
              <p>
                Mostrando {visibles.length} de {clientes.length} clientes
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cédula</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Registro</th>
                    <th>Membresía</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibles.map((c) => {
                    const delCliente = membresiasPorCliente.get(c.id) ?? [];
                    const membresia = membresiaActual(delCliente);
                    const acciones = accionesPermitidas(membresia, delCliente);
                    return (
                      <tr key={c.id}>
                        <td>{c.nombre}</td>
                        <td>{c.cedula}</td>
                        <td>{c.correo || "—"}</td>
                        <td>{c.telefono || "—"}</td>
                        <td>{textoFecha(c.fecha_registro)}</td>
                        <td>
                          {membresia
                            ? `${ETIQUETAS_ESTADO[membresia.estado]}${diaDe(membresia.fecha_fin) ? ` · vence ${diaDe(membresia.fecha_fin)}` : ""}`
                            : "Sin membresía"}
                        </td>
                        <td>
                          <button type="button" onClick={() => abrirEdicion(c)} disabled={ocupado}>
                            Editar
                          </button>
                          {acciones.map((a) => (
                            <button
                              key={a.estado}
                              type="button"
                              onClick={() => cambiarEstado(c, membresia, a)}
                              disabled={ocupado}
                            >
                              {cambiandoId === membresia.id ? "Guardando..." : a.etiqueta}
                            </button>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Clientes;
