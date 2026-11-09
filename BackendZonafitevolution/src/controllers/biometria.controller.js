const biometriaService = require('../services/biometria.service');
const registrosEnCurso = new Map();

function claveRegistro(usuarioId, capturaId) {
  if (typeof capturaId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(capturaId)) return null;
  return `${usuarioId}:${capturaId}`;
}

function estadoRegistro(req, res) {
  const clave = claveRegistro(req.usuario.id, req.params.capturaId);
  if (!clave) return res.status(400).json({ error: 'Identificador de captura inválido' });
  res.json({ etapa: registrosEnCurso.get(clave) || 'preparando' });
}

function infoLector(req, res, next) {
  try {
    res.status(200).json(biometriaService.obtenerInfoLector());
  } catch (error) {
    next(error);
  }
}

async function registrar(req, res, next) {
  const clave = claveRegistro(req.usuario.id, req.body?.captura_id);
  if (clave) registrosEnCurso.set(clave, 'preparando');
  try {
    const resultado = await biometriaService.registrarHuella(req.body, etapa => {
      if (clave) registrosEnCurso.set(clave, etapa);
    });
    res.status(201).json(resultado);
  } catch (error) {
    next(error);
  } finally {
    if (clave) registrosEnCurso.delete(clave);
  }
}

async function identificar(req, res, next) {
  try {
    const cliente = await biometriaService.identificarPorHuella(req.body);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await biometriaService.eliminarHuella(req.params.cliente_id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { infoLector, registrar, identificar, eliminar, estadoRegistro };
