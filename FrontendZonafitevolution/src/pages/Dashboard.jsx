import { useEffect, useState } from "react";
import { obtenerResumen } from "../services/dashboardService";

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let vigente = true;
    obtenerResumen()
      .then((datos) => {
        if (!vigente) return;
        setResumen(datos);
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

  if (cargando && !resumen) return <p>Cargando resumen...</p>;

  if (error && !resumen) {
    return (
      <section>
        <p className="mensaje-error" role="alert">{error}</p>
        <button onClick={actualizar}>Reintentar</button>
      </section>
    );
  }

  return (
    <section>
      <h2>Resumen · {resumen.fecha}</h2>
      <button onClick={actualizar} disabled={cargando}>
        {cargando ? "Actualizando..." : "Actualizar"}
      </button>
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      <h3>Indicadores</h3>
      <dl>
        <dt>Clientes</dt>
        <dd>{resumen.clientesTotal}</dd>
        <dt>Membresías activas</dt>
        <dd>{resumen.membresias.activas}</dd>
        <dt>Por vencer (7 días)</dt>
        <dd>{resumen.membresias.porVencer}</dd>
        <dt>Vencidas</dt>
        <dd>{resumen.membresias.vencidas}</dd>
        <dt>Canceladas</dt>
        <dd>{resumen.membresias.canceladas}</dd>
        <dt>Ingresos del mes</dt>
        <dd>{formatoPesos.format(resumen.ingresosMes)}</dd>
        <dt>Accesos hoy (últimos 50 registros)</dt>
        <dd>
          {resumen.accesosHoy.permitidos} permitidos · {resumen.accesosHoy.denegados} denegados
        </dd>
      </dl>

      <h3>Activas por plan</h3>
      {resumen.activasPorPlan.length === 0 ? (
        <p>Aún no hay membresías activas.</p>
      ) : (
        <ul>
          {resumen.activasPorPlan.map((p) => (
            <li key={p.nombre}>
              {p.nombre}: {p.total}
            </li>
          ))}
        </ul>
      )}

      <h3>Próximas a vencer</h3>
      {resumen.porVencer.length === 0 ? (
        <p>Ninguna membresía vence en los próximos 7 días.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Plan</th>
              <th>Vence</th>
            </tr>
          </thead>
          <tbody>
            {resumen.porVencer.map((m) => (
              <tr key={m.id}>
                <td>{m.cliente}</td>
                <td>{m.plan}</td>
                <td>{m.fechaFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Dashboard;
