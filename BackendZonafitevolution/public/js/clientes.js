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

let temporizadorExito;

function crearContenedorExito() {
  const div = document.createElement('p');
  div.id = 'mensajeExito';
  div.style.color = '#27ae60';
  div.style.fontSize = '13px';
  div.style.display = 'none';
  document.getElementById('formCliente').before(div);
  return div;
}

function mostrarMensajeExito(texto) {
  const contenedor = document.getElementById('mensajeExito') || crearContenedorExito();
  contenedor.textContent = texto;
  contenedor.style.display = 'block';
  clearTimeout(temporizadorExito);
  temporizadorExito = setTimeout(() => { contenedor.style.display = 'none'; }, 3000);
}

async function cargarClientes() {
  const headers = await obtenerHeaders();
  const respuesta = await fetch(`${API_URL}/clientes`, { headers });

  if (respuesta.status === 401) {
    alert('Tu sesión ha expirado. Vuelve a iniciar sesión.');
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

  const cedula = document.getElementById('cedula').value.trim();

  if (!/^\d{6,15}$/.test(cedula)) {
    mensajeError.textContent = 'La cédula debe contener solo números (6 a 15 dígitos)';
    mensajeError.style.display = 'block';
    return;
  }

  const datos = {
    nombre: document.getElementById('nombre').value,
    cedula,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value
  };

  // Indicador de carga: evita envíos dobles mientras se espera la respuesta
  const boton = evento.target.querySelector('button[type="submit"]');
  boton.disabled = true;
  boton.textContent = 'Registrando...';

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(datos)
    });

    if (respuesta.status === 401) {
      alert('Tu sesión ha expirado. Vuelve a iniciar sesión.');
      cerrarSesion();
      return;
    }

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mensajeError.textContent = resultado.error;
      mensajeError.style.display = 'block';
      return;
    }

    document.getElementById('formCliente').reset();
    mostrarMensajeExito('Cliente registrado correctamente');
    cargarClientes();

  } catch (error) {
    mensajeError.textContent = 'No se pudo conectar con el servidor';
    mensajeError.style.display = 'block';
  } finally {
    boton.disabled = false;
    boton.textContent = 'Registrar cliente';
  }
});

if (usuario) {
  cargarClientes();
}
