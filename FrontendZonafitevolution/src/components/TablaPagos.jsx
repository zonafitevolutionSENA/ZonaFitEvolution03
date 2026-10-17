import { Fragment, useState } from "react";
import { ETIQUETAS_ESTADO } from "../utils/estadoMembresia";
import { pesos } from "../utils/finanzas";

// Tabla con el resumen de pagos de cada cliente; cada fila puede abrir el detalle de sus pagos.
// No llama a la API: recibe los `resumenes` ya calculados.
function TablaPagos({ resumenes }) {
  const [abierto, setAbierto] = useState(null);

  function alternar(id) {
    setAbierto((actual) => (actual === id ? null : id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Cédula</th>
          <th>Pagos</th>
          <th>Total pagado</th>
          <th>Último pago</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        {resumenes.map((r) => {
          const id = r.cliente.id;
          const desplegado = abierto === id;
          return (
            <Fragment key={id}>
              <tr>
                <td>{r.cliente.nombre}</td>
                <td>{r.cliente.cedula}</td>
                <td>{r.cantidad}</td>
                <td>
                  {pesos(r.total)}
                  {r.sinPrecio > 0 && ` (${r.sinPrecio} sin precio)`}
                </td>
                <td>{r.ultimo || "—"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => alternar(id)}
                    aria-expanded={desplegado}
                    disabled={r.cantidad === 0}
                  >
                    {desplegado ? "Ocultar pagos" : "Ver pagos"}
                  </button>
                </td>
              </tr>
              {desplegado && (
                <tr>
                  <td colSpan={6}>
                    <table aria-label={`Pagos de ${r.cliente.nombre}`}>
                      <thead>
                        <tr>
                          <th>Fecha del pago</th>
                          <th>Plan</th>
                          <th>Monto</th>
                          <th>Estado de la membresía</th>
                          <th>Vigencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.pagos.map((p) => (
                          <tr key={p.id}>
                            <td>{p.dia || "—"}</td>
                            <td>{p.plan}</td>
                            <td>{p.monto === null ? "Sin precio" : pesos(p.monto)}</td>
                            <td>{ETIQUETAS_ESTADO[p.estado] ?? p.estado}</td>
                            <td>
                              {p.inicio || "—"} a {p.fin || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default TablaPagos;
