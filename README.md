# ZonaFit Evolution

Sistema web para la gestión de un gimnasio: personal, clientes (socios), planes, membresías, biometría y control de acceso.

El repositorio es un **monorepo** con dos aplicaciones:

| Carpeta                     | Qué es                   | Puerto por defecto |
| --------------------------- | ------------------------ | ------------------ |
| `BackendZonafitevolution/`  | API REST en Node.js      | 3000               |
| `FrontendZonafitevolution/` | Frontend en React (Vite) | 5173               |

```
zonafitproyectocompleto/
├── README.md
├── .gitignore
├── BackendZonafitevolution/
│   ├── database/        script SQL de las tablas
│   ├── scripts/         crear-admin.js
│   ├── src/             API: rutas, controladores, servicios, repositorios, modelos
│   ├── .env.example
│   ├── index.js
│   └── package.json
└── FrontendZonafitevolution/
    ├── src/             aplicación React
    ├── .env             (local, no se sube a Git)
    ├── index.html
    └── package.json
```

## Stack

- **Backend:** Node.js, Express 5, MySQL (`mysql2`), JWT y bcrypt.
- **Frontend:** React 19 con Vite, ESLint y CSS propio (tema negro y amarillo).

## Puesta en marcha

Requisitos: Node.js (versión LTS reciente), MySQL y Git.

### 1. Backend

Desde `BackendZonafitevolution/`:

1. Instalar dependencias: `npm install`
2. Crear la base de datos y las tablas:

```
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"
   mysql -u root -p zonafitevolution < database/init.sql
```

Atención: `init.sql` elimina y vuelve a crear `roles`, `usuarios` y `membresias`. No lo ejecutes si ya tienes datos que quieras conservar. 3. Copiar `.env.example` como `.env` y completar `DB_PASSWORD`, `JWT_SECRET` y `BIOMETRIA_SALT`. 4. Crear el primer Admin: `node scripts/crear-admin.js "Nombre" correo@ejemplo.com contrasena`
(se ejecuta dentro de `BackendZonafitevolution/`, porque lee su `.env`). 5. Iniciar el servidor: `npm start` (por defecto en `http://localhost:3000`).

Toda la API cuelga de `/api`. La raíz (`http://localhost:3000/`) responde `{ "error": "Ruta no encontrada" }`, y eso es normal: significa que el servidor está encendido.

### 2. Frontend

Desde `FrontendZonafitevolution/`, con el backend encendido:

1. Instalar dependencias: `npm install`
2. Crear el archivo `.env` (junto a `package.json`, fuera de `src/`) con la dirección de la API:

```
   VITE_API_URL=http://localhost:3000/api
```

3. Iniciar el servidor de desarrollo: `npm run dev`
4. Abrir `http://localhost:5173` e iniciar sesión con el Admin creado en el paso anterior.

Vite solo lee el `.env` al arrancar: si lo cambias, reinicia `npm run dev`.

Scripts disponibles: `npm run dev` (desarrollo), `npm run build` (versión de producción en `dist/`), `npm run preview` (probar esa versión) y `npm run lint` (revisar el código con ESLint).

---

# Backend: API REST

## Corrección de modelo — Épica 1

El sistema distingue dos tipos de entidades:

- **Usuario**: personal del gimnasio (Admin o Empleado), con login propio.
- **Cliente**: socio del gimnasio, con cédula y teléfono, sin acceso al sistema.

Los roles disponibles son solo `admin` (1) y `empleado` (2). Las membresías pertenecen a un cliente (`cliente_id`), no a un usuario.

## Autenticación

`POST /api/auth/login` con `{ "correo": "...", "contrasena": "..." }` devuelve `{ token, usuario }`, donde `usuario` incluye `id`, `nombre`, `correo`, `rol_id` y `fecha_creacion` (nunca la contraseña).
Las demás rutas requieren la cabecera `Authorization: Bearer <token>`. El token dura 8 horas por defecto (`JWT_EXPIRES_IN`).

## Endpoints de Cliente

| Método | Ruta              | Roles permitidos |
| ------ | ----------------- | ---------------- |
| POST   | /api/clientes     | Admin, Empleado  |
| GET    | /api/clientes     | Admin, Empleado  |
| GET    | /api/clientes/:id | Admin, Empleado  |
| PUT    | /api/clientes/:id | Admin, Empleado  |
| DELETE | /api/clientes/:id | Solo Admin       |

Reglas: la cédula es obligatoria, solo numérica (6 a 15 dígitos) y única (409 si ya existe).

## Otros endpoints

| Método            | Ruta                             | Roles permitidos |
| ----------------- | -------------------------------- | ---------------- |
| POST              | /api/auth/login                  | Público          |
| POST, GET, DELETE | /api/usuarios, /api/usuarios/:id | Solo Admin       |
| GET               | /api/roles                       | Solo Admin       |
| POST, GET         | /api/membresias                  | Admin, Empleado  |
| GET               | /api/membresias/:id              | Admin, Empleado  |
| PATCH             | /api/membresias/:id/estado       | Admin, Empleado  |
| DELETE            | /api/membresias/:id              | Solo Admin       |

## Códigos de respuesta

`400` datos inválidos · `401` sin token o token inválido · `403` rol sin permiso · `404` no encontrado · `409` duplicado.

Todos los errores llegan con el formato `{ "error": "mensaje" }`.

## Épica 2, Sprint 1 — Catálogo de Planes

Se separó la lógica de "plan" (catálogo reutilizable) de "membresía" (instancia
asignada a un cliente). Antes, la duración y el precio estaban hardcodeados en
el código; ahora se gestionan desde la tabla `planes`.

Las membresías ya no guardan `tipo` ni `precio`: referencian un plan (`plan_id`) y la
fecha de fin se calcula con la duración de ese plan.

## Endpoints de Plan

| Método | Ruta                       | Roles permitidos |
| ------ | -------------------------- | ---------------- |
| POST   | /api/planes                | Solo Admin       |
| GET    | /api/planes                | Admin, Empleado  |
| GET    | /api/planes/:id            | Admin, Empleado  |
| PUT    | /api/planes/:id            | Solo Admin       |
| PATCH  | /api/planes/:id/desactivar | Solo Admin       |
| DELETE | /api/planes/:id            | Solo Admin       |

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

| Método | Ruta                           | Roles permitidos |
| ------ | ------------------------------ | ---------------- |
| GET    | /api/membresias/buscar/:cedula | Admin, Empleado  |
| POST   | /api/membresias/renovar        | Admin, Empleado  |

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

| Método | Ruta                       | Roles permitidos |
| ------ | -------------------------- | ---------------- |
| POST   | /api/biometria/registrar   | Admin, Empleado  |
| POST   | /api/biometria/identificar | Admin, Empleado  |
| DELETE | /api/biometria/:cliente_id | Solo Admin       |

`POST /api/biometria/registrar` recibe `{ "cliente_id": 5, "identificadorSimulado": "dedo_juan_01" }`.
`POST /api/biometria/identificar` recibe `{ "identificadorSimulado": "dedo_juan_01" }` y devuelve los datos del cliente.

## Épica 3, Sprint 2 — Validación automática de acceso (HU06)

Se implementó el patrón State para representar los distintos estados de
una membresía frente al acceso físico (activa, vencida, cancelada, sin
registro). El servicio `accesoFisico.service.js` actúa como Facade,
coordinando identificación biométrica + validación de membresía +
registro de auditoría en una sola operación.

Todo intento de acceso (permitido o denegado) queda registrado en
`registros_acceso` para trazabilidad.

Estructura del patrón State (`src/estadosAcceso/`):

- `estadoAcceso.interface.js` — contrato con `evaluar(membresia)`.
- `estadoActivo.js`, `estadoVencido.js`, `estadoCancelado.js`, `estadoSinMembresia.js` — un estado por clase.
- `estadoAcceso.factory.js` — `obtenerEstado(membresia)` elige el estado según la membresía más reciente del cliente.

Reglas de decisión:

- Se permite el ingreso solo si la membresía más reciente está `activa` y su `fecha_fin` es hoy o posterior.
- Una membresía que figura `activa` pero cuya `fecha_fin` ya pasó se deniega como vencida.
- Si `fecha_fin` falta o no es una fecha válida, se deniega.
- "Hoy" es la fecha local del servidor.
- Un cliente que renovó con la membresía vigente sigue con acceso: la anterior queda `cancelada` y la nueva `activa` empieza al día siguiente del vencimiento.

## Endpoints de Control de Acceso

| Método | Ruta                         | Roles permitidos |
| ------ | ---------------------------- | ---------------- |
| POST   | /api/acceso-fisico/validar   | Admin, Empleado  |
| GET    | /api/acceso-fisico/historial | Admin, Empleado  |

`POST /api/acceso-fisico/validar` recibe `{ "identificadorSimulado": "dedo_mario" }` y devuelve
`{ "cliente": { "id", "nombre", "cedula" }, "permitido": true|false, "motivo": "..." }`.
Un acceso denegado por la membresía responde `200` con `permitido: false`; la lectura debe mirar ese campo.
Una huella que no corresponde a ningún cliente responde `404` y también queda registrada en la auditoría.

`GET /api/acceso-fisico/historial` devuelve los 50 eventos más recientes, del más nuevo al más antiguo,
con `nombre_cliente` (`null` si la huella no se reconoció).

## Variables de entorno del backend

Archivo `BackendZonafitevolution/.env` (no se sube a Git; la plantilla es `.env.example`):

| Variable                                                  | Descripción                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Conexión a MySQL                                                                       |
| `PORT`                                                    | Puerto del servidor (3000 por defecto)                                                 |
| `JWT_SECRET`                                              | Clave para firmar los tokens (obligatoria)                                             |
| `JWT_EXPIRES_IN`                                          | Duración del token (`8h` por defecto)                                                  |
| `BIOMETRIA_SALT`                                          | Sal para los templates biométricos (obligatoria; no cambiarla con huellas registradas) |
| `TIPO_LECTOR`                                             | Adaptador del lector biométrico (`simulador` por defecto)                              |

---

# Frontend: React

Aplicación de una sola página (SPA) en `FrontendZonafitevolution/` que consume la API del backend.
Es la interfaz oficial del sistema: el backend ya no sirve pantallas HTML, solo la API.

## Estado actual

| Funcionalidad                                                                  | Estado       |
| ------------------------------------------------------------------------------ | ------------ |
| Inicio de sesión con JWT contra `POST /api/auth/login`                         | Implementado |
| Mensajes de error (credenciales inválidas, servidor sin conexión)              | Implementado |
| Sesión persistente (sobrevive a recargar la página)                            | Implementado |
| Cierre de sesión                                                               | Implementado |
| Tema visual negro y amarillo, responsive                                       | Implementado |
| Rutas con React Router, menú lateral y barra superior                          | Pendiente    |
| Rutas protegidas y menú según el rol                                           | Pendiente    |
| Pantallas de datos (clientes, planes, membresías, biometría, acceso, usuarios) | Pendiente    |

Tras iniciar sesión, la aplicación muestra una pantalla de bienvenida con el nombre y el rol del usuario.

## Variables de entorno

Archivo `FrontendZonafitevolution/.env` (no se sube a Git):

| Variable       | Descripción                    | Valor local                 |
| -------------- | ------------------------------ | --------------------------- |
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:3000/api` |

Solo las variables que empiezan con `VITE_` quedan disponibles en el navegador, mediante `import.meta.env`.

## Estructura de `src/`

```
src/
├── pages/
│   └── Login.jsx           formulario de inicio de sesión
├── services/
│   ├── api.js              función base para llamar a la API
│   └── authService.js      llamadas de autenticación
├── App.jsx                 estado de sesión y pantalla a mostrar
├── App.css                 estilos de las pantallas (login, bienvenida)
├── index.css               estilos globales y paleta de colores
└── main.jsx                punto de entrada (monta React)
```

## Autenticación y sesión

1. `Login.jsx` envía `{ correo, contrasena }` a `POST /api/auth/login` mediante `authService.iniciarSesion`.
2. Si la API responde correctamente, el `token` y el `usuario` se guardan en `localStorage` (claves `token` y `usuario`).
3. `App.jsx` lee el usuario guardado al iniciar, por lo que la sesión se conserva al recargar.
4. `api.js` agrega automáticamente la cabecera `Authorization: Bearer <token>` a cada petición.
5. Al cerrar sesión se borran ambas claves y se vuelve al formulario de login.

El rol llega en `usuario.rol_id`: `1` = Administrador, `2` = Empleado (los mismos valores del backend).

## Capa de servicios

Los componentes no usan `fetch` directamente: todas las peticiones pasan por `peticion(ruta, opciones)` en `src/services/api.js`, que:

- Antepone `VITE_API_URL` a la ruta.
- Envía y recibe JSON, e incluye el token si existe.
- Convierte los errores de la API (`{ "error": "..." }`) en un `Error` de JavaScript con ese mensaje.
- Muestra "No se pudo conectar con el servidor" si el backend no responde.

Cada recurso tendrá su propio archivo en `services/`, con funciones que llaman a `peticion` (por ejemplo, `authService.js`).

## Estilos

- Tema negro y amarillo con la tipografía Poppins.
- Los colores se definen una sola vez como variables CSS en `src/index.css` y se usan en toda la aplicación:

| Variable           | Color     | Uso                        |
| ------------------ | --------- | -------------------------- |
| `--negro`          | `#0d0d0d` | Fondo general              |
| `--negro-claro`    | `#1a1a1a` | Tarjetas y paneles         |
| `--gris-borde`     | `#2e2e2e` | Bordes                     |
| `--gris-texto`     | `#a8a8a8` | Texto secundario           |
| `--amarillo`       | `#ffd600` | Color de marca, botones    |
| `--amarillo-hover` | `#ffe44d` | Botones al pasar el cursor |
| `--blanco`         | `#ffffff` | Texto principal            |
| `--rojo`           | `#ff4d4d` | Mensajes de error          |

- `index.css` contiene la paleta, el reset y los botones globales; `App.css` contiene el login y la pantalla de bienvenida.

## Convenciones

- Los nombres de archivo respetan mayúsculas exactas (`Login.jsx`, `authService.js`): en Windows funciona igual, pero en Linux o macOS un nombre mal escrito rompe la importación.
- Un componente por archivo, con nombre en mayúscula inicial y `export default`.
- Los componentes dibujan; las llamadas al servidor viven en `services/`.
- Nunca se suben archivos `.env` (el `.gitignore` de la raíz los excluye).

## Pendientes del frontend

- React Router: rutas con URL propia, menú lateral y barra superior.
- Rutas protegidas y menú según el rol (Admin y Empleado).
- Clientes: lista (`GET /api/clientes`), registro, edición y eliminación.
- Planes: catálogo y gestión (solo Admin).
- Membresías: asignación y renovación rápida por cédula.
- Biometría: registro de huella simulada.
- Control de acceso: validación por huella simulada e historial.
- Usuarios: gestión (solo Admin).
- Manejo automático de token vencido: ante una respuesta `401`, cerrar la sesión y avisar al usuario.
- Los módulos de pagos y reportes aún no tienen endpoints en el backend.

---

# Flujo de trabajo en equipo

- El repositorio usa ramas `feature/*`, `release/*`, `develop` y `main`.
- El frontend React se integra mediante Pull Request.
- Antes de fusionar, revisar en "Files changed" que no se suban `.env` ni `node_modules/`.
- Cada integrante crea su propio usuario Admin en su base de datos local con `scripts/crear-admin.js`.
