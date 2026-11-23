# DAT-06 · Prueba de respaldo y restauración

> Fecha: 23/11/2026, 13:01 (hora de Colombia). Ambiente: producción, consola del servicio MySQL en Railway (MySQL 8.4.13).
> Railway solo crea respaldos automáticos en el plan Pro; se usó `mysqldump`, el procedimiento del Manual técnico.

## Pasos

```bash
export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"   # la contraseña la toma del servidor; nadie la escribe
mysqldump -uroot --single-transaction --no-tablespaces railway > /tmp/respaldo_zonafit_20261123.sql
mysql -uroot -e 'CREATE DATABASE railway_restauracion'
mysql -uroot railway_restauracion < /tmp/respaldo_zonafit_20261123.sql
# conteo de registros por tabla en las dos bases
mysql -uroot -e 'DROP DATABASE railway_restauracion'; rm -f /tmp/respaldo_zonafit_20261123.sql
```

## Resultado

| Tabla | Original | Restaurada | Estado |
| --- | --- | --- | --- |
| clientes | 6 | 6 | OK |
| membresias | 4 | 4 | OK |
| planes | 8 | 8 | OK |
| usuarios | 2 | 2 | OK |
| roles | 2 | 2 | OK |
| registros_acceso | 91 | 91 | OK |
| plantillas_biometricas | 5 | 5 | OK |

- Respaldo de 16,6 KB con las 7 tablas ([captura](../evidencias/dat06-1-respaldo.jpg)).
- Restauración y comparación ([captura](../evidencias/dat06-2-restauracion.jpg)).
- Limpieza: se borraron la base de prueba y el archivo; solo queda `railway` ([captura](../evidencias/dat06-3-limpieza.jpg)).
- La base `railway` y el despliegue no se modificaron.

## Frecuencia y retención (DAT-05, DEP-06)

- Un respaldo semanal manual con `mysqldump` y uno antes de cada despliegue.
- Se conservan los últimos 4 respaldos semanales, fuera del repositorio (carpeta privada del responsable técnico).
- Responsable: Juan Diego Mejía Llano.
