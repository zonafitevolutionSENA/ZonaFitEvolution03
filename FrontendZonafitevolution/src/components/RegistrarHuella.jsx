import { useMemo, useState } from "react";
import { LIMITES_HUELLA, validarClienteHuella, validarIdentificador } from "../utils/validacionesAcceso";
import Campo from "./Campo";

// Formulario para registrar la huella simulada de un cliente. No llama a la API: usa `alRegistrar`.
function RegistrarHuella({ clientes, alRegistrar }) {
  const [cliente, setCliente] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [errores, setErrores] = useState({ cliente: "", identificador: "" });
  const [errorGeneral, setErrorGeneral] = useState("");
  const [aviso, setAviso] = useState("");
  const [guardando, setGuardando] = useState(false);

  const ordenados = useMemo(
    () => [...clientes].sort((a, b) => String(a.nombre).localeCompare(String(b.nombre), "es")),
    [clientes],
  );

  function limpiarMensajes() {
    setErrorGeneral("");
    setAviso("");
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita registros duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = {
      cliente: validarClienteHuella(cliente, clientes),
      identificador: validarIdentificador(identificador),
    };
    setErrores(resultado);
    if (resultado.cliente || resultado.identificador) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      setAviso("");
      return;
    }

    setGuardando(true);
    limpiarMensajes();
    try {
      await alRegistrar({ cliente_id: Number(cliente), identificador });
      const nombre = clientes.find((c) => c.id === Number(cliente))?.nombre ?? "el cliente";
      setAviso(`Huella registrada correctamente para ${nombre}.`);
      setCliente("");
      setIdentificador("");
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Registrar huella">
      <h2>Registrar huella</h2>

      <div>
        <label htmlFor="cliente-huella">Cliente *</label>
        <select
          id="cliente-huella"
          value={cliente}
          onChange={(e) => { setCliente(e.target.value); setErrores((x) => ({ ...x, cliente: "" })); limpiarMensajes(); }}
          aria-invalid={errores.cliente ? "true" : undefined}
          disabled={guardando}
        >
          <option value="">Selecciona un cliente</option>
          {ordenados.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre} — {c.cedula}</option>
          ))}
        </select>
        {errores.cliente && <p className="mensaje-error" role="alert">{errores.cliente}</p>}
      </div>

      <Campo
        id="huella-registrar"
        etiqueta="Huella simulada *"
        type="text"
        autoComplete="off"
        maxLength={LIMITES_HUELLA.max}
        value={identificador}
        // Sin espacios ni caracteres no permitidos al escribir o pegar
        onChange={(e) => {
          setIdentificador(e.target.value.replace(/[^A-Za-z0-9_.-]/g, ""));
          setErrores((x) => ({ ...x, identificador: "" }));
          limpiarMensajes();
        }}
        error={errores.identificador}
        ayuda="Texto único por cliente (por ejemplo, dedo_juan_01). Cada cliente tiene una sola huella."
        disabled={guardando}
      />

      <button type="submit" disabled={guardando}>{guardando ? "Registrando..." : "Registrar huella"}</button>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}
      {aviso && <p role="status">{aviso}</p>}
    </form>
  );
}

export default RegistrarHuella;
