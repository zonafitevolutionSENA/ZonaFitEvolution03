# Historias de usuario y criterios de aceptación

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Extraído del documento [Backlog, historias de usuario y casos de uso](../03b-backlog-hu-casos-uso.md). Versión formal: [PDF](../entregables/02_Requerimientos/Backlog_HU_y_Casos_de_Uso_ZonaFitEvolution.pdf).

## 6\. Historias de usuario

### 6.1 Plantilla detallada

**HU-001 – Registrar clientes**

| **Campo**                    | **Contenido**                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID y título                  | HU-001 – Registrar clientes                                                                                                                                        |
| Épica / funcionalidad        | EP-001 / FEAT-003                                                                                                                                                  |
| Narrativa                    | Como Administrador, quiero registrar a los clientes con sus datos personales (nombre, cédula, correo y teléfono) para integrarlos formalmente en la base de datos. |
| Contexto y problema          | Hoy los socios se anotan a mano y no hay forma de saber quién está inscrito.                                                                                       |
| Valor esperado               | Base de clientes confiable para asignar membresías y validar accesos.                                                                                              |
| Actor principal              | ACT-01 Administrador (también ACT-02)                                                                                                                              |
| Requisitos relacionados      | RF-001                                                                                                                                                             |
| Reglas relacionadas          | RN-001, RN-007                                                                                                                                                     |
| Prioridad                    | Must                                                                                                                                                               |
| Estimación                   | 3 puntos de historia                                                                                                                                               |
| Dependencias                 | HU-002                                                                                                                                                             |
| Riesgos                      | Cédulas mal digitadas.                                                                                                                                             |
| Prototipo relacionado        | UI-03                                                                                                                                                              |
| Criterios de aceptación      | CA-HU-001-01, CA-HU-001-02, CA-HU-001-03                                                                                                                           |
| Casos de prueba              | CP-001 a CP-003                                                                                                                                                    |
| Versión / iteración objetivo | MVP – Sprints 3 y 4                                                                                                                                                |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                       |
| Estado                       | En validación                                                                                                                                                      |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                                                         |

**HU-002 – Asignar roles al personal**

| **Campo**                    | **Contenido**                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-002 – Asignar roles al personal                                                                                                                                           |
| Épica / funcionalidad        | EP-001 / FEAT-001, FEAT-002                                                                                                                                                  |
| Narrativa                    | Como Administrador, quiero asignar roles específicos (Administrador y Empleado) para restringir el acceso a la información financiera y proteger la integridad de los datos. |
| Contexto y problema          | Todo el personal tenía acceso a la misma información.                                                                                                                        |
| Valor esperado               | Separación de funciones y protección de las finanzas.                                                                                                                        |
| Actor principal              | ACT-01 Administrador                                                                                                                                                         |
| Requisitos relacionados      | RF-007                                                                                                                                                                       |
| Reglas relacionadas          | RN-011, RN-012                                                                                                                                                               |
| Prioridad                    | Must                                                                                                                                                                         |
| Estimación                   | 5 puntos de historia                                                                                                                                                         |
| Dependencias                 | —                                                                                                                                                                            |
| Riesgos                      | Permisos controlados solo en la interfaz.                                                                                                                                    |
| Prototipo relacionado        | UI-01, UI-08                                                                                                                                                                 |
| Criterios de aceptación      | CA-HU-002-01, CA-HU-002-02, CA-HU-002-03, CA-HU-002-04                                                                                                                       |
| Casos de prueba              | CP-016 a CP-018, CP-020, CP-021                                                                                                                                              |
| Versión / iteración objetivo | MVP – Sprint 3                                                                                                                                                               |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                                 |
| Estado                       | En validación                                                                                                                                                                |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                                                                   |

**HU-003 – Gestionar planes**

| **Campo**                    | **Contenido**                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-003 – Gestionar planes                                                                                                                   |
| Épica / funcionalidad        | EP-002 / FEAT-004                                                                                                                           |
| Narrativa                    | Como Administrador, quiero crear y gestionar los planes (por tiempo y tiqueteras) para ofrecer flexibilidad en las opciones de suscripción. |
| Contexto y problema          | Las tarifas estaban fijas en el código.                                                                                                     |
| Valor esperado               | El propietario ajusta precios sin cambiar el sistema.                                                                                       |
| Actor principal              | ACT-01 Administrador                                                                                                                        |
| Requisitos relacionados      | RF-002                                                                                                                                      |
| Reglas relacionadas          | RN-006                                                                                                                                      |
| Prioridad                    | Must                                                                                                                                        |
| Estimación                   | 5 puntos de historia                                                                                                                        |
| Dependencias                 | HU-002                                                                                                                                      |
| Riesgos                      | Borrar un plan con historial.                                                                                                               |
| Prototipo relacionado        | UI-04                                                                                                                                       |
| Criterios de aceptación      | CA-HU-003-01, CA-HU-003-02, CA-HU-003-03                                                                                                    |
| Casos de prueba              | CP-004 a CP-006                                                                                                                             |
| Versión / iteración objetivo | MVP – Sprint 5                                                                                                                              |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                |
| Estado                       | En validación                                                                                                                               |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                                  |

**HU-004 – Renovar membresía por cédula**

| **Campo**                    | **Contenido**                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-004 – Renovar membresía por cédula                                                                                                                             |
| Épica / funcionalidad        | EP-002 / FEAT-005                                                                                                                                                 |
| Narrativa                    | Como Recepcionista, quiero renovar la membresía de un cliente buscándolo por su cédula, para actualizar la fecha de vencimiento sin volver a registrar sus datos. |
| Contexto y problema          | La renovación obligaba a capturar otra vez al cliente.                                                                                                            |
| Valor esperado               | Atención más rápida en horas pico.                                                                                                                                |
| Actor principal              | ACT-02 Empleado / recepcionista                                                                                                                                   |
| Requisitos relacionados      | RF-005                                                                                                                                                            |
| Reglas relacionadas          | RN-003, RN-004, RN-005                                                                                                                                            |
| Prioridad                    | Should                                                                                                                                                            |
| Estimación                   | 3 puntos de historia                                                                                                                                              |
| Dependencias                 | HU-001, HU-003                                                                                                                                                    |
| Riesgos                      | Perder días pagados al renovar.                                                                                                                                   |
| Prototipo relacionado        | UI-05                                                                                                                                                             |
| Criterios de aceptación      | CA-HU-004-01, CA-HU-004-02                                                                                                                                        |
| Casos de prueba              | CP-012, CP-013                                                                                                                                                    |
| Versión / iteración objetivo | MVP – Sprint 6                                                                                                                                                    |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                      |
| Estado                       | En validación                                                                                                                                                     |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                                                        |

**HU-005 – Registrar huella del cliente**

| **Campo**                    | **Contenido**                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-005 – Registrar huella del cliente                                                                            |
| Épica / funcionalidad        | EP-003 / FEAT-006                                                                                                |
| Narrativa                    | Como Administrador, quiero registrar la huella de cada cliente para identificarlo automáticamente en la entrada. |
| Contexto y problema          | Se descartaron las tarjetas (CR-001).                                                                            |
| Valor esperado               | Ingreso sin tarjetas ni filas.                                                                                   |
| Actor principal              | ACT-01 Administrador (también ACT-02)                                                                            |
| Requisitos relacionados      | RF-004                                                                                                           |
| Reglas relacionadas          | RN-008                                                                                                           |
| Prioridad                    | Must                                                                                                             |
| Estimación                   | 13 puntos de historia                                                                                            |
| Dependencias                 | HU-001, INT-01                                                                                                   |
| Riesgos                      | Huellas residuales en el sensor: si no detecta un dedo nuevo responde el código 0x17.                            |
| Prototipo relacionado        | UI-06                                                                                                            |
| Criterios de aceptación      | CA-HU-005-01, CA-HU-005-02                                                                                       |
| Casos de prueba              | CP-010, CP-011                                                                                                   |
| Versión / iteración objetivo | MVP – Sprint 7                                                                                                   |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                     |
| Estado                       | En progreso                                                                                                      |
| Evidencia de aceptación      | Pendiente                                                                                                        |

**HU-006 – Validar vigencia al ingresar**

| **Campo**                    | **Contenido**                                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-006 – Validar vigencia al ingresar                                                                                                                         |
| Épica / funcionalidad        | EP-003 / FEAT-007, FEAT-008                                                                                                                                   |
| Narrativa                    | Como Recepcionista, quiero que el sistema valide automáticamente la vigencia de la membresía para permitir el ingreso solo a quienes tengan su cuenta activa. |
| Contexto y problema          | Hoy la recepción revisa a mano y se cuelan socios vencidos.                                                                                                   |
| Valor esperado               | Cero ingresos con membresía vencida.                                                                                                                          |
| Actor principal              | ACT-02 Empleado / recepcionista                                                                                                                               |
| Requisitos relacionados      | RF-003, RF-008                                                                                                                                                |
| Reglas relacionadas          | RN-002, RN-009, RN-010                                                                                                                                        |
| Prioridad                    | Must                                                                                                                                                          |
| Estimación                   | 8 puntos de historia                                                                                                                                          |
| Dependencias                 | HU-005                                                                                                                                                        |
| Riesgos                      | Estado guardado desactualizado.                                                                                                                               |
| Prototipo relacionado        | UI-06, UI-07                                                                                                                                                  |
| Criterios de aceptación      | CA-HU-006-01, CA-HU-006-02, CA-HU-006-03                                                                                                                      |
| Casos de prueba              | CP-007 a CP-009, CP-019                                                                                                                                       |
| Versión / iteración objetivo | MVP – Sprint 8                                                                                                                                                |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                  |
| Estado                       | En validación                                                                                                                                                 |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                                                    |

**HU-007 – Validación inmediata**

| **Campo**                    | **Contenido**                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-007 – Validación inmediata                                                                                                           |
| Épica / funcionalidad        | EP-003 / FEAT-007                                                                                                                       |
| Narrativa                    | Como Recepcionista, quiero que la validación de acceso sea inmediata para evitar filas y asegurar un rendimiento óptimo en tiempo real. |
| Contexto y problema          | Las horas pico generan congestión en la entrada.                                                                                        |
| Valor esperado               | Ingreso fluido.                                                                                                                         |
| Actor principal              | ACT-02 Empleado / recepcionista                                                                                                         |
| Requisitos relacionados      | RF-003, RNF-003                                                                                                                         |
| Reglas relacionadas          | RN-009                                                                                                                                  |
| Prioridad                    | Should                                                                                                                                  |
| Estimación                   | 5 puntos de historia                                                                                                                    |
| Dependencias                 | HU-006                                                                                                                                  |
| Riesgos                      | Latencia del hosting (proveedor por definir).                                                                                           |
| Prototipo relacionado        | UI-06                                                                                                                                   |
| Criterios de aceptación      | CA-HU-007-01                                                                                                                            |
| Casos de prueba              | Medición RNF-003                                                                                                                        |
| Versión / iteración objetivo | MVP – Sprint 8                                                                                                                          |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                            |
| Estado                       | En validación                                                                                                                           |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                              |

**HU-008 – Registrar pagos y ver resumen**

| **Campo**                    | **Contenido**                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID y título                  | HU-008 – Registrar pagos y ver resumen                                                                                                                                               |
| Épica / funcionalidad        | EP-004 / FEAT-009                                                                                                                                                                    |
| Narrativa                    | Como Administrador, quiero que cada membresía asignada o renovada quede registrada como pago y consultar el resumen de pagos de cada cliente, para mantener un historial financiero. |
| Contexto y problema          | No hay control de los ingresos de la recepción.                                                                                                                                      |
| Valor esperado               | Conocer los ingresos reales por cliente.                                                                                                                                             |
| Actor principal              | ACT-01 Administrador                                                                                                                                                                 |
| Requisitos relacionados      | RF-006                                                                                                                                                                               |
| Reglas relacionadas          | RN-004, RN-011                                                                                                                                                                       |
| Prioridad                    | Must                                                                                                                                                                                 |
| Estimación                   | 5 puntos de historia                                                                                                                                                                 |
| Dependencias                 | HU-003, HU-004, TT-005                                                                                                                                                               |
| Riesgos                      | Cifras estimadas si cambia el precio del plan.                                                                                                                                       |
| Prototipo relacionado        | UI-05, UI-09                                                                                                                                                                         |
| Criterios de aceptación      | CA-HU-008-01, CA-HU-008-02                                                                                                                                                           |
| Casos de prueba              | CP-014, CP-015                                                                                                                                                                       |
| Versión / iteración objetivo | MVP – Sprints 10 a 12                                                                                                                                                                |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                                                         |
| Estado                       | En progreso                                                                                                                                                                          |
| Evidencia de aceptación      | Pendiente                                                                                                                                                                            |

**HU-009 – Comprobante digital de pago**

| **Campo**                    | **Contenido**                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-009 – Comprobante digital de pago                                                                    |
| Épica / funcionalidad        | EP-004 / FEAT-010                                                                                       |
| Narrativa                    | Como Cliente, quiero recibir un comprobante digital de mi pago para tener un soporte de mi transacción. |
| Contexto y problema          | Los socios no reciben soporte de sus pagos.                                                             |
| Valor esperado               | Transparencia con el cliente.                                                                           |
| Actor principal              | ACT-03 Cliente                                                                                          |
| Requisitos relacionados      | RF-006                                                                                                  |
| Reglas relacionadas          | RN-004                                                                                                  |
| Prioridad                    | Could                                                                                                   |
| Estimación                   | 3 puntos de historia                                                                                    |
| Dependencias                 | HU-008, TT-005                                                                                          |
| Riesgos                      | Envío de datos personales por correo.                                                                   |
| Prototipo relacionado        | UI-09                                                                                                   |
| Criterios de aceptación      | Por definir                                                                                             |
| Casos de prueba              | Por definir                                                                                             |
| Versión / iteración objetivo | MVP – Sprint 12                                                                                         |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                            |
| Estado                       | Planificada                                                                                             |
| Evidencia de aceptación      | Pendiente                                                                                               |

**HU-010 – Protección de datos**

| **Campo**                    | **Contenido**                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-010 – Protección de datos                                                                                                                  |
| Épica / funcionalidad        | EP-005 / FEAT-011                                                                                                                             |
| Narrativa                    | Como Administrador, quiero que el sistema cuente con protocolos de seguridad y cifrado para garantizar la protección de los datos personales. |
| Contexto y problema          | Se manejan datos personales y biométricos.                                                                                                    |
| Valor esperado               | Cumplir la Ley 1581 de 2012 y evitar fugas.                                                                                                   |
| Actor principal              | ACT-01 Administrador                                                                                                                          |
| Requisitos relacionados      | RNF-001, RNF-006                                                                                                                              |
| Reglas relacionadas          | RN-008, RN-011, RN-012                                                                                                                        |
| Prioridad                    | Must                                                                                                                                          |
| Estimación                   | 8 puntos de historia                                                                                                                          |
| Dependencias                 | HU-002                                                                                                                                        |
| Riesgos                      | Brechas pendientes (OBS-001 a OBS-003).                                                                                                       |
| Prototipo relacionado        | —                                                                                                                                             |
| Criterios de aceptación      | CA-HU-010-01                                                                                                                                  |
| Casos de prueba              | CP-020, CP-021                                                                                                                                |
| Versión / iteración objetivo | MVP – Sprints 3 a 11                                                                                                                          |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                  |
| Estado                       | En progreso                                                                                                                                   |
| Evidencia de aceptación      | Pendiente                                                                                                                                     |

**HU-011 – Disponibilidad en horario**

| **Campo**                    | **Contenido**                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-011 – Disponibilidad en horario                                                                                                              |
| Épica / funcionalidad        | EP-005 / FEAT-011                                                                                                                               |
| Narrativa                    | Como Administrador, quiero asegurar la disponibilidad del sistema durante todo el horario de operación para no interrumpir el flujo de ingreso. |
| Contexto y problema          | Sin sistema no se puede validar el ingreso.                                                                                                     |
| Valor esperado               | Operación continua de la recepción.                                                                                                             |
| Actor principal              | ACT-01 Administrador                                                                                                                            |
| Requisitos relacionados      | RNF-004                                                                                                                                         |
| Reglas relacionadas          | —                                                                                                                                               |
| Prioridad                    | Must                                                                                                                                            |
| Estimación                   | 8 puntos de historia                                                                                                                            |
| Dependencias                 | TT-009                                                                                                                                          |
| Riesgos                      | Proveedor de base de datos sin definir.                                                                                                         |
| Prototipo relacionado        | —                                                                                                                                               |
| Criterios de aceptación      | Por definir                                                                                                                                     |
| Casos de prueba              | Monitoreo RNF-004                                                                                                                               |
| Versión / iteración objetivo | MVP – Sprint 13                                                                                                                                 |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                                    |
| Estado                       | Planificada                                                                                                                                     |
| Evidencia de aceptación      | Pendiente                                                                                                                                       |

**HU-012 – Interfaz sencilla**

| **Campo**                    | **Contenido**                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-012 – Interfaz sencilla                                                                                            |
| Épica / funcionalidad        | EP-005 / FEAT-012                                                                                                     |
| Narrativa                    | Como Empleado, quiero una interfaz sencilla e intuitiva para realizar las tareas de registro y control de forma ágil. |
| Contexto y problema          | La recepción atiende con prisa.                                                                                       |
| Valor esperado               | Menos errores y capacitación más corta.                                                                               |
| Actor principal              | ACT-02 Empleado                                                                                                       |
| Requisitos relacionados      | RNF-002, RNF-007                                                                                                      |
| Reglas relacionadas          | —                                                                                                                     |
| Prioridad                    | Should                                                                                                                |
| Estimación                   | 3 puntos de historia                                                                                                  |
| Dependencias                 | —                                                                                                                     |
| Riesgos                      | Pantallas sin estados de error claros.                                                                                |
| Prototipo relacionado        | UI-01 a UI-09                                                                                                         |
| Criterios de aceptación      | CA-HU-012-01                                                                                                          |
| Casos de prueba              | Medición RNF-002                                                                                                      |
| Versión / iteración objetivo | MVP – Sprints 2, 4, 9 y 10                                                                                            |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                          |
| Estado                       | En validación                                                                                                         |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                            |

**HU-013 – Código con patrones de diseño**

| **Campo**                    | **Contenido**                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ID y título                  | HU-013 – Código con patrones de diseño                                                                                              |
| Épica / funcionalidad        | EP-005 / FEAT-011                                                                                                                   |
| Narrativa                    | Como Desarrollador, quiero que el código esté organizado con patrones de diseño para facilitar el mantenimiento y la escalabilidad. |
| Contexto y problema          | El proyecto debe sostenerse y sustentarse.                                                                                          |
| Valor esperado               | Cambios sin romper otras partes.                                                                                                    |
| Actor principal              | Equipo de desarrollo                                                                                                                |
| Requisitos relacionados      | RNF-005                                                                                                                             |
| Reglas relacionadas          | —                                                                                                                                   |
| Prioridad                    | Could                                                                                                                               |
| Estimación                   | 5 puntos de historia                                                                                                                |
| Dependencias                 | —                                                                                                                                   |
| Riesgos                      | Sobrearquitectura.                                                                                                                  |
| Prototipo relacionado        | —                                                                                                                                   |
| Criterios de aceptación      | Por definir                                                                                                                         |
| Casos de prueba              | Inspección RNF-005                                                                                                                  |
| Versión / iteración objetivo | MVP – Sprints 3 a 8                                                                                                                 |
| Responsable de validación    | Liliana Sofía Panesso Méndez (Product Owner)                                                                                        |
| Estado                       | En validación                                                                                                                       |
| Evidencia de aceptación      | Pull Requests en GitHub y demostración en la sprint review                                                                          |

### 6.2 Redacción efectiva

| **Problema frecuente**                  | **Corrección recomendada**                                                                   |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| “Como sistema, quiero guardar datos.”   | Usar un actor real o registrar una tarea técnica si no existe valor directo para usuario.    |
| “Como usuario, quiero gestionar todo.”  | Dividir por objetivo, flujo o resultado verificable.                                         |
| “Para que el sistema funcione.”         | Expresar un beneficio concreto y observable.                                                 |
| Criterios que describen implementación. | Describir comportamiento esperado; los detalles técnicos pertenecen a arquitectura o tareas. |
| Historia demasiado grande.              | Dividir por flujo, regla, rol, dato o escenario, conservando valor.                          |

### 6.3 Criterios INVEST

| **Criterio**    | **Pregunta de revisión**                                             |
| --------------- | -------------------------------------------------------------------- |
| Independiente   | ¿Puede planificarse con pocas dependencias o estas están explícitas? |
| Negociable      | ¿Describe una necesidad sin imponer innecesariamente la solución?    |
| Valiosa         | ¿Entrega valor identificable?                                        |
| Estimable       | ¿Existe suficiente claridad para estimarla?                          |
| Small / Pequeña | ¿Puede completarse dentro de una iteración?                          |
| Testeable       | ¿Sus criterios permiten diseñar pruebas objetivas?                   |

## 7\. Criterios de aceptación y escenarios BDD

### 7.1 Catálogo de criterios por historia

| **ID**       | **Historia** | **Condición de aceptación**                                                         | **Tipo** | **Prioridad** | **Caso de prueba**   |
| ------------ | ------------ | ----------------------------------------------------------------------------------- | -------- | ------------- | -------------------- |
| CA-HU-001-01 | HU-001       | Un cliente con nombre y cédula válidos queda registrado.                            | Éxito    | Alta          | CP-001               |
| CA-HU-001-02 | HU-001       | Una cédula repetida se rechaza con un mensaje claro.                                | Error    | Alta          | CP-002               |
| CA-HU-001-03 | HU-001       | Cédula con letras o fuera de 6 a 15 dígitos no se acepta.                           | Límite   | Media         | CP-003               |
| CA-HU-002-01 | HU-002       | Un usuario con credenciales válidas entra y ve el menú de su rol.                   | Éxito    | Alta          | CP-016               |
| CA-HU-002-02 | HU-002       | Credenciales inválidas muestran un mensaje genérico.                                | Error    | Alta          | CP-017               |
| CA-HU-002-03 | HU-002       | El Empleado no puede usar rutas de Administrador (403).                             | Permiso  | Alta          | CP-021               |
| CA-HU-002-04 | HU-002       | No se puede eliminar al último administrador.                                       | Límite   | Alta          | CP-018               |
| CA-HU-003-01 | HU-003       | El Administrador crea un plan con nombre, duración y precio.                        | Éxito    | Alta          | CP-004               |
| CA-HU-003-02 | HU-003       | Un plan con membresías asociadas no se elimina.                                     | Error    | Alta          | CP-005               |
| CA-HU-003-03 | HU-003       | El Empleado solo consulta los planes.                                               | Permiso  | Media         | CP-006               |
| CA-HU-004-01 | HU-004       | Renovar con membresía vigente encadena la nueva al día siguiente del vencimiento.   | Éxito    | Alta          | CP-012               |
| CA-HU-004-02 | HU-004       | Renovar con membresía vencida empieza el mismo día.                                 | Éxito    | Alta          | CP-013               |
| CA-HU-005-01 | HU-005       | Se registra una huella por cliente y solo se guarda el hash.                        | Éxito    | Alta          | CP-010               |
| CA-HU-005-02 | HU-005       | Una huella ya asignada a otro cliente se rechaza.                                   | Error    | Alta          | CP-011               |
| CA-HU-006-01 | HU-006       | Membresía activa y vigente: acceso permitido.                                       | Éxito    | Alta          | CP-007               |
| CA-HU-006-02 | HU-006       | Membresía vencida o cancelada: acceso denegado con motivo.                          | Error    | Alta          | CP-008               |
| CA-HU-006-03 | HU-006       | Huella no reconocida: acceso denegado y registrado.                                 | Error    | Alta          | CP-009               |
| CA-HU-007-01 | HU-007       | La validación responde en menos de 2 segundos.                                      | Límite   | Media         | Medición RNF-003     |
| CA-HU-008-01 | HU-008       | El resumen muestra el total y los pagos de cada cliente.                            | Éxito    | Alta          | CP-014               |
| CA-HU-008-02 | HU-008       | El Empleado no ve ni consulta el registro financiero.                               | Permiso  | Alta          | CP-015               |
| CA-HU-010-01 | HU-010       | Sin token válido la API responde 401.                                               | Permiso  | Alta          | CP-020               |
| CA-HU-012-01 | HU-012       | Cada formulario muestra el error junto al campo y bloquea el botón mientras guarda. | Éxito    | Media         | Prueba de usabilidad |

### 7.2 Formato Given / When / Then

| **ID escenario** | **Nombre**         | **Dado**                                           | **Cuando**                                | **Entonces**                                                 | **Reglas / datos** |
| ---------------- | ------------------ | -------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ | ------------------ |
| ESC-HU-001-01    | Flujo exitoso      | un Empleado autenticado                            | registra un cliente con cédula 1023456789 | el cliente queda guardado                                    | RN-007             |
| ESC-HU-001-02    | Datos inválidos    | un Empleado autenticado                            | registra una cédula ya existente          | se muestra «Ya existe un cliente registrado con esa cédula»  | RN-007             |
| ESC-HU-002-01    | Permiso denegado   | un Empleado autenticado                            | abre el registro financiero               | la opción no aparece y la API responde 403                   | RN-011             |
| ESC-HU-003-01    | Plan con historial | un plan con membresías asociadas                   | el Administrador intenta eliminarlo       | el sistema lo impide y sugiere desactivarlo                  | RN-006             |
| ESC-HU-004-01    | Renovación vigente | un cliente con membresía activa que vence el 30/11 | se renueva con el plan mensual            | la nueva va del 01/12 al 30/12 y la anterior queda cancelada | RN-005             |
| ESC-HU-006-01    | Acceso permitido   | un cliente con membresía activa que vence hoy      | pone su huella                            | el acceso se permite                                         | RN-009             |
| ESC-HU-006-02    | Acceso denegado    | un cliente con membresía vencida ayer              | pone su huella                            | el acceso se niega con el motivo «Membresía vencida»         | RN-002             |
| ESC-HU-006-03    | Huella desconocida | una huella sin cliente asociado                    | se presenta en el lector                  | el acceso se niega y queda en el historial                   | RN-010             |
| ESC-HU-008-01    | Resumen de pagos   | un cliente con dos membresías                      | el Administrador abre su detalle          | aparecen los dos pagos con plan, monto y fecha               | RN-004             |

### 7.3 Cobertura mínima de criterios

  - Flujo exitoso principal.

  - Datos obligatorios, formatos y límites relevantes.

  - Reglas de negocio críticas.

  - Permisos permitidos y denegados.

  - Estados vacíos, carga, error y confirmación cuando exista interfaz.

  - Concurrencia, duplicidad o idempotencia cuando el riesgo lo justifique.

  - Integraciones indisponibles o respuestas inválidas cuando aplique.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Cuidado con el exceso</strong></p>
<p>BDD es útil para comportamiento y comunicación, pero no es necesario convertir cada detalle visual o técnico en un escenario Given/When/Then. Use el formato donde aporte claridad y automatización.</p></td>
</tr>
</tbody>
</table>
