# Formulación y constitución del proyecto

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/01_Inicio_y_Planeacion/Formulacion_y_Constitucion_Proyecto_ZonaFitEvolution.pdf`](entregables/01_Inicio_y_Planeacion/Formulacion_y_Constitucion_Proyecto_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Campo**                  | **Información**                                            |
| -------------------------- | ---------------------------------------------------------- |
| Código del documento       | DOC-01-FCP                                                 |
| Nombre                     | Formulación y Constitución del Proyecto                    |
| Estado                     | En revisión                                                |
| Clasificación              | Documento de formulación y gobierno inicial                |
| Responsable de elaboración | Juan Diego Mejía Llano (líder del proyecto y Scrum Master) |
| Responsable de revisión    |                                                            |
| Responsable de aprobación  |                                                            |
| Repositorio oficial        | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03 |

### Historial de versiones

| **Versión** | **Fecha**  | **Descripción del cambio**                                                                     | **Elaboró**            | **Revisó** | **Aprobó** |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------- | ---------------------- | ---------- | ---------- |
| 0.1         | 20/10/2026 | Creación inicial a partir del documento maestro integrado (v2.3)                               | Juan Diego Mejía Llano |            |            |
| 1.0         | 03/11/2026 | Versión para revisión: problema, objetivos, alcance, entregables, recursos, riesgos y gobierno | Juan Diego Mejía Llano |            |            |
| 1.1         | 10/11/2026 | Sensor AS608 integrado y simulador eliminado; supuestos y dependencias actualizados            | Juan Diego Mejía Llano |            |            |

### Aprobaciones

| **Rol**                | **Nombre**                   | **Decisión**                | **Fecha** | **Firma o evidencia** |
| ---------------------- | ---------------------------- | --------------------------- | --------- | --------------------- |
| Patrocinador / Cliente | Carlos Ramírez (STK-01)      | Aprobado / Requiere ajustes |           |                       |
| Product Owner          | Liliana Sofía Panesso Méndez | Aprobado / Requiere ajustes |           |                       |
| Instructor             |                              | Aprobado / Requiere ajustes |           |                       |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Regla de control</strong></p>
<p>La aprobación de este documento autoriza el inicio formal del proyecto. Los cambios posteriores que afecten objetivos, alcance, entregables, restricciones, recursos o criterios de éxito deberán registrarse y evaluarse mediante el procedimiento de gestión de cambios.</p></td>
</tr>
</tbody>
</table>

**Table of Contents**

[Control documental 2](#control-documental)

> [Historial de versiones 2](#historial-de-versiones)
> 
> [Aprobaciones 2](#aprobaciones)

[1. Propósito y uso del documento 6](#propósito-y-uso-del-documento)

> [1.1 Objetivos del documento 6](#objetivos-del-documento)
> 
> [1.2 Alcance documental 6](#alcance-documental)
> 
> [1.3 Reglas de diligenciamiento 6](#reglas-de-diligenciamiento)

[2. Información general del proyecto 6](#información-general-del-proyecto)

> [2.1 Identificación resumida 7](#identificación-resumida)
> 
> [2.2 Clasificación del proyecto 7](#clasificación-del-proyecto)

[3. Contexto y antecedentes 7](#contexto-y-antecedentes)

> [3.1 Contexto organizacional o sectorial 7](#contexto-organizacional-o-sectorial)
> 
> [3.2 Evidencias iniciales 8](#evidencias-iniciales)

[4. Planteamiento del problema 8](#planteamiento-del-problema)

> [4.1 Enunciado del problema 8](#enunciado-del-problema)
> 
> [4.2 Árbol del problema 8](#árbol-del-problema)
> 
> [4.3 Validación del problema 8](#validación-del-problema)

[5. Justificación 9](#justificación)

> [5.1 Dimensiones de justificación 9](#dimensiones-de-justificación)
> 
> [5.2 Alternativas consideradas 9](#alternativas-consideradas)

[6. Objetivos 10](#objetivos)

> [6.1 Objetivo general 10](#objetivo-general)
> 
> [6.2 Objetivos específicos 10](#objetivos-específicos)
> 
> [6.3 Validación SMART 10](#validación-smart)

[7. Beneficios y valor esperado 10](#beneficios-y-valor-esperado)

> [7.1 Propuesta de valor 11](#propuesta-de-valor)

[8. Indicadores de éxito 11](#indicadores-de-éxito)

> [8.1 Indicadores mínimos sugeridos 11](#indicadores-mínimos-sugeridos)

[9. Alcance preliminar 11](#alcance-preliminar)

> [9.1 Capacidades o módulos incluidos 12](#capacidades-o-módulos-incluidos)
> 
> [9.2 Fuera de alcance 12](#fuera-de-alcance)
> 
> [9.3 Producto mínimo viable (MVP) 12](#producto-mínimo-viable-mvp)

[10. Entregables e hitos 12](#entregables-e-hitos)

> [10.1 Entregables principales 12](#entregables-principales)
> 
> [10.2 Hitos generales 13](#hitos-generales)

[11. Organización y gobierno inicial 13](#organización-y-gobierno-inicial)

> [11.1 Patrocinador, cliente y líder 13](#patrocinador-cliente-y-líder)
> 
> [11.2 Equipo inicial 13](#equipo-inicial)
> 
> [11.3 Autoridad del líder del proyecto 13](#autoridad-del-líder-del-proyecto)

[12. Recursos y viabilidad preliminar 14](#recursos-y-viabilidad-preliminar)

> [12.1 Recursos requeridos 14](#recursos-requeridos)
> 
> [12.2 Evaluación preliminar de viabilidad 14](#evaluación-preliminar-de-viabilidad)
> 
> [12.3 Estimación inicial de esfuerzo 14](#estimación-inicial-de-esfuerzo)

[13. Restricciones, supuestos y dependencias 15](#restricciones-supuestos-y-dependencias)

> [13.1 Restricciones 15](#restricciones)
> 
> [13.2 Supuestos 15](#supuestos)
> 
> [13.3 Dependencias 15](#dependencias)

[14. Riesgos iniciales 15](#riesgos-iniciales)

> [14.1 Escala de evaluación 15](#escala-de-evaluación)
> 
> [14.2 Registro inicial de riesgos 16](#registro-inicial-de-riesgos)
> 
> [14.3 Plan de tratamiento 16](#plan-de-tratamiento)

[15. Criterios de autorización del proyecto 16](#criterios-de-autorización-del-proyecto)

> [15.1 Decisión 17](#decisión)

[16. Declaración de constitución 17](#declaración-de-constitución)

> [16.1 Firmas o aceptación 17](#firmas-o-aceptación)

[17. Lista de verificación de calidad 17](#lista-de-verificación-de-calidad)

> [17.1 Resultado de revisión 18](#resultado-de-revisión)

[Anexo A. Matriz de coherencia inicial 19](#anexo-a.-matriz-de-coherencia-inicial)

[Anexo B. Fuentes y referencias 19](#anexo-b.-fuentes-y-referencias)

[Anexo C. Registro de pendientes 19](#anexo-c.-registro-de-pendientes)

[Anexo D. Guía breve para el instructor o evaluador 19](#anexo-d.-guía-breve-para-el-instructor-o-evaluador)

## 1\. Propósito y uso del documento

Este documento formaliza la creación del proyecto, establece su razón de ser y reúne la información mínima necesaria para decidir si debe autorizarse, ajustarse o descartarse antes de avanzar hacia el análisis detallado, el diseño y la construcción del software.

Su contenido debe redactarse con información verificable del problema y del contexto real. No debe utilizarse como una descripción anticipada de la solución ni como una lista extensa de funcionalidades; esas definiciones se desarrollarán posteriormente en el Documento de Alcance y Especificación de Requisitos.

### 1.1 Objetivos del documento

  - Definir el problema u oportunidad que origina el proyecto.

  - Establecer objetivos, beneficios, indicadores y criterios de éxito.

  - Identificar al patrocinador, cliente, equipo y responsables iniciales.

  - Registrar entregables, hitos, restricciones, supuestos, dependencias y riesgos iniciales.

  - Autorizar formalmente el inicio del proyecto y reconocer la autoridad del líder designado.

### 1.2 Alcance documental

Este documento cubre la formulación y constitución inicial. No reemplaza los artefactos de gestión de interesados, alcance detallado, requisitos, backlog, diseño, arquitectura, pruebas, manuales ni cierre.

### 1.3 Reglas de diligenciamiento

1.  Use lenguaje claro, preciso y verificable.

2.  Evite afirmaciones genéricas como “mejorar el proceso” sin especificar qué cambia y cómo se medirá.

3.  No redacte el problema como una solución; por ejemplo, “no existe una aplicación móvil” no demuestra por sí mismo un problema.

4.  Diferencie hechos, supuestos y expectativas.

5.  Incluya fuentes o evidencias cuando existan datos, cifras, normas o resultados de observación.

6.  Registre como “por definir” únicamente la información que tenga responsable y fecha de resolución.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio de calidad</strong></p>
<p>El documento es aceptable cuando una persona ajena al equipo puede comprender por qué existe el proyecto, a quién afecta, qué pretende lograr, qué se entregará, bajo qué limitaciones se ejecutará y quién tiene autoridad para aprobarlo.</p></td>
</tr>
</tbody>
</table>

## 2\. Información general del proyecto

| **Campo**                       | **Información requerida**                                       |
| ------------------------------- | --------------------------------------------------------------- |
| Código interno del proyecto     | ZFE-3223873                                                     |
| Nombre oficial del proyecto     | Sistema de gestión para gimnasio Zona Fit Evolution             |
| Nombre corto o acrónimo         | Zona Fit Evolution (ZFE)                                        |
| Programa de formación           | Tecnología en Análisis y Desarrollo de Software (ADSO)          |
| Centro de formación             | Centro de Tecnología de la Manufactura Avanzada                 |
| Regional                        | Antioquia                                                       |
| Ficha                           | 3223873                                                         |
| Modalidad                       |                                                                 |
| Tipo de proyecto                | Proyecto formativo con cliente real (gimnasio Zona Fit)         |
| Fecha de inicio propuesta       | 25/04/2026                                                      |
| Fecha de finalización propuesta | 12/12/2026 (sustentación)                                       |
| Versión o etapa objetivo        | MVP – v1.0.0                                                    |
| Repositorio principal           | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03      |
| Ubicación de la documentación   | Carpeta documentos\_proyecto del equipo y /docs del repositorio |

### 2.1 Identificación resumida

**Nombre del proyecto: Sistema de gestión para gimnasio Zona Fit Evolution**

**Descripción en una frase: Aplicación web que automatiza la gestión de membresías y valida por huella el ingreso de los socios al gimnasio Zona Fit.**

Redacte una frase que indique el tipo de solución, el proceso que apoya y los usuarios principales. Evite enumerar tecnologías.

### 2.2 Clasificación del proyecto

| **Criterio**                    | **Selección**                                                                                       | **Observación**                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Plataforma                      | Web (SPA) + API REST                                                                                |                                                                   |
| Contexto de uso                 | Recepción del gimnasio: computador o tablet con navegador                                           |                                                                   |
| Nivel de madurez esperado       | MVP funcional desplegado en la nube                                                                 |                                                                   |
| Existencia de cliente real      | Sí: gimnasio Zona Fit (propietario STK-01)                                                          |                                                                   |
| Tratamiento de datos personales | Sí: datos personales y biométricos (Ley 1581 de 2012)                                               | Solo se guarda el hash de la plantilla, nunca la imagen.          |
| Integraciones externas          | Sensor de huella AS608 con conversor USB CP2102; hosting de la API y MySQL en la nube (por definir) | La apertura automática de la puerta queda fuera del MVP (CR-005). |

## 3\. Contexto y antecedentes

Describa el entorno en el que se presenta la necesidad. Incluya el proceso actual, las personas involucradas, las herramientas utilizadas, los antecedentes relevantes y las condiciones institucionales, organizacionales o técnicas que ayudan a comprender la situación.

### 3.1 Contexto organizacional o sectorial

| **Aspecto**                                | **Descripción**                                                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Organización, área o comunidad             | Gimnasio local de acondicionamiento físico Zona Fit, con áreas de pesas, cardio y entrenamiento funcional; entre 150 y 200 usuarios activos. |
| Proceso relacionado                        | Inscripción de socios, venta y renovación de planes, control de ingreso y registro de pagos en la recepción.                                 |
| Usuarios o población involucrada           | Propietario (STK-01), recepcionista (STK-02) y socios (STK-03).                                                                              |
| Herramientas o métodos actuales            | Gestión administrativa manual en la recepción, sin un mecanismo automatizado de validación de vigencia.                                      |
| Normas, políticas o condiciones relevantes | Ley 1581 de 2012 (protección de datos personales y datos sensibles biométricos).                                                             |
| Antecedentes de soluciones previas         | Se planteó el uso de tarjetas RFID y torniquete; se reemplazó por huella (CR-001, CR-002 y CR-005).                                          |
| Fuente de la información                   | Levantamiento con el propietario del gimnasio y documento maestro del proyecto (v2.3).                                                       |

### 3.2 Evidencias iniciales

| **ID** | **Evidencia** | **Tipo** | **Fuente** | **Fecha** | **Hallazgo principal** | **Ubicación** |
| ------ | ------------- | -------- | ---------- | --------- | ---------------------- | ------------- |
| EVI-01 |               |          |            |           |                        |               |
| EVI-02 |               |          |            |           |                        |               |
| EVI-03 |               |          |            |           |                        |               |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Ejemplos de evidencia válida</strong></p>
<p>Registros de tiempos, formularios actuales, reportes de errores, entrevistas, estadísticas, capturas del proceso, quejas, reprocesos, documentos internos, datos de atención o resultados de observación. La evidencia debe apoyar el problema, no decorar el documento.</p></td>
</tr>
</tbody>
</table>

## 4\. Planteamiento del problema

El problema debe describir una situación negativa, necesidad insatisfecha u oportunidad verificable. Debe mostrar quién se ve afectado, en qué contexto, cuáles son las causas, qué consecuencias genera y cuál es su magnitud conocida o estimada.

### 4.1 Enunciado del problema

| **Elemento**                      | **Redacción**                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Situación actual                  | La validación de la vigencia de los socios se hace manualmente en la recepción.                                           |
| Población o usuarios afectados    | Propietario, recepcionista y entre 150 y 200 socios activos.                                                              |
| Proceso o contexto afectado       | Ingreso al gimnasio y gestión de membresías y pagos.                                                                      |
| Causas principales                | No hay un registro centralizado de membresías ni un mecanismo que valide la vigencia en el ingreso.                       |
| Consecuencias principales         | Ingresos con membresía vencida, congestión en horas pico y pérdidas económicas.                                           |
| Magnitud o evidencia              |                                                                                                                           |
| Pregunta orientadora del proyecto | ¿Cómo validar automáticamente, en el ingreso, que cada socio tiene su membresía vigente y llevar el control de sus pagos? |

### 4.2 Árbol del problema

| **Nivel**        | **ID** | **Descripción**                                                                                                | **Evidencia relacionada** |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Efecto           | EFE-01 | Pérdidas económicas por ingresos con membresía vencida.                                                        |                           |
| Efecto           | EFE-02 | Congestión y filas en la recepción en horas pico.                                                              |                           |
| Problema central | PRO-01 | No hay un mecanismo automatizado que valide en tiempo real si el socio tiene su membresía vigente al ingresar. |                           |
| Causa directa    | CAU-01 | Validación manual de la vigencia de cada socio al ingresar.                                                    |                           |
| Causa directa    | CAU-02 | Membresías y pagos sin registro centralizado ni reportes.                                                      |                           |
| Causa raíz       | CAU-03 | Ausencia de un sistema que integre clientes, membresías, pagos y control de acceso.                            |                           |

### 4.3 Validación del problema

| **Pregunta de control**                                                            | **Sí** | **No** | **Observación** |
| ---------------------------------------------------------------------------------- | ------ | ------ | --------------- |
| ¿Describe una situación verificable y no únicamente la ausencia de una tecnología? |        |        |                 |
| ¿Identifica claramente a la población afectada?                                    |        |        |                 |
| ¿Distingue causas y consecuencias?                                                 |        |        |                 |
| ¿Cuenta con al menos una evidencia o fuente?                                       |        |        |                 |
| ¿Puede abordarse parcialmente mediante un producto de software?                    |        |        |                 |
| ¿La formulación evita prometer resultados fuera del control del proyecto?          |        |        |                 |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Ejemplo incorrecto</strong></p>
<p>“La empresa no tiene una aplicación web”. Esto describe la ausencia de una solución, pero no demuestra el problema real, sus causas, sus efectos ni el valor de resolverlo.</p></td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr class="odd">
<td><p><strong>Ejemplo mejorado</strong></p>
<p>“El registro manual de préstamos genera duplicidad de datos, dificulta conocer la disponibilidad real y produce demoras promedio de 15 minutos por solicitud. El proceso afecta a almacenistas e instructores y carece de trazabilidad sobre entregas y devoluciones”.</p></td>
</tr>
</tbody>
</table>

## 5\. Justificación

Explique por qué el proyecto merece realizarse. La justificación debe conectar el problema con el valor esperado y considerar viabilidad técnica, operativa, económica, académica, social, legal y ambiental cuando corresponda.

### 5.1 Dimensiones de justificación

| **Dimensión**             | **Pregunta orientadora**                                    | **Argumento y evidencia**                                                                                             |
| ------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Necesidad                 | ¿Por qué es importante intervenir el problema ahora?        | Evitar ingresos con membresía vencida, principal causa de pérdidas del gimnasio.                                      |
| Valor para usuarios       | ¿Qué cambio útil recibirán los usuarios?                    | La recepción valida el ingreso sin revisar registros a mano; el socio entra con su huella.                            |
| Valor organizacional      | ¿Qué mejora en control, tiempo, calidad o información?      | El propietario obtiene control del personal (roles) y del registro de pagos.                                          |
| Viabilidad técnica        | ¿Existen tecnologías, conocimientos y recursos disponibles? | Stack conocido por el equipo (Node.js, Express, MySQL y React) y arquitectura por capas ya implementada.              |
| Viabilidad operativa      | ¿La organización puede adoptar y utilizar la solución?      | La recepción ya cuenta con computador; el sistema se usa desde el navegador.                                          |
| Viabilidad económica      | ¿Los beneficios justifican el esfuerzo y costos estimados?  | Herramientas de software libre; el sensor AS608 con conversor CP2102 es de bajo costo. Costo del hosting por definir. |
| Pertinencia formativa     | ¿Qué competencias ADSO permite demostrar?                   | Aplica las competencias del programa ADSO: análisis, diseño, desarrollo, pruebas y despliegue.                        |
| Aspectos legales y éticos | ¿Existen condiciones de privacidad, licencias o inclusión?  | Solo se guarda el hash de la plantilla biométrica (Ley 1581 de 2012); se requiere autorización del titular.           |

### 5.2 Alternativas consideradas

| **Alternativa**                            | **Descripción**                                       | **Ventajas**                                              | **Desventajas**                                     | **Decisión**                |
| ------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------- | --------------------------- |
| ALT-01: Mantener proceso actual            | Validación manual en la recepción.                    | Sin costo de desarrollo.                                  | Mantiene las pérdidas y las filas.                  | Descartada                  |
| ALT-02: Tarjetas RFID y torniquete         | Identificación con tarjeta y apertura con torniquete. | Ingreso automatizado.                                     | Préstamo de tarjetas; costo del torniquete.         | Descartada (CR-001, CR-002) |
| ALT-03: Software comercial                 | Licenciar un sistema de gestión de gimnasios.         | Producto probado.                                         | Costo recurrente; no cumple el propósito formativo. | Descartada                  |
| ALT-04: Sistema web a la medida con huella | Aplicación web con API REST, MySQL y sensor AS608.    | Ajustado al gimnasio; datos bajo control del propietario. | Requiere integración de hardware y despliegue.      | Seleccionada                |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio de calidad</strong></p>
<p>La justificación no debe afirmar que el proyecto es viable solo porque el equipo conoce una tecnología. Debe demostrar que la solución propuesta es pertinente frente a otras alternativas y que el valor esperado supera razonablemente sus costos y riesgos.</p></td>
</tr>
</tbody>
</table>

## 6\. Objetivos

Los objetivos expresan los resultados que el proyecto busca alcanzar. Deben derivarse del problema, ser coherentes con el alcance preliminar y poder verificarse mediante entregables, indicadores o evidencias.

### 6.1 Objetivo general

**Objetivo general: Automatizar el control de ingresos y la gestión de membresías activas del gimnasio Zona Fit para lograr un mayor control financiero y del personal, mejorando el control de acceso y reduciendo los riesgos asociados a ingresos no autorizados.**

Estructura recomendada: verbo en infinitivo + producto o capacidad principal + propósito + población o contexto. Evite incluir varios objetivos generales unidos por “y”.

### 6.2 Objetivos específicos

| **ID** | **Objetivo específico**                                                                                                                         | **Entregable relacionado** | **Indicador relacionado** | **Criterio de logro**                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------- | ---------------------------------------------------------------------------- |
| OBJ-01 | Crear un módulo de membresías que valide el estado de los clientes en tiempo real.                                                              | ENTG-05 Producto funcional | IND-02                    | Estado de membresía visible y validado en cada consulta e ingreso.           |
| OBJ-02 | Registrar el pago de cada membresía asignada o renovada y ofrecer un resumen financiero por cliente al Administrador.                           | ENTG-05 Producto funcional | IND-04                    | Cada asignación o renovación queda como pago en el registro financiero.      |
| OBJ-03 | Implementar una aplicación web desplegada en la nube con acceso administrativo seguro.                                                          | ENTG-05, ENTG-07           | IND-03                    | Aplicación publicada con HTTPS y autenticación por rol.                      |
| OBJ-04 | Implementar un control de acceso por huella (sensor AS608 con conversor USB CP2102) que valide el ingreso solo a clientes con membresía activa. | ENTG-05 Producto funcional | IND-01                    | El sensor AS608 identifica al socio y el sistema permite o niega el ingreso. |
| OBJ-05 | Desarrollar un submódulo de control financiero interno.                                                                                         | ENTG-05 Producto funcional | IND-04                    | Resumen financiero por cliente exclusivo del Administrador.                  |

### 6.3 Validación SMART

| **Objetivo** | **Específico** | **Medible** | **Alcanzable** | **Relevante** | **Temporal** | **Ajuste requerido** |
| ------------ | -------------- | ----------- | -------------- | ------------- | ------------ | -------------------- |
| OBJ-01       |                |             |                |               |              |                      |
| OBJ-02       |                |             |                |               |              |                      |
| OBJ-03       |                |             |                |               |              |                      |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Error frecuente</strong></p>
<p>Confundir actividades con objetivos. “Diseñar la base de datos” puede ser una actividad o entregable. El objetivo debe expresar el resultado que esa actividad permite alcanzar y su relación con el problema.</p></td>
</tr>
</tbody>
</table>

## 7\. Beneficios y valor esperado

Registre los beneficios esperados y diferencie los resultados directamente controlables por el proyecto de los impactos que dependen de adopción, operación u otros factores externos.

| **ID** | **Beneficio esperado**                       | **Beneficiario**                     | **Tipo** | **Indicador** | **Horizonte** | **Responsable de medición**  |
| ------ | -------------------------------------------- | ------------------------------------ | -------- | ------------- | ------------- | ---------------------------- |
| BEN-01 | Eliminar los ingresos con membresía vencida. | Propietario (STK-01)                 | Directo  | IND-01        | Corto         | Liliana Sofía Panesso Méndez |
| BEN-02 | Atención más rápida en la recepción.         | Recepción (STK-02) y socios (STK-03) | Directo  | IND-02        | Corto         | Maileth Begambre Movilla     |
| BEN-03 | Información real de ingresos por cliente.    | Propietario (STK-01)                 | Directo  | IND-04        | Medio         | Liliana Sofía Panesso Méndez |

### 7.1 Propuesta de valor

| **Para**                                      | **Que necesita**                                                 | **El proyecto propone**                                 | **A diferencia de**                      | **El valor principal es**                                                         |
| --------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| Propietario y recepción del gimnasio Zona Fit | controlar quién entra y con qué membresía, y registrar sus pagos | una aplicación web con validación de ingreso por huella | el control manual actual en la recepción | cero ingresos con membresía vencida y control financiero del personal y los pagos |

## 8\. Indicadores de éxito

Los indicadores permiten verificar si el proyecto logró lo que prometió. Deben tener una definición clara, línea base cuando exista, meta, unidad, método de medición, responsable y momento de evaluación.

| **ID** | **Indicador**                         | **Objetivo relacionado** | **Línea base** | **Meta**         | **Unidad** | **Método / Fuente**                         | **Frecuencia**       | **Responsable**              |
| ------ | ------------------------------------- | ------------------------ | -------------- | ---------------- | ---------- | ------------------------------------------- | -------------------- | ---------------------------- |
| IND-01 | Ingresos con membresía vencida        | OBJ-04                   |                | 0 por mes        | Ingresos   | Historial de accesos (registros\_acceso)    | Mensual              | Liliana Sofía Panesso Méndez |
| IND-02 | Tiempo de validación de acceso        | OBJ-01                   |                | \< 2 s (RNF-003) | Segundos   | Medición de POST /api/acceso-fisico/validar | Por ciclo de pruebas | Liliana Sofía Panesso Méndez |
| IND-03 | Disponibilidad en horario de atención | OBJ-03                   |                | 99,9 % (RNF-004) | Porcentaje | Monitor de disponibilidad                   | Mensual              | Liliana Sofía Panesso Méndez |
| IND-04 | Membresías con pago registrado        | OBJ-02, OBJ-05           |                | 100 %            | Porcentaje | Registro financiero frente a membresías     | Mensual              | Liliana Sofía Panesso Méndez |

### 8.1 Indicadores mínimos sugeridos

  - Cumplimiento del alcance comprometido.

  - Ejecución exitosa de flujos críticos.

  - Resultado de pruebas y defectos bloqueantes.

  - Tiempo de respuesta de operaciones relevantes, cuando aplique.

  - Porcentaje de usuarios que completan tareas críticas sin asistencia.

  - Capacidad de instalación o despliegue reproducible.

  - Aprobación o aceptación del representante funcional.

<table>
<tbody>
<tr class="odd">
<td><p><strong>No confundir</strong></p>
<p>Un indicador no es una actividad. “Realizar pruebas” es una actividad; “95 % de los casos críticos ejecutados satisfactoriamente y cero defectos bloqueantes abiertos” es un indicador verificable.</p></td>
</tr>
</tbody>
</table>

## 9\. Alcance preliminar

Defina a alto nivel qué incluye y qué excluye el proyecto. El detalle completo se desarrollará posteriormente en el Documento de Alcance y Especificación de Requisitos.

### 9.1 Capacidades o módulos incluidos

| **ID** | **Capacidad o módulo**         | **Descripción de alto nivel**                                                           | **Usuarios principales** | **Prioridad** | **Versión objetivo** |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------- | ------------------------ | ------------- | -------------------- |
| ALC-01 | Autenticación y roles          | Inicio de sesión con JWT y permisos por rol.                                            | Administrador, Empleado  | Alta          | MVP                  |
| ALC-02 | Clientes, planes y membresías  | Registro de clientes, catálogo de planes, asignación y renovación por cédula.           | Administrador, Empleado  | Alta          | MVP                  |
| ALC-03 | Control de acceso por huella   | Registro de huella y validación del ingreso con el sensor AS608 e historial de accesos. | Recepción, socios        | Alta          | MVP                  |
| ALC-04 | Personal y registro financiero | Gestión del personal y resumen de pagos por cliente.                                    | Administrador            | Alta          | MVP                  |

### 9.2 Fuera de alcance

| **ID** | **Exclusión**                                                       | **Justificación**                                          | **Posible fase futura** |
| ------ | ------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------- |
| EXC-01 | Pagos en línea, pasarelas y facturación electrónica.                | Los pagos se reciben en la recepción; fuera del objetivo.  | No prevista             |
| EXC-02 | Apertura automática de la puerta (relé y electroimán) y torniquete. | El sensor solo valida el ingreso en esta versión (CR-005). | V1.1                    |
| EXC-03 | Agenda de entrenadores, rutinas, nutrición y venta de productos.    | No es un sistema de entrenamiento ni de punto de venta.    | No prevista             |

### 9.3 Producto mínimo viable (MVP)

Describa la versión mínima que permite comprobar el valor principal del proyecto sin incorporar funcionalidades accesorias.

| **Flujo crítico**                     | **Resultado mínimo esperado**                                    | **Usuario**       | **Evidencia de funcionamiento** |
| ------------------------------------- | ---------------------------------------------------------------- | ----------------- | ------------------------------- |
| Registrar cliente y asignar membresía | Cliente guardado y membresía activa con fecha de fin calculada.  | Empleado          | Casos CP-001 y CP-012           |
| Validar ingreso por huella            | Acceso permitido o negado con motivo y registro en el historial. | Recepción / socio | Casos CP-007 a CP-009           |
| Consultar registro financiero         | Resumen de pagos por cliente solo para el Administrador.         | Administrador     | Casos CP-014, CP-015            |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Control de alcance</strong></p>
<p>Toda funcionalidad no incluida expresamente debe considerarse fuera de alcance hasta que sea evaluada y aprobada mediante gestión de cambios. “Sería bueno tenerlo” no constituye aprobación.</p></td>
</tr>
</tbody>
</table>

## 10\. Entregables e hitos

### 10.1 Entregables principales

| **ID**  | **Entregable**             | **Descripción**                                              | **Criterio de aceptación** | **Responsable**                                                                                             | **Fecha objetivo** | **Dependencias** |
| ------- | -------------------------- | ------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- |
| ENTG-01 | Formulación y constitución | Problema, objetivos, alcance preliminar, riesgos y gobierno. |                            | Juan Diego Mejía Llano                                                                                      |                    | —                |
| ENTG-02 | Alcance y requisitos       | RF, RNF, reglas, backlog, historias y casos de uso.          |                            | Juan Diego Mejía Llano                                                                                      |                    | ENTG-01          |
| ENTG-03 | Diseño UX/UI               | Flujos, wireframes, mockups, prototipos y sistema de diseño. |                            | Maileth Begambre Movilla                                                                                    |                    | ENTG-02          |
| ENTG-04 | Arquitectura y datos       | Arquitectura por capas, modelo de datos, API y ADR.          |                            | Liliana Sofía Panesso Méndez                                                                                |                    | ENTG-02          |
| ENTG-05 | Producto funcional         | Aplicación web y API con los módulos del MVP.                |                            | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla                             | 12/12/2026         | ENTG-03, ENTG-04 |
| ENTG-06 | Pruebas y evidencias       | Plan de calidad, casos de prueba ejecutados y evidencias.    |                            |                                                                                                             | 09/12/2026         | ENTG-05          |
| ENTG-07 | Manuales y cierre          | Manual técnico, manual de usuario e informe de cierre.       |                            | Liliana Sofía Panesso Méndez (técnico), Maileth Begambre Movilla (usuario), Juan Diego Mejía Llano (cierre) | 12/12/2026         | ENTG-05, ENTG-06 |

### 10.2 Hitos generales

| **ID** | **Hito**             | **Resultado verificable**                      | **Fecha estimada** | **Responsable de aprobación**                |
| ------ | -------------------- | ---------------------------------------------- | ------------------ | -------------------------------------------- |
| HIT-01 | Formulación aprobada | Documento de formulación revisado.             |                    |                                              |
| HIT-02 | Requisitos aprobados | Alcance y backlog aprobados por el PO.         |                    | Liliana Sofía Panesso Méndez (Product Owner) |
| HIT-03 | Prototipo validado   | Prototipos revisados (sprint 2).               | 08/07/2026         | Liliana Sofía Panesso Méndez (Product Owner) |
| HIT-04 | MVP demostrable      | Flujos críticos funcionando en local.          | 28/10/2026         | Liliana Sofía Panesso Méndez (Product Owner) |
| HIT-05 | Pruebas y aceptación | Casos críticos ejecutados y aceptación del PO. | 09/12/2026         | Liliana Sofía Panesso Méndez (Product Owner) |
| HIT-06 | Cierre               | Versión v1.0.0 y sustentación.                 | 12/12/2026         |                                              |

## 11\. Organización y gobierno inicial

### 11.1 Patrocinador, cliente y líder

| **Rol**                           | **Nombre / cargo**                            | **Responsabilidades principales**                                           | **Autoridad o decisión** |
| --------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------- | ------------------------ |
| Patrocinador                      | Carlos Ramírez, propietario (STK-01)          | Proveer apoyo, remover impedimentos y autorizar decisiones mayores.         |                          |
| Cliente o representante funcional | Liliana Sofía Panesso Méndez (Product Owner)  | Validar necesidades, priorizar y aceptar entregables.                       |                          |
| Líder del proyecto                | Juan Diego Mejía Llano (líder y Scrum Master) | Coordinar, planificar, comunicar, controlar cambios y asegurar entregables. |                          |
| Instructor responsable            |                                               | Orientar, revisar evidencias y evaluar competencias.                        |                          |

### 11.2 Equipo inicial

| **Integrante**               | **Rol principal**                                         | **Responsabilidades**                                             | **Disponibilidad** | **Evidencia de contribución**       |
| ---------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- | ------------------ | ----------------------------------- |
| Juan Diego Mejía Llano       | Líder del proyecto, Scrum Master y desarrollador frontend | Requisitos, documentación, coordinación y frontend React.         |                    | Commits en GitHub y tablero de Jira |
| Liliana Sofía Panesso Méndez | Product Owner y desarrolladora backend                    | Prioriza el backlog; API REST, base de datos y lógica de negocio. |                    | Commits en GitHub y tablero de Jira |
| Maileth Begambre Movilla     | Diseño UX/UI y apoyo frontend                             | Wireframes, mockups, prototipos y maquetación.                    |                    | Commits en GitHub, Figma y Jira     |

### 11.3 Autoridad del líder del proyecto

  - Convocar reuniones y solicitar información necesaria.

  - Asignar y coordinar actividades dentro de los acuerdos del equipo.

  - Proponer ajustes al cronograma y elevar cambios de alcance para aprobación.

  - Consolidar información, riesgos, decisiones y evidencias.

  - Rechazar entregables que no cumplan criterios mínimos antes de someterlos a aprobación.

Limitaciones o excepciones a esta autoridad:

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## 12\. Recursos y viabilidad preliminar

### 12.1 Recursos requeridos

| **Categoría**                | **Recurso**                                                                | **Disponibilidad**          | **Costo estimado** | **Responsable**              | **Observación** |
| ---------------------------- | -------------------------------------------------------------------------- | --------------------------- | ------------------ | ---------------------------- | --------------- |
| Talento humano               | Tres aprendices ADSO                                                       | Parcial                     |                    | Juan Diego Mejía Llano       |                 |
| Hardware                     | Computadores del aula y de la recepción; sensor AS608 con conversor CP2102 | Disponible                  |                    | Liliana Sofía Panesso Méndez |                 |
| Software / licencias         | Visual Studio Code, Node.js, React, MySQL, Figma, Git, GitHub y Jira       | Disponible                  |                    | Juan Diego Mejía Llano       |                 |
| Infraestructura / hosting    | Hosting de la API y MySQL en la nube (por definir)                         | No disponible (por definir) |                    | Liliana Sofía Panesso Méndez |                 |
| Datos / acceso a información | Información del gimnasio provista por el propietario                       | Disponible                  |                    | Liliana Sofía Panesso Méndez |                 |
| Tiempo                       | 33 semanas (25/04/2026 – 12/12/2026), 13 sprints                           | Disponible                  |                    | Juan Diego Mejía Llano       |                 |
| Asesoría especializada       | Instructores técnicos y metodológicos del centro                           | Disponible                  |                    | Juan Diego Mejía Llano       |                 |

### 12.2 Evaluación preliminar de viabilidad

| **Dimensión** | **Estado**   | **Hallazgo**                                                                                               | **Acción requerida**                          | **Responsable**              | **Fecha límite** |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------- | ---------------- |
| Técnica       | Viable       | Stack conocido y arquitectura implementada.                                                                |                                               |                              |                  |
| Operativa     | Viable       | La recepción usa el sistema desde el navegador.                                                            |                                               |                              |                  |
| Económica     | Condicionada | Costo del hosting por definir.                                                                             | Definir proveedor y costo del hosting.        | Liliana Sofía Panesso Méndez |                  |
| Temporal      | Condicionada | Pruebas y despliegue concentrados en los sprints 12 y 13; el sensor AS608 quedó integrado en el sprint 11. | Congelar alcance desde el sprint 12.          | Juan Diego Mejía Llano       |                  |
| Legal y ética | Viable       | Solo se guarda el hash de la huella.                                                                       | Formato de autorización de datos biométricos. | Liliana Sofía Panesso Méndez |                  |
| Formativa     | Viable       | Cubre análisis, diseño, desarrollo, pruebas y despliegue.                                                  |                                               |                              |                  |

### 12.3 Estimación inicial de esfuerzo

| **Fase**               | **Duración estimada**            | **Personas** | **Horas aproximadas** | **Observación** |
| ---------------------- | -------------------------------- | ------------ | --------------------- | --------------- |
| Formulación y análisis | Sprint 0 (6,5 semanas)           | 3            |                       |                 |
| Diseño                 | Sprint 2 (2 semanas)             | 3            |                       |                 |
| Construcción           | Sprints 1 y 3 a 12 (22 semanas)  | 3            |                       |                 |
| Pruebas y ajustes      | Sprints 12 y 13 (4 semanas)      | 3            |                       |                 |
| Despliegue y cierre    | Sprint 13 y cierre (2,5 semanas) | 3            |                       |                 |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Advertencia</strong></p>
<p>Las estimaciones deben ser realistas y considerar aprendizaje, integración, pruebas, correcciones, documentación y despliegue. Un cronograma que solo contempla escribir código casi siempre subestima el proyecto.</p></td>
</tr>
</tbody>
</table>

## 13\. Restricciones, supuestos y dependencias

### 13.1 Restricciones

| **ID** | **Tipo**       | **Restricción**                                      | **Impacto** | **Responsable de control**   |
| ------ | -------------- | ---------------------------------------------------- | ----------- | ---------------------------- |
| RES-01 | Temporal       | Entrega final y sustentación el 12/12/2026.          | Alto        | Juan Diego Mejía Llano       |
| RES-02 | Legal          | Ley 1581 de 2012: no se guardan imágenes de huellas. | Alto        | Liliana Sofía Panesso Méndez |
| RES-03 | Técnica        | Stack definido: Node.js, Express, MySQL y React.     | Medio       | Liliana Sofía Panesso Méndez |
| RES-04 | Organizacional | Equipo de tres aprendices con dedicación parcial.    | Medio       | Juan Diego Mejía Llano       |

### 13.2 Supuestos

| **ID** | **Supuesto**                                                                       | **Cómo se validará**                      | **Fecha de validación** | **Consecuencia si es falso**                                                                  |
| ------ | ---------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| SUP-01 | La recepción cuenta con computador y conexión a internet.                          | Visita al gimnasio con el propietario.    |                         | Usar el sistema desde otro equipo o tablet.                                                   |
| SUP-02 | El sensor AS608 y el conversor CP2102 funcionan con el computador de la recepción. | Prueba de integración con el lector real. | 10/11/2026              | Sin lector conectado no se pueden registrar ni validar huellas (ya no existe modo simulador). |
| SUP-03 | Los socios autorizan el registro de su huella.                                     | Formato de autorización del titular.      |                         | Validación por cédula en la recepción.                                                        |

### 13.3 Dependencias

| **ID** | **Dependencia**                                           | **Tipo** | **Responsable externo** | **Fecha requerida** | **Plan alternativo**                                                                       |
| ------ | --------------------------------------------------------- | -------- | ----------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| DEP-01 | Hosting de la API y del frontend (no Render, por definir) | Servicio |                         |                     | Demostración en ambiente local.                                                            |
| DEP-02 | Proveedor de MySQL en la nube                             | Servicio |                         |                     | Base MySQL local.                                                                          |
| DEP-03 | Controlador del CP2102 y comunicación serie con el AS608  | Servicio |                         |                     | Revisar el controlador del CP2102 y el puerto COM (PUERTO\_LECTOR); no hay modo simulador. |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Diferencia clave</strong></p>
<p>Una restricción limita las opciones del proyecto; un supuesto se considera verdadero mientras no se demuestre lo contrario; una dependencia requiere que otra persona, equipo, servicio o condición produzca algo necesario.</p></td>
</tr>
</tbody>
</table>

## 14\. Riesgos iniciales

Los riesgos son eventos inciertos que podrían afectar los objetivos. No deben confundirse con problemas que ya ocurrieron; esos deben registrarse como incidencias y tratarse de inmediato.

### 14.1 Escala de evaluación

| **Valor** | **Probabilidad**        | **Impacto**                     |
| --------- | ----------------------- | ------------------------------- |
| 1         | Muy baja: poco probable | Insignificante: impacto mínimo  |
| 2         | Baja                    | Menor                           |
| 3         | Media                   | Moderado                        |
| 4         | Alta                    | Serio                           |
| 5         | Muy alta: casi seguro   | Crítico: compromete el proyecto |

### 14.2 Registro inicial de riesgos

| **ID** | **Riesgo**                               | **Causa**                                   | **Consecuencia**                                    | **P** | **I** | **Nivel**    | **Respuesta**                                                         | **Responsable**              | **Fecha revisión** |
| ------ | ---------------------------------------- | ------------------------------------------- | --------------------------------------------------- | ----- | ----- | ------------ | --------------------------------------------------------------------- | ---------------------------- | ------------------ |
| RSK-01 | Fuga de datos personales y biométricos   | Almacenamiento o transmisión insegura       | Sanciones (Ley 1581 de 2012) y pérdida de confianza | 3     | 5     | 15 – Crítico | bcrypt, hash de plantillas, HTTPS y secretos en .env                  | Liliana Sofía Panesso Méndez |                    |
| RSK-02 | Acceso de clientes con planes vencidos   | Validación manual o estado desactualizado   | Pérdidas económicas                                 | 4     | 4     | 16 – Crítico | Validar en el backend estado y fecha de fin en cada intento           | Liliana Sofía Panesso Méndez |                    |
| RSK-03 | Inyección SQL                            | Consultas construidas con texto del usuario | Robo o alteración de datos                          | 3     | 5     | 15 – Crítico | Consultas parametrizadas con mysql2                                   | Liliana Sofía Panesso Méndez |                    |
| RSK-04 | Manipulación de precios desde el cliente | El frontend enviaría montos                 | Registro financiero falso                           | 3     | 4     | 12 – Alto    | Precio y duración tomados del plan en el servidor                     | Liliana Sofía Panesso Méndez |                    |
| RSK-05 | Indisponibilidad del sistema             | Caída del hosting o de la base              | No se puede validar el ingreso                      | 3     | 4     | 12 – Alto    | Hosting con monitoreo, validación manual por cédula como contingencia | Liliana Sofía Panesso Méndez |                    |

### 14.3 Plan de tratamiento

| **Riesgo** | **Estrategia** | **Acción preventiva**                                               | **Contingencia**                           | **Disparador**                                   | **Estado** |
| ---------- | -------------- | ------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------ | ---------- |
| RSK-01     | Mitigar        | bcrypt, hash de plantillas, secretos en .env y HTTPS en producción. | Rotar secretos y notificar al propietario. | Datos sensibles visibles en respuestas o en Git. | Abierto    |
| RSK-02     | Mitigar        | Validar estado y fecha de fin en el backend en cada intento.        | Validación manual por cédula.              | Acceso permitido con membresía vencida.          | Abierto    |
| RSK-03     | Evitar         | Consultas parametrizadas con mysql2.                                | Revisar repositorios y corregir.           | Consulta con concatenación de texto.             | Abierto    |

<table>
<tbody>
<tr class="odd">
<td><p><strong>Criterio de calidad</strong></p>
<p>Cada riesgo crítico debe tener responsable, respuesta y señal de activación. Escribir “tener cuidado” o “trabajar más rápido” no constituye un plan de tratamiento.</p></td>
</tr>
</tbody>
</table>

## 15\. Criterios de autorización del proyecto

El proyecto podrá autorizarse cuando exista información suficiente para justificar su ejecución y no se identifiquen impedimentos críticos sin tratamiento.

| **ID** | **Criterio**                                                                         | **Cumple** | **Evidencia / observación** |
| ------ | ------------------------------------------------------------------------------------ | ---------- | --------------------------- |
| AUT-01 | El problema está claramente definido y respaldado por evidencia.                     |            |                             |
| AUT-02 | Los objetivos se relacionan con el problema y son verificables.                      |            |                             |
| AUT-03 | El alcance preliminar y las exclusiones son comprensibles.                           |            |                             |
| AUT-04 | Los beneficios e indicadores tienen responsables y metas iniciales.                  |            |                             |
| AUT-05 | Existe un cliente, patrocinador o representante funcional identificable.             |            |                             |
| AUT-06 | El equipo y el líder están definidos.                                                |            |                             |
| AUT-07 | Los recursos y la viabilidad preliminar son suficientes o tienen acciones de ajuste. |            |                             |
| AUT-08 | Los riesgos críticos cuentan con tratamiento.                                        |            |                             |
| AUT-09 | Los entregables e hitos son coherentes con el tiempo disponible.                     |            |                             |
| AUT-10 | No existen restricciones legales, éticas o técnicas que hagan inviable el proyecto.  |            |                             |

### 15.1 Decisión

| **Decisión**               | **Marcar** | **Condiciones o ajustes** |
| -------------------------- | ---------- | ------------------------- |
| Proyecto autorizado        |            |                           |
| Autorizado con condiciones |            |                           |
| Requiere reformulación     |            |                           |
| No autorizado              |            |                           |

## 16\. Declaración de constitución

Mediante la aprobación de este documento, las partes reconocen la necesidad u oportunidad descrita, autorizan el inicio formal del proyecto dentro del alcance preliminar establecido y designan al líder del proyecto para coordinar las actividades necesarias, sujeto a las restricciones, criterios de éxito y mecanismos de control aquí definidos.

La aprobación no implica aceptación automática de cambios futuros ni compromiso de funcionalidades no incluidas. Cualquier modificación significativa deberá analizarse, registrarse y aprobarse conforme al procedimiento de gestión de cambios.

### 16.1 Firmas o aceptación

| **Rol**                  | **Nombre**                                   | **Documento / correo** | **Fecha** | **Firma o evidencia de aprobación** |
| ------------------------ | -------------------------------------------- | ---------------------- | --------- | ----------------------------------- |
| Patrocinador / Cliente   | Carlos Ramírez                               |                        |           |                                     |
| Representante funcional  | Liliana Sofía Panesso Méndez (Product Owner) |                        |           |                                     |
| Líder del proyecto       | Juan Diego Mejía Llano                       |                        |           |                                     |
| Instructor responsable   |                                              |                        |           |                                     |
| Integrante(s) del equipo | Maileth Begambre Movilla                     |                        |           |                                     |

## 17\. Lista de verificación de calidad

| **N.°** | **Verificación**                                                 | **Cumple** | **N. A.** | **Observación / acción** |
| ------- | ---------------------------------------------------------------- | ---------- | --------- | ------------------------ |
| 1       | El contexto explica cómo funciona actualmente el proceso.        |            |           |                          |
| 2       | El problema no está redactado como ausencia de una solución.     |            |           |                          |
| 3       | Las causas y efectos están diferenciados.                        |            |           |                          |
| 4       | Existe evidencia inicial que respalda el problema.               |            |           |                          |
| 5       | La población afectada está identificada.                         |            |           |                          |
| 6       | La justificación considera valor y viabilidad.                   |            |           |                          |
| 7       | El objetivo general se relaciona directamente con el problema.   |            |           |                          |
| 8       | Los objetivos específicos son verificables.                      |            |           |                          |
| 9       | Los indicadores tienen meta, unidad y método de medición.        |            |           |                          |
| 10      | El alcance preliminar distingue inclusiones y exclusiones.       |            |           |                          |
| 11      | El MVP está claramente identificado.                             |            |           |                          |
| 12      | Los entregables tienen criterios de aceptación.                  |            |           |                          |
| 13      | Los hitos son realistas frente al tiempo y recursos.             |            |           |                          |
| 14      | Los roles, responsables y autoridad del líder están definidos.   |            |           |                          |
| 15      | La viabilidad preliminar fue evaluada.                           |            |           |                          |
| 16      | Restricciones, supuestos y dependencias están diferenciados.     |            |           |                          |
| 17      | Los riesgos críticos tienen responsable y respuesta.             |            |           |                          |
| 18      | La decisión de autorización está registrada.                     |            |           |                          |
| 19      | El documento tiene versión, responsables e historial de cambios. |            |           |                          |
| 20      | La información es consistente con la arquitectura documental.    |            |           |                          |

### 17.1 Resultado de revisión

| **Resultado**        | **Condición**                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Aprobado             | Cumple todos los criterios críticos y no presenta inconsistencias que impidan continuar. |
| Aprobado con ajustes | Puede continuar, pero debe completar acciones definidas antes del siguiente hito.        |
| Devuelto             | Presenta vacíos o contradicciones que impiden autorizar el proyecto.                     |

## Anexo A. Matriz de coherencia inicial

| **Problema / causa** | **Objetivo**   | **Indicador**  | **Alcance o entregable** | **Riesgo relacionado** |
| -------------------- | -------------- | -------------- | ------------------------ | ---------------------- |
| PRO-01               | OBJ-01, OBJ-04 | IND-01, IND-02 | ALC-02, ALC-03 / ENTG-05 | RSK-02                 |
| CAU-02               | OBJ-02, OBJ-05 | IND-04         | ALC-04 / ENTG-05         | RSK-04                 |
| CAU-03               | OBJ-03         | IND-03         | ALC-01 / ENTG-05         | RSK-05                 |

## Anexo B. Fuentes y referencias

| **ID** | **Fuente**                       | **Autor / entidad**                  | **Fecha**  | **Ubicación**         | **Uso en el documento**               |
| ------ | -------------------------------- | ------------------------------------ | ---------- | --------------------- | ------------------------------------- |
| REF-01 | Ley 1581 de 2012                 | Congreso de la República de Colombia | 17/10/2012 | Diario Oficial 48.587 | Restricciones legales y privacidad    |
| REF-02 | The Scrum guide                  | Schwaber y Sutherland                | 2020       | scrumguides.org       | Metodología de trabajo                |
| REF-03 | Documento maestro integrado v2.3 | Equipo Zona Fit Evolution            | 20/10/2026 | documentos\_proyecto  | Fuente de la información del proyecto |

## Anexo C. Registro de pendientes

| **ID** | **Información pendiente**                                                 | **Responsable**              | **Fecha límite** | **Impacto** | **Estado** |
| ------ | ------------------------------------------------------------------------- | ---------------------------- | ---------------- | ----------- | ---------- |
| PEN-01 | Evidencias del problema (EVI): registros, entrevista o datos del gimnasio | Juan Diego Mejía Llano       |                  | Alto        | Abierto    |
| PEN-02 | Línea base de los indicadores IND-01 a IND-04                             | Liliana Sofía Panesso Méndez |                  | Medio       | Abierto    |
| PEN-03 | Costos estimados de recursos y proveedor de hosting                       | Liliana Sofía Panesso Méndez |                  | Medio       | Abierto    |
| PEN-04 | Firmas de autorización del proyecto                                       | Juan Diego Mejía Llano       |                  | Alto        | Abierto    |

## Anexo D. Guía breve para el instructor o evaluador

  - Revise primero la coherencia problema–objetivos–alcance–indicadores.

  - Solicite evidencia cuando existan cifras, tiempos, costos o impactos declarados.

  - No apruebe objetivos imposibles de medir o fuera del control del proyecto.

  - Verifique que el alcance sea realizable en el tiempo formativo disponible.

  - Exija tratamiento para riesgos críticos y condiciones de autorización claras.

  - Registre observaciones accionables, indicando responsable y fecha.

<table>
<tbody>
<tr class="odd">
<td><p><strong>Fin del documento</strong></p>
<p>Una vez aprobado, este documento alimenta la Gestión de Interesados y del Proyecto, el Documento de Alcance y Especificación de Requisitos y la matriz maestra de trazabilidad.</p></td>
</tr>
</tbody>
</table>
