# Documentación de Zona Fit Evolution

Sistema de gestión para el gimnasio Zona Fit Evolution. Proyecto formativo SENA, programa ADSO, ficha 3223873, Centro de Tecnología de la Manufactura Avanzada (Regional Antioquia).

| Rol | Integrante |
| --- | --- |
| Líder del proyecto, Scrum Master, frontend | Juan Diego Mejía Llano |
| Product Owner, backend | Liliana Sofía Panesso Méndez |
| UX/UI, apoyo frontend | Maileth Begambre Movilla |

## Cómo está organizada

La documentación se maneja en dos capas:

1. **Documentación viva (Markdown en `docs/`).** Es la fuente de verdad. Se actualiza en el mismo Pull Request que cambia el código.
2. **Entregables formales (`docs/entregables/`).** Son los formatos institucionales SENA ya diligenciados, en PDF (los Word) y en Excel (las hojas de cálculo). Se regeneran en cada hito a partir de la documentación viva.

## Índice

| # | Documento vivo | Entregable formal |
| --- | --- | --- |
| 00 | Índice maestro y control de entregables | [Excel](entregables/00_Gobierno_Documental/Indice_Maestro_y_Control_de_Entregables_ZonaFitEvolution.xlsx) |
| 01 | [Formulación y constitución del proyecto](01-proyecto.md) | [PDF](entregables/01_Inicio_y_Planeacion/Formulacion_y_Constitucion_Proyecto_ZonaFitEvolution.pdf) |
| 02 | [Gestión de interesados y del proyecto (Scrum, sprints, riesgos)](02-gestion.md) | [PDF](entregables/01_Inicio_y_Planeacion/Gestion_de_Interesados_y_del_Proyecto_ZonaFitEvolution.pdf) |
| 03 | [Alcance y especificación de requisitos](03-requisitos.md) | [PDF](entregables/02_Requerimientos/Alcance_y_Especificacion_de_Requisitos_ZonaFitEvolution.pdf) |
| 04 | [Backlog del producto](03b-backlog-hu-casos-uso.md) · [Historias de usuario](analisis/historias-de-usuario.md) · [Casos de uso](analisis/casos-de-uso.md) | [PDF](entregables/02_Requerimientos/Backlog_HU_y_Casos_de_Uso_ZonaFitEvolution.pdf) |
| 05 | Matriz maestra de trazabilidad | [Excel](entregables/02_Requerimientos/Matriz_Maestra_de_Trazabilidad_ZonaFitEvolution.xlsx) |
| 06 | [Arquitectura, datos y diseño técnico](04-arquitectura.md) | [PDF](entregables/03_Diseño/Arquitectura_Datos_y_Diseno_Tecnico_ZonaFitEvolution.pdf) |
| 07 | [Diseño UX/UI y sistema de diseño](05-ux-ui.md) | [PDF](entregables/03_Diseño/Diseno_UX_UI_y_Sistema_de_Diseno_ZonaFitEvolution.pdf) |
| 08 | [Plan de calidad, pruebas y aceptación](06-calidad.md) | [PDF](entregables/04_Calidad/Plan_de_Calidad_Pruebas_y_Aceptacion_ZonaFitEvolution.pdf) |
| 09 | [Manual técnico y de operación](manual-tecnico.md) | [PDF](entregables/05_Manuales/Manual_Tecnico_y_de_Operacion_ZonaFitEvolution.pdf) |
| 10 | [Manual de usuario](manual-usuario.md) | [PDF](entregables/05_Manuales/Manual_de_Usuario_ZonaFitEvolution.pdf) |
| 11 | [Informe de cierre y entrega](07-cierre.md) | [PDF](entregables/06_Cierre/Informe_de_Cierre_y_Entrega_ZonaFitEvolution.pdf) |
| 12 | [Guía de sustentación técnica y demostración](08-sustentacion.md) | [PDF](entregables/07_Evaluacion/Guia_de_Sustentacion_ZonaFitEvolution.pdf) |
| 13 | Lista de chequeo final | [Excel](entregables/07_Evaluacion/Lista_de_Chequeo_Final_ZonaFitEvolution.xlsx) |
| 14 | Rúbrica integral de evaluación | [Excel](entregables/07_Evaluacion/Rubrica_Integral_de_Evaluacion_ZonaFitEvolution.xlsx) |
| 15 | [Guía de estructura y evidencias del repositorio](guia-repositorio.md) | [PDF](entregables/08_Repositorio/Guia_de_Estructura_del_Repositorio_ZonaFitEvolution.pdf) |

Otros:

- [`analisis/`](analisis/): historias de usuario con sus criterios de aceptación y casos de uso con sus diagramas.
- `img/`: figuras y diagramas extraídos de los formatos.
- Las épicas, historias y sprints se gestionan en **Jira** (tablero SCRUM); aquí se enlazan, no se copian.

## Cambios de alcance registrados

| ID | Cambio |
| --- | --- |
| CR-005 | El lector biométrico es un AS608 con conversor USB CP2102 y solo valida el ingreso; no abre la puerta automáticamente. |
| CR-006 | El hosting deja de ser Render; queda por definir. |

## Pendientes del equipo

En los formatos quedaron en blanco, marcados explícitamente, los datos que solo el equipo puede aportar: costos, horas de dedicación, línea base de indicadores, enlace de Figma, resultados de pruebas, declaración de uso de IA y firmas. Al completarlos se actualizan el Markdown y el entregable correspondiente.

## Reglas

- Si un PR cambia una ruta, una tabla o una pantalla, ese mismo PR actualiza el `.md` correspondiente.
- Los Word fuente no se versionan; solo los PDF y Excel finales en `entregables/`.
- Nunca se suben `.env`, `node_modules/`, plantillas en blanco ni archivos temporales de Word (`~$*.docx`).
