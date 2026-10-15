import { useState } from "react";
import { iniciarSesion } from "../services/authService";

function Login({ onLoginExitoso }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    // 1. Sanitización: Eliminar espacios en blanco sobrantes
    const correoLimpio = correo.trim();
    const contrasenaLimpias = contrasena.trim();

    // 2. Validación estricta contra campos vacíos o formados solo por espacios
    if (!correoLimpio || !contrasenaLimpias) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Validación básica de formato de correo en el cliente
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correoLimpio)) {
      setError("El formato del correo electrónico no es válido.");
      return;
    }

    setCargando(true);

    try {
      const { token, usuario } = await iniciarSesion(
        correoLimpio,
        contrasenaLimpias,
      );

      // Nota de seguridad: 'localStorage' es vulnerable a ataques XSS.
      // Si es posible, se recomienda almacenar los tokens en cookies seguras (HttpOnly, Secure, SameSite).
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      onLoginExitoso(usuario);
    } catch (err) {
      // 3. Manejo de errores seguro: Usamos 'err' para depuración interna sin mostrar detalles sensibles
      console.error("Error al iniciar sesión:", err);

      setError(
        "Credenciales incorrectas o error en el servidor. Inténtalo de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-fondo">
      <form className="login-caja" onSubmit={manejarEnvio}>
        <h1>Zona Fit Evolution</h1>
        <p>Inicia sesión para continuar</p>

        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          maxLength={100} // Previene ataques de denegación de servicio por entradas masivas
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          maxLength={128} // Límite estándar para evitar hashes muy largos o DoS
          required
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;
