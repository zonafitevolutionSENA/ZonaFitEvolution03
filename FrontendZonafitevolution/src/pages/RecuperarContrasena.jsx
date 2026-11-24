import { useEffect, useState } from "react";
import {
  restablecerContrasena,
  solicitarCodigoRecuperacion,
  verificarCodigoRecuperacion,
} from "../services/authService";
import { validarConfirmacion, validarContrasena } from "../utils/validacionesUsuario";
import "../Login.css";

const SEGUNDOS_REENVIO = 60;
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Restablecer la contraseña en tres pasos: correo → código de verificación → nueva contraseña
function RecuperarContrasena({ alVolver, alTerminar }) {
  const [paso, setPaso] = useState("correo");
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tokenRestablecer, setTokenRestablecer] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [cargando, setCargando] = useState(false);
  const [esperaReenvio, setEsperaReenvio] = useState(0);

  useEffect(() => {
    if (esperaReenvio <= 0) return undefined;
    const temporizador = setTimeout(() => setEsperaReenvio((segundos) => segundos - 1), 1000);
    return () => clearTimeout(temporizador);
  }, [esperaReenvio]);

  async function ejecutar(accion) {
    setError("");
    setCargando(true);
    try {
      await accion();
    } catch (err) {
      setError(err.message || "No se pudo completar la solicitud. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  function enviarCodigo() {
    const correoLimpio = correo.trim();
    if (!REGEX_CORREO.test(correoLimpio)) {
      setError("Escribe un correo válido.");
      return;
    }
    ejecutar(async () => {
      const { mensaje } = await solicitarCodigoRecuperacion(correoLimpio);
      setAviso(mensaje);
      setCodigo("");
      setPaso("codigo");
      setEsperaReenvio(SEGUNDOS_REENVIO);
    });
  }

  function manejarCorreo(e) {
    e.preventDefault();
    enviarCodigo();
  }

  function manejarCodigo(e) {
    e.preventDefault();
    if (!/^\d{6}$/.test(codigo)) {
      setError("El código tiene 6 dígitos.");
      return;
    }
    ejecutar(async () => {
      const respuesta = await verificarCodigoRecuperacion(correo.trim(), codigo);
      setTokenRestablecer(respuesta.tokenRestablecer);
      setAviso("");
      setPaso("contrasena");
    });
  }

  function manejarContrasena(e) {
    e.preventDefault();
    const errorValidacion = validarContrasena(contrasena) || validarConfirmacion(contrasena, confirmacion);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    ejecutar(async () => {
      const { mensaje } = await restablecerContrasena(tokenRestablecer, contrasena);
      alTerminar(mensaje);
    });
  }

  return (
    <main className="login-fondo">
      {paso === "correo" && (
        <form className="login-caja" onSubmit={manejarCorreo} noValidate>
          <h1 className="login-title">Recuperar contraseña</h1>
          <p className="login-subtitle">Escribe el correo de tu cuenta y te enviaremos un código de verificación.</p>

          <label className="login-label" htmlFor="recuperar-correo">Correo</label>
          <input
            className="login-input"
            id="recuperar-correo"
            type="email"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            maxLength={100}
            autoFocus
          />

          {error && <p className="mensaje-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar código"}
          </button>
          <button className="login-enlace" type="button" onClick={alVolver}>
            Volver al inicio de sesión
          </button>
        </form>
      )}

      {paso === "codigo" && (
        <form className="login-caja" onSubmit={manejarCodigo} noValidate>
          <h1 className="login-title">Verifica tu identidad</h1>
          <p className="login-subtitle">{aviso}</p>

          <label className="login-label" htmlFor="recuperar-codigo">Código de 6 dígitos</label>
          <input
            className="login-input login-codigo"
            id="recuperar-codigo"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))}
            autoFocus
          />
          <p className="login-ayuda">El código vence en 10 minutos.</p>

          {error && <p className="mensaje-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={cargando}>
            {cargando ? "Verificando..." : "Verificar código"}
          </button>
          <button className="login-enlace" type="button" onClick={enviarCodigo} disabled={cargando || esperaReenvio > 0}>
            {esperaReenvio > 0 ? `Reenviar código en ${esperaReenvio} s` : "Reenviar código"}
          </button>
          <button className="login-enlace" type="button" onClick={() => { setError(""); setPaso("correo"); }}>
            Usar otro correo
          </button>
        </form>
      )}

      {paso === "contrasena" && (
        <form className="login-caja" onSubmit={manejarContrasena} noValidate>
          <h1 className="login-title">Nueva contraseña</h1>
          <p className="login-subtitle">Al guardarla se cerrarán todas tus sesiones abiertas.</p>

          <label className="login-label" htmlFor="recuperar-contrasena">Nueva contraseña</label>
          <input
            className="login-input"
            id="recuperar-contrasena"
            type="password"
            autoComplete="new-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            maxLength={72}
            autoFocus
          />
          <p className="login-ayuda">Mínimo 8 caracteres, con letras y números y sin espacios.</p>

          <label className="login-label" htmlFor="recuperar-confirmacion">Confirmar contraseña</label>
          <input
            className="login-input"
            id="recuperar-confirmacion"
            type="password"
            autoComplete="new-password"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            maxLength={72}
          />

          {error && <p className="mensaje-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar contraseña"}
          </button>
          <button className="login-enlace" type="button" onClick={alVolver}>
            Cancelar
          </button>
        </form>
      )}
    </main>
  );
}

export default RecuperarContrasena;
