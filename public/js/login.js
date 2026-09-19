const API_URL = 'http://localhost:3000/api';

document.getElementById('formLogin').addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const mensajeError = document.getElementById('mensajeError');

  mensajeError.style.display = 'none';

  try {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mensajeError.textContent = datos.error || 'Credenciales incorrectas';
      mensajeError.style.display = 'block';
      return;
    }

    // Guardar token y datos del usuario para las siguientes pantallas
    localStorage.setItem('token', datos.token);
    localStorage.setItem('usuario', JSON.stringify(datos.usuario));

    window.location.href = 'panel.html';

  } catch (error) {
    mensajeError.textContent = 'No se pudo conectar con el servidor';
    mensajeError.style.display = 'block';
  }
});
