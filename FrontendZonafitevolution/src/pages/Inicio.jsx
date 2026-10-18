import { useEffect, useState } from "react";
import { obtenerActividadReciente } from "../services/dashboardService";
import { etiquetaRol } from "../utils/permisos";
import "../Inicio.css";

const formatoHora = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const ACCIONES_RAPIDAS = [
  {
    id: "registrar-cliente",
    titulo: "Registrar cliente",
    detalle: "Añade un nuevo cliente al sistema",
  },
  {
    id: "renovar-membresia",
    titulo: "Asignar o renovar membresía",
    detalle: "Gestiona los planes de tus clientes",
  },
  {
    id: "validar-acceso",
    titulo: "Validar acceso",
    detalle: "Comprueba el acceso de un miembro",
  },
];

function primerNombre(nombre) {
  return (
    String(nombre ?? "")
      .trim()
      .split(/\s+/)[0] || ""
  );
}

function Inicio({ usuario, alNavegar }) {
  const [actividad, setActividad] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let vigente = true;
    obtenerActividadReciente(5)
      .then((filas) => {
        if (!vigente) return;
        setActividad(filas);
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

  return (
    <section className="inicio-page">
      <div className="inicio-header">
        <div>
          <h1 className="inicio-title">Bienvenido, {primerNombre(usuario.nombre)}</h1>
          <h2 className="inicio-role">{etiquetaRol(usuario.rol_id)}</h2>
        </div>
      </div>

      <p className="inicio-question">¿Qué necesitas gestionar hoy?</p>

      <div className="inicio-acciones-wrap">
        <h3 className="inicio-subtitle">Acciones rápidas</h3>
        <ul className="inicio-acciones">
          {ACCIONES_RAPIDAS.map((a) => (
            <li key={a.id} className="inicio-accion-item">
              <button className="inicio-accion-btn" type="button" onClick={() => alNavegar(a.id)}>
                <span className="inicio-accion-text">{a.titulo}</span>
                <span className="inicio-accion-arrow">→</span>
              </button>
              <small className="inicio-accion-detalle"> {a.detalle}</small>
            </li>
          ))}
        </ul>
      </div>

      <div className="inicio-actividad-header">
        <h3 className="inicio-subtitle">Actividad reciente</h3>
        <button className="inicio-link-btn" type="button" onClick={() => alNavegar("historial")}>
          Ver historial
        </button>
      </div>

      <div className="inicio-toolbar">
        <button className="inicio-action-btn" type="button" onClick={actualizar} disabled={cargando}>
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {error && (
        <p className="mensaje-error" role="alert">
          {error}
        </p>
      )}

      {!error && cargando && actividad.length === 0 && (
        <p>Cargando actividad...</p>
      )}
      {!error && !cargando && actividad.length === 0 && (
        <p>Aún no hay accesos registrados.</p>
      )}

      {actividad.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {actividad.map((a) => (
              <tr key={a.id}>
                <td>{a.cliente}</td>
                <td>{formatoHora.format(a.fechaHora)}</td>
                <td>{a.permitido ? "Acceso permitido" : "Acceso denegado"}</td>
                <td>{a.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Inicio;
