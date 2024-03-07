class Controller {
  arryDisponibilidad = [];
  arryTipoAtencion = [];
  arryTurnos = [];

  constructor() {
    this.mockup = new Mockup();
  }

  // Lista de días que se pueden configurar
  devuelveDiasDeAtencion() {
    return this.mockup.getDias();
  }

  // Lista de Tipos de Atención que se pueden configurar
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

  //
  getArryDisponibilidad() {
    return this.arryDisponibilidad;
  }

  getArryTipoDeAtencion() {
    return this.arryTipoAtencion;
  }

  getArryTurnos() {
    return this.arryTurnos;
  }

  // Valida disponibilidad para Día seleccionado y Tipo de Atención en caso de existir disponibilidad registra el turno
  armaListadoTurno(nombre, dia, tipoAtencion) {
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
      // no hay disponibilidad
      return 0;
    } else {
      // hay disponibilidad, actualizo disponmibilidad
      let valor = objDisp.getMinDisponible() - objAt.getDuracionMin();
      objDisp.setMinDisponible(valor);

      //  llama a la funcion para la carga en la lista el objeto turno
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
}
