import { useEffect, useState } from "react";
import { validarClienteHuella } from "../utils/validacionesAcceso";
import { obtenerEstadoRegistro } from "../services/biometriaService";
import BuscadorCliente from "./BuscadorCliente";

const MENSAJES_LECTURA = {
  preparando: "Preparando la lectura...",
  conectando: "Conectando el lector...",
  primera: "Coloca el dedo en el lector y mantenlo hasta que se indique retirarlo.",
  retirar: "Primera lectura completada. Retira el dedo del lector.",
  segunda: "Vuelve a colocar el mismo dedo en el lector.",
  procesando: "Procesando y guardando la huella...",
};

// Formulario para registrar la huella de un cliente con el lector. No llama a la API: usa `alRegistrar`.
function RegistrarHuella({ clientes, alRegistrar, clienteFijo = null, alTerminar, alCancelar }) {
  const [cliente, setCliente] = useState(clienteFijo ? String(clienteFijo.id) : "");
  const [errores, setErrores] = useState({ cliente: "" });
  const [errorGeneral, setErrorGeneral] = useState("");
  const [aviso, setAviso] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [capturaId, setCapturaId] = useState("");
  const [etapa, setEtapa] = useState("preparando");
  const [errorEtapa, setErrorEtapa] = useState("");

  useEffect(() => {
    if (!guardando || !capturaId) return undefined;
    let vigente = true;
    let temporizador;

    async function consultar() {
      try {
        const estado = await obtenerEstadoRegistro(capturaId);
        if (vigente) {
          setEtapa(estado);
          setErrorEtapa("");
        }
      } catch {
        if (vigente) setErrorEtapa("No se pudo consultar el estado de la lectura.");
      } finally {
        if (vigente) temporizador = setTimeout(consultar, 350);
      }
    }

    consultar();
    return () => {
      vigente = false;
      clearTimeout(temporizador);
    };
  }, [guardando, capturaId]);

  function limpiarMensajes() {
    setErrorGeneral("");
    setAviso("");
  }

  function elegirCliente(id) {
    setCliente(id);
    setErrores((x) => ({ ...x, cliente: id ? validarClienteHuella(id, clientes) : "" }));
    limpiarMensajes();
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita registros duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = { cliente: validarClienteHuella(cliente, clientes) };
    setErrores(resultado);
    if (resultado.cliente) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      setAviso("");
      return;
    }

    const nuevaCapturaId = crypto.randomUUID();
    setCapturaId(nuevaCapturaId);
    setEtapa("preparando");
    setErrorEtapa("");
    setGuardando(true);
    limpiarMensajes();
    try {
      await alRegistrar({ cliente_id: Number(cliente), capturaId: nuevaCapturaId });
      const nombre = clientes.find((c) => c.id === Number(cliente))?.nombre ?? "el cliente";
      setAviso(`Huella registrada correctamente para ${nombre}.`);
      setCliente("");
      if (alTerminar) alTerminar();
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Registrar huella">
      <h2>Registrar huella</h2>

      {clienteFijo ? (
        <p>Cliente: <strong>{clienteFijo.nombre}</strong> — {clienteFijo.cedula}</p>
      ) : (
        <BuscadorCliente
          id="cliente-huella"
          etiqueta="Cliente *"
          clientes={clientes}
          valor={cliente}
          alCambiar={elegirCliente}
          error={errores.cliente}
          disabled={guardando}
        />
      )}

      <p>
        Al presionar "Registrar huella", coloca el dedo en el lector, retíralo y vuelve a colocar el mismo dedo.
        Tienes 15 segundos en cada lectura.
      </p>

      <button type="submit" disabled={guardando}>
        {guardando ? "Registrando..." : "Registrar huella"}
      </button>
      {alCancelar && <button type="button" onClick={alCancelar} disabled={guardando}>Volver a clientes</button>}

      {guardando && <p role="status" aria-live="polite">{errorEtapa || MENSAJES_LECTURA[etapa] || MENSAJES_LECTURA.preparando}</p>}
      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}
      {aviso && <p role="status">{aviso}</p>}
    </form>
  );
}

export default RegistrarHuella;
