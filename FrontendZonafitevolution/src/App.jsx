import { useCallback, useEffect, useState } from "react";
import BarraLateral from "./components/BarraLateral";
import Encabezado from "./components/Encabezado";
import Clientes from "./pages/Clientes";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Membresias from "./pages/Membresias";
import Planes from "./pages/Planes";
import SeccionPendiente from "./pages/SeccionPendiente";
import { obtenerPorVencer } from "./services/dashboardService";
import { SECCIONES, seccionPermitida } from "./utils/permisos";
import "./App.css";

function limpiarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

// Solo se acepta una sesión completa y con la forma esperada; cualquier dato alterado o incompleto se descarta
function leerUsuarioGuardado() {
  try {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const valido =
      token &&
      usuario &&
      typeof usuario === "object" &&
      typeof usuario.nombre === "string" &&
      usuario.nombre.trim() !== "" &&
      (usuario.rol_id === 1 || usuario.rol_id === 2);
    if (valido) return usuario;
  } catch {
    // JSON dañado: se trata como sin sesión
  }
  limpiarSesion();
  return null;
}

// Acciones rápidas del Inicio: abren una sección con su formulario ya abierto
const ACCIONES_RAPIDAS = {
  "registrar-cliente": "clientes",
  "renovar-membresia": "membresias",
};

const TITULOS_PENDIENTES = {
  "validar-acceso": "Validar acceso",
};

function App() {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);
  const [vista, setVista] = useState("inicio");
  const [accionInicial, setAccionInicial] = useState(null);
  const [porVencer, setPorVencer] = useState(null);
  const [errorNotificaciones, setErrorNotificaciones] = useState("");
  const [recargaNotificaciones, setRecargaNotificaciones] = useState(0);

  // Notificaciones (campana): se cargan una vez iniciada la sesión
  useEffect(() => {
    if (!usuario) return undefined;
    let vigente = true;
    obtenerPorVencer()
      .then((lista) => {
        if (!vigente) return;
        setPorVencer(lista);
        setErrorNotificaciones("");
      })
      .catch((err) => vigente && setErrorNotificaciones(err.message));
    return () => {
      vigente = false;
    };
  }, [usuario, recargaNotificaciones]);

  const cerrarSesion = useCallback(() => {
    if (!window.confirm("¿Seguro que deseas cerrar sesión?")) return;
    limpiarSesion();
    setUsuario(null);
    setVista("inicio");
    setAccionInicial(null);
    setPorVencer(null);
  }, []);

  // Una vista solo se abre si existe y el rol puede verla (ej. "Personal" es solo del administrador)
  function navegar(destino) {
    if (Object.hasOwn(ACCIONES_RAPIDAS, destino)) {
      const destinoSeccion = ACCIONES_RAPIDAS[destino];
      if (!seccionPermitida(usuario.rol_id, destinoSeccion)) return;
      setAccionInicial(destino);
      setVista(destinoSeccion);
      return;
    }
    const esSeccion = SECCIONES.some((s) => s.id === destino);
    const esAccion = Object.hasOwn(TITULOS_PENDIENTES, destino);
    if (!esSeccion && !esAccion) return;
    if (esSeccion && !seccionPermitida(usuario.rol_id, destino)) return;
    setAccionInicial(null);
    setVista(destino);
  }

  if (!usuario) {
    return <Login onLoginExitoso={setUsuario} />;
  }

  const seccion = SECCIONES.find((s) => s.id === vista);
  const titulo = seccion ? seccion.etiqueta : TITULOS_PENDIENTES[vista];

  return (
    <div>
      <BarraLateral
        rolId={usuario.rol_id}
        activa={seccion ? vista : "inicio"}
        alNavegar={navegar}
        alCerrarSesion={cerrarSesion}
      />
      <div>
        <Encabezado
          usuario={usuario}
          porVencer={porVencer}
          errorNotificaciones={errorNotificaciones}
          alReintentar={() => setRecargaNotificaciones((r) => r + 1)}
        />
        <main>
          {vista === "inicio" ? (
            <Inicio usuario={usuario} alNavegar={navegar} />
          ) : vista === "clientes" ? (
            <Clientes iniciarEnRegistro={accionInicial === "registrar-cliente"} />
          ) : vista === "membresias" ? (
            <Membresias iniciarEnRenovar={accionInicial === "renovar-membresia"} />
          ) : vista === "planes" ? (
            <Planes usuario={usuario} />
          ) : (
            <SeccionPendiente titulo={titulo} alVolver={() => setVista("inicio")} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
