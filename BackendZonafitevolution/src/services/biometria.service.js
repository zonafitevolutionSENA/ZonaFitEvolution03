const obtenerLector = require('../hardware/lector.factory');
const biometriaRepository = require('../repositories/biometria.repository');
const clienteRepository = require('../repositories/cliente.repository');
const ErrorDominio = require('../utils/errores');

function validarClienteId(cliente_id) {
  if (!/^\d+$/.test(String(cliente_id)) || Number(cliente_id) <= 0) {
    throw new ErrorDominio('El identificador del cliente no es válido');
  }
}

async function buscarPlantillaCoincidente(lector, template) {
  const todas = await biometriaRepository.obtenerTodas();

  for (const plantilla of todas) {
    if (await lector.comparar(template, plantilla.template_hash)) {
      return plantilla;
    }
  }

  return null;
}

async function registrarHuella({ cliente_id } = {}, alCambiarEtapa) {
  if (!cliente_id) {
    throw new ErrorDominio('El cliente es obligatorio');
  }

  validarClienteId(cliente_id);
  const lector = obtenerLector();

  const cliente = await clienteRepository.obtenerPorId(cliente_id);
  if (!cliente) {
    throw new ErrorDominio('El cliente indicado no existe', 404);
  }

  const yaRegistrado = await biometriaRepository.obtenerPorClienteId(cliente_id);
  if (yaRegistrado) {
    throw new ErrorDominio('Este cliente ya tiene una huella registrada. Elimínala primero para volver a registrar.', 409);
  }

  const template = await lector.registrar(alCambiarEtapa);

  const coincidente = await buscarPlantillaCoincidente(lector, template);
  if (coincidente) {
    throw new ErrorDominio('Esta huella ya está registrada para otro cliente', 409);
  }

  let nuevoId;
  try {
    nuevoId = await biometriaRepository.crear({
      cliente_id,
      template_hash: template
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // La restricción UNIQUE de template_hash impide guardar la misma huella para dos clientes
      if (String(error.sqlMessage || '').includes('template_hash')) {
        throw new ErrorDominio('Esta huella ya está registrada para otro cliente', 409);
      }
      throw new ErrorDominio('Este cliente ya tiene una huella registrada. Elimínala primero para volver a registrar.', 409);
    }
    throw error;
  }

  return {
    id: nuevoId,
    cliente_id,
    mensaje: 'Huella registrada correctamente'
  };
}

async function identificarPorHuella({ signal } = {}) {
  const lector = obtenerLector();
  const templateCapturado = await lector.capturar(signal);

  // El lector devuelve null cuando la huella no está guardada en el sensor
  const coincidente = templateCapturado ? await buscarPlantillaCoincidente(lector, templateCapturado) : null;
  if (!coincidente) {
    throw new ErrorDominio('No se encontró ningún cliente con esta huella registrada', 404);
  }

  return clienteRepository.obtenerPorId(coincidente.cliente_id);
}

async function eliminarHuella(cliente_id) {
  validarClienteId(cliente_id);

  const plantilla = await biometriaRepository.obtenerPorClienteId(cliente_id);
  if (!plantilla) {
    throw new ErrorDominio('Este cliente no tiene huella registrada', 404);
  }

  // Primero se borra del lector: si falla, la base de datos no cambia y no queda una huella huérfana en el sensor
  await obtenerLector().eliminar(plantilla.template_hash);

  const eliminado = await biometriaRepository.eliminarPorClienteId(cliente_id);
  if (!eliminado) {
    throw new ErrorDominio('Este cliente no tiene huella registrada', 404);
  }
  return { mensaje: 'Huella eliminada correctamente' };
}

module.exports = {
  registrarHuella,
  identificarPorHuella,
  eliminarHuella
};
