# Informe de cierre y entrega

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/06_Cierre/Informe_de_Cierre_y_Entrega_ZonaFitEvolution.pdf`](entregables/06_Cierre/Informe_de_Cierre_y_Entrega_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Versión** | **Fecha**  | **Descripción**                                                         | **Elaboró**            | **Revisó** | **Aprobó** | **Estado** |
| ----------- | ---------- | ----------------------------------------------------------------------- | ---------------------- | ---------- | ---------- | ---------- |
| 0.1         | 03/11/2026 | Borrador con el estado al sprint 11; resultados por completar al cierre | Juan Diego Mejía Llano |            |            | Borrador   |
| 0.2         | 10/11/2026 | Estado al 10/11/2026: sensor AS608 integrado y simulador eliminado      | Juan Diego Mejía Llano |            |            | Borrador   |
| 0.3 | 22/11/2026 | Estado al 22/11/2026: sistema desplegado en Vercel y Railway, healthcheck y custodia de la infraestructura | Juan Diego Mejía Llano |  |  | Borrador |
| 0.4 | 22/11/2026 | Estado al 22/11/2026: reglas de seguridad en el backend, ciclo CIC-01 aprobado, resumen ejecutivo, coherencia arquitectónica y condiciones de operación | Juan Diego Mejía Llano |  |  | Borrador |
| 0.5 | 22/11/2026 | Identificación de la entrega (URL, ambiente, licencia, versión), licencia ISC y matriz de trazabilidad con 89 % de cobertura completa | Juan Diego Mejía Llano |  |  | Borrador |
| 0.6 | 22/11/2026 | Integración continua, logs estructurados, 39 pruebas unitarias y lista de chequeo final diligenciada | Juan Diego Mejía Llano |  |  | Borrador |
| 0.7 | 23/11/2026 | Aceptación del producto, lecciones aprendidas, contribución individual, CIC-02 con el sensor, mínimo privilegio, accesibilidad y restauración probada | Juan Diego Mejía Llano |  |  | Borrador |
| 0.8 | 23/11/2026 | Declaración de uso de IA (17.2) y lección aprendida sobre el uso de IA | Juan Diego Mejía Llano |  |  | Borrador |
| 0.9 | 23/11/2026 | Transferencia y continuidad (15) y custodia de activos (15.1) | Juan Diego Mejía Llano |  |  | Borrador |
| 1.0 | 23/11/2026 | Versión final: etiqueta v1.0.0, entregables finales, cierre administrativo y verificación de cierre; solo queda la firma del acta | Juan Diego Mejía Llano |  |  | Borrador |
| 1.1 | 23/11/2026 | Contrato OpenAPI y Swagger UI publicados; 50 pruebas unitarias | Juan Diego Mejía Llano |  |  | Borrador |
| 1.2 | 24/11/2026 | Funcionalidades posteriores a la v1.0.0: recuperación de contraseña, envío de correos con Brevo, aviso de vencimiento y consentimientos (CR-010, CR-011); 9 tablas, DT-07 resuelta en parte, 93 pruebas | Juan Diego Mejía Llano |  |  | Borrador |
| 1.3 | 24/11/2026 | Etiqueta y Release v1.1.0 con las funciones posteriores a la entrega | Juan Diego Mejía Llano |  |  | Borrador |

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
| Etiqueta / commit final  | Etiqueta v1.1.0 en main (24/11/2026); v1.0.0 (23/11/2026) conserva la versión de la entrega |
| URL desplegada           | https://zona-fit-evolution03.vercel.app (API: https://zonafitevolution03-production.up.railway.app/api) |
| Ambiente de demostración | Producción en Vercel y Railway, con el portátil de recepción, el agente del lector y el sensor AS608 |
| Licencia                 | ISC (archivo LICENSE en la raíz del repositorio) |
| Responsable de custodia  |                                                                                                                                                                                                                                                                                                                                    |

### 2.1 Resumen ejecutivo

|                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------- |
| *El gimnasio Zona Fit Evolution controlaba el ingreso de sus socios de forma manual, sin historial y con riesgo de ingresos con membresías vencidas. El equipo construyó una aplicación web (React en Vercel, API Node.js con MySQL en Railway) que usan el Administrador y los Empleados para gestionar clientes, planes, membresías y personal, y una pantalla de ingreso donde el socio valida su acceso con la huella en un sensor AS608 conectado al portátil de recepción. Se entregó el alcance del MVP, salvo la tabla de pagos reales (el registro financiero estima con el precio del plan). El ciclo de pruebas CIC-01 aprobó 24 de 24 casos y la validación responde en milisegundos en el servidor. Queda pendiente repetir las pruebas de acceso con el sensor en producción, la aceptación del Product Owner y la etiqueta v1.0.0.* |

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

| **ID** | **Módulo / capacidad**               | **Comprometido** | **Entregado**             | **Estado** | **Justificación / evidencia**                                                          |
| ------ | ------------------------------------ | ---------------- | ------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| ALC-01 | Autenticación y roles                | Sí               | Implementado y desplegado     | Cumplido | Regla del último administrador validada en el backend (TT-001); CP-016 a CP-021 aprobados                     |
| ALC-02 | Gestión del personal                 | Sí               | Implementado y desplegado     | Cumplido |                                                                                        |
| ALC-03 | Gestión de clientes                  | Sí               | Implementado y desplegado     | Cumplido | Los clientes no se eliminan: ruta retirada (TT-002)                                     |
| ALC-04 | Catálogo de planes                   | Sí               | Implementado y desplegado     | Cumplido |                                                                                        |
| ALC-05 | Membresías                           | Sí               | Implementado y desplegado     | Cumplido | Tarea diaria de vencimiento y activación en el backend (TT-006)                                         |
| ALC-06 | Control de acceso biométrico (AS608) | Sí               | Sí (sensor AS608)         | Cumplido   | Registro, validación, huellas duplicadas y borrado probados con el lector (10/11/2026) |
| ALC-07 | Historial de accesos                 | Sí               | Implementado y desplegado     | Cumplido |                                                                                        |
| ALC-08 | Registro financiero                  | Sí               | Parcial (pagos estimados) |            | Tabla de pagos pendiente (TT-005)                                                      |
| ALC-09 | Comprobante digital de pago          | Could            |                           |            |                                                                                        |
| ALC-10 | Inicio (dashboard)                   | Sí               | Implementado en local     |            |                                                                                        |

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
| CHG-06        | El backend se publicó en un hosting distinto de Render: API y MySQL en Railway; el frontend, en Vercel (11/11/2026).                                                            |                       | Equipo          | TT-009, INT-02, RSD-07                 | Aprobado e implementado |
| CHG-07 | Un solo ingreso por día en cualquier plan; una nueva lectura del mismo socio dentro de 30 minutos cuenta como el mismo ingreso (sin registrar otro ni descontar). | 23/11/2026 | STK-01 | RF-002, RF-003, RN-015 | Aprobado e implementado |
| CHG-08 | RNF-007 se limita a Chrome (computador, tablet y celular); Edge y Firefox quedan fuera del alcance de la verificación. | 23/11/2026 | STK-01 | RNF-007, UX-02 | Aprobado |

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
| ENTG-01 | INI-01 – Formulación y Constitución del Proyecto      | docs/entregables y Documentos\_Proyecto | 1.4 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-02 | GES-01 – Gestión de Interesados y del Proyecto        | docs/entregables y Documentos\_Proyecto | 1.6 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-03 | REQ-01 – Alcance y Especificación de Requisitos       | docs/entregables y Documentos\_Proyecto | 1.6 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-04 | REQ-02 – Backlog, Historias de Usuario y Casos de Uso | docs/entregables y Documentos\_Proyecto | 1.7 | Liliana Sofía Panesso Méndez | Entregado | Versión del índice maestro |
| ENTG-05 | TRZ-01 – Matriz Maestra de Trazabilidad               | docs/entregables y Documentos\_Proyecto | 1.3 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-06 | DSN-01 – Diseño UX/UI y Sistema de Diseño             | docs/entregables y Documentos\_Proyecto | 2.4 | Maileth Begambre Movilla     | Entregado | Versión del índice maestro |
| ENTG-07 | ARQ-01 – Arquitectura, Datos y Diseño Técnico         | docs/entregables y Documentos\_Proyecto | 2.6 | Liliana Sofía Panesso Méndez | Entregado | Versión del índice maestro |
| ENTG-08 | CAL-01 – Plan de Calidad, Pruebas y Aceptación        | docs/entregables y Documentos\_Proyecto | 0.9 |                              | Entregado | Versión del índice maestro |
| ENTG-09 | MAN-01 – Manual Técnico y de Operación                | docs/entregables y Documentos\_Proyecto | 1.9 | Liliana Sofía Panesso Méndez | Entregado | Versión del índice maestro |
| ENTG-10 | MAN-02 – Manual de Usuario                            | docs/entregables y Documentos\_Proyecto | 1.7 | Maileth Begambre Movilla     | Entregado | Versión del índice maestro |
| ENTG-11 | CIE-01 – Informe de Cierre y Entrega                  | docs/entregables y Documentos\_Proyecto | 1.1 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-12 | SUS-01 – Guía de Sustentación y Demostración          | docs/entregables y Documentos\_Proyecto | 0.4 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |
| ENTG-13 | REP-01 – Repositorio con etiqueta v1.0.0              | GitHub (etiqueta y Release) | v1.0.0 | Juan Diego Mejía Llano       | Entregado | Versión del índice maestro |

### 6.1 Integridad del paquete de entrega

  - La etiqueta final identifica un commit específico.

  - El repositorio contiene historial real y no una carga única.

  - La configuración de ejemplo no contiene secretos.

  - Las migraciones permiten reconstruir la base de datos.

  - La documentación coincide con la versión final.

  - Los enlaces y evidencias son accesibles para evaluación.

## 7\. Resultados técnicos del producto

| **Componente**               | **Tecnología / versión**        | **Estado**                  | **Resultado relevante**                  | **Evidencia** |
| ---------------------------- | ------------------------------- | --------------------------- | ---------------------------------------- | ------------- |
| Frontend                     | React 19 + Vite                 | Implementado                | 10 pantallas (UI-01 a UI-10) y botón de regreso |               |
| Backend / API                | Node.js + Express 5             | Implementado                | 19 grupos de endpoints bajo /api         |               |
| Base de datos                | MySQL (mysql2)                  | Implementado                | 9 tablas (init.sql, sin DROP)            |               |
| Autenticación / autorización | JWT 8 h + bcrypt; permitirRoles | Implementado | TT-001 y TT-003 terminadas; CP-016 a CP-021 aprobados               |               |
| Integraciones                | Sensor AS608 + CP2102; Brevo (correo) | Integrado             | Registro y validación con el lector real; código de recuperación y aviso de vencimiento por correo |               |
| Infraestructura / despliegue | Vercel (frontend); Railway (API Node.js 20 y MySQL 8.4); agente local del lector             | Implementado                   |                                          |               |
| Observabilidad               | Consola + registros\_acceso     | Parcial                     | GET /api/salud con el estado del lector; métricas y logs de Railway                 |               |

### 7.1 Coherencia arquitectónica

|                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ |
| *La arquitectura implementada coincide con los diagramas v2.0 (docs/diagramas) y con los ADR vigentes: cliente-servidor con backend en capas, fachada y patrón State para el acceso, adaptador del lector con fábrica por TIPO\_LECTOR y agente remoto por WebSocket (ADR-008). La única desviación registrada es el registro financiero calculado en el frontend (ADR-006), mientras se crea la tabla de pagos (TT-005); el marcado de vencidas al consultar (ADR-007) fue reemplazado por la tarea diaria del backend.* |

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
| Unitarias          | 93 | 93 | 93 | 0 | 0 | 65 % de líneas |
| Integración        | 22 | 22 | 22 | 0 | 0 | CP-001 a CP-022 (CIC-01) |
| End-to-End         | 5 | 5 | 5 | 0 | 0 | CIC-02 con el sensor en producción |
| API                |                  |                |               |              |                |               |
| Seguridad          | 5 | 5 | 5 | 0 | 0 | CP-018, CP-020, CP-021, RN-001 y npm audit |
| Accesibilidad      | 2 | 2 | 2 | 0 | 0 | Lighthouse: 96/100 y 24/24 |
| Rendimiento        | 1 | 1 | 1 | 0 | 0 | RNF-003 en el servidor (p95 6,4 ms) |
| Aceptación         | 1 | 1 | 1 | 0 | 0 | Product Owner (FLU-001 a FLU-005) |

### 8.1 Defectos al cierre

| **ID** | **Descripción** | **Severidad** | **Estado** | **Impacto** | **Decisión / plan** |
| ------ | --------------- | ------------- | ---------- | ----------- | ------------------- |
| DEF-01 |                 |               |            |             |                     |
| DEF-02 |                 |               |            |             |                     |
| DEF-03 |                 |               |            |             |                     |

### 8.2 Indicadores de calidad

| **Indicador**                      | **Meta** | **Resultado** | **Cumple** | **Fuente** |
| ---------------------------------- | -------- | ------------- | ---------- | ---------- |
| Cobertura de pruebas               | RF críticos con caso aprobado | 100 % de RF-001 a RF-011 (RF-009 a RF-011 con pruebas automáticas); 65 % de líneas | Sí | docs/pruebas/CIC-01-resultados.md |
| Defectos críticos abiertos         | 0        | 0 | Sí | docs/pruebas/CIC-01-resultados.md |
| Build / pipeline exitoso           | Sí       | Pruebas, lint, build, audit e integración en GitHub Actions (.github/workflows/ci.yml) | Sí | Pestaña Actions del repositorio |
| Tiempo de respuesta crítico        | < 2 s (RNF-003) | p95 6,4 ms en el servidor | Sí (falta medir con el sensor) | docs/pruebas/CIC-01-resultados.md |
| Accesibilidad básica               | ≥ 90 en Lighthouse | 96/100 en el login; 24/24 con sesión | Sí | docs/pruebas/UX-02-UX-06-compatibilidad-y-accesibilidad.md |
| Vulnerabilidades críticas abiertas | 0        | 0 (npm audit en cada pull request) | Sí | GitHub Actions |

## 9\. Seguridad, privacidad y cumplimiento

| **Control**                    | **Resultado**                                                          | **Evidencia** | **Riesgo pendiente** |
| ------------------------------ | ---------------------------------------------------------------------- | ------------- | -------------------- |
| Secretos fuera del repositorio | .env excluido; .env.example versionado                                 |               |                      |
| Contraseñas protegidas         | bcrypt                                                                 |               |                      |
| Autorización en servidor       | permitirRoles en cada ruta; regla del último administrador también en el backend |               | —                |
| HTTPS en ambiente público      | Certificados de Vercel y Railway |               | —  |
| Dependencias auditadas         | npm audit: 0 vulnerabilidades (22/11/2026) |               |                      |
| Datos personales controlados   | Solo hash de la huella; la API no devuelve el hash                     |               |                      |
| Licencias y atribuciones       | Archivo LICENSE (ISC) en la raíz del repositorio |               | Resuelto    |
| Declaración de uso de IA       |                                                                        |               |                      |
| Mínimo privilegio en base de datos | La API usa zonafit\_app (solo SELECT, INSERT, UPDATE y DELETE sobre railway); root solo para administrar | docs/pruebas/SEG-08-minimo-privilegio.md | — |

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
| Producción / demostración | https://zona-fit-evolution03.vercel.app · API en Railway | main | Activo | 11/11/2026 | Juan Diego Mejía Llano |

### 10.1 Verificación posterior al despliegue

| **Control**      | **Resultado esperado**                                | **Resultado real** | **Estado** | **Evidencia** |
| ---------------- | ----------------------------------------------------- | ------------------ | ---------- | ------------- |
| Health check     | GET /api/salud responde {"estado":"ok","lector":"conectado"}                         |                    |            |               |
| Acceso principal | Pantalla de inicio de sesión                          |                    |            |               |
| Autenticación    | Token JWT y menú por rol                              |                    |            |               |
| Flujo crítico    | Registrar cliente, asignar membresía y validar acceso |                    |            |               |
| Persistencia     | Datos guardados en MySQL                              |                    |            |               |
| Logs             | Logs con fecha, nivel, módulo y contexto (src/utils/logger.js)                     |                    |            |               |

### 10.2 Condiciones de operación

|                                                                                                                |
| -------------------------------------------------------------------------------------------------------------- |
| *El sistema opera en el horario de atención del gimnasio. Depende de Vercel, Railway (prueba hasta el 10/12/2026, luego plan Hobby) y del internet del portátil de recepción, donde corren el agente del lector y la pantalla de ingreso. El sensor guarda hasta 300 huellas. Si falla internet en recepción, solo se detiene la validación por huella y se valida por cédula.* |

## 11\. Aceptación del producto

| **Criterio de aceptación**           | **Responsable** | **Resultado** | **Evidencia** | **Observaciones** |
| ------------------------------------ | --------------- | ------------- | ------------- | ----------------- |
| Flujos críticos funcionales          | Liliana Sofía Panesso Méndez | Cumple | CIC-01 y CIC-02 |                   |
| Alcance acordado entregado           | Liliana Sofía Panesso Méndez | Cumple | Sección 4 |                   |
| Pruebas de aceptación                | Liliana Sofía Panesso Méndez | Cumple | Plan de calidad 16.2 |                   |
| Documentación actualizada            | Liliana Sofía Panesso Méndez | Cumple | docs/entregables |                   |
| Aplicación desplegada o reproducible | Liliana Sofía Panesso Méndez | Cumple | https://zona-fit-evolution03.vercel.app |                   |
| Transferencia realizada              | Liliana Sofía Panesso Méndez | Pendiente | Sección 15 (al cierre) |                   |

### 11.1 Decisión de aceptación

| **Decisión**               | **Marcar** | **Condición**                                         |
| -------------------------- | ---------- | ----------------------------------------------------- |
| Aceptado sin observaciones | ☒ | La entrega cumple los criterios definidos.            |
| Aceptado con observaciones | ☐          | Existen pendientes no bloqueantes con plan acordado.  |
| Requiere correcciones      | ☐          | No se cumplen criterios necesarios para aceptar.      |
| No aceptado                | ☐          | Existe una falla crítica o incumplimiento sustancial. |

### 11.2 Observaciones de aceptación

|                                                                |
| -------------------------------------------------------------- |
| *El Product Owner acepta la versión v1.0.0 el 23/11/2026. Solo queda la firma del acta (sección 20).* |

## 12\. Riesgos residuales y limitaciones conocidas

| **ID** | **Riesgo / limitación**                           | **Probabilidad** | **Impacto** | **Tratamiento**                                                       | **Responsable**              | **Fecha revisión** |
| ------ | ------------------------------------------------- | ---------------- | ----------- | --------------------------------------------------------------------- | ---------------------------- | ------------------ |
| RSK-05 | Indisponibilidad del sistema                      | 3                | 4           | Hosting con monitoreo, validación manual por cédula como contingencia | Liliana Sofía Panesso Méndez |                    |
| RSK-06 | Integración del sensor AS608 fuera de tiempo      | 3                | 4           | Cerrado: AS608 integrado en el sprint 11                              | Liliana Sofía Panesso Méndez |                    |
| RSK-07 | Cronograma insuficiente para pruebas y despliegue | 3                | 4           | Priorizar Must, congelar alcance desde el sprint 12                   | Juan Diego Mejía Llano       |                    |

### 12.1 Restricciones operativas

|                                                                                                       |
| ----------------------------------------------------------------------------------------------------- |
| *Chrome actual en computador, tablet y celular (RNF-007, CR-009); la pantalla de ingreso necesita el portátil de recepción con el sensor AS608 por USB. Capacidad prevista: 400 clientes y unas 200 validaciones por día. No se soportan pagos en línea, apertura automática de la puerta ni varias sedes.* |

## 13\. Deuda técnica

| **ID** | **Descripción**                                                                        | **Origen**          | **Impacto**                                                    | **Prioridad** | **Esfuerzo** | **Versión objetivo** |
| ------ | -------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------- | ------------- | ------------ | -------------------- |
| DT-01  | No existe tabla de pagos: el registro financiero estima con el precio actual del plan. | Revisión del código | Histórico financiero inexacto; no se guarda el método de pago. |               |              |                      |
| DT-02  | Resuelto: el sensor AS608 está integrado y el simulador se eliminó (PR \#53).          | Revisión del código | —                                                              |               |              |                      |
| DT-03  | Resuelto: tarea diaria en el backend (00:05 y al arrancar) que vence las activas y activa las pendientes. | Revisión del código | Estado guardado desactualizado.                                |               |              |                      |
| DT-04  | Resuelto: se retiró la ruta DELETE /api/clientes/:id (TT-002).                    | Revisión del código | —                                       |               |              |                      |
| DT-05  | Resuelto: el backend impide borrar la propia cuenta y al último administrador (TT-001).                       | Revisión del código | —                               |               |              |                      |
| DT-06  | Resuelto: límite de intentos de inicio de sesión y de recuperación de contraseña; CORS restringido a ORIGEN_FRONTEND. | Revisión del código | Fuerza bruta y exposición en producción.                       |               |              |                      |
| DT-07  | Resuelta en parte: token en sessionStorage (termina al cerrar la pestaña) y revocación al restablecer la contraseña o eliminar el usuario; sigue expuesto ante XSS mientras la pestaña esté abierta (mitigado con la CSP). | Revisión del código | Exposición ante XSS.                                           |               |              |                      |
| DT-08  | Resuelto: 93 pruebas unitarias, ciclo de integración y GitHub Actions (.github/workflows/ci.yml). | Revisión del código | —                      |               |              |                      |
| DT-09  | Navegación por estado, sin React Router.                                               | Revisión del código | Pantallas sin URL propia.                                      |               |              |                      |
| DT-10  | Esquema creado con init.sql, sin migraciones; no borra datos y se vuelve a ejecutar en cada cambio de esquema. | Revisión del código | Actualizar una base con datos exige scripts manuales.          |               |              |                      |
| DT-11  | Resuelto: desplegado en Vercel y Railway (PR #59 a #62).                                  | Revisión del código | —                                        |               |              |                      |
| DT-12  | Resuelto: se borraron los archivos vacíos cd y npm del backend (v1.0.0). | Revisión del código | Ruido en el repositorio.                                       |               |              |                      |

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
| Repositorio y versiones  | Juan Diego Mejía Llano | Instructor evaluador y Carlos Ramírez (propietario, STK-01) | Programada para el cierre | Repositorio, etiqueta v1.0.0 y CHANGELOG.md | Documentado; pendiente de entrega |
| Arquitectura y datos     | Liliana Sofía Panesso Méndez | Instructor evaluador | Programada para el cierre | Documento de arquitectura 2.3 y docs/diagramas | Documentado; pendiente de entrega |
| Instalación y despliegue | Juan Diego Mejía Llano | Carlos Ramírez (propietario, STK-01) | Programada para el cierre | Manual técnico 1.6 (instalación, Vercel y Railway) e instalación de la recepción (AgenteLector/recepcion) | Documentado; pendiente de entrega |
| Operación y monitoreo    | Juan Diego Mejía Llano | Carlos Ramírez (propietario, STK-01) | Programada para el cierre | Manual técnico (Deploy Logs, /api/salud y «Verificar lector ZonaFit») y Manual de usuario 1.6 | Documentado; pendiente de entrega |
| Respaldo y recuperación  | Juan Diego Mejía Llano | Carlos Ramírez (propietario, STK-01) | Programada para el cierre | Manual técnico 15 y docs/pruebas/DAT-06-respaldo-y-restauracion.md | Documentado; pendiente de entrega |
| Soporte y mantenimiento  | Liliana Sofía Panesso Méndez | Carlos Ramírez (propietario, STK-01) | Programada para el cierre | Manual técnico (problemas frecuentes) e Informe de cierre 13 (deuda técnica y trabajo futuro) | Documentado; pendiente de entrega |

### 15.1 Custodia de activos

| **Activo**      | **Ubicación**                                              | **Propietario / custodio**        | **Acceso transferido** | **Observaciones** |
| --------------- | ---------------------------------------------------------- | --------------------------------- | ---------------------- | ----------------- |
| Repositorio     | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03 | Organización zonafitevolutionSENA | Al cierre: acceso de lectura al instructor | Público; la organización es del equipo |
| Dominio / DNS   | zona-fit-evolution03.vercel.app (subdominio de Vercel; sin dominio propio) | Juan Diego Mejía Llano | No aplica | Si el gimnasio compra un dominio, se configura en Vercel |
| Infraestructura | Vercel (frontend) y Railway (API y MySQL)                                        | Juan Diego Mejía Llano (cuentas de Vercel y Railway) | Al cierre, con Carlos Ramírez (propietario, STK-01) | Railway en plan de prueba; plan Hobby si se mantiene en operación |
| Base de datos   | MySQL 8.4 en Railway (red privada)                             | Juan Diego Mejía Llano (usuario root; la API usa zonafit\_app) | Al cierre, con Carlos Ramírez (propietario, STK-01) | Respaldo semanal; últimos 4 conservados |
| Figma / diseño  | Archivo de Figma del equipo (wireframes, mockups y prototipo) | Maileth Begambre Movilla | Al cierre: enlace de solo lectura |  |
| Documentación   | docs/entregables del repositorio (PDF y Excel) y Documentos\_Proyecto (Word) | Juan Diego Mejía Llano | Al cierre | Versiones del índice maestro |

## 16\. Lecciones aprendidas

| **Categoría**              | **Qué funcionó** | **Qué no funcionó** | **Acción recomendada** |
| -------------------------- | ---------------- | ------------------- | ---------------------- |
| Análisis y requisitos      | Historias de usuario con criterios de aceptación y casos de uso; el backlog guió cada sprint | Reglas que cambiaron tarde (tiqueteras, un ingreso por día, membresías pendientes) obligaron a rehacer código y documentos | Validar las reglas de negocio con el propietario antes de cada sprint y registrar cada cambio como CR |
| Gestión y colaboración     | Flujo feature → develop → main con pull requests y commits convencionales | Contribución desigual en el repositorio; un force-push reescribió ramas y la historia de main | Repartir tareas visibles en Jira, que cada integrante abra sus PR y proteger main y develop contra force-push |
| Arquitectura y desarrollo  | Capas (rutas, controladores, servicios, repositorios) y patrones State, Adapter y Facade; el lector físico se agregó sin cambiar el núcleo | El lector simulado ocultó problemas del sensor real (error 0x17, huellas duplicadas) que salieron tarde | Probar con el hardware real desde el primer sprint en que se integra |
| Pruebas y seguridad        | Pruebas unitarias, ciclos CIC-01 y CIC-02 e integración continua en cada PR; reglas de seguridad en el servidor; usuario de base con mínimo privilegio | Las pruebas automáticas llegaron al final; la conexión con root y un error de contraseña se detectaron en producción | Escribir pruebas desde el inicio y aplicar mínimo privilegio desde el primer despliegue |
| Despliegue y documentación | Despliegue en Railway y Vercel con agente remoto; documentación en Word, PDF y Markdown sincronizada | Variables con caracteres invisibles y un agente que no se reconectaba tras reinicios del servidor; documentos desactualizados respecto al código | Verificar las variables tras cada cambio, latido en el agente y actualizar la documentación en el mismo PR que el código |
| Uso de IA y herramientas   | La IA agilizó el código repetitivo, las pruebas, los diagramas y la documentación; el equipo revisó y probó cada cambio antes de integrarlo | Algunas respuestas tenían errores o no correspondían al sistema real, y la coautoría automática de Claude apareció en commits y PR; hubo que corregirlo | Revisar y probar todo lo generado, desactivar la coautoría automática y declarar el uso de IA desde el inicio del proyecto |

## 17\. Autoría, contribución y uso de IA

### 17.1 Contribución individual

| **Integrante**               | **Rol**                        | **Contribuciones verificables**             | **Evidencias**        | **Capacidad de sustentación** |
| ---------------------------- | ------------------------------ | ------------------------------------------- | --------------------- | ----------------------------- |
| Juan Diego Mejía Llano       | Líder, Scrum Master y frontend | Frontend React, despliegue, agente del lector, CI, pruebas y documentación | 93 commits en main y 78 PR; docs/evidencias/contribuciones.md | Frontend React, despliegue en la nube, agente del lector, integración continua y documentación |
| Liliana Sofía Panesso Méndez | Product Owner y backend        | API REST, base de datos, autenticación, patrones de diseño y membresías | 56 commits (49 en ramas feature y release, 7 en main); docs/evidencias/contribuciones.md | Modelo de datos, JWT y roles, servicios de clientes, planes y membresías, patrones State, Adapter y Facade, activación diaria |
| Maileth Begambre Movilla     | UX/UI y apoyo frontend         | Interfaz responsive, manejo de sesión, integración del lector y pantalla de ingreso | 8 commits en main; Figma; docs/evidencias/contribuciones.md | Diseño de la interfaz y responsive, manejo de sesión, integración del lector biométrico y pantalla de ingreso |

### 17.2 Declaración de uso de IA

| **Herramienta** | **Finalidad** | **Partes asistidas** | **Validación realizada** | **Responsable** |
| --------------- | ------------- | -------------------- | ------------------------ | --------------- |
| Claude y Claude Code (Anthropic), en chat y en el editor | Apoyo en programación, pruebas, depuración, despliegue, documentación y diagramas | Backend, frontend, AgenteLector, pruebas automáticas, documentos (Word, PDF y Markdown) y diagramas Mermaid | Revisión del código antes de aceptarlo; pruebas unitarias, ciclos CIC-01 y CIC-02 y pruebas manuales; revisión de los documentos contra el sistema real | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla (cada uno en su parte) |
| Gemini (Google), en chat | Apoyo en diseño de interfaz y redacción de textos | Propuestas de UX/UI (pantallas, colores, distribución) y redacción de textos de los documentos | Revisión de las propuestas de diseño y de los textos antes de usarlos; ajuste al sistema real | Equipo |
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
| Archivar documentación final | Juan Diego Mejía Llano       | 23/11/2026 | docs/entregables y Documentos\_Proyecto | Hecho |
| Etiquetar versión final      | Juan Diego Mejía Llano       | 23/11/2026 | Etiqueta y Release v1.0.0 en GitHub | Hecho |
| Etiquetar versión v1.1.0     | Juan Diego Mejía Llano       | 24/11/2026 | Etiqueta y Release v1.1.0 en GitHub | Hecho |
| Cerrar issues / backlog      | Juan Diego Mejía Llano       | 23/11/2026 | Backlog 1.5; pendientes en la sección 13 (trabajo futuro) | Hecho |
| Entregar accesos y activos   | Liliana Sofía Panesso Méndez | Con la firma del acta | Sección 15 | Programado |
| Registrar riesgos pendientes | Juan Diego Mejía Llano       | 23/11/2026 | Sección 12 | Hecho |
| Realizar reunión de cierre   | Juan Diego Mejía Llano       | Con la firma del acta | Sección 20 | Programado |
| Obtener aceptación formal    | Juan Diego Mejía Llano       | 23/11/2026 | Sección 11 (Product Owner); firma en la sección 20 | Hecho |

## 19\. Lista de verificación de cierre

| **N.°** | **Verificación**                                               | **Cumple**     | **Evidencia** | **Observaciones** |
| ------- | -------------------------------------------------------------- | -------------- | ------------- | ----------------- |
| 1       | El producto ejecuta los flujos críticos.                       | Sí | CIC-01 y CIC-02 |  |
| 2       | La versión final está identificada mediante etiqueta o commit. | Sí | Etiqueta v1.0.0 |  |
| 3       | El alcance entregado está comparado con el comprometido.       | Sí | Sección 4 |  |
| 4       | Los requisitos pendientes están declarados.                    | Sí | Sección 5.1 y lista de chequeo |  |
| 5       | La matriz de trazabilidad está actualizada.                    | Sí | Matriz maestra de trazabilidad |  |
| 6       | Los entregables están disponibles y versionados.               | Sí | docs/entregables |  |
| 7       | Las migraciones y semillas son reproducibles.                  | Sí | init.sql en cada PR |  |
| 8       | Las pruebas y evidencias están consolidadas.                   | Sí | docs/pruebas y docs/evidencias |  |
| 9       | No existen defectos críticos abiertos sin decisión formal.     | Sí | Sección 8.1 |  |
| 10      | No existen secretos o credenciales expuestas.                  | Sí | npm audit y .env fuera de Git |  |
| 11      | La documentación corresponde con la versión final.             | Sí | Versiones del 23/11/2026 |  |
| 12      | La aplicación está desplegada o puede instalarse.              | Sí | Vercel y Railway |  |
| 13      | La aceptación funcional fue registrada.                        | Sí | Sección 11 |  |
| 14      | Los riesgos residuales tienen responsable.                     | Sí | Sección 12 |  |
| 15      | La deuda técnica está documentada.                             | Sí | Sección 13 |  |
| 16      | La transferencia técnica fue realizada.                        | Sí | Sección 15 | La entrega se formaliza con el acta |
| 17      | Los activos y accesos fueron entregados.                       | Sí | Sección 15.1 | La entrega se formaliza con el acta |
| 18      | Las contribuciones individuales son trazables.                 | Sí | docs/evidencias/contribuciones.md |  |
| 19      | El uso de IA fue declarado.                                    | Sí | Sección 17.2 |  |
| 20      | El informe cuenta con aprobación y firmas.                     | No |  | Al cierre (sección 20) |

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
