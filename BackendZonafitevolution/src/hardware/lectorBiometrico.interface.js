class LectorBiometrico {
  async capturar() {
    throw new Error('El método capturar() debe ser implementado por el adaptador concreto');
  }

  // Captura la huella para registrarla. Por defecto es igual que capturar();
  // un lector físico puede necesitar varias lecturas para guardarla.
  async registrar(entrada) {
    return this.capturar(entrada);
  }

  async comparar(templateA, templateB) {
    throw new Error('El método comparar() debe ser implementado por el adaptador concreto');
  }

  // true si la captura llega como texto desde la petición (simulador);
  // false si la huella se lee directamente del sensor
  get requiereIdentificador() {
    return true;
  }

  get tipo() {
    return 'desconocido';
  }
}

module.exports = LectorBiometrico;
