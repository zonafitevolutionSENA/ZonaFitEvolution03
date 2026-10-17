// Filtros del historial de accesos: validación del rango de fechas y filtrado de las filas ya cargadas.

export const FILTROS_RESULTADO = [
  { id: "todos", etiqueta: "Todos" },
  { id: "permitido", etiqueta: "Acceso permitido" },
  { id: "denegado", etiqueta: "Acceso denegado" },
];

export const MAX_TEXTO_FILTRO = 50;

// Día local (AAAA-MM-DD) de una fecha
export function diaLocal(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

// Una fecha AAAA-MM-DD debe existir de verdad (rechaza 2026-02-30)
function fechaExiste(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const f = new Date(`${texto}T00:00:00Z`);
  return !Number.isNaN(f.getTime()) && f.toISOString().startsWith(texto);
}

// Ambas fechas son opcionales; si se escriben deben ser reales, no futuras y "desde" no puede pasar de "hasta"
export function validarRangoFechas(desde, hasta, hoy = diaLocal(new Date())) {
  const errores = { desde: "", hasta: "" };
  if (desde && !fechaExiste(desde)) errores.desde = "La fecha «Desde» no es válida.";
  else if (desde && desde > hoy) errores.desde = "La fecha «Desde» no puede ser futura.";
  if (hasta && !fechaExiste(hasta)) errores.hasta = "La fecha «Hasta» no es válida.";
  else if (hasta && hasta > hoy) errores.hasta = "La fecha «Hasta» no puede ser futura.";
  if (!errores.desde && !errores.hasta && desde && hasta && desde > hasta) {
    errores.hasta = "La fecha «Hasta» no puede ser anterior a «Desde».";
  }
  return errores;
}

export function hayErroresRango(errores) {
  return Boolean(errores.desde || errores.hasta);
}

// Filtra por resultado, texto (cliente o motivo) y rango de días. Un rango inválido no filtra por fechas.
export function filtrarHistorial(filas, { resultado, texto, desde, hasta }) {
  const termino = String(texto ?? "").replace(/\p{Cc}/gu, "").replace(/\s+/g, " ").trim().toLowerCase();
  const rangoValido = !hayErroresRango(validarRangoFechas(desde, hasta));

  return filas.filter((f) => {
    if (resultado === "permitido" && !f.permitido) return false;
    if (resultado === "denegado" && f.permitido) return false;
    if (termino && !`${f.cliente} ${f.motivo}`.toLowerCase().includes(termino)) return false;
    if (rangoValido) {
      const dia = diaLocal(f.fechaHora);
      if (desde && dia < desde) return false;
      if (hasta && dia > hasta) return false;
    }
    return true;
  });
}
