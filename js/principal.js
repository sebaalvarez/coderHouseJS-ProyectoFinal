let conf = 0,
  controller = new Controller();

const $formConf = document.getElementById("formConfig"),
  $formTurno = document.getElementById("formTurno"),
  $secDisponibilidad = document.getElementById("sec-disponibilidad"),
  $tituloDispo = document.getElementById("titulo-disp"),
  $disponibilidadCard = document.querySelector(".card-disponibilidad-content"),
  $turnosTbl = document.getElementById("tblTurnos"),
  $btnConf = document.getElementById("btnConf"),
  $btnAddTurno = document.getElementById("btnAddTurno"),
  $btnDeleteTurno = document.getElementById("btnDeleteTurno"),
  $btnCnsTurn = document.getElementById("btnCnsTurn"),
  $btnReset = document.getElementById("btnReset"),
  $btnSalir = document.getElementById("btnSalir");

// En caso de no haberse logueado redirecciona al login
if (localStorage.getItem("AppTurno-User") == null) {
  location.href = "./login.html";
}

// Mensaje de bienvenida con el nombre del usuario logueado
document.getElementById(
  "userLog"
).innerText = `Bienvenido ${localStorage.getItem("AppTurno-User")}`;

document.getElementById("userImg").src = localStorage.getItem("AppTurno-Img");

// dependiendo en el entorno que nos encontremos presetea los los parámetros iniciales o no
conf = controller.verificaEntorno();

// ~~~~~~~~  EVENTO DE BOTONES  ~~~~~~~~  //
$btnConf.addEventListener("click", (e) => {
  setConfig();
});

$btnAddTurno.addEventListener("click", (e) => {
  limpiarBody();
  cargaTurno();
  getDisponibilidad();
});

$btnDeleteTurno.addEventListener("click", (e) => {
  limpiarBody();
  deleteTurno();
});

$btnCnsTurn.addEventListener("click", (e) => {
  limpiarBody();
  getTurnos();
});

$btnReset.addEventListener("click", (e) => {
  deleteInfo();
});

$btnSalir.addEventListener("click", (e) => {
  Swal.fire({
    title: "¿Esta seguro que desea salir?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      limpiarBody();
      localStorage.removeItem("AppTurno-User");
      localStorage.removeItem("AppTurno-Img");
      location.href = "./login.html";
    }
  });
});

// grabo la configuracion de parametros de acuerdo a los valores introducidos
$formConf.addEventListener("submit", (e) => {
  e.preventDefault();

  let arryDiasDeAtencion = controller.devuelveDiasDeAtencion();
  let arryTiposDeAtencion = controller.devuelveTiposDeAtencion();

  $formConf.querySelectorAll("input").forEach((el, index) => {
    if (index < arryDiasDeAtencion.length) {
      // obtengo la posicion y valor de los input de días de atencion y los guardo
      controller.cargaDisponibilidad(index, el.value);
    } else if (index - arryDiasDeAtencion.length < arryTiposDeAtencion.length) {
      // obtengo la posicion y valor de los input de tipos de atencion y los guardo
      controller.cargaTipoDeAtencion(
        index - arryDiasDeAtencion.length,
        el.value
      );
    }
  });

  mostrarMensaje(`Se grabó correctamente los parámetros iniciales`, "ok");
  // quita el formulario
  borraNodosHijos($formConf);

  // bandera para identificar que ya se cargaron los parámetros iniciales
  conf = 1;
});

// acción botón grabar del formulario de turnos
$formTurno.addEventListener("submit", (e) => {
  e.preventDefault();

  let valorDevuelto = controller.cargarTurno(
    $formTurno.querySelector("input#lblDni").value,
    $formTurno.querySelector("input#lblPaciente").value,
    $formTurno.querySelector("select#selDia").selectedIndex + 1,
    $formTurno.querySelector("select#selAtencion").selectedIndex + 1
  );
  if (valorDevuelto == 0) {
    mostrarMensaje(
      `No hay disponibilidad para el día/atención seleccionado`,
      "error"
    );
    $formTurno.querySelector("select#selDia").focus();
  } else if (valorDevuelto == 2) {
    mostrarMensaje(`Ya existe cargado un turno para ese dni / día`, "error");
    $formTurno.querySelector("input#lblDni").focus();
  } else {
    $formTurno.querySelector("input#lblPaciente").value = "";
    $formTurno.querySelector("input#lblDni").value = "";
    $formTurno.querySelector("input#lblDni").focus();
    mostrarMensaje(`Se grabó correctamente el turno`, "ok");

    // Refresca las disponibilidades
    borraNodosHijos($disponibilidadCard);
    getDisponibilidad();
  }
});

// acción botón eliminar turnos
$turnosTbl.addEventListener("click", (e) => {
  if (e.target.matches("button.btn-delete")) {
    Swal.fire({
      title: "¿Esta seguro que desea borrar el turno?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // llamo función que elimina turno del localStorage y le paso array del id
        controller.deleteTurno(
          e.target.parentNode.parentNode
            .getAttribute("data-attribute-id")
            .split("_")
        );

        mostrarMensaje(`Se quito correctamente el turno`, "ok");

        // elimino el turno del html
        limpiarBody();
        deleteTurno();
      }
    });
  }
});
// ~~~~~~~~  FIN EVENTO DE BOTONES  ~~~~~~~~  //

// ~~~~~~~~  FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //
function mostrarMensaje(text, tipo) {
  let color =
    tipo == "ok"
      ? "linear-gradient(90deg, #49bb08 100%, #6ed136 100%)"
      : "linear-gradient(90deg, rgb(245,5,5) 0%, rgb(190,40,1) 100%)";

  Toastify({
    text: text,
    duration: 5500,

    style: {
      maxWidth: "400px",
      color: "white",
      background: color,
    },
  }).showToast();
}

function limpiarBody() {
  borraNodosHijos($formConf);
  borraNodosHijos($formTurno);
  borraNodosHijos($secDisponibilidad);
  borraNodosHijos($disponibilidadCard);
  borraNodosHijos($turnosTbl);
  $secDisponibilidad.classList = "";
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
      `Solo se puede setear los parámetros 1 vez, para cambiarlos debe borrar la información`,
      "error"
    );
    return;
  }
  limpiarBody();

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
}

// Solicita el ingreso de los datos del turno y valida disponibilidad
function cargaTurno() {
  if (conf == 0) {
    // si no fueron definidos los parametros iniciales no permito la carga de turnos
    return;
  }

  // arma formulario de carga de turnos
  let texto = `
      <h2>📅 Carga de Turnos 📅</h2>
      <div>
      <label for="lblDni">DNI</label>
        <input type="number" id="lblDni" required="true"></input>
        <label for="lblPaciente">Nombre</label>
        <input type="text" id="lblPaciente" required="true"></input>
      </div>
      <div>
        <label for="selDia">Día</label>
        <select id="selDia">`;

  let arryDiasDeAtencion = controller.devuelveDiasDeAtencion();

  for (let i = 0; i < arryDiasDeAtencion.length; i++) {
    // cargo el combo con los dias de atencion
    texto += `<option>${arryDiasDeAtencion[i]}</option>`;
  }

  texto += `</select>
        <label for="selAtencion">Tipo de Atención</label>
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
  $formTurno.querySelector("input#lblDni").focus();
}

// Elimina un turno
function deleteTurno() {
  let cantTurnos = 0;

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
      .forEach((e, ind) => {
        if (ind == 0) {
          tbl += `<tr class="row-paciente-hd">
            <td class="cel-paciente"> Num Doc</td>
            <td class="cel-paciente"> Nombre</td>
            <td class="cel-paciente"> Atención </td>
            </tr>`;
        }

        tbl += `<tr class="row-paciente" data-attribute-id="${e.numDia}_${
          e.dni
        }_${e.numAtencion}">
            <td class="cel-paciente-dni"> ${e.dni}</td>
            <td class="cel-paciente"> ${e.paciente} </td>
            <td class="cel-paciente"> ${e.getNomAtencion()} (${e.getDuracionMin()} min.) </td>
            <td class="cel-paciente-btn1"> <button  class = "btn-delete">   </button> </td>
            </tr>`;

        cantTurnos++;
      });
    tbl += `</table>`;

    $turnosTbl.innerHTML = tbl;
  });

  if (cantTurnos == 0) {
    mostrarMensaje(`No hay turnos asignados`, "error");
  }
}

// Devuelve las horas disponible para atención en cada día
function getDisponibilidad() {
  if (conf == 0) {
    mostrarMensaje(`No hay horas cargadas para atención`, "error");
    return;
  }

  const $fragmentDisp = document.createDocumentFragment();

  controller.getArryDisponibilidad().forEach((e) => {
    let clon = document
      .getElementById("template-disponibilidad")
      .content.cloneNode(true);

    clon.querySelector("h4").innerText = e.getNomDia();
    clon.querySelector("p").innerText = `${e.getHsDisponible()} Hs.`;

    $fragmentDisp.append(clon);
  });
  $disponibilidadCard.append($fragmentDisp);

  $tituloDispo.innerText = "Disponibilidades";
  $secDisponibilidad.append($tituloDispo);
  $secDisponibilidad.append($disponibilidadCard);
  $secDisponibilidad.classList = "sec-disponibilidad";
}

// Devuelve los turnos cargados por día
function getTurnos() {
  let cantTurnos = 0;

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
      .forEach((e, ind) => {
        if (ind == 0) {
          tbl += `<tr class="row-paciente-hd-1">
            <td class="cel-paciente"> Num Doc</td>
            <td class="cel-paciente"> Nombre</td>
            <td class="cel-paciente"> Atención </td>
            </tr>`;
        }
        tbl += `<tr class="row-paciente">
            <td class="cel-paciente"> ${e.dni}</td>
            <td class="cel-paciente"> ${e.paciente} </td>
            <td class="cel-paciente"> ${e.getNomAtencion()} (${e.getDuracionMin()} min.) </td>
            </tr>`;

        cantTurnos++;
      });
    tbl += `</table>`;

    $turnosTbl.innerHTML = tbl;
  });

  if (cantTurnos == 0) {
    mostrarMensaje(`No hay turnos asignados`, "error");
  }
}

// Elimina toda la configuración inicial
function deleteInfo() {
  if (conf == 0) {
    mostrarMensaje(`No hay horas cargadas para atención`, "error");
    return;
  }

  Swal.fire({
    title: "¿Esta seguro que desea borrar toda la información?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      limpiarBody();
      localStorage.removeItem("AppTurno-Turnos");
      localStorage.removeItem("AppTurno-Disponibilidad");
      localStorage.removeItem("AppTurno-TipoAtencion");
      conf = 0;
    }
  });
}
// ~~~~~~~~  FIN FUNCIONES LLAMADAS DESDE LOS BOTONES ~~~~~~~~  //
