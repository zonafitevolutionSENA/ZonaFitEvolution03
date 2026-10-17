// Marcador de las secciones que se construirán en los siguientes avances
function SeccionPendiente({ titulo, alVolver }) {
  return (
    <section>
      <h1>{titulo}</h1>
      <p>Esta sección se construirá en un próximo avance.</p>
      <button type="button" onClick={alVolver}>Volver al inicio</button>
    </section>
  );
}

export default SeccionPendiente;
