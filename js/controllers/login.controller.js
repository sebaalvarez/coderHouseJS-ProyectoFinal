class Controller {
  constructor() {}

  // verifica si el usuario y pass son correctos, devuelve 1 si es correcto y 0 si es incorrecto
  async buscarUsuario(user, pass) {
    let listUsers = await this.devuelveUsuarios();
    return listUsers.find((e) => {
      if (e.user == user && e.pass == pass) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  // Obtengo y devuelvo los usuarios registrados
  async devuelveUsuarios() {
    try {
      let url = "../js/db/usuarios.json";
      let resp = await fetch(url);
      let data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
