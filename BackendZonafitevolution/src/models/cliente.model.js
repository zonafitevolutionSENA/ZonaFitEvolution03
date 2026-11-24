class Cliente {
  constructor({ id, nombre, cedula, correo, telefono, fecha_registro, tiene_huella, terminos_aceptados_en, avisos_aceptados_en }) {
    this.id = id;
    this.nombre = nombre;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fecha_registro = fecha_registro;
    this.tiene_huella = Boolean(tiene_huella);
    // Consentimientos (Ley 1581): la fecha es la constancia de cuándo aceptó; null = no ha aceptado
    this.terminos_aceptados_en = terminos_aceptados_en ?? null;
    this.avisos_aceptados_en = avisos_aceptados_en ?? null;
    this.acepta_terminos = Boolean(terminos_aceptados_en);
    this.acepta_avisos = Boolean(avisos_aceptados_en);
  }
}

module.exports = Cliente;
