const EstadoAcceso = require('./estadoAcceso.interface');

class EstadoVencido extends EstadoAcceso {
  evaluar(membresia) {
    // Una tiquetera pasa a "vencida" al gastar su último ingreso: se avisa el motivo real
    const esTiquetera = membresia && membresia.ingresos_totales !== null && membresia.ingresos_totales !== undefined;
    if (esTiquetera && membresia.ingresos_usados >= membresia.ingresos_totales) {
      return { permitido: false, motivo: 'Tiquetera sin ingresos disponibles' };
    }
    return { permitido: false, motivo: 'Membresía vencida' };
  }
}

module.exports = EstadoVencido;
