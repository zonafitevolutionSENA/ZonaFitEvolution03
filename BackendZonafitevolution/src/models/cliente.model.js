class Cliente {
  constructor({ id, nombre, cedula, correo, telefono, fecha_registro, tiene_huella }) {
    this.id = id;
    this.nombre = nombre;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fecha_registro = fecha_registro;
    this.tiene_huella = Boolean(tiene_huella);
  }
}

module.exports = Cliente;
