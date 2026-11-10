# Alcance y especificación de requisitos

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/02_Requerimientos/Alcance_y_Especificacion_de_Requisitos_ZonaFitEvolution.pdf`](entregables/02_Requerimientos/Alcance_y_Especificacion_de_Requisitos_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Elemento**             | **Detalle**                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Código documental        | ADSO-REQ-01                                                                                                |
| Nombre                   | Alcance y Especificación de Requisitos                                                                     |
| Clasificación            | Documento de análisis y especificación                                                                     |
| Estado                   | En revisión                                                                                                |
| Propietario              | Juan Diego Mejía Llano (analista y Scrum Master)                                                           |
| Revisor funcional        | Liliana Sofía Panesso Méndez (Product Owner, en representación del propietario)                            |
| Revisor técnico          | Liliana Sofía Panesso Méndez (desarrollo backend)                                                          |
| Revisor académico        | Instructor(a) responsable                                                                                  |
| Ubicación oficial        | Repositorio ZonaFitEvolution03, carpeta /docs/requisitos (por crear), y tablero de Jira del proyecto SCRUM |
| Periodicidad de revisión | En cada cambio aprobado de alcance o requisito                                                             |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción**                                                                                              | **Responsable**        | **Aprobado por** |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------- |
| 0.1         | 20/10/2026 | Creación inicial a partir del documento maestro integrado (v2.3)                                             | Juan Diego Mejía Llano |                  |
| 1.0         | 03/11/2026 | Versión para revisión: alcance, requisitos, reglas, permisos, datos, interfaces, priorización y trazabilidad | Juan Diego Mejía Llano |                  |

### Registro de aprobaciones

| **Rol**       | **Nombre**                   | **Decisión**        | **Fecha**  | **Observaciones** |
| ------------- | ---------------------------- | ------------------- | ---------- | ----------------- |
| Analista      | Juan Diego Mejía Llano       | Elaborado           | 03/11/2026 |                   |
| Cliente / PO  | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |            |                   |
| Líder técnico |                              | Aprobado / Devuelto |            |                   |
| Instructor    |                              | Aprobado / Devuelto |            |                   |


## 1\. Propósito, alcance y principios

El documento define qué debe hacer el producto, bajo qué restricciones debe operar, qué queda fuera de la versión, cómo se mide su calidad y quién valida cada requisito. Su alcance cubre requisitos del producto; no reemplaza el backlog, los prototipos, la arquitectura ni las pruebas.

### 1.1 Objetivos específicos

  - Delimitar claramente el producto y el trabajo del proyecto.

  - Especificar requisitos claros, atómicos, necesarios, factibles, consistentes, verificables y trazables.

  - Centralizar reglas de negocio para evitar interpretaciones contradictorias.

  - Definir métricas y umbrales para los requisitos no funcionales.

  - Establecer criterios de aceptación y fuentes de evidencia.

  - Controlar cambios y mantener la documentación alineada con el producto real.

### 1.2 Principios de calidad de requisitos

| **Principio**   | **Criterio**                                                       |
| --------------- | ------------------------------------------------------------------ |
| Claridad        | Se entiende sin depender de explicaciones verbales.                |
| Atomicidad      | Describe una sola necesidad o comportamiento principal.            |
| Necesidad       | Responde a un objetivo, problema, regla o stakeholder real.        |
| Factibilidad    | Puede implementarse dentro de restricciones conocidas.             |
| Verificabilidad | Puede comprobarse con prueba, inspección, medición o demostración. |
| Consistencia    | No contradice otros requisitos ni artefactos aprobados.            |
| Trazabilidad    | Tiene origen, relaciones y evidencia identificables.               |
| Modificabilidad | Puede cambiarse sin afectar indebidamente todo el documento.       |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de redacción</strong></p>
<p>Evite expresiones como “fácil”, “rápido”, “seguro”, “intuitivo” o “escalable” sin una métrica. Un requisito útil debe permitir decidir objetivamente si cumple o no cumple.</p></td>
</tr>
</tbody>
</table>

## 2\. Relación con otros artefactos

| **Artefacto**              | **Aporta a este documento**                      | **Recibe de este documento**                           |
| -------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Formulación y Constitución | Problema, objetivos, restricciones y beneficios. | Alcance detallado y requisitos medibles.               |
| Gestión del Proyecto       | Stakeholders, aprobadores y control de cambios.  | Responsables de validación y riesgos de requisitos.    |
| Backlog e Historias        | Necesidades, valor y criterios narrativos.       | RF, RNF, reglas y prioridades para planificar.         |
| Diseño UX/UI               | Validaciones de interacción y flujos.            | Actores, requisitos y estados obligatorios.            |
| Arquitectura y Datos       | Viabilidad, restricciones y decisiones técnicas. | Drivers, requisitos de datos, seguridad e integración. |
| Plan de Pruebas            | Resultados y defectos.                           | Criterios verificables y cobertura esperada.           |

## 3\. Glosario y convenciones

### 3.1 Glosario

| **Término**            | **Definición**                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Requisito funcional    | Comportamiento, capacidad o servicio que debe proporcionar el sistema.               |
| Requisito no funcional | Atributo de calidad, restricción o condición medible bajo la cual debe operar.       |
| Regla de negocio       | Política, condición o restricción propia del dominio que gobierna decisiones.        |
| Criterio de aceptación | Condición observable que permite aceptar un requisito o historia.                    |
| Actor                  | Rol externo que interactúa con el sistema.                                           |
| MVP                    | Versión mínima viable que entrega valor comprobable con el menor alcance suficiente. |
| Restricción            | Límite impuesto al diseño, tecnología, operación, tiempo o cumplimiento.             |
| Supuesto               | Condición considerada verdadera para planificar, que debe validarse.                 |

### 3.2 Convenciones de identificación

| **Elemento**           | **Código**          | **Ejemplo** |
| ---------------------- | ------------------- | ----------- |
| Objetivo               | OBJ-\#\#            | OBJ-01      |
| Stakeholder            | STK-\#\#            | STK-03      |
| Requisito funcional    | RF-\#\#\#           | RF-012      |
| Requisito no funcional | RNF-\#\#\#          | RNF-008     |
| Regla de negocio       | RN-\#\#\#           | RN-005      |
| Actor o rol            | ACT-\#\# / ROL-\#\# | ACT-02      |
| Interfaz externa       | INT-\#\#            | INT-01      |
| Requisito de datos     | DAT-\#\#            | DAT-07      |
| Solicitud de cambio    | CR-\#\#\#           | CR-004      |

### 3.3 Estados de los requisitos

| **Estado**   | **Significado**                                      |
| ------------ | ---------------------------------------------------- |
| Propuesto    | Identificado, aún no validado.                       |
| En análisis  | Se está aclarando impacto, viabilidad y criterios.   |
| Aprobado     | Aceptado por responsables funcional y técnico.       |
| Planificado  | Asignado a versión, iteración o entrega.             |
| Implementado | Existe solución técnica asociada.                    |
| Verificado   | Pruebas y evidencia demuestran cumplimiento.         |
| Rechazado    | No se desarrollará, con justificación.               |
| Obsoleto     | Fue reemplazado o retirado mediante cambio aprobado. |

## 4\. Alcance del producto y del proyecto

### 4.1 Contexto resumido

| **Campo**                     | **Descripción**                                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Problema u oportunidad        | El gimnasio no tiene un mecanismo automatizado que valide si un cliente tiene su plan vigente al ingresar. Esto genera congestión en horas pico, ingresos con membresía vencida y pérdidas económicas. |
| Usuarios o población afectada | Gimnasio Zona Fit: propietario (STK-01), recepción (STK-02) y entre 150 y 200 socios activos (STK-03).                                                                                                 |
| Objetivo general relacionado  | OBJ-01 a OBJ-05: automatizar el control de ingresos y la gestión de membresías activas para lograr mayor control financiero y del personal.                                                            |
| Valor esperado                | Cero ingresos con membresía vencida, atención más rápida en la recepción e información real de ingresos por cliente.                                                                                   |
| Versión objetivo              | MVP – versión v1.0.0, con cierre y sustentación el 12/12/2026.                                                                                                                                         |

### 4.2 Alcance del producto

<table>
<tbody>
<tr class="odd">
<td><p><strong>Instrucción</strong></p>
<p>Describa las capacidades que tendrá el producto, no las tareas del equipo. Organice por procesos o módulos y evite entrar aún en detalles de interfaz o tecnología.</p></td>
</tr>
</tbody>
</table>

| **ID** | **Módulo / capacidad**       | **Descripción**                                                                                      | **Actores**                         | **Versión** | **Criterio de inclusión**              |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------- | -------------------------------------- |
| ALC-01 | Autenticación y roles        | Inicio de sesión con JWT y permisos por rol (Administrador y Empleado).                              | ACT-01, ACT-02                      | MVP         | Ningún usuario opera sin autenticarse. |
| ALC-02 | Gestión del personal         | Crear, consultar y eliminar usuarios del personal.                                                   | ACT-01                              | MVP         | Necesario para separar funciones.      |
| ALC-03 | Gestión de clientes          | Registrar, buscar, consultar y editar clientes; ver el estado de su membresía.                       | ACT-01, ACT-02                      | MVP         | Base de todos los procesos.            |
| ALC-04 | Catálogo de planes           | Planes diario, quincenal, mensual y trimestral; crear, editar y desactivar.                          | ACT-01 (gestión), ACT-02 (consulta) | MVP         | Define duración y precio.              |
| ALC-05 | Membresías                   | Asignar, renovar por cédula y marcar vencidas.                                                       | ACT-01, ACT-02                      | MVP         | Núcleo del negocio.                    |
| ALC-06 | Control de acceso biométrico | Registro de huella y validación del ingreso con el sensor AS608 (sin apertura automática de puerta). | ACT-02, ACT-03, ACT-04              | MVP         | Objetivo principal del proyecto.       |
| ALC-07 | Historial de accesos         | Registro y consulta de todos los intentos de acceso.                                                 | ACT-01, ACT-02                      | MVP         | Auditoría exigida por el propietario.  |
| ALC-08 | Registro financiero          | Resumen de pagos por cliente, solo para el Administrador.                                            | ACT-01                              | MVP         | Control de ingresos.                   |
| ALC-09 | Comprobante digital de pago  | Soporte del pago para el cliente.                                                                    | ACT-03                              | Posterior   | Prioridad Could (HU-009).              |
| ALC-10 | Inicio (dashboard)           | Acciones rápidas, actividad reciente y membresías por vencer.                                        | ACT-01, ACT-02                      | MVP         | Agiliza el trabajo diario.             |

### 4.3 Alcance del proyecto

| **Categoría**                | **Incluye**                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Análisis                     | Levantamiento de requisitos, stakeholders, épicas e historias de usuario en Jira (sprint 0).                         |
| Diseño                       | Wireframes, mockups y prototipos (UI-01 a UI-09), modelo de datos y arquitectura por capas (sprint 2).               |
| Construcción                 | API REST en Node.js con Express y MySQL, y frontend en React con Vite (sprints 3 a 12).                              |
| Pruebas                      | Plan de calidad, pruebas funcionales, de API, de extremo a extremo y de seguridad (sprints 12 y 13).                 |
| Despliegue                   | Publicación de la API en un hosting por definir (distinto de Render) y base de datos MySQL en la nube (sprint 13).   |
| Documentación                | Documento maestro, alcance y requisitos, backlog e historias, manual técnico, manual de usuario e informe de cierre. |
| Transferencia o capacitación | Capacitación práctica a la recepción y al propietario con el manual de usuario.                                      |

### 4.4 Fuera de alcance

| **ID** | **Exclusión**                                                                             | **Justificación**                                          | **Consecuencia o alternativa**                               |
| ------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| EXC-01 | Pagos en línea y pasarelas (Nequi, Daviplata, PSE, Stripe).                               | Los pagos se reciben en la recepción.                      | Registro manual del pago en el sistema.                      |
| EXC-02 | Facturación electrónica ante la DIAN.                                                     | Fuera del objetivo del proyecto.                           | El gimnasio usa su sistema contable actual.                  |
| EXC-03 | Almacenar imágenes de huellas.                                                            | Ley 1581 de 2012 (Habeas Data).                            | Se guarda solo el hash de la plantilla.                      |
| EXC-04 | Apertura automática de la puerta (relé y electroimán), torniquete y seguridad perimetral. | En esta versión el sensor solo valida el ingreso (CR-005). | La recepción permite el paso según el resultado en pantalla. |
| EXC-05 | Agenda de entrenadores y clases grupales.                                                 | No es un sistema de entrenamiento.                         | Gestión manual del gimnasio.                                 |
| EXC-06 | Rutinas, pesos y planes nutricionales.                                                    | Fuera del alcance administrativo.                          | Herramientas externas.                                       |
| EXC-07 | Venta de productos e inventario (POS).                                                    | El registro financiero se limita a membresías.             | Sistema de caja actual del gimnasio.                         |

### 4.5 MVP y versiones posteriores

| **Capacidad**                                           | **MVP** | **Versión posterior** | **No prevista** | **Justificación**                                      |
| ------------------------------------------------------- | ------- | --------------------- | --------------- | ------------------------------------------------------ |
| Autenticación, roles y personal                         | X       |                       |                 | Base de seguridad.                                     |
| Clientes, planes y membresías                           | X       |                       |                 | Núcleo del negocio.                                    |
| Validación de acceso con el sensor AS608 (CP2102)       | X       |                       |                 | Hoy opera el simulador; integración en curso (TT-010). |
| Apertura automática de la puerta con relé y electroimán |         | X                     |                 | Retirada del MVP por CR-005.                           |
| Historial de accesos                                    | X       |                       |                 | Auditoría.                                             |
| Registro financiero con pagos reales                    | X       |                       |                 | Planeado en los sprints 11 y 12.                       |
| Comprobante digital de pago                             |         | X                     |                 | Prioridad Could.                                       |
| Pagos en línea y facturación electrónica                |         |                       | X               | EXC-01 y EXC-02.                                       |

### 4.6 Restricciones, supuestos y dependencias

| **ID** | **Tipo**    | **Descripción**                                                                                     | **Impacto** | **Responsable de seguimiento** | **Estado**  |
| ------ | ----------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------------------------ | ----------- |
| RSD-01 | Restricción | Entrega final y sustentación el 12/12/2026.                                                         | Alto        | Juan Diego Mejía Llano         | Vigente     |
| RSD-02 | Restricción | Equipo de tres aprendices con dedicación parcial.                                                   | Medio       | Juan Diego Mejía Llano         | Vigente     |
| RSD-03 | Restricción | Ley 1581 de 2012: no se guardan imágenes de huellas.                                                | Alto        | Liliana Sofía Panesso Méndez   | Vigente     |
| RSD-04 | Restricción | Tecnologías definidas: Node.js, Express, MySQL y React.                                             | Medio       | Liliana Sofía Panesso Méndez   | Vigente     |
| RSD-05 | Supuesto    | La recepción cuenta con computador y conexión a internet.                                           | Alto        | Juan Diego Mejía Llano         | Por validar |
| RSD-06 | Supuesto    | El sensor AS608 y el conversor CP2102 están disponibles en la recepción.                            | Alto        | Liliana Sofía Panesso Méndez   | Por validar |
| RSD-07 | Dependencia | Servicio de hosting para la API (proveedor por definir, no Render) y proveedor de MySQL en la nube. | Medio       | Liliana Sofía Panesso Méndez   | Pendiente   |
| RSD-08 | Dependencia | Biblioteca de comunicación serie para el sensor AS608 y controlador del CP2102.                     | Alto        | Liliana Sofía Panesso Méndez   | Pendiente   |

### 4.7 Criterios de aceptación del alcance

| **ID**    | **Criterio**                                                               | **Método de verificación** | **Responsable**              | **Evidencia**                                |
| --------- | -------------------------------------------------------------------------- | -------------------------- | ---------------------------- | -------------------------------------------- |
| CA-ALC-01 | Los módulos del MVP (ALC-01 a ALC-08 y ALC-10) funcionan con datos reales. | Demostración               | Liliana Sofía Panesso Méndez | Sustentación del 12/12/2026 y versión v1.0.0 |
| CA-ALC-02 | Ninguna exclusión (EXC-01 a EXC-07) aparece en el producto.                | Inspección                 | Juan Diego Mejía Llano       | Revisión del repositorio                     |
| CA-ALC-03 | Cada RF aprobado tiene al menos un caso de prueba ejecutado.               | Inspección                 | Juan Diego Mejía Llano       | Matriz de trazabilidad                       |
| CA-ALC-04 | El sistema se instala en un ambiente limpio siguiendo el manual técnico.   | Demostración               | Liliana Sofía Panesso Méndez | Registro de instalación                      |
| CA-ALC-05 | El Product Owner valida los flujos de registro, renovación y acceso.       | Demostración               | Liliana Sofía Panesso Méndez | Acta de sprint review                        |

## 5\. Requisitos funcionales

### 5.1 Catálogo general

| **ID** | **Nombre**                 | **Módulo**           | **Actor**                           | **Prioridad** | **Estado**                                                        | **Versión** |
| ------ | -------------------------- | -------------------- | ----------------------------------- | ------------- | ----------------------------------------------------------------- | ----------- |
| RF-001 | Registrar clientes         | Clientes             | ACT-01, ACT-02                      | Alta          | Implementado                                                      | MVP         |
| RF-002 | Gestionar planes           | Planes               | ACT-01 (gestión), ACT-02 (consulta) | Alta          | Implementado                                                      | MVP         |
| RF-003 | Validar acceso             | Control de acceso    | ACT-02, ACT-03                      | Alta          | Implementado                                                      | MVP         |
| RF-004 | Control por huella         | Control de acceso    | ACT-01, ACT-02, ACT-04              | Media         | Implementado con lector simulado; integración del AS608 pendiente | MVP         |
| RF-005 | Renovar membresía          | Membresías           | ACT-01, ACT-02                      | Media         | Implementado                                                      | MVP         |
| RF-006 | Registrar pagos            | Finanzas             | ACT-01                              | Alta          | Implementado parcialmente                                         | MVP         |
| RF-007 | Gestionar roles y personal | Seguridad y personal | ACT-01                              | Alta          | Implementado                                                      | MVP         |
| RF-008 | Historial de accesos       | Control de acceso    | ACT-01, ACT-02                      | Media         | Implementado                                                      | MVP         |

### 5.2 Ficha detallada de requisito funcional

**RF-001 – Registrar clientes**

| **Campo**                      | **Contenido**                                                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-001 – Registrar clientes                                                                                                                              |
| Descripción                    | El sistema debe permitir al Administrador y al Empleado registrar clientes con nombre, cédula, correo y teléfono, y consultarlos, buscarlos y editarlos. |
| Fuente                         | STK-01, STK-02 / OBJ-01                                                                                                                                  |
| Justificación                  | Sin el registro del cliente no se le puede asignar membresía ni validar su ingreso.                                                                      |
| Actor principal                | ACT-01 Administrador, ACT-02 Empleado                                                                                                                    |
| Precondiciones                 | Usuario autenticado con rol Administrador o Empleado.                                                                                                    |
| Disparador                     | Un nuevo socio llega a la recepción a inscribirse.                                                                                                       |
| Entradas                       | Nombre (obligatorio), cédula (obligatoria), correo y teléfono (opcionales).                                                                              |
| Procesamiento / comportamiento | Valida formatos en el navegador y en el servidor, verifica que la cédula no exista y guarda el cliente.                                                  |
| Salidas                        | Cliente registrado y mensaje de confirmación.                                                                                                            |
| Postcondiciones                | El cliente queda disponible para asignarle membresía y registrar su huella.                                                                              |
| Excepciones                    | Datos inválidos (400); cédula ya registrada (409); sesión vencida (401).                                                                                 |
| Reglas de negocio asociadas    | RN-001, RN-007                                                                                                                                           |
| Dependencias                   | RF-007 (autenticación)                                                                                                                                   |
| Prioridad                      | Must / Alta                                                                                                                                              |
| Versión objetivo               | MVP                                                                                                                                                      |
| Criterios de aceptación        | Se guarda un cliente con datos válidos; se rechaza una cédula repetida o con formato inválido; la cédula no se puede editar después del registro.        |
| Método de verificación         | Prueba (CP-001 a CP-003)                                                                                                                                 |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                             |
| Estado                         | Implementado                                                                                                                                             |

**RF-002 – Gestionar planes**

| **Campo**                      | **Contenido**                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-002 – Gestionar planes                                                                                                                                       |
| Descripción                    | El sistema debe permitir al Administrador crear, editar, desactivar y eliminar los planes (diario, quincenal, mensual y trimestral) y al Empleado consultarlos. |
| Fuente                         | STK-01 / OBJ-01                                                                                                                                                 |
| Justificación                  | El plan define la duración y el precio de cada membresía.                                                                                                       |
| Actor principal                | ACT-01 Administrador                                                                                                                                            |
| Precondiciones                 | Administrador autenticado.                                                                                                                                      |
| Disparador                     | El propietario decide crear o ajustar una tarifa.                                                                                                               |
| Entradas                       | Nombre, duración en días y precio.                                                                                                                              |
| Procesamiento / comportamiento | Valida los datos y que el nombre sea único; al eliminar, verifica que el plan no tenga membresías asociadas.                                                    |
| Salidas                        | Catálogo de planes actualizado.                                                                                                                                 |
| Postcondiciones                | Solo los planes activos se ofrecen en nuevas asignaciones.                                                                                                      |
| Excepciones                    | Nombre duplicado (409); plan con membresías asociadas (no se elimina); Empleado intenta modificar (403).                                                        |
| Reglas de negocio asociadas    | RN-006                                                                                                                                                          |
| Dependencias                   | RF-007                                                                                                                                                          |
| Prioridad                      | Must / Alta                                                                                                                                                     |
| Versión objetivo               | MVP                                                                                                                                                             |
| Criterios de aceptación        | El Administrador crea y desactiva planes; un plan con membresías no se elimina; el Empleado solo consulta.                                                      |
| Método de verificación         | Prueba (CP-004 a CP-006)                                                                                                                                        |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                    |
| Estado                         | Implementado                                                                                                                                                    |

**RF-003 – Validar acceso**

| **Campo**                      | **Contenido**                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-003 – Validar acceso                                                                                                                         |
| Descripción                    | El sistema debe evaluar el estado de la membresía más reciente del cliente identificado y permitir o negar el ingreso.                          |
| Fuente                         | STK-01, STK-02 / OBJ-01, OBJ-04                                                                                                                 |
| Justificación                  | Evitar ingresos con membresía vencida, que hoy generan pérdidas.                                                                                |
| Actor principal                | ACT-02 Empleado; ACT-03 Cliente                                                                                                                 |
| Precondiciones                 | Cliente registrado con huella; lector operativo.                                                                                                |
| Disparador                     | El cliente pone su huella en el lector.                                                                                                         |
| Entradas                       | Captura de la huella.                                                                                                                           |
| Procesamiento / comportamiento | Identifica al cliente, consulta su membresía más reciente, evalúa su estado (activa, vencida, cancelada o sin membresía) y registra el intento. |
| Salidas                        | Resultado permitido o denegado con su motivo, visible en la pantalla de la recepción.                                                           |
| Postcondiciones                | El intento queda en el historial de accesos.                                                                                                    |
| Excepciones                    | Huella no reconocida (404, se registra); error de conexión (se niega el acceso y la recepción valida por cédula).                               |
| Reglas de negocio asociadas    | RN-002, RN-009, RN-010                                                                                                                          |
| Dependencias                   | RF-004                                                                                                                                          |
| Prioridad                      | Must / Alta                                                                                                                                     |
| Versión objetivo               | MVP                                                                                                                                             |
| Criterios de aceptación        | Membresía activa y vigente: permitido; vencida, cancelada o inexistente: denegado; todo intento queda registrado.                               |
| Método de verificación         | Prueba (CP-007 a CP-009)                                                                                                                        |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                    |
| Estado                         | Implementado                                                                                                                                    |

**RF-004 – Control por huella**

| **Campo**                      | **Contenido**                                                                                                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-004 – Control por huella                                                                                                                                                                                      |
| Descripción                    | El sistema debe registrar la huella de cada cliente con el sensor AS608 e identificarlo al ingresar. En esta versión el sensor solo valida el ingreso; la apertura automática de la puerta queda fuera (CR-005). |
| Fuente                         | STK-01 / OBJ-04                                                                                                                                                                                                  |
| Justificación                  | La huella reemplaza las tarjetas y agiliza el ingreso en horas pico.                                                                                                                                             |
| Actor principal                | ACT-01 Administrador, ACT-02 Empleado, ACT-04 Lector                                                                                                                                                             |
| Precondiciones                 | Cliente registrado; variable BIOMETRIA\_SALT configurada.                                                                                                                                                        |
| Disparador                     | La recepción registra la huella de un cliente nuevo.                                                                                                                                                             |
| Entradas                       | Captura del sensor AS608 conectado por USB mediante el conversor CP2102 (hoy simulada con un identificador de prueba).                                                                                           |
| Procesamiento / comportamiento | Genera un hash irreversible de la plantilla y verifica que la huella no esté asignada a otro cliente.                                                                                                            |
| Salidas                        | Huella registrada (sin devolver el hash).                                                                                                                                                                        |
| Postcondiciones                | El cliente puede identificarse en el lector.                                                                                                                                                                     |
| Excepciones                    | Cliente con huella ya registrada; huella asignada a otro cliente.                                                                                                                                                |
| Reglas de negocio asociadas    | RN-008                                                                                                                                                                                                           |
| Dependencias                   | INT-01                                                                                                                                                                                                           |
| Prioridad                      | Should / Media                                                                                                                                                                                                   |
| Versión objetivo               | MVP (validación de ingreso con el sensor AS608, sin apertura de puerta)                                                                                                                                          |
| Criterios de aceptación        | Se registra una huella por cliente; no se repite entre clientes; nunca se guarda ni devuelve la imagen o el hash.                                                                                                |
| Método de verificación         | Prueba (CP-010, CP-011) e inspección de la base de datos                                                                                                                                                         |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                                                                     |
| Estado                         | Implementado con lector simulado; integración del AS608 pendiente                                                                                                                                                |

**RF-005 – Renovar membresía**

| **Campo**                      | **Contenido**                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-005 – Renovar membresía                                                                                                                              |
| Descripción                    | El sistema debe permitir renovar la membresía de un cliente buscándolo por su cédula, sin volver a capturar sus datos.                                  |
| Fuente                         | STK-02 / OBJ-01                                                                                                                                         |
| Justificación                  | Agiliza la atención en la recepción.                                                                                                                    |
| Actor principal                | ACT-01 Administrador, ACT-02 Empleado                                                                                                                   |
| Precondiciones                 | Cliente registrado; plan activo seleccionado.                                                                                                           |
| Disparador                     | El cliente paga una renovación.                                                                                                                         |
| Entradas                       | Cédula y plan.                                                                                                                                          |
| Procesamiento / comportamiento | Si la membresía sigue vigente, la nueva empieza al día siguiente del vencimiento y la anterior pasa a cancelada; si está vencida, la nueva empieza hoy. |
| Salidas                        | Nueva membresía activa con su fecha de fin.                                                                                                             |
| Postcondiciones                | El cliente tiene una sola membresía activa.                                                                                                             |
| Excepciones                    | Cédula no encontrada; plan inactivo.                                                                                                                    |
| Reglas de negocio asociadas    | RN-003, RN-004, RN-005                                                                                                                                  |
| Dependencias                   | RF-001, RF-002                                                                                                                                          |
| Prioridad                      | Should / Media                                                                                                                                          |
| Versión objetivo               | MVP                                                                                                                                                     |
| Criterios de aceptación        | La renovación encadena fechas sin perder días pagados y nunca deja dos membresías activas.                                                              |
| Método de verificación         | Prueba (CP-012, CP-013)                                                                                                                                 |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                            |
| Estado                         | Implementado                                                                                                                                            |

**RF-006 – Registrar pagos**

| **Campo**                      | **Contenido**                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-006 – Registrar pagos                                                                                                            |
| Descripción                    | El sistema debe registrar el pago de cada membresía asignada o renovada y mostrar al Administrador el resumen de pagos por cliente. |
| Fuente                         | STK-01 / OBJ-02, OBJ-05                                                                                                             |
| Justificación                  | El propietario necesita conocer los ingresos reales.                                                                                |
| Actor principal                | ACT-01 Administrador                                                                                                                |
| Precondiciones                 | Administrador autenticado.                                                                                                          |
| Disparador                     | Se asigna o renueva una membresía; el Administrador abre el registro financiero.                                                    |
| Entradas                       | Membresía y plan; filtros por cliente, estado y fechas.                                                                             |
| Procesamiento / comportamiento | Hoy el pago se calcula con el precio actual del plan de cada membresía; se planea una tabla de pagos con monto y método (TT-005).   |
| Salidas                        | Total recaudado, pagos por cliente y detalle de cada pago.                                                                          |
| Postcondiciones                | Consulta de solo lectura.                                                                                                           |
| Excepciones                    | Empleado intenta acceder (bloqueado); rango de fechas inválido.                                                                     |
| Reglas de negocio asociadas    | RN-004, RN-011                                                                                                                      |
| Dependencias                   | RF-002, RF-005                                                                                                                      |
| Prioridad                      | Must / Alta                                                                                                                         |
| Versión objetivo               | MVP                                                                                                                                 |
| Criterios de aceptación        | El resumen coincide con las membresías registradas; el Empleado no ve la pantalla ni consulta los datos.                            |
| Método de verificación         | Prueba (CP-014, CP-015)                                                                                                             |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                        |
| Estado                         | Implementado parcialmente (pagos estimados)                                                                                         |

**RF-007 – Gestionar roles y personal**

| **Campo**                      | **Contenido**                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-007 – Gestionar roles y personal                                                                                                                     |
| Descripción                    | El sistema debe autenticar al personal con correo y contraseña y aplicar dos roles: Administrador (acceso total) y Empleado (sin finanzas ni personal). |
| Fuente                         | STK-01 / OBJ-03                                                                                                                                         |
| Justificación                  | Proteger la información financiera y la gestión del personal.                                                                                           |
| Actor principal                | ACT-01 Administrador                                                                                                                                    |
| Precondiciones                 | Existe al menos un Administrador creado con el script inicial.                                                                                          |
| Disparador                     | Un usuario inicia sesión o el Administrador crea un usuario.                                                                                            |
| Entradas                       | Correo y contraseña; datos y rol del nuevo usuario.                                                                                                     |
| Procesamiento / comportamiento | Valida credenciales con bcrypt, emite un token JWT de 8 horas y verifica el rol en cada ruta del servidor.                                              |
| Salidas                        | Sesión iniciada con menú según el rol.                                                                                                                  |
| Postcondiciones                | Las rutas solo responden al rol autorizado.                                                                                                             |
| Excepciones                    | Credenciales inválidas (401); rol sin permiso (403); eliminar la propia cuenta o al último administrador (bloqueado).                                   |
| Reglas de negocio asociadas    | RN-011, RN-012                                                                                                                                          |
| Dependencias                   | —                                                                                                                                                       |
| Prioridad                      | Must / Alta                                                                                                                                             |
| Versión objetivo               | MVP                                                                                                                                                     |
| Criterios de aceptación        | Sin token la API responde 401; un Empleado en ruta de Administrador recibe 403.                                                                         |
| Método de verificación         | Prueba (CP-016 a CP-018, CP-020, CP-021)                                                                                                                |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                            |
| Estado                         | Implementado                                                                                                                                            |

**RF-008 – Historial de accesos**

| **Campo**                      | **Contenido**                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                    | RF-008 – Historial de accesos                                                                                                      |
| Descripción                    | El sistema debe registrar cada intento de acceso con cliente, resultado, motivo, fecha y hora, y permitir consultarlo con filtros. |
| Fuente                         | STK-01 / OBJ-04                                                                                                                    |
| Justificación                  | Auditoría de ingresos y control del personal.                                                                                      |
| Actor principal                | ACT-01 Administrador, ACT-02 Empleado                                                                                              |
| Precondiciones                 | Usuario autenticado.                                                                                                               |
| Disparador                     | Se consulta la pantalla Historial.                                                                                                 |
| Entradas                       | Filtros por resultado, texto y rango de fechas.                                                                                    |
| Procesamiento / comportamiento | Devuelve los eventos más recientes y aplica los filtros validados.                                                                 |
| Salidas                        | Lista de intentos de acceso.                                                                                                       |
| Postcondiciones                | Consulta de solo lectura.                                                                                                          |
| Excepciones                    | Rango de fechas inválido.                                                                                                          |
| Reglas de negocio asociadas    | RN-010                                                                                                                             |
| Dependencias                   | RF-003                                                                                                                             |
| Prioridad                      | Should / Media                                                                                                                     |
| Versión objetivo               | MVP                                                                                                                                |
| Criterios de aceptación        | Cada intento aparece con su motivo; los filtros devuelven solo los registros que cumplen.                                          |
| Método de verificación         | Prueba (CP-019)                                                                                                                    |
| Responsable de validación      | Liliana Sofía Panesso Méndez (Product Owner)                                                                                       |
| Estado                         | Implementado                                                                                                                       |

### 5.3 Patrones de redacción

| **Evitar**                            | **Preferir**                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| “El sistema tendrá un login bonito.”  | “El sistema permitirá a usuarios activos autenticarse con credenciales válidas y mostrará un mensaje genérico ante fallos.”     |
| “El administrador gestiona usuarios.” | “El sistema permitirá al rol administrador crear, consultar, actualizar y desactivar usuarios, respetando RN-004.”              |
| “Se podrán hacer reportes.”           | “El sistema permitirá generar un reporte PDF filtrado por rango de fechas y rol, con los mismos datos visibles en la consulta.” |

### 5.4 Criterios de aceptación funcionales

Los criterios pueden expresarse como lista verificable o en formato Given/When/Then. Deben cubrir éxito, errores, permisos y límites relevantes.

| **ID requisito** | **Escenario**        | **Dado**                                           | **Cuando**                                              | **Entonces**                                                |
| ---------------- | -------------------- | -------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| RF-001           | Flujo exitoso        | un Empleado autenticado                            | registra un cliente con nombre y cédula válidos         | el cliente queda guardado y se muestra la confirmación      |
| RF-001           | Datos inválidos      | un Empleado autenticado                            | envía una cédula con letras o ya registrada             | el sistema rechaza el registro y muestra el error del campo |
| RF-002           | Flujo exitoso        | un Administrador autenticado                       | crea el plan mensual de 30 días                         | el plan queda activo y disponible para asignar              |
| RF-002           | Permiso denegado     | un Empleado autenticado                            | intenta crear o editar un plan                          | la API responde 403 y no se modifica nada                   |
| RF-003           | Flujo exitoso        | un cliente con membresía activa y vigente          | pone su huella en el lector                             | el acceso se permite y se registra el intento               |
| RF-003           | Membresía vencida    | un cliente cuya fecha de fin ya pasó               | pone su huella en el lector                             | el acceso se niega con el motivo «Membresía vencida»        |
| RF-003           | Huella no reconocida | una huella que no pertenece a ningún cliente       | se presenta en el lector                                | el acceso se niega (404) y el intento queda registrado      |
| RF-004           | Flujo exitoso        | un cliente sin huella registrada                   | la recepción registra su huella                         | se guarda solo el hash de la plantilla                      |
| RF-004           | Huella repetida      | una huella ya asignada a otro cliente              | se intenta registrar                                    | el sistema la rechaza                                       |
| RF-005           | Renovación vigente   | un cliente con membresía activa que vence el 30/11 | se renueva por cédula                                   | la nueva empieza el 01/12 y la anterior pasa a cancelada    |
| RF-005           | Renovación vencida   | un cliente con membresía vencida                   | se renueva por cédula                                   | la nueva membresía empieza hoy                              |
| RF-006           | Flujo exitoso        | un Administrador autenticado                       | abre el registro financiero                             | ve el total recaudado y el resumen de pagos por cliente     |
| RF-006           | Permiso denegado     | un Empleado autenticado                            | intenta abrir el registro financiero                    | la opción no aparece y la pantalla no consulta datos        |
| RF-007           | Flujo exitoso        | un usuario registrado                              | inicia sesión con credenciales válidas                  | recibe un token y ve el menú de su rol                      |
| RF-007           | Datos inválidos      | un usuario                                         | ingresa una contraseña incorrecta                       | el sistema rechaza el acceso con un mensaje genérico        |
| RF-007           | Permiso denegado     | un Empleado autenticado                            | llama una ruta de Administrador                         | la API responde 403                                         |
| RF-008           | Flujo exitoso        | existen intentos de acceso registrados             | se filtra por resultado «denegado» y un rango de fechas | solo aparecen los intentos que cumplen el filtro            |

## 6\. Requisitos no funcionales

### 6.1 Catálogo general

| **ID**  | **Categoría**  | **Requisito resumido**                                                                                                  | **Prioridad** | **Método**          | **Estado**   |
| ------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------- | ------------ |
| RNF-001 | Seguridad      | Contraseñas con bcrypt, plantillas biométricas como hash, autenticación JWT y control de rol en cada ruta del servidor. | Alta          | Prueba / inspección | Implementado |
| RNF-002 | Usabilidad     | La recepción registra un cliente nuevo en menos de 2 minutos.                                                           | Media         | Medición            | En análisis  |
| RNF-003 | Rendimiento    | La validación de acceso responde en menos de 2 segundos.                                                                | Alta          | Medición            | En análisis  |
| RNF-004 | Disponibilidad | Disponibilidad del 99,9 % durante el horario de atención del gimnasio.                                                  | Alta          | Medición            | Planificado  |
| RNF-005 | Mantenibilidad | Código organizado por capas y patrones documentados; ESLint y build sin errores.                                        | Media         | Inspección          | Implementado |
| RNF-006 | Privacidad     | Solo se recolectan los datos necesarios y nunca se guardan imágenes de huellas (Ley 1581 de 2012).                      | Alta          | Inspección          | Implementado |
| RNF-007 | Compatibilidad | Funciona en las dos últimas versiones de Chrome, Edge y Firefox, en computador, tablet y celular.                       | Media         | Prueba              | En análisis  |

### 6.2 Ficha detallada de RNF

**RNF-001 – Seguridad de acceso y datos**

| **Campo**               | **Contenido**                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| ID y nombre             | RNF-001 – Seguridad de acceso y datos                                                                   |
| Categoría               | Seguridad                                                                                               |
| Descripción             | El sistema debe proteger credenciales y datos biométricos y validar la autorización en el servidor.     |
| Fuente y justificación  | STK-01; riesgo de fuga de datos y de acceso no autorizado (matriz de riesgos).                          |
| Métrica                 | Endpoints protegidos que responden sin token válido; contraseñas o plantillas guardadas en texto plano. |
| Umbral o meta           | 0 endpoints protegidos sin autorización; 0 datos sensibles en texto plano.                              |
| Condiciones de medición | Ambiente de pruebas con la API completa.                                                                |
| Método de verificación  | Pruebas de acceso permitido/denegado e inspección de la base de datos.                                  |
| Evidencia esperada      | Reporte de CP-020 y CP-021; consulta SQL de las columnas sensibles.                                     |
| Responsable             | Liliana Sofía Panesso Méndez                                                                            |
| Prioridad               | Alta                                                                                                    |
| Versión objetivo        | MVP                                                                                                     |
| Estado                  | Implementado                                                                                            |

**RNF-002 – Registro ágil en recepción**

| **Campo**               | **Contenido**                                                      |
| ----------------------- | ------------------------------------------------------------------ |
| ID y nombre             | RNF-002 – Registro ágil en recepción                               |
| Categoría               | Usabilidad                                                         |
| Descripción             | El sistema debe permitir registrar un cliente nuevo de forma ágil. |
| Fuente y justificación  | STK-02; la recepción atiende filas en horas pico.                  |
| Métrica                 | Tiempo para completar el registro de un cliente.                   |
| Umbral o meta           | Menos de 2 minutos para 8 de cada 10 registros.                    |
| Condiciones de medición | Recepcionista capacitada, formulario completo, conexión normal.    |
| Método de verificación  | Prueba de usabilidad cronometrada.                                 |
| Evidencia esperada      | Registro de tiempos de la prueba.                                  |
| Responsable             | Maileth Begambre Movilla                                           |
| Prioridad               | Media                                                              |
| Versión objetivo        | MVP                                                                |
| Estado                  | En análisis                                                        |

**RNF-003 – Tiempo de validación de acceso**

| **Campo**               | **Contenido**                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------- |
| ID y nombre             | RNF-003 – Tiempo de validación de acceso                                            |
| Categoría               | Rendimiento                                                                         |
| Descripción             | El sistema debe responder la validación de acceso con rapidez para no formar filas. |
| Fuente y justificación  | STK-01, STK-02; congestión en horas pico.                                           |
| Métrica                 | Tiempo de respuesta de POST /api/acceso-fisico/validar.                             |
| Umbral o meta           | Menos de 2 segundos en el percentil 95.                                             |
| Condiciones de medición | Ambiente de pruebas con al menos 400 clientes registrados.                          |
| Método de verificación  | Medición con herramienta de pruebas de carga.                                       |
| Evidencia esperada      | Reporte de tiempos de respuesta.                                                    |
| Responsable             | Liliana Sofía Panesso Méndez                                                        |
| Prioridad               | Alta                                                                                |
| Versión objetivo        | MVP                                                                                 |
| Estado                  | En análisis                                                                         |

**RNF-004 – Disponibilidad en horario de atención**

| **Campo**               | **Contenido**                                                       |
| ----------------------- | ------------------------------------------------------------------- |
| ID y nombre             | RNF-004 – Disponibilidad en horario de atención                     |
| Categoría               | Disponibilidad                                                      |
| Descripción             | El control de acceso debe estar disponible durante toda la jornada. |
| Fuente y justificación  | STK-01; sin sistema no se puede validar el ingreso.                 |
| Métrica                 | Porcentaje de tiempo disponible en el horario de atención.          |
| Umbral o meta           | 99,9 % mensual.                                                     |
| Condiciones de medición | Producción en la nube, horario de atención del gimnasio.            |
| Método de verificación  | Monitoreo de disponibilidad (health check).                         |
| Evidencia esperada      | Reporte mensual del monitor.                                        |
| Responsable             | Liliana Sofía Panesso Méndez                                        |
| Prioridad               | Alta                                                                |
| Versión objetivo        | MVP                                                                 |
| Estado                  | Planificado (despliegue en el sprint 13)                            |

**RNF-005 – Mantenibilidad del código**

| **Campo**               | **Contenido**                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------- |
| ID y nombre             | RNF-005 – Mantenibilidad del código                                                     |
| Categoría               | Mantenibilidad                                                                          |
| Descripción             | El código debe estar organizado por capas y cumplir las reglas de calidad del proyecto. |
| Fuente y justificación  | STK-04; el proyecto debe poder mantenerse y sustentarse.                                |
| Métrica                 | Errores de ESLint y de compilación; capas definidas en el backend.                      |
| Umbral o meta           | 0 errores en npm run lint y npm run build.                                              |
| Condiciones de medición | Antes de cada Pull Request.                                                             |
| Método de verificación  | Inspección y ejecución de lint y build.                                                 |
| Evidencia esperada      | Resultado de lint y build en cada Pull Request.                                         |
| Responsable             | Juan Diego Mejía Llano                                                                  |
| Prioridad               | Media                                                                                   |
| Versión objetivo        | MVP                                                                                     |
| Estado                  | Implementado                                                                            |

**RNF-006 – Privacidad de datos personales**

| **Campo**               | **Contenido**                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------- |
| ID y nombre             | RNF-006 – Privacidad de datos personales                                               |
| Categoría               | Privacidad                                                                             |
| Descripción             | El sistema debe recolectar solo los datos necesarios y no guardar imágenes de huellas. |
| Fuente y justificación  | Ley 1581 de 2012 (Habeas Data); STK-03.                                                |
| Métrica                 | Campos personales almacenados frente a los necesarios; imágenes biométricas guardadas. |
| Umbral o meta           | 0 imágenes de huellas; solo nombre, cédula, correo y teléfono del cliente.             |
| Condiciones de medición | Revisión del esquema de base de datos y de las respuestas de la API.                   |
| Método de verificación  | Inspección.                                                                            |
| Evidencia esperada      | Diccionario de datos y respuestas sin template\_hash.                                  |
| Responsable             | Liliana Sofía Panesso Méndez                                                           |
| Prioridad               | Alta                                                                                   |
| Versión objetivo        | MVP                                                                                    |
| Estado                  | Implementado                                                                           |

**RNF-007 – Compatibilidad de navegadores y dispositivos**

| **Campo**               | **Contenido**                                                                 |
| ----------------------- | ----------------------------------------------------------------------------- |
| ID y nombre             | RNF-007 – Compatibilidad de navegadores y dispositivos                        |
| Categoría               | Compatibilidad                                                                |
| Descripción             | La interfaz debe funcionar en los navegadores y dispositivos de la recepción. |
| Fuente y justificación  | STK-02; la recepción puede usar computador o tablet.                          |
| Métrica                 | Flujos críticos que funcionan en cada navegador y resolución.                 |
| Umbral o meta           | 100 % de flujos críticos en Chrome, Edge y Firefox; desde 360 px de ancho.    |
| Condiciones de medición | Dos últimas versiones de cada navegador.                                      |
| Método de verificación  | Prueba multidispositivo.                                                      |
| Evidencia esperada      | Lista de verificación con capturas.                                           |
| Responsable             | Maileth Begambre Movilla                                                      |
| Prioridad               | Media                                                                         |
| Versión objetivo        | MVP                                                                           |
| Estado                  | En análisis                                                                   |

### 6.3 Catálogo mínimo por categoría

| **Categoría**  | **Aspectos a definir**                          | **Ejemplo verificable**                                                                             |
| -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Rendimiento    | Tiempo de respuesta, concurrencia, volumen.     | El percentil 95 de consultas comunes será ≤ 2 s con 50 usuarios concurrentes en ambiente de prueba. |
| Disponibilidad | Horario o porcentaje objetivo, mantenimiento.   | Disponible 99 % durante horario de atención mensual.                                                |
| Seguridad      | Acceso, secretos, sesiones, cifrado, auditoría. | Ningún endpoint protegido responderá sin autorización válida.                                       |
| Usabilidad     | Éxito de tareas, errores, aprendizaje.          | Al menos 8 de 10 usuarios completan el flujo crítico sin ayuda.                                     |
| Accesibilidad  | Teclado, foco, contraste, semántica.            | Flujos críticos operables con teclado y contraste conforme a WCAG AA aplicable.                     |
| Compatibilidad | Navegadores, dispositivos, SO.                  | Funciona en las dos últimas versiones de Chrome, Edge y Firefox.                                    |
| Mantenibilidad | Calidad, modularidad, documentación.            | Lint y pruebas pasan; módulos críticos cuentan con documentación técnica.                           |
| Portabilidad   | Instalación reproducible.                       | Puede instalarse en ambiente limpio con la guía oficial.                                            |
| Privacidad     | Minimización, acceso, retención.                | Solo se recolectan campos necesarios y se restringe acceso por rol.                                 |
| Recuperación   | Backup, RPO, RTO.                               | Restauración probada con RPO de 24 h y RTO de 2 h.                                                  |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Advertencia</strong></p>
<p>No todos los umbrales de ejemplo aplican a todos los proyectos. Deben justificarse según contexto, riesgo, infraestructura y nivel formativo.</p></td>
</tr>
</tbody>
</table>

## 7\. Reglas de negocio

Las reglas de negocio se centralizan aquí para evitar que aparezcan con versiones distintas en historias, casos de uso, base de datos y código.

### 7.1 Catálogo de reglas

| **ID** | **Nombre**                  | **Regla**                                                                                                                                                     | **Fuente**               | **Excepciones**                                                      | **Requisitos asociados** | **Estado** |
| ------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------- | ------------------------ | ---------- |
| RN-001 | Clientes no se eliminan     | Los clientes no deben eliminarse: se conserva su historial y solo cambia el estado de su membresía.                                                           | STK-01                   | Ninguna                                                              | RF-001                   | Aprobada   |
| RN-002 | Vencimiento automático      | Cuando la fecha actual supera la fecha de fin, la membresía debe pasar a «vencida» y el acceso se niega.                                                      | STK-01                   | Ninguna                                                              | RF-003, RF-005           | Aprobada   |
| RN-003 | Una membresía activa        | Un cliente no debe tener más de una membresía activa a la vez.                                                                                                | STK-01                   | Ninguna                                                              | RF-005                   | Aprobada   |
| RN-004 | Fecha de fin calculada      | La fecha de fin debe calcularla el servidor: fecha de inicio + duración del plan.                                                                             | STK-04                   | Ninguna                                                              | RF-005, RF-006           | Aprobada   |
| RN-005 | Renovación encadenada       | Al renovar con la membresía vigente, la nueva debe empezar al día siguiente del vencimiento y la anterior pasa a «cancelada»; si estaba vencida, empieza hoy. | STK-01, STK-02           | Ninguna                                                              | RF-005                   | Aprobada   |
| RN-006 | Planes activos              | Solo se deben asignar planes activos; un plan con membresías asociadas no se elimina, se desactiva.                                                           | STK-01                   | Ninguna                                                              | RF-002                   | Aprobada   |
| RN-007 | Cédula única                | La cédula del cliente debe ser obligatoria, numérica (6 a 15 dígitos) y única.                                                                                | STK-02                   | Ninguna                                                              | RF-001                   | Aprobada   |
| RN-008 | Una huella por cliente      | Cada cliente debe tener como máximo una huella y una huella no puede registrarse en dos clientes; solo se guarda el hash.                                     | Ley 1581 de 2012; STK-03 | Para registrar de nuevo, el Administrador elimina la huella anterior | RF-004                   | Aprobada   |
| RN-009 | Condición de ingreso        | Solo se permite el ingreso si la membresía más reciente está activa y su fecha de fin es hoy o posterior.                                                     | STK-01                   | Ninguna                                                              | RF-003                   | Aprobada   |
| RN-010 | Auditoría de accesos        | Todo intento de acceso, permitido o denegado, debe quedar registrado.                                                                                         | STK-01                   | Ninguna                                                              | RF-003, RF-008           | Aprobada   |
| RN-011 | Exclusivo del Administrador | El registro financiero y la gestión del personal solo deben estar disponibles para el Administrador.                                                          | STK-01                   | Ninguna                                                              | RF-006, RF-007           | Aprobada   |
| RN-012 | Protección de cuentas       | No se debe eliminar la propia cuenta ni al último administrador.                                                                                              | STK-04                   | Ninguna                                                              | RF-007                   | Aprobada   |

### 7.2 Ficha de regla de negocio

**RN-002 – Vencimiento automático**

| **Campo**                    | **Contenido**                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| ID y nombre                  | RN-002 – Vencimiento automático                                                                        |
| Descripción formal           | Si fecha actual \> fecha\_fin y estado = activa, la membresía pasa a vencida y no habilita el ingreso. |
| Motivo o política            | Evitar ingresos con planes vencidos, principal causa de pérdidas.                                      |
| Fuente autorizada            | STK-01 Propietario                                                                                     |
| Condición de aplicación      | Al consultar las membresías y en cada validación de acceso.                                            |
| Excepciones                  | Ninguna; una membresía que vence hoy sigue vigente.                                                    |
| Datos involucrados           | membresias.fecha\_fin, membresias.estado                                                               |
| Actor responsable            | Sistema                                                                                                |
| Requisitos relacionados      | RF-003, RF-005                                                                                         |
| Casos de prueba relacionados | CP-008                                                                                                 |
| Estado y versión             | Aprobada – MVP                                                                                         |

**RN-005 – Renovación encadenada**

| **Campo**                    | **Contenido**                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                  | RN-005 – Renovación encadenada                                                                                                                          |
| Descripción formal           | Si existe membresía activa vigente: nueva.fecha\_inicio = anterior.fecha\_fin + 1 día y la anterior pasa a cancelada; si no, nueva.fecha\_inicio = hoy. |
| Motivo o política            | No perder días ya pagados por el cliente.                                                                                                               |
| Fuente autorizada            | STK-01 Propietario, STK-02 Recepción                                                                                                                    |
| Condición de aplicación      | En cada renovación por cédula.                                                                                                                          |
| Excepciones                  | Ninguna.                                                                                                                                                |
| Datos involucrados           | membresias.fecha\_inicio, fecha\_fin, estado; planes.duracion\_dias                                                                                     |
| Actor responsable            | Administrador o Empleado                                                                                                                                |
| Requisitos relacionados      | RF-005                                                                                                                                                  |
| Casos de prueba relacionados | CP-012, CP-013                                                                                                                                          |
| Estado y versión             | Aprobada – MVP                                                                                                                                          |

**RN-009 – Condición de ingreso**

| **Campo**                    | **Contenido**                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ID y nombre                  | RN-009 – Condición de ingreso                                                                                    |
| Descripción formal           | Permitir ingreso solo si la membresía más reciente tiene estado activa y fecha\_fin ≥ fecha actual del servidor. |
| Motivo o política            | Control de acceso confiable aunque el estado guardado no se haya actualizado.                                    |
| Fuente autorizada            | STK-01 Propietario                                                                                               |
| Condición de aplicación      | En cada validación de acceso.                                                                                    |
| Excepciones                  | Ninguna.                                                                                                         |
| Datos involucrados           | membresias.estado, membresias.fecha\_fin                                                                         |
| Actor responsable            | Sistema                                                                                                          |
| Requisitos relacionados      | RF-003                                                                                                           |
| Casos de prueba relacionados | CP-007, CP-008                                                                                                   |
| Estado y versión             | Aprobada – MVP                                                                                                   |

**RN-011 – Exclusivo del Administrador**

| **Campo**                    | **Contenido**                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| ID y nombre                  | RN-011 – Exclusivo del Administrador                                                                |
| Descripción formal           | Las rutas y pantallas de registro financiero, usuarios y roles solo responden al rol Administrador. |
| Motivo o política            | Proteger información financiera y de personal.                                                      |
| Fuente autorizada            | STK-01 Propietario                                                                                  |
| Condición de aplicación      | En cada petición a esos recursos.                                                                   |
| Excepciones                  | Ninguna.                                                                                            |
| Datos involucrados           | usuarios.rol\_id, token JWT                                                                         |
| Actor responsable            | Sistema                                                                                             |
| Requisitos relacionados      | RF-006, RF-007                                                                                      |
| Casos de prueba relacionados | CP-015, CP-021                                                                                      |
| Estado y versión             | Aprobada – MVP                                                                                      |

### 7.3 Tipos de reglas

| **Tipo**     | **Ejemplo**                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| Cálculo      | El valor total corresponde a cantidad × valor unitario menos descuentos permitidos. |
| Validación   | Una reserva no puede solaparse con otra activa para el mismo recurso.               |
| Autorización | Solo el rol coordinador puede aprobar una solicitud excepcional.                    |
| Derivación   | El estado pasa a vencido cuando supera la fecha límite sin cierre.                  |
| Integridad   | Una devolución no puede existir sin un préstamo previo.                             |
| Temporal     | No se permiten registros con fecha posterior al cierre del período.                 |

## 8\. Actores, roles y permisos

### 8.1 Catálogo de actores

| **ID** | **Actor**                                     | **Tipo**                      | **Objetivo**                                                          | **Requisitos relacionados**            |
| ------ | --------------------------------------------- | ----------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| ACT-01 | Administrador                                 | Humano                        | Gestionar personal, planes, membresías, acceso y finanzas.            | RF-001 a RF-008                        |
| ACT-02 | Empleado / recepcionista                      | Humano                        | Registrar clientes, renovar membresías y validar accesos.             | RF-001, RF-003, RF-004, RF-005, RF-008 |
| ACT-03 | Cliente (socio)                               | Humano                        | Ingresar al gimnasio con su huella.                                   | RF-003, RF-004                         |
| ACT-04 | Sensor de huella AS608 (con conversor CP2102) | Sistema externo (dispositivo) | Capturar la huella del cliente para registrarla y validar su ingreso. | RF-003, RF-004                         |

### 8.2 Matriz de roles y permisos

| **Recurso / acción**                          | **Administrador** | **Empleado** | **Cliente**             | **Regla o restricción**                      |
| --------------------------------------------- | ----------------- | ------------ | ----------------------- | -------------------------------------------- |
| Iniciar sesión                                | Sí                | Sí           | No                      | Credenciales del personal; token de 8 horas  |
| Clientes: registrar, consultar y editar       | Sí                | Sí           | No                      | RN-007; los clientes no se eliminan (RN-001) |
| Planes: consultar                             | Sí                | Sí           | No                      | —                                            |
| Planes: crear, editar, desactivar y eliminar  | Sí                | No           | No                      | RN-006                                       |
| Membresías: asignar, renovar y cambiar estado | Sí                | Sí           | No                      | RN-003, RN-005                               |
| Membresías: eliminar                          | Sí                | No           | No                      | Solo Administrador                           |
| Huella: registrar y validar acceso            | Sí                | Sí           | Sí (presenta la huella) | RN-008, RN-009                               |
| Huella: eliminar                              | Sí                | No           | No                      | Necesario para registrarla de nuevo          |
| Historial de accesos: consultar               | Sí                | Sí           | No                      | RN-010                                       |
| Personal y roles: crear, consultar y eliminar | Sí                | No           | No                      | RN-011, RN-012                               |
| Registro financiero: consultar                | Sí                | No           | No                      | RN-011                                       |

### 8.3 Principios de autorización

  - Los permisos se validan en el servidor o componente confiable, no solo ocultando botones.

  - Se aplica mínimo privilegio.

  - Las acciones sensibles deben quedar auditadas cuando el riesgo lo justifique.

  - Los mensajes de error no deben revelar información sensible.

  - Las excepciones de acceso deben estar justificadas por una regla aprobada.

## 9\. Requisitos de datos

### 9.1 Catálogo de datos

| **ID** | **Dato / entidad**   | **Propósito**                             | **Fuente**                | **Sensibilidad**                                  | **Retención**                                                       | **Requisitos asociados** |
| ------ | -------------------- | ----------------------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- | ------------------------ |
| DAT-01 | Usuario del personal | Autenticación y control de roles          | Administrador             | Personal (contraseña sensible, guardada con hash) | Mientras el usuario trabaje en el gimnasio                          | RF-007                   |
| DAT-02 | Cliente              | Identificar al socio y asociar membresías | Recepción                 | Personal                                          | Mientras el cliente exista (no se elimina, RN-001)                  | RF-001                   |
| DAT-03 | Plan                 | Definir duración y precio                 | Administrador             | Interno                                           | Permanente; se desactiva en lugar de borrar                         | RF-002                   |
| DAT-04 | Membresía            | Vigencia del cliente y base del pago      | Sistema                   | Interno                                           | Permanente (historial)                                              | RF-003, RF-005, RF-006   |
| DAT-05 | Plantilla biométrica | Identificar al cliente en el lector       | Lector de huella          | Sensible (solo hash)                              | Mientras el cliente esté activo; se elimina a solicitud del titular | RF-004                   |
| DAT-06 | Registro de acceso   | Auditoría de ingresos                     | Sistema                   | Personal                                          | Por definir con el propietario (propuesta: 1 año)                   | RF-008                   |
| DAT-07 | Pago                 | Registrar monto y método de cada pago     | Administrador / recepción | Interno                                           | Permanente (planeado, TT-005)                                       | RF-006                   |

### 9.2 Reglas de calidad de datos

| **Dimensión** | **Regla o métrica**                                                                   | **Método de validación**                                        |
| ------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Completitud   | Nombre y cédula del cliente; plan, cliente y fechas de la membresía son obligatorios. | Validación en el navegador y en el servicio; columnas NOT NULL. |
| Exactitud     | La fecha de fin y el precio se toman del plan guardado en el servidor.                | Pruebas CP-012 y CP-013; el frontend no envía montos.           |
| Unicidad      | Cédula, correo del personal, nombre del plan y huella son únicos.                     | Restricciones UNIQUE y respuesta 409.                           |
| Consistencia  | Un cliente tiene una sola membresía activa; las llaves foráneas se respetan.          | Transacción en la renovación; llaves foráneas en MySQL.         |
| Validez       | Cédula de 6 a 15 dígitos; correo con formato válido; teléfono de 7 a 15 dígitos.      | Expresiones regulares en el navegador y en el servidor.         |
| Actualidad    | Las membresías activas con fecha de fin pasada se marcan como vencidas.               | Marcado al consultar; tarea programada en el servidor (TT-006). |

### 9.3 Privacidad y ciclo de vida

| **Dato**                                             | **Finalidad**                       | **Base o autorización**                               | **Acceso permitido**                           | **Retención**                   | **Eliminación / anonimización**                         |
| ---------------------------------------------------- | ----------------------------------- | ----------------------------------------------------- | ---------------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| Datos del cliente (nombre, cédula, correo, teléfono) | Identificación y contacto del socio | Autorización del titular (Ley 1581 de 2012)           | Administrador y Empleado                       | Mientras el cliente exista      | Anonimización a solicitud del titular (por implementar) |
| Plantilla biométrica                                 | Identificación en el lector         | Autorización expresa del titular para datos sensibles | Solo el sistema; la API nunca devuelve el hash | Mientras el cliente esté activo | Eliminación por el Administrador                        |
| Credenciales del personal                            | Autenticación                       | Relación laboral con el gimnasio                      | Solo el sistema (hash bcrypt)                  | Mientras el usuario exista      | Eliminación del usuario por el Administrador            |
| Registros de acceso                                  | Auditoría de ingresos               | Interés legítimo de seguridad del establecimiento     | Administrador y Empleado                       | Por definir (propuesta: 1 año)  | Depuración periódica (por definir)                      |

## 10\. Interfaces e integraciones externas

### 10.1 Catálogo

| **ID** | **Sistema / interfaz**                             | **Tipo**                                    | **Propósito**                                            | **Datos intercambiados**          | **Disponibilidad esperada** | **Responsable**              |
| ------ | -------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------- | --------------------------------- | --------------------------- | ---------------------------- |
| INT-01 | Sensor de huella AS608 con conversor USB CP2102    | Dispositivo                                 | Capturar la huella para registrarla y validar el ingreso | Plantilla biométrica (hash)       | Horario de atención         | Liliana Sofía Panesso Méndez |
| INT-02 | Hosting de la API y base de datos MySQL en la nube | Servicio en la nube (proveedor por definir) | Publicar la API y la base de datos                       | Peticiones HTTPS y conexión MySQL | Permanente                  | Liliana Sofía Panesso Méndez |

### 10.2 Ficha de integración

| **Campo**                  | **Contenido**                                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y nombre                | INT-01 – Sensor de huella AS608 con conversor USB CP2102                                                                                                                                  |
| Proveedor / propietario    | Sensor óptico AS608 conectado al computador de la recepción con el conversor USB-serial CP2102; propietario: gimnasio Zona Fit.                                                           |
| Objetivo                   | Identificar al cliente por su huella para validar el acceso.                                                                                                                              |
| Protocolo o mecanismo      | Comunicación serie (UART) a través del CP2102; el adaptador LectorBiometrico (patrón Adapter) traduce los comandos del sensor. Hoy opera el adaptador simulador (TIPO\_LECTOR=simulador). |
| Autenticación              | El agente de la recepción llama a la API con un token JWT del personal.                                                                                                                   |
| Datos de entrada y salida  | Entrada: captura de la huella. Salida: cliente identificado o huella no reconocida.                                                                                                       |
| Frecuencia / volumen       | Cada ingreso; de 150 a 200 clientes activos, con picos en la mañana y la noche.                                                                                                           |
| Tiempo de espera           | Menos de 2 segundos por validación (RNF-003).                                                                                                                                             |
| Manejo de indisponibilidad | Si el sensor o la API no responden, se niega el acceso y la recepción valida manualmente por cédula.                                                                                      |
| Reintentos e idempotencia  | El cliente puede volver a poner la huella; cada intento se registra por separado.                                                                                                         |
| Privacidad y seguridad     | Solo se guarda el hash de la plantilla; nunca la imagen (RN-008, RNF-006).                                                                                                                |
| Requisitos relacionados    | RF-003, RF-004, RNF-003, RNF-006                                                                                                                                                          |
| Evidencia de prueba        | Pendiente de pruebas con el sensor AS608; con el simulador: CP-009 a CP-011.                                                                                                              |

## 11\. Priorización y versiones

### 11.1 Método recomendado

| **Método**        | **Descripción**                                          |
| ----------------- | -------------------------------------------------------- |
| MoSCoW            | Must, Should, Could, Won’t por versión.                  |
| Valor vs esfuerzo | Prioriza alto valor con costo razonable.                 |
| Riesgo            | Adelanta requisitos con incertidumbre o impacto crítico. |
| Dependencias      | Respeta orden técnico o funcional necesario.             |

### 11.2 Matriz de priorización

| **ID** | **Valor** | **Urgencia** | **Riesgo** | **Esfuerzo** | **Dependencias** | **Prioridad final** | **Versión** |
| ------ | --------- | ------------ | ---------- | ------------ | ---------------- | ------------------- | ----------- |
| RF-001 | A         | A            | M          | B            | RF-007           | Must                | MVP         |
| RF-002 | A         | A            | M          | B            | RF-007           | Must                | MVP         |
| RF-003 | A         | A            | A          | M            | RF-004           | Must                | MVP         |
| RF-004 | A         | M            | A          | A            | INT-01           | Should              | MVP         |
| RF-005 | A         | M            | M          | M            | RF-001, RF-002   | Should              | MVP         |
| RF-006 | A         | A            | M          | M            | RF-002, RF-005   | Must                | MVP         |
| RF-007 | A         | A            | A          | M            | —                | Must                | MVP         |
| RF-008 | M         | M            | M          | B            | RF-003           | Should              | MVP         |

### 11.3 Roadmap de requisitos

| **Versión / hito**        | **Objetivo**                                                      | **RF incluidos**                                                   | **RNF críticos**                   | **Criterio de salida**                                                       |
| ------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| MVP (v1.0.0 – 12/12/2026) | Sistema web funcional para controlar membresías, accesos y pagos. | RF-001 a RF-008                                                    | RNF-001, RNF-003, RNF-004, RNF-006 | Flujos críticos demostrados en la sustentación y pruebas críticas aprobadas. |
| V1.1                      | Apertura automática de la puerta y soporte de pago.               | Apertura con relé y electroimán (por definir), comprobante digital | RNF-003, RNF-004                   | Apertura de puerta integrada y probada en el gimnasio.                       |
| V2.0                      | Por definir con el propietario.                                   | Por definir                                                        | Por definir                        | Por definir                                                                  |

## 12\. Gestión de cambios

### 12.1 Principios

  - Ningún cambio aprobado se incorpora sin analizar impacto.

  - Los cambios urgentes también se registran.

  - No se borra el historial; se versiona o marca como obsoleto.

  - El producto, backlog, pruebas, diseño y arquitectura deben actualizarse de manera coordinada.

### 12.2 Solicitud de cambio

| **Campo**                      | **Contenido**                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                             | CR-001                                                                                                                                     |
| Solicitante y fecha            | STK-01 Propietario – sprint 6 (agosto de 2026)                                                                                             |
| Descripción del cambio         | Reemplazar las tarjetas RFID por identificación con huella dactilar y hacer la renovación de membresías buscando al cliente por su cédula. |
| Motivo                         | El gimnasio no usará tarjetas físicas; la huella evita préstamos de tarjetas y agiliza el ingreso.                                         |
| Artefactos afectados           | RF-004, RF-005, HU-004, HU-005, CU-004, UI-06, modelo de datos (plantillas\_biometricas).                                                  |
| Impacto en alcance             | Se retira la lectura de tarjetas; se agrega el registro biométrico.                                                                        |
| Impacto en tiempo y esfuerzo   | Un sprint adicional para el registro biométrico (sprint 7).                                                                                |
| Impacto técnico y de seguridad | Datos sensibles: solo se guarda el hash (Ley 1581 de 2012); se agrega el patrón Adapter para el lector.                                    |
| Riesgos                        | Rechazo de los socios a dar su huella; dependencia de la compra del lector.                                                                |
| Alternativas                   | Mantener tarjetas RFID; validación manual por cédula.                                                                                      |
| Decisión                       | Aprobado                                                                                                                                   |
| Aprobadores                    | Liliana Sofía Panesso Méndez (Product Owner), en representación de STK-01                                                                  |
| Versión de aplicación          | MVP                                                                                                                                        |

### 12.3 Registro consolidado

| **ID** | **Fecha**             | **Cambio**                                                                                                                                          | **Impacto**                            | **Decisión**                     | **Responsable**        | **Versión** |
| ------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------- | ---------------------- | ----------- |
| CR-001 | Sprint 6 (ago. 2026)  | Se reemplazan las tarjetas RFID por identificación con huella; la renovación se hace por cédula.                                                    | RF-004, RF-005, HU-004, HU-005         | Aprobado                         | Juan Diego Mejía Llano | MVP         |
| CR-002 | Sprint 7 (sep. 2026)  | Se retira el torniquete: la apertura se hace con relé y electroimán.                                                                                | RF-004, INT-02                         | Aprobado                         | Juan Diego Mejía Llano | MVP         |
| CR-003 | Sprint 9 (oct. 2026)  | El frontend pasa a React (Vite) en un monorepo con el backend.                                                                                      | Arquitectura, UI-01 a UI-09            | Aprobado                         | Juan Diego Mejía Llano | MVP         |
| CR-004 | Sprint 10 (oct. 2026) | El registro financiero se calcula con las membresías mientras se crea la tabla de pagos.                                                            | RF-006, HU-008                         | Aprobado (temporal)              | Juan Diego Mejía Llano | MVP         |
| CR-005 |                       | Se usa el sensor AS608 con conversor CP2102 solo para validar el ingreso; la apertura con relé y electroimán (CR-002) pasa a una versión posterior. | OBJ-04, RF-003, RF-004, INT-01, INT-02 | Aprobado                         | Juan Diego Mejía Llano | MVP         |
| CR-006 |                       | El backend se publicará en un hosting distinto de Render; el proveedor está por definir.                                                            | TT-009, INT-02, RSD-07                 | Aprobado (proveedor por definir) | Juan Diego Mejía Llano | MVP         |

## 13\. Trazabilidad y cobertura

### 13.1 Cadena mínima

<table>
<tbody>
<tr class="odd">
<td><p><strong>Cadena de trazabilidad</strong></p>
<p>Problema → Objetivo → Stakeholder → Alcance → RF/RNF → Regla → HU/CU → UI → Componente → Código → Caso de prueba → Evidencia → Entrega.</p></td>
</tr>
</tbody>
</table>

### 13.2 Matriz resumida

| **RF/RNF** | **Origen**              | **Reglas**             | **HU/CU**               | **Diseño**   | **Componente**                            | **Prueba**      | **Evidencia** | **Estado**              |
| ---------- | ----------------------- | ---------------------- | ----------------------- | ------------ | ----------------------------------------- | --------------- | ------------- | ----------------------- |
| RF-001     | OBJ-01 / STK-02         | RN-001, RN-007         | HU-001 / CU-002         | UI-03        | cliente.service.js                        | CP-001 a CP-003 | Pendiente     | Implementado            |
| RF-002     | OBJ-01 / STK-01         | RN-006                 | HU-003 / CU-003         | UI-04        | plan.service.js                           | CP-004 a CP-006 | Pendiente     | Implementado            |
| RF-003     | OBJ-01, OBJ-04 / STK-01 | RN-002, RN-009, RN-010 | HU-006, HU-007 / CU-004 | UI-06        | accesoFisico.service.js, estadosAcceso    | CP-007 a CP-009 | Pendiente     | Implementado            |
| RF-004     | OBJ-04 / STK-01         | RN-008                 | HU-005 / CU-004         | UI-06        | biometria.service.js, hardware            | CP-010, CP-011  | Pendiente     | Implementado (simulado) |
| RF-005     | OBJ-01 / STK-02         | RN-003, RN-004, RN-005 | HU-004 / CU-005         | UI-05        | membresia.service.js                      | CP-012, CP-013  | Pendiente     | Implementado            |
| RF-006     | OBJ-02, OBJ-05 / STK-01 | RN-004, RN-011         | HU-008 / CU-005, CU-007 | UI-05, UI-09 | finanzasService.js                        | CP-014, CP-015  | Pendiente     | Parcial                 |
| RF-007     | OBJ-03 / STK-01         | RN-011, RN-012         | HU-002 / CU-001, CU-006 | UI-01, UI-08 | auth y rol middleware, usuario.service.js | CP-016 a CP-018 | Pendiente     | Implementado            |
| RF-008     | OBJ-04 / STK-01         | RN-010                 | HU-006 / CU-004         | UI-07        | registroAcceso.repository.js              | CP-019          | Pendiente     | Implementado            |
| RNF-001    | STK-01, STK-04          | RN-008, RN-011         | HU-010                  | —            | auth.middleware.js, rol.middleware.js     | CP-020, CP-021  | Pendiente     | Implementado            |

### 13.3 Reglas de cobertura

  - Todo requisito aprobado debe tener origen y responsable de validación.

  - Todo requisito implementado debe relacionarse con código o componente.

  - Todo requisito crítico debe tener al menos una prueba.

  - Todo requisito verificado debe tener evidencia accesible.

  - Las exclusiones y requisitos rechazados conservan justificación.

## 14\. Validación y aprobación

### 14.1 Técnicas de validación

| **Técnica**                  | **Aplicación**                                               |
| ---------------------------- | ------------------------------------------------------------ |
| Revisión estructurada        | Verifica claridad, completitud, consistencia y trazabilidad. |
| Prototipado                  | Valida interacción y entendimiento temprano.                 |
| Modelado de procesos         | Aclara secuencias, actores y excepciones.                    |
| Ejemplos y escenarios        | Reduce ambigüedad mediante casos concretos.                  |
| Prueba de concepto           | Verifica viabilidad técnica de riesgos relevantes.           |
| Walkthrough con stakeholders | Confirma que el documento representa la necesidad real.      |

### 14.2 Registro de observaciones

| **ID**  | **Sección / requisito** | **Observación**                                                                                    | **Severidad** | **Responsable**              | **Fecha límite** | **Estado** |
| ------- | ----------------------- | -------------------------------------------------------------------------------------------------- | ------------- | ---------------------------- | ---------------- | ---------- |
| OBS-001 | RN-001 / RF-001         | El backend mantiene la ruta DELETE /api/clientes/:id, que contradice RN-001.                       | Mayor         | Liliana Sofía Panesso Méndez | 11/11/2026       | Abierta    |
| OBS-002 | RN-012 / RF-007         | La regla de no eliminar la propia cuenta ni al último administrador solo se valida en el frontend. | Mayor         | Liliana Sofía Panesso Méndez | 11/11/2026       | Abierta    |
| OBS-003 | RNF-001                 | No hay límite de intentos de inicio de sesión ni CORS restringido.                                 | Mayor         | Liliana Sofía Panesso Méndez | 11/11/2026       | Abierta    |
| OBS-004 | RF-006                  | Los pagos se estiman con el precio actual del plan; falta la tabla de pagos.                       | Mayor         | Liliana Sofía Panesso Méndez | 25/11/2026       | Abierta    |
| OBS-005 | RN-002                  | El vencimiento se marca al consultar, no con una tarea programada.                                 | Menor         | Liliana Sofía Panesso Méndez | 25/11/2026       | Abierta    |

### 14.3 Acta de aprobación

| **Declaración**                                       | **Resultado** |
| ----------------------------------------------------- | ------------- |
| El alcance representa la versión acordada.            | Sí / No       |
| Los requisitos funcionales son claros y verificables. | Sí / No       |
| Los RNF tienen métricas o criterios objetivos.        | Sí / No       |
| Las reglas están centralizadas y trazadas.            | Sí / No       |
| Los roles y permisos están definidos.                 | Sí / No       |
| Los cambios pendientes están registrados.             | Sí / No       |

| **Rol**                 | **Nombre**                   | **Decisión**        | **Fecha** | **Firma / evidencia** |
| ----------------------- | ---------------------------- | ------------------- | --------- | --------------------- |
| Cliente / Product Owner | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                       |
| Líder técnico           |                              | Aprobado / Devuelto |           |                       |
| Instructor              |                              | Aprobado / Devuelto |           |                       |

## 15\. Lista de verificación

| **N.°** | **Verificación**                                                    | **Cumple**     | **Evidencia / observación** |
| ------- | ------------------------------------------------------------------- | -------------- | --------------------------- |
| 1       | El alcance distingue producto, proyecto, MVP y exclusiones.         | Sí / No / N.A. |                             |
| 2       | Cada requisito tiene identificador, prioridad, estado y fuente.     | Sí / No / N.A. |                             |
| 3       | Los requisitos son claros, atómicos y verificables.                 | Sí / No / N.A. |                             |
| 4       | Los RNF incluyen métrica, umbral y método.                          | Sí / No / N.A. |                             |
| 5       | Las reglas de negocio están centralizadas.                          | Sí / No / N.A. |                             |
| 6       | Los roles y permisos están definidos y serán validados en servidor. | Sí / No / N.A. |                             |
| 7       | Los datos personales y su finalidad están identificados.            | Sí / No / N.A. |                             |
| 8       | Las interfaces externas tienen manejo de fallos.                    | Sí / No / N.A. |                             |
| 9       | Existe priorización y asignación a versiones.                       | Sí / No / N.A. |                             |
| 10      | Existe procedimiento de cambios.                                    | Sí / No / N.A. |                             |
| 11      | La trazabilidad llega hasta pruebas y evidencia.                    | Sí / No / N.A. |                             |
| 12      | El documento fue validado por responsables funcional y técnico.     | Sí / No / N.A. |                             |

## Anexos

### Anexo A. Plantilla rápida de requisito funcional

| **ID**    | **Nombre** | **Descripción**    | **Actor** | **Prioridad** | **Reglas** | **Criterios de aceptación** | **Versión** | **Estado** |
| --------- | ---------- | ------------------ | --------- | ------------- | ---------- | --------------------------- | ----------- | ---------- |
| RF-\_\_\_ |            | El sistema debe... |           |               |            |                             |             |            |

### Anexo B. Plantilla rápida de requisito no funcional

| **ID**     | **Categoría** | **Descripción** | **Métrica** | **Umbral** | **Condición** | **Método** | **Evidencia** | **Estado** |
| ---------- | ------------- | --------------- | ----------- | ---------- | ------------- | ---------- | ------------- | ---------- |
| RNF-\_\_\_ |               |                 |             |            |               |            |               |            |

### Anexo C. Criterios para rechazar un requisito

  - No tiene fuente ni relación con un objetivo.

  - Describe una solución técnica sin justificar la necesidad.

  - No puede verificarse.

  - Duplica o contradice otro requisito.

  - Está fuera del alcance aprobado.

  - Su costo o riesgo supera el valor sin una decisión explícita.

  - Depende de una condición no disponible y no tiene alternativa.

### Anexo D. Estructura recomendada en el repositorio

/docs/requisitos/  
alcance-requisitos.docx  
trazabilidad.xlsx  
reglas-negocio.csv  
decisiones-cambio/  
anexos/
