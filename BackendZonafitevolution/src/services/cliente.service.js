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

// Consentimientos (Ley 1581): deben llegar como booleanos explícitos, no como "true" o 1
function validarConsentimiento(valor, campo) {
  if (valor !== undefined && typeof valor !== 'boolean') {
    throw new ErrorDominio(`${campo} debe ser verdadero o falso`);
  }
  return valor;
}

// El correo pasa a ser obligatorio; se valida su formato y se guarda en minúsculas y sin
// espacios para que no se registren clientes sin un medio de contacto por correo.
// Para registrar, el cliente debe aceptar los términos y el tratamiento de datos; los avisos
// por correo son opcionales y se autorizan por separado.
async function registrarCliente({ nombre, cedula, correo: correoRecibido, telefono, acepta_terminos, acepta_avisos }) {
  if (!nombre || !cedula) {
    throw new ErrorDominio('Nombre y cédula son obligatorios');
  }

  if (!validarCedula(cedula)) {
    throw new ErrorDominio('La cédula debe contener solo números (6 a 15 dígitos)');
  }

  const correo = normalizarCorreo(correoRecibido);

  validarConsentimiento(acepta_terminos, 'acepta_terminos');
  validarConsentimiento(acepta_avisos, 'acepta_avisos');
  if (acepta_terminos !== true) {
    throw new ErrorDominio('El cliente debe aceptar los términos y el tratamiento de datos personales');
  }

  const existente = await clienteRepository.obtenerPorCedula(cedula);
  if (existente) {
    throw new ErrorDominio('Ya existe un cliente registrado con esa cédula', 409);
  }

  const nuevoId = await clienteRepository.crear({ nombre, cedula, correo, telefono, aceptaAvisos: acepta_avisos === true });
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
  // Al editar también se exige un correo válido; sin esto un cliente registrado con correo
  // podía quedar sin él al guardar el formulario de edición con el campo vacío.
  const correo = normalizarCorreo(datos.correo);
  // Clientes registrados antes de las casillas pueden aceptar al editar. Los términos no se retiran
  // desde aquí (eso es una solicitud de supresión de datos); los avisos sí se pueden retirar.
  const aceptaTerminos = validarConsentimiento(datos.acepta_terminos, 'acepta_terminos');
  const aceptaAvisos = validarConsentimiento(datos.acepta_avisos, 'acepta_avisos');
  if (aceptaAvisos === true && !cliente.acepta_terminos && aceptaTerminos !== true) {
    throw new ErrorDominio('Para recibir avisos por correo el cliente debe aceptar primero los términos y el tratamiento de datos');
  }
  await clienteRepository.actualizar(id, {
    nombre: datos.nombre,
    correo,
    telefono: datos.telefono,
    aceptaTerminos: aceptaTerminos === true,
    aceptaAvisos
  });
  return obtenerCliente(id);
}

module.exports = {
  registrarCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente
};
