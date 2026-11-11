const crypto = require('crypto');
const LectorBiometrico = require('./lectorBiometrico.interface');
const { enviarOrden } = require('./canalAgente');

// Adaptador para el despliegue en la nube: el AS608 está en otro equipo y lo maneja el agente
// (AgenteLector/). Devuelve los mismos templates que el adaptador as608, así que los servicios no cambian.
class RemotoLector extends LectorBiometrico {
  get tipo() {
    return 'remoto';
  }

  async capturar(signal) {
    return enviarOrden('capturar', {}, { signal });
  }

  async registrar(alCambiarEtapa = () => {}) {
    return enviarOrden('registrar', {}, { alEtapa: alCambiarEtapa });
  }

  async eliminar(template) {
    return enviarOrden('eliminar', { template });
  }

  // Comparar dos hashes no necesita el sensor: se hace aquí, igual que en el adaptador as608
  async comparar(templateA, templateB) {
    if (typeof templateA !== 'string' || typeof templateB !== 'string') return false;
    const a = Buffer.from(templateA);
    const b = Buffer.from(templateB);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
}

module.exports = RemotoLector;
