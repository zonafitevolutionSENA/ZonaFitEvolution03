class PlantillaBiometrica {
  constructor({ id, cliente_id, template_hash, fecha_registro }) {
    this.id = id;
    this.cliente_id = cliente_id;
    this.template_hash = template_hash;
    this.fecha_registro = fecha_registro;
  }

  toJSON() {
    return {
      id: this.id,
      cliente_id: this.cliente_id,
      fecha_registro: this.fecha_registro
    };
  }
}

module.exports = PlantillaBiometrica;
