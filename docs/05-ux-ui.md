# Diseño UX/UI y sistema de diseño

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/03_Diseño/Diseno_UX_UI_y_Sistema_de_Diseno_ZonaFitEvolution.pdf`](entregables/03_Diseño/Diseno_UX_UI_y_Sistema_de_Diseno_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Elemento**             | **Detalle**                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| Código documental        | ADSO-UXUI-01                                                             |
| Nombre                   | Diseño UX/UI y Sistema de Diseño                                         |
| Clasificación            | Documento de diseño, validación y especificación visual                  |
| Estado                   | En revisión                                                              |
| Propietario              | Maileth Begambre Movilla                                                 |
| Revisor funcional        | Liliana Sofía Panesso Méndez (Product Owner)                             |
| Revisor técnico          | Juan Diego Mejía Llano                                                   |
| Revisor académico        |                                                                          |
| Ubicación oficial        | Carpeta documentos\_proyecto; prototipos en Figma (enlace por registrar) |
| Periodicidad de revisión | Con cada cambio de interfaz                                              |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción**                                                                              | **Responsable**              | **Aprobado por** |
| ----------- | ---------- | -------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- |
| 1.0         | 24/06/2026 | Wireframes iniciales                                                                         | Maileth Begambre Movilla     |                  |
| 1.1         | 25/06/2026 | Mockups                                                                                      | Liliana Sofía Panesso Méndez |                  |
| 1.2         | 26/06/2026 | Prototipos navegables                                                                        | Maileth Begambre Movilla     |                  |
| 2.0         | 03/11/2026 | Plantilla institucional con pantallas React implementadas, estados, tokens y mensajes reales | Juan Diego Mejía Llano       |                  |

### Registro de aprobaciones

| **Rol**               | **Nombre**                                   | **Decisión**        | **Fecha**  | **Observaciones** |
| --------------------- | -------------------------------------------- | ------------------- | ---------- | ----------------- |
| Responsable funcional | Liliana Sofía Panesso Méndez (Product Owner) | Aprobado / Devuelto |            |                   |
| Responsable UX/UI     | Maileth Begambre Movilla                     | Elaborado           | 03/11/2026 |                   |
| Líder técnico         | Juan Diego Mejía Llano                       | Aprobado / Devuelto |            |                   |
| Instructor            |                                              | Aprobado / Devuelto |            |                   |

##   
Tabla de Contenido

[Control documental 2](#control-documental)

[Historial de versiones 2](#historial-de-versiones)

[Registro de aprobaciones 2](#registro-de-aprobaciones)

[1. Propósito, alcance y principios 6](#propósito-alcance-y-principios)

[1.1 Objetivos específicos 6](#objetivos-específicos)

[1.2 Principios de diseño 6](#principios-de-diseño)

[2. Relación con otros artefactos 6](#relación-con-otros-artefactos)

[3. Investigación y comprensión de usuarios 8](#investigación-y-comprensión-de-usuarios)

[3.1 Fuentes de información 8](#fuentes-de-información)

[3.2 Perfil o persona 8](#perfil-o-persona)

[3.3 Mapa de necesidades 8](#mapa-de-necesidades)

[4. Arquitectura de información 10](#arquitectura-de-información)

[4.1 Inventario de contenidos y funciones 10](#inventario-de-contenidos-y-funciones)

[4.2 Estructura de navegación 10](#estructura-de-navegación)

[4.3 Mapa del sitio 10](#mapa-del-sitio)

[4.4 Criterios de calidad 10](#criterios-de-calidad)

[5. Flujos de usuario y navegación 11](#flujos-de-usuario-y-navegación)

[5.1 Catálogo de flujos 11](#catálogo-de-flujos)

[5.2 Ficha de flujo 11](#ficha-de-flujo)

[5.3 Reglas de navegación 11](#reglas-de-navegación)

[6. Inventario y especificación de pantallas 12](#inventario-y-especificación-de-pantallas)

[6.1 Inventario maestro 12](#inventario-maestro)

[6.2 Ficha de pantalla 12](#ficha-de-pantalla)

[6.3 Matriz pantalla–rol–acción 13](#matriz-pantallarolacción)

[7. Wireframes 14](#wireframes)

[7.1 Registro de wireframes 14](#registro-de-wireframes)

[7.2 Contenido mínimo por wireframe 14](#contenido-mínimo-por-wireframe)

[7.3 Criterios de aprobación 14](#criterios-de-aprobación)

[8. Mockups y prototipos 14](#mockups-y-prototipos)

[8.1 Registro de mockups 14](#registro-de-mockups)

[8.2 Registro de prototipos 15](#registro-de-prototipos)

[8.3 Reglas de versionamiento 15](#reglas-de-versionamiento)

[9. Estados y comportamiento de interfaz 16](#estados-y-comportamiento-de-interfaz)

[9.1 Estados obligatorios 16](#estados-obligatorios)

[9.2 Matriz de estados por pantalla 16](#matriz-de-estados-por-pantalla)

[9.3 Mensajes y prevención de errores 16](#mensajes-y-prevención-de-errores)

[10. Diseño responsive y compatibilidad 17](#diseño-responsive-y-compatibilidad)

[10.1 Dispositivos y breakpoints 17](#dispositivos-y-breakpoints)

[10.2 Matriz de comportamiento responsive 17](#matriz-de-comportamiento-responsive)

[10.3 Compatibilidad 17](#compatibilidad)

[11. Accesibilidad 18](#accesibilidad)

[11.1 Lista mínima de verificación 18](#lista-mínima-de-verificación)

[11.2 Registro de hallazgos 18](#registro-de-hallazgos)

[12. Sistema de diseño 20](#sistema-de-diseño)

[12.1 Principios y alcance 20](#principios-y-alcance)

[12.2 Design tokens 20](#design-tokens)

[12.3 Paleta de colores 20](#paleta-de-colores)

[12.4 Tipografía 20](#tipografía)

[12.5 Espaciado, grid y breakpoints 21](#espaciado-grid-y-breakpoints)

[13. Componentes y patrones 22](#componentes-y-patrones)

[13.1 Catálogo de componentes 22](#catálogo-de-componentes)

[13.2 Ficha de componente 22](#ficha-de-componente)

[13.3 Patrones funcionales 23](#patrones-funcionales)

[14. UX writing y contenido 24](#ux-writing-y-contenido)

[14.1 Voz y tono 24](#voz-y-tono)

[14.2 Catálogo de mensajes 24](#catálogo-de-mensajes)

[14.3 Reglas de contenido 24](#reglas-de-contenido)

[15. Pruebas de usabilidad y validación 24](#pruebas-de-usabilidad-y-validación)

[15.1 Plan de prueba 24](#plan-de-prueba)

[15.2 Guion de tareas 25](#guion-de-tareas)

[15.3 Registro de resultados 25](#registro-de-resultados)

[15.4 Hallazgos y decisiones 25](#hallazgos-y-decisiones)

[16. Entrega a desarrollo y control de cambios 26](#entrega-a-desarrollo-y-control-de-cambios)

[16.1 Paquete de handoff 26](#paquete-de-handoff)

[16.2 Registro de decisiones de diseño 26](#registro-de-decisiones-de-diseño)

[16.3 Solicitud de cambio de diseño 26](#solicitud-de-cambio-de-diseño)

[16.4 Criterios de correspondencia con implementación 26](#criterios-de-correspondencia-con-implementación)

[17. Trazabilidad, indicadores y aprobación 27](#trazabilidad-indicadores-y-aprobación)

[17.1 Matriz resumida 27](#matriz-resumida)

[17.2 Indicadores sugeridos 27](#indicadores-sugeridos)

[17.3 Lista de verificación final 27](#lista-de-verificación-final)

[17.4 Aprobación del documento 28](#aprobación-del-documento)

[Anexo A. Convenciones de identificación 29](#anexo-a.-convenciones-de-identificación)

[Anexo B. Estructura recomendada en el repositorio 29](#anexo-b.-estructura-recomendada-en-el-repositorio)

[Anexo C. Evidencias mínimas por nivel de madurez 29](#anexo-c.-evidencias-mínimas-por-nivel-de-madurez)

[Anexo D. Errores frecuentes que deben evitarse 30](#anexo-d.-errores-frecuentes-que-deben-evitarse)

## 

## 1\. Propósito, alcance y principios

El documento define cómo se comprenderán las necesidades de los usuarios, cómo se estructurará la información, cómo se diseñarán y validarán los flujos y qué reglas visuales deberán respetarse durante la implementación. Su finalidad es reducir ambigüedad, prevenir retrabajo y asegurar una experiencia usable, accesible y coherente.

### 1.1 Objetivos específicos

  - Identificar perfiles, necesidades, limitaciones y contextos de uso.

  - Diseñar arquitectura de información y navegación comprensibles.

  - Representar y validar flujos antes de implementar.

  - Documentar pantallas, estados, reglas y permisos.

  - Establecer un sistema de diseño reutilizable y accesible.

  - Probar la interfaz con usuarios o representantes.

  - Mantener trazabilidad entre requisitos, historias, diseño, código y pruebas.

### 1.2 Principios de diseño

| **Principio**            | **Aplicación**                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| Centrado en las personas | Las decisiones se justifican con necesidades y contexto, no solo con preferencias del equipo. |
| Consistencia             | Patrones iguales se comportan y se ven de manera equivalente.                                 |
| Claridad                 | La interfaz comunica estado, acción posible y resultado esperado.                             |
| Accesibilidad            | Los flujos principales pueden operarse con teclado y tecnologías de asistencia básicas.       |
| Prevención de errores    | Se reducen errores mediante restricciones, confirmaciones y mensajes útiles.                  |
| Diseño verificable       | Cada decisión importante tiene criterio de aceptación o evidencia de validación.              |
| Simplicidad responsable  | Se evita complejidad visual o técnica que no aporte valor.                                    |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de coherencia</strong></p>
<p>No se diseña una pantalla sin historia, requisito, caso de uso o necesidad trazable. Tampoco se implementa una interfaz que contradiga el prototipo aprobado sin registrar y validar el cambio.</p></td>
</tr>
</tbody>
</table>

## 2\. Relación con otros artefactos

| **Artefacto**          | **Aporta**                                         | **Recibe de UX/UI**                                          |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Formulación y alcance  | Problema, usuarios, límites y objetivos.           | Evidencia de solución propuesta y restricciones de uso.      |
| Requisitos             | Funciones, reglas, RNF y permisos.                 | Pantallas, flujos y criterios de usabilidad.                 |
| Backlog e historias    | Valor, actores y criterios de aceptación.          | Prototipos y escenarios visuales relacionados.               |
| Arquitectura           | Restricciones técnicas, integraciones y seguridad. | Necesidades de frontend, estados y contratos de interacción. |
| Matriz de trazabilidad | Códigos y cobertura.                               | UI, flujo, versión, validación y evidencia.                  |
| Plan de pruebas        | Criterios y riesgos.                               | Casos de usabilidad, accesibilidad y compatibilidad.         |

## 3\. Investigación y comprensión de usuarios

### 3.1 Fuentes de información

| **Fuente**                   | **Propósito**                                   | **Evidencia**              |
| ---------------------------- | ----------------------------------------------- | -------------------------- |
| Entrevista                   | Comprender objetivos, frustraciones y lenguaje. | Guion, notas o síntesis.   |
| Observación contextual       | Identificar el proceso real y sus excepciones.  | Registro del flujo actual. |
| Encuesta                     | Obtener patrones cuantitativos básicos.         | Instrumento y resultados.  |
| Analítica o registros        | Detectar frecuencia, errores o abandonos.       | Reporte anonimizado.       |
| Taller con stakeholders      | Alinear necesidades y prioridades.              | Acta y acuerdos.           |
| Prueba de producto existente | Detectar problemas de uso.                      | Hallazgos y severidad.     |

### 3.2 Perfil o persona

**PER-001 – Administrador (propietario del gimnasio)**

| **Campo**                           | **Contenido**                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| ID                                  | PER-001                                                                       |
| Nombre del perfil                   | Administrador (propietario del gimnasio)                                      |
| Objetivos                           | Controlar ingresos, personal, planes y pagos.                                 |
| Tareas frecuentes                   | Gestionar planes y personal; consultar el registro financiero y el historial. |
| Conocimientos y habilidades         | Uso básico de computador.                                                     |
| Contexto de uso                     | Recepción u oficina, computador.                                              |
| Necesidades de accesibilidad        |                                                                               |
| Frustraciones y riesgos             | Pérdidas por ingresos vencidos; no conoce sus ingresos reales.                |
| Motivadores                         | Control y reportes confiables.                                                |
| Requisitos / historias relacionadas | HU-002, HU-003, HU-008 / RF-002, RF-006, RF-007                               |
| Fuente de validación                |                                                                               |

**PER-002 – Empleado / recepcionista**

| **Campo**                           | **Contenido**                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| ID                                  | PER-002                                                                                |
| Nombre del perfil                   | Empleado / recepcionista                                                               |
| Objetivos                           | Atender rápido en horas pico.                                                          |
| Tareas frecuentes                   | Registrar clientes, asignar y renovar membresías, registrar huellas y validar accesos. |
| Conocimientos y habilidades         | Uso básico de computador o tablet.                                                     |
| Contexto de uso                     | Recepción con filas en horas pico.                                                     |
| Necesidades de accesibilidad        |                                                                                        |
| Frustraciones y riesgos             | Revisar vigencias a mano; volver a capturar datos al renovar.                          |
| Motivadores                         | Menos filas y menos errores.                                                           |
| Requisitos / historias relacionadas | HU-001, HU-004, HU-005, HU-006, HU-012                                                 |
| Fuente de validación                |                                                                                        |

### 3.3 Mapa de necesidades

| **ID**  | **Perfil** | **Necesidad**                              | **Problema actual**            | **Impacto**                    | **Evidencia** | **Prioridad** |
| ------- | ---------- | ------------------------------------------ | ------------------------------ | ------------------------------ | ------------- | ------------- |
| NEC-001 | PER-002    | Saber al instante si el socio puede entrar | Revisión manual de vigencias   | Filas e ingresos vencidos      |               | Alta          |
| NEC-002 | PER-002    | Renovar sin volver a capturar datos        | Recaptura completa del cliente | Atención lenta                 |               | Alta          |
| NEC-003 | PER-001    | Conocer los pagos por cliente              | Sin registro centralizado      | Sin control financiero         |               | Alta          |
| NEC-004 | PER-001    | Restringir funciones según el rol          | Todos ven todo                 | Riesgo sobre datos financieros |               | Alta          |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Cuidado metodológico</strong></p>
<p>Una persona no debe inventarse solo para decorar el documento. Debe resumir información observada o validada. Cuando no sea posible investigar directamente, registre la limitación y use un representante funcional autorizado.</p></td>
</tr>
</tbody>
</table>

## 4\. Arquitectura de información

### 4.1 Inventario de contenidos y funciones

| **ID**   | **Contenido / función**      | **Usuario**      | **Frecuencia** | **Prioridad** | **Ubicación propuesta** | **Fuente** |
| -------- | ---------------------------- | ---------------- | -------------- | ------------- | ----------------------- | ---------- |
| CONT-001 | Validar acceso por huella    | PER-002          | Alta           | Must          | Control de acceso       | RF-003     |
| CONT-002 | Registrar y buscar clientes  | PER-002          | Alta           | Must          | Clientes                | RF-001     |
| CONT-003 | Asignar y renovar membresías | PER-002          | Alta           | Must          | Membresías              | RF-005     |
| CONT-004 | Registrar huella             | PER-002          | Media          | Must          | Control de acceso       | RF-004     |
| CONT-005 | Historial de accesos         | PER-001, PER-002 | Media          | Should        | Historial               | RF-008     |
| CONT-006 | Gestionar planes             | PER-001          | Baja           | Must          | Planes                  | RF-002     |
| CONT-007 | Gestionar personal           | PER-001          | Baja           | Must          | Personal                | RF-007     |
| CONT-008 | Registro financiero          | PER-001          | Media          | Must          | Registro financiero     | RF-006     |

### 4.2 Estructura de navegación

| **Nivel** | **Elemento**                                               | **Objetivo**                                                 | **Usuarios**            | **Elementos hijos**                  | **Reglas de acceso**              |
| --------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ----------------------- | ------------------------------------ | --------------------------------- |
| 1         | Inicio (dashboard)                                         | Acciones rápidas, actividad reciente y membresías por vencer | Administrador, Empleado | Menú lateral                         | Según el rol                      |
| 2         | Clientes, Membresías, Planes, Control de acceso, Historial | Operación diaria                                             | Administrador, Empleado | Formularios y listas                 | Planes: el Empleado solo consulta |
| 2         | Registro financiero, Personal                              | Control del propietario                                      | Administrador           | Resumen y detalle; lista de usuarios | Solo Administrador                |

### 4.3 Mapa del sitio

Incluya el mapa del sitio o arquitectura de información en una herramienta editable. Debe mostrar jerarquía, agrupación y rutas principales, sin reemplazar el flujo detallado de tareas.

| **ID diagrama** | **Nombre**                                        | **Versión** | **Ubicación** | **Validado por** | **Fecha** |
| --------------- | ------------------------------------------------- | ----------- | ------------- | ---------------- | --------- |
| DIA-IA-01       | Mapa general de navegación (menú lateral por rol) | 1.0         |               |                  |           |

### 4.4 Criterios de calidad

  - Las etiquetas usan el lenguaje de los usuarios.

  - La ubicación de contenidos es predecible.

  - No existen rutas duplicadas sin justificación.

  - Los permisos se reflejan sin depender solo de ocultar botones.

  - Los flujos críticos requieren pocos pasos razonables.

  - Se conserva orientación mediante títulos, breadcrumbs o estados de navegación cuando aplique.

## 5\. Flujos de usuario y navegación

### 5.1 Catálogo de flujos

| **ID**  | **Nombre**                    | **Actor**        | **Objetivo**                  | **Inicio** | **Fin**               | **Historias / requisitos**      | **Prioridad** |
| ------- | ----------------------------- | ---------------- | ----------------------------- | ---------- | --------------------- | ------------------------------- | ------------- |
| FLU-001 | Iniciar sesión                | PER-001, PER-002 | Entrar con el menú de su rol  | UI-01      | UI-02                 | HU-002 / RF-007                 | Alta          |
| FLU-002 | Registrar cliente             | PER-002          | Inscribir un socio            | UI-02      | UI-03 confirmación    | HU-001 / RF-001                 | Alta          |
| FLU-003 | Asignar o renovar membresía   | PER-002          | Registrar la membresía pagada | UI-05      | UI-05 confirmación    | HU-004, HU-008 / RF-005, RF-006 | Alta          |
| FLU-004 | Validar acceso                | PER-002 / socio  | Permitir o negar el ingreso   | UI-06      | Resultado en pantalla | HU-006 / RF-003                 | Alta          |
| FLU-005 | Consultar registro financiero | PER-001          | Conocer pagos por cliente     | UI-09      | Detalle de pagos      | HU-008 / RF-006                 | Media         |

### 5.2 Ficha de flujo

| **Campo**              | **Contenido**                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| ID y nombre            | FLU-004 – Validar acceso                                                                              |
| Actor / perfil         | PER-002 Recepcionista; socio presenta la huella                                                       |
| Objetivo y valor       | Decidir en segundos si el socio puede entrar; cero ingresos vencidos.                                 |
| Disparador             | El socio pone su huella en el sensor AS608.                                                           |
| Precondiciones         | Sesión iniciada; huella registrada.                                                                   |
| Camino feliz           | Huella → identificación → membresía activa y vigente → «Acceso permitido» → registro en el historial. |
| Alternativas           | Membresía vencida, cancelada o inexistente → «Acceso denegado» con el motivo.                         |
| Errores y recuperación | Huella no reconocida o sin conexión → mensaje y validación manual por cédula.                         |
| Permisos               | Administrador y Empleado.                                                                             |
| Datos requeridos       | Captura de la huella (hoy simulada).                                                                  |
| Pantallas relacionadas | UI-06, UI-07                                                                                          |
| Historias / casos      | HU-005, HU-006, HU-007 / CU-004                                                                       |
| Criterios de éxito     | Respuesta en menos de 2 s (RNF-003).                                                                  |
| Evidencia              |                                                                                                       |

### 5.3 Reglas de navegación

| **ID**  | **Origen** | **Acción**                          | **Destino**   | **Condición**                | **Comportamiento de retorno**                   |
| ------- | ---------- | ----------------------------------- | ------------- | ---------------------------- | ----------------------------------------------- |
| NAV-001 | UI-01      | Enviar credenciales válidas         | UI-02         | Token JWT recibido           | Cerrar sesión vuelve a UI-01 (con confirmación) |
| NAV-002 | UI-02      | Seleccionar opción del menú lateral | UI-03 a UI-09 | Opción visible para el rol   | Menú lateral siempre disponible                 |
| NAV-003 | UI-03      | Seleccionar «Renovar por cédula»    | UI-05         | Cliente con membresía activa | Volver a Clientes desde el menú                 |

## 6\. Inventario y especificación de pantallas

### 6.1 Inventario maestro

| **ID** | **Pantalla / vista**                | **Tipo** | **Actor**                            | **Objetivo** | **Flujo** | **HU / RF**    | **Estado**   | **Versión** |
| ------ | ----------------------------------- | -------- | ------------------------------------ | ------------ | --------- | -------------- | ------------ | ----------- |
| UI-01  | Inicio de sesión                    | Página   | Todos                                |              |           | HU-002         | Implementado | 1.0         |
| UI-02  | Inicio (dashboard)                  | Página   | Admin, Empleado                      |              |           | HU-012         | Implementado | 1.0         |
| UI-03  | Gestión de clientes                 | Página   | Admin, Empleado                      |              |           | HU-001         | Implementado | 1.0         |
| UI-04  | Gestión de planes                   | Página   | Admin (gestión), Empleado (consulta) |              |           | HU-003         | Implementado | 1.0         |
| UI-05  | Membresías: asignación y renovación | Página   | Admin, Empleado                      |              |           | HU-004, HU-008 | Implementado | 1.0         |
| UI-06  | Control de acceso por huella        | Página   | Admin, Empleado                      |              |           | HU-005, HU-006 | Implementado | 1.0         |
| UI-07  | Historial de accesos                | Página   | Admin, Empleado                      |              |           | HU-006         | Implementado | 1.0         |
| UI-08  | Personal                            | Página   | Admin                                |              |           | HU-002         | Implementado | 1.0         |
| UI-09  | Registro financiero                 | Página   | Admin                                |              |           | HU-008         | Implementado | 1.0         |

### 6.2 Ficha de pantalla

| **Campo**                 | **Contenido**                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| ID y nombre               | UI-05 – Membresías: asignación y renovación                                                 |
| Objetivo                  | Asignar o renovar la membresía pagada por el cliente.                                       |
| Usuarios / roles          | Administrador, Empleado                                                                     |
| Requisitos e historias    | RF-005, RF-006 / HU-004, HU-008                                                             |
| Flujo relacionado         | FLU-003                                                                                     |
| Datos mostrados           | Cliente, plan, fechas de inicio y fin, estado.                                              |
| Acciones disponibles      | Asignar membresía, renovar por cédula, cambiar estado.                                      |
| Reglas y validaciones     | Fecha de inicio no anterior a hoy; plan activo; una sola membresía activa (RN-003, RN-005). |
| Permisos                  | Eliminar membresía solo Administrador.                                                      |
| Componentes               | BuscadorCliente, FormularioMembresia, RenovarMembresia.                                     |
| Estados                   | Carga («Cargando membresías...»), vacío, éxito, validación y error.                         |
| Navegación                | Menú lateral.                                                                               |
| Responsive                | Una columna por debajo de 760 px.                                                           |
| Accesibilidad             |                                                                                             |
| Prototipo                 |                                                                                             |
| Responsable de aprobación | Liliana Sofía Panesso Méndez (Product Owner)                                                |
| Estado                    | Implementado                                                                                |

### 6.3 Matriz pantalla–rol–acción

| **Pantalla**              | **Rol**                  | **Consultar** | **Crear** | **Editar** | **Eliminar / desactivar** | **Exportar** | **Observaciones**                              |
| ------------------------- | ------------------------ | ------------- | --------- | ---------- | ------------------------- | ------------ | ---------------------------------------------- |
| UI-03 Clientes            | Administrador / Empleado | Sí            | Sí        | Sí         | No (RN-001)               | No           | La cédula no se edita                          |
| UI-04 Planes              | Administrador            | Sí            | Sí        | Sí         | Sí (desactivar)           | No           | Empleado solo consulta                         |
| UI-05 Membresías          | Administrador / Empleado | Sí            | Sí        | Estado     | Solo Administrador        | No           |                                                |
| UI-08 Personal            | Administrador            | Sí            | Sí        | No         | Sí                        | No           | No la propia cuenta ni el último administrador |
| UI-09 Registro financiero | Administrador            | Sí            | No        | No         | No                        | No           | Solo lectura                                   |

## 7\. Wireframes

Los wireframes representan estructura, jerarquía y navegación antes de definir el acabado visual. Deben ser rápidos de modificar y suficientemente claros para validar el flujo.

### 7.1 Registro de wireframes

| **ID** | **Pantalla** | **Objetivo**     | **Formato**    | **Versión** | **Ubicación** | **Estado** | **Validado por** |
| ------ | ------------ | ---------------- | -------------- | ----------- | ------------- | ---------- | ---------------- |
| WF-001 | UI-01        | Inicio de sesión | Baja fidelidad | 1.0         |               |            |                  |

### 7.2 Contenido mínimo por wireframe

  - Código y nombre de pantalla.

  - Jerarquía de información.

  - Controles y acciones principales.

  - Navegación asociada.

  - Estados relevantes.

  - Notas de reglas o restricciones.

  - Relación con historia, caso de uso o requisito.

### 7.3 Criterios de aprobación

| **Criterio**                                        | **Cumple** | **Observación** |
| --------------------------------------------------- | ---------- | --------------- |
| La estructura soporta la tarea principal.           | Sí / No    |                 |
| La jerarquía visual es comprensible sin decoración. | Sí / No    |                 |
| La navegación coincide con el flujo aprobado.       | Sí / No    |                 |
| Se consideran errores y estados vacíos.             | Sí / No    |                 |
| No se agregan funcionalidades fuera del alcance.    | Sí / No    |                 |

## 8\. Mockups y prototipos

### 8.1 Registro de mockups

| **ID** | **Pantalla** | **Dispositivo** | **Versión** | **Enlace** | **Estado** | **Aprobación** |
| ------ | ------------ | --------------- | ----------- | ---------- | ---------- | -------------- |
| MK-001 | UI-02        | Escritorio      | 1.1         |            |            |                |

### 8.2 Registro de prototipos

| **ID**  | **Flujo**         | **Nivel**   | **Versión** | **Enlace** | **Instrucciones** | **Validado por** |
| ------- | ----------------- | ----------- | ----------- | ---------- | ----------------- | ---------------- |
| PRT-001 | FLU-002 a FLU-005 | Interactivo | 1.2         |            |                   |                  |

### 8.3 Reglas de versionamiento

  - El enlace compartido debe corresponder a una versión identificable.

  - Los cambios posteriores a una aprobación deben registrarse.

  - Las capturas del documento deben indicar versión y fecha.

  - Los componentes repetidos deben derivarse del sistema de diseño.

  - El prototipo no sustituye los criterios de aceptación ni las pruebas.

## 9\. Estados y comportamiento de interfaz

### 9.1 Estados obligatorios

| **Estado**           | **Descripción**                      | **Comportamiento esperado**                    |
| -------------------- | ------------------------------------ | ---------------------------------------------- |
| Inicial              | Vista antes de interacción.          | Presenta contexto y acción principal.          |
| Carga                | El sistema procesa o consulta.       | Evita acciones duplicadas y comunica progreso. |
| Vacío                | No existen datos.                    | Explica la situación y propone acción útil.    |
| Éxito                | Operación completada.                | Confirma resultado y siguiente paso.           |
| Error de validación  | Datos inválidos o incompletos.       | Indica campo, causa y corrección.              |
| Error del sistema    | Fallo técnico o dependencia.         | Mensaje seguro, opción de reintento o soporte. |
| Permiso insuficiente | Acción no autorizada.                | No expone información sensible y orienta.      |
| Sesión expirada      | La autenticación ya no es válida.    | Protege datos y permite reingreso controlado.  |
| Sin conexión         | No hay conectividad, cuando aplique. | Indica limitación y recuperación.              |
| Confirmación         | Acción sensible o irreversible.      | Explica consecuencia y ofrece cancelar.        |

### 9.2 Matriz de estados por pantalla

| **Pantalla** | **Inicial** | **Carga** | **Vacío** | **Éxito** | **Validación** | **Error** | **Permiso** | **Sesión** | **Observación**                                            |
| ------------ | ----------- | --------- | --------- | --------- | -------------- | --------- | ----------- | ---------- | ---------------------------------------------------------- |
| UI-03        | Sí          | Sí        | Sí        | Sí        | Sí             | Sí        | N.A.        | Sí         | «Cargando clientes...», «Aún no hay clientes registrados.» |
| UI-04        | Sí          | Sí        | Sí        | Sí        | Sí             | Sí        | Sí          | Sí         | El Empleado no ve acciones de edición                      |
| UI-05        | Sí          | Sí        | Sí        | Sí        | Sí             | Sí        | N.A.        | Sí         |                                                            |
| UI-07        | Sí          | Sí        | Sí        | N.A.      | Sí             | Sí        | N.A.        | Sí         | «Aún no hay accesos registrados.»                          |

### 9.3 Mensajes y prevención de errores

  - No usar mensajes vagos como “Algo salió mal” sin orientación.

  - No borrar información sin confirmación o mecanismo de recuperación cuando el riesgo lo requiera.

  - No revelar detalles internos, credenciales o existencia de usuarios.

  - Conservar los datos válidos cuando un formulario falla.

  - Deshabilitar acciones duplicadas durante el procesamiento.

## 10\. Diseño responsive y compatibilidad

### 10.1 Dispositivos y breakpoints

| **Perfil** | **Rango / dispositivo**            | **Prioridad** | **Orientación** | **Criterio de aceptación**    |
| ---------- | ---------------------------------- | ------------- | --------------- | ----------------------------- |
| Móvil      | ≤ 560 px (ajustes en 520 y 420 px) | Media         | Vertical        | Sin desbordamiento horizontal |
| Tableta    | 561 a 900 px (ajuste en 760 px)    | Alta          | Ambas           | Formularios en una columna    |
| Escritorio | \> 900 px (ajuste en 1080 px)      | Alta          | Horizontal      | Menú lateral visible          |

### 10.2 Matriz de comportamiento responsive

| **Componente / pantalla** | **Móvil** | **Tableta** | **Escritorio** | **Regla** |
| ------------------------- | --------- | ----------- | -------------- | --------- |
| Navegación                |           |             |                |           |
| Tabla de datos            |           |             |                |           |
| Formulario                |           |             |                |           |
| Modal / panel             |           |             |                |           |

### 10.3 Compatibilidad

| **Plataforma** | **Versión objetivo**  | **Prioridad** | **Método de prueba**  | **Resultado** |
| -------------- | --------------------- | ------------- | --------------------- | ------------- |
| Chrome         | Dos últimas versiones | Alta          | Manual / automatizada |               |
| Firefox        | Dos últimas versiones | Media         |                       |               |
| Edge           | Dos últimas versiones | Alta          |                       |               |
| Android / iOS  |                       | Baja          |                       |               |

## 11\. Accesibilidad

El diseño debe atender los criterios WCAG AA aplicables al alcance y demostrar que los flujos principales pueden usarse sin barreras evitables.

### 11.1 Lista mínima de verificación

| **N.°** | **Criterio**                                                | **Cumple**     | **Evidencia** |
| ------- | ----------------------------------------------------------- | -------------- | ------------- |
| 1       | Contraste suficiente entre texto, iconos y fondo.           | Sí / No        |               |
| 2       | Foco visible y orden lógico de teclado.                     | Sí / No        |               |
| 3       | Campos con etiquetas persistentes y mensajes asociados.     | Sí / No        |               |
| 4       | Controles con nombre accesible y propósito claro.           | Sí / No        |               |
| 5       | La información no depende únicamente del color.             | Sí / No        |               |
| 6       | Tamaño de texto legible y zoom sin pérdida funcional.       | Sí / No        |               |
| 7       | Imágenes informativas con alternativa textual.              | Sí / No / N.A. |               |
| 8       | Tablas con encabezados y estructura comprensible.           | Sí / No / N.A. |               |
| 9       | Modales y menús gestionan foco correctamente.               | Sí / No / N.A. |               |
| 10      | Mensajes de error son identificables y corregibles.         | Sí / No        |               |
| 11      | Objetivos táctiles tienen tamaño y separación adecuados.    | Sí / No / N.A. |               |
| 12      | Animaciones respetan reducción de movimiento cuando aplica. | Sí / No / N.A. |               |

### 11.2 Registro de hallazgos

| **ID**  | **Pantalla / componente** | **Criterio** | **Severidad** | **Hallazgo** | **Acción** | **Estado** |
| ------- | ------------------------- | ------------ | ------------- | ------------ | ---------- | ---------- |
| ACC-001 | UI-\_\_\_ / CMP-\_\_\_    |              | Alta          |              |            | Abierto    |
| ACC-002 |                           |              |               |              |            |            |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Aclaración importante</strong></p>
<p>Accesibilidad no significa únicamente contraste. Incluye estructura semántica, operación por teclado, foco, etiquetas, mensajes, tamaño táctil, comprensión y compatibilidad con tecnologías de asistencia.</p></td>
</tr>
</tbody>
</table>

## 12\. Sistema de diseño

### 12.1 Principios y alcance

El sistema de diseño reúne reglas, tokens, componentes, patrones, documentación y criterios de implementación. Debe ser suficientemente pequeño para el proyecto, pero consistente y reutilizable.

### 12.2 Design tokens

| **Categoría** | **Token**   | **Valor**       | **Uso**                  | **Restricción**            |
| ------------- | ----------- | --------------- | ------------------------ | -------------------------- |
| Color         | \--amarillo | \#f5d000        | Acción principal y marca | Validar contraste.         |
| Tipografía    | font-family | Poppins 400–900 | Toda la interfaz         | Cargada desde Google Fonts |
| Espaciado     |             |                 |                          |                            |
| Radio         | \--radio    | 18px            | Tarjetas y paneles       |                            |
| Sombra        |             |                 |                          |                            |
| Movimiento    |             |                 |                          |                            |

### 12.3 Paleta de colores

| **Token**                        | **Muestra / hexadecimal**      | **Uso**                      | **Contraste validado** | **Observaciones**            |
| -------------------------------- | ------------------------------ | ---------------------------- | ---------------------- | ---------------------------- |
| \--amarillo                      | \#f5d000                       | Acciones principales y marca |                        | Hover: --amarillo-2 \#ffd94d |
| \--verde                         | \#43d18d                       | Éxito / acceso permitido     |                        |                              |
| \--amarillo-2                    | \#ffd94d                       | Advertencia / hover          |                        |                              |
| \--rojo                          | \#ff5d5d                       | Errores / acceso denegado    |                        |                              |
| \--negro / --negro-2 / --negro-3 | \#0d0d0d / \#121417 / \#1b1e22 | Fondos y paneles             |                        | Fondo del body \#090a0b      |
| \--blanco / --gris-texto         | \#f4f4f4 / \#9aa0a6            | Texto principal y secundario |                        |                              |

### 12.4 Tipografía

| **Token**       | **Fuente** | **Peso** | **Tamaño / línea** | **Uso**          | **Responsive** |
| --------------- | ---------- | -------- | ------------------ | ---------------- | -------------- |
| font.display    | Poppins    | 700      |                    | Portada / hero   |                |
| font.heading.lg | Poppins    | 700      |                    | Título de página |                |
| font.heading.md | Poppins    | 600      |                    | Sección          |                |
| font.body.md    | Poppins    | 400      |                    | Texto general    |                |
| font.label      | Poppins    | 500      |                    | Etiquetas        |                |
| font.caption    | Poppins    | 400      |                    | Ayuda secundaria |                |

### 12.5 Espaciado, grid y breakpoints

| **Elemento** | **Escala / valor**                | **Regla de uso**                                     |
| ------------ | --------------------------------- | ---------------------------------------------------- |
| Unidad base  |                                   | Ej. 4 u 8 px, aplicada de forma consistente.         |
| Contenedor   |                                   | Ancho máximo y márgenes.                             |
| Grid         |                                   | Columnas, gutter y comportamiento.                   |
| Breakpoints  | 1080, 900, 760, 560, 520 y 420 px | Móvil, tableta y escritorio definidos por contenido. |
| Densidad     |                                   | Evitar controles demasiado compactos.                |

## 13\. Componentes y patrones

### 13.1 Catálogo de componentes

| **ID**     | **Componente**       | **Variantes**                              | **Estados**                                          | **Uso**                              | **No usar cuando**     | **Implementación**             |
| ---------- | -------------------- | ------------------------------------------ | ---------------------------------------------------- | ------------------------------------ | ---------------------- | ------------------------------ |
| CMP-UI-001 | Botón                | Primario (amarillo) / secundario / peligro | Default, hover, deshabilitado mientras guarda        | Acciones de formularios              |                        | index.css (botones globales)   |
| CMP-UI-002 | Campo                | Texto, número, fecha, correo               | Normal, error junto al campo                         | Formularios                          |                        | components/Campo.jsx           |
| CMP-UI-003 | Buscador de clientes | Por nombre o cédula                        | Sin resultados, más de 8 coincidencias, seleccionado | Asignar membresía y registrar huella | Listas cortas (planes) | components/BuscadorCliente.jsx |
| CMP-UI-004 | Barra lateral        | Opciones por rol                           | Activa / inactiva                                    | Navegación principal                 |                        | components/BarraLateral.jsx    |
| CMP-UI-005 | Tabla de pagos       | Resumen y detalle                          | Vacío, con datos                                     | Registro financiero                  |                        | components/TablaPagos.jsx      |

### 13.2 Ficha de componente

| **Campo**            | **Contenido**                                                        |
| -------------------- | -------------------------------------------------------------------- |
| ID y nombre          | CMP-UI-\_\_\_ – \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Propósito            | Problema que resuelve.                                               |
| Anatomía             | Partes internas.                                                     |
| Variantes            | Tamaño, jerarquía o contexto.                                        |
| Estados              | Default, hover, focus, active, disabled, loading, error.             |
| Contenido            | Reglas de etiqueta, iconos y ayuda.                                  |
| Comportamiento       | Interacción con mouse, teclado y táctil.                             |
| Accesibilidad        | Rol, nombre, foco y atributos.                                       |
| Responsive           | Cambios según espacio.                                               |
| Tokens               | Color, tipografía, espaciado y movimiento.                           |
| Ejemplos correctos   |                                                                      |
| Ejemplos incorrectos |                                                                      |
| Código / librería    | Componente implementado o referencia.                                |
| Pruebas              | Visuales, unitarias o accesibilidad.                                 |
| Versión y estado     |                                                                      |

### 13.3 Patrones funcionales

| **Patrón**            | **Objetivo**                                             | **Reglas mínimas**                                                           |
| --------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Formulario            | Capturar datos con prevención y recuperación de errores. | Etiquetas persistentes, ayuda, validación y resumen de error cuando aplique. |
| Tabla y filtros       | Explorar volúmenes de datos.                             | Orden, filtros, paginación, estado vacío y accesibilidad.                    |
| Confirmación sensible | Evitar acciones accidentales.                            | Consecuencia clara, acción primaria específica y cancelar.                   |
| Carga de archivos     | Seleccionar, validar y confirmar.                        | Formato, tamaño, progreso, error y eliminación.                              |
| Notificación          | Informar sin interrumpir innecesariamente.               | Severidad, duración y acción relacionada.                                    |

## 14\. UX writing y contenido

### 14.1 Voz y tono

| **Atributo** | **Aplicación**                             | **Evitar**                   |
| ------------ | ------------------------------------------ | ---------------------------- |
| Claro        | Frases directas y vocabulario del usuario. | Jerga técnica innecesaria.   |
| Respetuoso   | No culpa al usuario.                       | “Usted se equivocó”.         |
| Accionable   | Indica qué ocurrió y qué hacer.            | Mensajes sin siguiente paso. |
| Consistente  | Mismos términos para mismos conceptos.     | Sinónimos confusos.          |
| Breve        | Elimina palabras que no aportan.           | Párrafos largos en alertas.  |

### 14.2 Catálogo de mensajes

| **ID**  | **Contexto**           | **Tipo**    | **Mensaje**                                                           | **Acción**        | **Pantalla / componente** |
| ------- | ---------------------- | ----------- | --------------------------------------------------------------------- | ----------------- | ------------------------- |
| MSG-001 | Operación completada   | Éxito       | Cliente "\<nombre\>" registrado correctamente.                        | Continuar         | UI-03                     |
| MSG-002 | Dato inválido          | Validación  | La cédula solo puede tener números.                                   | Corregir el campo | UI-03                     |
| MSG-003 | Regla de negocio       | Advertencia | Este cliente ya tiene una membresía activa. Usa «Renovar por cédula». | Renovar           | UI-05                     |
| MSG-004 | Credenciales inválidas | Error       | Credenciales incorrectas o error en el servidor. Inténtalo de nuevo.  | Reintentar        | UI-01                     |

### 14.3 Reglas de contenido

  - Los botones describen la acción: “Guardar cambios”, no “Aceptar” cuando pueda ser ambiguo.

  - Los placeholders no sustituyen etiquetas.

  - Los errores se ubican cerca del campo y se anuncian de forma accesible.

  - Las fechas, monedas y unidades usan formato consistente.

  - Las confirmaciones sensibles nombran el objeto y la consecuencia.

  - El contenido de ayuda no oculta reglas críticas.

## 15\. Pruebas de usabilidad y validación

### 15.1 Plan de prueba

| **Campo**              | **Contenido**                                      |
| ---------------------- | -------------------------------------------------- |
| ID                     | USAB-\_\_\_                                        |
| Objetivo               |                                                    |
| Hipótesis              |                                                    |
| Perfiles participantes |                                                    |
| Cantidad y selección   |                                                    |
| Tareas críticas        |                                                    |
| Prototipo / versión    |                                                    |
| Modalidad              | Moderada / no moderada / presencial / remota       |
| Métricas               | Éxito, tiempo, errores, satisfacción, comentarios. |
| Criterio de aprobación |                                                    |
| Responsable            |                                                    |
| Fecha                  |                                                    |

### 15.2 Guion de tareas

| **ID**      | **Escenario** | **Tarea** | **Éxito esperado** | **Dato a observar** |
| ----------- | ------------- | --------- | ------------------ | ------------------- |
| TAR-USAB-01 |               |           |                    |                     |
| TAR-USAB-02 |               |           |                    |                     |

### 15.3 Registro de resultados

| **Participante** | **Tarea**   | **Completó** | **Tiempo** | **Errores** | **Hallazgo** | **Severidad** |
| ---------------- | ----------- | ------------ | ---------- | ----------- | ------------ | ------------- |
| P-01             | TAR-USAB-01 | Sí / No      |            |             |              |               |
| P-02             |             |              |            |             |              |               |

### 15.4 Hallazgos y decisiones

| **ID**  | **Hallazgo** | **Evidencia** | **Severidad** | **Decisión** | **Responsable** | **Estado** |
| ------- | ------------ | ------------- | ------------- | ------------ | --------------- | ---------- |
| UXH-001 |              |               | Alta          |              |                 | Abierto    |
| UXH-002 |              |               |               |              |                 |            |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio de calidad</strong></p>
<p>No se considera validación preguntar solamente “¿le gusta?”. La prueba debe observar tareas concretas, errores, comprensión y capacidad de completar el flujo.</p></td>
</tr>
</tbody>
</table>

## 16\. Entrega a desarrollo y control de cambios

### 16.1 Paquete de handoff

| **Elemento**            | **Obligatorio** | **Ubicación** | **Responsable** | **Verificación** |
| ----------------------- | --------------- | ------------- | --------------- | ---------------- |
| Prototipo versionado    | Sí              |               |                 |                  |
| Inventario de pantallas | Sí              |               |                 |                  |
| Tokens y estilos        | Sí              |               |                 |                  |
| Componentes y estados   | Sí              |               |                 |                  |
| Assets exportables      | Según aplique   |               |                 |                  |
| Reglas responsive       | Sí              |               |                 |                  |
| Accesibilidad           | Sí              |               |                 |                  |
| Mensajes y contenido    | Sí              |               |                 |                  |
| Trazabilidad UI–HU–RF   | Sí              |               |                 |                  |
| Hallazgos pendientes    | Sí              |               |                 |                  |

### 16.2 Registro de decisiones de diseño

| **ID** | **Fecha** | **Contexto**                                        | **Alternativas**               | **Decisión**                                      | **Justificación**                                 | **Impacto**   | **Responsable**        |
| ------ | --------- | --------------------------------------------------- | ------------------------------ | ------------------------------------------------- | ------------------------------------------------- | ------------- | ---------------------- |
| DD-001 | Sprint 9  | Interfaz servida por el backend difícil de mantener | HTML del backend; SPA en React | SPA en React con Vite (CR-003)                    | Componentes reutilizables y servicios por recurso | UI-01 a UI-09 | Juan Diego Mejía Llano |
| DD-002 | Sprint 10 | Cientos de clientes en una lista desplegable        | Lista desplegable; buscador    | Componente BuscadorCliente (máx. 8 coincidencias) | Selección rápida en la recepción                  | UI-05, UI-06  | Juan Diego Mejía Llano |

### 16.3 Solicitud de cambio de diseño

| **ID**     | **Origen** | **Cambio solicitado** | **Motivo** | **Impacto** | **Decisión**         | **Versión** | **Responsable** |
| ---------- | ---------- | --------------------- | ---------- | ----------- | -------------------- | ----------- | --------------- |
| CHG-UX-001 |            |                       |            |             | Aprobado / Rechazado |             |                 |
| CHG-UX-002 |            |                       |            |             |                      |             |                 |

### 16.4 Criterios de correspondencia con implementación

  - El componente implementado usa tokens y variantes documentados.

  - Las pantallas incluyen los estados definidos.

  - Las interacciones por teclado coinciden con la especificación.

  - Los textos corresponden al catálogo aprobado.

  - Los cambios de alcance o diseño tienen decisión registrada.

  - El prototipo no debe describir funcionalidades inexistentes en la entrega final.

## 17\. Trazabilidad, indicadores y aprobación

### 17.1 Matriz resumida

| **UI / flujo** | **Perfil** | **HU / CU**    | **RF / RNF** | **Reglas** | **Componente**       | **Prueba** | **Evidencia** | **Estado**   |
| -------------- | ---------- | -------------- | ------------ | ---------- | -------------------- | ---------- | ------------- | ------------ |
| UI-01          | PER-002    | HU-002         |              |            | pages/Login.jsx      |            |               | Implementado |
| UI-02          | PER-002    | HU-012         |              |            | pages/Inicio.jsx     |            |               | Implementado |
| UI-03          | PER-002    | HU-001         |              |            | pages/Clientes.jsx   |            |               | Implementado |
| UI-04          | PER-002    | HU-003         |              |            | pages/Planes.jsx     |            |               | Implementado |
| UI-05          | PER-002    | HU-004, HU-008 |              |            | pages/Membresias.jsx |            |               | Implementado |
| UI-06          | PER-002    | HU-005, HU-006 |              |            | pages/Acceso.jsx     |            |               | Implementado |
| UI-07          | PER-002    | HU-006         |              |            | pages/Historial.jsx  |            |               | Implementado |
| UI-08          | PER-001    | HU-002         |              |            | pages/Personal.jsx   |            |               | Implementado |
| UI-09          | PER-001    | HU-008         |              |            | pages/Finanzas.jsx   |            |               | Implementado |

### 17.2 Indicadores sugeridos

| **Indicador**               | **Fórmula / método**                             | **Meta**             | **Frecuencia**     | **Fuente**      |
| --------------------------- | ------------------------------------------------ | -------------------- | ------------------ | --------------- |
| Cobertura de pantallas      | Pantallas trazadas / pantallas inventariadas     | 100%                 | Por versión        | Matriz          |
| Flujos críticos validados   | Flujos aprobados / flujos críticos               | 100%                 | Antes de construir | Actas / pruebas |
| Éxito de tareas             | Participantes que completan / participantes      | Definir por contexto | Por prueba         | Resultados      |
| Hallazgos críticos abiertos | Conteo                                           | 0 antes de entrega   | Semanal            | Registro UX     |
| Cobertura de estados        | Estados diseñados / estados aplicables           | 100%                 | Por versión        | Ficha UI        |
| Componentes reutilizados    | Uso de componentes del sistema / total aplicable | Meta definida        | Por release        | Código / diseño |

### 17.3 Lista de verificación final

| **N.°** | **Verificación**                                                           | **Cumple**     | **Evidencia / observación** |
| ------- | -------------------------------------------------------------------------- | -------------- | --------------------------- |
| 1       | Los perfiles y necesidades tienen fuente o validación.                     | Sí / No / N.A. |                             |
| 2       | La arquitectura de información coincide con el alcance.                    | Sí / No / N.A. |                             |
| 3       | Los flujos principales, alternativos y de error están documentados.        | Sí / No / N.A. |                             |
| 4       | Todas las pantallas tienen código y trazabilidad.                          | Sí / No / N.A. |                             |
| 5       | Los prototipos están versionados y aprobados.                              | Sí / No / N.A. |                             |
| 6       | Se diseñaron estados de carga, vacío, éxito, error y permisos.             | Sí / No / N.A. |                             |
| 7       | El comportamiento responsive está especificado.                            | Sí / No / N.A. |                             |
| 8       | Los criterios básicos de accesibilidad fueron verificados.                 | Sí / No / N.A. |                             |
| 9       | El sistema de diseño contiene tokens, componentes y estados.               | Sí / No / N.A. |                             |
| 10      | Los textos y mensajes son consistentes y accionables.                      | Sí / No / N.A. |                             |
| 11      | Existen resultados de pruebas de usabilidad o justificación de limitación. | Sí / No / N.A. |                             |
| 12      | El paquete de handoff permite implementar sin ambigüedad.                  | Sí / No / N.A. |                             |
| 13      | La interfaz implementada corresponde con la versión aprobada.              | Sí / No / N.A. |                             |
| 14      | Los cambios posteriores están registrados.                                 | Sí / No / N.A. |                             |

### 17.4 Aprobación del documento

| **Rol**               | **Nombre**                                   | **Decisión**        | **Fecha** | **Firma / evidencia** |
| --------------------- | -------------------------------------------- | ------------------- | --------- | --------------------- |
| Responsable funcional | Liliana Sofía Panesso Méndez (Product Owner) | Aprobado / Devuelto |           |                       |
| Responsable UX/UI     | Maileth Begambre Movilla                     | Aprobado / Devuelto |           |                       |
| Líder técnico         | Juan Diego Mejía Llano                       | Aprobado / Devuelto |           |                       |
| Instructor            |                                              | Aprobado / Devuelto |           |                       |

## Anexo A. Convenciones de identificación

| **Elemento**         | **Prefijo** | **Ejemplo** |
| -------------------- | ----------- | ----------- |
| Persona / perfil     | PER         | PER-001     |
| Necesidad            | NEC         | NEC-001     |
| Contenido            | CONT        | CONT-001    |
| Flujo                | FLU         | FLU-001     |
| Navegación           | NAV         | NAV-001     |
| Pantalla             | UI          | UI-001      |
| Wireframe            | WF          | WF-001      |
| Mockup               | MK          | MK-001      |
| Prototipo            | PRT         | PRT-001     |
| Componente UI        | CMP-UI      | CMP-UI-001  |
| Mensaje              | MSG         | MSG-001     |
| Prueba de usabilidad | USAB        | USAB-001    |
| Hallazgo UX          | UXH         | UXH-001     |
| Decisión de diseño   | DD          | DD-001      |
| Cambio UX            | CHG-UX      | CHG-UX-001  |

## Anexo B. Estructura recomendada en el repositorio

/docs/diseno/  
investigacion/  
arquitectura-informacion/  
flujos/  
pantallas/  
sistema-diseno/  
pruebas-usabilidad/  
decisiones/  
assets/  
README.md

## Anexo C. Evidencias mínimas por nivel de madurez

| **Nivel**            | **Evidencia mínima**                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------- |
| Formulación          | Perfiles preliminares, mapa de navegación y wireframes de flujos críticos.                    |
| Construcción inicial | Mockups aprobados, inventario de pantallas, estados y reglas responsive.                      |
| Producto funcional   | Prototipo, sistema de diseño, accesibilidad básica y pruebas de usabilidad.                   |
| Producto profesional | Biblioteca implementada, pruebas visuales, auditoría de accesibilidad y control de versiones. |
| Producto avanzado    | Analítica, experimentación, métricas continuas y automatización visual.                       |

## Anexo D. Errores frecuentes que deben evitarse

  - Diseñar primero y justificar después.

  - Usar placeholders como etiquetas.

  - Mostrar solamente el camino feliz.

  - Copiar un design system completo que el proyecto no necesita.

  - Usar colores sin comprobar contraste.

  - Crear pantallas sin permisos ni estados de error.

  - Aprobar interfaces solo por apariencia.

  - Pegar capturas sin versión ni enlace editable.

  - Cambiar el diseño durante desarrollo sin registrar impacto.

  - Documentar una interfaz distinta a la entregada.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Cierre</strong></p>
<p>El documento se considera completo cuando otra persona puede comprender los usuarios, recorrer los flujos, localizar cada pantalla, implementar los componentes y verificar la experiencia sin depender de explicaciones informales del equipo.</p></td>
</tr>
</tbody>
</table>
