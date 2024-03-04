# Simulador interactivo

## Consigna:

- Aplicar todos los conocimientos vistos hasta el momento

**Se entiende por simulador un programa donde**

- El usuario ingresa uno o mas datos (pedidos por el programa)
- El programa realiza algun tipo de proceso (calculo, pedir mas datos, etc)
- El programa muestra uno o mas datos de interes (de lo que sea que haya hecho claro)

## Formato:

- HTML con el js BIEN linkeado
- A ser posible, entreguen usando github
- Sean ordenados con los nombres de las entregas, archivos, etc

---

---

## Proyecto seleccionado: _Sistema de carga de turnos para un consultorio_

⚙️ **Funcionalidad** ⚙️

- Contar con un menú para las siguientes acciones:

  1. Seteo de configuración inicial

     - Ingresar la cantidad de horas de atención para cada día de la semana (de lunes a viernes)
     - Ingresar la duración en minutos de cada tipo de atención (corta, media, larga)

  2. Carga de turnos: se debe ingresar la siguiente información
     - Nombre del paciente
     - Día de la semana
     - Tipo de atención
  3. Consulta horas disponibles por día
     - Listado de días y horas disponibles para atención
  4. Reporte de turnos asignados
     - Listado de turnos separado por días donde se muestre:
       - Nombre del día, total de horas de atención del día y horas disponibles
       - Nombre del paciente | tipo de atención
  5. Salir del sistema

📌 **Consideraciones** 📌

- Los turnos se agendan de acuerdo a los ingresos (no se asignan por horarios)
- Cuando se cumple la cantidad de horas disponibles de atención para un día se debe informar que no se permiten registrar más turnos para dicho día solicitando se ingrese otro día
- Validar que solamente se permitan seleccionar los números de las opciones del menú
- Validar que al ingresar un día solo se permita ingresar los valores definidos
- Validar que al ingresar un tipo de atención solo se permita ingresar los valores definidos
