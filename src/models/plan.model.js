class Plan {
  constructor({ id, nombre, duracion_dias, precio, activo, fecha_creacion }) {
    this.id = id;
    this.nombre = nombre;
    this.duracion_dias = duracion_dias;
    this.precio = precio;
    this.activo = !!activo;
    this.fecha_creacion = fecha_creacion;
  }
}

module.exports = Plan;
