const clienteRepository = require('../repositories/cliente.repository');
const ErrorDominio = require('../utils/errores');

function validarCedula(cedula) {
  return /^\d{6,15}$/.test(cedula);
}

function normalizarCorreo(correo) {
  const texto = typeof correo === 'string' ? correo.trim().toLowerCase() : '';
  if (!texto) {
    throw new ErrorDominio('El correo es obligatorio');
  }
  if (texto.length > 100) {
    throw new ErrorDominio('El correo no puede superar 100 caracteres');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto)) {
    throw new ErrorDominio('El formato del correo no es válido');
  }
  return texto;
}

// ANTERIOR: async function registrarCliente({ nombre, cedula, correo, telefono }) {
//   if (!nombre || !cedula) throw new ErrorDominio('Nombre y cédula son obligatorios');
// NUEVO: el correo pasa a ser obligatorio; se valida su formato y se guarda en minúsculas y sin
// espacios para que no se registren clientes sin un medio de contacto por correo.
async function registrarCliente({ nombre, cedula, correo: correoRecibido, telefono }) {
  if (!nombre || !cedula) {
    throw new ErrorDominio('Nombre y cédula son obligatorios');
  }

  if (!validarCedula(cedula)) {
    throw new ErrorDominio('La cédula debe contener solo números (6 a 15 dígitos)');
  }

  const correo = normalizarCorreo(correoRecibido);

  const existente = await clienteRepository.obtenerPorCedula(cedula);
  if (existente) {
    throw new ErrorDominio('Ya existe un cliente registrado con esa cédula', 409);
  }

  const nuevoId = await clienteRepository.crear({ nombre, cedula, correo, telefono });
  return clienteRepository.obtenerPorId(nuevoId);
}

async function listarClientes() {
  return clienteRepository.obtenerTodos();
}

async function obtenerCliente(id) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  return cliente;
}

async function actualizarCliente(id, datos) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  // ANTERIOR: await clienteRepository.actualizar(id, datos);
  // NUEVO: al editar también se exige un correo válido; sin esto un cliente registrado con correo
  // podía quedar sin él al guardar el formulario de edición con el campo vacío.
  const correo = normalizarCorreo(datos.correo);
  await clienteRepository.actualizar(id, { ...datos, correo });
  return obtenerCliente(id);
}

async function eliminarCliente(id) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  await clienteRepository.eliminar(id);
  return { mensaje: 'Cliente eliminado correctamente' };
}

module.exports = {
  registrarCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente
};
