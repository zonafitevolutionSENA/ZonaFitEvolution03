function fechaATexto(fecha) {
  if (typeof fecha === 'string') return fecha.slice(0, 10);
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function hoyISO() {
  return fechaATexto(new Date());
}

module.exports = { fechaATexto, hoyISO };
