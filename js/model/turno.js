class Turno {
  paciente = "";
  numDia = 0;
  nomDia = "";
  numAtencion = 0;
  nomAtencion = "";
  duracionMin = 0;

  constructor(paciente, numDia, nomDia, numAtencion, nomAtencion, duracionMin) {
    this.paciente = paciente;
    this.numDia = numDia;
    this.nomDia = nomDia;
    this.numAtencion = numAtencion;
    this.nomAtencion = nomAtencion;
    this.duracionMin = duracionMin;
  }

  setPaciente(nombre) {
    this.paciente = nombre;
  }

  getPaciente() {
    return this.paciente;
  }

  setNumDia(dia) {
    this.numDia = dia;
  }

  getNumDia() {
    return this.numDia;
  }

  setNomDia(dia) {
    this.nomDia = dia;
  }

  getNomDia() {
    return this.nomDia;
  }

  setNumAtencion(numAt) {
    this.numAtencion = numAt;
  }

  getNumAtencion() {
    return this.numAtencion;
  }

  setNomAtencion(nomAt) {
    this.nomAtencion = nomAt;
  }

  getNomAtencion() {
    return this.nomAtencion;
  }

  setDuracionMin(minutos) {
    this.duracionMin = minutos;
  }

  getDuracionMin() {
    return this.duracionMin;
  }
}
