# ZonaFit Evolution

API REST para la gestión de un gimnasio: personal, clientes (socios) y membresías.

**Stack:** Node.js, Express 5, MySQL (`mysql2`), JWT y bcrypt.

## Puesta en marcha

1. Instalar dependencias: `npm install`
2. Crear la base de datos y las tablas:
   ```
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"
   mysql -u root -p zonafitevolution < database/init.sql
   ```
   Atención: `init.sql` elimina y vuelve a crear `roles`, `usuarios` y `membresias`.
3. Copiar `.env.example` como `.env` y completar `DB_PASSWORD` y `JWT_SECRET`.
4. Crear el primer Admin: `node scripts/crear-admin.js "Nombre" correo@ejemplo.com contrasena`
5. Iniciar el servidor: `npm start` (por defecto en `http://localhost:3000`).
6. Abrir el frontend en `http://localhost:3000/login.html`.

## Corrección de modelo — Épica 1

El sistema distingue dos tipos de entidades:
- **Usuario**: personal del gimnasio (Admin o Empleado), con login propio.
- **Cliente**: socio del gimnasio, con cédula y teléfono, sin acceso al sistema.

Los roles disponibles son solo `admin` (1) y `empleado` (2). Las membresías pertenecen a un cliente (`cliente_id`), no a un usuario.

## Autenticación

`POST /api/auth/login` con `{ "correo": "...", "contrasena": "..." }` devuelve un token JWT.
Las demás rutas requieren la cabecera `Authorization: Bearer <token>`.

## Endpoints de Cliente

| Método | Ruta | Roles permitidos |
|---|---|---|
| POST | /api/clientes | Admin, Empleado |
| GET | /api/clientes | Admin, Empleado |
| GET | /api/clientes/:id | Admin, Empleado |
| PUT | /api/clientes/:id | Admin, Empleado |
| DELETE | /api/clientes/:id | Solo Admin |

Reglas: la cédula es obligatoria, solo numérica (6 a 15 dígitos) y única (409 si ya existe).

## Otros endpoints

| Método | Ruta | Roles permitidos |
|---|---|---|
| POST | /api/auth/login | Público |
| POST, GET, DELETE | /api/usuarios, /api/usuarios/:id | Solo Admin |
| GET | /api/roles | Solo Admin |
| POST, GET | /api/membresias | Admin, Empleado |
| GET | /api/membresias/:id | Admin, Empleado |
| PATCH | /api/membresias/:id/estado | Admin, Empleado |
| DELETE | /api/membresias/:id | Solo Admin |

## Códigos de respuesta

`400` datos inválidos · `401` sin token o token inválido · `403` rol sin permiso · `404` no encontrado · `409` duplicado.

## Frontend — HU12

Pantallas implementadas (carpeta `public/`, servidas por el mismo servidor Express):
- `login.html` — autenticación de Admin/Empleado
- `panel.html` — panel principal con acceso a módulos según sesión activa
- `clientes.html` — registro y listado de clientes (socios del gimnasio)
- `renovar.html` — renovación rápida de membresías buscando al cliente por su cédula (HU04)
- `biometria.html` — registro de huella de un cliente en modo simulador (HU05)

Criterio cumplido: interfaz sencilla que permite al Empleado registrar y consultar
clientes sin necesidad de herramientas externas (Postman/curl), con feedback visual
de éxito, error y expiración de sesión.

Notas de funcionamiento:
- La sesión se guarda en `localStorage` (`token` y `usuario`). Las páginas protegidas
  incluyen `js/auth-guard.js` y redirigen a `login.html` si no hay sesión.
- Si la API responde 401 (token vencido), se avisa al usuario y se cierra la sesión.
- El formulario valida la cédula (solo números, 6 a 15 dígitos) antes de llamar a la API.
- Los datos de clientes se escapan antes de mostrarse en la tabla para evitar inyección de HTML.
- `js/login.js` y `js/clientes.js` apuntan a `http://localhost:3000/api`; si cambias `PORT`
  en `.env`, actualiza la constante `API_URL` en ambos archivos.

## Épica 2, Sprint 1 — Catálogo de Planes

Se separó la lógica de "plan" (catálogo reutilizable) de "membresía" (instancia
asignada a un cliente). Antes, la duración y el precio estaban hardcodeados en
el código; ahora se gestionan desde la tabla `planes`.

Las membresías ya no guardan `tipo` ni `precio`: referencian un plan (`plan_id`) y la
fecha de fin se calcula con la duración de ese plan.

## Endpoints de Plan

| Método | Ruta | Roles permitidos |
|---|---|---|
| POST | /api/planes | Solo Admin |
| GET | /api/planes | Admin, Empleado |
| GET | /api/planes/:id | Admin, Empleado |
| PUT | /api/planes/:id | Solo Admin |
| PATCH | /api/planes/:id/desactivar | Solo Admin |
| DELETE | /api/planes/:id | Solo Admin |

`GET /api/planes?activos=true` devuelve solo los planes disponibles para nuevas asignaciones.

## Crear una membresía

`POST /api/membresias` (Admin, Empleado) con el cuerpo:

```json
{ "plan_id": 3, "fecha_inicio": "2026-09-18", "cliente_id": 1 }
```

La `fecha_fin` la calcula el servidor (`fecha_inicio` + `duracion_dias` del plan). Solo se pueden
asignar planes activos y un cliente no puede tener dos membresías activas a la vez.

## Regla de negocio (CU-03)
No se puede eliminar un plan que tenga membresías activas asociadas.
En su lugar, se recomienda desactivarlo (`PATCH /:id/desactivar`), lo que
lo oculta de nuevas asignaciones sin afectar el historial. Los planes con
membresías históricas (vencidas o canceladas) tampoco se pueden eliminar.

## Épica 2, Sprint 2 — Renovación rápida (HU04)

Dado que el gimnasio no utiliza tarjetas físicas (solo huella/identificación
por cédula), la renovación de membresía se realiza ubicando al cliente por
su número de cédula, sin necesidad de volver a capturar sus datos personales.

## Endpoints de renovación

| Método | Ruta | Roles permitidos |
|---|---|---|
| GET | /api/membresias/buscar/:cedula | Admin, Empleado |
| POST | /api/membresias/renovar | Admin, Empleado |

`GET /api/membresias/buscar/:cedula` devuelve los datos del cliente y su membresía más reciente
(estado, `fecha_fin` y plan; los campos de membresía vienen en `null` si nunca tuvo una).
`POST /api/membresias/renovar` recibe `{ "cedula": "...", "plan_id": 3 }` y se puede renovar con
un plan distinto al anterior.

## Regla de negocio
Si el cliente aún tiene una membresía activa vigente, la renovación se
encadena a partir del día siguiente a su vencimiento (no se pierden días
ya pagados). Si está vencida o es la primera membresía, inicia el mismo
día de la renovación.

Detalles de la implementación:
- Una membresía que figura como `activa` pero cuya `fecha_fin` ya pasó se considera vencida:
  se marca como `vencida` y la nueva empieza hoy. Si vence hoy, todavía se considera vigente.
- Al encadenar, la membresía anterior pasa a `cancelada` para que el cliente tenga una sola
  membresía activa. El cambio de estado y la creación de la nueva se hacen en una sola
  transacción, y dos renovaciones simultáneas del mismo cliente no pueden dejar dos activas.
- Las columnas de fecha (`fecha_inicio`, `fecha_fin`) llegan en la API como texto `AAAA-MM-DD`.

## Épica 3, Sprint 1 — Registro biométrico (HU05)

Se implementó el patrón Adapter para desacoplar la lógica de negocio del
hardware físico. Actualmente el sistema opera en modo simulador
(`TIPO_LECTOR=simulador` en `.env`); cuando se adquiera el lector físico,
solo se debe crear un nuevo adaptador que implemente `LectorBiometrico`
y cambiar esa variable de entorno — sin tocar servicios, controladores
ni rutas existentes.

Cumplimiento de la restricción de privacidad: el sistema nunca almacena
imágenes de huellas, solo un hash irreversible (`template_hash`).

Estructura de la capa de hardware (`src/hardware/`):
- `lectorBiometrico.interface.js` — contrato con `capturar()` y `comparar(templateA, templateB)`.
- `simuladorLector.adapter.js` — simulador: genera un SHA-256 a partir de un identificador de prueba y la sal.
- `lector.factory.js` — `obtenerLector()` elige el adaptador según `TIPO_LECTOR`.

Variables de entorno de esta épica:
- `TIPO_LECTOR`: tipo de lector a usar (`simulador` por defecto).
- `BIOMETRIA_SALT`: obligatoria para generar los templates. No debe cambiarse cuando ya hay huellas
  registradas, porque los templates guardados dejarían de coincidir.

Reglas de negocio:
- Un cliente tiene como máximo una huella, y una misma huella no puede registrarse en dos clientes.
- Las respuestas de la API nunca incluyen el `template_hash`.
- Para volver a registrar la huella de un cliente, primero debe eliminarse la anterior (solo Admin).

## Endpoints de Biometría

| Método | Ruta | Roles permitidos |
|---|---|---|
| POST | /api/biometria/registrar | Admin, Empleado |
| POST | /api/biometria/identificar | Admin, Empleado |
| DELETE | /api/biometria/:cliente_id | Solo Admin |

`POST /api/biometria/registrar` recibe `{ "cliente_id": 5, "identificadorSimulado": "dedo_juan_01" }`.
`POST /api/biometria/identificar` recibe `{ "identificadorSimulado": "dedo_juan_01" }` y devuelve los datos del cliente.
