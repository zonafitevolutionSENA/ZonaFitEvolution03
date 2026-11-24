import { useCallback, useEffect, useState } from "react";
import BarraLateral from "./components/BarraLateral";
import Encabezado from "./components/Encabezado";
import Clientes from "./pages/Clientes";
import Finanzas from "./pages/Finanzas";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Membresias from "./pages/Membresias";
import Personal from "./pages/Personal";
import Planes from "./pages/Planes";
import RecuperarContrasena from "./pages/RecuperarContrasena";
import { obtenerPorVencer } from "./services/dashboardService";
import { EVENTO_SESION_EXPIRADA, limpiarTokenSesion, obtenerUsuarioGuardado } from "./services/api";
import { ROL_ADMIN, SECCIONES, seccionPermitida } from "./utils/permisos";
import "./App.css";

function limpiarSesion() {
  limpiarTokenSesion();
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

// Acciones rápidas del Inicio: abren una sección con su formulario ya abierto
const ACCIONES_RAPIDAS = {
  "registrar-cliente": "clientes",
  "renovar-membresia": "membresias",
  "registrar-huella": "clientes",
};

// Pantallas recordadas para el botón de regreso (las más antiguas se descartan)
const MAXIMO_HISTORIAL = 20;

function App() {
  const [usuario, setUsuario] = useState(obtenerUsuarioGuardado);
  const [mensajeSesion, setMensajeSesion] = useState("");
  const [recuperandoContrasena, setRecuperandoContrasena] = useState(false);
  const [avisoLogin, setAvisoLogin] = useState("");
  const [vista, setVista] = useState("inicio");
  // Pantallas visitadas antes de la actual, para el botón de regreso del encabezado
  const [historial, setHistorial] = useState([]);
  const [accionInicial, setAccionInicial] = useState(null);
  const [porVencer, setPorVencer] = useState(null);
  const [errorNotificaciones, setErrorNotificaciones] = useState("");
  const [recargaNotificaciones, setRecargaNotificaciones] = useState(0);

  useEffect(() => {
    function expirarSesion(evento) {
      const mostrarAviso = Boolean(usuario) || evento.detail?.expirada;
      limpiarSesion();
      setUsuario(null);
      setVista("inicio");
      setHistorial([]);
      setAccionInicial(null);
      setPorVencer(null);
      setMensajeSesion(mostrarAviso ? "Tu sesión expiró. Inicia sesión nuevamente." : "");
    }

    window.addEventListener(EVENTO_SESION_EXPIRADA, expirarSesion);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, expirarSesion);
  }, [usuario]);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, []);

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
    setHistorial([]);
    setAccionInicial(null);
    setPorVencer(null);
    setMensajeSesion("");
  }, []);

  // Abre otra sección y recuerda la actual para poder regresar (no se repite si ya está abierta)
  function cambiarVista(destino) {
    if (destino !== vista) {
      setHistorial((anteriores) => [...anteriores, vista].slice(-MAXIMO_HISTORIAL));
    }
    setVista(destino);
  }

  // Una vista solo se abre si existe y el rol puede verla (ej. "Personal" es solo del administrador)
  function navegar(destino) {
    if (Object.hasOwn(ACCIONES_RAPIDAS, destino)) {
      const destinoSeccion = ACCIONES_RAPIDAS[destino];
      if (!seccionPermitida(usuario.rol_id, destinoSeccion)) return;
      setAccionInicial(destino);
      cambiarVista(destinoSeccion);
      return;
    }
    if (!SECCIONES.some((s) => s.id === destino)) return;
    if (!seccionPermitida(usuario.rol_id, destino)) return;
    setAccionInicial(null);
    cambiarVista(destino);
  }

  // Vuelve a la pantalla anterior. La sección se abre en su vista normal (sin reabrir formularios)
  function regresar() {
    if (historial.length === 0) return;
    const anterior = historial[historial.length - 1];
    setHistorial(historial.slice(0, -1));
    setAccionInicial(null);
    setVista(seccionPermitida(usuario.rol_id, anterior) ? anterior : "inicio");
  }

  if (!usuario && recuperandoContrasena) {
    return (
      <RecuperarContrasena
        alVolver={() => setRecuperandoContrasena(false)}
        alTerminar={(mensaje) => {
          setMensajeSesion("");
          setAvisoLogin(mensaje);
          setRecuperandoContrasena(false);
        }}
      />
    );
  }

  if (!usuario) {
    return (
      <Login
        onLoginExitoso={(usuarioActual) => {
          setMensajeSesion("");
          setAvisoLogin("");
          setUsuario(usuarioActual);
        }}
        errorInicial={mensajeSesion}
        avisoInicial={avisoLogin}
        alOlvidarContrasena={() => {
          setAvisoLogin("");
          setRecuperandoContrasena(true);
        }}
      />
    );
  }

  // Pantalla de la sección activa; cualquier valor desconocido vuelve al Inicio
  function pantalla() {
    // Defensa extra: aunque la vista cambie por otro medio, el rol debe poder verla
    if (!seccionPermitida(usuario.rol_id, vista)) return <Inicio usuario={usuario} alNavegar={navegar} />;
    switch (vista) {
      case "clientes":
        return <Clientes iniciarEnRegistro={accionInicial === "registrar-cliente"} puedeReactivar={usuario.rol_id === ROL_ADMIN} />;
      case "membresias":
        return <Membresias iniciarEnRenovar={accionInicial === "renovar-membresia"} />;
      case "planes":
        return <Planes usuario={usuario} />;
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
          puedeRegresar={historial.length > 0}
          alRegresar={regresar}
        />
        <main className={`app-main-content${vista === "inicio" ? " app-main-content-inicio" : ""}`}>
          {pantalla()}
        </main>
      </div>
    </div>
  );
}

export default App;
