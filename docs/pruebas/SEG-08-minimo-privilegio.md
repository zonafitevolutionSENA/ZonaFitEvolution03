# SEG-08 · Usuario de MySQL con mínimo privilegio

> Fecha: 23/11/2026. Ambiente: producción (Railway, MySQL 8.4.13).

## Antes

La API se conectaba a MySQL con `root` (todos los privilegios: borrar tablas o la base, crear usuarios).

## Cambio

1. En Railway → MySQL → Database → Data se creó el usuario de la aplicación:

```sql
CREATE USER 'zonafit_app'@'%' IDENTIFIED BY '<contraseña aleatoria de 48 caracteres>';
GRANT SELECT, INSERT, UPDATE, DELETE ON railway.* TO 'zonafit_app'@'%' -- 
FLUSH PRIVILEGES -- 
```

> En la caja de consultas de Railway, las sentencias que contienen `SELECT` terminan en `-- ` porque la consola agrega `LIMIT 100` al final.

2. En el servicio del backend se cambiaron `DB_USER=zonafit_app` y `DB_PASSWORD` (la contraseña vive solo en las variables de Railway).
3. `root` queda solo para administración: crear tablas con `init.sql`, respaldos y restauraciones.

## Verificación

| Prueba | Operación | Resultado |
| --- | --- | --- |
| `SHOW GRANTS FOR 'zonafit_app'@'%'` | — | `GRANT USAGE ON *.*` y `GRANT SELECT, INSERT, UPDATE, DELETE ON railway.*` ([captura](../evidencias/seg08-show-grants.jpg)) |
| Tarea diaria de membresías al arrancar | Lectura y actualización | Sin errores en Deploy Logs (12:27) |
| Inicio de sesión y lista de clientes | Lectura | Correcto |
| Crear el cliente «Prueba Seguridad» | Inserción | Correcto |
| Editar su teléfono | Actualización | «Cliente "Prueba Seguridad" actualizado correctamente.» ([captura](../evidencias/seg08-prueba-escritura.jpg)) |

**Incidente durante el cambio:** la variable `DB_PASSWORD` quedó con un carácter invisible al final (49 caracteres en lugar de 48) y MySQL rechazaba la conexión («Access denied»). Se corrigió pegando de nuevo el valor. Recomendación: verificar las variables después de cada cambio.
