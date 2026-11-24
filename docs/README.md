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
- [`diagramas/`](diagramas/): diagramas de arquitectura y datos (contexto, contenedores, componentes, paquetes, clases, entidad-relación, estados de la membresía y despliegue), cada uno con su fuente Mermaid (`.mmd`) y su PNG.
- [`analisis/casos-uso/`](analisis/casos-uso/): diagramas de análisis (casos de uso, diez secuencias y nueve actividades), con su fuente y su PNG.
- Todos los diagramas usan el mismo estilo. Para regenerar una imagen: `npx @mermaid-js/mermaid-cli -i <archivo>.mmd -o <archivo>.png -s 2 -b white` (casos de uso: `dot -Tpng -Gdpi=150 casos-de-uso.dot -o casos-de-uso.png`).
- [`api/`](api/): contrato OpenAPI de la API ([`openapi.yaml`](../BackendZonafitevolution/openapi.yaml)) y cómo usar Swagger UI en `/api/docs`.
- [`pruebas/`](pruebas/): resultados de los ciclos de prueba (CIC-01 con `npm run pruebas-cp` y CIC-02 con el sensor en producción), mínimo privilegio en MySQL, compatibilidad y accesibilidad, prueba de restauración y registros de inspección.
- [`evidencias/`](evidencias/): capturas de las pruebas de la entrega final y [contribución individual](evidencias/contribuciones.md) de cada integrante.
- [`legal/`](legal/): formato de autorización para el tratamiento de datos personales y biométricos (Ley 1581 de 2012).
- [`capturas/`](capturas/): capturas de la aplicación con datos ficticios usadas en el Manual de usuario.
- Las épicas, historias y sprints se gestionan en **Jira** (tablero SCRUM); aquí se enlazan, no se copian.

## Cambios de alcance registrados

| ID | Cambio |
| --- | --- |
| CR-005 | El lector biométrico es un AS608 con conversor USB CP2102 y solo valida el ingreso; no abre la puerta automáticamente. |
| CR-006 | Despliegue en la nube (11/11/2026): frontend en Vercel, API y MySQL en Railway, y agente local del lector AS608 por WebSocket (antes registrado aquí como CR-009). |
| CR-007 | Se elimina la simulación de huellas: el registro y la validación usan solo el sensor AS608. |
| CR-008 | Un solo ingreso por día en cualquier plan; una nueva lectura del mismo socio dentro de 30 minutos cuenta como el mismo ingreso. Implementado en el backend (23/11/2026). |
| CR-009 | RNF-007 se verifica solo en Chrome (computador, tablet y celular); Edge y Firefox quedan fuera del alcance (23/11/2026). |
| CR-010 | Aviso por correo 7 días antes del vencimiento (planes de 15 días o más, un solo aviso) y consentimientos del cliente al registrarse: términos y tratamiento de datos (obligatorio) y avisos por correo (opcional). Implementado el 24/11/2026. |

## Pendientes del equipo

- **Cierre:** firmas del acta de cierre (Informe de cierre, sección 20) y sustentación.
- **Datos personales:** completar los datos del gimnasio en el formato de `legal/` y recoger las firmas antes de registrar huellas de socios reales.
- **Despliegue:** pasar Railway al plan Hobby antes del 10/12/2026 (la prueba de 30 días vence alrededor del 11/12) y respaldar la base con `mysqldump` antes de la sustentación.

En los formatos quedaron en blanco, marcados explícitamente, los datos que solo el equipo puede aportar: costos, horas de dedicación, línea base de indicadores, enlace de Figma, resultados de pruebas, declaración de uso de IA y firmas. Al completarlos se actualizan el Markdown y el entregable correspondiente.

## Reglas

- Si un PR cambia una ruta, una tabla o una pantalla, ese mismo PR actualiza el `.md` correspondiente.
- Los Word fuente no se versionan; solo los PDF y Excel finales en `entregables/`.
- Nunca se suben `.env`, `node_modules/`, plantillas en blanco ni archivos temporales de Word (`~$*.docx`).
