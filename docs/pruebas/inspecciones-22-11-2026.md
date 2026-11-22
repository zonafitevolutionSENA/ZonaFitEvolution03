# Inspecciones de calidad · 22/11/2026

> Evidencia de los requisitos que el Plan de calidad verifica por inspección (RNF-005 y RNF-006). Rama `develop`, después del PR #74.

## RNF-005 · Mantenibilidad

| Revisión | Comando o criterio | Resultado |
| --- | --- | --- |
| Lint del frontend | `npm run lint` en `FrontendZonafitevolution` | Sin errores ni advertencias |
| Build del frontend | `npm run build` | Construcción exitosa (`dist/`) |
| Dependencias de producción | `npm audit --omit=dev` en backend, frontend y agente | 0 vulnerabilidades en los tres |
| Pruebas automáticas | `npm test` en `BackendZonafitevolution` | 24 aprobadas, 0 fallidas |
| Capas del backend | Carpetas `routes`, `controllers`, `services`, `repositories`, `models`, `middlewares`, `estadosAcceso`, `hardware`, `jobs` | El SQL solo está en `repositories` y las reglas en `services`, como indica el README |
| Patrones documentados | Arquitectura 5.2 y diagrama DIA-CLA-02 | Facade, State, Adapter, Factory y Singleton presentes en el código |

Resultado: **cumple**.

## RNF-006 · Privacidad (Ley 1581 de 2012)

| Revisión | Evidencia | Resultado |
| --- | --- | --- |
| Datos del cliente | `clientes`: nombre, cédula, correo, teléfono y fecha de registro (`database/init.sql`) | Solo los datos necesarios para identificar al socio y contactarlo |
| Huella | La plantilla queda dentro del sensor AS608; `plantillas_biometricas.template_hash` guarda un hash irreversible de la posición con `BIOMETRIA_SALT` (`as608Lector.adapter.js`) | No se guardan imágenes ni plantillas de huellas en la base |
| Respuestas de la API | CP-010 del ciclo CIC-01 comprueba que la respuesta del registro no expone el hash | Aprobado ([CIC-01](CIC-01-resultados.md)) |
| Contraseñas | `usuarios.contrasena` con bcrypt; nunca se devuelve en las respuestas | Cumple |
| Borrado de la huella | `DELETE /api/biometria/:clienteId` la borra del sensor y de la base (CP-022) | Aprobado |

Resultado: **cumple**. Falta el formato de autorización de tratamiento de datos biométricos firmado por cada socio, que es responsabilidad del gimnasio (ver `docs/legal/`).
