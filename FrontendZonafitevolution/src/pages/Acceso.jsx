import { useEffect, useState } from "react";
import RegistrarHuella from "../components/RegistrarHuella";
import { obtenerInfoLector, registrarHuella } from "../services/biometriaService";
import { listarClientes } from "../services/clienteService";
import "../PantallasGestion.css";

function Acceso() {
  const [usaSensor, setUsaSensor] = useState(false);
  const [errorLector, setErrorLector] = useState("");
  const [clientes, setClientes] = useState([]);
  const [errorClientes, setErrorClientes] = useState("");
  const [cargando, setCargando] = useState(true);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let vigente = true;
    listarClientes()
      .then((lista) => {
        if (!vigente) return;
        setClientes(lista);
        setErrorClientes("");
      })
      .catch((err) => vigente && setErrorClientes(err.message))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [recarga]);

  // El backend indica si trabaja con el simulador o con el lector físico
  useEffect(() => {
    let vigente = true;
    obtenerInfoLector()
      .then((info) => vigente && setUsaSensor(info.usaSensor))
      .catch((err) => vigente && setErrorLector(err.message));
    return () => {
      vigente = false;
    };
  }, []);

  function reintentar() {
    if (cargando) return;
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  return (
    <section className="gestion-page gestion-acceso">
      <h1>Control de acceso</h1>

      <p>{usaSensor ? "Lector de huellas conectado." : "Modo simulador: la huella se escribe como texto."}</p>
      {errorLector && <p className="mensaje-error" role="alert">{errorLector}</p>}

      {cargando && <p>Cargando clientes...</p>}
      {errorClientes && (
        <>
          <p className="mensaje-error" role="alert">{errorClientes}</p>
          <button type="button" onClick={reintentar} disabled={cargando}>Reintentar</button>
        </>
      )}
      {!cargando && !errorClientes && <RegistrarHuella clientes={clientes} alRegistrar={registrarHuella} usaSensor={usaSensor} />}
    </section>
  );
}

export default Acceso;
