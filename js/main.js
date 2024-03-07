alert("Bienvenido al Sistema de Turnos de 🏥 MiSalud 🏥");
let opc = 0;
let conf = 0;

let controller = new Controller();

// bucle interactivo que visualiza el menú y realiza una acción dependiento de lo seleccionado
while (opc != 5) {
  // menú del sistema
  opc = Number(
    prompt(
      `📌 Ingrese una opción: 📌 
      1. ⚙️Seteo Configuración
      2. 📝 Cargar Turnos
      3. ⏱️ Consulta Disponibilidad
      4. 📊 Reporte Turnos Asignados    
      5. 🛫 Salir`
    )
  );

  // funcionalidad para cada entrada del menú
  switch (opc) {
    case 1: // Seteo Configuración
      if (conf == 0) {
        seteoConfig();
      } else {
        alert(
          `🤚🏻 Solo se puede setear los parámetros 1 vez, para cambiarlos debe salir y volver a ingresar al sistema`
        );
      }
      break;

    case 2: // Carga Turnos
      if (conf != 0) {
        cargaTurno();
      } else {
        alert(
          `🚨 No se puede cargar turnos 🚨
            Primero debe setear la configuración`
        );
      }
      break;

    case 3: // Cns Disponibilidad diaria
      getDisponibilidad();
      break;

    case 4: // Cns Reporte de Turnos por día
      getTurnos();
      break;

    case 5: // Salir
      alert("Gracias por usar el Sistema de Turnos de 🏥 MiSalud 🏥");
      break;

    default:
      alert(
        `🚨 Seleccionó una opción de menú no valida 🚨
             - Solo se permiten números entre 1 y 5`
      );
      break;
  }
}

// Realiza la validación sobre el valor ingresado en los diferentes prompt
function setPrompt(mensaje, min, max) {
  let valor = Number(prompt(`${mensaje}`));

  while (isNaN(valor) || valor < min || valor > max || valor == "") {
    alert(
      `🚨 Seleccionó una opción de menú no valida 🚨
           - Solo se permiten números entre ${min} y ${max}`
    );
    valor = Number(prompt(`${mensaje}`));
  }

  return valor;
}

// Configuración de parámetros iniciales
function seteoConfig() {
  let arryDiasDeAtencion = controller.devuelveDiasDeAtencion();
  for (let i = 0; i < arryDiasDeAtencion.length; i++) {
    let horas = this.setPrompt(
      `⏰ Ingrese la cantidad de horas para el ${arryDiasDeAtencion[i]}`,
      1,
      23
    );
    controller.cargaDisponibilidad(i, horas);
  }

  let arryTiposDeAtencion = controller.devuelveTiposDeAtencion();
  for (let i = 0; i < arryTiposDeAtencion.length; i++) {
    let min = this.setPrompt(
      `🚑 Ingrese la cantidad de minutos de la Atención ${arryTiposDeAtencion[i]}`,
      1,
      1380
    );
    controller.cargaTipoDeAtencion(i, min);
  }

  conf = 1;
}

// Solicita el ingreso de los datos del turno y valida disponibilidad
function cargaTurno() {
  let nombre;
  let dia;
  let tipoAtencion;

  nombre = prompt("🙍🏼‍♂️ Ingrese el nombre del paciente");
  while (nombre == "") {
    alert("🚨 Debe ingresar un nombre 🚨");
    nombre = prompt("🙍🏼‍♂️ Ingrese el nombre del paciente");
  }

  dia = setPrompt(
    `🗓️ Ingrese el día:
          1.Lunes - 2.Martes - 3.Miércoles - 4.Jueves - 5.Viernes `,
    1,
    5
  );

  tipoAtencion = setPrompt(
    `🚑 Ingrese el tipo de Atención:
          1.Corta - 2.Media - 3.Larga`,
    1,
    3
  );

  while (controller.armaListadoTurno(nombre, dia, tipoAtencion) == 0) {
    alert(
      `📌 No hay disponibilidad para el día seleccionado📌
           Seleccione otro día`
    );
    dia = setPrompt(
      `🗓️ Ingrese el día:
            1.Lunes - 2.Martes - 3.Miércoles - 4.Jueves - 5.Viernes`,
      1,
      5
    );
  }
}

// devuelve las horas disponible para atención en cada día
function getDisponibilidad() {
  let disp = controller.getArryDisponibilidad();
  let msg = "";
  disp.forEach((e) => {
    msg =
      msg + `⏰ Horas Disponible ${e.getNomDia()}: ${e.getHsDisponible()}\n`;
  });
  if (msg == "") {
    alert("No se definieron los parámetros iniciales");
  } else {
    alert(msg);
  }
}

// devuelve los turnos cargados por día
function getTurnos() {
  let msg = "";
  let msgTurno = "";
  let arryDisp = controller.getArryDisponibilidad();
  let arryTurnos = controller.getArryTurnos();

  arryDisp.forEach((disp) => {
    msg =
      msg +
      `🗓️ Turnos ${disp.getNomDia()}: (Hs Atención ${disp.getHsAtencion()}) - (Hs Disponible ${disp.getHsDisponible()})\n\r`;

    // recorro el listado de turnos para sacar el día en el que me encuentro
    msgTurno = "";

    arryTurnos
      .filter((turn) => turn.getNumDia() == disp.getNumDia())
      .forEach((e) => {
        msgTurno =
          msgTurno +
          ` - 🙍🏼‍♂️ Nombre: ${e.getPaciente()} - 🚑 Atención: ${e.getNomAtencion()} (${e.getDuracionMin()} min.)\n\r`;
      });

    msg = msg + msgTurno;
  });

  if (msg == "") {
    msg = "No existen turnos cargados";
  }

  alert(msg);
}
