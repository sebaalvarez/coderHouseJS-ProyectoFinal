class Controller {
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

    localStorage.setItem("AppTurno-TipoAtencion", JSON.stringify(arry));
  }

  // Quitar turno y actualizar disponibilidad del día
  deleteTurno(id) {
    // definición del parámetro id:
    // id[0]: numDia   ||   id[1]: dni   ||  id[2]: numAtencion

    let arryTurno = this.getArryTurnos();

    let indDelete = arryTurno.findIndex(
      (e) => e.dni == id[1] && e.numDia == id[0] && e.numAtencion == id[2]
    );

    arryTurno.splice(indDelete, 1);

    localStorage.setItem("AppTurno-Turnos", JSON.stringify(arryTurno));

    // Inicio Actualizar la disponibilidad luego de quitar el turno //
    // Obtengo la duración de la atención eliminadda
    let duracion = this.getArryTipoDeAtencion()
      .find((e) => e.getNumAtencion() == id[2])
      .getDuracionMin();

    // Actualizo disponibilidad
    let arryDispo = this.getArryDisponibilidad();
    let objDia = arryDispo.find((e) => e.getNumDia() == id[0]);

    objDia.setMinDisponible(
      Number(objDia.getMinDisponible()) + Number(duracion)
    );

    localStorage.setItem("AppTurno-Disponibilidad", JSON.stringify(arryDispo));

    // Fin Actualizar la disponibilidad luego de quitar el turno //
  }

  cargarTurno(dni, nombre, dia, tipoAtencion) {
    // Esta función valida lo siguiente y registra el turno:
    // - que no exista ya registrado un turno para el dni y día indicado -- error devuelve 2
    // - que exista disponibilidad para el día seleccionado y tipo de atención -- error devuelve 0

    // Valido que ya no exista un turno para ese día y dni
    let arryLocalStorageTurno = this.getArryTurnos();
    let existe = arryLocalStorageTurno.find(
      (e) =>
        Number(e.getNumDia()) == Number(dia - 1) &&
        Number(e.getDni()) == Number(dni)
    );
    if (existe != undefined) {
      return 2;
    }

    // Obtengo el array con las disponibilidades de todos los dias desde localStorage
    let arryLocalStorageDispo = this.getArryDisponibilidad();

    // Obtengo el objeto de disponibilidad para del día seleccionado
    let objDisp = arryLocalStorageDispo.find((el) => el.getNumDia() == dia - 1);

    //Obtengo el objeto con la información del tipo de atención seleccionado
    let objAt = this.getArryTipoDeAtencion().find(
      (el) => el.getNumAtencion() == tipoAtencion - 1
    );

    // Valido la disponibilidad de acuerdo al día seleccionado y el tipo de atención
    if (objDisp.getMinDisponible() - objAt.getDuracionMin() < 0) {
      return 0;
    }

    // Actualizo los minutos disponibles
    objDisp.setMinDisponible(
      objDisp.getMinDisponible() - objAt.getDuracionMin()
    );

    // Actualizo en localSorage la disponibilidad
    localStorage.setItem(
      "AppTurno-Disponibilidad",
      JSON.stringify(arryLocalStorageDispo)
    );

    // Actualizo en localSotrage el turno
    arryLocalStorageTurno.push(
      new Turno(
        dni,
        nombre,
        objDisp.getNumDia(),
        objDisp.getNomDia(),
        objAt.getNumAtencion(),
        objAt.getNomAtencion(),
        objAt.getDuracionMin()
      )
    );

    localStorage.setItem(
      "AppTurno-Turnos",
      JSON.stringify(arryLocalStorageTurno)
    );
    return 1;
  }

  // Devuelve array desde localStorage con los dias y la disponibilidad registrados
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

  // Devuelve array desde localStorage los tipo de atencion con duracion registrados
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

  // Devuelve array desde localStorage los turnos registrados
  getArryTurnos() {
    let arryTurnos = [];
    if (localStorage.getItem("AppTurno-Turnos") != null) {
      JSON.parse(localStorage.getItem("AppTurno-Turnos")).forEach((el) => {
        arryTurnos.push(
          new Turno(
            el.dni,
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
