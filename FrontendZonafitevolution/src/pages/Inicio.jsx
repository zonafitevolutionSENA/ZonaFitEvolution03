import { useEffect, useState } from "react";
import { obtenerActividadReciente } from "../services/dashboardService";
import { etiquetaRol } from "../utils/permisos";

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
    <section>
      <h1>Bienvenido, {primerNombre(usuario.nombre)}</h1>
      <h2>{etiquetaRol(usuario.rol_id)}</h2>
      <p>¿Qué necesitas gestionar hoy?</p>

      <h3>Acciones rápidas</h3>
      <ul>
        {ACCIONES_RAPIDAS.map((a) => (
          <li key={a.id}>
            <button type="button" onClick={() => alNavegar(a.id)}>
              {a.titulo}
            </button>
            <small> {a.detalle}</small>
          </li>
        ))}
      </ul>

      <h3>Actividad reciente</h3>
      <button type="button" onClick={() => alNavegar("historial")}>
        Ver historial
      </button>
      <button type="button" onClick={actualizar} disabled={cargando}>
        {cargando ? "Actualizando..." : "Actualizar"}
      </button>

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
