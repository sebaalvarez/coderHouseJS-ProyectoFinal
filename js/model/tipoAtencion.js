class TipoAtencion {
  numAtencion = 0;
  nomAtencion = "";
  duracionMin = 0;

  constructor(numAtencion, nomAtencion, duracionMin) {
    this.numAtencion = numAtencion;
    this.nomAtencion = nomAtencion;
    this.duracionMin = duracionMin;
  }

  setNumAtencion(num) {
    this.numAtencion = num;
  }

  getNumAtencion() {
    return this.numAtencion;
  }

  setNomAtencion(nombre) {
    this.nomAtencion = nombre;
  }

  getNomAtencion() {
    return this.nomAtencion;
  }

  setDuracionMin(min) {
    this.duracionMin = min;
  }

  getDuracionMin() {
    return this.duracionMin;
  }
}
