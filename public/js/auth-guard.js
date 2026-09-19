function verificarSesion() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return null;
  }
  return JSON.parse(localStorage.getItem('usuario'));
}

function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}
