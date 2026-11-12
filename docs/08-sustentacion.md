# Guía de sustentación técnica y demostración

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/07_Evaluacion/Guia_de_Sustentacion_ZonaFitEvolution.pdf`](entregables/07_Evaluacion/Guia_de_Sustentacion_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Versión** | **Fecha**  | **Cambio**                                                                   | **Elaboró**            | **Revisó** | **Aprobó** | **Estado** |
| ----------- | ---------- | ---------------------------------------------------------------------------- | ---------------------- | ---------- | ---------- | ---------- |
| 0.1         | 03/11/2026 | Borrador de agenda, flujos de demostración y reparto por integrante          | Juan Diego Mejía Llano |            |            | Borrador   |
| 0.2         | 10/11/2026 | Demostración con el sensor AS608 y prueba de huella duplicada; sin simulador | Juan Diego Mejía Llano |            |            | Borrador   |
| 0.3         | 11/11/2026 | Demostración desde la nube (Vercel y Railway) con el agente del lector; lista previa y contingencias | Juan Diego Mejía Llano |            |            | Borrador   |

### Aprobaciones

| **Rol**                | **Nombre**                                   | **Aspecto validado**        | **Fecha** | **Firma / aprobación** |
| ---------------------- | -------------------------------------------- | --------------------------- | --------- | ---------------------- |
| Instructor / evaluador |                                              | Criterios y tiempos         |           |                        |
| Líder del proyecto     | Juan Diego Mejía Llano                       | Correspondencia con entrega |           |                        |
| Responsable funcional  | Liliana Sofía Panesso Méndez (Product Owner) | Flujos y valor demostrado   |           |                        |

## 1\. Propósito, alcance y principios

La sustentación es una evaluación técnica y funcional de la solución entregada. Debe probar que el proyecto resuelve el problema definido, que los flujos críticos funcionan y que cada integrante comprende el sistema más allá de su tarea puntual.

### 1.1 Principios rectores

  - Demostrar antes que prometer.

  - Presentar la versión final etiquetada y documentada.

  - Sustentar con evidencia verificable.

  - Diferenciar decisiones, hechos, limitaciones y trabajo futuro.

  - Distribuir la participación sin fragmentar el conocimiento.

  - Reconocer fallos y deuda técnica con honestidad.

  - Declarar el uso de IA y demostrar comprensión completa.

<table>
<tbody>
<tr class="odd">
<td><strong>Criterio crítico<br />
</strong>Una presentación pulida no compensa un producto que no ejecuta, no puede instalarse, contiene fallas críticas de seguridad o no puede ser explicado por sus autores.</td>
</tr>
</tbody>
</table>

## 2\. Formato recomendado de la sustentación

| **Etapa**                    | **Tiempo sugerido** | **Objetivo**                                        | **Responsable**                                                                 |
| ---------------------------- | ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| Apertura                     | 2 min               | Identificar problema, usuarios y propuesta de valor | Juan Diego Mejía Llano                                                          |
| Alcance y requisitos         | 3 min               | Explicar qué se comprometió y entregó               | Juan Diego Mejía Llano                                                          |
| Arquitectura y datos         | 4 min               | Justificar estructura, tecnologías y decisiones     | Liliana Sofía Panesso Méndez                                                    |
| Demostración funcional       | 8-12 min            | Ejecutar flujos críticos de principio a fin         | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla |
| Calidad, seguridad y pruebas | 4 min               | Mostrar evidencia ejecutable                        | Liliana Sofía Panesso Méndez                                                    |
| Despliegue y operación       | 2 min               | Probar acceso, versión y reproducibilidad           | Liliana Sofía Panesso Méndez                                                    |
| Resultados y cierre          | 2 min               | Exponer indicadores, pendientes y trabajo futuro    | Juan Diego Mejía Llano                                                          |
| Preguntas técnicas           | 10-20 min           | Comprobar comprensión individual                    | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla |

<table>
<tbody>
<tr class="odd">
<td><strong>Adaptación<br />
</strong>El instructor puede ajustar los tiempos según tamaño del equipo y complejidad. Debe conservarse tiempo suficiente para preguntas individuales; una sustentación sin preguntas evalúa exposición, no dominio técnico.</td>
</tr>
</tbody>
</table>

### 2.1 Reglas logísticas

| **Aspecto**  | **Regla**                                                        |
| ------------ | ---------------------------------------------------------------- |
| Versión      | Usar una etiqueta o commit final identificable.                  |
| Ambiente     | Preferir ambiente desplegado; mantener alternativa reproducible. |
| Datos        | Usar datos ficticios o autorizados.                              |
| Conectividad | Preparar contingencia sin ocultar que es una contingencia.       |
| Equipos      | Probar proyector, audio, resolución y credenciales antes.        |
| Material     | Presentación breve; documentación y repositorio disponibles.     |
| Tiempo       | Respetar el límite y priorizar demostración.                     |

## 3\. Preparación previa

### 3.1 Lista de preparación del equipo

| **N.°** | **Verificación**                                                          | **Cumple** | **Evidencia / observación** |
| ------- | ------------------------------------------------------------------------- | ---------- | --------------------------- |
| 1       | Versión final etiquetada y desplegada.                                    | Sí / No    | Desplegada en Vercel y Railway; revisar /api/salud 30 min antes |
| 2       | README y manuales actualizados.                                           | Sí / No    |                             |
| 3       | Migraciones y datos semilla probados.                                     | Sí / No    |                             |
| 4       | Flujos críticos ensayados con datos controlados.                          | Sí / No    |                             |
| 5       | Cuentas de demostración por rol.                                          | Sí / No    |                             |
| 6       | Pruebas y pipeline ejecutados.                                            | Sí / No    |                             |
| 7       | Evidencias organizadas y accesibles.                                      | Sí / No    |                             |
| 8       | Plan de contingencia preparado.                                           | Sí / No    |                             |
| 9       | Participación y transiciones ensayadas.                                   | Sí / No    |                             |
| 10      | Cada integrante puede explicar arquitectura, reglas, seguridad y pruebas. | Sí / No    |                             |

### 3.2 Guion maestro

| **Bloque**          | **Mensaje principal**                                                    | **Evidencia que se mostrará**      | **Duración** | **Responsable**                                                                 |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------- | ------------ | ------------------------------------------------------------------------------- |
| Problema y valor    | Ingresos con membresía vencida y filas en la recepción                   | Formulación (INI-01)               |              | Juan Diego Mejía Llano                                                          |
| Alcance             | MVP, exclusiones y cambios (CR-001 a CR-006)                             | Alcance (REQ-01) y backlog en Jira |              | Juan Diego Mejía Llano                                                          |
| Arquitectura        | Capas, patrones (State, Adapter, Facade, Singleton) y modelo de 7 tablas | ARQ-01 y código                    |              | Liliana Sofía Panesso Méndez                                                    |
| Demostración        | Flujos DEM-01 a DEM-05                                                   | Aplicación en vivo                 |              | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla |
| Pruebas y seguridad | Casos críticos, JWT, bcrypt, hash de huellas y permisos en servidor      | CAL-01 y evidencias                |              | Liliana Sofía Panesso Méndez                                                    |
| Cierre              | Resultados, limitaciones (DT-01 a DT-12) y siguientes pasos              | Informe de cierre                  |              | Juan Diego Mejía Llano                                                          |

## 4\. Estructura de la presentación

| **Diapositiva / bloque** | **Contenido obligatorio**                     | **Evitar**                          |
| ------------------------ | --------------------------------------------- | ----------------------------------- |
| 1\. Identificación       | Proyecto, equipo, cliente o contexto, versión | Portadas saturadas                  |
| 2\. Problema             | Situación, causas, población e impacto        | Redactar el problema como solución  |
| 3\. Objetivos y valor    | Objetivo general, beneficios e indicadores    | Listas extensas sin medición        |
| 4\. Alcance              | MVP, incluidos, excluidos y cambios           | Prometer funciones no entregadas    |
| 5\. Usuarios y procesos  | Roles y flujos críticos                       | Describir todos los CRUD            |
| 6\. Arquitectura         | Diagrama y decisiones principales             | Diagrama ilegible o genérico        |
| 7\. Datos                | Modelo y reglas de integridad                 | Mostrar tablas sin explicar dominio |
| 8\. Seguridad            | Amenazas y controles aplicados                | Decir solo “usamos JWT”             |
| 9\. Pruebas              | Estrategia, resultados y defectos             | Usar cobertura como única medida    |
| 10\. Despliegue          | Ambientes, URL, CI y operación                | Omitir instalación o rollback       |
| 11\. Resultados          | Indicadores, limitaciones y trabajo futuro    | Ocultar pendientes                  |
| 12\. Cierre              | Conclusión y enlaces de entrega               | Repetir toda la exposición          |

## 5\. Diseño de la demostración funcional

La demostración debe contar una historia de uso coherente. No debe consistir en abrir pantallas al azar ni recorrer menús sin objetivo.

### 5.1 Selección de flujos

| **ID** | **Flujo**                             | **Rol**                  | **Requisito / HU**              | **Datos preparados**                            | **Resultado esperado**                                 | **Tiempo** |
| ------ | ------------------------------------- | ------------------------ | ------------------------------- | ----------------------------------------------- | ------------------------------------------------------ | ---------- |
| DEM-01 | Iniciar sesión y menú por rol         | Administrador y Empleado | RF-007 / HU-002                 | Dos usuarios creados con crear-admin y Personal | Cada rol ve solo sus opciones                          |            |
| DEM-02 | Registrar cliente y asignar membresía | Empleado                 | RF-001, RF-005 / HU-001, HU-004 | Cédula nueva; plan mensual activo               | Membresía activa con fecha de fin calculada            |            |
| DEM-03 | Registrar huella y validar acceso     | Empleado / socio         | RF-003, RF-004 / HU-005, HU-006 | Cliente con membresía activa y otro vencido     | Permitido y denegado con motivo; ambos en el historial |            |
| DEM-04 | Renovar por cédula                    | Empleado                 | RF-005 / HU-004                 | Cliente con membresía vigente                   | La nueva empieza al día siguiente del vencimiento      |            |
| DEM-05 | Registro financiero                   | Administrador            | RF-006 / HU-008                 | Clientes con pagos                              | Resumen y detalle de pagos por cliente                 |            |

### 5.2 Secuencia recomendada

1.  Mostrar estado inicial y rol del usuario.

2.  Explicar brevemente la necesidad que se resolverá.

3.  Ejecutar la acción principal sin saltar validaciones.

4.  Mostrar una validación o escenario negativo relevante.

5.  Confirmar persistencia, permisos o resultado.

6.  Relacionar el resultado con requisito y prueba.

7.  Cerrar el flujo y pasar al siguiente escenario.

### 5.3 Estados que conviene demostrar

| **Estado**               | **Qué demuestra**               | **Cuándo incluirlo**               |
| ------------------------ | ------------------------------- | ---------------------------------- |
| Éxito                    | Flujo principal completo        | Siempre                            |
| Validación               | Control de datos inválidos      | Formularios y reglas críticas      |
| Sin permisos             | Autorización real               | Sistemas con roles                 |
| Vacío                    | Experiencia sin datos           | Listados o dashboards              |
| Error controlado         | Respuesta segura y comprensible | Integraciones o fallos previsibles |
| Auditoría                | Trazabilidad de acciones        | Operaciones sensibles              |
| Concurrencia / conflicto | Integridad y reglas             | Reservas, inventario o cupos       |

## 6\. Demostración técnica y evidencia

| **Área**      | **Evidencia recomendada**         | **Explicación mínima**                          |
| ------------- | --------------------------------- | ----------------------------------------------- |
| Repositorio   | Historial, ramas, PR y etiqueta   | Cómo evolucionó el trabajo y quién contribuyó   |
| Arquitectura  | Diagramas y estructura real       | Por qué se eligió y cómo coincide con el código |
| Base de datos | Migraciones, restricciones y seed | Cómo se garantiza integridad y reproducibilidad |
| API           | OpenAPI, validaciones y errores   | Contrato, autenticación y consistencia          |
| Pruebas       | Ejecución y reporte               | Qué riesgos cubren y qué queda fuera            |
| CI/CD         | Pipeline aprobado                 | Qué verifica y qué bloquea                      |
| Seguridad     | Pruebas y configuración           | Controles de acceso, secretos y dependencias    |
| Despliegue    | URL, versión y health check       | Ambiente, observabilidad y rollback             |

<table>
<tbody>
<tr class="odd">
<td><strong>Mostrar con criterio<br />
</strong>No es necesario abrir cada archivo. Seleccione evidencia que pruebe decisiones y resultados. El exceso de ventanas y terminales sin narrativa convierte la demostración en turismo por el repositorio.</td>
</tr>
</tbody>
</table>

## 7\. Participación y evaluación individual

| **Integrante**               | **Responsabilidad principal**  | **Bloque de exposición**          | **Flujo que demuestra** | **Temas que debe poder responder**           |
| ---------------------------- | ------------------------------ | --------------------------------- | ----------------------- | -------------------------------------------- |
| Juan Diego Mejía Llano       | Líder, Scrum Master y frontend | Problema, alcance y cierre        | DEM-01, DEM-02          | Requisitos, Scrum, React, Git                |
| Liliana Sofía Panesso Méndez | Product Owner y backend        | Arquitectura, pruebas y seguridad | DEM-03, DEM-05          | API, base de datos, patrones, JWT            |
| Maileth Begambre Movilla     | UX/UI y apoyo frontend         | Diseño de la interfaz             | DEM-04                  | Prototipos, sistema de diseño, accesibilidad |

### 7.1 Conocimiento mínimo común

  - Problema, objetivos, alcance y usuarios.

  - Arquitectura general y flujo de datos.

  - Reglas de negocio críticas.

  - Modelo de seguridad y permisos.

  - Estrategia de pruebas y despliegue.

  - Limitaciones, deuda técnica y trabajo futuro.

### 7.2 Evidencia individual

| **Fuente**      | **Qué puede demostrar**       | **Limitación**                          |
| --------------- | ----------------------------- | --------------------------------------- |
| Commits         | Cambios realizados            | Cantidad no equivale a calidad          |
| Pull requests   | Revisión y colaboración       | Debe revisarse contenido                |
| Issues / tareas | Responsabilidad y seguimiento | Puede no reflejar implementación        |
| Actas           | Decisiones y participación    | Requiere correspondencia con resultados |
| Sustentación    | Comprensión actual            | Debe contrastarse con evidencias        |

## 8\. Banco de preguntas técnicas sugeridas

| **Área**      | **Pregunta**                                                               |
| ------------- | -------------------------------------------------------------------------- |
| Formulación   | ¿Qué evidencia demuestra que el problema existe?                           |
| Alcance       | ¿Qué se dejó fuera y por qué?                                              |
| Requisitos    | ¿Cómo se verifica un RNF concreto?                                         |
| Arquitectura  | ¿Qué alternativa descartaron y cuál fue el costo de la decisión?           |
| Datos         | ¿Qué impide una inconsistencia crítica?                                    |
| Backend       | ¿Dónde vive la regla de negocio más importante?                            |
| Frontend      | ¿Cómo gestionan carga, error y sesión expirada?                            |
| Seguridad     | ¿Cómo impedirían que un usuario modifique el cliente para elevar permisos? |
| Pruebas       | ¿Qué prueba fallaría si cambia esta regla?                                 |
| Git           | ¿Cómo identifican la versión exacta desplegada?                            |
| Despliegue    | ¿Cómo revierten una versión defectuosa?                                    |
| Operación     | ¿Qué observarían primero ante una caída?                                   |
| IA            | ¿Qué partes fueron asistidas y cómo las verificaron?                       |
| Deuda técnica | ¿Qué decisión cambiarían con más tiempo?                                   |

### 8.1 Preguntas de profundización

  - ¿Puede mostrarlo en el código o la evidencia?

  - ¿Qué ocurre en el escenario contrario?

  - ¿Cómo se prueba esa afirmación?

  - ¿Qué riesgo introduce esa decisión?

  - ¿Qué cambiaría si aumenta el volumen?

  - ¿Qué parte implementó usted y qué revisó del resto?

## 9\. Uso de inteligencia artificial y autoría

| **Aspecto**                          | **Información a declarar**                              |
| ------------------------------------ | ------------------------------------------------------- |
| Herramientas utilizadas              |                                                         |
| Finalidad                            | Análisis, código, pruebas, documentación, diseño u otra |
| Partes asistidas                     |                                                         |
| Validaciones realizadas              |                                                         |
| Cambios aplicados por el equipo      |                                                         |
| Riesgos o limitaciones identificados |                                                         |

<table>
<tbody>
<tr class="odd">
<td><strong>Regla de autoría<br />
</strong>El uso de IA no invalida el proyecto. Sí lo invalida entregar contenido que el equipo no comprende, no ha probado o no puede mantener. La responsabilidad técnica y académica permanece en los autores.</td>
</tr>
</tbody>
</table>

## 10\. Plan de contingencia para la demostración

| **Riesgo**             | **Prevención**                                      | **Contingencia permitida**               | **Evidencia de que no se oculta el fallo** |
| ---------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Falla de internet      | Datos del celular para el portátil del lector; instalación local verificada el día anterior | Demostración en ambiente local (TIPO\_LECTOR=as608) | Mostrar «Lector desconectado» y /api/salud |
| Agente del lector apagado | Arrancar AgenteLector (npm start) 30 min antes y comprobar «lector conectado» en /api/salud | Volver a abrir el agente; validación manual por cédula | Consola del agente |
| Vence la prueba de Railway | Pasar a Railway Hobby antes del 10/12/2026 | Ambiente local con el respaldo de la base | Panel Usage de Railway |
| Servicio externo caído | Revisar Vercel, Railway y /api/salud antes de iniciar | Ambiente local con la misma versión      |                                            |
| Datos corruptos        | Respaldo con mysqldump de la base de Railway el 11/12/2026 | Restaurar el respaldo                    |                                            |
| Proyector incompatible | Probar el equipo y adaptadores                      | Segundo portátil                         |                                            |
| Pipeline lento         | No aplica (no hay pipeline)                         | —                                        |                                            |
| Error inesperado       | Ensayo completo de DEM-01 a DEM-05                  | Mostrar el caso de prueba y la evidencia |                                            |

<table>
<tbody>
<tr class="odd">
<td><strong>No confundir contingencia con simulación<br />
</strong>Un video o capturas pueden apoyar la explicación, pero no deben reemplazar la ejecución del producto salvo una falla externa demostrable y autorizada.</td>
</tr>
</tbody>
</table>

## 11\. Errores frecuentes en la sustentación

| **Error**                                 | **Consecuencia**                | **Corrección**                          |
| ----------------------------------------- | ------------------------------- | --------------------------------------- |
| Leer diapositivas                         | No demuestra dominio            | Usar diapositivas como apoyo visual     |
| Demostrar solo el camino feliz            | Oculta reglas y controles       | Incluir un escenario negativo           |
| Mostrar todo el sistema                   | Consume tiempo y pierde foco    | Seleccionar flujos críticos             |
| Usar términos sin justificar              | Genera respuestas superficiales | Relacionar tecnología con necesidad     |
| Dividir el sistema por integrante         | Nadie comprende el conjunto     | Exigir conocimiento común               |
| Ocultar fallos                            | Reduce credibilidad             | Explicar causa, impacto y plan          |
| Improvisar datos                          | Provoca errores o exposición    | Preparar dataset seguro                 |
| Depender de internet                      | Aumenta riesgo operativo        | Preparar alternativa reproducible       |
| Hablar de funciones futuras como actuales | Desinforma al evaluador         | Separar entregado y futuro              |
| Responder “lo hizo la IA”                 | Niega autoría y comprensión     | Explicar, verificar y asumir decisiones |

## 12\. Criterios de evaluación de la sustentación

| **Criterio**                      | **Peso sugerido** | **Evidencia observable**                           |
| --------------------------------- | ----------------- | -------------------------------------------------- |
| Claridad del problema y valor     | 10%               | Explicación concreta y alineada con objetivos      |
| Coherencia alcance-producto       | 10%               | Lo demostrado corresponde con lo documentado       |
| Demostración funcional            | 25%               | Flujos críticos ejecutados sin errores bloqueantes |
| Dominio técnico                   | 20%               | Respuestas fundamentadas y uso de evidencia        |
| Arquitectura, seguridad y calidad | 15%               | Decisiones justificadas y controles verificables   |
| Contribución individual           | 10%               | Autoría y comprensión demostrables                 |
| Comunicación y manejo del tiempo  | 5%                | Presentación clara y enfocada                      |
| Cierre, limitaciones y futuro     | 5%                | Análisis honesto y priorizado                      |

### 12.1 Condiciones críticas

  - Producto no ejecutable sin contingencia válida.

  - Credenciales o datos sensibles expuestos.

  - Flujos críticos con errores bloqueantes.

  - Incapacidad de explicar arquitectura o código.

  - Diferencias graves entre documentación y producto.

  - Autoría no demostrable o dependencia acrítica de IA.

## 13\. Registro de sustentación

| **Campo**          | **Información**                                     |
| ------------------ | --------------------------------------------------- |
| Proyecto           | Sistema de gestión para gimnasio Zona Fit Evolution |
| Versión evaluada   | v1.0.0                                              |
| Fecha y hora       | 12/12/2026                                          |
| Lugar / medio      |                                                     |
| Duración           |                                                     |
| Evaluadores        |                                                     |
| Enlace a evidencia |                                                     |

| **Integrante**               | **Participación** | **Preguntas asignadas** | **Resultado individual** | **Observaciones** |
| ---------------------------- | ----------------- | ----------------------- | ------------------------ | ----------------- |
| Juan Diego Mejía Llano       |                   |                         |                          |                   |
| Liliana Sofía Panesso Méndez |                   |                         |                          |                   |
| Maileth Begambre Movilla     |                   |                         |                          |                   |

| **Componente**          | **Resultado** | **Hallazgos** | **Acción requerida** |
| ----------------------- | ------------- | ------------- | -------------------- |
| Demostración funcional  |               |               |                      |
| Dominio técnico         |               |               |                      |
| Seguridad y pruebas     |               |               |                      |
| Despliegue y operación  |               |               |                      |
| Documentación y entrega |               |               |                      |

## 14\. Lista de verificación previa a la sustentación

| **N.°** | **Verificación**                     | **Cumple** | **Observación / acción** |
| ------- | ------------------------------------ | ---------- | ------------------------ |
| 1       | Versión final identificada.          | Sí / No    |                          |
| 2       | Aplicación accesible.                | Sí / No    |                          |
| 3       | Cuentas de demo verificadas.         | Sí / No    |                          |
| 4       | Datos ficticios preparados.          | Sí / No    |                          |
| 5       | Flujos críticos ensayados.           | Sí / No    |                          |
| 6       | Escenario negativo seleccionado.     | Sí / No    |                          |
| 7       | Pipeline y pruebas disponibles.      | Sí / No    |                          |
| 8       | Diagramas legibles.                  | Sí / No    |                          |
| 9       | Manual y documentación actualizados. | Sí / No    |                          |
| 10      | Plan de contingencia probado.        | Sí / No    |                          |
| 11      | Uso de IA declarado.                 | Sí / No    |                          |
| 12      | Todos los integrantes preparados.    | Sí / No    |                          |
| 13      | Tiempo total ensayado.               | Sí / No    |                          |
| 14      | Enlaces y evidencias organizados.    | Sí / No    |                          |
| 15      | No existen secretos visibles.        | Sí / No    |                          |

## 15\. Decisión y aprobación

| **Decisión**         | **Condición**                                           |
| -------------------- | ------------------------------------------------------- |
| Aprobado             | Cumple los mínimos y la sustentación demuestra dominio. |
| Aprobado con ajustes | Existen correcciones menores con plazo definido.        |
| Devuelto             | Requiere nueva evidencia o demostración.                |
| No aprobado          | Existe causal crítica o incumplimiento sustancial.      |

| **Rol**                  | **Nombre**                   | **Decisión / concepto** | **Firma / aprobación** | **Fecha** |
| ------------------------ | ---------------------------- | ----------------------- | ---------------------- | --------- |
| Instructor evaluador     |                              |                         |                        |           |
| Responsable funcional    | Liliana Sofía Panesso Méndez |                         |                        |           |
| Líder del proyecto       | Juan Diego Mejía Llano       |                         |                        |           |
| Representante del equipo |                              |                         |                        |           |

## Anexo A. Plantilla de guion de demostración

| **Campo**                       | **Contenido**                                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID del flujo                    | DEM-03 – Registrar huella y validar acceso                                                                                                                                                                                                              |
| Necesidad que demuestra         | Cero ingresos con membresía vencida (OBJ-04).                                                                                                                                                                                                           |
| Rol                             | Empleado                                                                                                                                                                                                                                                |
| Precondiciones                  | Backend y frontend encendidos; sensor AS608 conectado al equipo del backend (PUERTO\_LECTOR).                                                                                                                                                           |
| Datos                           | Cliente A con membresía activa; cliente B con membresía vencida.                                                                                                                                                                                        |
| Pasos                           | 1\. Registrar la huella del cliente A desde Clientes. 2. Intentar registrar el mismo dedo para el cliente B (debe rechazarse). 3. Validar el acceso del cliente A en la pantalla de ingreso. 4. Validar el acceso del cliente B. 5. Abrir el historial. |
| Escenario negativo              | Cliente B: «Acceso denegado – Membresía vencida»; huella no registrada: «Huella no reconocida».                                                                                                                                                         |
| Resultado esperado              | Permitido para A, denegado para B y ambos intentos en el historial.                                                                                                                                                                                     |
| Requisito y prueba relacionados | RF-003, RF-004 / CP-007 a CP-011, CP-022                                                                                                                                                                                                                |
| Tiempo máximo                   |                                                                                                                                                                                                                                                         |
| Responsable                     | Liliana Sofía Panesso Méndez                                                                                                                                                                                                                            |
| Contingencia                    | Si el sensor falla, revisar la conexión del CP2102 y el puerto COM y reiniciar el backend (no existe modo simulador).                                                                                                                                   |

## Anexo B. Plantilla de pregunta individual

| **Campo**            | **Contenido**                        |
| -------------------- | ------------------------------------ |
| Integrante           |                                      |
| Área                 |                                      |
| Pregunta             |                                      |
| Evidencia solicitada |                                      |
| Respuesta resumida   |                                      |
| Nivel de dominio     | Alto / Medio / Bajo / No demostrable |
| Observación          |                                      |

## Anexo C. Convenciones de evidencia

| **Elemento**      | **Código** | **Ejemplo** |
| ----------------- | ---------- | ----------- |
| Demostración      | DEM-\#\#   | DEM-01      |
| Pregunta          | PREG-\#\#  | PREG-01     |
| Hallazgo          | HAL-\#\#   | HAL-01      |
| Evidencia         | EV-\#\#\#  | EV-001      |
| Acción correctiva | AC-\#\#\#  | AC-001      |
