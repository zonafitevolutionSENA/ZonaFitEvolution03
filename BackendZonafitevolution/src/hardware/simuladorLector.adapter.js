const crypto = require('crypto');
const LectorBiometrico = require('./lectorBiometrico.interface');

class SimuladorLector extends LectorBiometrico {
  async capturar(identificadorSimulado) {
    if (typeof identificadorSimulado !== 'string' || !identificadorSimulado.trim()) {
      throw new Error('El simulador requiere un identificador de prueba (en hardware real, esto vendría del sensor)');
    }

    if (!process.env.BIOMETRIA_SALT) {
      throw new Error('BIOMETRIA_SALT no está configurado');
    }

    return crypto
      .createHash('sha256')
      .update(identificadorSimulado + process.env.BIOMETRIA_SALT)
      .digest('hex');
  }

  async comparar(templateA, templateB) {
    if (typeof templateA !== 'string' || typeof templateB !== 'string') {
      return false;
    }

    const a = Buffer.from(templateA);
    const b = Buffer.from(templateB);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
}

module.exports = SimuladorLector;
