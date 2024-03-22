class Controller {
  arryUsuarios = [];

  constructor() {
    this.mockup = new Mockup();
  }

  // Lista de días que se pueden configurar
  devuelveUsuarios() {
    return this.mockup.getUsuarios();
  }

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
