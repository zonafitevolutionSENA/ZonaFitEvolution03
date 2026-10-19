import { useCallback, useEffect, useState } from "react";
import BarraLateral from "./components/BarraLateral";
import Encabezado from "./components/Encabezado";
import Acceso from "./pages/Acceso";
import Clientes from "./pages/Clientes";
import Finanzas from "./pages/Finanzas";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Membresias from "./pages/Membresias";
import Personal from "./pages/Personal";
import Planes from "./pages/Planes";
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
  "validar-acceso": "acceso",
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
    if (!SECCIONES.some((s) => s.id === destino)) return;
    if (!seccionPermitida(usuario.rol_id, destino)) return;
    setAccionInicial(null);
    setVista(destino);
  }

  if (!usuario) {
    return <Login onLoginExitoso={setUsuario} />;
  }

  // Pantalla de la sección activa; cualquier valor desconocido vuelve al Inicio
  function pantalla() {
    // Defensa extra: aunque la vista cambie por otro medio, el rol debe poder verla
    if (!seccionPermitida(usuario.rol_id, vista)) return <Inicio usuario={usuario} alNavegar={navegar} />;
    switch (vista) {
      case "clientes":
        return <Clientes iniciarEnRegistro={accionInicial === "registrar-cliente"} />;
      case "membresias":
        return <Membresias iniciarEnRenovar={accionInicial === "renovar-membresia"} />;
      case "planes":
        return <Planes usuario={usuario} />;
      case "acceso":
        return <Acceso />;
      case "historial":
        return <Historial />;
      case "finanzas":
        return <Finanzas usuario={usuario} />;
      case "personal":
        return <Personal usuario={usuario} />;
      default:
        return <Inicio usuario={usuario} alNavegar={navegar} />;
    }
  }

  return (
    <div className="app-shell">
      <BarraLateral
        rolId={usuario.rol_id}
        activa={vista}
        alNavegar={navegar}
        alCerrarSesion={cerrarSesion}
      />
      <div className="app-content">
        <Encabezado
          usuario={usuario}
          porVencer={porVencer}
          errorNotificaciones={errorNotificaciones}
          alReintentar={() => setRecargaNotificaciones((r) => r + 1)}
        />
        <main className={`app-main-content${vista === "inicio" ? " app-main-content-inicio" : ""}`}>
          {pantalla()}
        </main>
      </div>
    </div>
  );
}

export default App;
