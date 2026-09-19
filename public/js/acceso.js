const API_URL = 'http://localhost:3000/api';
const usuario = verificarSesion();

async function obtenerHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = String(texto ?? '');
  return div.innerHTML;
}

function sesionExpirada() {
  alert('Tu sesión ha expirado. Vuelve a iniciar sesión.');
  cerrarSesion();
}

function mostrarResultado(clase, titulo, detalle) {
  const detalleHtml = detalle ? `<br><span style="font-size:14px;">${escaparHtml(detalle)}</span>` : '';
  document.getElementById('resultadoAcceso').innerHTML =
    `<div class="resultado-acceso ${clase}">${titulo}${detalleHtml}</div>`;
}

async function cargarHistorial() {
  const contenedor = document.getElementById('historialAcceso');

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/acceso-fisico/historial`, { headers });

    if (respuesta.status === 401) {
      sesionExpirada();
      return;
    }

    if (!respuesta.ok) {
      contenedor.innerHTML = '<p>No se pudo cargar el historial.</p>';
      return;
    }

    const registros = await respuesta.json();

    if (registros.length === 0) {
      contenedor.innerHTML = '<p>Sin registros todavía.</p>';
      return;
    }

    contenedor.innerHTML = registros.map(r => `
      <div style="padding: 8px; border-bottom: 1px solid #eee; font-size: 13px;">
        <strong>${escaparHtml(r.nombre_cliente || 'Desconocido')}</strong> —
        <span style="color: ${r.resultado === 'permitido' ? '#27ae60' : '#c0392b'}">${escaparHtml(r.resultado)}</span>
        (${escaparHtml(r.motivo)}) — ${escaparHtml(new Date(r.fecha_hora).toLocaleString())}
      </div>
    `).join('');

  } catch (error) {
    contenedor.innerHTML = '<p>No se pudo conectar con el servidor.</p>';
  }
}

async function validarAcceso() {
  const campo = document.getElementById('identificadorSimulado');
  const boton = document.getElementById('btnValidar');
  const identificadorSimulado = campo.value.trim();

  if (!identificadorSimulado) return;

  boton.disabled = true;
  boton.textContent = 'Validando...';

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/acceso-fisico/validar`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ identificadorSimulado })
    });

    if (respuesta.status === 401) {
      sesionExpirada();
      return;
    }

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarResultado('denegado', 'ACCESO DENEGADO', datos.error);
    } else if (datos.permitido) {
      mostrarResultado('permitido', '✔ ACCESO PERMITIDO', datos.cliente.nombre);
    } else {
      mostrarResultado('denegado', '✖ ACCESO DENEGADO', `${datos.cliente.nombre} — ${datos.motivo}`);
    }

    campo.value = '';
    cargarHistorial();

  } catch (error) {
    mostrarResultado('denegado', 'Error de conexión', '');
  } finally {
    boton.disabled = false;
    boton.textContent = 'Validar acceso';
    campo.focus();
  }
}

document.getElementById('btnValidar').addEventListener('click', validarAcceso);

document.getElementById('identificadorSimulado').addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    validarAcceso();
  }
});

cargarHistorial();
