import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch {
    return null;
  }
}

function App() {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  if (!usuario) {
    return <Login onLoginExitoso={setUsuario} />;
  }

  return (
    <div className="bienvenida">
      <h1>Bienvenido, {usuario.nombre}</h1>
      <p>Rol: {usuario.rol_id === 1 ? "Administrador" : "Empleado"}</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}

export default App;
