const EstadoAcceso = require('./estadoAcceso.interface');
const { fechaATexto, hoyISO } = require('../utils/fechas');

class EstadoVencido extends EstadoAcceso {
  evaluar(membresia) {
    // Una tiquetera pasa a "vencida" al gastar su último ingreso
    const esTiquetera = membresia && membresia.ingresos_totales !== null && membresia.ingresos_totales !== undefined;
    if (esTiquetera && membresia.ingresos_usados >= membresia.ingresos_totales) {
      // Si ese último ingreso se usó hoy, el cliente puede volver a entrar hoy (el día ya está pagado)
      const ultimo = membresia.fecha_ultimo_ingreso ? fechaATexto(membresia.fecha_ultimo_ingreso) : null;
      if (ultimo === hoyISO()) {
        return { permitido: true, motivo: 'Tiquetera: último ingreso ya utilizado hoy' };
      }
      return { permitido: false, motivo: 'Tiquetera sin ingresos disponibles' };
    }
    return { permitido: false, motivo: 'Membresía vencida' };
  }
}

module.exports = EstadoVencido;
