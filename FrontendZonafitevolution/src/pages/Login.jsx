import { useState, useEffect } from "react";
import { iniciarSesion } from "../services/authService";
import "../Login.css";

function Login({ onLoginExitoso, errorInicial = "" }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(errorInicial);
  const [cargando, setCargando] = useState(false);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(0);
  const [ahora, setAhora] = useState(Date.now());

  // Reloj que solo corre mientras hay un bloqueo activo
  useEffect(() => {
    if (bloqueadoHasta <= Date.now()) return;
    const id = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(id);
  }, [bloqueadoHasta]);

  const segundosRestantes = Math.max(0, Math.ceil((bloqueadoHasta - ahora) / 1000));
  const bloqueado = segundosRestantes > 0;

  async function manejarEnvio(e) {
    e.preventDefault();
    if (bloqueado) return;
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
      const { usuario } = await iniciarSesion(
        correoLimpio,
        contrasenaLimpias,
      );

      onLoginExitoso(usuario);
    } catch (err) {
      // 3. Manejo de errores seguro: Usamos 'err' para depuración interna sin mostrar detalles sensibles
      console.error("Error al iniciar sesión:", err);

      if (err.status === 429) {
        setBloqueadoHasta(Date.now() + 15 * 60 * 1000);
        setAhora(Date.now());
        setError("Demasiados intentos. Intenta de nuevo más tarde.");
      } else {
        setError(err.message);
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-fondo">
      <form className="login-caja" onSubmit={manejarEnvio} noValidate>
        <h1 className="login-title">Zona Fit Evolution</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <label className="login-label" htmlFor="correo">Correo</label>
        <input
          className="login-input"
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          maxLength={100} // Previene ataques de denegación de servicio por entradas masivas
        />

        <label className="login-label" htmlFor="contrasena">Contraseña</label>
        <input
          className="login-input"
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          maxLength={128} // Límite estándar para evitar hashes muy largos o DoS
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button className="login-submit" type="submit" disabled={cargando || bloqueado}>
          {cargando
            ? "Ingresando..."
            : bloqueado
              ? `Intenta en ${Math.floor(segundosRestantes / 60)}:${String(segundosRestantes % 60).padStart(2, "0")}`
              : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;