const API_URL = 'http://localhost:3000/api';
const usuario = verificarSesion();

// Días restantes a partir de los cuales se avisa que la membresía está próxima a vencer
const DIAS_PROXIMA_A_VENCER = 7;

async function obtenerHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

let clienteEncontrado = null;

// Los nombres de plan los escribe una persona: se escapan antes de insertarlos como HTML
function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = String(texto ?? '');
  return div.innerHTML;
}

function sesionExpirada() {
  alert('Tu sesión ha expirado. Vuelve a iniciar sesión.');
  cerrarSesion();
}

// 'AAAA-MM-DD' (como llega de la API) → 'DD/MM/AAAA'
function formatearFecha(valor) {
  if (!valor) return '';
  const [anio, mes, dia] = String(valor).slice(0, 10).split('-');
  return `${dia}/${mes}/${anio}`;
}

// Días entre hoy (fecha local) y una fecha 'AAAA-MM-DD'. Negativo si ya pasó.
function diasHasta(fechaTexto) {
  const [anio, mes, dia] = String(fechaTexto).slice(0, 10).split('-').map(Number);
  const hoy = new Date();
  const inicioHoy = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.round((Date.UTC(anio, mes - 1, dia) - inicioHoy) / 86400000);
}

// El estado guardado puede decir "activa" aunque la fecha de fin ya haya pasado
function describirMembresia(datos) {
  if (!datos.estado) {
    return { estado: 'Sin membresías previas', color: '#888', vigente: false };
  }

  if (datos.estado === 'activa') {
    const dias = diasHasta(datos.fecha_fin);
    if (dias < 0) {
      return { estado: 'Estado actual: Vencida', color: '#c0392b', vigente: false };
    }
    if (dias <= DIAS_PROXIMA_A_VENCER) {
      const cuando = dias === 0 ? 'vence hoy' : `faltan ${dias} día(s)`;
      return { estado: `Estado actual: Activa — próxima a vencer (${cuando})`, color: '#e67e22', vigente: true };
    }
    return { estado: 'Estado actual: Activa', color: '#27ae60', vigente: true };
  }

  return { estado: `Estado actual: ${datos.estado}`, color: '#c0392b', vigente: false };
}

async function cargarPlanes() {
  const headers = await obtenerHeaders();
  const respuesta = await fetch(`${API_URL}/planes?activos=true`, { headers });

  if (respuesta.status === 401) {
    sesionExpirada();
    return false;
  }
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los planes');
  }

  const planes = await respuesta.json();
  const select = document.getElementById('selectPlan');

  if (planes.length === 0) {
    select.innerHTML = '<option value="">No hay planes disponibles</option>';
    document.getElementById('btnRenovar').disabled = true;
    return true;
  }

  select.innerHTML = planes.map(p =>
    `<option value="${p.id}">${escaparHtml(p.nombre)} — $${Number(p.precio).toLocaleString('es-CO')} (${p.duracion_dias} días)</option>`
  ).join('');
  document.getElementById('btnRenovar').disabled = false;
  return true;
}

async function buscarCliente() {
  const cedula = document.getElementById('cedulaBusqueda').value.trim();
  const mensajeBusqueda = document.getElementById('mensajeBusqueda');
  const infoCliente = document.getElementById('infoCliente');

  mensajeBusqueda.style.display = 'none';
  infoCliente.style.display = 'none';
  document.getElementById('mensajeExitoRenovacion').style.display = 'none';
  clienteEncontrado = null;

  if (!cedula) {
    mensajeBusqueda.textContent = 'Ingresa una cédula para buscar';
    mensajeBusqueda.style.display = 'block';
    return;
  }

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/membresias/buscar/${encodeURIComponent(cedula)}`, { headers });

    if (respuesta.status === 401) {
      sesionExpirada();
      return;
    }

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mensajeBusqueda.textContent = datos.error;
      mensajeBusqueda.style.display = 'block';
      return;
    }

    const planesCargados = await cargarPlanes();
    if (!planesCargados) return;

    clienteEncontrado = datos;
    document.getElementById('nombreClienteInfo').textContent = datos.nombre;

    const membresia = describirMembresia(datos);
    const estadoMembresia = document.getElementById('estadoMembresia');
    estadoMembresia.textContent = membresia.estado;
    estadoMembresia.style.color = membresia.color;

    let detalleFecha = '';
    if (datos.fecha_fin) {
      const prefijo = membresia.vigente ? 'Vence' : 'Su última membresía terminaba';
      detalleFecha = `${prefijo}: ${formatearFecha(datos.fecha_fin)}`;
      if (datos.nombre_plan) detalleFecha += ` (plan ${datos.nombre_plan})`;
    }
    document.getElementById('fechaVencimiento').textContent = detalleFecha;

    infoCliente.style.display = 'block';

  } catch (error) {
    mensajeBusqueda.textContent = 'No se pudo conectar con el servidor';
    mensajeBusqueda.style.display = 'block';
  }
}

document.getElementById('btnBuscar').addEventListener('click', buscarCliente);

// Enter en el campo de la cédula busca al cliente (registro ágil, RNF02)
document.getElementById('cedulaBusqueda').addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    buscarCliente();
  }
});

document.getElementById('btnRenovar').addEventListener('click', async () => {
  const planId = document.getElementById('selectPlan').value;
  const mensajeExito = document.getElementById('mensajeExitoRenovacion');
  const boton = document.getElementById('btnRenovar');

  if (!clienteEncontrado || !planId) return;

  // Evita renovar dos veces por un doble clic mientras se espera la respuesta
  boton.disabled = true;
  boton.textContent = 'Renovando...';

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/membresias/renovar`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ cedula: clienteEncontrado.cedula, plan_id: planId })
    });

    if (respuesta.status === 401) {
      sesionExpirada();
      return;
    }

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      alert(resultado.error);
      return;
    }

    mensajeExito.textContent = `Membresía renovada correctamente. Nueva fecha de vencimiento: ${formatearFecha(resultado.fecha_fin)}`;
    mensajeExito.style.display = 'block';

    // Limpiar formulario para el siguiente cliente
    clienteEncontrado = null;
    document.getElementById('cedulaBusqueda').value = '';
    document.getElementById('infoCliente').style.display = 'none';
    document.getElementById('cedulaBusqueda').focus();

  } catch (error) {
    alert('No se pudo conectar con el servidor');
  } finally {
    boton.disabled = false;
    boton.textContent = 'Confirmar renovación';
  }
});
