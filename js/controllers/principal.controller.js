class Controller {
  arryDisponibilidad = [];
  arryTipoAtencion = [];
  arryTurnos = [];

  constructor() {
    this.mockup = new Mockup();
  }

  // Obtiene y devuelve los días que se pueden configurar
  devuelveDiasDeAtencion() {
    return this.mockup.getDias();
  }

  // obtiene y devuelve los Tipos de Atención que se pueden configurar
  devuelveTiposDeAtencion() {
    return this.mockup.getTiposDeAtencion();
  }

  // Crea objeto y lo agrega a la lista de Disponibilidades
  cargaDisponibilidad(i, horas) {
    this.arryDisponibilidad.push(
      new Disponibilidad(
        i,
        this.devuelveDiasDeAtencion()[i],
        horas * 60,
        horas * 60
      )
    );
  }

  // Crea objeto y lo agrega a la lista de Tipo de Atención
  cargaTipoDeAtencion(i, min) {
    this.arryTipoAtencion.push(
      new TipoAtencion(i, this.devuelveTiposDeAtencion()[i], min)
    );
  }

  // Crea objeto y lo agrega a la lista de Turnos
  cargaTurno(paciente, numDia, nomDia, numAt, nomAt, duracionMin) {
    this.arryTurnos.push(
      new Turno(paciente, numDia, nomDia, numAt, nomAt, duracionMin)
    );
  }

  // Valida disponibilidad para el Día seleccionado y Tipo de Atención
  // en caso de existir disponibilidad registra el turno y devuelve 1, sino devuelve 0
  validarGrabarTurno(nombre, dia, tipoAtencion) {
    // Obtengo el objeto con la información del día seleccionado
    let objDisp = this.getArryDisponibilidad().find(
      (e) => e.getNumDia() == dia - 1
    );

    //Obtengo el objeto con la información del tipo de atención seleccionado
    let objAt = this.getArryTipoDeAtencion().find(
      (e) => e.getNumAtencion() == tipoAtencion - 1
    );

    // Verifico la disponibilidad de acuerdo al día seleccionado y el tipo de atención
    if (objDisp.getMinDisponible() - objAt.getDuracionMin() < 0) {
      // Si no hay disponibilidad en minutos retorno 0
      return 0;
    } else {
      // si hay disponibilidad, actualizo los minutos disponibles
      let valor = objDisp.getMinDisponible() - objAt.getDuracionMin();
      objDisp.setMinDisponible(valor);

      // llamo a la funcion para la carga en la lista de turnos el objeto del turno y retorno 1
      this.cargaTurno(
        nombre,
        objDisp.getNumDia(),
        objDisp.getNomDia(),
        objAt.getNumAtencion(),
        objAt.getNomAtencion(),
        objAt.getDuracionMin()
      );
      return 1;
    }
  }

  getArryDisponibilidad() {
    return this.arryDisponibilidad;
  }

  getArryTipoDeAtencion() {
    return this.arryTipoAtencion;
  }

  getArryTurnos() {
    return this.arryTurnos;
  }
}
