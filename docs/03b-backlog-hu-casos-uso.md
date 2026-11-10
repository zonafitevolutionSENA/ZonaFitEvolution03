# Backlog, historias de usuario y casos de uso

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/02_Requerimientos/Backlog_HU_y_Casos_de_Uso_ZonaFitEvolution.pdf`](entregables/02_Requerimientos/Backlog_HU_y_Casos_de_Uso_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Elemento**             | **Detalle**                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Código documental        | ADSO-BAC-01                                                                                              |
| Nombre                   | Backlog, Historias de Usuario y Casos de Uso                                                             |
| Clasificación            | Documento de análisis funcional y planificación                                                          |
| Estado                   | En revisión                                                                                              |
| Propietario              | Liliana Sofía Panesso Méndez (Product Owner) y Juan Diego Mejía Llano (analista)                         |
| Revisor funcional        | Liliana Sofía Panesso Méndez (Product Owner, en representación del propietario)                          |
| Revisor técnico          | Liliana Sofía Panesso Méndez (desarrollo backend)                                                        |
| Revisor académico        | Instructor(a) responsable                                                                                |
| Ubicación oficial        | Repositorio ZonaFitEvolution03, carpeta /docs/analisis (por crear), y tablero de Jira del proyecto SCRUM |
| Periodicidad de revisión | En cada refinamiento, iteración o cambio aprobado                                                        |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción**                                                                                                         | **Responsable**        | **Aprobado por** |
| ----------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- |
| 0.1         | 20/10/2026 | Estructura y backlog inicial a partir del documento maestro integrado (v2.3) y de Jira                                  | Juan Diego Mejía Llano |                  |
| 1.0         | 03/11/2026 | Versión para revisión: épicas, backlog, historias detalladas, criterios, casos de uso, plan de iteración y trazabilidad | Juan Diego Mejía Llano |                  |

### Registro de aprobaciones

| **Rol**                 | **Nombre**                   | **Decisión**        | **Fecha**  | **Observaciones** |
| ----------------------- | ---------------------------- | ------------------- | ---------- | ----------------- |
| Product Owner / cliente | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |            |                   |
| Analista                | Juan Diego Mejía Llano       | Elaborado           | 03/11/2026 |                   |
| Líder técnico           |                              | Aprobado / Devuelto |            |                   |
| Instructor              |                              | Aprobado / Devuelto |            |                   |


## 1\. Propósito y principios

El documento organiza el trabajo funcional del producto, preserva la relación con los requisitos aprobados y ofrece el nivel de detalle necesario para diseño, construcción y pruebas. Debe mantenerse actualizado durante el desarrollo y reflejar únicamente funcionalidades reales o planificadas.

### 1.1 Objetivos específicos

  - Organizar el producto en épicas, funcionalidades e historias de usuario.

  - Priorizar el trabajo de acuerdo con valor, riesgo, dependencia y esfuerzo.

  - Redactar historias claras, pequeñas, negociables y verificables.

  - Definir criterios de aceptación que permitan diseñar pruebas.

  - Documentar casos de uso solo cuando el proceso requiera mayor detalle.

  - Establecer condiciones de preparación y terminado.

  - Mantener trazabilidad con requisitos, reglas de negocio, diseño, código y pruebas.

### 1.2 Principios de consistencia

| **Principio**             | **Aplicación**                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Una fuente de verdad      | Los requisitos y reglas se definen en su documento central; aquí se referencian por código.        |
| Sin duplicación narrativa | Una historia no repite un caso de uso completo y un caso de uso no reescribe todos los requisitos. |
| Valor visible             | Cada historia explica para quién y para qué existe.                                                |
| Prueba desde el análisis  | Todo criterio debe poder convertirse en uno o más casos de prueba.                                 |
| Detalle proporcional      | Los procesos simples usan historias; los complejos pueden requerir casos de uso.                   |
| Actualización continua    | Estados, prioridades y relaciones deben coincidir con la herramienta de gestión y el producto.     |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de oro</strong></p>
<p>Una historia de usuario describe una necesidad y su valor. Un criterio de aceptación define cuándo se considera satisfecha. Un caso de uso detalla la interacción completa de un proceso complejo. Un caso de prueba comprueba el comportamiento. Son artefactos relacionados, no sinónimos.</p></td>
</tr>
</tbody>
</table>

## 2\. Relación con otros artefactos

| **Artefacto**              | **Aporta a este documento**                              | **Recibe de este documento**                            |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| Formulación y Constitución | Problema, objetivos e indicadores.                       | Capacidades priorizadas que materializan los objetivos. |
| Gestión del Proyecto       | Metodología, responsables, roadmap y gestión de cambios. | Backlog, estimaciones, estados y dependencias.          |
| Alcance y Requisitos       | RF, RNF, reglas, roles y límites aprobados.              | Desglose funcional, criterios y procesos detallados.    |
| Diseño UX/UI               | Prototipos, navegación y restricciones de interacción.   | Flujos, estados y pantallas necesarias.                 |
| Arquitectura               | Restricciones y viabilidad técnica.                      | Escenarios críticos y necesidades técnicas.             |
| Plan de Pruebas            | Estrategia y formatos de evidencia.                      | Criterios, escenarios y cobertura funcional.            |
| Matriz de Trazabilidad     | Relaciones maestras.                                     | HU, CU, criterios, versiones y estado.                  |

### 2.1 Información que no debe repetirse

  - Descripción completa de requisitos funcionales y no funcionales.

  - Catálogo oficial de reglas de negocio.

  - Diseño detallado de pantallas y componentes.

  - Contratos técnicos de API.

  - Casos de prueba con pasos y resultados ejecutados.

  - Decisiones arquitectónicas y estructura interna del código.

## 3\. Glosario y convenciones

| **Término**             | **Definición**                                                               |
| ----------------------- | ---------------------------------------------------------------------------- |
| Épica                   | Objetivo o capacidad amplia que agrupa varias funcionalidades e historias.   |
| Funcionalidad / Feature | Capacidad coherente del producto que entrega valor y se divide en historias. |
| Historia de usuario     | Necesidad breve descrita desde la perspectiva de un actor.                   |
| Criterio de aceptación  | Condición observable que debe cumplirse para aceptar una historia.           |
| Caso de uso             | Descripción estructurada de la interacción entre actores y sistema.          |
| Escenario               | Recorrido específico de un caso de uso o criterio.                           |
| Backlog                 | Lista priorizada y cambiante del trabajo del producto.                       |
| Refinamiento            | Actividad para aclarar, dividir, estimar y priorizar elementos.              |
| Definition of Ready     | Condiciones para iniciar una historia.                                       |
| Definition of Done      | Condiciones para declarar terminado un incremento.                           |

### 3.1 Convenciones de identificación

| **Elemento**           | **Formato**        | **Ejemplo**   |
| ---------------------- | ------------------ | ------------- |
| Épica                  | EP-\#\#\#          | EP-001        |
| Funcionalidad          | FEAT-\#\#\#        | FEAT-004      |
| Historia de usuario    | HU-\#\#\#          | HU-017        |
| Caso de uso            | CU-\#\#\#          | CU-006        |
| Escenario BDD          | ESC-HU-\#\#\#-\#\# | ESC-HU-017-02 |
| Criterio de aceptación | CA-HU-\#\#\#-\#\#  | CA-HU-017-01  |
| Tarea técnica          | TT-\#\#\#          | TT-038        |

## 4\. Modelo de producto: épicas y funcionalidades

### 4.1 Mapa de épicas

| **ID** | **Épica**                                       | **Objetivo de negocio o usuario**                                             | **Stakeholders**       | **Indicador asociado**                                               | **Estado**    |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------- | ------------- |
| EP-001 | Gestión integral de usuarios y control de roles | Autenticación segura, cuentas del personal y separación de funciones por rol. | STK-01, STK-02         | IND-01: 0 accesos al sistema sin autenticación                       | En validación |
| EP-002 | Administración de planes y membresías           | Tarifas flexibles, asignación y renovación de membresías.                     | STK-01, STK-02         | IND-02: registro y renovación en menos de 2 minutos                  | En validación |
| EP-003 | Sistema de control de acceso automatizado       | Identificar al cliente por huella, y validar su membresía al ingresar.        | STK-01, STK-02, STK-03 | IND-03: 0 ingresos con membresía vencida; validación en menos de 2 s | En progreso   |
| EP-004 | Gestión financiera y registro de ingresos       | Registro del pago de cada membresía y resumen por cliente.                    | STK-01                 | IND-04: 100 % de membresías con pago registrado                      | En progreso   |
| EP-005 | Calidad, seguridad y disponibilidad del sistema | Seguridad de los datos, disponibilidad y mantenibilidad.                      | STK-01, STK-04         | IND-05: disponibilidad de 99,9 % en horario de atención              | En progreso   |

### 4.2 Catálogo de funcionalidades

| **ID**   | **Funcionalidad**                              | **Épica** | **Descripción de valor**                               | **Requisitos asociados**           | **Prioridad** | **Versión** |
| -------- | ---------------------------------------------- | --------- | ------------------------------------------------------ | ---------------------------------- | ------------- | ----------- |
| FEAT-001 | Inicio de sesión y roles                       | EP-001    | Solo el personal autorizado usa el sistema.            | RF-007                             | Alta          | MVP         |
| FEAT-002 | Gestión del personal                           | EP-001    | El Administrador controla quién trabaja en el sistema. | RF-007                             | Alta          | MVP         |
| FEAT-003 | Registro y gestión de clientes                 | EP-001    | Base confiable de socios.                              | RF-001                             | Alta          | MVP         |
| FEAT-004 | Catálogo de planes                             | EP-002    | Tarifas ajustables sin cambiar el código.              | RF-002                             | Alta          | MVP         |
| FEAT-005 | Asignación y renovación de membresías          | EP-002    | Renovación rápida sin perder días pagados.             | RF-005                             | Media         | MVP         |
| FEAT-006 | Registro biométrico                            | EP-003    | Ingreso sin tarjetas.                                  | RF-004                             | Media         | MVP         |
| FEAT-007 | Validación de acceso                           | EP-003    | Solo ingresan socios vigentes.                         | RF-003                             | Alta          | MVP         |
| FEAT-008 | Historial de accesos                           | EP-003    | Auditoría de ingresos.                                 | RF-008                             | Media         | MVP         |
| FEAT-009 | Registro de pagos y resumen financiero         | EP-004    | Ingresos reales por cliente.                           | RF-006                             | Alta          | MVP         |
| FEAT-010 | Comprobante digital de pago                    | EP-004    | Soporte de pago para el cliente.                       | RF-006                             | Baja          | MVP / V1.1  |
| FEAT-011 | Seguridad, disponibilidad y calidad del código | EP-005    | Protección de datos y operación continua.              | RNF-001, RNF-004, RNF-005, RNF-006 | Alta          | MVP         |
| FEAT-012 | Interfaz usable y responsive                   | EP-005    | Atención ágil en la recepción.                         | RNF-002, RNF-007                   | Media         | MVP         |

### 4.3 Criterios para dividir el producto

  - Una épica no debería ejecutarse como una sola unidad de trabajo.

  - Una funcionalidad debe entregar una capacidad coherente y demostrable.

  - Una historia debe ser suficientemente pequeña para completarse dentro de una iteración razonable.

  - La división debe preservar valor; evitar historias organizadas únicamente por capas técnicas.

  - Las tareas técnicas apoyan historias o requisitos, pero no sustituyen el valor funcional.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Ejemplo de división</strong></p>
<p>Épica: Administración de planes y membresías (EP-002). Funcionalidades: catálogo de planes (FEAT-004) y asignación y renovación de membresías (FEAT-005). Historias: crear y gestionar planes (HU-003) y renovar membresía por cédula (HU-004); la tabla de pagos se separó como tarea técnica (TT-005). Cada historia puede probarse y demostrarse.</p></td>
</tr>
</tbody>
</table>

## 5\. Backlog del producto

### 5.1 Backlog maestro

| **Orden** | **ID** | **Tipo** | **Título**                                                            | **Épica / módulo** | **Valor** | **Prioridad** | **Estimación** | **Dependencias**       | **Estado**                                        | **Versión** |
| --------- | ------ | -------- | --------------------------------------------------------------------- | ------------------ | --------- | ------------- | -------------- | ---------------------- | ------------------------------------------------- | ----------- |
| 1         | HU-005 | Historia | Registrar huella del cliente                                          | EP-003             | Alto      | Must          | 13 pts         | HU-001, INT-01         | En progreso                                       | MVP         |
| 2         | HU-008 | Historia | Registrar pagos y ver resumen                                         | EP-004             | Alto      | Must          | 5 pts          | HU-003, HU-004, TT-005 | En progreso                                       | MVP         |
| 3         | HU-010 | Historia | Protección de datos                                                   | EP-005             | Alto      | Must          | 8 pts          | HU-002                 | En progreso                                       | MVP         |
| 4         | HU-011 | Historia | Disponibilidad en horario                                             | EP-005             | Alto      | Must          | 8 pts          | TT-009                 | Planificada                                       | MVP         |
| 5         | TT-005 | Técnica  | Crear la tabla de pagos con monto y método                            | EP-004             | Alto      | Must          | 5 pts          | HU-008                 | Planificada                                       | MVP         |
| 6         | TT-007 | Técnica  | Pruebas automatizadas de backend y frontend                           | EP-005             | Alto      | Must          | 8 pts          | —                      | Planificada                                       | MVP         |
| 7         | TT-009 | Técnica  | Despliegue de la API en hosting (por definir) y base MySQL en la nube | EP-005             | Alto      | Must          | 5 pts          | —                      | Planificada                                       | MVP         |
| 8         | TT-010 | Técnica  | Adaptador del sensor AS608 (CP2102) en la capa hardware               | EP-003             | Alto      | Must          | 8 pts          | INT-01                 | Planificada                                       | MVP         |
| 9         | TT-004 | Técnica  | Restringir CORS al dominio del frontend                               | EP-005             | Medio     | Should        | 1 pts          | TT-009                 | Planificada                                       | MVP         |
| 10        | TT-006 | Técnica  | Tarea programada de vencimiento en el servidor                        | EP-002             | Medio     | Should        | 3 pts          | HU-006                 | Planificada                                       | MVP         |
| 11        | TT-008 | Técnica  | Pipeline de integración continua                                      | EP-005             | Medio     | Should        | 3 pts          | TT-007                 | Planificada                                       | MVP         |
| 12        | HU-009 | Historia | Comprobante digital de pago                                           | EP-004             | Bajo      | Could         | 3 pts          | HU-008, TT-005         | Planificada                                       | MVP         |
| 13        | HU-001 | Historia | Registrar clientes                                                    | EP-001             | Alto      | Must          | 3 pts          | HU-002                 | En validación                                     | MVP         |
| 14        | HU-002 | Historia | Asignar roles al personal                                             | EP-001             | Alto      | Must          | 5 pts          | —                      | En validación                                     | MVP         |
| 15        | HU-003 | Historia | Gestionar planes                                                      | EP-002             | Alto      | Must          | 5 pts          | HU-002                 | En validación                                     | MVP         |
| 16        | HU-006 | Historia | Validar vigencia al ingresar                                          | EP-003             | Alto      | Must          | 8 pts          | HU-005                 | En validación                                     | MVP         |
| 17        | HU-004 | Historia | Renovar membresía por cédula                                          | EP-002             | Medio     | Should        | 3 pts          | HU-001, HU-003         | En validación                                     | MVP         |
| 18        | HU-007 | Historia | Validación inmediata                                                  | EP-003             | Medio     | Should        | 5 pts          | HU-006                 | En validación                                     | MVP         |
| 19        | HU-012 | Historia | Interfaz sencilla                                                     | EP-005             | Medio     | Should        | 3 pts          | —                      | En validación                                     | MVP         |
| 20        | HU-013 | Historia | Código con patrones de diseño                                         | EP-005             | Bajo      | Could         | 5 pts          | —                      | En validación                                     | MVP         |
| 21        | TT-001 | Técnica  | Validar en el backend la regla del último administrador               | EP-005             | Alto      | Must          | 2 pts          | HU-002                 | En progreso (rama feature/correcciones-seguridad) | MVP         |
| 22        | TT-002 | Técnica  | Quitar la ruta de borrado de clientes                                 | EP-001             | Alto      | Must          | 1 pts          | HU-001                 | En progreso (rama feature/correcciones-seguridad) | MVP         |
| 23        | TT-003 | Técnica  | Límite de intentos de inicio de sesión                                | EP-005             | Alto      | Must          | 3 pts          | HU-002                 | En progreso (rama feature/limite-intentos-login)  | MVP         |

### 5.2 Estados recomendados

| **Estado**      | **Significado**                                 | **Condición para avanzar**                    |
| --------------- | ----------------------------------------------- | --------------------------------------------- |
| Propuesta       | Necesidad identificada sin análisis suficiente. | Debe revisarse fuente y relación con alcance. |
| En refinamiento | Se está aclarando, dividiendo o estimando.      | Cumplir Definition of Ready.                  |
| Preparada       | Lista para ser seleccionada.                    | Aprobación funcional y viabilidad técnica.    |
| Planificada     | Asignada a iteración o versión.                 | Capacidad y dependencias confirmadas.         |
| En progreso     | Trabajo iniciado.                               | Evidencia de rama, tarea o PR.                |
| En validación   | Implementada y pendiente de revisión.           | Pruebas y demostración disponibles.           |
| Terminada       | Cumple Definition of Done.                      | Aceptación y trazabilidad actualizadas.       |
| Bloqueada       | No puede avanzar por impedimento.               | Registrar causa, responsable y acción.        |
| Descartada      | No se desarrollará.                             | Justificación y aprobación del cambio.        |

### 5.3 Políticas del backlog

  - El orden representa prioridad real, no solo numeración.

  - No deben planificarse elementos sin responsable de validación.

  - Las historias bloqueadas conservan su estado y registran el impedimento.

  - Los cambios relevantes se documentan con impacto en alcance, plazo, arquitectura y pruebas.

  - La herramienta digital es la fuente operativa; este documento conserva estructura, reglas y cortes aprobados.

## 6\. Historias de usuario y 7. Criterios de aceptación

Se mantienen en [`analisis/historias-de-usuario.md`](analisis/historias-de-usuario.md).

## 8\. Definition of Ready y Definition of Done

### 8.1 Definition of Ready

| **N.°** | **Condición**                                            | **Cumple**     | **Observación**                                             |
| ------- | -------------------------------------------------------- | -------------- | ----------------------------------------------------------- |
| 1       | La historia tiene actor, capacidad y beneficio claros.   | Sí / No        | Se revisa en el refinamiento de Jira.                       |
| 2       | Está relacionada con requisitos y reglas aprobadas.      | Sí / No        | Cada HU cita sus RF y RN (sección 6).                       |
| 3       | Cuenta con criterios de aceptación verificables.         | Sí / No        | Criterios CA-HU en la sección 7.                            |
| 4       | Sus dependencias y riesgos están identificados.          | Sí / No        | Se registran en la ficha y en Jira.                         |
| 5       | Existe diseño o aclaración funcional cuando se requiere. | Sí / No / N.A. | Wireframe o prototipo UI-01 a UI-09.                        |
| 6       | El equipo puede estimarla.                               | Sí / No        | Estimación en puntos en el sprint planning.                 |
| 7       | Es suficientemente pequeña para la iteración.            | Sí / No        | Si supera 8 puntos se divide (por ejemplo HU-005 y TT-010). |
| 8       | Tiene responsable funcional de validación.               | Sí / No        | Product Owner: Liliana Sofía Panesso Méndez.                |

### 8.2 Definition of Done

| **N.°** | **Condición**                                      | **Cumple**     | **Evidencia**                                                                |
| ------- | -------------------------------------------------- | -------------- | ---------------------------------------------------------------------------- |
| 1       | Código implementado y revisado.                    | Sí / No        | Pull Request revisado por otro integrante.                                   |
| 2       | Criterios de aceptación cumplidos.                 | Sí / No        | Demostración en la sprint review.                                            |
| 3       | Pruebas creadas y aprobadas.                       | Sí / No        | Pruebas manuales hoy; automatizadas en el sprint 12 (TT-007).                |
| 4       | Lint, compilación y pipeline sin errores críticos. | Sí / No        | npm run lint y npm run build sin errores; pipeline en el sprint 12 (TT-008). |
| 5       | Seguridad y permisos revisados.                    | Sí / No / N.A. | Rutas protegidas con permitirRoles en el backend.                            |
| 6       | Migraciones o cambios de datos incluidos.          | Sí / No / N.A. | Cambios en database/init.sql documentados en el README.                      |
| 7       | Documentación y trazabilidad actualizadas.         | Sí / No        | README, documento maestro y matriz de trazabilidad.                          |
| 8       | Integrada mediante el flujo Git definido.          | Sí / No        | Rama feature → develop → main por Pull Request.                              |
| 9       | Desplegada o disponible en ambiente de prueba.     | Sí / No / N.A. | Ambiente local; despliegue en un hosting por definir en el sprint 13.        |
| 10      | Validada por responsable funcional.                | Sí / No        | Aceptación del Product Owner en la sprint review.                            |

## 9\. Casos de uso y 10. Diagramas UML

Se mantienen en [`analisis/casos-de-uso.md`](analisis/casos-de-uso.md).

## 11\. Refinamiento, estimación y priorización

### 11.1 Lista de refinamiento

| **ID** | **Pregunta**                             | **Resultado / decisión**                                                                        | **Responsable**              | **Fecha** |
| ------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| HU-004 | ¿Cuál es el valor y quién valida?        | Renovar por cédula sin volver a capturar datos; valida el Product Owner.                        | Liliana Sofía Panesso Méndez | Sprint 6  |
| HU-005 | ¿Puede dividirse sin perder valor?       | Sí: registro de huella (HU-005), validación (HU-006) e integración física (TT-010).             | Juan Diego Mejía Llano       | Sprint 7  |
| HU-008 | ¿Qué reglas, datos y permisos aplican?   | Pago = precio del plan (RN-004); solo Administrador (RN-011); falta la tabla de pagos (TT-005). | Liliana Sofía Panesso Méndez | Sprint 10 |
| HU-006 | ¿Qué escenarios de error son relevantes? | Huella no reconocida, sin membresía, vencida, cancelada y error de conexión.                    | Maileth Begambre Movilla     | Sprint 8  |
| HU-009 | ¿Existen dependencias o riesgos?         | Depende de TT-005; riesgo de enviar datos personales por correo.                                | Liliana Sofía Panesso Méndez | Sprint 11 |

### 11.2 Métodos de estimación

| **Método**         | **Uso recomendado**                               | **Precaución**                            |
| ------------------ | ------------------------------------------------- | ----------------------------------------- |
| Puntos de historia | Comparar esfuerzo relativo, complejidad y riesgo. | No convertir automáticamente a horas.     |
| Tallas S/M/L/XL    | Refinamiento temprano y rápido.                   | Dividir elementos XL antes de planificar. |
| Tiempo ideal       | Tareas muy conocidas y operativas.                | No confundir con tiempo calendario.       |
| No estimado        | Trabajo exploratorio o descubrimiento.            | Definir timebox y resultado esperado.     |

### 11.3 Priorización

| **Factor**      | **Pregunta**                                      | **Valoración** |
| --------------- | ------------------------------------------------- | -------------- |
| Valor           | ¿Cuánto aporta al usuario u objetivo?             | 1–5            |
| Urgencia        | ¿Existe fecha, riesgo o dependencia temporal?     | 1–5            |
| Riesgo reducido | ¿Disminuye incertidumbre o exposición?            | 1–5            |
| Dependencia     | ¿Desbloquea otros elementos?                      | 1–5            |
| Esfuerzo        | ¿Cuál es el costo relativo?                       | 1–5            |
| Obligatoriedad  | ¿Es legal, contractual, de seguridad o académica? | Sí / No        |

## 12\. Planificación por iteraciones o versiones

### 12.1 Roadmap funcional

| **Versión / iteración** | **Objetivo**                                             | **Épicas / funcionalidades**          | **Historias clave** | **Criterio de salida**                                    | **Fecha objetivo**             |
| ----------------------- | -------------------------------------------------------- | ------------------------------------- | ------------------- | --------------------------------------------------------- | ------------------------------ |
| MVP (v1.0.0)            | Controlar membresías, accesos y pagos del gimnasio.      | EP-001 a EP-005 / FEAT-001 a FEAT-012 | HU-001 a HU-013     | Flujos críticos demostrados y pruebas críticas aprobadas. | 12/12/2026                     |
| V1.1                    | Apertura automática de la puerta con relé y electroimán. | EP-003 / FEAT-007                     | Por definir         | Apertura de puerta probada en el gimnasio.                | Por definir con el propietario |

### 12.2 Plan de iteración

| **ID** | **Historia / tarea**                                        | **Estimación** | **Responsable**              | **Dependencias** | **Estado**  | **Evidencia**               |
| ------ | ----------------------------------------------------------- | -------------- | ---------------------------- | ---------------- | ----------- | --------------------------- |
| TT-001 | Validar en el backend la regla del último administrador     | 2 pts          | Liliana Sofía Panesso Méndez | HU-002           | Planificada | Pull Request                |
| TT-002 | Quitar la ruta de borrado de clientes                       | 1 pt           | Liliana Sofía Panesso Méndez | HU-001           | Planificada | Pull Request                |
| TT-003 | Límite de intentos de inicio de sesión                      | 3 pts          | Liliana Sofía Panesso Méndez | HU-002           | Planificada | Pull Request y prueba       |
| TT-004 | Restringir CORS al dominio del frontend                     | 1 pt           | Liliana Sofía Panesso Méndez | TT-009           | Planificada | Pull Request                |
| TT-005 | Crear la tabla de pagos con monto y método                  | 5 pts          | Liliana Sofía Panesso Méndez | HU-008           | Planificada | Pull Request y migración    |
| HU-008 | Registrar pagos reales en el registro financiero (frontend) | 5 pts          | Juan Diego Mejía Llano       | TT-005           | En progreso | Pull Request y demostración |
| HU-012 | Estados de carga, vacío y error en las pantallas            | 3 pts          | Maileth Begambre Movilla     | —                | Planificada | Pull Request y capturas     |

### 12.3 Seguimiento de bloqueos

| **ID**  | **Elemento afectado** | **Impedimento**                                                                    | **Impacto**                                      | **Responsable de resolver**  | **Fecha límite** | **Estado** |
| ------- | --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------- | ---------------- | ---------- |
| BLQ-001 | HU-005, TT-010        | El sensor AS608 aún no está integrado con la API (TT-010).                         | Las pruebas de acceso se hacen con el simulador. | Liliana Sofía Panesso Méndez |                  | Abierto    |
| BLQ-002 | HU-011, TT-009        | Falta definir el hosting de la API (no Render) y el proveedor de MySQL en la nube. | Retrasa el despliegue.                           | Liliana Sofía Panesso Méndez |                  | Abierto    |

## 13\. Gestión de cambios

### 13.1 Solicitud y análisis

| **ID cambio** | **Origen**           | **Descripción**                                                                                                                          | **Elementos afectados**                        | **Impacto**      | **Decisión**                     | **Responsable**        | **Fecha** |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------- | -------------------------------- | ---------------------- | --------- |
| CR-001        | STK-01 Propietario   | Reemplazar tarjetas RFID por huella y renovar por cédula.                                                                                | HU-004, HU-005, CU-004, RF-004, RF-005         | Alcance y riesgo | Aprobado                         | Juan Diego Mejía Llano | Sprint 6  |
| CR-002        | STK-01 Propietario   | Retirar el torniquete; abrir con relé y electroimán.                                                                                     | RF-004, INT-02                                 | Alcance          | Aprobado                         | Juan Diego Mejía Llano | Sprint 7  |
| CR-003        | Equipo de desarrollo | Migrar el frontend a React en un monorepo.                                                                                               | UI-01 a UI-09                                  | Tiempo y riesgo  | Aprobado                         | Juan Diego Mejía Llano | Sprint 9  |
| CR-004        | Equipo de desarrollo | Calcular el registro financiero desde las membresías hasta tener la tabla de pagos.                                                      | HU-008, RF-006                                 | Alcance          | Aprobado (temporal)              | Juan Diego Mejía Llano | Sprint 10 |
| CR-005        | STK-01 Propietario   | Usar el sensor AS608 con conversor CP2102 solo para validar el ingreso; la apertura con relé y electroimán pasa a una versión posterior. | OBJ-04, RF-003, RF-004, INT-01, INT-02, CU-004 | Alcance          | Aprobado                         | Juan Diego Mejía Llano |           |
| CR-006        | Equipo de desarrollo | Publicar el backend en un hosting distinto de Render (proveedor por definir).                                                            | TT-009, INT-02                                 | Tiempo y riesgo  | Aprobado (proveedor por definir) | Juan Diego Mejía Llano |           |

### 13.2 Reglas de actualización

1.  Actualizar primero la fuente de verdad afectada: requisito, regla o alcance.

2.  Actualizar backlog, historias, casos de uso y criterios relacionados.

3.  Revisar diseño, arquitectura, datos y pruebas.

4.  Registrar versión, responsable y aprobación.

5.  Comunicar el cambio y replanificar cuando modifique compromisos.

6.  Conservar trazabilidad de elementos reemplazados u obsoletos.

## 14\. Trazabilidad, validación y aceptación

### 14.1 Matriz resumida

| **HU / CU** | **RF / RNF**           | **RN**                         | **Actor**      | **UI**               | **Componente / API** | **Caso de prueba**              | **Versión** | **Estado**                     |
| ----------- | ---------------------- | ------------------------------ | -------------- | -------------------- | -------------------- | ------------------------------- | ----------- | ------------------------------ |
| HU-001      | RF-001                 | RN-001, RN-007                 | ACT-01         | UI-03                | FEAT-003             | CP-001 a CP-003                 | MVP         | En validación                  |
| HU-002      | RF-007                 | RN-011, RN-012                 | ACT-01         | UI-01, UI-08         | FEAT-001, FEAT-002   | CP-016 a CP-018, CP-020, CP-021 | MVP         | En validación                  |
| HU-003      | RF-002                 | RN-006                         | ACT-01         | UI-04                | FEAT-004             | CP-004 a CP-006                 | MVP         | En validación                  |
| HU-004      | RF-005                 | RN-003, RN-004, RN-005         | ACT-02         | UI-05                | FEAT-005             | CP-012, CP-013                  | MVP         | En validación                  |
| HU-005      | RF-004                 | RN-008                         | ACT-01         | UI-06                | FEAT-006             | CP-010, CP-011                  | MVP         | En progreso                    |
| HU-006      | RF-003, RF-008         | RN-002, RN-009, RN-010         | ACT-02         | UI-06, UI-07         | FEAT-007, FEAT-008   | CP-007 a CP-009, CP-019         | MVP         | En validación                  |
| HU-007      | RF-003, RNF-003        | RN-009                         | ACT-02         | UI-06                | FEAT-007             | Medición RNF-003                | MVP         | En validación                  |
| HU-008      | RF-006                 | RN-004, RN-011                 | ACT-01         | UI-05, UI-09         | FEAT-009             | CP-014, CP-015                  | MVP         | En progreso                    |
| HU-009      | RF-006                 | RN-004                         | ACT-03         | UI-09                | FEAT-010             | Por definir                     | MVP         | Planificada                    |
| HU-010      | RNF-001, RNF-006       | RN-008, RN-011, RN-012         | ACT-01         | —                    | FEAT-011             | CP-020, CP-021                  | MVP         | En progreso                    |
| HU-011      | RNF-004                | —                              | ACT-01         | —                    | FEAT-011             | Monitoreo RNF-004               | MVP         | Planificada                    |
| HU-012      | RNF-002, RNF-007       | —                              | ACT-02         | UI-01 a UI-09        | FEAT-012             | Medición RNF-002                | MVP         | En validación                  |
| HU-013      | RNF-005                | —                              | Equipo         | —                    | FEAT-011             | Inspección RNF-005              | MVP         | En validación                  |
| CU-001      | RF-007                 | RN-011                         | ACT-01, ACT-02 | UI-01                | —                    | CP-016, CP-017                  | MVP         | Implementado                   |
| CU-002      | RF-001                 | RN-001, RN-007                 | ACT-01, ACT-02 | UI-03                | —                    | CP-001 a CP-003                 | MVP         | Implementado                   |
| CU-003      | RF-002                 | RN-006                         | ACT-01         | UI-04                | —                    | CP-004 a CP-006                 | MVP         | Implementado                   |
| CU-004      | RF-003, RF-004, RF-008 | RN-002, RN-009, RN-010         | ACT-02, ACT-03 | UI-06, UI-07; INT-01 | —                    | CP-007 a CP-009                 | MVP         | Implementado (lector simulado) |
| CU-005      | RF-005, RF-006         | RN-003, RN-004, RN-005, RN-006 | ACT-01, ACT-02 | UI-05                | —                    | CP-012 a CP-014                 | MVP         | Implementado                   |
| CU-006      | RF-007                 | RN-011, RN-012                 | ACT-01         | UI-08                | —                    | CP-018                          | MVP         | Implementado                   |
| CU-007      | RF-006                 | RN-004, RN-011                 | ACT-01         | UI-09                | —                    | CP-014, CP-015                  | MVP         | Implementado parcialmente      |

### 14.2 Cobertura de historias y casos de uso

| **Verificación**                                                           | **Resultado**      | **Observación** |
| -------------------------------------------------------------------------- | ------------------ | --------------- |
| Toda historia se relaciona con al menos un requisito o necesidad aprobada. | Cumple / No cumple |                 |
| Cada criterio tiene método o caso de prueba.                               | Cumple / No cumple |                 |
| Los procesos críticos tienen caso de uso o justificación de no requerirlo. | Cumple / No cumple |                 |
| Las historias terminadas tienen evidencia y aceptación.                    | Cumple / No cumple |                 |
| No existen historias fuera de alcance sin cambio aprobado.                 | Cumple / No cumple |                 |

### 14.3 Registro de aceptación

| **Elemento** | **Versión** | **Responsable funcional**    | **Resultado**       | **Fecha** | **Evidencia / observación** |
| ------------ | ----------- | ---------------------------- | ------------------- | --------- | --------------------------- |
| HU-001       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-002       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-003       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-004       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-005       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-006       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-007       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-008       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-009       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-010       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-011       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-012       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| HU-013       | MVP         | Liliana Sofía Panesso Méndez | Aceptada / Devuelta |           |                             |
| CU-001       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-002       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-003       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-004       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-005       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-006       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |
| CU-007       | MVP         | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                             |

## 15\. Indicadores y lista de verificación

### 15.1 Indicadores sugeridos

| **Indicador**                | **Fórmula / criterio**                            | **Meta sugerida**      | **Frecuencia** |
| ---------------------------- | ------------------------------------------------- | ---------------------- | -------------- |
| Historias preparadas         | Historias que cumplen DoR / historias candidatas. | Definida por iteración | Semanal        |
| Cumplimiento de iteración    | Historias terminadas / historias comprometidas.   | Analizar tendencia     | Por iteración  |
| Cambios posteriores a inicio | Historias modificadas después de iniciar.         | Tendencia decreciente  | Por iteración  |
| Cobertura de aceptación      | Criterios con prueba / criterios totales.         | 100 % para críticos    | Por entrega    |
| Historias devueltas          | Historias rechazadas en validación / terminadas.  | Analizar causas        | Por iteración  |
| Tiempo bloqueado             | Duración acumulada de impedimentos.               | Reducir                | Semanal        |

### 15.2 Lista de verificación final

| **N.°** | **Verificación**                                                            | **Cumple**     | **Observaciones** |
| ------- | --------------------------------------------------------------------------- | -------------- | ----------------- |
| 1       | El backlog está ordenado y actualizado.                                     | Sí / No / N.A. |                   |
| 2       | Las épicas y funcionalidades se relacionan con objetivos y requisitos.      | Sí / No / N.A. |                   |
| 3       | Cada historia expresa actor, capacidad y beneficio.                         | Sí / No / N.A. |                   |
| 4       | Las historias cumplen criterios INVEST o tienen justificación.              | Sí / No / N.A. |                   |
| 5       | Los criterios de aceptación son verificables.                               | Sí / No / N.A. |                   |
| 6       | Se cubren flujos de éxito, error, permisos y límites relevantes.            | Sí / No / N.A. |                   |
| 7       | Definition of Ready y Definition of Done están aprobadas.                   | Sí / No / N.A. |                   |
| 8       | Los casos de uso se elaboraron solo donde aportan detalle.                  | Sí / No / N.A. |                   |
| 9       | Los flujos alternativos y excepciones están referenciados correctamente.    | Sí / No / N.A. |                   |
| 10      | Los diagramas coinciden con los casos documentados.                         | Sí / No / N.A. |                   |
| 11      | Las estimaciones y prioridades tienen criterio explícito.                   | Sí / No / N.A. |                   |
| 12      | Los cambios conservan historial e impacto.                                  | Sí / No / N.A. |                   |
| 13      | La trazabilidad llega a diseño y pruebas.                                   | Sí / No / N.A. |                   |
| 14      | Las historias terminadas tienen evidencia y aceptación.                     | Sí / No / N.A. |                   |
| 15      | El documento coincide con la herramienta de gestión y la versión entregada. | Sí / No / N.A. |                   |

## Anexo A. Plantilla rápida de historia de usuario

<table>
<thead>
<tr class="header">
<th><strong>Campo</strong></th>
<th><strong>Contenido</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ID y título</td>
<td>HU-___ – __________________</td>
</tr>
<tr class="even">
<td>Como</td>
<td></td>
</tr>
<tr class="odd">
<td>Quiero</td>
<td></td>
</tr>
<tr class="even">
<td>Para</td>
<td></td>
</tr>
<tr class="odd">
<td>Criterios de aceptación</td>
<td>1.<br />
2.<br />
3.</td>
</tr>
<tr class="even">
<td>Prioridad y estimación</td>
<td></td>
</tr>
<tr class="odd">
<td>RF / RN / UI relacionados</td>
<td></td>
</tr>
<tr class="even">
<td>Dependencias</td>
<td></td>
</tr>
<tr class="odd">
<td>DoR</td>
<td>Cumple / No cumple</td>
</tr>
<tr class="even">
<td>DoD</td>
<td>Cumple / No cumple</td>
</tr>
<tr class="odd">
<td>Evidencia</td>
<td></td>
</tr>
</tbody>
</table>

## Anexo B. Plantilla rápida de caso de uso

<table>
<thead>
<tr class="header">
<th><strong>Campo</strong></th>
<th><strong>Contenido</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ID y nombre</td>
<td>CU-___ – __________________</td>
</tr>
<tr class="even">
<td>Actor principal</td>
<td></td>
</tr>
<tr class="odd">
<td>Objetivo</td>
<td></td>
</tr>
<tr class="even">
<td>Disparador</td>
<td></td>
</tr>
<tr class="odd">
<td>Precondiciones</td>
<td></td>
</tr>
<tr class="even">
<td>Flujo principal</td>
<td>1.<br />
2.<br />
3.</td>
</tr>
<tr class="odd">
<td>Alternativos / excepciones</td>
<td></td>
</tr>
<tr class="even">
<td>Postcondiciones</td>
<td></td>
</tr>
<tr class="odd">
<td>RF / HU / RN relacionados</td>
<td></td>
</tr>
<tr class="even">
<td>Pruebas relacionadas</td>
<td></td>
</tr>
</tbody>
</table>

### Anexo C. Convención de carpetas sugerida

/docs/analisis/backlog/ → cortes o exportaciones aprobadas del backlog

/docs/analisis/historias/ → historias detalladas cuando no estén completamente en la herramienta

/docs/analisis/casos-uso/ → fichas y diagramas editables

/docs/trazabilidad/ → matriz maestra

/docs/evidencias/aceptacion/ → actas, capturas o referencias de validación

### Anexo D. Aprobación del documento

| **Rol**                 | **Nombre**                   | **Resultado**       | **Fecha** | **Firma / aceptación** |
| ----------------------- | ---------------------------- | ------------------- | --------- | ---------------------- |
| Product Owner / cliente | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                        |
| Líder técnico           |                              | Aprobado / Devuelto |           |                        |
| Instructor              |                              | Aprobado / Devuelto |           |                        |
