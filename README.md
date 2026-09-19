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
