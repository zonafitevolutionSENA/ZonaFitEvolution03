# Política de tratamiento de la información

> Gimnasio Zona Fit Evolution. Base legal: Ley 1581 de 2012 y Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015). Versión 1.0 del 24/11/2026.
> Borrador del equipo del proyecto. El gimnasio debe completar los espacios en blanco, revisarlo con su asesor jurídico y publicarlo en la recepción antes de usar el sistema con datos reales.

## 1. Responsable del tratamiento

| Dato | Valor |
| --- | --- |
| Razón social | Gimnasio Zona Fit Evolution |
| NIT | ______________________ |
| Dirección | ______________________ |
| Ciudad | ______________________ |
| Correo para datos personales | ______________________ |
| Teléfono | ______________________ |

## 2. Alcance

Esta política se aplica a los datos personales que el gimnasio recoge de sus socios (clientes) y de su personal (Administradores y Empleados) por medio del sistema Zona Fit Evolution, en la recepción y en el sitio web https://zona-fit-evolution03.vercel.app.

## 3. Datos que se tratan y finalidades

| Titular | Datos | Finalidad | Base del tratamiento |
| --- | --- | --- | --- |
| Socio | Nombre, cédula, correo y teléfono | Identificarlo, gestionar su membresía y comunicarse con él sobre ella | Autorización previa y expresa al registrarse (casilla obligatoria en el sistema o formato firmado) |
| Socio | Huella dactilar (dato sensible) | Validar su ingreso a las instalaciones | Autorización expresa y separada; es voluntaria (formato `autorizacion-datos-biometricos.md`) |
| Socio | Fecha, hora y resultado de cada intento de ingreso | Control de acceso y seguridad de las instalaciones | Autorización del titular |
| Socio | Correo electrónico | Enviarle un aviso 7 días antes de que venza su membresía | Autorización opcional y revocable (casilla de avisos) |
| Personal | Nombre, correo y contraseña (guardada cifrada) | Darle acceso al sistema según su rol | Relación laboral |
| Personal | Correo y código temporal de recuperación | Permitirle restablecer su contraseña | Relación laboral |

El gimnasio no usa los datos para publicidad ni los vende.

## 4. Datos sensibles

La huella dactilar es un dato sensible. Su entrega es facultativa: ningún socio está obligado a autorizarla. Si no la autoriza, el personal de recepción busca su membresía con la cédula y le da el ingreso de forma manual. El sistema no guarda imágenes de huellas: la plantilla queda dentro del lector de la recepción y en la base de datos solo se conserva un código irreversible.

## 5. Encargados del tratamiento y transmisión internacional

Para operar el sistema, el gimnasio usa proveedores que tratan los datos solo por su cuenta y según sus instrucciones (encargados del tratamiento). Los servidores de estos proveedores están fuera de Colombia, por lo que hay una transmisión internacional de datos:

| Encargado | Servicio | Datos | País |
| --- | --- | --- | --- |
| Railway | Alojamiento de la API y de la base de datos | Todos los datos del sistema | Estados Unidos |
| Vercel | Alojamiento de la aplicación web | Ninguno almacenado; transporta las pantallas | Estados Unidos |
| Brevo (Sendinblue SAS) | Envío de correos electrónicos | Nombre y correo del destinatario y el contenido del mensaje | Francia (Unión Europea) |

La aceptación de esta política autoriza esa transmisión. El gimnasio verificará que cada proveedor ofrezca condiciones de protección de datos acordes con la Ley 1581.

## 6. Tiempo de conservación

| Dato | Conservación |
| --- | --- |
| Datos de identificación y contacto del socio | Mientras sea socio o hasta que pida su supresión; después se anonimizan |
| Huella dactilar | Hasta que el socio revoque la autorización o pida la eliminación |
| Registro de ingresos | 3 meses; el sistema borra automáticamente los más antiguos cada día |
| Autorización de avisos por correo | Hasta que el socio la retire |
| Código de recuperación de contraseña | 10 minutos y un solo uso |
| Datos del personal | Mientras trabaje en el gimnasio |
| Respaldos de la base de datos | Los últimos 4 respaldos semanales |

## 7. Derechos de los titulares

El titular puede:

1. Conocer, actualizar y rectificar sus datos.
2. Pedir prueba de la autorización que otorgó.
3. Ser informado sobre el uso que se ha dado a sus datos.
4. Revocar la autorización o pedir la supresión de sus datos cuando no exista un deber legal o contractual de conservarlos.
5. Acceder gratuitamente a sus datos.
6. Presentar quejas ante la Superintendencia de Industria y Comercio después de agotar el trámite ante el gimnasio.

## 8. Cómo ejercer los derechos

- **Canal:** en la recepción del gimnasio o al correo para datos personales indicado en la sección 1.
- **Responsable de atender las solicitudes:** ______________________ (cargo y nombre).
- **Consultas:** se responden en un máximo de 10 días hábiles, prorrogables por 5 días hábiles informando el motivo.
- **Reclamos** (corrección, actualización, supresión o revocación): se responden en un máximo de 15 días hábiles, prorrogables por 8 días hábiles informando el motivo.
- La solicitud debe incluir el nombre y la cédula del titular, la descripción de lo que pide y un medio de respuesta.
- **Supresión:** como el historial de membresías se conserva, la supresión se hace anonimizando el registro del socio (se reemplazan nombre, cédula, correo y teléfono) y borrando su huella del lector y del sistema. El procedimiento técnico está en el Manual técnico (sección 8.5).
- **Avisos por correo:** el socio puede dejar de recibirlos pidiéndolo en la recepción; cada correo de aviso explica cómo hacerlo.

## 9. Seguridad de la información

El sistema guarda las contraseñas y los códigos de recuperación cifrados con bcrypt, usa conexiones cifradas (HTTPS), limita los intentos de inicio de sesión y de recuperación, cierra las sesiones al cambiar la contraseña y da a cada rol solo los permisos que necesita. La base de datos se usa con un usuario de permisos mínimos y se respalda cada semana.

## 10. Vigencia

Esta política rige desde el ____ / ____ / ________ y se mantendrá mientras el gimnasio trate datos personales. Las bases de datos estarán vigentes mientras el gimnasio opere. Los cambios importantes se informarán en la recepción y por correo a los titulares que lo hayan autorizado.
