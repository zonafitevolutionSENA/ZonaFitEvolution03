import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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

function App() {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);

  function cerrarSesion() {
    if (!window.confirm("¿Seguro que deseas cerrar sesión?")) return;
    limpiarSesion();
    setUsuario(null);
  }

  if (!usuario) {
    return <Login onLoginExitoso={setUsuario} />;
  }

  return (
    <main>
      <header>
        <h1>Zona Fit Evolution</h1>
        <p>
          {usuario.nombre} · {usuario.rol_id === 1 ? "Administrador" : "Empleado"}
        </p>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>
      <Dashboard />
    </main>
  );
}

export default App;
