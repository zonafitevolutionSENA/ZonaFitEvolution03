class Membresia {
  constructor({ id, plan_id, fecha_inicio, fecha_fin, estado, cliente_id, fecha_creacion, ingresos_totales, ingresos_usados, fecha_primer_uso, fecha_ultimo_ingreso }) {
    this.id = id;
    this.plan_id = plan_id;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.estado = estado;
    this.cliente_id = cliente_id;
    this.fecha_creacion = fecha_creacion;
    this.ingresos_totales = ingresos_totales ?? null;
    this.ingresos_usados = ingresos_usados ?? 0;
    this.fecha_primer_uso = fecha_primer_uso ?? null;
    this.fecha_ultimo_ingreso = fecha_ultimo_ingreso ?? null;
  }
}

module.exports = Membresia;
