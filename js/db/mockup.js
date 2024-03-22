class Mockup {
  constructor() {}

  dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  tiposAtencion = ["Corta", "Media", "Larga"];

  usuarios = [
    { user: "pepe", pass: "123" },
    { user: "jose", pass: "321" },
    { user: "pedro", pass: "135" },
    { user: "juan", pass: "246" },
  ];

  getDias() {
    return this.dias;
  }

  getTiposDeAtencion() {
    return this.tiposAtencion;
  }

  getUsuarios() {
    return this.usuarios;
  }
}
