alert("Bienvenido al Sistema de Turnos de 🏥 MiSalud 🏥");
let opc = 0;
let conf = 0;

let atCorta = 0;
let atMedia = 0;
let atLarga = 0;

let horasLun = 0;
let horasMar = 0;
let horasMie = 0;
let horasJue = 0;
let horasVie = 0;

let dispLun = 0;
let dispMar = 0;
let dispMie = 0;
let dispJue = 0;
let dispVie = 0;

let turnosLun = "";
let turnosMar = "";
let turnosMie = "";
let turnosJue = "";
let turnosVie = "";

// bucle interactivo que visualiza el menú
while (opc != 5) {
  // menú del sistema
  opc = Number(
    prompt(
      "📌 Ingrese una opción: 📌 \n     1. ⚙️Seteo Configuración \n     2. 📝 Cargar Turnos \n     3. ⏱️ Consulta Disponibilidad \n     4. 📊 Reporte Turnos Asignados \n     5. 🛫 Salir"
    )
  );

  // funcionalidad para cada entrada del menú
  switch (opc) {
    case 1: // Seteo Configuración
      if (conf == 0) {
        seteoConfig();
      } else {
        alert(
          `🤚🏻 Solo se puede setear los parámetros 1 vez, para cambiarlos debe salir y volver a ingresar al sistema\n Valores seteados: \n   - Horas Lunes: ${horasLun}\n   - Horas Martes: ${horasMar}\n   - Horas Miércoles: ${horasMie}\n   - Horas Jueves: ${horasJue}\n   - Horas Viernes: ${horasVie}\n   - Minutos Atención Corta: ${atCorta}\n   - Minutos Atención Media: ${atMedia}\n   - Minutos Atención Larga: ${atLarga}`
        );
      }
      break;

    case 2: // Carga Turnos
      if (conf != 0) {
        cargaTurno();
      } else {
        alert(
          "🚨 No se puede cargar turnos 🚨\n    Primero debe setear la configuración"
        );
      }
      break;

    case 3: // Cns Disponibilidad
      getDisponibilidad();
      break;

    case 4: // Reporte de Turnos
      getTurnos();
      break;

    case 5: // Salir
      alert("Gracias por usar el Sistema de Turnos de 🏥 MiSalud 🏥");
      break;

    default:
      opcionNoValida(1, 5);
      break;
  }
}

function seteoConfig() {
  // configuración de parámetros iniciales
  horasLun = setPrompt("⏰ Ingrese la cantidad de horas para el Lunes", 1, 23);
  horasMar = setPrompt("⏰ Ingrese la cantidad de horas para el Martes", 1, 23);
  horasMie = setPrompt(
    "⏰ Ingrese la cantidad de horas para el Miércoles",
    1,
    23
  );
  horasJue = setPrompt("⏰ Ingrese la cantidad de horas para el Jueves", 1, 23);
  horasVie = setPrompt(
    "⏰ Ingrese la cantidad de horas para el Viernes",
    1,
    23
  );

  atCorta = setPrompt(
    "🚑 Ingrese la cantidad de minutos de la Atención Corta",
    1,
    1380
  );
  atMedia = setPrompt(
    "🚑 Ingrese la cantidad de minutos de la Atención Media",
    1,
    1380
  );
  atLarga = setPrompt(
    "🚑 Ingrese la cantidad de minutos de la Atención Larga",
    1,
    1380
  );

  dispLun = horasLun * 60;
  dispMar = horasMar * 60;
  dispMie = horasMie * 60;
  dispJue = horasJue * 60;
  dispVie = horasVie * 60;

  conf = 1;
}

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
    "🗓️ Ingrese el día:\n        1.Lunes - 2.Martes - 3.Miércoles - 4.Jueves - 5.Viernes ",
    1,
    5
  );

  tipoAtencion = setPrompt(
    "🚑 Ingrese el tipo de Atención:\n        1.Corta - 2.Media - 3.Larga",
    1,
    3
  );

  while (armaListadoTurno(nombre, dia, tipoAtencion) == 0) {
    alert(
      `📌 No hay disponibilidad para el día ${getNomDia(
        dia
      )} 📌\n     Seleccione otro día`
    );
    dia = setPrompt(
      "🗓️ Ingrese el día:\n        1.Lunes - 2.Martes - 3.Miércoles - 4.Jueves - 5.Viernes ",
      1,
      5
    );
  }
}

function opcionNoValida(min, max) {
  alert(
    `🚨 Seleccionó una opción de menú no valida 🚨\n - Solo se permiten números entre ${min} y ${max}`
  );
}

function armaListadoTurno(nombre, dia, tipoAtencion) {
  switch (dia) {
    case 1:
      if (dispLun - getDuracionAtencion(tipoAtencion) < 0) {
        return 0;
      } else {
        dispLun = dispLun - getDuracionAtencion(tipoAtencion);
        turnosLun = turnosLun + armaTexto(nombre, tipoAtencion);
      }
      break;

    case 2:
      if (dispMar - getDuracionAtencion(tipoAtencion) < 0) {
        return 0;
      } else {
        dispMar = dispMar - getDuracionAtencion(tipoAtencion);
        turnosMar = turnosMar + armaTexto(nombre, tipoAtencion);
      }
      break;

    case 3:
      if (dispMie - getDuracionAtencion(tipoAtencion) < 0) {
        return 0;
      } else {
        dispMie = dispMie - getDuracionAtencion(tipoAtencion);
        turnosMie = turnosMie + armaTexto(nombre, tipoAtencion);
      }
      break;

    case 4:
      if (dispJue - getDuracionAtencion(tipoAtencion) < 0) {
        return 0;
      } else {
        dispJue = dispJue - getDuracionAtencion(tipoAtencion);
        turnosJue = turnosJue + armaTexto(nombre, tipoAtencion);
      }
      break;

    case 5:
      if (dispVie - getDuracionAtencion(tipoAtencion) < 0) {
        return 0;
      } else {
        dispVie = dispVie - getDuracionAtencion(tipoAtencion);
        turnosVie = turnosVie + armaTexto(nombre, tipoAtencion);
      }
      break;

    default:
      break;
  }
}

function armaTexto(nom, at) {
  return `- 🙍🏼‍♂️ Nombre: ${nom} - 🚑 Atención: ${getNomAtencion(
    at
  )} (${getDuracionAtencion(at)} min.)\n  `;
}

function getTurnos() {
  alert(
    `🗓️ Turnos Lunes: (Hs Atención ${horasLun}) - (Hs Disponible ${
      dispLun / 60
    })
    ${turnosLun}
    \n🗓️ Turnos Martes: (Hs Atención ${horasMar}) - (Hs Disponible ${
      dispMar / 60
    })
    ${turnosMar}
    \n🗓️ Turnos Miércoles: (Hs Atención ${horasMie}) - (Hs Disponible ${
      dispMie / 60
    })
    ${turnosMie}
    \n🗓️ Turnos Jueves: (Hs Atención ${horasJue}) - (Hs Disponible ${
      dispJue / 60
    })
    ${turnosJue}
    \n🗓️ Turnos Viernes: (Hs Atención ${horasVie}) - (Hs Disponible ${
      dispVie / 60
    })
    ${turnosVie}`
  );
}

function getDisponibilidad() {
  alert(
    `⏰ Horas Disponible Lunes: ${dispLun / 60}\n⏰ Horas Disponible Martes: ${
      dispMar / 60
    }\n⏰ Horas Disponible Miércoles: ${
      dispMie / 60
    }\n⏰ Horas Disponible Jueves: ${
      dispJue / 60
    }\n⏰ Horas Disponible Viernes: ${dispVie / 60}`
  );
}

function getDuracionAtencion(tipoAtencion) {
  if (tipoAtencion == 1) return atCorta;
  if (tipoAtencion == 2) return atMedia;
  if (tipoAtencion == 3) return atLarga;
  return 0;
}

function getNomDia(dia) {
  if (dia == 1) return "Lunes";
  if (dia == 2) return "Martes";
  if (dia == 3) return "Miércoles";
  if (dia == 4) return "Jueves";
  if (dia == 5) return "Viernes";
  return "Día No Definido";
}

function getNomAtencion(at) {
  if (at == 1) return "Corta";
  if (at == 2) return "Media";
  if (at == 3) return "Larga";
  return "Atención No Definida";
}

function setPrompt(mensaje, min, max) {
  // realiza la validación sobre el valor ingresado en los diferentes prompt
  let valor = Number(prompt(`${mensaje}`));

  while (isNaN(valor) || valor < min || valor > max || valor == "") {
    opcionNoValida(min, max);
    valor = Number(prompt(`${mensaje}`));
  }

  return valor;
}
