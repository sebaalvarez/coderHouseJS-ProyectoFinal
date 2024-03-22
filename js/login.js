let controller = new Controller();
const $formLogin = document.getElementById("formLogin");

// ~~~~~~~~  EVENTO DE BOTONES  ~~~~~~~~  //
$formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = $formLogin.querySelector("#lblUsuario").value;
  let pass = $formLogin.querySelector("#lblPass").value;
  if (controller.buscarUsuario(user, pass) == undefined) {
    mostrarMensaje(`❌ credenciales incorrectas`, "error");
  } else {
    localStorage.setItem("AppTurno-User", user);
    location.href = "./principal.html";
  }
});
// ~~~~~~~~  FIN EVENTO DE BOTONES  ~~~~~~~~  //

// ~~~~~~~~  FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //
function mostrarMensaje(text) {
  document.getElementById("mensaje").innerText = text;
  document.getElementById("mensaje").setAttribute("style", "display:flex");
  setTimeout(() => {
    document.getElementById("mensaje").innerText = "";
    document.getElementById("mensaje").setAttribute("style", "display:none");
  }, 4000);
}
// ~~~~~~~~  FIN FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //
