class LectorBiometrico {
  async capturar() {
    throw new Error('El método capturar() debe ser implementado por el adaptador concreto');
  }

  async comparar(templateA, templateB) {
    throw new Error('El método comparar() debe ser implementado por el adaptador concreto');
  }
}

module.exports = LectorBiometrico;
