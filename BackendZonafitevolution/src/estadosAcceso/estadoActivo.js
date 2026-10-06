const EstadoAcceso = require('./estadoAcceso.interface');
const { fechaATexto, hoyISO } = require('../utils/fechas');

function fechaFinComoTexto(membresia) {
  const fin = membresia && membresia.fecha_fin;

  if (fin instanceof Date && !Number.isNaN(fin.getTime())) {
    return fechaATexto(fin);
  }

  if (typeof fin === 'string') {
    const coincidencia = fin.match(/^(\d{4}-\d{2}-\d{2})(?:$|[T ])/);
    if (coincidencia) {
      const fecha = new Date(coincidencia[1]);
      if (!Number.isNaN(fecha.getTime()) && fecha.toISOString().startsWith(coincidencia[1])) {
        return coincidencia[1];
      }
    }
  }

  return null;
}

class EstadoActivo extends EstadoAcceso {
  evaluar(membresia) {
    const fechaFin = fechaFinComoTexto(membresia);

    if (!fechaFin) {
      return { permitido: false, motivo: 'Membresía sin fecha de vencimiento válida' };
    }

    if (fechaFin < hoyISO()) {
      return { permitido: false, motivo: 'Membresía vencida' };
    }

    return { permitido: true, motivo: 'Membresía activa y vigente' };
  }
}

module.exports = EstadoActivo;
