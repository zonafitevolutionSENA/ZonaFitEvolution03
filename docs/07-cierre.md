# Informe de cierre y entrega

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/06_Cierre/Informe_de_Cierre_y_Entrega_ZonaFitEvolution.pdf`](entregables/06_Cierre/Informe_de_Cierre_y_Entrega_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Versión** | **Fecha**  | **Descripción**                                                         | **Elaboró**            | **Revisó** | **Aprobó** | **Estado** |
| ----------- | ---------- | ----------------------------------------------------------------------- | ---------------------- | ---------- | ---------- | ---------- |
| 0.1         | 03/11/2026 | Borrador con el estado al sprint 11; resultados por completar al cierre | Juan Diego Mejía Llano |            |            | Borrador   |

### Aprobaciones

| **Rol**                | **Nombre**                                   | **Responsabilidad**                  | **Fecha** | **Firma / aprobación** |
| ---------------------- | -------------------------------------------- | ------------------------------------ | --------- | ---------------------- |
| Líder del proyecto     | Juan Diego Mejía Llano                       | Consolidación y exactitud del cierre |           |                        |
| Responsable funcional  | Liliana Sofía Panesso Méndez (Product Owner) | Validación del alcance y aceptación  |           |                        |
| Responsable técnico    | Liliana Sofía Panesso Méndez                 | Estado técnico y operativo           |           |                        |
| Instructor / evaluador |                                              | Verificación académica y técnica     |           |                        |

## 1\. Propósito y alcance del informe

Este informe formaliza el cierre del proyecto, registra la versión entregada y documenta de manera transparente los resultados alcanzados, los pendientes, las restricciones y las condiciones de continuidad.

  - Comparar objetivos y alcance planificado frente a resultados reales.

  - Consolidar entregables, evidencias y ubicaciones oficiales.

  - Registrar resultados de calidad, seguridad, despliegue y aceptación.

  - Identificar riesgos residuales, defectos conocidos y deuda técnica.

  - Documentar transferencia, soporte y trabajo futuro.

  - Formalizar recepción, cierre y responsabilidad sobre la versión entregada.

<table>
<tbody>
<tr class="odd">
<td><strong>Principio de transparencia<br />
</strong>El cierre no debe ocultar pendientes ni presentar como terminado aquello que no fue probado o entregado. Un informe profesional distingue claramente entre implementado, parcialmente implementado, no implementado y fuera de alcance.</td>
</tr>
</tbody>
</table>

## 2\. Identificación del proyecto y de la entrega

| **Campo**                | **Valor**                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Código del proyecto      | ZFE-3223873                                                                                                                                                                                                                                                                                                                        |
| Nombre del producto      | Zona Fit Evolution                                                                                                                                                                                                                                                                                                                 |
| Problema abordado        | El gimnasio Zona Fit no tiene un mecanismo automatizado que valide en tiempo real si un cliente tiene su plan vigente al ingresar. La validación es manual en la recepción, lo que genera congestión en horas pico, ingresos con membresía vencida y pérdidas económicas, además de poco control sobre el personal y los ingresos. |
| Objetivo general         | Automatizar el control de ingresos y la gestión de membresías activas del gimnasio Zona Fit para lograr un mayor control financiero y del personal, mejorando el control de acceso y reduciendo los riesgos asociados a ingresos no autorizados.                                                                                   |
| Fecha de inicio          | 25/04/2026                                                                                                                                                                                                                                                                                                                         |
| Fecha de cierre          | 12/12/2026                                                                                                                                                                                                                                                                                                                         |
| Repositorio              | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03                                                                                                                                                                                                                                                                         |
| Etiqueta / commit final  |                                                                                                                                                                                                                                                                                                                                    |
| URL desplegada           |                                                                                                                                                                                                                                                                                                                                    |
| Ambiente de demostración |                                                                                                                                                                                                                                                                                                                                    |
| Licencia                 |                                                                                                                                                                                                                                                                                                                                    |
| Responsable de custodia  |                                                                                                                                                                                                                                                                                                                                    |

### 2.1 Resumen ejecutivo

|                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------- |
| *\[Presente en máximo una página el problema, la solución, los usuarios, el alcance entregado, los resultados y la conclusión del proyecto\]* |

## 3\. Cumplimiento de objetivos

| **ID** | **Objetivo**                                                                                                                                    | **Indicador / meta** | **Resultado alcanzado** | **Evidencia** | **Estado** |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------- | ------------- | ---------- |
| OBJ-01 | Crear un módulo de membresías que valide el estado de los clientes en tiempo real.                                                              |                      |                         |               |            |
| OBJ-02 | Registrar el pago de cada membresía asignada o renovada y ofrecer un resumen financiero por cliente al Administrador.                           |                      |                         |               |            |
| OBJ-03 | Implementar una aplicación web desplegada en la nube con acceso administrativo seguro.                                                          |                      |                         |               |            |
| OBJ-04 | Implementar un control de acceso por huella (sensor AS608 con conversor USB CP2102) que valide el ingreso solo a clientes con membresía activa. |                      |                         |               |            |
| OBJ-05 | Desarrollar un submódulo de control financiero interno.                                                                                         |                      |                         |               |            |

### 3.1 Análisis de desviaciones

| **Objetivo** | **Desviación** | **Causa** | **Impacto** | **Tratamiento** |
| ------------ | -------------- | --------- | ----------- | --------------- |
|              |                |           |             |                 |
|              |                |           |             |                 |
|              |                |           |             |                 |

## 4\. Alcance comprometido frente al alcance entregado

| **ID** | **Módulo / capacidad**               | **Comprometido** | **Entregado**             | **Estado** | **Justificación / evidencia**                                      |
| ------ | ------------------------------------ | ---------------- | ------------------------- | ---------- | ------------------------------------------------------------------ |
| ALC-01 | Autenticación y roles                | Sí               | Implementado en local     |            | Regla del último administrador por integrar en el backend (TT-001) |
| ALC-02 | Gestión del personal                 | Sí               | Implementado en local     |            |                                                                    |
| ALC-03 | Gestión de clientes                  | Sí               | Implementado en local     |            | Ruta DELETE /api/clientes/:id por retirar (TT-002)                 |
| ALC-04 | Catálogo de planes                   | Sí               | Implementado en local     |            |                                                                    |
| ALC-05 | Membresías                           | Sí               | Implementado en local     |            | Vencimiento marcado desde el frontend (TT-006)                     |
| ALC-06 | Control de acceso biométrico (AS608) | Sí               | Con simulador             |            | Integración del sensor AS608 en curso (TT-010)                     |
| ALC-07 | Historial de accesos                 | Sí               | Implementado en local     |            |                                                                    |
| ALC-08 | Registro financiero                  | Sí               | Parcial (pagos estimados) |            | Tabla de pagos pendiente (TT-005)                                  |
| ALC-09 | Comprobante digital de pago          | Could            |                           |            |                                                                    |
| ALC-10 | Inicio (dashboard)                   | Sí               | Implementado en local     |            |                                                                    |

### 4.1 Elementos fuera de alcance

| **Elemento**                                          | **Razón de exclusión**                              | **Aprobación** | **Impacto**                                    |
| ----------------------------------------------------- | --------------------------------------------------- | -------------- | ---------------------------------------------- |
| Apertura automática de la puerta (relé y electroimán) | Se usa el sensor AS608 solo para validar el ingreso | CR-005         | Apertura manual según el resultado en pantalla |

### 4.2 Cambios de alcance aprobados

| **ID cambio** | **Descripción**                                                                                                                                     | **Fecha**             | **Solicitante** | **Impacto**                            | **Decisión**                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------- | -------------------------------------- | -------------------------------- |
| CHG-01        | Se reemplazan las tarjetas RFID por identificación con huella; la renovación se hace por cédula.                                                    | Sprint 6 (ago. 2026)  | STK-01          | RF-004, RF-005, HU-004, HU-005         | Aprobado                         |
| CHG-02        | Se retira el torniquete: la apertura se hace con relé y electroimán.                                                                                | Sprint 7 (sep. 2026)  | STK-01          | RF-004, INT-02                         | Aprobado                         |
| CHG-03        | El frontend pasa a React (Vite) en un monorepo con el backend.                                                                                      | Sprint 9 (oct. 2026)  | Equipo          | Arquitectura, UI-01 a UI-09            | Aprobado                         |
| CHG-04        | El registro financiero se calcula con las membresías mientras se crea la tabla de pagos.                                                            | Sprint 10 (oct. 2026) | Equipo          | RF-006, HU-008                         | Aprobado (temporal)              |
| CHG-05        | Se usa el sensor AS608 con conversor CP2102 solo para validar el ingreso; la apertura con relé y electroimán (CR-002) pasa a una versión posterior. |                       | Equipo          | OBJ-04, RF-003, RF-004, INT-01, INT-02 | Aprobado                         |
| CHG-06        | El backend se publicará en un hosting distinto de Render; el proveedor está por definir.                                                            |                       | Equipo          | TT-009, INT-02, RSD-07                 | Aprobado (proveedor por definir) |

## 5\. Estado de requisitos y trazabilidad

| **Tipo**          | **Total** | **Aprobados** | **Parciales** | **No implementados** | **No aplican** | **Cobertura %** |
| ----------------- | --------- | ------------- | ------------- | -------------------- | -------------- | --------------- |
| RF                | 8         |               |               |                      |                |                 |
| RNF               | 7         |               |               |                      |                |                 |
| Reglas de negocio | 12        |               |               |                      |                |                 |
| Total             | 27        |               |               |                      |                |                 |

### 5.1 Requisitos pendientes o parcialmente cumplidos

| **ID** | **Descripción** | **Estado** | **Motivo** | **Riesgo** | **Plan futuro** |
| ------ | --------------- | ---------- | ---------- | ---------- | --------------- |
|        |                 |            |            |            |                 |
|        |                 |            |            |            |                 |
|        |                 |            |            |            |                 |

### 5.2 Referencia a matriz de trazabilidad

| **Artefacto**                  | **Ubicación**                               | **Versión** | **Resultado de cobertura** |
| ------------------------------ | ------------------------------------------- | ----------- | -------------------------- |
| Matriz Maestra de Trazabilidad | TRZ-01 (documentos\_proyecto)               |             |                            |
| Backlog final                  | REQ-02 y Tablero de Jira del proyecto SCRUM |             |                            |
| Plan de pruebas                | CAL-01                                      |             |                            |

## 6\. Entregables finales

| **ID**  | **Entregable**                                        | **Ubicación**        | **Versión** | **Responsable**              | **Estado** | **Observaciones** |
| ------- | ----------------------------------------------------- | -------------------- | ----------- | ---------------------------- | ---------- | ----------------- |
| ENTG-01 | INI-01 – Formulación y Constitución del Proyecto      | documentos\_proyecto |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-02 | GES-01 – Gestión de Interesados y del Proyecto        | documentos\_proyecto |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-03 | REQ-01 – Alcance y Especificación de Requisitos       | documentos\_proyecto |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-04 | REQ-02 – Backlog, Historias de Usuario y Casos de Uso | documentos\_proyecto |             | Liliana Sofía Panesso Méndez |            |                   |
| ENTG-05 | TRZ-01 – Matriz Maestra de Trazabilidad               | documentos\_proyecto |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-06 | DSN-01 – Diseño UX/UI y Sistema de Diseño             | documentos\_proyecto |             | Maileth Begambre Movilla     |            |                   |
| ENTG-07 | ARQ-01 – Arquitectura, Datos y Diseño Técnico         | documentos\_proyecto |             | Liliana Sofía Panesso Méndez |            |                   |
| ENTG-08 | CAL-01 – Plan de Calidad, Pruebas y Aceptación        |                      |             |                              |            |                   |
| ENTG-09 | MAN-01 – Manual Técnico y de Operación                |                      |             | Liliana Sofía Panesso Méndez |            |                   |
| ENTG-10 | MAN-02 – Manual de Usuario                            |                      |             | Maileth Begambre Movilla     |            |                   |
| ENTG-11 | CIE-01 – Informe de Cierre y Entrega                  |                      |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-12 | SUS-01 – Guía de Sustentación y Demostración          |                      |             | Juan Diego Mejía Llano       |            |                   |
| ENTG-13 | REP-01 – Repositorio con etiqueta v1.0.0              |                      |             | Juan Diego Mejía Llano       |            |                   |

### 6.1 Integridad del paquete de entrega

  - La etiqueta final identifica un commit específico.

  - El repositorio contiene historial real y no una carga única.

  - La configuración de ejemplo no contiene secretos.

  - Las migraciones permiten reconstruir la base de datos.

  - La documentación coincide con la versión final.

  - Los enlaces y evidencias son accesibles para evaluación.

## 7\. Resultados técnicos del producto

| **Componente**               | **Tecnología / versión**        | **Estado**                  | **Resultado relevante**          | **Evidencia** |
| ---------------------------- | ------------------------------- | --------------------------- | -------------------------------- | ------------- |
| Frontend                     | React 19 + Vite                 | Implementado                | 9 pantallas (UI-01 a UI-09)      |               |
| Backend / API                | Node.js + Express 5             | Implementado                | 19 grupos de endpoints bajo /api |               |
| Base de datos                | MySQL (mysql2)                  | Implementado                | 7 tablas (init.sql)              |               |
| Autenticación / autorización | JWT 8 h + bcrypt; permitirRoles | Implementado con pendientes | TT-001, TT-003 en progreso       |               |
| Integraciones                | Sensor AS608 + CP2102           | En desarrollo               | Opera el simulador               |               |
| Infraestructura / despliegue | Hosting por definir             | Pendiente                   |                                  |               |
| Observabilidad               | Consola + registros\_acceso     | Parcial                     | Sin /health ni monitoreo         |               |

### 7.1 Coherencia arquitectónica

|                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ |
| *\[Explique si la arquitectura implementada coincide con los diagramas y decisiones aprobadas; documente desviaciones\]* |

### 7.2 Estado de datos y migraciones

| **Control**                | **Resultado** | **Evidencia** | **Observaciones** |
| -------------------------- | ------------- | ------------- | ----------------- |
| Instalación limpia         |               |               |                   |
| Migraciones versionadas    |               |               |                   |
| Datos semilla seguros      |               |               |                   |
| Integridad y restricciones |               |               |                   |
| Respaldo y restauración    |               |               |                   |

## 8\. Resultados de pruebas y calidad

| **Tipo de prueba** | **Planificadas** | **Ejecutadas** | **Aprobadas** | **Fallidas** | **Bloqueadas** | **Cobertura** |
| ------------------ | ---------------- | -------------- | ------------- | ------------ | -------------- | ------------- |
| Unitarias          |                  |                |               |              |                |               |
| Integración        |                  |                |               |              |                |               |
| End-to-End         |                  |                |               |              |                |               |
| API                |                  |                |               |              |                |               |
| Seguridad          |                  |                |               |              |                |               |
| Accesibilidad      |                  |                |               |              |                |               |
| Rendimiento        |                  |                |               |              |                |               |
| Aceptación         |                  |                |               |              |                |               |

### 8.1 Defectos al cierre

| **ID** | **Descripción** | **Severidad** | **Estado** | **Impacto** | **Decisión / plan** |
| ------ | --------------- | ------------- | ---------- | ----------- | ------------------- |
| DEF-01 |                 |               |            |             |                     |
| DEF-02 |                 |               |            |             |                     |
| DEF-03 |                 |               |            |             |                     |

### 8.2 Indicadores de calidad

| **Indicador**                      | **Meta** | **Resultado** | **Cumple** | **Fuente** |
| ---------------------------------- | -------- | ------------- | ---------- | ---------- |
| Cobertura de pruebas               |          |               |            |            |
| Defectos críticos abiertos         | 0        |               |            |            |
| Build / pipeline exitoso           | Sí       |               |            |            |
| Tiempo de respuesta crítico        |          |               |            |            |
| Accesibilidad básica               |          |               |            |            |
| Vulnerabilidades críticas abiertas | 0        |               |            |            |

## 9\. Seguridad, privacidad y cumplimiento

| **Control**                    | **Resultado**                                                          | **Evidencia** | **Riesgo pendiente** |
| ------------------------------ | ---------------------------------------------------------------------- | ------------- | -------------------- |
| Secretos fuera del repositorio | .env excluido; .env.example versionado                                 |               |                      |
| Contraseñas protegidas         | bcrypt                                                                 |               |                      |
| Autorización en servidor       | permitirRoles en cada ruta; regla del último admin solo en el frontend |               | DT-05                |
| HTTPS en ambiente público      |                                                                        |               | Hosting por definir  |
| Dependencias auditadas         |                                                                        |               |                      |
| Datos personales controlados   | Solo hash de la huella; la API no devuelve el hash                     |               |                      |
| Licencias y atribuciones       |                                                                        |               | No existe LICENSE    |
| Declaración de uso de IA       |                                                                        |               |                      |

<table>
<tbody>
<tr class="odd">
<td><strong>Causal crítica<br />
</strong>No debe cerrarse como aprobado un proyecto con credenciales expuestas, contraseñas en texto plano, permisos evadibles desde el cliente o vulnerabilidades críticas sin tratamiento.</td>
</tr>
</tbody>
</table>

## 10\. Despliegue y estado operativo

| **Ambiente**              | **URL / host**                  | **Versión** | **Estado** | **Fecha** | **Responsable**                                                                 |
| ------------------------- | ------------------------------- | ----------- | ---------- | --------- | ------------------------------------------------------------------------------- |
| Desarrollo                | localhost:5173 / localhost:3000 | main        | Activo     |           | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla |
| Pruebas                   |                                 |             |            |           |                                                                                 |
| Aceptación                |                                 |             |            |           |                                                                                 |
| Producción / demostración |                                 |             |            |           |                                                                                 |

### 10.1 Verificación posterior al despliegue

| **Control**      | **Resultado esperado**                                | **Resultado real** | **Estado** | **Evidencia** |
| ---------------- | ----------------------------------------------------- | ------------------ | ---------- | ------------- |
| Health check     | No existe /health (pendiente)                         |                    |            |               |
| Acceso principal | Pantalla de inicio de sesión                          |                    |            |               |
| Autenticación    | Token JWT y menú por rol                              |                    |            |               |
| Flujo crítico    | Registrar cliente, asignar membresía y validar acceso |                    |            |               |
| Persistencia     | Datos guardados en MySQL                              |                    |            |               |
| Logs             | Errores en la consola del backend                     |                    |            |               |

### 10.2 Condiciones de operación

|                                                                                                                |
| -------------------------------------------------------------------------------------------------------------- |
| *\[Documente horarios, limitaciones, dependencias externas, capacidad y condiciones especiales de operación\]* |

## 11\. Aceptación del producto

| **Criterio de aceptación**           | **Responsable** | **Resultado** | **Evidencia** | **Observaciones** |
| ------------------------------------ | --------------- | ------------- | ------------- | ----------------- |
| Flujos críticos funcionales          |                 |               |               |                   |
| Alcance acordado entregado           |                 |               |               |                   |
| Pruebas de aceptación                |                 |               |               |                   |
| Documentación actualizada            |                 |               |               |                   |
| Aplicación desplegada o reproducible |                 |               |               |                   |
| Transferencia realizada              |                 |               |               |                   |

### 11.1 Decisión de aceptación

| **Decisión**               | **Marcar** | **Condición**                                         |
| -------------------------- | ---------- | ----------------------------------------------------- |
| Aceptado sin observaciones | ☐          | La entrega cumple los criterios definidos.            |
| Aceptado con observaciones | ☐          | Existen pendientes no bloqueantes con plan acordado.  |
| Requiere correcciones      | ☐          | No se cumplen criterios necesarios para aceptar.      |
| No aceptado                | ☐          | Existe una falla crítica o incumplimiento sustancial. |

### 11.2 Observaciones de aceptación

|                                                                |
| -------------------------------------------------------------- |
| *\[Registre condiciones, compromisos, fechas y responsables\]* |

## 12\. Riesgos residuales y limitaciones conocidas

| **ID** | **Riesgo / limitación**                           | **Probabilidad** | **Impacto** | **Tratamiento**                                                       | **Responsable**              | **Fecha revisión** |
| ------ | ------------------------------------------------- | ---------------- | ----------- | --------------------------------------------------------------------- | ---------------------------- | ------------------ |
| RSK-05 | Indisponibilidad del sistema                      | 3                | 4           | Hosting con monitoreo, validación manual por cédula como contingencia | Liliana Sofía Panesso Méndez |                    |
| RSK-06 | Integración del sensor AS608 fuera de tiempo      | 3                | 4           | Adapter ya definido; pruebas tempranas en el sprint 11                | Liliana Sofía Panesso Méndez |                    |
| RSK-07 | Cronograma insuficiente para pruebas y despliegue | 3                | 4           | Priorizar Must, congelar alcance desde el sprint 12                   | Juan Diego Mejía Llano       |                    |

### 12.1 Restricciones operativas

|                                                                                                       |
| ----------------------------------------------------------------------------------------------------- |
| *\[Indique navegadores, dispositivos, volúmenes, horarios, dependencias o escenarios no soportados\]* |

## 13\. Deuda técnica

| **ID** | **Descripción**                                                                        | **Origen**          | **Impacto**                                                    | **Prioridad** | **Esfuerzo** | **Versión objetivo** |
| ------ | -------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------- | ------------- | ------------ | -------------------- |
| DT-01  | No existe tabla de pagos: el registro financiero estima con el precio actual del plan. | Revisión del código | Histórico financiero inexacto; no se guarda el método de pago. |               |              |                      |
| DT-02  | El sensor AS608 aún no está integrado; opera el adaptador simulador.                   | Revisión del código | El control de acceso real no está operativo.                   |               |              |                      |
| DT-03  | Vencimiento marcado desde el frontend, no con tarea programada.                        | Revisión del código | Estado guardado desactualizado.                                |               |              |                      |
| DT-04  | La ruta DELETE /api/clientes/:id sigue en main (contradice RN-001).                    | Revisión del código | Contradicción regla–API.                                       |               |              |                      |
| DT-05  | La regla del último administrador solo se valida en el frontend.                       | Revisión del código | Se puede saltar llamando la API.                               |               |              |                      |
| DT-06  | Sin límite de intentos de inicio de sesión; CORS abierto.                              | Revisión del código | Fuerza bruta y exposición en producción.                       |               |              |                      |
| DT-07  | Token JWT en localStorage sin revocación.                                              | Revisión del código | Exposición ante XSS.                                           |               |              |                      |
| DT-08  | Sin pruebas automatizadas ni pipeline de integración continua.                         | Revisión del código | Regresiones dependen de pruebas manuales.                      |               |              |                      |
| DT-09  | Navegación por estado, sin React Router.                                               | Revisión del código | Pantallas sin URL propia.                                      |               |              |                      |
| DT-10  | Esquema creado con init.sql, sin migraciones.                                          | Revisión del código | Actualizar una base con datos exige scripts manuales.          |               |              |                      |
| DT-11  | Sistema no desplegado; hosting de la API por definir.                                  | Revisión del código | Solo funciona en local.                                        |               |              |                      |
| DT-12  | Archivos vacíos cd y npm en la raíz del backend.                                       | Revisión del código | Ruido en el repositorio.                                       |               |              |                      |

### 13.1 Criterio de aceptación de deuda

La deuda técnica puede permanecer al cierre únicamente cuando está identificada, evaluada y no representa una falla crítica de seguridad, integridad, funcionamiento o mantenibilidad mínima.

## 14\. Trabajo futuro y hoja de ruta

| **ID** | **Mejora / capacidad**                                | **Valor esperado**                       | **Dependencias**       | **Prioridad** | **Horizonte** |
| ------ | ----------------------------------------------------- | ---------------------------------------- | ---------------------- | ------------- | ------------- |
| FUT-01 | Apertura automática de la puerta (relé y electroimán) | Ingreso sin intervención de la recepción | Sensor AS608 integrado | Media         | V1.1          |
| FUT-02 | Comprobante digital de pago (HU-009)                  | Soporte para el socio                    | Tabla de pagos         | Baja          | V1.1          |
| FUT-03 | React Router y rutas protegidas                       | URL propia por pantalla                  | —                      | Media         | V1.1          |
| FUT-04 | Reportes financieros con exportación                  | Análisis del propietario                 | Tabla de pagos         | Baja          | V2.0          |

## 15\. Transferencia y continuidad

| **Tema**                 | **Responsable que entrega**  | **Responsable que recibe** | **Fecha** | **Evidencia** | **Resultado** |
| ------------------------ | ---------------------------- | -------------------------- | --------- | ------------- | ------------- |
| Repositorio y versiones  | Juan Diego Mejía Llano       |                            |           |               |               |
| Arquitectura y datos     | Liliana Sofía Panesso Méndez |                            |           |               |               |
| Instalación y despliegue | Liliana Sofía Panesso Méndez |                            |           |               |               |
| Operación y monitoreo    | Liliana Sofía Panesso Méndez |                            |           |               |               |
| Respaldo y recuperación  | Liliana Sofía Panesso Méndez |                            |           |               |               |
| Soporte y mantenimiento  | Liliana Sofía Panesso Méndez |                            |           |               |               |

### 15.1 Custodia de activos

| **Activo**      | **Ubicación**                                              | **Propietario / custodio**        | **Acceso transferido** | **Observaciones** |
| --------------- | ---------------------------------------------------------- | --------------------------------- | ---------------------- | ----------------- |
| Repositorio     | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03 | Organización zonafitevolutionSENA |                        |                   |
| Dominio / DNS   |                                                            |                                   |                        |                   |
| Infraestructura | Hosting por definir                                        |                                   |                        |                   |
| Base de datos   | MySQL en la nube (por definir)                             |                                   |                        |                   |
| Figma / diseño  |                                                            | Maileth Begambre Movilla          |                        |                   |
| Documentación   | documentos\_proyecto                                       | Juan Diego Mejía Llano            |                        |                   |

## 16\. Lecciones aprendidas

| **Categoría**              | **Qué funcionó** | **Qué no funcionó** | **Acción recomendada** |
| -------------------------- | ---------------- | ------------------- | ---------------------- |
| Análisis y requisitos      |                  |                     |                        |
| Gestión y colaboración     |                  |                     |                        |
| Arquitectura y desarrollo  |                  |                     |                        |
| Pruebas y seguridad        |                  |                     |                        |
| Despliegue y documentación |                  |                     |                        |
| Uso de IA y herramientas   |                  |                     |                        |

## 17\. Autoría, contribución y uso de IA

### 17.1 Contribución individual

| **Integrante**               | **Rol**                        | **Contribuciones verificables**             | **Evidencias**        | **Capacidad de sustentación** |
| ---------------------------- | ------------------------------ | ------------------------------------------- | --------------------- | ----------------------------- |
| Juan Diego Mejía Llano       | Líder, Scrum Master y frontend | Requisitos, documentación, frontend React   | 57 + 35 commits; Jira |                               |
| Liliana Sofía Panesso Méndez | Product Owner y backend        | API REST, base de datos, patrones de diseño | 74 commits; Jira      |                               |
| Maileth Begambre Movilla     | UX/UI y apoyo frontend         | Wireframes, mockups y prototipos            | 7 commits; Figma      |                               |

### 17.2 Declaración de uso de IA

| **Herramienta** | **Finalidad** | **Partes asistidas** | **Validación realizada** | **Responsable** |
| --------------- | ------------- | -------------------- | ------------------------ | --------------- |
|                 |               |                      |                          |                 |
|                 |               |                      |                          |                 |
|                 |               |                      |                          |                 |

<table>
<tbody>
<tr class="odd">
<td><strong>Responsabilidad académica y técnica<br />
</strong>El uso de IA no transfiere responsabilidad. El equipo debe comprender, explicar, probar y mantener todo el contenido entregado.</td>
</tr>
</tbody>
</table>

## 18\. Cierre administrativo y documental

| **Actividad de cierre**      | **Responsable**              | **Fecha**  | **Evidencia** | **Estado** |
| ---------------------------- | ---------------------------- | ---------- | ------------- | ---------- |
| Archivar documentación final | Juan Diego Mejía Llano       | 12/12/2026 |               |            |
| Etiquetar versión final      | Juan Diego Mejía Llano       | 12/12/2026 |               |            |
| Cerrar issues / backlog      | Juan Diego Mejía Llano       | 12/12/2026 |               |            |
| Entregar accesos y activos   | Liliana Sofía Panesso Méndez | 12/12/2026 |               |            |
| Registrar riesgos pendientes | Juan Diego Mejía Llano       | 12/12/2026 |               |            |
| Realizar reunión de cierre   | Juan Diego Mejía Llano       | 12/12/2026 |               |            |
| Obtener aceptación formal    | Juan Diego Mejía Llano       | 12/12/2026 |               |            |

## 19\. Lista de verificación de cierre

| **N.°** | **Verificación**                                               | **Cumple**     | **Evidencia** | **Observaciones** |
| ------- | -------------------------------------------------------------- | -------------- | ------------- | ----------------- |
| 1       | El producto ejecuta los flujos críticos.                       | Sí / No / N.A. |               |                   |
| 2       | La versión final está identificada mediante etiqueta o commit. | Sí / No / N.A. |               |                   |
| 3       | El alcance entregado está comparado con el comprometido.       | Sí / No / N.A. |               |                   |
| 4       | Los requisitos pendientes están declarados.                    | Sí / No / N.A. |               |                   |
| 5       | La matriz de trazabilidad está actualizada.                    | Sí / No / N.A. |               |                   |
| 6       | Los entregables están disponibles y versionados.               | Sí / No / N.A. |               |                   |
| 7       | Las migraciones y semillas son reproducibles.                  | Sí / No / N.A. |               |                   |
| 8       | Las pruebas y evidencias están consolidadas.                   | Sí / No / N.A. |               |                   |
| 9       | No existen defectos críticos abiertos sin decisión formal.     | Sí / No / N.A. |               |                   |
| 10      | No existen secretos o credenciales expuestas.                  | Sí / No / N.A. |               |                   |
| 11      | La documentación corresponde con la versión final.             | Sí / No / N.A. |               |                   |
| 12      | La aplicación está desplegada o puede instalarse.              | Sí / No / N.A. |               |                   |
| 13      | La aceptación funcional fue registrada.                        | Sí / No / N.A. |               |                   |
| 14      | Los riesgos residuales tienen responsable.                     | Sí / No / N.A. |               |                   |
| 15      | La deuda técnica está documentada.                             | Sí / No / N.A. |               |                   |
| 16      | La transferencia técnica fue realizada.                        | Sí / No / N.A. |               |                   |
| 17      | Los activos y accesos fueron entregados.                       | Sí / No / N.A. |               |                   |
| 18      | Las contribuciones individuales son trazables.                 | Sí / No / N.A. |               |                   |
| 19      | El uso de IA fue declarado.                                    | Sí / No / N.A. |               |                   |
| 20      | El informe cuenta con aprobación y firmas.                     | Sí / No / N.A. |               |                   |

## 20\. Acta de cierre y firmas

Con la firma o aceptación registrada a continuación, las partes dejan constancia del estado del proyecto, la versión entregada, las observaciones pendientes y las responsabilidades posteriores al cierre.

| **Nombre**                   | **Rol / entidad**    | **Decisión** | **Observaciones** | **Firma / aceptación** | **Fecha** |
| ---------------------------- | -------------------- | ------------ | ----------------- | ---------------------- | --------- |
| Carlos Ramírez               | Propietario (STK-01) |              |                   |                        |           |
| Liliana Sofía Panesso Méndez | Product Owner        |              |                   |                        |           |
| Juan Diego Mejía Llano       | Líder del proyecto   |              |                   |                        |           |
|                              | Instructor           |              |                   |                        |           |

## Anexo A. Resumen de enlaces y ubicaciones

| **Elemento**           | **Enlace / ruta**                                          | **Acceso requerido** | **Responsable** |
| ---------------------- | ---------------------------------------------------------- | -------------------- | --------------- |
| Repositorio            | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03 |                      |                 |
| Aplicación             |                                                            |                      |                 |
| Documentación          | documentos\_proyecto                                       |                      |                 |
| Figma / prototipo      |                                                            |                      |                 |
| Pipeline               |                                                            |                      |                 |
| Reportes de pruebas    |                                                            |                      |                 |
| Backups / restauración |                                                            |                      |                 |

## Anexo B. Plantilla rápida de pendiente

| **Campo**          | **Contenido** |
| ------------------ | ------------- |
| ID                 |               |
| Descripción        |               |
| Origen             |               |
| Impacto            |               |
| Prioridad          |               |
| Responsable        |               |
| Fecha objetivo     |               |
| Criterio de cierre |               |
| Evidencia          |               |

## Anexo C. Errores frecuentes al cerrar un proyecto

| **Error**                        | **Consecuencia**                         | **Corrección**                     |
| -------------------------------- | ---------------------------------------- | ---------------------------------- |
| Declarar todo como terminado     | Oculta riesgos y reduce confianza        | Registrar estado real y pendientes |
| Entregar sin etiqueta de versión | No se identifica el producto evaluado    | Crear release o tag final          |
| Cerrar sin aceptación            | No existe validación del cliente         | Registrar decisión y observaciones |
| Ignorar deuda técnica            | Dificulta mantenimiento futuro           | Documentarla y priorizarla         |
| Documentación desactualizada     | No representa el producto                | Actualizar antes del cierre        |
| No transferir accesos            | El producto queda dependiente del equipo | Entregar custodia y permisos       |
| Ocultar uso de IA                | Compromete autoría y transparencia       | Declarar herramientas y validación |
