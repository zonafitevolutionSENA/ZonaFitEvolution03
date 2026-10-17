// Campo de formulario con etiqueta y mensaje de error accesible
function Campo({ id, etiqueta, error, ayuda, ...propsInput }) {
  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;

  return (
    <div>
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? idError : ayuda ? idAyuda : undefined}
        {...propsInput}
      />
      {error ? (
        <p id={idError} className="mensaje-error" role="alert">{error}</p>
      ) : (
        ayuda && <small id={idAyuda}>{ayuda}</small>
      )}
    </div>
  );
}

export default Campo;
