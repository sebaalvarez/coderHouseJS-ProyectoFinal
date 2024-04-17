class Turno {
  dni = 0;
  paciente = "";
  numDia = 0;
  nomDia = "";
  numAtencion = 0;
  nomAtencion = "";
  duracionMin = 0;

  constructor(
    dni,
    paciente,
    numDia,
    nomDia,
    numAtencion,
    nomAtencion,
    duracionMin
  ) {
    this.dni = dni;
    this.paciente = paciente;
    this.numDia = numDia;
    this.nomDia = nomDia;
    this.numAtencion = numAtencion;
    this.nomAtencion = nomAtencion;
    this.duracionMin = duracionMin;
  }

  setDni(dni) {
    this.dni = dni;
  }

  getDni() {
    return this.dni;
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
