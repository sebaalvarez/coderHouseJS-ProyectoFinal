class Controller {
  arryTipoAtencion = [];

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
    let arry = this.getArryDisponibilidad();
    arry.push(
      new Disponibilidad(
        i,
        this.devuelveDiasDeAtencion()[i],
        horas * 60,
        horas * 60
      )
    );
    localStorage.setItem("AppTurno-Disponibilidad", JSON.stringify(arry));
  }

  // Crea objeto y lo agrega a la lista de Tipo de Atención
  cargaTipoDeAtencion(i, min) {
    let arry = this.getArryTipoDeAtencion();
    arry.push(new TipoAtencion(i, this.devuelveTiposDeAtencion()[i], min));
    console.log(arry);
    localStorage.setItem("AppTurno-TipoAtencion", JSON.stringify(arry));
  }

  // Obtiene un array con los turnos del localStorage, agrega el nuevo Turnos,  lo guarda en el localStorage
  cargaTurno(paciente, numDia, nomDia, numAt, nomAt, duracionMin) {
    let array = this.getArryTurnos();
    array.push(new Turno(paciente, numDia, nomDia, numAt, nomAt, duracionMin));
    localStorage.setItem("AppTurno-Turnos", JSON.stringify(array));
  }

  // Valida disponibilidad para el Día seleccionado y Tipo de Atención, en caso de existir disponibilidad registra el turno y devuelve 1, sino devuelve 0
  validarGrabarTurno(nombre, dia, tipoAtencion) {
    // Obtengo el array con las disponibilidades de todos los dias desde localStorage
    let arryLocalStorage = this.getArryDisponibilidad();

    // Obtengo el objeto de disponibilidad para del día seleccionado
    let objDisp = arryLocalStorage.find((el) => el.getNumDia() == dia - 1);

    //Obtengo el objeto con la información del tipo de atención seleccionado
    let objAt = this.getArryTipoDeAtencion().find(
      (el) => el.getNumAtencion() == tipoAtencion - 1
    );

    // Verifico la disponibilidad de acuerdo al día seleccionado y el tipo de atención
    if (objDisp.getMinDisponible() - objAt.getDuracionMin() < 0) {
      // Si no hay disponibilidad en minutos retorno 0
      return 0;
    } else {
      // si hay disponibilidad, actualizo los minutos disponibles
      let valor = objDisp.getMinDisponible() - objAt.getDuracionMin();
      objDisp.setMinDisponible(valor);

      // Actualizo en localSorage la disponibilidad
      localStorage.setItem(
        "AppTurno-Disponibilidad",
        JSON.stringify(arryLocalStorage)
      );

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

  // Devuelve un array con todos los dias ya registrados y la disponibilidad obteniendolo del localStorage
  getArryDisponibilidad() {
    let arryDisponibilidad = [];
    if (localStorage.getItem("AppTurno-Disponibilidad") != null) {
      JSON.parse(localStorage.getItem("AppTurno-Disponibilidad")).forEach(
        (el, index) => {
          arryDisponibilidad.push(
            new Disponibilidad(
              el.numDia,
              this.devuelveDiasDeAtencion()[index],
              el.minAtencion,
              el.minDisponible
            )
          );
        }
      );
    }
    return arryDisponibilidad;
  }

  // Devuelve un array con todos los tipo de atencion ya registrados con duracion obteniendolo del localStorage
  getArryTipoDeAtencion() {
    let arryTipoAtencion = [];
    if (localStorage.getItem("AppTurno-TipoAtencion") != null) {
      JSON.parse(localStorage.getItem("AppTurno-TipoAtencion")).forEach(
        (el, index) => {
          arryTipoAtencion.push(
            new TipoAtencion(
              index,
              this.devuelveTiposDeAtencion()[index],
              el.duracionMin
            )
          );
        }
      );
    }

    return arryTipoAtencion;
  }

  // Devuelve un array con todos los turnos ya registrados obteniendolo del localStorage
  getArryTurnos() {
    let arryTurnos = [];
    if (localStorage.getItem("AppTurno-Turnos") != null) {
      JSON.parse(localStorage.getItem("AppTurno-Turnos")).forEach((el) => {
        arryTurnos.push(
          new Turno(
            el.paciente,
            el.numDia,
            el.nomDia,
            el.numAtencion,
            el.nomAtencion,
            el.duracionMin
          )
        );
      });
    }

    return arryTurnos;
  }

  // si estamos en el entorno de desarrollo se presetean los parametros iniciales con los valores definidos en env.js
  verificaEntorno() {
    if (ENTORNO == "develop1") {
      if (localStorage.getItem("AppTurno-Disponibilidad") == null) {
        this.devuelveDiasDeAtencion().forEach((el, index) =>
          this.cargaDisponibilidad(index, HORADISPONIBLE)
        );
      }
      if (localStorage.getItem("AppTurno-TipoAtencion") == null) {
        this.devuelveTiposDeAtencion().forEach((el, i) =>
          this.cargaTipoDeAtencion(i, DIF_MIN_ATENCION * (i + 1))
        );
      }
      return 1;
    } else {
      // en el caso que no se encuentre en entorno de desarrollo pero ya se setearon los parametros iniciales los bloquea
      if (
        localStorage.getItem("AppTurno-Disponibilidad") != null &&
        localStorage.getItem("AppTurno-TipoAtencion") != null
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}
