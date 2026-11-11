// Contrato del lector de huellas (patrón Adapter). Los servicios solo dependen de esta clase,
// así que un lector distinto al AS608 se agrega con un nuevo adaptador, sin tocar servicios ni rutas.
class LectorBiometrico {
  // Lee una huella y devuelve su template, o null si el lector no la reconoce
  async capturar() {
    throw new Error('El método capturar() debe ser implementado por el adaptador concreto');
  }

  // Lee y guarda una huella nueva; devuelve su template
  async registrar() {
    throw new Error('El método registrar() debe ser implementado por el adaptador concreto');
  }

  // Borra la huella del dispositivo
  async eliminar() {
    throw new Error('El método eliminar() debe ser implementado por el adaptador concreto');
  }

  async comparar() {
    throw new Error('El método comparar() debe ser implementado por el adaptador concreto');
  }

  get tipo() {
    return 'desconocido';
  }
}

module.exports = LectorBiometrico;
