import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function CampoContrasena(props) {
  const [visible, setVisible] = useState(false);
  const etiqueta = visible ? "Ocultar contraseña" : "Mostrar contraseña";

  return (
    <div className="login-contrasena">
      <input {...props} className="login-input" type={visible ? "text" : "password"} />
      <button
        className="login-contrasena-boton"
        type="button"
        onClick={() => setVisible((actual) => !actual)}
        aria-label={etiqueta}
        aria-pressed={visible}
        title={etiqueta}
      >
        {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}

export default CampoContrasena;