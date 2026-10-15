class Membresia {
  constructor({ id, plan_id, fecha_inicio, fecha_fin, estado, cliente_id, fecha_creacion }) {
    this.id = id;
    this.plan_id = plan_id;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.estado = estado;
    this.cliente_id = cliente_id;
    this.fecha_creacion = fecha_creacion;
  }
}

module.exports = Membresia;
