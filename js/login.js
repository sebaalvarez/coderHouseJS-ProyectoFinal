let controller = new Controller();
const $formLogin = document.getElementById("formLogin");

// ~~~~~~~~  EVENTO DE BOTONES  ~~~~~~~~  //
$formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userF = $formLogin.querySelector("#lblUsuario").value;
  let pass = $formLogin.querySelector("#lblPass").value;
  let userJSON = await controller.buscarUsuario(userF, pass);
  if (userJSON == undefined) {
    mostrarMensaje(`credenciales incorrectas`, "error");
  } else {
    let { user, img } = userJSON;
    localStorage.setItem("AppTurno-User", user);
    localStorage.setItem("AppTurno-Img", img);
    location.href = "./principal.html";
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
// ~~~~~~~~  FIN FUNCIONES COMPLEMENTARIAS ~~~~~~~~  //

getApi();

// UTILIZANDO ASYNC AWAIT
async function getApi() {
  try {
    let url = "../js/db/usuarios.json";
    // let url = "https://pokeapi.co/api/v2/pokemon/ditto";
    let resp = await fetch(url);
    let data = await resp.json();
    render(data);
  } catch (err) {
    console.log(err);
  }
}

function render(data) {
  const $fragment = document.createDocumentFragment();
  data.forEach((e, i) => {
    let clon = document.querySelector("template").content.cloneNode(true);

    clon.querySelector("h5").innerText = `User: ${data[i].user}`;
    clon.querySelector("img").src = data[i].img;
    clon.querySelector("p").innerText = `Pass: ${data[i].pass}`;

    $fragment.appendChild(clon);
  });
  document.querySelector(".card-content").append($fragment);
}
