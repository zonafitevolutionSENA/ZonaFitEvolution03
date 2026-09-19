class EstadoAcceso {
  evaluar(membresia) {
    throw new Error('El método evaluar() debe ser implementado por el estado concreto');
  }
}

module.exports = EstadoAcceso;
