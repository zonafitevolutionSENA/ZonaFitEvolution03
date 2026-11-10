import { useEffect, useState } from "react";
import { LIMITES_HUELLA, validarClienteHuella, validarIdentificador } from "../utils/validacionesAcceso";
import { obtenerEstadoRegistro } from "../services/biometriaService";
import BuscadorCliente from "./BuscadorCliente";
import Campo from "./Campo";

const MENSAJES_LECTURA = {
  preparando: "Preparando la lectura...",
  conectando: "Conectando el lector...",
  primera: "Coloca el dedo en el lector y mantenlo hasta que se indique retirarlo.",
  retirar: "Primera lectura completada. Retira el dedo del lector.",
  segunda: "Vuelve a colocar el mismo dedo en el lector.",
  procesando: "Procesando y guardando la huella...",
};

// Formulario para registrar la huella de un cliente. No llama a la API: usa `alRegistrar`.
// Con `usaSensor` la huella se toma del lector físico y no se pide el texto simulado.
function RegistrarHuella({ clientes, alRegistrar, usaSensor = false, clienteFijo = null, alTerminar, alCancelar }) {
  const [cliente, setCliente] = useState(clienteFijo ? String(clienteFijo.id) : "");
  const [identificador, setIdentificador] = useState("");
  const [errores, setErrores] = useState({ cliente: "", identificador: "" });
  const [errorGeneral, setErrorGeneral] = useState("");
  const [aviso, setAviso] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [capturaId, setCapturaId] = useState("");
  const [etapa, setEtapa] = useState("preparando");
  const [errorEtapa, setErrorEtapa] = useState("");

  useEffect(() => {
    if (!guardando || !usaSensor || !capturaId) return undefined;
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
  }, [guardando, usaSensor, capturaId]);

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

    const resultado = {
      cliente: validarClienteHuella(cliente, clientes),
      identificador: usaSensor ? "" : validarIdentificador(identificador),
    };
    setErrores(resultado);
    if (resultado.cliente || resultado.identificador) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      setAviso("");
      return;
    }

    const nuevaCapturaId = usaSensor ? crypto.randomUUID() : "";
    setCapturaId(nuevaCapturaId);
    setEtapa("preparando");
    setErrorEtapa("");
    setGuardando(true);
    limpiarMensajes();
    try {
      await alRegistrar({ cliente_id: Number(cliente), identificador, usaSensor, capturaId: nuevaCapturaId });
      const nombre = clientes.find((c) => c.id === Number(cliente))?.nombre ?? "el cliente";
      setAviso(`Huella registrada correctamente para ${nombre}.`);
      setCliente("");
      setIdentificador("");
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

      {usaSensor ? (
        <p>
          Al presionar "Registrar huella", coloca el dedo en el lector, retíralo y vuelve a colocar el mismo dedo.
          Tienes 15 segundos en cada lectura.
        </p>
      ) : (
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
      )}

      <button type="submit" disabled={guardando}>
        {guardando ? "Registrando..." : "Registrar huella"}
      </button>
      {alCancelar && <button type="button" onClick={alCancelar} disabled={guardando}>Volver a clientes</button>}

      {guardando && usaSensor && <p role="status" aria-live="polite">{errorEtapa || MENSAJES_LECTURA[etapa] || MENSAJES_LECTURA.preparando}</p>}
      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}
      {aviso && <p role="status">{aviso}</p>}
    </form>
  );
}

export default RegistrarHuella;
