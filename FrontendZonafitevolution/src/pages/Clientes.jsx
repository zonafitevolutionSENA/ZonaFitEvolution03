import { useCallback, useEffect, useMemo, useState } from "react";
import FormularioCliente from "../components/FormularioCliente";
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  listarClientes,
} from "../services/clienteService";
import { ROL_ADMIN } from "../utils/permisos";
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

// Clientes: lista, búsqueda, registro, edición y eliminación (esta última solo para el Admin)
function Clientes({ usuario, iniciarEnRegistro = false }) {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [recarga, setRecarga] = useState(0);
  // null = solo lista · "nuevo" = formulario de registro · objeto = cliente que se edita
  const [formulario, setFormulario] = useState(iniciarEnRegistro ? "nuevo" : null);
  const [eliminandoId, setEliminandoId] = useState(null);

  const esAdmin = usuario.rol_id === ROL_ADMIN;

  const cargar = useCallback(() => {
    setCargando(true);
    return listarClientes()
      .then((lista) => {
        setClientes(lista);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    let vigente = true;
    listarClientes()
      .then((lista) => {
        if (!vigente) return;
        setClientes(lista);
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

  async function eliminar(cliente) {
    // Solo el Admin elimina (el backend también lo exige) y no se permite más de una eliminación a la vez
    if (!esAdmin || eliminandoId !== null) return;
    if (!window.confirm(`¿Eliminar al cliente "${cliente.nombre}" (cédula ${cliente.cedula})? Esta acción no se puede deshacer.`)) {
      return;
    }

    setEliminandoId(cliente.id);
    setError("");
    setAviso("");
    try {
      await eliminarCliente(cliente.id);
      setAviso(`Cliente "${cliente.nombre}" eliminado correctamente.`);
      await cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setEliminandoId(null);
    }
  }

  const ocupado = cargando || eliminandoId !== null;

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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibles.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>{c.cedula}</td>
                      <td>{c.correo || "—"}</td>
                      <td>{c.telefono || "—"}</td>
                      <td>{textoFecha(c.fecha_registro)}</td>
                      <td>
                        <button type="button" onClick={() => abrirEdicion(c)} disabled={ocupado}>
                          Editar
                        </button>
                        {esAdmin && (
                          <button type="button" onClick={() => eliminar(c)} disabled={ocupado}>
                            {eliminandoId === c.id ? "Eliminando..." : "Eliminar"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
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
