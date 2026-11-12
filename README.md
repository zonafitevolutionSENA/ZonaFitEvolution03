# ZonaFit Evolution

Sistema web para la gestión de un gimnasio: personal, clientes (socios), planes, membresías, biometría y control de acceso.

El repositorio es un **monorepo** con dos aplicaciones y el agente del lector de huellas:

| Carpeta                     | Qué es                                                   | Puerto por defecto |
| --------------------------- | -------------------------------------------------------- | ------------------ |
| `BackendZonafitevolution/`  | API REST en Node.js                                      | 3000               |
| `FrontendZonafitevolution/` | Frontend en React (Vite)                                 | 5173               |
| `AgenteLector/`             | Agente que conecta el lector AS608 con la API en la nube | —                  |

**En línea:** frontend en [zona-fit-evolution03.vercel.app](https://zona-fit-evolution03.vercel.app) (Vercel) y API en `https://zonafitevolution03-production.up.railway.app/api` (Railway, con MySQL). Ver [Despliegue en la nube](#despliegue-en-la-nube).

```
zonafitproyectocompleto/
├── README.md
├── .gitignore
├── docs/                documentación del proyecto y entregables SENA
├── AgenteLector/        agente del lector de huellas (portátil con el AS608)
│   ├── .env.example
│   ├── index.js
│   └── package.json
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

## Documentación del proyecto

La documentación formal (formulación, gestión, requisitos, historias de usuario, casos de uso,
arquitectura, UX/UI, calidad, manuales, cierre y sustentación) y los entregables SENA en PDF y Excel
están en [`docs/`](docs/README.md). Este README cubre la instalación, la API y el código.

## Stack

- **Backend:** Node.js, Express 5, MySQL (`mysql2`), JWT y bcrypt.
- **Frontend:** React 19 con Vite, ESLint y CSS propio (tema negro y amarillo).
- **Despliegue:** Vercel (frontend), Railway (API Node.js 20 y MySQL 8.4) y agente local del lector (Node.js 20 + `ws`).

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

Atención: `init.sql` elimina y vuelve a crear `roles`, `usuarios` y `membresias`. No lo ejecutes si ya tienes datos que quieras conservar.

`init.sql` es el único script SQL del proyecto: no hay migraciones. Todo cambio de esquema se hace directamente en ese archivo. Como sus tablas usan `CREATE TABLE IF NOT EXISTS`, una base creada con una versión anterior no recibe los cambios: hay que recrearla (`DROP DATABASE zonafitevolution;` y volver a ejecutar los dos comandos de arriba).

3. Copiar `.env.example` como `.env` y completar `DB_PASSWORD`, `JWT_SECRET` (al menos 32 caracteres: con menos, el servidor no arranca) y `BIOMETRIA_SALT`. 4. Crear el primer Admin: `node scripts/crear-admin.js "Nombre" correo@ejemplo.com contrasena`
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

### Pantalla de ingreso sin sesión

El cliente no necesita una cuenta: la pantalla espera la huella en el lector y muestra el resultado durante dos segundos antes de esperar la siguiente huella. El registro de huellas y las demás funciones administrativas siguen requiriendo sesión.

- **En la nube:** abre una vez `https://zona-fit-evolution03.vercel.app/?pantalla=acceso&token=<PANTALLA_TOKEN>` en el navegador que mostrará la pantalla. El token queda guardado en ese navegador y se quita de la barra de direcciones; desde entonces basta con `?pantalla=acceso`. Sin el token, la API responde «Pantalla de ingreso no autorizada». La pantalla puede estar en cualquier equipo con internet; el lector debe estar conectado al portátil donde corre el agente.
- **En local** (`PANTALLA_TOKEN` vacío): abre `http://127.0.0.1:5173/?pantalla=acceso` en el mismo equipo de la API. La ruta solo acepta conexiones directas desde ese equipo y el origen `http://127.0.0.1:5173` o `http://localhost:5173`; para otro origen, configura `ORIGEN_PANTALLA_ACCESO` y reinicia el backend.

## Despliegue en la nube

| Pieza                     | Dónde                                         | Dirección                                                |
| ------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Frontend                  | Vercel (plan Hobby)                           | https://zona-fit-evolution03.vercel.app                  |
| API                       | Railway (Node.js 20, siempre encendida)       | https://zonafitevolution03-production.up.railway.app/api |
| Base de datos             | MySQL 8.4 en Railway, mismo proyecto          | Red privada de Railway (no expuesta)                     |
| Agente del lector + AS608 | Portátil con el lector conectado por USB      | Se conecta a `wss://…/agente`                            |

- Railway y Vercel despliegan solos al fusionar en `main`. Railway solo redespliega cuando cambia `BackendZonafitevolution/` (Watch Paths) y comprueba `GET /api/salud` antes de dar por bueno el despliegue.
- `GET /api/salud` responde `{"estado":"ok","lector":"conectado"|"desconectado"}`: sirve para saber si la API está viva y si el agente del lector está conectado.
- En Railway el backend usa `TIPO_LECTOR=remoto`: no abre el USB, sino que envía las órdenes `registrar`, `capturar` y `eliminar` al agente por WebSocket (ADR-008).
- Las variables de producción viven en Railway (backend) y en Vercel (`VITE_API_URL`, de tipo **Config**). Los secretos nunca se suben al repositorio.
- El esquema se cargó una sola vez con `database/init.sql`; si cambia, se recrea la base desde un respaldo (no hay migraciones).
- Costo: Vercel Hobby es gratis; Railway usa la prueba de 30 días ($5 de crédito) y después el plan Hobby ($5 USD/mes).

Procedimiento completo, variables y pruebas de humo: [`docs/manual-tecnico.md`](docs/manual-tecnico.md), sección 11.

### Agente del lector

En el portátil donde está conectado el AS608 (necesita Node.js 20 o superior e internet):

```powershell
cd BackendZonafitevolution
npm install
cd ..\AgenteLector
npm install
copy .env.example .env
npm start
```

En `AgenteLector/.env`: `API_WS_URL=wss://zonafitevolution03-production.up.railway.app/agente`, el mismo `AGENTE_TOKEN` configurado en Railway, `PUERTO_LECTOR` (el COM del CP2102) y el mismo `BIOMETRIA_SALT` con el que se registraron las huellas. Debe aparecer `[agente] conectado al servidor, lector listo`. Mientras la pantalla de ingreso espera un dedo, el agente no imprime nada; solo muestra las huellas leídas, los registros y los errores reales. Si se cae internet, se reconecta solo.

Sin el agente funcionan el login, los clientes, los planes, las membresías y el historial; registrar, eliminar y validar huellas responden «Lector desconectado». El backend local no debe estar encendido al mismo tiempo, porque también usaría el puerto COM del lector.

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
hardware. El sistema trabaja con el lector físico AS608; para usar otro
modelo solo se crea un nuevo adaptador que implemente `LectorBiometrico`
y se agrega a la fábrica, sin tocar servicios, controladores ni rutas.
La simulación de huellas (texto en lugar del dedo) se eliminó al integrar el sensor real.

Cumplimiento de la restricción de privacidad: el sistema nunca almacena
imágenes de huellas, solo un hash irreversible (`template_hash`).

Estructura de la capa de hardware (`src/hardware/`):

- `lectorBiometrico.interface.js` — contrato con `capturar()`, `registrar()`, `eliminar()` y `comparar(templateA, templateB)`.
- `as608Lector.adapter.js` — adaptador del sensor AS608 por puerto serial (ver la sección del lector físico).
- `remotoLector.adapter.js` — adaptador para la nube: reenvía las órdenes al agente del lector y compara los hashes en el servidor.
- `canalAgente.js` — canal WebSocket `/agente`: autentica al agente con `AGENTE_TOKEN`, envía las órdenes con un tiempo máximo de 90 s y detecta desconexiones.
- `lector.factory.js` — `obtenerLector()` crea el adaptador según `TIPO_LECTOR` (`as608` en local o `remoto` en la nube).

Variables de entorno de esta épica:

- `TIPO_LECTOR`: tipo de lector a usar (`as608` por defecto; `remoto` en la nube).
- `PUERTO_LECTOR`: puerto COM del lector (obligatorio con `as608`; con `remoto` va en `AgenteLector/.env`).
- `AGENTE_TOKEN`: token compartido con el agente del lector (obligatorio con `remoto`).
- `BIOMETRIA_SALT`: obligatoria para generar los templates. No debe cambiarse cuando ya hay huellas
  registradas, porque los templates guardados dejarían de coincidir.

Reglas de negocio:

- Un cliente tiene como máximo una huella, y una misma huella no puede registrarse en dos clientes
  (el sensor la busca antes de guardarla y `template_hash` es `UNIQUE` en la base de datos).
- Las respuestas de la API nunca incluyen el `template_hash`.
- Para volver a registrar la huella de un cliente, primero debe eliminarse la anterior (solo Admin).

## Endpoints de Biometría

| Método | Ruta                       | Roles permitidos |
| ------ | -------------------------- | ---------------- |
| POST   | /api/biometria/registrar   | Admin, Empleado  |
| GET    | /api/biometria/registro/estado/:capturaId | Admin, Empleado |
| POST   | /api/biometria/identificar | Admin, Empleado  |
| DELETE | /api/biometria/:cliente_id | Solo Admin       |

`POST /api/biometria/registrar` recibe `{ "cliente_id": 5, "captura_id": "<uuid>" }` y toma la huella del lector.
`captura_id` es opcional: con él, `GET /api/biometria/registro/estado/:capturaId` devuelve la etapa de la lectura
(`conectando`, `primera`, `retirar`, `segunda`, `procesando`) para guiar al usuario.
`POST /api/biometria/identificar` no recibe cuerpo: lee la huella del sensor y devuelve los datos del cliente.

## Lector de huellas físico (AS608)

Siguiendo el patrón Adapter, `src/hardware/as608Lector.adapter.js` maneja el sensor óptico
AS608, conectado al PC por USB con un conversor CP2102 (librería `serialport`). Se configura con
`PUERTO_LECTOR` (el puerto COM que muestra el Administrador de dispositivos).

Funcionamiento:

- **Registro:** el sensor toma dos lecturas del mismo dedo y guarda la huella en su memoria interna,
  en la primera posición libre. En la base de datos solo se guarda un hash irreversible de esa posición.
- **Huellas duplicadas:** antes de guardar, el sensor busca la huella con la primera y con la segunda
  lectura; si ya está guardada, responde `409 Esta huella ya está registrada para otro cliente`.
  No se vuelve a buscar con la plantilla combinada: sin una imagen nueva el AS608 responde `0x17`.
- **Código 0x17:** si el sensor no detecta un dedo nuevo, se responde "El lector no detectó un dedo nuevo.
  Retira el dedo, limpia el lector e inténtalo de nuevo".
- **Identificación:** el sensor busca la huella entre las que tiene guardadas; si no la encuentra,
  la respuesta es `404 Huella no reconocida`.
- Cada lectura espera el dedo hasta 15 segundos; el sensor atiende una operación a la vez.
- La capacidad depende del sensor (el modelo de prueba guarda 300 huellas).
- `DELETE /api/biometria/:cliente_id` borra la huella primero del sensor y después de la base de datos;
  si el sensor no responde, la base de datos no cambia y el cliente conserva su huella.
- En local, el lector se conecta al mismo equipo donde corre el backend (`TIPO_LECTOR=as608`). En la nube se conecta al portátil del agente (`TIPO_LECTOR=remoto`), que reutiliza este mismo adaptador.

Conexión AS608 → CP2102: `V+ → 3V3`, `TX → RXD`, `RX → TXD`, `GND → GND` (TCH, VA, D+ y D- sin conectar).


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
| POST   | /api/acceso-fisico/pantalla/validar | Pantalla de ingreso (`X-Pantalla-Token` en la nube; mismo equipo en local) |
| GET    | /api/salud                   | Pública (estado de la API y del lector) |

`POST /api/acceso-fisico/validar` no recibe cuerpo: lee la huella del sensor y devuelve
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
| `JWT_SECRET`                                              | Clave para firmar los tokens (obligatoria, mínimo 32 caracteres)                       |
| `JWT_EXPIRES_IN`                                          | Duración del token (`8h` por defecto)                                                  |
| `BIOMETRIA_SALT`                                          | Sal para los templates biométricos (obligatoria; no cambiarla con huellas registradas) |
| `TIPO_LECTOR`                                             | Adaptador del lector biométrico: `as608` (por defecto, USB en este equipo) o `remoto` (agente) |
| `PUERTO_LECTOR`                                           | Puerto serial del lector físico (por ejemplo, `COM3`); solo con `as608`                |
| `LECTOR_BAUDIOS`                                          | Velocidad del lector físico (`57600` por defecto)                                      |
| `AGENTE_TOKEN`                                            | Token del agente del lector; obligatorio con `remoto`                                  |
| `PANTALLA_TOKEN`                                          | Token de la pantalla de ingreso en la nube; vacío = solo se acepta en el mismo equipo  |
| `ORIGEN_PANTALLA_ACCESO`                                  | Origen adicional para la pantalla de ingreso local (opcional)                          |
| `ORIGEN_FRONTEND`                                         | Orígenes permitidos por CORS, separados por comas (en la nube, la URL de Vercel)       |
| `TZ`                                                      | Zona horaria del servidor (`America/Bogota`; obligatoria en la nube)                   |

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
| Menú lateral y barra superior                                                  | Implementado |
| Menú según el rol (Admin y Empleado)                                           | Implementado |
| Rutas con React Router                                                         | Pendiente    |
| Inicio (dashboard): acciones rápidas, actividad reciente y notificaciones      | Implementado |
| Clientes: lista, búsqueda, registro, edición y estado de la membresía          | Implementado |
| Planes: catálogo para todos; el Admin crea, edita, activa y desactiva          | Implementado |
| Membresías: listado, asignación y renovación rápida por cédula                 | Implementado |
| Registro de huella desde Clientes y pantalla independiente de ingreso          | Implementado |
| Historial de accesos con filtros por resultado, texto y fechas                 | Implementado |
| Personal: lista, creación y eliminación de usuarios (solo Admin)               | Implementado |
| Registro financiero: resumen de pagos de cada cliente (solo Admin)             | Implementado |

Tras iniciar sesión, la aplicación muestra el Inicio (con el nombre y el rol del usuario) y un menú lateral para pasar entre las pantallas; la navegación es por estado y las rutas con React Router siguen pendientes.

## Variables de entorno

Archivo `FrontendZonafitevolution/.env` (no se sube a Git):

| Variable       | Descripción                    | Valor local                 |
| -------------- | ------------------------------ | --------------------------- |
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:3000/api` (en Vercel: `https://zonafitevolution03-production.up.railway.app/api`) |

Solo las variables que empiezan con `VITE_` quedan disponibles en el navegador, mediante `import.meta.env`.

## Estructura de `src/`

```
src/
├── components/
│   ├── BarraLateral.jsx         menú lateral según el rol
│   ├── BuscadorCliente.jsx      elegir un cliente escribiendo su nombre o cédula
│   ├── Campo.jsx                campo de formulario con su mensaje de error
│   ├── Encabezado.jsx           barra superior con notificaciones y usuario
│   ├── FormularioCliente.jsx    formulario de registro y edición de clientes
│   ├── FormularioMembresia.jsx  formulario para asignar una membresía
│   ├── FormularioPlan.jsx       formulario para crear y editar planes
│   ├── FormularioUsuario.jsx    formulario para crear usuarios del personal
│   ├── RegistrarHuella.jsx      registro de la huella con el lector, guiado por etapas
│   ├── RenovarMembresia.jsx     búsqueda por cédula y renovación rápida
│   └── TablaPagos.jsx           tabla de pagos por cliente con su detalle
├── pages/
│   ├── Clientes.jsx             lista, búsqueda, registro, edición y estado de membresía
│   ├── Finanzas.jsx             registro financiero: resumen de pagos por cliente (solo Admin)
│   ├── Historial.jsx            historial de accesos con filtros
│   ├── Inicio.jsx               dashboard: acciones rápidas y actividad reciente
│   ├── Login.jsx                formulario de inicio de sesión
│   ├── Membresias.jsx           listado, asignación y renovación de membresías
│   ├── PantallaIngreso.jsx      pantalla de ingreso sin sesión (?pantalla=acceso)
│   ├── Personal.jsx             gestión de usuarios del sistema (solo Admin)
│   └── Planes.jsx               catálogo de planes y su gestión (Admin)
├── services/
│   ├── accesoService.js         historial de acceso (/acceso-fisico)
│   ├── api.js                   función base para llamar a la API
│   ├── authService.js           llamadas de autenticación
│   ├── biometriaService.js      registro de huellas y etapa de la lectura (/biometria)
│   ├── clienteService.js        llamadas de clientes (/clientes)
│   ├── dashboardService.js      datos del dashboard (accesos y membresías por vencer)
│   ├── finanzasService.js       datos del registro financiero (clientes, membresías y planes)
│   ├── membresiaService.js      llamadas de membresías (/membresias)
│   ├── planService.js           llamadas de planes (/planes)
│   └── usuarioService.js        llamadas de usuarios (/usuarios)
├── utils/
│   ├── busquedaClientes.js      búsqueda de clientes por nombre o cédula (sin tildes)
│   ├── estadoMembresia.js       reglas de estado de la membresía de un cliente
│   ├── filtrosHistorial.js      validación de fechas y filtros del historial
│   ├── finanzas.js              cálculo de pagos, totales, filtros y orden del registro financiero
│   ├── permisos.js              secciones del menú y qué rol puede verlas
│   ├── validacionesAcceso.js    validación del cliente al registrar la huella
│   ├── validacionesCliente.js   validaciones del formulario de clientes
│   ├── validacionesMembresia.js validaciones de asignar y renovar membresías
│   ├── validacionesPlan.js      validaciones del formulario de planes
│   └── validacionesUsuario.js   validaciones del formulario de personal
├── App.jsx                      estado de sesión y pantalla a mostrar
├── App.css                      estilos de las pantallas (login, bienvenida)
├── index.css                    estilos globales y paleta de colores
└── main.jsx                     punto de entrada (monta React)
```

`utils/` guarda funciones puras sin interfaz (permisos y validaciones); `components/` guarda piezas reutilizables que no son una pantalla completa.

## Validaciones del formulario de clientes

Se validan en el navegador antes de llamar a la API (el backend sigue siendo la validación definitiva):

| Campo    | Regla                                                                      |
| -------- | -------------------------------------------------------------------------- |
| Nombre   | Obligatorio, de 3 a 100 caracteres; solo letras, espacios, `'`, `.` y `-`  |
| Cédula   | Obligatoria, solo dígitos (6 a 15) y no repetida; no se puede editar       |
| Correo   | Opcional; si se escribe, debe tener formato válido (máximo 100 caracteres) |
| Teléfono | Opcional; si se escribe, de 7 a 15 dígitos, puede empezar con `+`          |

Los botones se bloquean mientras se guarda.

## Personal

Solo el **Admin** ve esta sección (el menú la oculta al Empleado y la pantalla se niega a cargar si el rol no es Admin). Lista los usuarios (`GET /api/usuarios`), permite crear (`POST /api/usuarios`) y eliminar (`DELETE /api/usuarios/:id`, con confirmación). El backend no ofrece edición ni desactivación de usuarios.

| Campo      | Validación                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Nombre     | Obligatorio, de 3 a 100 caracteres; letras, espacios, `'`, `.` y `-`                            |
| Correo     | Obligatorio, formato válido, máximo 100 caracteres y no repetido                                |
| Contraseña | De 8 a 72 bytes, con letras y números y sin espacios; nunca se recorta; se vuelve a pedir si hay error |
| Confirmar  | Debe ser igual a la contraseña                                                                  |
| Rol        | Obligatorio: Administrador (1) o Empleado (2)                                                   |

Salvaguardas del frontend: no se puede eliminar la propia cuenta ni al último administrador.

## Registro financiero

Solo el **Admin** ve esta sección: el menú la oculta al Empleado, `App.jsx` no abre una vista que el rol no pueda ver y la pantalla ni siquiera consulta datos si el rol no es Admin. Es una pantalla de **solo lectura**: no crea ni modifica nada.

El backend todavía no tiene un módulo de pagos, así que el resumen se calcula con los endpoints que ya existen (`GET /api/clientes`, `GET /api/membresias` y `GET /api/planes`):

- Cada **membresía cuenta como un pago** por el **precio actual de su plan** (la membresía no guarda el precio que se pagó, así que si un plan cambia de precio el resumen cambia con él).
- La **fecha del pago** es la de registro de la membresía (`fecha_creacion`); si no viene, el día de inicio.
- Si el plan de una membresía ya no existe o no tiene un precio válido, el pago se cuenta pero no se suma al total, y la pantalla lo avisa.
- No se marcan membresías como vencidas desde esta pantalla (eso lo hace Clientes/Membresías al cargar), por lo que el estado se muestra tal como está guardado.

Qué muestra: totales generales (total recaudado, pagos registrados, clientes con pagos) y una tabla con un resumen por cliente (pagos, total pagado, último pago) que se puede abrir para ver el detalle de cada pago (fecha, plan, monto, estado y vigencia).

| Filtro                 | Validación                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Buscar cliente         | Nombre o cédula, máximo 50 caracteres, sin tildes ni mayúsculas; se quitan caracteres de control |
| Estado de la membresía | Solo los valores definidos (todas, activa, vencida, cancelada)                                 |
| Desde / Hasta          | Fechas reales y no futuras; «Hasta» no puede ser anterior a «Desde» (si el rango es inválido, no se aplica) |
| Ordenar por            | Solo los valores definidos (mayor total, más pagos, pago más reciente, nombre)                 |
| Solo clientes con pagos | Activado por defecto                                                                          |

## Historial de accesos

Muestra los 50 eventos más recientes de `GET /api/acceso-fisico/historial` (cliente, fecha y hora, resultado y motivo; "Huella no reconocida" si no hubo cliente). Los filtros se aplican sobre esos eventos ya cargados y no llaman otra vez a la API:

| Filtro    | Validación                                                                         |
| --------- | ---------------------------------------------------------------------------------- |
| Resultado | Solo Todos, Acceso permitido o Acceso denegado                                     |
| Buscar    | Texto de hasta 50 caracteres, sobre cliente y motivo                               |
| Desde / Hasta | Opcionales; fechas reales, no futuras, y «Desde» no puede ser posterior a «Hasta» |

El botón "Ver historial" del Inicio abre esta pantalla, y la tarjeta "Actividad reciente" usa el mismo servicio (`listarHistorial`).

## Registro de huella e ingreso

Al crear un cliente desde el panel, se solicita registrar su huella antes de mostrar el registro como completado. Si la captura falla o se interrumpe, los datos del cliente permanecen guardados y aparecen con huella pendiente; se puede reintentar desde la lista de Clientes sin volver a crear el cliente. También se puede registrar desde esa lista la huella de clientes existentes.

El registro usa `POST /api/biometria/registrar`. Cada cliente tiene una sola huella y no puede repetirse entre clientes. La pantalla independiente de ingreso usa `POST /api/acceso-fisico/pantalla/validar` y muestra si el acceso está permitido y el motivo.

| Campo   | Validación                                                                                   |
| ------- | -------------------------------------------------------------------------------------------- |
| Cliente | Se selecciona automáticamente al crear el cliente o al elegirlo en la lista                   |

## Membresías

La pantalla lista las membresías (con filtro por estado y búsqueda por cliente, cédula o plan) y ofrece dos acciones, disponibles para Admin y Empleado:

- **Asignar membresía** (`POST /api/membresias`): se busca el cliente por nombre o cédula, se elige un plan activo y la fecha de inicio. La pantalla calcula y muestra la fecha de vencimiento estimada y avisa al elegir un cliente que ya tiene una membresía activa.
- **Renovar por cédula** (`GET /api/membresias/buscar/:cedula` y `POST /api/membresias/renovar`): se busca al cliente, se muestra su membresía actual y se elige el plan. Si la actual sigue vigente, la nueva empieza al día siguiente de su vencimiento; si no, hoy. La acción rápida "Asignar o renovar membresía" del Inicio abre esta opción.

| Campo / regla       | Validación                                                                          |
| ------------------- | ----------------------------------------------------------------------------------- |
| Cliente             | Obligatorio y existente; no puede tener ya una membresía activa y vigente           |
| Plan                | Obligatorio, existente y activo                                                     |
| Fecha de inicio     | Obligatoria, fecha real, desde hoy hasta un año adelante (el calendario no muestra días anteriores)|
| Cédula (renovación) | Obligatoria, solo dígitos (6 a 15)                                                  |

Al abrir Membresías (igual que Clientes) las membresías activas con fecha de fin pasada se pasan solas a `vencida`.

## Planes

Todos los roles ven el catálogo (con filtro Todos / Activos / Inactivos). Solo el **Admin** ve los botones de gestión: crear (`POST /api/planes`), editar (`PUT /api/planes/:id`), desactivar (`PATCH /api/planes/:id/desactivar`) y activar (`PUT /api/planes/:id` con `{ "activo": true }`). Los planes **no se eliminan** desde la pantalla: se desactivan, para no afectar el historial de membresías.

| Campo    | Regla                                                                                 |
| -------- | ------------------------------------------------------------------------------------- |
| Nombre   | Obligatorio, de 2 a 50 caracteres (letras, números, espacios, `.` y `-`); no repetido |
| Duración | Obligatoria, número entero de 1 a 3650 días                                           |
| Precio   | Obligatorio, mayor a 0 y hasta 50.000.000, máximo 2 decimales, sin puntos de miles    |
| Ingresos | Opcional: vacío para un plan por tiempo; de 1 a 365 para una tiquetera                |

La columna **Ingresos** del catálogo muestra la regla del gimnasio: **1 ingreso por día** en todos los planes
(en las tiqueteras, por ejemplo, "6 ingresos (1 por día)"). Los selectores de plan de Membresías muestran lo mismo.
**Pendiente del backend:** la validación de acceso todavía no bloquea un segundo ingreso el mismo día
(las tiqueteras solo dejan de descontar el ingreso repetido).

## Clientes y estado de la membresía

Los clientes **no se eliminan**: lo que se gestiona es el estado de su membresía (`PATCH /api/membresias/:id/estado`), disponible para Admin y Empleado y siempre con confirmación.

**Vencimiento automático:** al abrir o actualizar Clientes, toda membresía `activa` cuya fecha de fin ya pasó se cambia sola a `vencida` (una membresía que vence hoy sigue activa hasta que termine el día). Si el servidor rechaza el cambio, se avisa y queda el botón manual "Marcar como vencida".

| Estado actual                       | Cambio que ofrece la pantalla |
| ----------------------------------- | ----------------------------- |
| Activa y vigente                    | Cancelar membresía            |
| Activa con fecha de fin ya pasada   | Marcar como vencida           |
| Cancelada, vigente y sin otra activa | Reactivar membresía           |
| Vencida o sin membresía             | Ninguno (se renueva o asigna desde Membresías) |

## Autenticación y sesión

1. `Login.jsx` envía `{ correo, contrasena }` a `POST /api/auth/login` mediante `authService.iniciarSesion`.
2. Si la API responde correctamente, el `token` y el `usuario` se guardan en `localStorage` (claves `token` y `usuario`).
3. `App.jsx` lee el usuario guardado al iniciar, por lo que la sesión se conserva al recargar.
4. `api.js` agrega automáticamente la cabecera `Authorization: Bearer <token>` a cada petición.
5. Al cerrar sesión se borran ambas claves y se vuelve al formulario de login.

El rol llega en `usuario.rol_id`: `1` = Administrador, `2` = Empleado (los mismos valores del backend).

## Selección de clientes (buscador)

Con cientos de clientes una lista desplegable es incómoda, así que los formularios que piden un cliente (**Asignar membresía** y **Registrar huella**) usan el componente `BuscadorCliente`:

- Se escribe el nombre o la cédula (mínimo 2 caracteres, máximo 50; se ignoran mayúsculas y tildes, y cada palabra escrita debe coincidir).
- Se muestran como máximo 8 coincidencias; si hay más, la pantalla indica cuántas son y pide escribir más para acotar.
- Se elige con un clic, o con Enter cuando solo queda una coincidencia (Enter nunca envía el formulario). "Cambiar cliente" vuelve al buscador.
- El componente no llama a la API: recibe la lista de clientes que ya cargó la pantalla. Las listas de planes y los filtros siguen siendo desplegables porque tienen pocas opciones.

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
- Las pantallas de Clientes, Planes, Membresías, Historial y Personal se construyeron sin CSS propio: usan solo los estilos globales.

## Convenciones

- Los nombres de archivo respetan mayúsculas exactas (`Login.jsx`, `authService.js`): en Windows funciona igual, pero en Linux o macOS un nombre mal escrito rompe la importación.
- Un componente por archivo, con nombre en mayúscula inicial y `export default`.
- Los componentes dibujan; las llamadas al servidor viven en `services/`.
- Nunca se suben archivos `.env` (el `.gitignore` de la raíz los excluye).

## Pendientes del frontend

- React Router: rutas con URL propia (hoy la navegación es por estado).
- Pagos reales: el registro financiero estima los pagos con el precio del plan. Falta un módulo de pagos en el backend (monto realmente pagado, método y fecha) para que sea exacto; los reportes tampoco tienen endpoints.

---

# Flujo de trabajo en equipo

- El repositorio usa ramas `feature/*`, `release/*`, `develop` y `main`.
- El frontend React se integra mediante Pull Request.
- Cada avance del frontend (una pantalla o una corrección) sigue siempre este flujo:
  1. Crear una rama `feature/<nombre>` (o `fix/<nombre>` para correcciones) a partir de `develop`, por ejemplo `feature/clientes`.
  2. Hacer commits convencionales (`feat`, `fix`, `refactor`, `docs`, `style`, `chore`), con el nombre y correo de quien los escribe.
  3. Abrir un Pull Request de la rama hacia `develop` y fusionarlo.
  4. Abrir un Pull Request de `develop` hacia `main` y fusionarlo.
  5. Actualizar las copias locales (`git pull` en `develop` y en `main`).
- Antes de fusionar, comprobar que `npx eslint src` y `npx vite build` pasan sin errores.
- Si GitHub agrega al final de la descripción de un PR una línea automática como "Generated by Claude Code", se puede borrar a mano desde "Edit" en el PR; no afecta a los commits.
- Antes de fusionar, revisar en "Files changed" que no se suban `.env` ni `node_modules/`.
- Cada integrante crea su propio usuario Admin en su base de datos local con `scripts/crear-admin.js`.
