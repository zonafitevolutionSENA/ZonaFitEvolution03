# Changelog

Cambios relevantes de Zona Fit Evolution. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) con las categorías de la Guía de estructura del repositorio. El proyecto aún no tiene versión etiquetada: la `v1.0.0` se crea al cierre (12/12/2026).

## [Sin publicar]

### Added
- Pruebas automáticas de las reglas de seguridad (`npm test`) y ciclo de integración CP-001 a CP-022 contra una base MySQL de pruebas (`npm run pruebas-cp`), con el reporte en `docs/pruebas/`.
- Diagramas con un solo estilo en `docs/diagramas/` y `docs/analisis/casos-uso/`, incluido el de estados de la membresía.
- Procedimientos del Manual de usuario con capturas, `LICENSE` y este `CHANGELOG.md`.

### Removed
- Ruta `DELETE /api/clientes/:id`: los clientes no se eliminan (RN-001, TT-002).

### Security
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
