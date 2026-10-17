import { useEffect, useState } from "react";
import RegistrarHuella from "../components/RegistrarHuella";
import ValidarAcceso from "../components/ValidarAcceso";
import { validarAcceso } from "../services/accesoService";
import { registrarHuella } from "../services/biometriaService";
import { listarClientes } from "../services/clienteService";

// Control de acceso: validar el acceso de un cliente con huella simulada y registrar su huella
function Acceso() {
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

  function reintentar() {
    if (cargando) return;
    setCargando(true);
    setRecarga((r) => r + 1);
  }

  return (
    <section>
      <h1>Control de acceso</h1>

      <ValidarAcceso alValidar={validarAcceso} />

      {cargando && <p>Cargando clientes...</p>}
      {errorClientes && (
        <>
          <p className="mensaje-error" role="alert">{errorClientes}</p>
          <button type="button" onClick={reintentar} disabled={cargando}>Reintentar</button>
        </>
      )}
      {!cargando && !errorClientes && <RegistrarHuella clientes={clientes} alRegistrar={registrarHuella} />}
    </section>
  );
}

export default Acceso;
