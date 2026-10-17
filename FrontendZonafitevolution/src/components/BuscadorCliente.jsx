import { useMemo, useState } from "react";
import {
  MAX_BUSQUEDA_CLIENTE,
  MIN_BUSQUEDA_CLIENTE,
  filtrarClientes,
  limpiarBusquedaCliente,
} from "../utils/busquedaClientes";
import Campo from "./Campo";

// Elige un cliente escribiendo su nombre o cédula. No llama a la API: recibe la lista de `clientes`.
// `valor` es el id elegido (texto) o ""; `alCambiar` recibe el id elegido o "" al cambiar de cliente.
function BuscadorCliente({ id, etiqueta, clientes, valor, alCambiar, error, disabled }) {
  const [texto, setTexto] = useState("");

  const seleccionado = clientes.find((c) => String(c.id) === String(valor)) ?? null;
  const { resultados, total, suficiente } = useMemo(() => filtrarClientes(clientes, texto), [clientes, texto]);

  function elegir(clienteId) {
    setTexto("");
    alCambiar(String(clienteId));
  }

  function alTeclear(evento) {
    // Enter dentro del buscador nunca envía el formulario; con una sola coincidencia la elige
    if (evento.key !== "Enter") return;
    evento.preventDefault();
    if (resultados.length === 1) elegir(resultados[0].id);
  }

  if (seleccionado) {
    return (
      <div>
        <p id={id}>
          {etiqueta}: <strong>{seleccionado.nombre}</strong> — {seleccionado.cedula}
        </p>
        <button type="button" onClick={() => alCambiar("")} disabled={disabled}>
          Cambiar cliente
        </button>
        {error && <p className="mensaje-error" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <Campo
        id={id}
        etiqueta={etiqueta}
        type="search"
        placeholder="Nombre o cédula"
        autoComplete="off"
        maxLength={MAX_BUSQUEDA_CLIENTE}
        value={texto}
        onChange={(e) => setTexto(limpiarBusquedaCliente(e.target.value))}
        onKeyDown={alTeclear}
        error={error}
        ayuda={
          clientes.length === 0
            ? "Aún no hay clientes registrados."
            : `Escribe al menos ${MIN_BUSQUEDA_CLIENTE} caracteres del nombre o la cédula (${clientes.length} clientes).`
        }
        disabled={disabled}
      />

      {suficiente && resultados.length === 0 && <p role="status">Ningún cliente coincide con la búsqueda.</p>}

      {resultados.length > 0 && (
        <>
          <ul aria-label="Resultados de la búsqueda de clientes">
            {resultados.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => elegir(c.id)} disabled={disabled}>
                  {c.nombre} — {c.cedula}
                </button>
              </li>
            ))}
          </ul>
          {total > resultados.length && (
            <small>
              Mostrando {resultados.length} de {total} coincidencias. Escribe más para acotar.
            </small>
          )}
        </>
      )}
    </div>
  );
}

export default BuscadorCliente;
