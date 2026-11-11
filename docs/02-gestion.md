# Gestión de interesados y del proyecto

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/01_Inicio_y_Planeacion/Gestion_de_Interesados_y_del_Proyecto_ZonaFitEvolution.pdf`](entregables/01_Inicio_y_Planeacion/Gestion_de_Interesados_y_del_Proyecto_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Elemento**             | **Detalle**                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| Código documental        | ADSO-GES-01                                                       |
| Nombre                   | Gestión de Interesados y del Proyecto                             |
| Clasificación            | Documento de gestión                                              |
| Estado                   | En revisión                                                       |
| Propietario              | Juan Diego Mejía Llano (Scrum Master)                             |
| Revisor funcional        | Liliana Sofía Panesso Méndez (Product Owner)                      |
| Revisor académico        |                                                                   |
| Ubicación oficial        | Carpeta documentos\_proyecto y Tablero de Jira del proyecto SCRUM |
| Periodicidad de revisión | Al cierre de cada sprint (cada dos semanas)                       |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción del cambio**                                                                    | **Responsable**        | **Aprobado por** |
| ----------- | ---------- | --------------------------------------------------------------------------------------------- | ---------------------- | ---------------- |
| 0.1         | 20/10/2026 | Creación inicial a partir del documento maestro (secciones 2.1 a 2.7)                         | Juan Diego Mejía Llano |                  |
| 1.0         | 03/11/2026 | Versión para revisión: interesados, equipo, Scrum, cronograma, riesgos, cambios y entregables | Juan Diego Mejía Llano |                  |
| 1.1         | 10/11/2026 | AS608 integrado (BLQ-01 y RSK-06 cerrados), límite de intentos integrado y nuevos pendientes  | Juan Diego Mejía Llano |                  |

### Registro de aprobaciones

| **Rol**            | **Nombre**                   | **Decisión**        | **Fecha**  | **Observaciones** |
| ------------------ | ---------------------------- | ------------------- | ---------- | ----------------- |
| Líder del proyecto | Juan Diego Mejía Llano       | Elaborado           | 03/11/2026 |                   |
| Product Owner      | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |            |                   |
| Instructor         |                              | Aprobado / Devuelto |            |                   |

Table of Contents

[Control documental 2](#control-documental)

[Historial de versiones 2](#historial-de-versiones)

[Registro de aprobaciones 2](#registro-de-aprobaciones)

[1. Propósito y alcance del documento 6](#propósito-y-alcance-del-documento)

[1.1 Objetivos específicos 6](#objetivos-específicos)

[1.2 Alcance 6](#alcance)

[2. Principios de gestión 6](#principios-de-gestión)

[3. Relación con otros artefactos 7](#relación-con-otros-artefactos)

[4. Identificación y análisis de interesados 8](#identificación-y-análisis-de-interesados)

[4.1 Definiciones 8](#definiciones)

[4.2 Registro de interesados 8](#registro-de-interesados)

[4.3 Análisis de interés e influencia 8](#análisis-de-interés-e-influencia)

[4.4 Matriz de evaluación de interesados 9](#matriz-de-evaluación-de-interesados)

[4.5 Riesgos asociados a interesados 9](#riesgos-asociados-a-interesados)

[5. Estrategia de involucramiento y comunicación 10](#estrategia-de-involucramiento-y-comunicación)

[5.1 Plan de comunicación 10](#plan-de-comunicación)

[5.2 Reglas de comunicación 10](#reglas-de-comunicación)

[5.3 Estrategia de validación 10](#estrategia-de-validación)

[5.4 Manejo de desacuerdos y escalamiento 10](#manejo-de-desacuerdos-y-escalamiento)

[6. Organización del proyecto 11](#organización-del-proyecto)

[6.1 Estructura del equipo 11](#estructura-del-equipo)

[6.2 Matriz RACI 11](#matriz-raci)

[6.3 Responsabilidades mínimas por rol 11](#responsabilidades-mínimas-por-rol)

[6.4 Autoridad del líder del proyecto 12](#autoridad-del-líder-del-proyecto)

[7. Metodología y forma de trabajo 13](#metodología-y-forma-de-trabajo)

[7.1 Selección de metodología 13](#selección-de-metodología)

[7.2 Justificación del enfoque elegido 13](#justificación-del-enfoque-elegido)

[7.3 Flujo de trabajo 13](#flujo-de-trabajo)

[7.4 Definition of Ready 14](#definition-of-ready)

[7.5 Definition of Done 14](#definition-of-done)

[8. Planificación, entregas e hitos 15](#planificación-entregas-e-hitos)

[8.1 Roadmap general 15](#roadmap-general)

[8.2 Plan de iteraciones 15](#plan-de-iteraciones)

[8.3 Dependencias y bloqueos 15](#dependencias-y-bloqueos)

[8.4 Control de compromisos 15](#control-de-compromisos)

[9. Gestión de reuniones y acuerdos 17](#gestión-de-reuniones-y-acuerdos)

[9.1 Tipos de reunión 17](#tipos-de-reunión)

[9.2 Formato de acta breve 17](#formato-de-acta-breve)

[9.3 Registro de decisiones no arquitectónicas 17](#registro-de-decisiones-no-arquitectónicas)

[10. Gestión de riesgos 18](#gestión-de-riesgos)

[10.1 Criterios de valoración 18](#criterios-de-valoración)

[10.2 Registro de riesgos 18](#registro-de-riesgos)

[10.3 Seguimiento de riesgos 18](#seguimiento-de-riesgos)

[10.4 Oportunidades 18](#oportunidades)

[11. Gestión de cambios 19](#gestión-de-cambios)

[11.1 Cambios que deben controlarse 19](#cambios-que-deben-controlarse)

[11.2 Flujo de control de cambios 19](#flujo-de-control-de-cambios)

[11.3 Solicitud de cambio 19](#solicitud-de-cambio)

[11.4 Historial de cambios aprobados 20](#historial-de-cambios-aprobados)

[12. Seguimiento de entregables y calidad 21](#seguimiento-de-entregables-y-calidad)

[12.1 Registro de entregables 21](#registro-de-entregables)

[12.2 Estados permitidos 21](#estados-permitidos)

[12.3 Criterios mínimos de calidad documental 21](#criterios-mínimos-de-calidad-documental)

[12.4 Reporte de estado 21](#reporte-de-estado)

[13. Evidencia individual y trabajo colaborativo 22](#evidencia-individual-y-trabajo-colaborativo)

[13.1 Fuentes aceptables de evidencia 22](#fuentes-aceptables-de-evidencia)

[13.2 Registro de contribución individual 22](#registro-de-contribución-individual)

[13.3 Reglas de autoría 22](#reglas-de-autoría)

[14. Indicadores de gestión 23](#indicadores-de-gestión)

[14.1 Interpretación 23](#interpretación)

[15. Cierre de la gestión 23](#cierre-de-la-gestión)

[15.1 Actividades de cierre 23](#actividades-de-cierre)

[15.2 Lecciones aprendidas 23](#lecciones-aprendidas)

[15.3 Transferencia de pendientes 24](#transferencia-de-pendientes)

[16. Lista de verificación 25](#lista-de-verificación)

[Criterios de aprobación del documento 26](#criterios-de-aprobación-del-documento)

[Anexo A. Convenciones de identificación 27](#anexo-a.-convenciones-de-identificación)

[Anexo B. Estructura recomendada del repositorio 27](#anexo-b.-estructura-recomendada-del-repositorio)

[Anexo C. Evidencias mínimas esperadas 28](#anexo-c.-evidencias-mínimas-esperadas)


## 1\. Propósito y alcance del documento

El propósito de este documento es establecer un sistema sencillo, verificable y consistente para gestionar a las personas y organizaciones relacionadas con el proyecto, organizar el trabajo del equipo y mantener evidencia del avance, las decisiones y los cambios.

### 1.1 Objetivos específicos

  - Identificar quién puede afectar o verse afectado por el proyecto.

  - Definir quién decide, valida, ejecuta, consulta y debe mantenerse informado.

  - Establecer una metodología de trabajo adecuada al tamaño y naturaleza del proyecto.

  - Planificar iteraciones, hitos, entregas y responsabilidades.

  - Gestionar riesgos, cambios, reuniones, acuerdos y bloqueos.

  - Garantizar trazabilidad de la contribución individual en proyectos grupales.

### 1.2 Alcance

Aplica desde la autorización del proyecto hasta su cierre. Debe actualizarse cuando cambien los interesados, roles, metodología, cronograma, riesgos relevantes o responsables de aprobación.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio de calidad</strong></p>
<p>La gestión no se demuestra por la cantidad de reuniones ni por llenar formatos. Se demuestra cuando existen responsables claros, acuerdos trazables, decisiones justificadas y evidencia de avance progresivo.</p></td>
</tr>
</tbody>
</table>

## 2\. Principios de gestión

| **Principio**    | **Aplicación práctica**                                                               |
| ---------------- | ------------------------------------------------------------------------------------- |
| Proporcionalidad | La cantidad de gestión debe corresponder al tamaño y riesgo del proyecto.             |
| Transparencia    | El estado real, los bloqueos y los cambios deben ser visibles.                        |
| Responsabilidad  | Toda actividad crítica debe tener una persona responsable.                            |
| Trazabilidad     | Acuerdos, cambios, riesgos y decisiones deben dejar evidencia.                        |
| Participación    | Los interesados relevantes deben intervenir en el momento adecuado.                   |
| Adaptación       | El plan puede cambiar, pero los cambios deben justificarse y controlarse.             |
| No burocracia    | No se duplican datos que ya existen en el tablero, repositorio o herramienta oficial. |

## 3\. Relación con otros artefactos

| **Artefacto relacionado**     | **Información que aporta**                                   | **Información que recibe**                               |
| ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| Formulación y Constitución    | Problema, objetivos, equipo inicial, riesgos y patrocinador. | Responsables definitivos, metodología y plan de gestión. |
| Alcance y Requisitos          | Módulos, restricciones, actores y criterios de aceptación.   | Responsables de validación y control de cambios.         |
| Backlog e Historias           | Trabajo priorizado, estimaciones y estados.                  | Cadencia, roles, hitos y reglas de seguimiento.          |
| Arquitectura y Diseño Técnico | Riesgos técnicos y decisiones.                               | Responsables, aprobadores y bitácora de decisiones.      |
| Plan de Pruebas               | Responsables, ambientes y fechas.                            | Resultados, defectos y aceptación.                       |
| Informe de Cierre             | Estado final y pendientes.                                   | Lecciones, acuerdos y aceptación de entrega.             |

## 4\. Identificación y análisis de interesados

### 4.1 Definiciones

| **Concepto**        | **Definición**                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Stakeholder         | Persona, grupo u organización que afecta, puede afectar o se considera afectada por el proyecto. |
| Cliente             | Solicita o recibe la solución y define necesidades de negocio.                                   |
| Patrocinador        | Brinda apoyo, legitimidad, recursos o capacidad de decisión.                                     |
| Usuario final       | Utiliza el producto en su operación real.                                                        |
| Actor del sistema   | Rol que interactúa directamente con el software.                                                 |
| Aprobador           | Persona autorizada para aceptar o rechazar un entregable.                                        |
| Equipo del proyecto | Personas responsables de analizar, diseñar, construir, probar y documentar.                      |

### 4.2 Registro de interesados

<table>
<tbody>
<tr class="odd">
<td><p><strong>Instrucción</strong></p>
<p>Registre únicamente interesados reales. Los actores del sistema pueden agruparse por rol, pero los aprobadores y responsables deben identificarse de forma concreta.</p></td>
</tr>
</tbody>
</table>

| **ID** | **Nombre / grupo**   | **Tipo**               | **Rol o relación**                                                              | **Necesidad principal**                  | **Interés** | **Influencia** | **Aprobador de**           | **Estado** |
| ------ | -------------------- | ---------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | ----------- | -------------- | -------------------------- | ---------- |
| STK-01 | Carlos Ramírez       | Cliente / patrocinador | Propietario del gimnasio                                                        | Controlar ingresos y pagos               | A           | A              | Alcance y aceptación final | Activo     |
| STK-02 | María Gómez          | Usuario                | Recepcionista                                                                   | Validar clientes sin filas en horas pico | A           | M              | Usabilidad de la recepción | Activo     |
| STK-03 | Socios del gimnasio  | Usuario final          | Clientes                                                                        | Ingresar rápido con su huella            | M           | B              | —                          | Activo     |
| STK-04 | Equipo de desarrollo | Equipo                 | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla | Arquitectura segura y mantenible         | A           | A              | Decisiones técnicas        | Activo     |
| STK-05 | Instructor(es)       | Evaluador académico    | Centro de formación                                                             | Producto funcional y sustentable         | A           | A              | Evaluación académica       | Activo     |

### 4.3 Análisis de interés e influencia

| **Cuadrante**       | **Condición**                  | **Estrategia recomendada**                                      |
| ------------------- | ------------------------------ | --------------------------------------------------------------- |
| Gestión activa      | Alta influencia y alto interés | Involucrar en decisiones, revisiones y validaciones frecuentes. |
| Mantener satisfecho | Alta influencia y bajo interés | Comunicar resultados relevantes y evitar sobrecarga.            |
| Mantener informado  | Baja influencia y alto interés | Compartir avances y recoger retroalimentación.                  |
| Monitorear          | Baja influencia y bajo interés | Revisar periódicamente si cambia su posición.                   |

### 4.4 Matriz de evaluación de interesados

| **ID** | **Necesidades**                        | **Expectativas**            | **Aporte esperado**                            | **Riesgo asociado**             | **Posición actual** | **Posición deseada** | **Responsable de relación**  |
| ------ | -------------------------------------- | --------------------------- | ---------------------------------------------- | ------------------------------- | ------------------- | -------------------- | ---------------------------- |
| STK-01 | Reducir pérdidas por ingresos vencidos | Reportes financieros reales | Reglas del negocio y validación de incrementos | Cambios tardíos de alcance      | Apoya               | Líder                | Liliana Sofía Panesso Méndez |
| STK-02 | Registrar y renovar rápido             | Interfaz sencilla           | Retroalimentación de uso                       | Resistencia o errores iniciales | Neutral             | Apoya                | Maileth Begambre Movilla     |
| STK-03 | Ingreso fluido                         | Privacidad de su huella     | Autorización de datos biométricos              | Rechazo al registro biométrico  | Desconoce           | Apoya                | Liliana Sofía Panesso Méndez |
| STK-05 | Evidencias de aprendizaje              | Documentación completa      | Orientación y evaluación                       | Observaciones al cierre         | Neutral             | Apoya                | Juan Diego Mejía Llano       |

### 4.5 Riesgos asociados a interesados

| **ID**     | **Interesado**     | **Riesgo**                                                | **Señal temprana**                      | **Respuesta**                                                | **Responsable**              |
| ---------- | ------------------ | --------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| RSK-STK-01 | STK-01 Propietario | Cambios drásticos e imprevistos en la lógica o el alcance | Nuevas solicitudes en la review         | Control formal de cambios (sección 9)                        | Liliana Sofía Panesso Méndez |
| RSK-STK-02 | STK-03 Socios      | Rechazo al registro de datos biométricos                  | Socios que no autorizan la huella       | Guardar solo el hash; validación por cédula como alternativa | Liliana Sofía Panesso Méndez |
| RSK-STK-03 | STK-02 Recepción   | Errores o lentitud en el uso inicial                      | Consultas frecuentes en la capacitación | Manual de usuario y acompañamiento los primeros días         | Maileth Begambre Movilla     |

## 5\. Estrategia de involucramiento y comunicación

### 5.1 Plan de comunicación

| **ID** | **Interesado / audiencia** | **Información**                                                      | **Objetivo**        | **Frecuencia**            | **Medio**                            | **Emisor**                                   | **Evidencia**         |
| ------ | -------------------------- | -------------------------------------------------------------------- | ------------------- | ------------------------- | ------------------------------------ | -------------------------------------------- | --------------------- |
| COM-01 | STK-01 Propietario         | Avance y demostración del control de acceso y el registro financiero | Validar incrementos | Quincenal (sprint review) | Reunión presencial / Microsoft Teams | Liliana Sofía Panesso Méndez (Product Owner) | Acta de review        |
| COM-02 | STK-02 Recepción           | Registro de clientes, renovación y validación de accesos             | Capacitar           | Fase de pruebas           | Taller práctico + correo             | Maileth Begambre Movilla                     | Lista de asistencia   |
| COM-03 | STK-03 Socios              | Nuevas políticas de acceso y registro de la huella                   | Informar            | Lanzamiento               | Cartelera + redes internas           | STK-01                                       | Publicación           |
| COM-04 | STK-04 Equipo              | Tareas de frontend y backend, bloqueos                               | Sincronizar         | Diario                    | WhatsApp + sesiones técnicas         | Juan Diego Mejía Llano (Scrum Master)        | Tablero de Jira       |
| COM-05 | STK-05 Instructor          | Avance documental y técnico                                          | Revisión académica  | Por hito                  | Classroom                            | Juan Diego Mejía Llano                       | Entregas en Classroom |

### 5.2 Reglas de comunicación

  - Las decisiones que afecten alcance, costo, tiempo, seguridad o arquitectura deben quedar registradas.

  - Los mensajes informales pueden apoyar la coordinación, pero no reemplazan el registro oficial de acuerdos.

  - Las reuniones deben tener objetivo, participantes necesarios y resultado esperado.

  - Los datos personales y credenciales no deben publicarse en actas, tableros ni capturas.

  - Las comunicaciones deben usar lenguaje comprensible para su audiencia.

### 5.3 Estrategia de validación

| **Entregable**       | **Validador funcional**                      | **Validador técnico**        | **Momento**                 | **Criterio de aprobación** | **Evidencia** |
| -------------------- | -------------------------------------------- | ---------------------------- | --------------------------- | -------------------------- | ------------- |
| Problema y objetivos | Liliana Sofía Panesso Méndez (Product Owner) |                              | Inicio                      |                            |               |
| Alcance y requisitos | Liliana Sofía Panesso Méndez (Product Owner) | Liliana Sofía Panesso Méndez | Antes del diseño            |                            |               |
| Prototipo UX/UI      | Liliana Sofía Panesso Méndez (Product Owner) | Liliana Sofía Panesso Méndez | Antes de construcción final |                            |               |
| Incremento funcional | Liliana Sofía Panesso Méndez (Product Owner) | Liliana Sofía Panesso Méndez | Cada iteración              |                            |               |
| Versión final        | Liliana Sofía Panesso Méndez (Product Owner) |                              | Cierre                      |                            |               |

### 5.4 Manejo de desacuerdos y escalamiento

1.  Registrar claramente el desacuerdo y las alternativas.

2.  Revisar requerimientos, restricciones y evidencia disponible.

3.  Buscar acuerdo entre responsable funcional y líder del proyecto.

4.  Escalar al patrocinador o instructor cuando el equipo no pueda resolverlo.

5.  Registrar la decisión, responsable, fecha e impacto.

## 6\. Organización del proyecto

### 6.1 Estructura del equipo

| **ID** | **Integrante**               | **Rol principal**                        | **Responsabilidades**                                                            | **Autoridad**     | **Disponibilidad** | **Sustituto o respaldo**     |
| ------ | ---------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- | ----------------- | ------------------ | ---------------------------- |
| EQ-01  | Juan Diego Mejía Llano       | Líder, Scrum Master, análisis y frontend | Requisitos, documentación, ceremonias, tablero de Jira y frontend React.         | Decide            |                    | Liliana Sofía Panesso Méndez |
| EQ-02  | Liliana Sofía Panesso Méndez | Product Owner y backend                  | Prioriza el backlog, acepta incrementos; API, base de datos y reglas de negocio. | Decide            |                    | Juan Diego Mejía Llano       |
| EQ-03  | Maileth Begambre Movilla     | UX/UI y apoyo frontend                   | Wireframes, mockups, prototipos y maquetación.                                   | Propone / ejecuta |                    | Juan Diego Mejía Llano       |

### 6.2 Matriz RACI

R = Responsable de ejecutar; A = Responsable final de aprobar o rendir cuentas; C = Consultado; I = Informado. Cada actividad debe tener un solo A y al menos un R.

| **Actividad / entregable** | **Líder** | **Analista** | **UX/UI** | **Frontend** | **Backend** | **QA** | **Cliente** | **Instructor** |
| -------------------------- | --------- | ------------ | --------- | ------------ | ----------- | ------ | ----------- | -------------- |
| Definir problema           |           |              |           |              |             |        |             |                |
| Aprobar alcance            |           |              |           |              |             |        |             |                |
| Diseñar prototipo          |           |              |           |              |             |        |             |                |
| Construir incremento       |           |              |           |              |             |        |             |                |
| Ejecutar pruebas           |           |              |           |              |             |        |             |                |
| Aceptar entrega            |           |              |           |              |             |        |             |                |

### 6.3 Responsabilidades mínimas por rol

| **Rol**                 | **Responsabilidades mínimas**                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| Líder del proyecto      | Coordinar, mantener el plan, gestionar bloqueos, consolidar evidencias y comunicar el estado real. |
| Analista                | Levantar y mantener requisitos, reglas, trazabilidad y criterios de aceptación.                    |
| UX/UI                   | Diseñar flujos, validar usabilidad, mantener prototipos y sistema de diseño.                       |
| Desarrollo              | Construir con calidad, registrar decisiones y mantener pruebas y documentación.                    |
| QA / pruebas            | Planificar, ejecutar y evidenciar pruebas; registrar defectos y verificar correcciones.            |
| Cliente o representante | Aclarar necesidades, validar entregables y aceptar o rechazar con fundamento.                      |
| Instructor              | Orientar, evaluar evidencias y verificar autoría y competencias.                                   |

### 6.4 Autoridad del líder del proyecto

| **Puede decidir**                                       | **Debe consultar**                            | **Debe escalar**                                                      |
| ------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| Organización interna, asignación de tareas y reuniones. | Cambios con impacto en alcance o prioridades. | Bloqueos que afecten hitos o comprometan calidad crítica.             |
| Convenciones operativas y seguimiento.                  | Decisiones arquitectónicas de alto impacto.   | Conflictos no resueltos, riesgos críticos o incumplimiento reiterado. |

## 7\. Metodología y forma de trabajo

### 7.1 Selección de metodología

| **Enfoque**           | **Cuándo conviene**                                                 | **Evidencias mínimas**                                           |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Scrum                 | Trabajo por incrementos con equipo estable y revisiones periódicas. | Backlog, sprint goal, planning, review, retrospectiva y tablero. |
| Kanban                | Flujo continuo, prioridades cambiantes o equipo pequeño.            | Tablero, límites WIP, políticas y métricas de flujo.             |
| Híbrido               | Se requieren hitos formales con ejecución iterativa.                | Roadmap, backlog, iteraciones y revisiones por hito.             |
| Secuencial controlado | Alcance muy estable o proyecto corto con entregables consecutivos.  | Fases, criterios de salida, cronograma y control de cambios.     |

### 7.2 Justificación del enfoque elegido

| **Campo**                                    | **Diligenciamiento**                                                                                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metodología seleccionada                     | Scrum (Schwaber y Sutherland, 2020).                                                                                                                                        |
| Razones de selección                         | Requisitos que se precisaron durante el proyecto (huella, retiro del torniquete y de la puerta), incrementos revisables cada dos semanas y equipo pequeño de tres personas. |
| Duración de iteración o cadencia             | Sprints de dos semanas, de jueves a miércoles; sprint 0 de planeación y sprint corto de cierre.                                                                             |
| Herramienta de seguimiento                   | Tablero de Jira del proyecto SCRUM (5 épicas y 13 historias) y repositorio GitHub.                                                                                          |
| Políticas de entrada y salida del trabajo    | Entra una historia con criterios de aceptación y estimación; sale integrada por Pull Request en develop y aceptada por el PO.                                               |
| Criterio para considerar una tarea terminada | Código en develop por Pull Request, npm run lint y npm run build sin errores, criterios de aceptación cumplidos y documentación actualizada.                                |
| Adaptaciones realizadas                      | Por el tamaño del equipo, el Product Owner y el Scrum Master también desarrollan; el daily se hace por WhatsApp.                                                            |

### 7.3 Flujo de trabajo

| **Estado**  | **Condición de entrada**       | **Acción esperada**                           | **Condición de salida**            | **Responsable**                                                                 |
| ----------- | ------------------------------ | --------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| Pendiente   | Historia priorizada            | Refinar y estimar en el refinamiento.         | Lista para iniciar                 | Liliana Sofía Panesso Méndez (Product Owner)                                    |
| Lista       | Cumple Definition of Ready     | Seleccionar en el sprint planning.            | Asignada                           | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla |
| En progreso | Responsable y criterios claros | Desarrollar en una rama feature/.             | Código y pruebas preparados        | Responsable de la tarea                                                         |
| En revisión | PR o evidencia disponible      | Abrir Pull Request hacia develop y revisarlo. | Aprobada o devuelta                | Otro integrante del equipo                                                      |
| Validación  | Pruebas técnicas aprobadas     | Demostrar al PO en la sprint review.          | Aceptada por responsable funcional | Liliana Sofía Panesso Méndez (Product Owner)                                    |
| Terminada   | Definition of Done cumplida    | Integrar en main al cierre del sprint.        | Incluida en versión o incremento   | Juan Diego Mejía Llano (Scrum Master)                                           |

### 7.4 Definition of Ready

  - La necesidad y el valor están claros.

  - Tiene criterios de aceptación verificables.

  - Las reglas y dependencias están identificadas.

  - El diseño necesario está disponible.

  - El equipo puede estimarla.

  - No existen bloqueos conocidos para iniciar.

### 7.5 Definition of Done

  - Código implementado y revisado.

  - Criterios de aceptación cumplidos.

  - Pruebas creadas y aprobadas.

  - Sin errores críticos de lint, compilación o seguridad.

  - Documentación y trazabilidad actualizadas.

  - Migraciones incluidas cuando aplique.

  - Integrada mediante el mecanismo acordado.

  - Disponible en ambiente de prueba y validada.

## 8\. Planificación, entregas e hitos

### 8.1 Roadmap general

| **Hito** | **Objetivo**                  | **Entregables**                                                | **Inicio** | **Fin**    | **Dependencias** | **Responsable**              | **Estado** |
| -------- | ----------------------------- | -------------------------------------------------------------- | ---------- | ---------- | ---------------- | ---------------------------- | ---------- |
| H-01     | Formulación aprobada          | Formulación, stakeholders, épicas e historias                  | 25/04/2026 | 10/06/2026 | —                | Juan Diego Mejía Llano       | Terminado  |
| H-02     | Diseño y modelo de datos      | Wireframes, mockups, prototipos y modelo inicial               | 25/06/2026 | 08/07/2026 | H-01             | Maileth Begambre Movilla     | Terminado  |
| H-03     | MVP funcional en local        | Épicas 1 a 3 y frontend React                                  | 09/07/2026 | 28/10/2026 | H-02             | Liliana Sofía Panesso Méndez | Terminado  |
| H-04     | Estabilización                | Seguridad, pagos, sensor AS608, pruebas e integración continua | 29/10/2026 | 25/11/2026 | H-03             | Liliana Sofía Panesso Méndez | En curso   |
| H-05     | Despliegue, manuales y cierre | Despliegue, manuales, informe de cierre, v1.0.0 y sustentación | 26/11/2026 | 12/12/2026 | H-04             | Juan Diego Mejía Llano       | Planeado   |

### 8.2 Plan de iteraciones

| **Iteración** | **Objetivo**                                                                           | **Historias / requisitos**   | **Entregable verificable**            | **Fechas**              | **Capacidad** | **Riesgo principal** | **Resultado**                            |
| ------------- | -------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------- | ----------------------- | ------------- | -------------------- | ---------------------------------------- |
| 0             | Formulación, requisitos, stakeholders, épicas e historias en Jira.                     | HU-001 a HU-013 (definición) | Incremento integrado por Pull Request | 25/04/2026 – 10/06/2026 |               |                      | Terminado                                |
| 1             | Landing page pública de Zona Fit Evolution.                                            | No aplica                    | Incremento integrado por Pull Request | 11/06/2026 – 24/06/2026 |               |                      | Terminado                                |
| 2             | Wireframes, mockups, prototipos y modelo de datos inicial.                             | HU-012                       | Incremento integrado por Pull Request | 25/06/2026 – 08/07/2026 |               |                      | Terminado                                |
| 3             | Usuarios, roles, JWT y protección de rutas en el backend.                              | HU-001, HU-002               | Incremento integrado por Pull Request | 09/07/2026 – 22/07/2026 |               |                      | Terminado                                |
| 4             | Frontend inicial: login, panel y registro de clientes.                                 | HU-001, HU-012               | Incremento integrado por Pull Request | 23/07/2026 – 05/08/2026 |               |                      | Terminado                                |
| 5             | Catálogo de planes y relación membresía–plan.                                          | HU-003                       | Incremento integrado por Pull Request | 06/08/2026 – 19/08/2026 |               |                      | Terminado                                |
| 6             | Renovación rápida de membresías por cédula.                                            | HU-004                       | Incremento integrado por Pull Request | 20/08/2026 – 02/09/2026 |               |                      | Terminado                                |
| 7             | Registro biométrico con patrón Adapter y lector simulado.                              | HU-005, HU-010, HU-013       | Incremento integrado por Pull Request | 03/09/2026 – 16/09/2026 |               |                      | Terminado                                |
| 8             | Validación de acceso (State y Facade) e historial.                                     | HU-006, HU-007               | Incremento integrado por Pull Request | 17/09/2026 – 30/09/2026 |               |                      | Terminado                                |
| 9             | Monorepo y nuevo frontend en React con login conectado.                                | HU-002, HU-012               | Incremento integrado por Pull Request | 01/10/2026 – 14/10/2026 |               |                      | Terminado                                |
| 10            | Pantallas React, diseño responsive y documentación.                                    | HU-001 a HU-008, HU-012      | Incremento integrado por Pull Request | 15/10/2026 – 28/10/2026 |               |                      | Finalizado (review por registrar)        |
| 11            | Correcciones de seguridad del backend, tabla de pagos e integración del sensor AS608.  | HU-005, HU-008, HU-010       | Incremento integrado por Pull Request | 29/10/2026 – 11/11/2026 |               |                      | En curso (AS608 integrado el 10/11/2026) |
| 12            | Pagos reales, comprobante, vencimiento en el servidor, pruebas e integración continua. | HU-008, HU-009, HU-013       | Incremento integrado por Pull Request | 12/11/2026 – 25/11/2026 |               |                      | Planeado                                 |
| 13            | Ejecución del plan de pruebas, despliegue, manual de usuario e informe de cierre.      | HU-011                       | Incremento integrado por Pull Request | 26/11/2026 – 09/12/2026 |               |                      | Planeado                                 |
| Cierre        | Versión v1.0.0, revisión final y sustentación.                                         | Todas                        | Incremento integrado por Pull Request | 10/12/2026 – 12/12/2026 |               |                      | Planeado                                 |

### 8.3 Dependencias y bloqueos

| **ID** | **Dependencia o bloqueo**                                                                 | **Tipo** | **Impacto**                    | **Fecha necesaria** | **Responsable externo** | **Plan de respuesta**                                               | **Estado** |
| ------ | ----------------------------------------------------------------------------------------- | -------- | ------------------------------ | ------------------- | ----------------------- | ------------------------------------------------------------------- | ---------- |
| BLQ-01 | Sensor AS608 no integrado con la API (TT-010)                                             | Técnica  | —                              |                     |                         | Integrado en el sprint 11; probado con el lector real el 10/11/2026 | Cerrada    |
| BLQ-02 | Hosting de la API (no Render) y proveedor de MySQL por definir                            | Externa  | Retrasa el despliegue (TT-009) | 26/11/2026          |                         | Definir proveedor antes del sprint 13                               | Abierta    |
| BLQ-03 | Ramas feature/correcciones-seguridad y feature/limite-intentos-login sin integrar en main | Interna  | —                              | 11/11/2026          |                         | Integradas en main por PR \#41 y \#42                               | Cerrada    |

### 8.4 Control de compromisos

| **ID** | **Compromiso** | **Responsable** | **Fecha acordada** | **Resultado esperado** | **Estado** | **Evidencia** |
| ------ | -------------- | --------------- | ------------------ | ---------------------- | ---------- | ------------- |
| ACP-01 |                |                 |                    |                        | Pendiente  |               |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de planificación</strong></p>
<p>Las fechas deben construirse con capacidad real, dependencias y margen para pruebas. Un cronograma optimista que nadie puede cumplir no es planificación; es decoración con fechas.</p></td>
</tr>
</tbody>
</table>

## 9\. Gestión de reuniones y acuerdos

### 9.1 Tipos de reunión

| **Reunión**                      | **Propósito**                               | **Participantes**                              | **Frecuencia**            | **Duración recomendada** | **Evidencia**       |
| -------------------------------- | ------------------------------------------- | ---------------------------------------------- | ------------------------- | ------------------------ | ------------------- |
| Sprint planning                  | Definir objetivo y trabajo de la iteración. | Equipo y responsable funcional cuando aplique. | Primer día de cada sprint | 30–60 min                | Backlog actualizado |
| Daily scrum                      | Identificar avance y bloqueos.              | Equipo.                                        | Diaria                    | 15 min                   | Tablero             |
| Sprint review                    | Demostrar incremento y recoger validación.  | Equipo e interesados clave.                    | Último día del sprint     | 30–60 min                | Acta o registro     |
| Retrospectiva                    | Mejorar la forma de trabajo.                | Equipo.                                        | Después de la review      | 30–45 min                | Acciones de mejora  |
| Refinamiento y sesiones técnicas | Resolver decisiones complejas.              | Roles técnicos necesarios.                     | A mitad de cada sprint    | Según agenda             | ADR o minuta        |

### 9.2 Formato de acta breve

| **Campo**           | **Contenido**                   |
| ------------------- | ------------------------------- |
| Código y fecha      | ACT-\_\_\_ / \_\_\_\_-\_\_-\_\_ |
| Objetivo            |                                 |
| Participantes       |                                 |
| Temas tratados      |                                 |
| Decisiones          |                                 |
| Compromisos         |                                 |
| Riesgos o bloqueos  |                                 |
| Próxima revisión    |                                 |
| Enlace a evidencias |                                 |

### 9.3 Registro de decisiones no arquitectónicas

| **ID** | **Fecha** | **Contexto**                          | **Alternativas**                                    | **Decisión**                                                  | **Responsable**              | **Impacto**    | **Evidencia** |
| ------ | --------- | ------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- | ---------------------------- | -------------- | ------------- |
| DEC-01 | Sprint 6  | El gimnasio no usará tarjetas físicas | Tarjetas RFID; huella                               | Identificar con huella y renovar por cédula (CR-001)          | Liliana Sofía Panesso Méndez | RF-004, RF-005 | CR-001        |
| DEC-02 | Sprint 9  | Frontend difícil de mantener          | Mantener HTML servido por el backend; React         | Frontend React en monorepo (CR-003)                           | Juan Diego Mejía Llano       | UI-01 a UI-09  | ADR-001       |
| DEC-03 |           | Sensor de bajo costo disponible       | Lector con SDK y electroimán; AS608 solo validación | Sensor AS608 con CP2102, sin apertura de puerta (CR-005)      | Liliana Sofía Panesso Méndez | OBJ-04, RF-004 | CR-005        |
| DEC-04 |           | Hosting gratuito con arranque en frío | Render; otro proveedor                              | Publicar el backend en un hosting distinto de Render (CR-006) | Liliana Sofía Panesso Méndez | TT-009         | CR-006        |

## 10\. Gestión de riesgos

### 10.1 Criterios de valoración

| **Probabilidad** | **Descripción**                       |
| ---------------- | ------------------------------------- |
| 1 - Baja         | Poco probable durante el proyecto.    |
| 2 - Media        | Puede ocurrir y requiere seguimiento. |
| 3 - Alta         | Es probable o ya existen señales.     |

| **Impacto** | **Descripción**                                                         |
| ----------- | ----------------------------------------------------------------------- |
| 1 - Bajo    | Efecto menor, recuperable sin afectar hitos.                            |
| 2 - Medio   | Afecta entregable, calidad o tiempo de forma controlable.               |
| 3 - Alto    | Puede impedir aprobación, comprometer seguridad o bloquear el proyecto. |

Exposición sugerida = Probabilidad × Impacto. Valores 6–9 requieren tratamiento prioritario.

### 10.2 Registro de riesgos

| **ID** | **Categoría** | **Riesgo**                                        | **Causa**                                          | **Consecuencia**                                    | **P** | **I** | **Nivel**    | **Respuesta**                                                         | **Responsable**              | **Señal** | **Estado** |
| ------ | ------------- | ------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- | ----- | ----- | ------------ | --------------------------------------------------------------------- | ---------------------------- | --------- | ---------- |
| RSK-01 | Seguridad     | Fuga de datos personales y biométricos            | Almacenamiento o transmisión insegura              | Sanciones (Ley 1581 de 2012) y pérdida de confianza | 3     | 5     | 15 – Crítico | bcrypt, hash de plantillas, HTTPS y secretos en .env                  | Liliana Sofía Panesso Méndez |           | Abierto    |
| RSK-02 | Seguridad     | Acceso de clientes con planes vencidos            | Validación manual o estado desactualizado          | Pérdidas económicas                                 | 4     | 4     | 16 – Crítico | Validar en el backend estado y fecha de fin en cada intento           | Liliana Sofía Panesso Méndez |           | Abierto    |
| RSK-03 | Seguridad     | Inyección SQL                                     | Consultas construidas con texto del usuario        | Robo o alteración de datos                          | 3     | 5     | 15 – Crítico | Consultas parametrizadas con mysql2                                   | Liliana Sofía Panesso Méndez |           | Abierto    |
| RSK-04 | Seguridad     | Manipulación de precios desde el cliente          | El frontend enviaría montos                        | Registro financiero falso                           | 3     | 4     | 12 – Alto    | Precio y duración tomados del plan en el servidor                     | Liliana Sofía Panesso Méndez |           | Abierto    |
| RSK-05 | Técnico       | Indisponibilidad del sistema                      | Caída del hosting o de la base                     | No se puede validar el ingreso                      | 3     | 4     | 12 – Alto    | Hosting con monitoreo, validación manual por cédula como contingencia | Liliana Sofía Panesso Méndez |           | Abierto    |
| RSK-06 | Técnico       | Integración del sensor AS608 fuera de tiempo      | Comunicación serie con el CP2102 probada           | Demostración solo con simulador                     | 3     | 4     | 12 – Alto    | AS608 integrado en el sprint 11; simulador eliminado                  | Liliana Sofía Panesso Méndez |           | Cerrado    |
| RSK-07 | Gestión       | Cronograma insuficiente para pruebas y despliegue | Equipo con dedicación parcial; hosting por definir | Entrega incompleta el 12/12/2026                    | 3     | 4     | 12 – Alto    | Priorizar Must, congelar alcance desde el sprint 12                   | Juan Diego Mejía Llano       |           | Abierto    |
| RSK-08 | Seguridad     | Robo de credenciales y claves secretas            | Secretos expuestos en el código o en Git           | Acceso indebido a la API y a la base                | 2     | 5     | 10 – Alto    | Variables de entorno fuera de Git; rotar secretos en producción       | Liliana Sofía Panesso Méndez |           | Abierto    |

### 10.3 Seguimiento de riesgos

| **ID** | **Fecha de revisión** | **Cambio observado** | **Acción ejecutada** | **Resultado** | **Nivel residual** | **Próxima revisión** |
| ------ | --------------------- | -------------------- | -------------------- | ------------- | ------------------ | -------------------- |
| RSK-01 |                       |                      |                      |               |                    |                      |

### 10.4 Oportunidades

También deben registrarse eventos inciertos positivos que puedan mejorar costo, tiempo, aprendizaje, reutilización o impacto.

| **ID** | **Oportunidad**            | **Beneficio**                                          | **Acción para aprovecharla**                 | **Responsable**              | **Estado** |
| ------ | -------------------------- | ------------------------------------------------------ | -------------------------------------------- | ---------------------------- | ---------- |
| OP-01  | Sensor AS608 de bajo costo | Demostrar el ingreso real sin comprar hardware costoso | Integrarlo como un adaptador nuevo (ADR-004) | Liliana Sofía Panesso Méndez | Abierta    |
| OP-02  | Registro financiero real   | Información confiable para el propietario              | Crear la tabla de pagos (TT-005)             | Liliana Sofía Panesso Méndez | Abierta    |

## 11\. Gestión de cambios

### 11.1 Cambios que deben controlarse

  - Alcance, requisitos o criterios de aceptación.

  - Fechas, hitos o entregables comprometidos.

  - Tecnologías, arquitectura o modelo de datos con impacto relevante.

  - Roles, responsables o aprobadores.

  - Tratamiento de datos personales, seguridad o cumplimiento.

  - Recursos, costos o restricciones.

### 11.2 Flujo de control de cambios

6.  Registrar la solicitud y su justificación.

7.  Analizar impacto en alcance, tiempo, arquitectura, pruebas, riesgos y documentación.

8.  Proponer alternativas.

9.  Obtener decisión del responsable autorizado.

10. Actualizar documentos, backlog, trazabilidad y plan.

11. Comunicar el cambio y verificar su implementación.

### 11.3 Solicitud de cambio

| **Campo**                          | **Contenido**                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                                 | CHG-05 (CR-005)                                                                                                                                        |
| Solicitante                        | STK-01 Propietario                                                                                                                                     |
| Fecha                              |                                                                                                                                                        |
| Descripción                        | Usar el sensor de huella AS608 con conversor USB CP2102 solo para validar el ingreso; la apertura con relé y electroimán pasa a una versión posterior. |
| Justificación                      | Hardware disponible y de bajo costo; la apertura automática no es indispensable para el MVP.                                                           |
| Urgencia                           | Alta                                                                                                                                                   |
| Impacto en alcance                 | Se retira la apertura automática de la puerta del MVP (EXC-04).                                                                                        |
| Impacto técnico                    | Nuevo adaptador del AS608 en la capa hardware; sin agente de relé.                                                                                     |
| Impacto en tiempo                  | Integración del sensor en los sprints 11 y 12.                                                                                                         |
| Impacto en pruebas y documentación | Actualizar OBJ-04, RF-003, RF-004, INT-01, INT-02, CU-004 y diagramas de contexto y despliegue.                                                        |
| Alternativas                       | Lector con SDK del fabricante y electroimán; solo simulador.                                                                                           |
| Recomendación                      | Aprobar.                                                                                                                                               |
| Decisión                           | Aprobado                                                                                                                                               |
| Aprobador                          | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                           |
| Fecha de decisión                  |                                                                                                                                                        |

### 11.4 Historial de cambios aprobados

| **ID** | **Resumen**                                                                                                                                         | **Documento / requisito afectado**     | **Versión objetivo** | **Responsable**        | **Estado**                       | **Evidencia** |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------- | ---------------------- | -------------------------------- | ------------- |
| CHG-01 | Se reemplazan las tarjetas RFID por identificación con huella; la renovación se hace por cédula.                                                    | RF-004, RF-005, HU-004, HU-005         | MVP                  | Juan Diego Mejía Llano | Aprobado                         | CR-001        |
| CHG-02 | Se retira el torniquete: la apertura se hace con relé y electroimán.                                                                                | RF-004, INT-02                         | MVP                  | Juan Diego Mejía Llano | Aprobado                         | CR-002        |
| CHG-03 | El frontend pasa a React (Vite) en un monorepo con el backend.                                                                                      | Arquitectura, UI-01 a UI-09            | MVP                  | Juan Diego Mejía Llano | Aprobado                         | CR-003        |
| CHG-04 | El registro financiero se calcula con las membresías mientras se crea la tabla de pagos.                                                            | RF-006, HU-008                         | MVP                  | Juan Diego Mejía Llano | Aprobado (temporal)              | CR-004        |
| CHG-05 | Se usa el sensor AS608 con conversor CP2102 solo para validar el ingreso; la apertura con relé y electroimán (CR-002) pasa a una versión posterior. | OBJ-04, RF-003, RF-004, INT-01, INT-02 | MVP                  | Juan Diego Mejía Llano | Aprobado                         | CR-005        |
| CHG-06 | El backend se publicará en un hosting distinto de Render; el proveedor está por definir.                                                            | TT-009, INT-02, RSD-07                 | MVP                  | Juan Diego Mejía Llano | Aprobado (proveedor por definir) | CR-006        |

## 12\. Seguimiento de entregables y calidad

### 12.1 Registro de entregables

| **ID**  | **Entregable**                                        | **Criterios de aceptación**                                      | **Responsable**              | **Validador**                                | **Fecha**  | **Estado**     | **Evidencia** |
| ------- | ----------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------- | -------------------------------------------- | ---------- | -------------- | ------------- |
| ENTG-01 | INI-01 – Formulación y Constitución del Proyecto      | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-02 | GES-01 – Gestión de Interesados y del Proyecto        | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-03 | REQ-01 – Alcance y Especificación de Requisitos       | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-04 | REQ-02 – Backlog, Historias de Usuario y Casos de Uso | Plantilla diligenciada y coherente con la matriz de trazabilidad | Liliana Sofía Panesso Méndez | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-05 | TRZ-01 – Matriz Maestra de Trazabilidad               | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-06 | DSN-01 – Diseño UX/UI y Sistema de Diseño             | Plantilla diligenciada y coherente con la matriz de trazabilidad | Maileth Begambre Movilla     | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-07 | ARQ-01 – Arquitectura, Datos y Diseño Técnico         | Plantilla diligenciada y coherente con la matriz de trazabilidad | Liliana Sofía Panesso Méndez | Liliana Sofía Panesso Méndez (Product Owner) |            | En elaboración |               |
| ENTG-08 | CAL-01 – Plan de Calidad, Pruebas y Aceptación        | Plantilla diligenciada y coherente con la matriz de trazabilidad |                              | Liliana Sofía Panesso Méndez (Product Owner) | 09/12/2026 | Pendiente      |               |
| ENTG-09 | MAN-01 – Manual Técnico y de Operación                | Plantilla diligenciada y coherente con la matriz de trazabilidad | Liliana Sofía Panesso Méndez | Liliana Sofía Panesso Méndez (Product Owner) | 09/12/2026 | Pendiente      |               |
| ENTG-10 | MAN-02 – Manual de Usuario                            | Plantilla diligenciada y coherente con la matriz de trazabilidad | Maileth Begambre Movilla     | Liliana Sofía Panesso Méndez (Product Owner) | 09/12/2026 | Pendiente      |               |
| ENTG-11 | CIE-01 – Informe de Cierre y Entrega                  | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) | 12/12/2026 | Pendiente      |               |
| ENTG-12 | SUS-01 – Guía de Sustentación y Demostración          | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       | Liliana Sofía Panesso Méndez (Product Owner) | 12/12/2026 | Pendiente      |               |
| ENTG-13 | REP-01 – Repositorio con etiqueta v1.0.0              | Plantilla diligenciada y coherente con la matriz de trazabilidad | Juan Diego Mejía Llano       |                                              | 12/12/2026 | Pendiente      |               |

### 12.2 Estados permitidos

| **Estado**     | **Significado**                                                |
| -------------- | -------------------------------------------------------------- |
| Pendiente      | Aún no inicia o no está listo para revisión.                   |
| En elaboración | Se encuentra en construcción.                                  |
| En revisión    | Tiene evidencia disponible para verificar.                     |
| Devuelto       | Requiere ajustes claramente registrados.                       |
| Aprobado       | Cumple criterios y fue aceptado por el responsable autorizado. |
| Obsoleto       | Fue reemplazado por una versión posterior.                     |

### 12.3 Criterios mínimos de calidad documental

  - Versión, fecha, responsable y estado visibles.

  - Contenido coherente con el producto actual.

  - Tablas y códigos consistentes con la arquitectura documental.

  - Decisiones y cambios trazables.

  - Sin datos personales innecesarios ni credenciales.

  - Enlaces y evidencias accesibles para evaluación.

### 12.4 Reporte de estado

| **Dimensión**          | **Estado** | **Evidencia**                                                     | **Riesgo / desviación** | **Acción siguiente**                |
| ---------------------- | ---------- | ----------------------------------------------------------------- | ----------------------- | ----------------------------------- |
| Alcance                | Verde      | MVP implementado en local (README, estado actual)                 |                         | Congelar alcance desde el sprint 12 |
| Cronograma             | Amarillo   | Sprints 11 a 13 concentran seguridad, pagos, pruebas y despliegue | Hosting por definir     | Definir hosting                     |
| Calidad                | Amarillo   | Sin pruebas automatizadas ni pipeline                             | DT-08                   | TT-007 y TT-008                     |
| Riesgos                | Amarillo   | BLQ-01 a BLQ-03 abiertos                                          | RSK-06, RSK-07          | Integrar ramas de seguridad         |
| Equipo                 | Verde      | Commits de los tres integrantes en GitHub                         |                         |                                     |
| Validación del cliente | Amarillo   | Reviews por registrar en actas                                    |                         | Registrar actas de review           |

## 13\. Evidencia individual y trabajo colaborativo

### 13.1 Fuentes aceptables de evidencia

| **Fuente**              | **Qué demuestra**                                   | **Condición de validez**                                       |
| ----------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| Commits                 | Cambios progresivos y autoría técnica.              | Deben ser coherentes, descriptivos y no concentrarse al final. |
| Pull requests           | Revisión, discusión y aprobación de cambios.        | Debe existir contexto, evidencia y resultado.                  |
| Issues / tareas         | Asignación, seguimiento y cierre.                   | Debe relacionarse con requisitos o entregables.                |
| Actas                   | Decisiones, acuerdos y compromisos.                 | Deben identificar participantes y resultados.                  |
| Presentaciones técnicas | Comprensión y capacidad de sustentar.               | El integrante debe explicar decisiones y código.               |
| Pruebas y documentación | Contribución a calidad y conocimiento del proyecto. | Debe estar versionada y vinculada al trabajo realizado.        |

### 13.2 Registro de contribución individual

| **Integrante**               | **Periodo**    | **Actividades**                                   | **Artefactos / módulos**                       | **PR / commits / evidencias**                 | **Resultados** | **Dificultades** | **Validado por** |
| ---------------------------- | -------------- | ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------- | -------------- | ---------------- | ---------------- |
| Juan Diego Mejía Llano       | Sprints 0 a 11 | Requisitos, documentación, Scrum y frontend React | Frontend, documento maestro, alcance y backlog | 57 + 35 commits (dos cuentas); ramas feature/ |                |                  |                  |
| Liliana Sofía Panesso Méndez | Sprints 0 a 11 | Backend, base de datos y Product Owner            | API REST, init.sql, servicios y patrones       | 74 commits                                    |                |                  |                  |
| Maileth Begambre Movilla     | Sprints 0 a 11 | UX/UI y apoyo frontend                            | Wireframes, mockups y prototipos               | 7 commits                                     |                |                  |                  |

### 13.3 Reglas de autoría

  - Cada integrante debe comprender el sistema completo y dominar especialmente su aporte.

  - No se considera evidencia válida una carga masiva al final sin historial progresivo.

  - El uso de IA, plantillas o código externo debe declararse cuando tenga impacto significativo.

  - El equipo mantiene responsabilidad técnica y académica sobre todo lo entregado.

  - La distribución del trabajo no puede excluir a un integrante de las competencias esenciales del proyecto.

## 14\. Indicadores de gestión

| **ID**     | **Indicador**               | **Fórmula o método**                                          | **Meta** | **Frecuencia** | **Fuente**              | **Responsable**        |
| ---------- | --------------------------- | ------------------------------------------------------------- | -------- | -------------- | ----------------------- | ---------------------- |
| IND-GES-01 | Cumplimiento de entregables | Entregables aprobados / planificados × 100                    | 100 %    | Por hito       | Registro de entregables | Juan Diego Mejía Llano |
| IND-GES-02 | Cambios controlados         | Cambios con análisis y decisión / cambios identificados × 100 |          | Mensual        | Registro de cambios     | Juan Diego Mejía Llano |
| IND-GES-03 | Riesgos tratados            | Riesgos altos con respuesta / riesgos altos × 100             |          | Semanal        | Registro de riesgos     | Juan Diego Mejía Llano |
| IND-GES-04 | Compromisos cumplidos       | Compromisos cerrados a tiempo / vencidos × 100                |          | Semanal        | Actas y tablero         | Juan Diego Mejía Llano |
| IND-GES-05 | Participación trazable      | Integrantes con evidencia suficiente / total × 100            |          | Por iteración  | Git y tablero           | Juan Diego Mejía Llano |

### 14.1 Interpretación

Los indicadores deben apoyar decisiones. Una métrica sin acción asociada no mejora el proyecto. Las metas deben definirse según duración, complejidad y contexto; no deben utilizarse para ocultar problemas mediante porcentajes aislados.

## 15\. Cierre de la gestión

### 15.1 Actividades de cierre

  - Confirmar que los entregables tienen estado final y evidencia.

  - Cerrar o transferir riesgos y pendientes.

  - Registrar aceptación, limitaciones y trabajo futuro.

  - Consolidar contribución individual.

  - Etiquetar la versión entregada.

  - Cerrar tableros, issues y cambios.

  - Registrar lecciones aprendidas y recomendaciones.

### 15.2 Lecciones aprendidas

| **ID** | **Situación** | **Qué funcionó** | **Qué no funcionó** | **Aprendizaje** | **Recomendación futura** |
| ------ | ------------- | ---------------- | ------------------- | --------------- | ------------------------ |
| LA-01  |               |                  |                     |                 |                          |

### 15.3 Transferencia de pendientes

| **ID** | **Pendiente / deuda**                                                                                                                                           | **Impacto**                                                    | **Responsable futuro**       | **Fecha objetivo** | **Evidencia / ubicación**  |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------- | ------------------ | -------------------------- |
| PEN-01 | No existe tabla de pagos: el registro financiero estima con el precio actual del plan.                                                                          | Histórico financiero inexacto; no se guarda el método de pago. | Liliana Sofía Panesso Méndez |                    | Informe de cierre / DT     |
| PEN-02 | Regla de un ingreso por día: el frontend la muestra en los planes, pero la validación de acceso del backend todavía no bloquea un segundo ingreso el mismo día. | La pantalla promete una regla que la puerta no aplica.         | Liliana Sofía Panesso Méndez |                    | Informe de cierre / DT     |
| PEN-03 | Resuelto en develop: una tarea diaria marca las membresías vencidas y activa las pendientes.                                                                    | —                                                              | Liliana Sofía Panesso Méndez |                    | src/jobs/membresias.job.js |
| PEN-04 | La ruta DELETE /api/clientes/:id sigue en main (contradice RN-001).                                                                                             | Contradicción regla–API.                                       | Liliana Sofía Panesso Méndez |                    | Informe de cierre / DT     |
| PEN-05 | La regla del último administrador solo se valida en el frontend.                                                                                                | Se puede saltar llamando la API.                               | Liliana Sofía Panesso Méndez |                    | Informe de cierre / DT     |
| PEN-06 | CORS abierto (el límite de 5 intentos de inicio de sesión cada 15 minutos ya está implementado).                                                                | Exposición de la API en producción.                            | Liliana Sofía Panesso Méndez |                    | Informe de cierre / DT     |

## 16\. Lista de verificación

| **N.º** | **Verificación**                                               | **Cumple**     | **Evidencia** | **Observaciones** |
| ------- | -------------------------------------------------------------- | -------------- | ------------- | ----------------- |
| 1       | Los interesados relevantes están identificados y clasificados. | Sí / No / N.A. |               |                   |
| 2       | Cada entregable tiene responsable y aprobador.                 | Sí / No / N.A. |               |                   |
| 3       | Existe una metodología definida y justificada.                 | Sí / No / N.A. |               |                   |
| 4       | El tablero evidencia planificación y seguimiento real.         | Sí / No / N.A. |               |                   |
| 5       | La matriz RACI no tiene actividades críticas sin responsable.  | Sí / No / N.A. |               |                   |
| 6       | Los hitos y fechas consideran capacidad y dependencias.        | Sí / No / N.A. |               |                   |
| 7       | Las decisiones y acuerdos relevantes están registrados.        | Sí / No / N.A. |               |                   |
| 8       | Los riesgos tienen nivel, respuesta y responsable.             | Sí / No / N.A. |               |                   |
| 9       | Los cambios relevantes se analizan y aprueban.                 | Sí / No / N.A. |               |                   |
| 10      | Los entregables poseen criterios de aceptación y evidencia.    | Sí / No / N.A. |               |                   |
| 11      | La contribución individual es trazable.                        | Sí / No / N.A. |               |                   |
| 12      | No existen datos sensibles o credenciales expuestos.           | Sí / No / N.A. |               |                   |
| 13      | El documento está actualizado y coincide con las herramientas. | Sí / No / N.A. |               |                   |
| 14      | El cierre registra pendientes, riesgos y lecciones.            | Sí / No / N.A. |               |                   |

### Criterios de aprobación del documento

| **Resultado**        | **Condición**                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Aprobado             | La gestión es verificable, proporcional y coherente con el proyecto; no existen responsabilidades críticas sin asignar. |
| Aprobado con ajustes | Existen observaciones menores con responsable y fecha de corrección.                                                    |
| Devuelto             | Faltan responsables, evidencia de seguimiento, control de riesgos/cambios o trazabilidad individual.                    |

## Anexo A. Convenciones de identificación

| **Artefacto**        | **Prefijo** | **Ejemplo** |
| -------------------- | ----------- | ----------- |
| Stakeholder          | STK         | STK-01      |
| Comunicación         | COM         | COM-01      |
| Riesgo               | RSK         | RSK-01      |
| Oportunidad          | OP          | OP-01       |
| Hito                 | H           | H-01        |
| Bloqueo              | BLQ         | BLQ-01      |
| Acuerdo / compromiso | ACP         | ACP-01      |
| Decisión de gestión  | DEC         | DEC-01      |
| Solicitud de cambio  | CHG         | CHG-01      |
| Entregable           | ENTG        | ENTG-01     |
| Indicador de gestión | IND-GES     | IND-GES-01  |
| Lección aprendida    | LA          | LA-01       |

## Anexo B. Estructura recomendada del repositorio

/docs/gestion/

  - 00-control-documental.md

  - 01-interesados.md

  - 02-raci.md

  - 03-metodologia.md

  - 04-roadmap.md

  - 05-riesgos.md

  - 06-cambios.md

  - 07-actas/

  - 08-decisiones/

  - 09-evidencias/

<table>
<tbody>
<tr class="odd">
<td><p><strong>Nota</strong></p>
<p>Los formatos pueden mantenerse en Word, Markdown, hoja de cálculo o herramienta especializada. La fuente oficial debe definirse y evitar copias divergentes.</p></td>
</tr>
</tbody>
</table>

## Anexo C. Evidencias mínimas esperadas

| **Área**      | **Evidencia mínima**                                              |
| ------------- | ----------------------------------------------------------------- |
| Interesados   | Registro, matriz interés-influencia y responsables de validación. |
| Organización  | Roles y matriz RACI.                                              |
| Metodología   | Descripción del enfoque, tablero y políticas de trabajo.          |
| Planificación | Roadmap, iteraciones o hitos con estado.                          |
| Comunicación  | Plan y actas o registros clave.                                   |
| Riesgos       | Registro actualizado con tratamiento.                             |
| Cambios       | Solicitudes, análisis y decisiones.                               |
| Colaboración  | Commits, PR, tareas y sustentación.                               |
| Cierre        | Lecciones, pendientes y aceptación.                               |

**Fin de la plantilla**

*Versión base 1.0 – Arquitectura documental ADSO SENA*
