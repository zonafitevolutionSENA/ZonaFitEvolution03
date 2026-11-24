# Changelog

Cambios relevantes de Zona Fit Evolution. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) con las categorías de la Guía de estructura del repositorio. La versión de entrega es la `v1.0.0` (23/11/2026); la `v1.1.0` (24/11/2026) agrega la recuperación de contraseña, los correos y los avisos de vencimiento. Cada una tiene su etiqueta y su Release en GitHub.

## [Sin publicar]

## [1.1.0] – 24/11/2026

Recuperación de contraseña, envío de correos por Brevo, aviso de vencimiento y consentimientos del cliente (CR-010 y CR-011), con la documentación actualizada (etiqueta `v1.1.0`).

### Added
- Botón de regreso (flecha) en la esquina superior derecha: vuelve a la pantalla anterior; se desactiva cuando no hay a dónde regresar.
- Aviso por correo 7 días antes del vencimiento de la membresía (CR-010): un solo aviso, planes de 15 días o más (tiqueteras incluidas), solo a clientes que lo autorizaron y que no han renovado. Tarea diaria a las 8:00; tabla `avisos_membresia`.
- Consentimientos del cliente (Ley 1581): casilla obligatoria de términos y tratamiento de datos al registrar y casilla opcional de avisos por correo, con la fecha de cada aceptación (`clientes.terminos_aceptados_en`, `clientes.avisos_aceptados_en`). Los clientes ya registrados no reciben avisos hasta que los autoricen al editar.
- Recuperación de contraseña del personal en tres pasos (código de 6 dígitos al correo, 10 minutos, un solo uso, 5 intentos). Al cambiarla se cierran las sesiones abiertas y llega un aviso al correo. Base de datos: tabla `recuperaciones_contrasena` y columna `usuarios.contrasena_cambiada_en`.
- Envío de correos por la API HTTPS de Brevo (`BREVO_API_KEY`, `CORREO_REMITENTE`), porque Railway bloquea el SMTP en Trial y Hobby. Gmail por SMTP queda como alternativa en local.
- Contrato OpenAPI 3 de la API (`BackendZonafitevolution/openapi.yaml`) con las 35 operaciones, sus cuerpos, respuestas, errores y seguridad.
- Swagger UI en `/api/docs` y el contrato en JSON en `/api/openapi.json`.
- Prueba `test/openapi.test.js`: compara el contrato con las rutas de Express (93 pruebas en total con las de recuperación de contraseña, avisos y consentimientos).

### Changed
- La sesión del frontend se guarda en `sessionStorage` (clave `zonafitSesion`) en lugar de `localStorage`: se conserva al recargar mientras la pestaña siga abierta y termina al cerrarla; un token vencido no se restaura.
- `init.sql` ya no tiene `DROP TABLE`: se puede volver a ejecutar sobre una base con datos y agrega solo las columnas y tablas que falten. En Railway se ejecuta antes de desplegar cada cambio de esquema.
- La base de datos pasa de 7 a 9 tablas (`recuperaciones_contrasena` y `avisos_membresia`).
- Documentación actualizada con la recuperación de contraseña, el envío de correos (Brevo), los avisos de vencimiento, los consentimientos, la Política de tratamiento de datos y los términos y condiciones (`docs/legal`).

### Fixed
- Botón de regreso: ahora vuelve a la ventana anterior (cierra el formulario o la ventana abierta antes de cambiar de sección) y se puede pulsar varias veces seguidas; antes el bloqueo anti doble clic ignoraba el segundo clic durante 2 segundos.
- La página estaba declarada en inglés (`lang="en"`): Chrome la traducía al español y cambiaba palabras (por ejemplo, «Registrar» por «Registrador»). Ahora se declara en español, sin traducción automática, y el título de la pestaña es «Zona Fit Evolution».
- Guía del repositorio: el historial de versiones 0.4 y 0.5 había quedado en la tabla de liberaciones.

### Security
- Las reglas de contraseña (8 caracteres como mínimo, 72 bytes como máximo, letras y números y sin espacios) se validan también en el backend (`utils/contrasena.js`), no solo en el formulario.
- Revocación de sesiones: el middleware de autenticación consulta al usuario en cada petición y rechaza los tokens emitidos antes del último cambio de contraseña o de un usuario eliminado.
- Límites de intentos en la recuperación: 10 solicitudes por IP y 3 por IP y correo cada 15 minutos, 20 verificaciones y 10 restablecimientos; la respuesta es la misma exista o no el correo.
- Ningún Administrador puede cambiar la contraseña de otra cuenta: solo la persona dueña del correo, con el código.
- Cabeceras de seguridad en el frontend de Vercel (`vercel.json`): Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy y Permissions-Policy.

## [1.0.0] – 23/11/2026

Versión final de la entrega (etiqueta `v1.0.0`).

### Added
- Un solo ingreso por día en cualquier plan (CR-008): una nueva lectura del mismo socio dentro de 30 minutos cuenta como el mismo ingreso; después se niega con «Ya ingresó hoy a las …».
- El historial de accesos se conserva 3 meses: la tarea diaria de las 00:05 borra los intentos más antiguos (DAT-05).
- Latido del agente del lector (ping cada 15 s): si el servidor se reinicia sin cerrar la conexión, el agente se reconecta solo.
- Declaración de uso de IA (Claude y Gemini) en el informe de cierre y la guía del repositorio.
- Evidencias de la entrega final en `docs/pruebas/` y `docs/evidencias/`: ciclo CIC-02 con el sensor en producción, mínimo privilegio en MySQL, compatibilidad y accesibilidad, prueba de restauración y contribución individual.
- Integración continua en GitHub Actions: pruebas, lint, build, `npm audit` y ciclo de casos con MySQL en cada pull request.
- Logs del backend con fecha, nivel, módulo y contexto (`NIVEL_LOG`).
- Pruebas unitarias de los estados de acceso y de las reglas de renovación y cambio de estado de membresías.
- Sección de autores en el README y formato de autorización de datos biométricos en `docs/legal`.
- Pruebas automáticas de las reglas de seguridad (`npm test`) y ciclo de integración CP-001 a CP-022 contra una base MySQL de pruebas (`npm run pruebas-cp`), con el reporte en `docs/pruebas/`.
- Diagramas con un solo estilo en `docs/diagramas/` y `docs/analisis/casos-uso/`, incluido el de estados de la membresía.
- Procedimientos del Manual de usuario con capturas, `LICENSE` y este `CHANGELOG.md`.

### Changed
- RNF-007 se verifica en Chrome (computador, tablet y celular) por CR-009.
- La pantalla de inicio de sesión usa `<main>` como región principal (accesibilidad).
- Retención de respaldos: uno semanal y uno antes de cada despliegue, conservando los últimos 4.

### Removed
- Archivos vacíos `cd` y `npm` creados por error en `BackendZonafitevolution/`.
- Ruta `DELETE /api/clientes/:id`: los clientes no se eliminan (RN-001, TT-002).

### Security
- La API se conecta a MySQL con el usuario `zonafit_app` (solo SELECT, INSERT, UPDATE y DELETE); `root` queda para administrar (SEG-08).
- El backend impide eliminar la propia cuenta y al último Administrador (RN-012, TT-001).

## 2026-11-21

### Changed
- Pantalla de ingreso: «Tu entrenamiento empieza aquí» durante la espera y «Acércate a recepción para registrar tu huella» por 4 segundos cuando la huella no está registrada.

## 2026-11-12

### Added
- El agente encuentra solo el puerto del lector (`PUERTO_LECTOR=auto`) y la carpeta `AgenteLector/recepcion` instala el arranque automático, la pantalla de ingreso y los accesos del escritorio.

### Fixed
- La pantalla de ingreso se reconecta sola con el lector cada 5 segundos al prender el portátil.

## 2026-11-11

### Added
- Despliegue en la nube: frontend en Vercel; API y MySQL en Railway.
- Agente local del lector AS608 conectado por WebSocket (`/agente`) y adaptador remoto (ADR-008).
- Pantalla de ingreso autorizada con `PANTALLA_TOKEN` y ruta `GET /api/salud` con el estado del lector.

### Fixed
- Hora de Colombia en las conexiones a MySQL; mensaje «Lector desconectado» en los errores del lector.

### Security
- CORS restringido a `ORIGEN_FRONTEND`, `trust proxy` para Railway y validación de secretos al arrancar.

## 2026-11-09 a 2026-11-10

### Added
- Sensor AS608 integrado para registrar y validar huellas; registro de huella desde Clientes y pantalla de ingreso aparte.
- Estado `pendiente` en las membresías y tarea diaria que vence las activas y activa las pendientes.
- Correo obligatorio y válido para los clientes.

### Removed
- Lector simulado (CR-007).

### Fixed
- Una huella no se puede registrar para dos clientes; se evita el error 0x17 del sensor.

## 2026-11-03

### Added
- Planes con las tarifas 2026 y tiqueteras con un descuento por día.

### Security
- Límite de 5 intentos de inicio de sesión cada 15 minutos sin revelar si el correo existe; solo el Administrador reactiva membresías; dependencias actualizadas con `npm audit fix`.

## 2026-10 (sprints 9 y 10)

### Added
- Monorepo con frontend en React y Vite: pantallas de clientes, membresías, planes, historial, personal y registro financiero, con validaciones en el navegador.

## 2026-07 a 2026-09 (sprints 3 a 8)

### Added
- API REST con Express y MySQL: usuarios y roles con JWT, clientes, planes, membresías, renovación por cédula, registro biométrico (Adapter) y validación de acceso (State y Facade) con historial.
