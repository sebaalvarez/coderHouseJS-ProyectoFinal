let conf = 0,
  controller = new Controller();

const $formConf = document.getElementById("formConfig"),
  $formTurno = document.getElementById("formTurno"),
  $disponibilidad = document.getElementById("disponibilidad"),
  // $turnos = document.getElementById("turnos"),
  $turnosTbl = document.getElementById("tblTurnos"),
  $btnConf = document.getElementById("btnConf"),
  $btnAddTurno = document.getElementById("btnAddTurno"),
  $btnCnsDispo = document.getElementById("btnCnsDispo"),
  $btnCnsTurn = document.getElementById("btnCnsTurn"),
  $btnSalir = document.getElementById("btnSalir");

// En caso de no haberse logueado redirecciona al login
if (localStorage.getItem("AppTurno-User") == null) {
  location.href = "./login.html";
}

// Mensaje de bienvenida con el nombre del usuario logueado
document.getElementById(
  "userLog"
).innerText = `Bienvenido ${localStorage.getItem("AppTurno-User")}`;

// ~~~~~~~~  EVENTO DE BOTONES DEL MENU ~~~~~~~~  //
$btnConf.addEventListener("click", (e) => {
  limpiarBody();
  setConfig();
});

$btnAddTurno.addEventListener("click", (e) => {
  limpiarBody();
  cargaTurno();
});

$btnCnsDispo.addEventListener("click", (e) => {
  limpiarBody();
  getDisponibilidad();
});

$btnCnsTurn.addEventListener("click", (e) => {
  limpiarBody();
  getTurnos();
});

$btnSalir.addEventListener("click", (e) => {
  let salir = confirm("¿Está seguro que desea salir del sistema");
  if (salir) {
    limpiarBody();
    localStorage.removeItem("AppTurno-User");
    location.href = "./login.html";
  }
});
// ~~~~~~~~  FIN EVENTO DE BOTONES DEL MENU ~~~~~~~~  //

// ~~~~~~~~  FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //
function limpiarBody() {
  borraNodosHijos($formConf);
  borraNodosHijos($formTurno);
  borraNodosHijos($disponibilidad);
  borraNodosHijos($turnosTbl);
}

function mostrarMensaje(text) {
  document.getElementById("mensaje").innerText = text;
  document.getElementById("mensaje").setAttribute("style", "display:flex");
  setTimeout(() => {
    document.getElementById("mensaje").innerText = "";
    document.getElementById("mensaje").setAttribute("style", "display:none");
  }, 4000);
}

function borraNodosHijos(nodo) {
  while (nodo.hasChildNodes()) {
    borradoRecursivo(nodo.firstChild);
  }
}

function borradoRecursivo(nodo) {
  while (nodo.hasChildNodes()) {
    borradoRecursivo(nodo.firstChild);
  }
  nodo.parentNode.removeChild(nodo);
}
// ~~~~~~~~  FIN FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //

// ~~~~~~~~  FUNCIONES LLAMADAS DESDE LOS BOTONES ~~~~~~~~  //
// Configuración de parámetros iniciales
function setConfig() {
  if (conf != 0) {
    mostrarMensaje(
      `🤚🏻 Solo se puede setear los parámetros 1 vez, para cambiarlos debe salir y volver a ingresar al sistema`
    );
    return;
  }
  // armo formulario con los campos necesarios de acuerdo a los dias de atencion
  let tituloDias = document.createElement("h2");
  tituloDias.innerText = `⏰ Horas de Atención por Día ⏰`;
  $formConf.append(tituloDias);

  let arryDiasDeAtencion = controller.devuelveDiasDeAtencion();

  for (let i = 0; i < arryDiasDeAtencion.length; i++) {
    let div = document.createElement("div");

    let lbl = document.createElement("label");
    lbl.setAttribute("for", `lbl${arryDiasDeAtencion[i]}`);
    lbl.innerText = `🗓️ ${arryDiasDeAtencion[i]}`;
    div.append(lbl);

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", `lbl${arryDiasDeAtencion[i]}`);
    input.setAttribute("required", "true");
    input.setAttribute("min", "0");
    input.setAttribute("max", "23");
    div.append(input);

    $formConf.append(div);
  }

  // armo formulario con los campos necesarios de acuerdo a los tipos de atencion
  let tituloTipoA = document.createElement("h2");
  tituloTipoA.innerText = `⏰ Minutos de Duración para Cada Tipo de Atención ⏰`;
  $formConf.append(tituloTipoA);

  let arryTiposDeAtencion = controller.devuelveTiposDeAtencion();

  for (let i = 0; i < arryTiposDeAtencion.length; i++) {
    let div = document.createElement("div");

    let lbl = document.createElement("label");
    lbl.setAttribute("for", `lbl${arryTiposDeAtencion[i]}`);
    lbl.innerText = `🚑  ${arryTiposDeAtencion[i]}`;
    div.append(lbl);

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", `lbl${arryTiposDeAtencion[i]}`);
    input.setAttribute("required", "true");
    input.setAttribute("min", "1");
    input.setAttribute("max", "1380");
    div.append(input);
    $formConf.append(div);
  }

  let btn = document.createElement("input");
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", `💾 Grabar`);
  btn.setAttribute("class", "btnForm");
  $formConf.append(btn);

  // grabo la configuracion de parametros de acuerdo a los valores introducidos
  $formConf.addEventListener("submit", (e) => {
    e.preventDefault();

    $formConf.querySelectorAll("input").forEach((el, index) => {
      if (index < arryDiasDeAtencion.length) {
        // obtengo la posicion y valor de los input de días de atencion y los guardo
        controller.cargaDisponibilidad(index, el.value);
      } else if (
        index - arryDiasDeAtencion.length <
        arryTiposDeAtencion.length
      ) {
        // obtengo la posicion y valor de los input de tipos de atencion y los guardo
        controller.cargaTipoDeAtencion(
          index - arryDiasDeAtencion.length,
          el.value
        );
      }
      mostrarMensaje(`✅ Se grabó correctamente los parámetros iniciales`);
    });

    // quita el formulario
    borraNodosHijos($formConf);

    // bandera para identificar que ya se cargaron los parámetros iniciales
    conf = 1;
  });
}

// Solicita el ingreso de los datos del turno y valida disponibilidad
function cargaTurno() {
  if (conf == 0) {
    // si no fueron definidos los parametros iniciales no permito la carga de turnos
    mostrarMensaje(`🚨 Se debe definir los parámetros en configuración`);
    return;
  }

  // arma formulario de carga de turnos
  let texto = `
      <h2>📅 Carga de Turnos 📅</h2>
      <div>
        <label for="lblPaciente">🙍🏼‍♂️ Nombre del paciente</label>
        <input type="text" id="lblPaciente" required="true"></input>
      </div>
      <div>
        <label for="selDia">🗓️ Día</label>
        <select id="selDia">`;

  let arryDiasDeAtencion = controller.devuelveDiasDeAtencion();

  for (let i = 0; i < arryDiasDeAtencion.length; i++) {
    // cargo el combo con los dias de atencion
    texto += `<option>${arryDiasDeAtencion[i]}</option>`;
  }

  texto += `</select>
        <label for="selAtencion">🚑 Tipo de Atención</label>
        <select id="selAtencion">`;

  let arryTiposDeAtencion = controller.devuelveTiposDeAtencion();

  for (let i = 0; i < arryTiposDeAtencion.length; i++) {
    // cargo el combo de los tipos de atencion
    texto += `<option>${arryTiposDeAtencion[i]}</option>`;
  }

  texto += `
        </select>
      </div>
      <input type="submit" value="💾 Grabar" class="btnForm"></input>
      `;

  $formTurno.innerHTML = texto;

  // acción del botón grabar
  $formTurno.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      controller.validarGrabarTurno(
        $formTurno.querySelector("input#lblPaciente").value,
        $formTurno.querySelector("select#selDia").selectedIndex + 1,
        $formTurno.querySelector("select#selAtencion").selectedIndex + 1
      ) == 0
    ) {
      mostrarMensaje(
        `❌ No hay disponibilidad para el día / atención seleccionado, modifique el día o tipo de atención`
      );
    } else {
      $formTurno.querySelector("#lblPaciente").value = "";
      mostrarMensaje(`✅ Se grabó correctamente el turno`);
      borraNodosHijos($formTurno);
    }
  });
}

// devuelve las horas disponible para atención en cada día
function getDisponibilidad() {
  controller.getArryDisponibilidad().forEach((e) => {
    let li = document.createElement("li");
    li.innerText = `⏰ Horas Disponible ${e.getNomDia()}: ${e.getHsDisponible()}`;
    $disponibilidad.append(li);
  });

  if ($disponibilidad.childElementCount == 0) {
    mostrarMensaje(`🚨 No hay horas cargadas para atención`);
  }
}

// devuelve los turnos cargados por día
function getTurnos() {
  // let li_dia;
  let cantTurnos = 0;

  // // recorro el array con los días
  // controller.getArryDisponibilidad().forEach((disp) => {
  //   li_dia = document.createElement("li");
  //   li_dia.innerText = `🗓️ Turnos ${disp.getNomDia()}: (Hs Atención ${disp.getHsAtencion()}) - (Hs Disponible ${disp.getHsDisponible()})`;
  //   $turnos.append(li_dia);

  //   // recorro el array de turnos filtrando por el día en el que me encuentro para obtener los turnos dados es ese día
  //   controller
  //     .getArryTurnos()
  //     .filter((turn) => turn.getNumDia() == disp.getNumDia())
  //     .forEach((e) => {
  //       let li_paciente = document.createElement("li");
  //       li_paciente.innerText = `___🙍🏼‍♂️ Nombre: ${e.getPaciente()} - 🚑 Atención: ${e.getNomAtencion()} (${e.getDuracionMin()} min.)`;
  //       li_dia.append(li_paciente);
  //       cantTurnos++;
  //     });
  // });

  // recorro el array con los días
  let tbl = `<table>`;
  controller.getArryDisponibilidad().forEach((disp) => {
    tbl += `<tr class="row-dia">
        <td colspan="3" > 🗓️ Turnos ${disp.getNomDia()} - (Hs Atención ${disp.getHsAtencion()}) - (Hs Disponible ${disp.getHsDisponible()}) </td> 
      </tr>`;

    // recorro el array de turnos filtrando por el día en el que me encuentro para obtener los turnos dados es ese día
    controller
      .getArryTurnos()
      .filter((turn) => turn.getNumDia() == disp.getNumDia())
      .forEach((e) => {
        tbl += `<tr class="row-paciente">
            <td></td>
            <td> 🙍🏼‍♂️ Nombre: ${e.getPaciente()} </td>
            <td> 🚑 Atención: ${e.getNomAtencion()} (${e.getDuracionMin()} min.) </td>
            </tr>`;

        cantTurnos++;
      });
    tbl += `</table>`;

    $turnosTbl.innerHTML = tbl;
  });

  if (cantTurnos == 0) {
    mostrarMensaje(`🚨 No hay turnos asignados`);
  }
}
// ~~~~~~~~  FIN FUNCIONES LLAMADAS DESDE LOS BOTONES ~~~~~~~~  //
