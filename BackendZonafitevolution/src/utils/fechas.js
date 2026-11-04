function fechaATexto(fecha) {
  if (typeof fecha === 'string') return fecha.slice(0, 10);
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function hoyISO() {
  return fechaATexto(new Date());
}

// Suma días a una fecha AAAA-MM-DD. Se opera en UTC para que no dependa de la zona horaria del servidor
function sumarDias(fechaTexto, dias) {
  const fecha = new Date(fechaTexto);
  fecha.setUTCDate(fecha.getUTCDate() + dias);
  return fecha.toISOString().split('T')[0];
}

module.exports = { fechaATexto, hoyISO, sumarDias };
