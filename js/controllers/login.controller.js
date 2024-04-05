class Controller {
  arryUsuarios = [];

  constructor() {
    this.mockup = new Mockup();
  }

  // Obtengo y devuelvo los usuarios registrados
  devuelveUsuarios() {
    return this.mockup.getUsuarios();
  }

  // verifica si el usuario y pass son correctos, devuelve 1 si es correcto y 0 si es incorrecto
  buscarUsuario(user, pass) {
    return this.devuelveUsuarios().find((e) => {
      if (e.user == user && e.pass == pass) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
