## Proyecto seleccionado: _Sistema de carga de turnos para un consultorio_

⚙️ **Funcionalidad** ⚙️

- En el index se va visualizar la landing page institucional en donde arriba a la derecha tiene un botón para ingresar al sistema

- Al ingresar al sistema tenemos la pantalla de login (los usuarios registrados se encuentran pre cargados en el archivo mockup.js en la ruta js>>db) Ej pepe 123

- Al loguearse correctamente se muestra la pantalla del sistema con los siguientes botones de funcionalidad: (en caso de no encontrarse logueado, si se accede a esta pantalla se redirige al login)

  1. Seteo de configuración inicial: se define la cantidad de horas de atención por día y la duración de cada tipo de atención

     - Ingresar la cantidad de horas de atención para cada día de la semana (los días disponibles los toma del archivo mockup.js en la ruta js>>db)
     - Ingresar la duración en minutos de cada tipo de atención (los tipos de atención los toma del archivo mockup.js en la ruta js>>db)

  2. Carga de turnos: se debe ingresar la siguiente información (esta funcionalidad se habilita una vez seteada la configuración inicial)

     - Nombre del paciente
     - Día de la semana
     - Tipo de atención

  3. Consulta horas disponibles por día (esta funcionalidad se habilita una vez seteada la configuración inicial)

     - Listado de días y horas disponibles para atención

  4. Reporte de turnos asignados (esta funcionalidad se habilita una vez seteada la configuración inicial)

     - Listado de turnos separado por días donde se muestre:
       - Nombre del día, total de horas de atención del día y horas disponibles
       - Nombre del paciente | tipo de atención

  5. Salir del sistema

---

📌 **Consideraciones** 📌

- Los turnos se agendan de acuerdo a los ingresos (no se asignan por horarios)
- Cuando se cumple la cantidad de horas disponibles de atención para un día se debe informar que no se permiten registrar más turnos para dicho día solicitando se ingrese otro día o tipo de atención
- Validar que al ingresar un día solo se permita ingresar los valores definidos
- Validar que al ingresar un tipo de atención solo se permita ingresar los valores definidos

---

# Estructura

La programación está estructurada en diferentes carpetas para separar la parte visual y la codificación en diferentes capas:

- capa de interconectividad con la parte visual
- controladores: donde se maneja toda la lógica del negocio y hace de intermediario entre lo visual y los objetos y datos
- modelos: agrupa todos los objetos
- datos: simula la persistencia

Los formularios que se muestran para la inserción de datos se arman de forma dinámica de acuerdo a los datos que se encuentran en el archivo mockup.js al igual que los usuarios para loguearse en el sistema
