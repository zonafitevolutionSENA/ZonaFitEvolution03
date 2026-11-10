# Plan de calidad, pruebas y aceptación

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/04_Calidad/Plan_de_Calidad_Pruebas_y_Aceptacion_ZonaFitEvolution.pdf`](entregables/04_Calidad/Plan_de_Calidad_Pruebas_y_Aceptacion_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Elemento**             | **Detalle**                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| Código documental        | ADSO-QA-01                                                                  |
| Nombre                   | Plan de Calidad, Pruebas y Aceptación                                       |
| Clasificación            | Documento de planificación, ejecución y evidencia                           |
| Estado                   | En elaboración                                                              |
| Propietario              |                                                                             |
| Revisor funcional        | Liliana Sofía Panesso Méndez (Product Owner)                                |
| Revisor técnico          | Liliana Sofía Panesso Méndez                                                |
| Revisor académico        |                                                                             |
| Ubicación oficial        | Carpeta documentos\_proyecto; pruebas en /tests del repositorio (por crear) |
| Periodicidad de revisión | Por ciclo de pruebas                                                        |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción**                                                                                      | **Responsable**        | **Aprobado por** |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- |
| 0.1         | 03/11/2026 | Estrategia inicial, riesgos, ambientes y catálogo de casos CP-001 a CP-021 (diseñados, sin ejecutar) | Juan Diego Mejía Llano |                  |
| 0.2         | 10/11/2026 | Pruebas con el sensor AS608 (CP-010, CP-011 y nuevo CP-022) y simulador eliminado                    | Juan Diego Mejía Llano |                  |

### Registro de aprobaciones

| **Rol**          | **Nombre**                   | **Decisión**        | **Fecha** | **Observaciones** |
| ---------------- | ---------------------------- | ------------------- | --------- | ----------------- |
| Líder de calidad |                              | Aprobado / Devuelto |           |                   |
| Product Owner    | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                   |
| Líder técnico    | Liliana Sofía Panesso Méndez | Aprobado / Devuelto |           |                   |
| Instructor       |                              | Aprobado / Devuelto |           |                   |


## 1\. Propósito, alcance y principios

Este documento establece la estrategia para prevenir defectos, verificar el producto y demostrar su aceptación mediante evidencia reproducible. Debe mantenerse alineado con la versión real del software y con la matriz de trazabilidad.

### 1.1 Objetivos específicos

  - Definir alcance, niveles, tipos y prioridades de prueba.

  - Relacionar requisitos, riesgos, casos, resultados y evidencias.

  - Establecer ambientes, datos, herramientas y responsabilidades.

  - Definir criterios de entrada, suspensión, reanudación y salida.

  - Gestionar defectos de manera trazable y verificable.

  - Medir cobertura y calidad sin confundir cantidad con efectividad.

  - Facilitar la aceptación funcional y la decisión de liberación.

### 1.2 Alcance del plan

| **Elemento**              | **Incluido**                                                                                                            | **Excluido / N.A.**                                           | **Justificación** |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------- |
| Módulos / versiones       | Autenticación, clientes, planes, membresías, biometría, acceso, historial, personal y registro financiero (MVP v1.0.0). | Pagos en línea, facturación electrónica y apertura de puerta. |                   |
| Plataformas               | Chrome, Edge y Firefox en computador, tablet y celular.                                                                 | Safari / iOS.                                                 |                   |
| Integraciones             | Sensor AS608 (CP2102) y API REST.                                                                                       | Relé y electroimán (CR-005).                                  |                   |
| Requisitos no funcionales | RNF-001 a RNF-007.                                                                                                      |                                                               |                   |
| Datos y migraciones       | init.sql y datos semilla (planes iniciales y administrador).                                                            | Migraciones incrementales (no existen).                       |                   |
| Despliegue / operación    | Prueba de humo en el hosting (por definir).                                                                             |                                                               |                   |

### 1.3 Principios de calidad

  - La calidad se construye desde el análisis, no se inspecciona únicamente al final.

  - Los casos de prueba derivan de requisitos, riesgos y criterios de aceptación.

  - Los flujos críticos requieren evidencia reproducible.

  - La automatización se aplica donde aporta repetibilidad y rapidez.

  - La cobertura numérica no sustituye la revisión de escenarios relevantes.

  - Un defecto cerrado requiere evidencia de corrección y, cuando aplique, prueba de regresión.

## 2\. Referencias, términos y trazabilidad

### 2.1 Documentos relacionados

| **Documento / artefacto**  | **Código / versión** | **Información utilizada**              | **Ubicación**                    |
| -------------------------- | -------------------- | -------------------------------------- | -------------------------------- |
| Formulación y Constitución | INI-01 v1.0          | Objetivos, riesgos, criterios de éxito | documentos\_proyecto/Formulacion |
| Alcance y Requisitos       | REQ-01 v1.0          | RF, RNF, reglas y permisos             | documentos\_proyecto             |
| Backlog, HU y CU           | REQ-02 v1.0          | Criterios de aceptación y flujos       | documentos\_proyecto             |
| Diseño UX/UI               | DSN-01 v2.0          | Pantallas, estados y accesibilidad     | documentos\_proyecto             |
| Arquitectura y Datos       | ARQ-01 v1.0          | Componentes, API, datos y seguridad    | documentos\_proyecto             |
| Matriz de Trazabilidad     | TRZ-01 v1.0          | Cobertura integral                     | documentos\_proyecto             |

### 2.2 Convenciones de identificación

| **Elemento**      | **Prefijo** | **Ejemplo**      |
| ----------------- | ----------- | ---------------- |
| Caso de prueba    | CP          | CP-001           |
| Suite de pruebas  | ST          | ST-AUTENTICACION |
| Ejecución         | EJ          | EJ-2026-01       |
| Defecto           | DEF         | DEF-001          |
| Evidencia         | EV          | EV-001           |
| Riesgo de calidad | RC          | RC-001           |
| Ciclo de pruebas  | CIC         | CIC-01           |

### 2.3 Glosario mínimo

| **Término**        | **Definición**                                                              |
| ------------------ | --------------------------------------------------------------------------- |
| Verificación       | Comprobación de que el producto fue construido conforme a especificaciones. |
| Validación         | Comprobación de que el producto satisface la necesidad real del usuario.    |
| Regresión          | Reejecución para detectar efectos no deseados de cambios.                   |
| Severidad          | Impacto técnico o funcional del defecto.                                    |
| Prioridad          | Urgencia con la que debe corregirse.                                        |
| Cobertura          | Grado en que requisitos, riesgos o código están representados por pruebas.  |
| Criterio de salida | Condición mínima para cerrar un ciclo o recomendar liberación.              |

## 3\. Estrategia general de calidad

### 3.1 Enfoque seleccionado

| **Campo**                            | **Definición**                                                                                |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| Enfoque general                      | Basado en riesgos e iterativo: primero los flujos críticos de acceso, membresías y seguridad. |
| Momento de inicio                    | Sprint 11 (diseño) y sprints 12 y 13 (ejecución).                                             |
| Frecuencia de ejecución              | Por sprint y antes de la versión v1.0.0.                                                      |
| Niveles automatizados                | Por definir (TT-007).                                                                         |
| Niveles manuales                     | Sistema/E2E, aceptación, usabilidad, compatibilidad y accesibilidad.                          |
| Criterio de priorización             | P0/P1 para RF-003, RF-004, RF-005, RF-007 y RNF-001; P2 para el resto.                        |
| Tratamiento de pruebas condicionadas | Las pruebas de acceso se hacen con el sensor AS608 conectado (el simulador se eliminó).       |
| Política de regresión                | Reejecutar los casos P0/P1 después de cada integración a develop.                             |

### 3.2 Pirámide y distribución de pruebas

| **Nivel**     | **Objetivo**                           | **Cantidad relativa esperada** | **Responsable**                              | **Momento**         |
| ------------- | -------------------------------------- | ------------------------------ | -------------------------------------------- | ------------------- |
| Unitarias     | Validar lógica aislada                 | Alta                           |                                              | Durante desarrollo  |
| Integración   | Validar componentes, datos y servicios | Media                          |                                              | En CI / integración |
| Sistema / E2E | Validar flujos completos               | Selectiva                      |                                              | Antes de entrega    |
| Aceptación    | Validar valor y criterios funcionales  | Crítica                        | Liliana Sofía Panesso Méndez (Product Owner) | Antes de aprobación |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio</strong></p>
<p>No se exige una proporción rígida. La distribución debe responder al riesgo, arquitectura y costo de mantenimiento. Un exceso de pruebas E2E frágiles puede ser peor que una combinación equilibrada.</p></td>
</tr>
</tbody>
</table>

### 3.3 Criterios generales de entrada y salida

| **Tipo** | **Criterio**                                        | **Evidencia** | **Responsable**                              |
| -------- | --------------------------------------------------- | ------------- | -------------------------------------------- |
| Entrada  | Requisitos y criterios aprobados (REQ-01, REQ-02)   |               | Liliana Sofía Panesso Méndez (Product Owner) |
| Entrada  | Ambiente de pruebas con init.sql y datos sintéticos |               | Liliana Sofía Panesso Méndez                 |
| Entrada  | Casos CP-001 a CP-021 diseñados                     |               |                                              |
| Salida   | 100 % de casos P0/P1 ejecutados                     |               |                                              |
| Salida   | 0 defectos bloqueantes o críticos abiertos          |               |                                              |
| Salida   | Aceptación del Product Owner                        |               | Liliana Sofía Panesso Méndez (Product Owner) |

## 4\. Riesgos de calidad y priorización

### 4.1 Registro de riesgos de calidad

| **ID** | **Riesgo**                                      | **Fuente**               | **Prob.** | **Impacto** | **Nivel** | **Tratamiento**                        | **Pruebas asociadas**  | **Responsable** |
| ------ | ----------------------------------------------- | ------------------------ | --------- | ----------- | --------- | -------------------------------------- | ---------------------- | --------------- |
| RC-001 | Acceso permitido con membresía vencida          | RF-003 / RN-009          | 3         | 3           | Alto      | Probar todos los estados               | CP-007, CP-008         |                 |
| RC-002 | Escalamiento de privilegios por la API          | RNF-001 / RN-011, RN-012 | 2         | 3           | Alto      | Pruebas de autorización en el servidor | CP-018, CP-020, CP-021 |                 |
| RC-003 | Renovación que pierde días o duplica membresías | RF-005 / RN-003, RN-005  | 2         | 3           | Alto      | Casos de borde de fechas               | CP-012, CP-013         |                 |

### 4.2 Matriz de criticidad funcional

| **Proceso / módulo**           | **Impacto de fallo** | **Frecuencia de uso** | **Exposición de datos**        | **Complejidad** | **Criticidad** | **Cobertura mínima**                |
| ------------------------------ | -------------------- | --------------------- | ------------------------------ | --------------- | -------------- | ----------------------------------- |
| Autenticación                  | Alto                 | Diaria                | Credenciales                   |                 | Alta           | Unitarias + integración + seguridad |
| Control de acceso y membresías | Alto                 | Cada ingreso          | Datos personales y biométricos |                 | Alta           |                                     |
| Registro financiero            | Medio                | Semanal               | Datos financieros              |                 | Media          |                                     |

### 4.3 Priorización de casos de prueba

| **Prioridad**   | **Criterio**                                         | **Frecuencia recomendada**       |
| --------------- | ---------------------------------------------------- | -------------------------------- |
| P0 – Bloqueante | Seguridad crítica, pérdida de datos o flujo esencial | Cada cambio relevante / pipeline |
| P1 – Alta       | Función principal o regla de negocio crítica         | Cada ciclo                       |
| P2 – Media      | Función importante con alternativa operativa         | Antes de liberación              |
| P3 – Baja       | Escenario poco frecuente o cosmético                 | Según capacidad                  |

## 5\. Organización, roles y responsabilidades

### 5.1 Equipo de calidad

| **Rol**                  | **Responsabilidades**                                  | **Autoridad**                                | **Evidencias** |
| ------------------------ | ------------------------------------------------------ | -------------------------------------------- | -------------- |
| Líder de calidad         | Plan, coordinación, métricas y recomendación de cierre |                                              |                |
| Desarrollador            | Pruebas unitarias, corrección y soporte técnico        | Corrige defectos de su módulo                |                |
| Responsable funcional    | Validar criterios y aceptación                         | Liliana Sofía Panesso Méndez (Product Owner) |                |
| Responsable de seguridad | Revisar controles y pruebas condicionadas              |                                              |                |
| Usuario representante    | Ejecutar o validar aceptación                          | Recepción del gimnasio (STK-02)              |                |
| Instructor               | Revisión académica y técnica                           |                                              |                |

### 5.2 Matriz RACI de pruebas

| **Actividad**      | **Calidad** | **Desarrollo** | **PO / cliente** | **Usuario** | **Instructor** |
| ------------------ | ----------- | -------------- | ---------------- | ----------- | -------------- |
| Aprobar estrategia |             |                |                  |             |                |
| Diseñar casos      |             |                |                  |             |                |
| Preparar ambiente  |             |                |                  |             |                |
| Ejecutar pruebas   |             |                |                  |             |                |
| Corregir defectos  |             |                |                  |             |                |
| Aceptar producto   |             |                |                  |             |                |

### 5.3 Comunicación y escalamiento

| **Evento**          | **Frecuencia**      | **Participantes** | **Entrada**         | **Salida**                        |
| ------------------- | ------------------- | ----------------- | ------------------- | --------------------------------- |
| Revisión de calidad | Semanal / iteración |                   | Métricas y defectos | Decisiones y acciones             |
| Triage de defectos  | Según necesidad     |                   | Defectos nuevos     | Severidad, prioridad, responsable |
| Go / No-Go          | Antes de liberar    |                   | Reporte final       | Decisión documentada              |

## 6\. Ambientes, herramientas y datos de prueba

### 6.1 Inventario de ambientes

| **ID**   | **Ambiente** | **Propósito**                               | **URL / acceso**                                  | **Versión** | **Datos**  | **Responsable**                                                                 | **Disponibilidad**  |
| -------- | ------------ | ------------------------------------------- | ------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------- | ------------------- |
| AMB-DEV  | Desarrollo   | Construcción y pruebas del desarrollador    | http://localhost:5173 / http://localhost:3000/api | develop     | Sintéticos | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla | Local               |
| AMB-QA   | Pruebas      | Ejecución de los ciclos de prueba           |                                                   |             | Sintéticos |                                                                                 |                     |
| AMB-UAT  | Aceptación   | Validación del Product Owner y la recepción |                                                   |             | Sintéticos | Liliana Sofía Panesso Méndez (Product Owner)                                    |                     |
| AMB-PROD | Producción   | Operación del gimnasio                      | Hosting por definir                               | v1.0.0      | Reales     | Liliana Sofía Panesso Méndez                                                    | Horario de atención |

### 6.2 Configuración de ambiente

| **Elemento**               | **Valor / versión**                                                                          | **Origen**                        | **Verificación** |
| -------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- |
| Sistema operativo          | Windows (equipos del equipo y de la recepción)                                               |                                   |                  |
| Runtime / SDK              | Node.js LTS reciente                                                                         |                                   |                  |
| Base de datos              | MySQL local (XAMPP) o en la nube                                                             | init.sql + scripts/crear-admin.js |                  |
| Navegadores / dispositivos | Chrome, Edge y Firefox; computador, tablet y celular                                         |                                   |                  |
| Servicios externos / mocks | Sensor AS608 + CP2102 (sin simulador); en pruebas automatizadas se reemplazan sus respuestas | src/hardware                      |                  |
| Variables de entorno       | .env.example del backend y VITE\_API\_URL del frontend                                       | Repositorio                       |                  |
| Build / commit             |                                                                                              |                                   |                  |

### 6.3 Herramientas de prueba

| **Categoría** | **Herramienta** | **Versión** | **Uso** | **Responsable** | **Alternativa** |
| ------------- | --------------- | ----------- | ------- | --------------- | --------------- |
| Unitarias     |                 |             |         |                 |                 |
| API           |                 |             |         |                 |                 |
| E2E           |                 |             |         |                 |                 |
| Cobertura     |                 |             |         |                 |                 |
| Seguridad     |                 |             |         |                 |                 |
| Rendimiento   |                 |             |         |                 |                 |
| Accesibilidad |                 |             |         |                 |                 |

### 6.4 Datos de prueba

| **ID**   | **Conjunto**                    | **Propósito**                                            | **Origen** | **Sensibilidad** | **Preparación**                          | **Restauración**           |
| -------- | ------------------------------- | -------------------------------------------------------- | ---------- | ---------------- | ---------------------------------------- | -------------------------- |
| DATA-001 | Clientes de prueba              | Registrar, buscar y renovar                              | Sintético  | Media            | Crear 400 clientes con cédulas ficticias | Volver a ejecutar init.sql |
| DATA-002 | Membresías en todos los estados | Probar acceso activa, vencida, cancelada y sin membresía | Sintético  | Baja             | Fechas relativas a hoy                   | Volver a ejecutar init.sql |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de privacidad</strong></p>
<p>No utilice datos personales reales en pruebas salvo autorización y controles explícitos. Las semillas y ejemplos no deben contener secretos, documentos reales ni información sensible.</p></td>
</tr>
</tbody>
</table>

## 7\. Niveles y tipos de prueba

### 7.1 Catálogo y aplicabilidad

| **Tipo de prueba** | **Objetivo**                           | **Prioridad**              | **Aplica** | **Justificación / alcance**          |
| ------------------ | -------------------------------------- | -------------------------- | ---------- | ------------------------------------ |
| Unitaria           | Reglas y funciones aisladas            | Obligatoria                | Sí         | Servicios y utilidades de validación |
| Integración        | Persistencia, API y servicios          | Obligatoria                | Sí         | API con MySQL                        |
| Sistema / E2E      | Flujos completos                       | Condicionada               | Sí         | Flujos FLU-001 a FLU-005             |
| Aceptación         | Criterios funcionales                  | Condicionada               | Sí         | PO y recepción                       |
| Seguridad          | Acceso, entrada y exposición           | Obligatoria / condicionada | Sí         | RNF-001                              |
| Rendimiento        | Tiempo, carga o volumen                | Condicionada               | Sí         | RNF-003                              |
| Accesibilidad      | Uso con teclado, semántica y contraste | Obligatoria                | Sí         | Flujos críticos                      |
| Compatibilidad     | Navegadores / dispositivos definidos   | Condicionada               | Sí         | RNF-007                              |
| Recuperación       | Backup, restauración y fallos          | Condicionada               | Sí         | Respaldo y restauración              |

### 7.2 Estrategia por componente

| **Componente**           | **Riesgo principal**        | **Pruebas unitarias**      | **Integración**                 | **E2E** | **Seguridad** | **RNF** |
| ------------------------ | --------------------------- | -------------------------- | ------------------------------- | ------- | ------------- | ------- |
| CMP-05 Control de acceso | Acceso indebido             | estadosAcceso              | POST /api/acceso-fisico/validar | FLU-004 | Token y rol   | RNF-003 |
| CMP-04 Servicios         | Reglas de membresía         | membresia.service (fechas) | API-11 a API-15                 | FLU-003 | —             | —       |
| CMP-02 Middlewares       | Escalamiento de privilegios | permitirRoles              | Todas las rutas                 | FLU-001 | 401/403       | RNF-001 |

## 8\. Diseño y gestión de casos de prueba

### 8.1 Catálogo maestro

| **ID** | **Título**                                                  | **Requisito / HU / CU** | **Prioridad** | **Tipo**    | **Estado**                                   | **Automatizada** | **Responsable** |
| ------ | ----------------------------------------------------------- | ----------------------- | ------------- | ----------- | -------------------------------------------- | ---------------- | --------------- |
| CP-001 | Registro de cliente válido                                  | RF-001 / HU-001         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-002 | Cédula duplicada                                            | RF-001 / HU-001         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-003 | Campos inválidos                                            | RF-001 / HU-001         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-004 | Crear plan                                                  | RF-002 / HU-003         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-005 | Eliminar plan con membresías                                | RF-002 / HU-003         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-006 | Empleado intenta crear plan                                 | RF-002 / HU-003         | P1            | Seguridad   | Diseñado                                     |                  |                 |
| CP-007 | Acceso con membresía activa                                 | RF-003 / HU-006         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-008 | Acceso con membresía vencida                                | RF-003 / HU-006         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-009 | Huella no reconocida                                        | RF-003 / HU-006         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-010 | Registrar huella                                            | RF-004 / HU-005         | P1            | Integración | Ejecutado manualmente (10/11/2026): aprobado |                  |                 |
| CP-011 | Huella ya registrada (mismo dedo, también en otra posición) | RF-004 / HU-005         | P1            | Integración | Ejecutado manualmente (10/11/2026): aprobado |                  |                 |
| CP-012 | Renovar vigente                                             | RF-005 / HU-004         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-013 | Renovar vencida                                             | RF-005 / HU-004         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-014 | Resumen de pagos                                            | RF-006 / HU-008         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-015 | Empleado sin registro financiero                            | RF-006 / HU-008         | P1            | Seguridad   | Diseñado                                     |                  |                 |
| CP-016 | Inicio de sesión válido                                     | RF-007 / HU-002         | P0            | Integración | Diseñado                                     |                  |                 |
| CP-017 | Credenciales inválidas                                      | RF-007 / HU-002         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-018 | Eliminar último administrador                               | RF-007 / HU-002         | P0            | Seguridad   | Diseñado                                     |                  |                 |
| CP-019 | Filtrar historial                                           | RF-008 / HU-006         | P1            | Integración | Diseñado                                     |                  |                 |
| CP-020 | Petición sin token                                          | RNF-001 / HU-010        | P0            | Seguridad   | Diseñado                                     |                  |                 |
| CP-021 | Empleado en ruta de Administrador                           | RNF-001 / HU-010        | P0            | Seguridad   | Diseñado                                     |                  |                 |
| CP-022 | Eliminar huella (se borra del sensor y de la base de datos) | RF-004 / HU-005         | P1            | Integración | Ejecutado manualmente (10/11/2026): aprobado |                  |                 |

### 8.2 Ficha detallada de caso de prueba

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
<td>CP-008 – Acceso con membresía vencida</td>
</tr>
<tr class="even">
<td>Objetivo</td>
<td>Verificar que se niegue el ingreso cuando la fecha de fin ya pasó.</td>
</tr>
<tr class="odd">
<td>Requisito / regla / riesgo</td>
<td>RF-003, RN-002, RN-009 / RC-001</td>
</tr>
<tr class="even">
<td>Prioridad y tipo</td>
<td>P0 – Integración</td>
</tr>
<tr class="odd">
<td>Precondiciones</td>
<td>Cliente con huella registrada y membresía activa con fecha de fin de ayer; token de Empleado.</td>
</tr>
<tr class="even">
<td>Datos de entrada</td>
<td>DATA-002</td>
</tr>
<tr class="odd">
<td>Pasos</td>
<td><p>1. Enviar POST /api/acceso-fisico/validar con la huella del cliente.</p>
<p>2. Consultar GET /api/acceso-fisico/historial.</p></td>
</tr>
<tr class="even">
<td>Resultado esperado</td>
<td>Respuesta «denegado» con motivo «Membresía vencida»; el intento queda en el historial.</td>
</tr>
<tr class="odd">
<td>Resultado obtenido</td>
<td></td>
</tr>
<tr class="even">
<td>Ambiente / versión</td>
<td></td>
</tr>
<tr class="odd">
<td>Evidencia</td>
<td></td>
</tr>
<tr class="even">
<td>Estado</td>
<td>Diseñado</td>
</tr>
<tr class="odd">
<td>Defecto asociado</td>
<td></td>
</tr>
<tr class="even">
<td>Responsable y fecha</td>
<td></td>
</tr>
</tbody>
</table>

### 8.3 Diseño de escenarios

  - Escenario positivo principal.

  - Datos inválidos y límites.

  - Permisos permitidos y denegados.

  - Estados vacíos, carga, error y reintento.

  - Duplicidad e idempotencia cuando aplique.

  - Concurrencia y transacciones cuando aplique.

  - Expiración de sesión y recuperación.

  - Fallo de dependencias externas.

### 8.4 Revisión de calidad del caso

| **Criterio**                                           | **Cumple** | **Observación** |
| ------------------------------------------------------ | ---------- | --------------- |
| Tiene objetivo y resultado verificable                 | Sí / No    |                 |
| Es reproducible y no depende de conocimiento implícito | Sí / No    |                 |
| Usa datos controlados                                  | Sí / No    |                 |
| Está trazado a requisito o riesgo                      | Sí / No    |                 |
| Evita pasos ambiguos                                   | Sí / No    |                 |
| Define evidencia esperada                              | Sí / No    |                 |

## 9\. Automatización, cobertura y CI

### 9.1 Estrategia de automatización

| **Candidato**             | **Beneficio** | **Costo mantenimiento** | **Estabilidad** | **Frecuencia** | **Decisión**         |
| ------------------------- | ------------- | ----------------------- | --------------- | -------------- | -------------------- |
| Reglas críticas           |               |                         |                 |                | Automatizar / Manual |
| API principal             |               |                         |                 |                |                      |
| Flujo E2E crítico         |               |                         |                 |                |                      |
| Interfaz visual cambiante |               |                         |                 |                |                      |

### 9.2 Cobertura objetivo

| **Dimensión**                | **Meta**                     | **Método**             | **Exclusiones justificadas** | **Resultado** |
| ---------------------------- | ---------------------------- | ---------------------- | ---------------------------- | ------------- |
| Requisitos críticos          | 100 % con prueba y evidencia | Matriz de trazabilidad |                              |               |
| Reglas de negocio críticas   | 100 % (RN-002 a RN-012)      | Casos / unitarias      |                              |               |
| Cobertura de código          |                              | Herramienta            |                              |               |
| Ramas / condiciones críticas |                              |                        |                              |               |
| Flujos E2E críticos          | 100 % (FLU-001 a FLU-005)    |                        |                              |               |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Advertencia</strong></p>
<p>Una cobertura de código alta no garantiza buenos casos. Debe analizarse qué lógica está cubierta, qué escenarios faltan y si las aserciones son significativas.</p></td>
</tr>
</tbody>
</table>

### 9.3 Pipeline de integración continua

| **Etapa**                | **Comando / herramienta**        | **Condición de aprobación**              | **Artefacto generado** |
| ------------------------ | -------------------------------- | ---------------------------------------- | ---------------------- |
| Instalación reproducible | npm install (backend y frontend) | Sin errores                              |                        |
| Lint / formato           | npm run lint                     | Sin errores críticos                     |                        |
| Pruebas unitarias        |                                  | Aprobadas                                |                        |
| Pruebas integración      |                                  | Aprobadas                                |                        |
| Build                    | npm run build                    | Exitoso                                  |                        |
| Auditoría dependencias   | npm audit                        | Sin vulnerabilidades críticas sin tratar |                        |
| Reporte cobertura        |                                  | Meta evaluada                            |                        |

## 10\. Pruebas funcionales y de integración

### 10.1 Cobertura por módulo

| **Módulo**         | **Flujo crítico**                     | **RF / HU**                     | **Reglas**              | **Casos**                       | **Resultado** | **Evidencia** |
| ------------------ | ------------------------------------- | ------------------------------- | ----------------------- | ------------------------------- | ------------- | ------------- |
| Autenticación      | Iniciar sesión y acceder según el rol | RF-007 / HU-002                 | RN-011, RN-012          | CP-016 a CP-018, CP-020, CP-021 |               |               |
| Control de acceso  | Validar ingreso por huella            | RF-003, RF-004 / HU-005, HU-006 | RN-002, RN-008 a RN-010 | CP-007 a CP-011, CP-019         |               |               |
| Membresías y pagos | Asignar, renovar y consultar pagos    | RF-005, RF-006 / HU-004, HU-008 | RN-003 a RN-005, RN-011 | CP-012 a CP-015                 |               |               |

### 10.2 Pruebas de API

| **Aspecto**           | **Criterio**                | **Casos / evidencia** |
| --------------------- | --------------------------- | --------------------- |
| Métodos y rutas       | Uso consistente de contrato |                       |
| Códigos HTTP          | Representan resultado real  |                       |
| Validación de entrada | Datos inválidos rechazados  |                       |
| Formato de respuesta  | Estructura consistente      |                       |
| Errores               | Sin trazas ni secretos      |                       |
| Paginación y filtros  | Límites y consistencia      |                       |
| Idempotencia          | Sin duplicación no deseada  |                       |
| Versionamiento        | Compatibilidad controlada   |                       |

### 10.3 Persistencia e integridad

| **Prueba**           | **Objetivo**               | **Resultado esperado**   | **Evidencia** |
| -------------------- | -------------------------- | ------------------------ | ------------- |
| Migración desde cero | Crear estructura completa  | Instalación reproducible |               |
| Restricciones        | Rechazar estados inválidos | Integridad en BD         |               |
| Transacción          | Evitar estados parciales   | Rollback correcto        |               |
| Borrado              | Aplicar política definida  | Trazabilidad preservada  |               |
| Semillas             | Cargar datos controlados   | Sin datos sensibles      |               |

## 11\. Pruebas de seguridad y autorización

### 11.1 Alcance de seguridad

| **Control**           | **Aplica** | **Prueba prevista**                   | **Criterio de aceptación**                | **Evidencia** |
| --------------------- | ---------- | ------------------------------------- | ----------------------------------------- | ------------- |
| Autenticación         | Sí         | CP-016, CP-017                        | No revela información sensible            |               |
| Autorización servidor | Sí         | CP-018, CP-021                        | No se eluden permisos modificando cliente |               |
| Sesión / tokens       | Sí         | CP-020 (token vencido o ausente)      | Expiración y revocación definidas         |               |
| Inyección             | Sí         | Revisión de repositorios              | Entradas tratadas correctamente           |               |
| XSS / CSRF            | Sí         | Revisión de salidas en React          | Control acorde a tecnología               |               |
| Secretos              | Sí         | Revisión de .gitignore y .env.example | Sin credenciales reales                   |               |
| Dependencias          | Sí         | npm audit                             | Sin críticas sin tratamiento              |               |
| Datos personales      | Sí         | Respuestas sin template\_hash         | Acceso y minimización controlados         |               |

### 11.2 Matriz de autorización

| **Rol**  | **Recurso**                    | **Acción permitida** | **Acción denegada**      | **Caso positivo** | **Caso negativo** |
| -------- | ------------------------------ | -------------------- | ------------------------ | ----------------- | ----------------- |
| Empleado | Planes                         | Consultar            | Crear, editar y eliminar | CP-004            | CP-006            |
| Empleado | Registro financiero / personal | —                    | Consultar y modificar    | CP-014            | CP-015, CP-021    |

### 11.3 Registro de hallazgos de seguridad

| **ID**  | **Hallazgo** | **Severidad**                 | **Activo** | **Evidencia** | **Tratamiento** | **Estado** |
| ------- | ------------ | ----------------------------- | ---------- | ------------- | --------------- | ---------- |
| SEC-001 |              | Crítica / alta / media / baja |            |               |                 |            |
| SEC-002 |              |                               |            |               |                 |            |

## 12\. Pruebas de rendimiento y confiabilidad

### 12.1 Objetivos medibles

| **ID RNF** | **Operación**                   | **Carga / volumen**      | **Métrica** | **Umbral** | **Ambiente** | **Herramienta** |
| ---------- | ------------------------------- | ------------------------ | ----------- | ---------- | ------------ | --------------- |
| RNF-003    | POST /api/acceso-fisico/validar | 400 clientes registrados | p95         | \< 2 s     | AMB-QA       |                 |
| RNF-004    | Disponibilidad                  | Horario de atención      | Porcentaje  | 99,9 %     | AMB-PROD     |                 |

### 12.2 Escenarios de rendimiento

| **ID**   | **Tipo** | **Descripción** | **Usuarios / volumen** | **Duración** | **Criterio** | **Resultado** |
| -------- | -------- | --------------- | ---------------------- | ------------ | ------------ | ------------- |
| PERF-001 | Carga    |                 |                        |              |              |               |
| PERF-002 | Estrés   |                 |                        |              |              |               |
| PERF-003 | Volumen  |                 |                        |              |              |               |

### 12.3 Confiabilidad y recuperación

| **Escenario**                     | **Fallo simulado** | **Comportamiento esperado**     | **Tiempo recuperación** | **Evidencia** |
| --------------------------------- | ------------------ | ------------------------------- | ----------------------- | ------------- |
| Servicio externo no disponible    |                    | Respuesta controlada            |                         |               |
| Base de datos temporalmente caída |                    | Sin pérdida silenciosa          |                         |               |
| Restauración de backup            |                    | Datos recuperados y verificados |                         |               |
| Rollback de versión               |                    | Servicio operativo              |                         |               |

## 13\. Pruebas UX, accesibilidad y compatibilidad

### 13.1 Usabilidad

| **Tarea crítica**                | **Perfil**            | **Meta de éxito** | **Tiempo objetivo** | **Resultado** | **Hallazgo** |
| -------------------------------- | --------------------- | ----------------- | ------------------- | ------------- | ------------ |
| Registrar un cliente nuevo       | PER-002 Recepcionista | ≥ 80 % sin ayuda  | \< 2 min (RNF-002)  |               |              |
| Renovar una membresía por cédula | PER-002 Recepcionista | ≥ 80 % sin ayuda  |                     |               |              |

### 13.2 Accesibilidad

| **Criterio**             | **Método**                      | **Aplica** | **Resultado** | **Evidencia** |
| ------------------------ | ------------------------------- | ---------- | ------------- | ------------- |
| Navegación por teclado   | Prueba manual                   | Sí / No    |               |               |
| Foco visible             | Prueba manual                   | Sí / No    |               |               |
| Etiquetas y mensajes     | Lector de pantalla / inspección | Sí / No    |               |               |
| Contraste                | Herramienta                     | Sí / No    |               |               |
| Semántica de encabezados | Auditoría                       | Sí / No    |               |               |
| Alternativas de imágenes | Auditoría                       | Sí / No    |               |               |
| Zoom y reflow            | Prueba visual                   | Sí / No    |               |               |

### 13.3 Compatibilidad

| **Plataforma**               | **Versión / resolución** | **Flujos probados** | **Resultado** | **Observaciones** |
| ---------------------------- | ------------------------ | ------------------- | ------------- | ----------------- |
| Chrome                       | Dos últimas versiones    |                     |               |                   |
| Firefox                      | Dos últimas versiones    |                     |               |                   |
| Edge                         | Dos últimas versiones    |                     |               |                   |
| Android / iOS                |                          |                     |               |                   |
| Escritorio / móvil / tableta | 360 px a 1920 px         |                     |               |                   |

## 14\. Gestión de defectos y regresión

### 14.1 Flujo de estados

**Nuevo → Analizado → Asignado → En corrección → Listo para verificar → Cerrado / Reabierto / Rechazado / Diferido**

### 14.2 Registro de defectos

| **ID**  | **Título** | **Severidad** | **Prioridad** | **Ambiente** | **Versión** | **Caso**  | **Responsable** | **Estado** |
| ------- | ---------- | ------------- | ------------- | ------------ | ----------- | --------- | --------------- | ---------- |
| DEF-001 |            | Alta          | P1            | AMB-QA       |             | CP-\_\_\_ |                 | Nuevo      |
| DEF-002 |            |               |               |              |             |           |                 |            |

### 14.3 Ficha de defecto

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
<td>DEF-___ – _____________________</td>
</tr>
<tr class="even">
<td>Descripción</td>
<td></td>
</tr>
<tr class="odd">
<td>Pasos para reproducir</td>
<td>1.<br />
2.<br />
3.</td>
</tr>
<tr class="even">
<td>Resultado esperado</td>
<td></td>
</tr>
<tr class="odd">
<td>Resultado obtenido</td>
<td></td>
</tr>
<tr class="even">
<td>Ambiente / build</td>
<td></td>
</tr>
<tr class="odd">
<td>Severidad / prioridad</td>
<td></td>
</tr>
<tr class="even">
<td>Evidencia</td>
<td>EV-___</td>
</tr>
<tr class="odd">
<td>Causa raíz</td>
<td></td>
</tr>
<tr class="even">
<td>Corrección aplicada</td>
<td></td>
</tr>
<tr class="odd">
<td>Prueba de regresión</td>
<td>CP-___</td>
</tr>
<tr class="even">
<td>Estado / responsable</td>
<td></td>
</tr>
</tbody>
</table>

### 14.4 Criterios de severidad

| **Severidad** | **Definición**                           | **Ejemplo**          | **Condición de liberación** |
| ------------- | ---------------------------------------- | -------------------- | --------------------------- |
| Bloqueante    | Impide flujo crítico o evaluación        | Sistema no inicia    | No se libera                |
| Crítica       | Seguridad, pérdida o corrupción de datos | Acceso no autorizado | No se libera                |
| Alta          | Función principal falla sin alternativa  | No permite registrar | Debe corregirse             |
| Media         | Falla con alternativa                    | Filtro incorrecto    | Puede aceptarse con plan    |
| Baja          | Cosmética o menor                        | Alineación visual    | Puede diferirse             |

## 15\. Evidencias, métricas y reportes

### 15.1 Catálogo de evidencias

| **ID** | **Tipo**                | **Descripción** | **Caso / defecto** | **Ubicación** | **Versión** | **Responsable** |
| ------ | ----------------------- | --------------- | ------------------ | ------------- | ----------- | --------------- |
| EV-001 | Reporte / captura / log |                 | CP-\_\_\_          |               |             |                 |
| EV-002 |                         |                 | DEF-\_\_\_         |               |             |                 |

### 15.2 Reglas de evidencia

  - Debe identificar versión, ambiente, fecha y responsable.

  - Debe permitir comprobar el resultado sin depender de una explicación oral.

  - No debe contener datos sensibles ni secretos.

  - Las capturas se usan como apoyo, no como sustituto de logs o reportes cuando estos existan.

  - La evidencia debe estar almacenada en ubicación estable y trazable.

### 15.3 Métricas de calidad

| **Indicador**                   | **Fórmula / método**                   | **Meta**            | **Frecuencia** | **Resultado** |
| ------------------------------- | -------------------------------------- | ------------------- | -------------- | ------------- |
| Cobertura de requisitos         | Requisitos con prueba aprobada / total | 100 % críticos      |                |               |
| Tasa de aprobación              | Casos aprobados / ejecutados           |                     |                |               |
| Defectos abiertos por severidad | Conteo                                 | 0 críticos abiertos |                |               |
| Densidad de defectos            | Defectos / módulo o tamaño             |                     |                |               |
| Reapertura                      | Defectos reabiertos / cerrados         |                     |                |               |
| Tiempo medio de corrección      | Promedio desde registro a cierre       |                     |                |               |
| Cobertura de código             | Herramienta                            |                     |                |               |

### 15.4 Reporte de ejecución

| **Ciclo** | **Fecha** | **Versión** | **Planificados** | **Ejecutados** | **Aprobados** | **Fallidos** | **Bloqueados** | **Conclusión** |
| --------- | --------- | ----------- | ---------------- | -------------- | ------------- | ------------ | -------------- | -------------- |
| CIC-01    |           |             |                  |                |               |              |                |                |
| CIC-02    |           |             |                  |                |               |              |                |                |

## 16\. Pruebas de aceptación y decisión de liberación

### 16.1 Plan de aceptación

| **Elemento**             | **Definición**                                                           |
| ------------------------ | ------------------------------------------------------------------------ |
| Representante que acepta | Liliana Sofía Panesso Méndez (Product Owner) en representación de STK-01 |
| Versión candidata        | v1.0.0                                                                   |
| Ambiente                 | AMB-UAT                                                                  |
| Alcance                  | Flujos críticos FLU-001 a FLU-005                                        |
| Datos                    | DATA-001, DATA-002                                                       |
| Criterios de entrada     |                                                                          |
| Criterios de aceptación  |                                                                          |
| Defectos tolerados       |                                                                          |
| Fecha y duración         |                                                                          |

### 16.2 Registro de aceptación

| **Criterio / HU**     | **Caso**  | **Resultado**      | **Evidencia** | **Observación** | **Decisión** |
| --------------------- | --------- | ------------------ | ------------- | --------------- | ------------ |
| HU-\_\_\_ / CA-\_\_\_ | CP-\_\_\_ | Aprobado / fallido | EV-\_\_\_     |                 |              |
|                       |           |                    |               |                 |              |

### 16.3 Evaluación Go / No-Go

| **Factor**                 | **Estado**         | **Evidencia** | **Riesgo residual** | **Decisión** |
| -------------------------- | ------------------ | ------------- | ------------------- | ------------ |
| Flujos críticos            | Cumple / No cumple |               |                     |              |
| Seguridad crítica          |                    |               |                     |              |
| Migraciones y datos        |                    |               |                     |              |
| Pruebas automatizadas / CI |                    |               |                     |              |
| Defectos residuales        |                    |               |                     |              |
| Documentación y despliegue |                    |               |                     |              |
| Aceptación funcional       |                    |               |                     |              |

### 16.4 Acta de decisión

| **Campo**                 | **Contenido**                                  |
| ------------------------- | ---------------------------------------------- |
| Decisión                  | Liberar / Liberar con condiciones / No liberar |
| Versión                   |                                                |
| Condiciones o pendientes  |                                                |
| Riesgos aceptados         |                                                |
| Responsable de aceptación |                                                |
| Fecha                     |                                                |
| Firmas / evidencia        |                                                |

## 17\. Cierre de pruebas y lecciones aprendidas

### 17.1 Resumen final

| **Elemento**                    | **Resultado** |
| ------------------------------- | ------------- |
| Alcance ejecutado               |               |
| Casos planificados / ejecutados |               |
| Cobertura alcanzada             |               |
| Defectos encontrados / cerrados |               |
| Defectos pendientes             |               |
| Riesgos residuales              |               |
| Recomendación final             |               |

### 17.2 Defectos y riesgos pendientes

| **ID**     | **Descripción** | **Impacto** | **Responsable** | **Fecha objetivo** | **Aceptado por** |
| ---------- | --------------- | ----------- | --------------- | ------------------ | ---------------- |
| DEF-\_\_\_ |                 |             |                 |                    |                  |
| RC-\_\_\_  |                 |             |                 |                    |                  |

### 17.3 Lecciones aprendidas

| **Situación** | **Qué funcionó** | **Qué no funcionó** | **Acción futura** | **Responsable** |
| ------------- | ---------------- | ------------------- | ----------------- | --------------- |
|               |                  |                     |                   |                 |
|               |                  |                     |                   |                 |

### 17.4 Criterios de cierre documental

  - Todos los resultados y evidencias están versionados.

  - La matriz de trazabilidad refleja el estado final.

  - Los defectos pendientes tienen decisión y responsable.

  - El informe de pruebas fue revisado y aprobado.

  - Los scripts y suites pueden ejecutarse con instrucciones documentadas.

  - La información sensible fue retirada de las evidencias.

## Anexo A. Lista de verificación de aprobación

| **N.°** | **Verificación**                                             | **Cumple**     | **Evidencia / observación** |
| ------- | ------------------------------------------------------------ | -------------- | --------------------------- |
| 1       | El alcance y los riesgos de calidad están definidos.         | Sí / No / N.A. |                             |
| 2       | Los casos críticos trazan a requisitos, reglas o riesgos.    | Sí / No / N.A. |                             |
| 3       | Los ambientes y datos son reproducibles y seguros.           | Sí / No / N.A. |                             |
| 4       | Existen pruebas unitarias e integración para lógica crítica. | Sí / No / N.A. |                             |
| 5       | Las autorizaciones permitidas y denegadas fueron probadas.   | Sí / No / N.A. |                             |
| 6       | Los defectos tienen severidad, estado y evidencia.           | Sí / No / N.A. |                             |
| 7       | La cobertura fue medida y analizada.                         | Sí / No / N.A. |                             |
| 8       | El pipeline ejecuta verificaciones acordadas.                | Sí / No / N.A. |                             |
| 9       | Los flujos críticos no presentan defectos bloqueantes.       | Sí / No / N.A. |                             |
| 10      | La accesibilidad básica fue verificada.                      | Sí / No / N.A. |                             |
| 11      | Los RNF aplicables tienen método y resultado.                | Sí / No / N.A. |                             |
| 12      | La aceptación fue realizada por un representante válido.     | Sí / No / N.A. |                             |
| 13      | La recomendación de liberación está documentada.             | Sí / No / N.A. |                             |
| 14      | La documentación coincide con la versión evaluada.           | Sí / No / N.A. |                             |

## Anexo B. Plantilla rápida de caso de prueba

<table>
<thead>
<tr class="header">
<th><strong>Campo</strong></th>
<th><strong>Contenido</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ID / título</td>
<td>CP-___ – _____________________</td>
</tr>
<tr class="even">
<td>Trazabilidad</td>
<td>RF-___ / RNF-___ / HU-___ / CU-___ / RN-___</td>
</tr>
<tr class="odd">
<td>Prioridad / tipo</td>
<td></td>
</tr>
<tr class="even">
<td>Precondiciones</td>
<td></td>
</tr>
<tr class="odd">
<td>Datos</td>
<td></td>
</tr>
<tr class="even">
<td>Pasos</td>
<td>1.<br />
2.<br />
3.</td>
</tr>
<tr class="odd">
<td>Resultado esperado</td>
<td></td>
</tr>
<tr class="even">
<td>Ambiente / versión</td>
<td></td>
</tr>
<tr class="odd">
<td>Resultado / evidencia</td>
<td></td>
</tr>
<tr class="even">
<td>Defecto</td>
<td>DEF-___</td>
</tr>
<tr class="odd">
<td>Responsable / fecha</td>
<td></td>
</tr>
</tbody>
</table>

### Anexo C. Estructura recomendada del repositorio

/docs/calidad/plan-pruebas.docx  
/docs/calidad/reportes/  
/docs/calidad/evidencias/  
/tests/unit/  
/tests/integration/  
/tests/e2e/  
/tests/fixtures/  
.github/workflows/ci.yml  
coverage/ (generado, no necesariamente versionado)

### Anexo D. Criterio mínimo de aprobabilidad

<table>
<tbody>
<tr class="odd">
<td><p><strong>Condición mínima</strong></p>
<p>El proyecto no debe considerarse aprobable si los flujos críticos no ejecutan, existen fallas críticas de seguridad, no hay trazabilidad entre requisitos y pruebas, la base de datos no es reproducible, la aplicación no puede instalarse o el equipo no comprende las pruebas y resultados presentados.</p></td>
</tr>
</tbody>
</table>
