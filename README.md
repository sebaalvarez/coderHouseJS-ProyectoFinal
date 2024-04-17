## Proyecto seleccionado: _Sistema de carga de turnos para un consultorio_

⚙️ **Funcionalidad** ⚙️

- En el index se va visualizar la landing page institucional en donde arriba a la derecha tiene un botón para ingresar al sistema

- Al ingresar al sistema tenemos la pantalla de login (los usuarios registrados se encuentran pre cargados en el archivo usuarios.json en la ruta js>>db) Estos usuarios se muestran abajo del formulario de login.

- Al loguearse correctamente se muestra la pantalla del sistema con los siguientes botones de funcionalidad: (en caso de no encontrarse logueado, si se accede a esta pantalla se redirige al login)

  1. Seteo de configuración inicial: se define la cantidad de horas de atención por día y la duración de cada tipo de atención

     - Ingresar la cantidad de horas de atención para cada día de la semana (los días disponibles los toma del archivo mockup.js en la ruta js>>db) solo se permiten ingresar números de 0 a 23
     - Ingresar la duración en minutos de cada tipo de atención (los tipos de atención los toma del archivo mockup.js en la ruta js>>db) solo se permiten ingresar números de 1 a 1380 (que se corresponde a 23 horas)

  2. Carga de turnos: se debe ingresar la siguiente información (esta funcionalidad se habilita una vez seteada la configuración inicial)

  - Número de DNI
  - Nombre del paciente
  - Día de la semana
  - Tipo de atención

  3. Eliminar turno cargado (esta funcionalidad se habilita una vez seteada la configuración inicial)

     - Listado de turnos asignados separados por días

  4. Consultar turnos: Reporte de turnos asignados (esta funcionalidad se habilita una vez seteada la configuración inicial)

     - Listado de turnos separado por días donde se muestre:
       - Nombre del día, total de horas de atención del día y horas disponibles
       - Número de DNI | Nombre del paciente | tipo de atención

  5. Borrar información: elimina todos los datos cargados

  6. Salir del sistema

---

📌 **Consideraciones** 📌

- Los turnos se agendan de acuerdo a los ingresos (no se asignan por horarios)
- Cuando se cumple la cantidad de horas disponibles de atención para un día se debe informar que no se permiten registrar más turnos para dicho día solicitando se ingrese otro día o tipo de atención
- Si se ingresa un número de dni que ya se encuentra registrado para ese día se informa y no permite grabarlo
- Validar que al ingresar un día solo se permita ingresar los valores definidos
- Validar que al ingresar un tipo de atención solo se permita ingresar los valores definidos

---

# Estructura

La programación está estructurada en diferentes carpetas para separar la parte visual y la lógica de negocio en diferentes capas:

- capa de interconectividad con la parte visual
- controladores: donde se maneja toda la lógica del negocio y hace de intermediario entre lo visual y los objetos y datos
- modelos: agrupa todos los objetos
- datos: simula la persistencia

Los datos que se cargan o actualizan son almacenados en localStorage bajo diferentes claves

Los formularios que se muestran para la inserción de datos se arman de forma dinámica de acuerdo a los datos que se encuentran en el archivo mockup.js

Los usuarios para loguearse en el sistema se encuentran en el archivo usuarios.json
