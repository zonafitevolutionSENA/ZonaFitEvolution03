const API_URL = 'http://localhost:3000/api';
const usuario = verificarSesion();

async function obtenerHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

let clienteEncontrado = null;

function sesionExpirada() {
  alert('Tu sesión ha expirado. Vuelve a iniciar sesión.');
  cerrarSesion();
}

function mostrarError(texto) {
  const mensajeError = document.getElementById('mensajeError');
  mensajeError.textContent = texto;
  mensajeError.style.display = 'block';
}

function ocultarMensajes() {
  document.getElementById('mensajeError').style.display = 'none';
  document.getElementById('mensajeExito').style.display = 'none';
}

async function buscarCliente() {
  const cedula = document.getElementById('cedulaCliente').value.trim();

  ocultarMensajes();
  document.getElementById('datosCliente').style.display = 'none';
  clienteEncontrado = null;

  if (!cedula) {
    mostrarError('Ingresa una cédula para buscar');
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
      mostrarError(datos.error);
      return;
    }

    clienteEncontrado = datos;
    document.getElementById('nombreClienteBiometria').textContent = `Cliente: ${datos.nombre}`;
    document.getElementById('datosCliente').style.display = 'block';
    document.getElementById('identificadorSimulado').focus();

  } catch (error) {
    mostrarError('No se pudo conectar con el servidor');
  }
}

document.getElementById('btnBuscarCliente').addEventListener('click', buscarCliente);

document.getElementById('cedulaCliente').addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    buscarCliente();
  }
});

document.getElementById('btnRegistrarHuella').addEventListener('click', async () => {
  const identificadorSimulado = document.getElementById('identificadorSimulado').value.trim();
  const mensajeExito = document.getElementById('mensajeExito');
  const boton = document.getElementById('btnRegistrarHuella');

  ocultarMensajes();

  if (!clienteEncontrado) return;

  if (!identificadorSimulado) {
    mostrarError('Ingresa el identificador de prueba para simular la lectura del sensor');
    return;
  }

  boton.disabled = true;
  boton.textContent = 'Registrando...';

  try {
    const headers = await obtenerHeaders();
    const respuesta = await fetch(`${API_URL}/biometria/registrar`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        cliente_id: clienteEncontrado.id,
        identificadorSimulado
      })
    });

    if (respuesta.status === 401) {
      sesionExpirada();
      return;
    }

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mostrarError(resultado.error);
      return;
    }

    mensajeExito.textContent = 'Huella registrada correctamente para este cliente';
    mensajeExito.style.display = 'block';
    clienteEncontrado = null;
    document.getElementById('datosCliente').style.display = 'none';
    document.getElementById('identificadorSimulado').value = '';
    document.getElementById('cedulaCliente').value = '';
    document.getElementById('cedulaCliente').focus();

  } catch (error) {
    mostrarError('No se pudo conectar con el servidor');
  } finally {
    boton.disabled = false;
    boton.textContent = 'Registrar huella';
  }
});
