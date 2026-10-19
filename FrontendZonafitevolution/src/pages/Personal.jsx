import { useCallback, useEffect, useMemo, useState } from "react";
import FormularioUsuario from "../components/FormularioUsuario";
import { crearUsuario, eliminarUsuario, listarUsuarios } from "../services/usuarioService";
import { ROL_ADMIN, etiquetaRol } from "../utils/permisos";
import { motivoNoEliminable } from "../utils/validacionesUsuario";
import "../PantallasGestion.css";

const formatoFecha = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric" });

function textoFecha(valor) {
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? "—" : formatoFecha.format(fecha);
}

// Personal: usuarios del sistema (solo Admin). Se puede crear y eliminar; no la propia cuenta ni al último administrador.
function Personal({ usuario }) {
  const esAdmin = usuario.rol_id === ROL_ADMIN;
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(esAdmin);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [recarga, setRecarga] = useState(0);
  const [creando, setCreando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const cargar = useCallback(() => {
    setCargando(true);
    return listarUsuarios()
      .then((lista) => {
        setUsuarios(lista);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    if (!esAdmin) return undefined;
    let vigente = true;
    listarUsuarios()
      .then((lista) => {
        if (!vigente) return;
        setUsuarios(lista);
        setError("");
      })
      .catch((err) => vigente && setError(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [recarga, esAdmin]);

  const ordenados = useMemo(
    () => [...usuarios].sort((a, b) => String(a.nombre).localeCompare(String(b.nombre), "es")),
    [usuarios],
  );
  const correosExistentes = useMemo(() => usuarios.map((u) => String(u.correo)), [usuarios]);

  if (!esAdmin) {
    return (
      <section className="gestion-page gestion-personal">
        <h1>Personal</h1>
        <p className="mensaje-error" role="alert">Esta sección es solo para el administrador.</p>
      </section>
    );
  }

  function actualizarLista() {
    // Evita consultas duplicadas por doble clic
    if (cargando) return;
    setAviso("");
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  async function guardar(datos) {
    await crearUsuario(datos);
    setCreando(false);
    await cargar();
    setAviso(`Usuario "${datos.nombre}" creado correctamente.`);
  }

  async function eliminar(u) {
    // Un solo borrado a la vez y con las salvaguardas del frontend (el backend no las exige)
    if (eliminandoId !== null || motivoNoEliminable(u, usuario, usuarios)) return;
    if (!window.confirm(`¿Eliminar al usuario "${u.nombre}" (${u.correo})? Esta acción no se puede deshacer.`)) return;

    setEliminandoId(u.id);
    setError("");
    setAviso("");
    try {
      await eliminarUsuario(u.id);
      await cargar();
      setAviso(`Usuario "${u.nombre}" eliminado correctamente.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setEliminandoId(null);
    }
  }

  const ocupado = cargando || eliminandoId !== null;

  return (
    <section className="gestion-page gestion-personal">
      <h1>Personal</h1>

      {creando ? (
        <FormularioUsuario
          correosExistentes={correosExistentes}
          alGuardar={guardar}
          alCancelar={() => setCreando(false)}
        />
      ) : (
        <div className="gestion-actions">
          <button type="button" onClick={() => { setAviso(""); setCreando(true); }} disabled={ocupado}>
            Crear usuario
          </button>
          <button type="button" onClick={actualizarLista} disabled={cargando}>
            {cargando ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      )}

      {aviso && <p role="status">{aviso}</p>}
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      {!creando && (
        <>
          {cargando && usuarios.length === 0 && !error && <p>Cargando personal...</p>}
          {!cargando && !error && usuarios.length === 0 && <p>Aún no hay usuarios registrados.</p>}

          {ordenados.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Creado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map((u) => {
                  const motivo = motivoNoEliminable(u, usuario, usuarios);
                  return (
                    <tr key={u.id}>
                      <td>{u.nombre}{u.id === usuario.id && " (tú)"}</td>
                      <td>{u.correo}</td>
                      <td>{etiquetaRol(u.rol_id)}</td>
                      <td>{textoFecha(u.fecha_creacion)}</td>
                      <td>
                        <button type="button" onClick={() => eliminar(u)} disabled={ocupado || Boolean(motivo)} title={motivo || undefined}>
                          {eliminandoId === u.id ? "Eliminando..." : "Eliminar"}
                        </button>
                        {motivo && <small> {motivo}</small>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}

export default Personal;
