class Plan {
  constructor({ id, nombre, duracion_dias, precio, max_ingresos, activo, fecha_creacion }) {
    this.id = id;
    this.nombre = nombre;
    this.duracion_dias = duracion_dias;
    this.precio = precio;
    this.max_ingresos = max_ingresos ?? null; // null = plan por tiempo; con valor = tiquetera
    this.activo = !!activo;
    this.fecha_creacion = fecha_creacion;
  }
}

module.exports = Plan;
