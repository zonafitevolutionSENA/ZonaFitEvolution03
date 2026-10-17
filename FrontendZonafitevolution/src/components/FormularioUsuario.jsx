import { useState } from "react";
import { ROL_ADMIN, ROL_EMPLEADO, etiquetaRol } from "../utils/permisos";
import { LIMITES_USUARIO, hayErroresUsuario, validarUsuario } from "../utils/validacionesUsuario";
import Campo from "./Campo";

const SIN_ERRORES = { nombre: "", correo: "", contrasena: "", confirmacion: "", rol: "" };
const VALORES_INICIALES = { nombre: "", correo: "", contrasena: "", confirmacion: "", rol: "" };

// Formulario para crear un usuario del personal. No llama a la API: entrega los datos con `alGuardar`.
function FormularioUsuario({ correosExistentes = [], alGuardar, alCancelar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  function cambiar(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
    if (errorGeneral) setErrorGeneral("");
  }

  function validarAlSalir(campo) {
    setErrores((e) => ({ ...e, [campo]: validarUsuario(valores, { correosExistentes })[campo] }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    // Evita envíos duplicados por doble clic o Enter repetido
    if (guardando) return;

    const resultado = validarUsuario(valores, { correosExistentes });
    setErrores(resultado);
    if (hayErroresUsuario(resultado)) {
      setErrorGeneral("Corrige los campos marcados antes de guardar.");
      return;
    }

    setGuardando(true);
    setErrorGeneral("");
    try {
      await alGuardar({
        nombre: valores.nombre.normalize("NFC").replace(/\p{Cc}/gu, "").replace(/\s+/g, " ").trim(),
        correo: valores.correo.trim().toLowerCase(),
        // La contraseña se envía tal cual, sin recortar
        contrasena: valores.contrasena,
        rol_id: Number(valores.rol),
      });
    } catch (err) {
      setErrorGeneral(err.message);
      // Por seguridad, ante un error se vuelven a pedir las contraseñas
      setValores((v) => ({ ...v, contrasena: "", confirmacion: "" }));
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Crear usuario">
      <h3>Crear usuario</h3>

      <Campo
        id="nombre-usuario"
        etiqueta="Nombre completo *"
        type="text"
        autoComplete="off"
        maxLength={100}
        value={valores.nombre}
        onChange={(e) => cambiar("nombre", e.target.value)}
        onBlur={() => validarAlSalir("nombre")}
        error={errores.nombre}
        disabled={guardando}
      />

      <Campo
        id="correo-usuario"
        etiqueta="Correo *"
        type="email"
        autoComplete="off"
        maxLength={LIMITES_USUARIO.correoMax}
        value={valores.correo}
        onChange={(e) => cambiar("correo", e.target.value)}
        onBlur={() => validarAlSalir("correo")}
        error={errores.correo}
        disabled={guardando}
      />

      <Campo
        id="contrasena-usuario"
        etiqueta="Contraseña *"
        type="password"
        autoComplete="new-password"
        maxLength={LIMITES_USUARIO.contrasenaMax}
        value={valores.contrasena}
        onChange={(e) => cambiar("contrasena", e.target.value)}
        onBlur={() => validarAlSalir("contrasena")}
        error={errores.contrasena}
        ayuda={`Mínimo ${LIMITES_USUARIO.contrasenaMin} caracteres, con letras y números, sin espacios.`}
        disabled={guardando}
      />

      <Campo
        id="confirmacion-usuario"
        etiqueta="Confirmar contraseña *"
        type="password"
        autoComplete="new-password"
        maxLength={LIMITES_USUARIO.contrasenaMax}
        value={valores.confirmacion}
        onChange={(e) => cambiar("confirmacion", e.target.value)}
        onBlur={() => validarAlSalir("confirmacion")}
        error={errores.confirmacion}
        disabled={guardando}
      />

      <div>
        <label htmlFor="rol-usuario">Rol *</label>
        <select
          id="rol-usuario"
          value={valores.rol}
          onChange={(e) => cambiar("rol", e.target.value)}
          onBlur={() => validarAlSalir("rol")}
          aria-invalid={errores.rol ? "true" : undefined}
          disabled={guardando}
        >
          <option value="">Selecciona un rol</option>
          <option value={ROL_EMPLEADO}>{etiquetaRol(ROL_EMPLEADO)}</option>
          <option value={ROL_ADMIN}>{etiquetaRol(ROL_ADMIN)}</option>
        </select>
        {errores.rol && <p className="mensaje-error" role="alert">{errores.rol}</p>}
      </div>

      {errorGeneral && <p className="mensaje-error" role="alert">{errorGeneral}</p>}

      <button type="submit" disabled={guardando}>{guardando ? "Guardando..." : "Crear usuario"}</button>
      <button type="button" onClick={alCancelar} disabled={guardando}>Cancelar</button>
    </form>
  );
}

export default FormularioUsuario;
