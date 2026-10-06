class Cliente {
  constructor({ id, nombre, cedula, correo, telefono, fecha_registro }) {
    this.id = id;
    this.nombre = nombre;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fecha_registro = fecha_registro;
  }
}

module.exports = Cliente;
