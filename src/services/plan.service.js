const planRepository = require('../repositories/plan.repository');
const ErrorDominio = require('../utils/errores');

const LONGITUD_MAXIMA_NOMBRE = 50;

function validarDuracion(duracion_dias) {
  const dias = Number(duracion_dias);
  if (!Number.isInteger(dias)) {
    throw new ErrorDominio('La duración debe ser un número entero de días');
  }
  if (dias <= 0) {
    throw new ErrorDominio('La duración debe ser mayor a 0 días');
  }
  return dias;
}

function validarPrecio(precio) {
  const valor = Number(precio);
  if (!Number.isFinite(valor)) {
    throw new ErrorDominio('El precio debe ser un número');
  }
  if (valor <= 0) {
    throw new ErrorDominio('El precio debe ser mayor a 0');
  }
  return valor;
}

function validarNombre(nombre) {
  const limpio = typeof nombre === 'string' ? nombre.trim() : '';
  if (!limpio) {
    throw new ErrorDominio('El nombre del plan no puede estar vacío');
  }
  if (limpio.length > LONGITUD_MAXIMA_NOMBRE) {
    throw new ErrorDominio(`El nombre no puede superar los ${LONGITUD_MAXIMA_NOMBRE} caracteres`);
  }
  return limpio;
}

async function crearPlan({ nombre, duracion_dias, precio }) {
  if (!nombre || !duracion_dias || !precio) {
    throw new ErrorDominio('Nombre, duración y precio son obligatorios');
  }

  const nombreLimpio = validarNombre(nombre);
  const dias = validarDuracion(duracion_dias);
  const valor = validarPrecio(precio);

  const existente = await planRepository.obtenerPorNombre(nombreLimpio);
  if (existente) {
    throw new ErrorDominio('Ya existe un plan con ese nombre', 409);
  }

  const nuevoId = await planRepository.crear({ nombre: nombreLimpio, duracion_dias: dias, precio: valor });
  return planRepository.obtenerPorId(nuevoId);
}

async function listarPlanes({ soloActivos = false } = {}) {
  return soloActivos ? planRepository.obtenerActivos() : planRepository.obtenerTodos();
}

async function obtenerPlan(id) {
  const plan = await planRepository.obtenerPorId(id);
  if (!plan) {
    throw new ErrorDominio('Plan no encontrado', 404);
  }
  return plan;
}

async function actualizarPlan(id, { nombre, duracion_dias, precio, activo } = {}) {
  const plan = await planRepository.obtenerPorId(id);
  if (!plan) {
    throw new ErrorDominio('Plan no encontrado', 404);
  }

  let nombreNuevo = plan.nombre;
  if (nombre != null) {
    nombreNuevo = validarNombre(nombre);
    const existente = await planRepository.obtenerPorNombre(nombreNuevo);
    if (existente && existente.id !== plan.id) {
      throw new ErrorDominio('Ya existe un plan con ese nombre', 409);
    }
  }

  const dias = duracion_dias != null ? validarDuracion(duracion_dias) : plan.duracion_dias;
  const valor = precio != null ? validarPrecio(precio) : plan.precio;

  if (activo != null && typeof activo !== 'boolean') {
    throw new ErrorDominio('El campo activo debe ser verdadero o falso');
  }

  await planRepository.actualizar(id, {
    nombre: nombreNuevo,
    duracion_dias: dias,
    precio: valor,
    activo: activo ?? plan.activo
  });

  return obtenerPlan(id);
}

async function eliminarPlan(id) {
  const plan = await planRepository.obtenerPorId(id);
  if (!plan) {
    throw new ErrorDominio('Plan no encontrado', 404);
  }

  // Regla de negocio del CU-03: no eliminar planes con membresías activas asociadas
  const membresiasActivas = await planRepository.contarMembresiasActivasPorPlan(id);
  if (membresiasActivas > 0) {
    throw new ErrorDominio(
      `No se puede eliminar el plan: tiene ${membresiasActivas} membresía(s) activa(s) asociada(s). Desactívalo en su lugar.`,
      409
    );
  }

  try {
    await planRepository.eliminar(id);
  } catch (error) {
    // La clave foránea también protege a los planes con membresías históricas (vencidas o canceladas)
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      throw new ErrorDominio(
        'No se puede eliminar el plan: tiene membresías asociadas en el historial. Desactívalo en su lugar.',
        409
      );
    }
    throw error;
  }

  return { mensaje: 'Plan eliminado correctamente' };
}

async function desactivarPlan(id) {
  const plan = await planRepository.obtenerPorId(id);
  if (!plan) {
    throw new ErrorDominio('Plan no encontrado', 404);
  }
  await planRepository.actualizar(id, { ...plan, activo: false });
  return { mensaje: 'Plan desactivado correctamente' };
}

module.exports = {
  crearPlan,
  listarPlanes,
  obtenerPlan,
  actualizarPlan,
  eliminarPlan,
  desactivarPlan
};
