const API_URL = 'http://localhost:3000/api';
const usuario = verificarSesion();

async function obtenerHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Los datos del cliente los escribe una persona: se escapan antes de insertarlos
// como HTML para que un nombre como "<img onerror=...>" no ejecute código.
function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = String(texto ?? '');
  return div.innerHTML;
}

async function cargarClientes() {
  const headers = await obtenerHeaders();
  const respuesta = await fetch(`${API_URL}/clientes`, { headers });

  if (respuesta.status === 401) {
    cerrarSesion();
    return;
  }

  if (!respuesta.ok) {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = 'No se pudo cargar el listado de clientes';
    mensajeError.style.display = 'block';
    return;
  }

  const clientes = await respuesta.json();
  renderizarClientes(clientes);
}

function renderizarClientes(clientes) {
  const contenedor = document.getElementById('listaClientes');

  if (clientes.length === 0) {
    contenedor.innerHTML = '<p>No hay clientes registrados todavía.</p>';
    return;
  }

  const filas = clientes.map(c => `
    <tr>
      <td>${escaparHtml(c.nombre)}</td>
      <td>${escaparHtml(c.cedula)}</td>
      <td>${escaparHtml(c.correo || '-')}</td>
      <td>${escaparHtml(c.telefono || '-')}</td>
    </tr>
  `).join('');

  contenedor.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <h3>Clientes registrados</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 2px solid #eee;">
            <th style="padding: 8px;">Nombre</th>
            <th style="padding: 8px;">Cédula</th>
            <th style="padding: 8px;">Correo</th>
            <th style="padding: 8px;">Teléfono</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
  `;
}

document.getElementById('formCliente').addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const mensajeError = document.getElementById('mensajeError');
  mensajeError.style.display = 'none';

  const datos = {
    nombre: document.getElementById('nombre').value,
    cedula: document.getElementById('cedula').value,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value
  };

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mensajeError.textContent = resultado.error;
      mensajeError.style.display = 'block';
      return;
    }

    document.getElementById('formCliente').reset();
    cargarClientes();

  } catch (error) {
    mensajeError.textContent = 'No se pudo conectar con el servidor';
    mensajeError.style.display = 'block';
  }
});

if (usuario) {
  cargarClientes();
}
