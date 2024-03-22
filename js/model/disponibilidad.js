class Disponibilidad {
  numDia = 0;
  nomDia = "";
  minAtencion = 0;
  minDisponible = 0;

  constructor(numDia, nomDia, minAtencion, minDisponible) {
    this.numDia = numDia;
    this.nomDia = nomDia;
    this.minAtencion = minAtencion;
    this.minDisponible = minDisponible;
  }

  setNumDia(numDia) {
    this.numDia = numDia;
  }

  getNumDia() {
    return this.numDia;
  }

  setNomDia(nombre) {
    this.nomDia = nombre;
  }

  getNomDia() {
    return this.nomDia;
  }

  setMinAtencion(min) {
    this.minAtencion = min;
  }

  getMinAtencion() {
    return this.minAtencion;
  }

  getHsAtencion() {
    return this.minAtencion / 60;
  }

  setMinDisponible(min) {
    this.minDisponible = min;
  }

  getMinDisponible() {
    return this.minDisponible;
  }

  getHsDisponible() {
    return this.minDisponible / 60;
  }
}
