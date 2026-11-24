# Casos de uso

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Extraído del documento [Backlog, historias de usuario y casos de uso](../03b-backlog-hu-casos-uso.md). Versión formal: [PDF](../entregables/02_Requerimientos/Backlog_HU_y_Casos_de_Uso_ZonaFitEvolution.pdf).

## 9\. Casos de uso

### 9.1 Cuándo elaborar un caso de uso

| **Sí conviene**                                | **No suele ser necesario**                                    |
| ---------------------------------------------- | ------------------------------------------------------------- |
| Proceso con varios actores o sistemas.         | Consulta o formulario simple cubierto por una historia clara. |
| Flujos alternativos y excepciones relevantes.  | Operación CRUD sin reglas especiales.                         |
| Reglas de negocio complejas.                   | Tarea puramente técnica.                                      |
| Operación transaccional o de alto riesgo.      | Cambio visual menor.                                          |
| Integración, autorización o auditoría crítica. | Historia ya pequeña y completamente verificable.              |

### 9.2 Catálogo de casos de uso

| **ID** | **Nombre**                    | **Actor principal** | **Objetivo**                                 | **Historias / requisitos**                      | **Prioridad** | **Estado**                  |
| ------ | ----------------------------- | ------------------- | -------------------------------------------- | ----------------------------------------------- | ------------- | --------------------------- |
| CU-001 | Iniciar sesión                | ACT-01, ACT-02      | Acceder a los módulos según el rol.          | HU-002 / RF-007                                 | Alta          | Implementado                |
| CU-002 | Registrar cliente             | ACT-01, ACT-02      | Incorporar un socio al sistema.              | HU-001 / RF-001                                 | Alta          | Implementado                |
| CU-003 | Gestionar planes de membresía | ACT-01              | Mantener el catálogo de tarifas.             | HU-003 / RF-002                                 | Alta          | Implementado                |
| CU-004 | Validar acceso                | ACT-02, ACT-03      | Permitir el ingreso solo a socios vigentes.  | HU-005, HU-006, HU-007 / RF-003, RF-004, RF-008 | Alta          | Implementado (sensor AS608) |
| CU-005 | Registrar pago de membresía   | ACT-01, ACT-02      | Asignar o renovar una membresía con su pago. | HU-004, HU-008 / RF-005, RF-006                 | Alta          | Implementado                |
| CU-006 | Gestionar personal y roles    | ACT-01              | Controlar quién usa el sistema.              | HU-002 / RF-007                                 | Alta          | Implementado                |
| CU-007 | Consultar registro financiero | ACT-01              | Conocer los ingresos por cliente.            | HU-008 / RF-006                                 | Alta          | Implementado parcialmente   |
| CU-008 | Restablecer contraseña        | ACT-01, ACT-02      | Recuperar el acceso con un código al correo. | HU-014 / RF-009                                 | Alta          | Implementado                |
| CU-009 | Enviar aviso de vencimiento   | ACT-05              | Recordar la renovación 7 días antes.         | HU-015 / RF-010                                 | Media         | Implementado                |

### 9.3 Ficha detallada de caso de uso

**CU-001 – Iniciar sesión**

| **Campo**                           | **Contenido**                                                    |
| ----------------------------------- | ---------------------------------------------------------------- |
| ID y nombre                         | CU-001 – Iniciar sesión                                          |
| Objetivo                            | Autenticarse para usar los módulos permitidos por su rol.        |
| Alcance / nivel                     | Usuario                                                          |
| Actor principal                     | ACT-01 Administrador, ACT-02 Empleado                            |
| Actores secundarios                 | Servicio de autenticación (JWT)                                  |
| Stakeholders e intereses            | STK-01: que solo el personal autorizado acceda.                  |
| Disparador                          | El usuario abre la aplicación.                                   |
| Precondiciones                      | El usuario está registrado.                                      |
| Garantías mínimas                   | Ante un error no se revela si el correo existe.                  |
| Postcondición de éxito              | Sesión iniciada con token de 8 horas y menú según el rol.        |
| Flujo principal                     | Ver la tabla de flujo de CU-001 en la sección 9.4.               |
| Flujos alternativos                 | A1, E1, E2 (ver sección 9.4)                                     |
| Excepciones                         | Servidor sin conexión.                                           |
| Reglas de negocio                   | RN-011                                                           |
| Datos de entrada y salida           | Entrada: correo y contraseña. Salida: token y datos del usuario. |
| Requisitos especiales               | RNF-001                                                          |
| Frecuencia / volumen                | Varias veces al día por usuario.                                 |
| Historias y requisitos relacionados | HU-002 / RF-007                                                  |
| Pantallas / interfaces              | UI-01                                                            |
| Casos de prueba                     | CP-016, CP-017                                                   |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                     |
| Estado y versión                    | Implementado – MVP                                               |

**CU-002 – Registrar cliente**

| **Campo**                           | **Contenido**                                                       |
| ----------------------------------- | ------------------------------------------------------------------- |
| ID y nombre                         | CU-002 – Registrar cliente                                          |
| Objetivo                            | Registrar un nuevo cliente con sus datos personales.                |
| Alcance / nivel                     | Usuario                                                             |
| Actor principal                     | ACT-02 Empleado (también ACT-01)                                    |
| Actores secundarios                 | Base de datos                                                       |
| Stakeholders e intereses            | STK-02: registro rápido; STK-03: tratamiento correcto de sus datos. |
| Disparador                          | Un socio nuevo se inscribe.                                         |
| Precondiciones                      | Usuario autenticado; la cédula no existe.                           |
| Garantías mínimas                   | No se guardan registros incompletos.                                |
| Postcondición de éxito              | Cliente registrado y disponible para membresía y huella.            |
| Flujo principal                     | Ver la tabla de flujo de CU-002 en la sección 9.4.                  |
| Flujos alternativos                 | A1, E1 (ver sección 9.4)                                            |
| Excepciones                         | Cédula repetida; datos inválidos; casilla de términos sin marcar.   |
| Reglas de negocio                   | RN-001, RN-007, RN-019                                              |
| Datos de entrada y salida           | Entrada: nombre, cédula, correo, teléfono, aceptación de términos (obligatoria) y de avisos (opcional). Salida: cliente creado con las fechas de aceptación. |
| Requisitos especiales               | RNF-002, RNF-006                                                    |
| Frecuencia / volumen                | Varias inscripciones diarias; de 300 a 400 clientes registrados.    |
| Historias y requisitos relacionados | HU-001, HU-016 / RF-001, RF-011                                     |
| Pantallas / interfaces              | UI-03                                                               |
| Casos de prueba                     | CP-001 a CP-003                                                     |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                        |
| Estado y versión                    | Implementado – MVP                                                  |

**CU-003 – Gestionar planes de membresía**

| **Campo**                           | **Contenido**                                                         |
| ----------------------------------- | --------------------------------------------------------------------- |
| ID y nombre                         | CU-003 – Gestionar planes de membresía                                |
| Objetivo                            | Crear, editar, desactivar y eliminar planes.                          |
| Alcance / nivel                     | Usuario                                                               |
| Actor principal                     | ACT-01 Administrador                                                  |
| Actores secundarios                 | Base de datos                                                         |
| Stakeholders e intereses            | STK-01: ajustar tarifas sin depender del equipo técnico.              |
| Disparador                          | El propietario cambia o crea una tarifa.                              |
| Precondiciones                      | Administrador autenticado.                                            |
| Garantías mínimas                   | No se pierde el historial de membresías.                              |
| Postcondición de éxito              | Catálogo actualizado.                                                 |
| Flujo principal                     | Ver la tabla de flujo de CU-003 en la sección 9.4.                    |
| Flujos alternativos                 | E1, E2 (ver sección 9.4)                                              |
| Excepciones                         | Plan con membresías asociadas; nombre duplicado.                      |
| Reglas de negocio                   | RN-006                                                                |
| Datos de entrada y salida           | Entrada: nombre, duración, precio. Salida: plan creado o actualizado. |
| Requisitos especiales               | RNF-001 (solo Administrador)                                          |
| Frecuencia / volumen                | Ocasional.                                                            |
| Historias y requisitos relacionados | HU-003 / RF-002                                                       |
| Pantallas / interfaces              | UI-04                                                                 |
| Casos de prueba                     | CP-004 a CP-006                                                       |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                          |
| Estado y versión                    | Implementado – MVP                                                    |

**CU-004 – Validar acceso**

| **Campo**                           | **Contenido**                                                              |
| ----------------------------------- | -------------------------------------------------------------------------- |
| ID y nombre                         | CU-004 – Validar acceso                                                    |
| Objetivo                            | Decidir si el cliente puede ingresar.                                      |
| Alcance / nivel                     | Sistema                                                                    |
| Actor principal                     | ACT-03 Cliente; ACT-02 Empleado supervisa                                  |
| Actores secundarios                 | ACT-04 Sensor de huella AS608                                              |
| Stakeholders e intereses            | STK-01: cero ingresos vencidos; STK-02: sin filas; STK-03: ingreso rápido. |
| Disparador                          | El cliente pone su huella en el lector.                                    |
| Precondiciones                      | Cliente con huella registrada; lector operativo.                           |
| Garantías mínimas                   | Ante cualquier error se niega el acceso y el intento queda registrado.     |
| Postcondición de éxito              | Acceso permitido, resultado visible en la recepción e intento registrado.  |
| Flujo principal                     | Ver la tabla de flujo de CU-004 en la sección 9.4.                         |
| Flujos alternativos                 | A1, E1, E2 (ver sección 9.4)                                               |
| Excepciones                         | Huella no reconocida; error de conexión.                                   |
| Reglas de negocio                   | RN-002, RN-009, RN-010                                                     |
| Datos de entrada y salida           | Entrada: captura de huella. Salida: cliente, permitido/denegado y motivo.  |
| Requisitos especiales               | RNF-003 (\< 2 s), RNF-006                                                  |
| Frecuencia / volumen                | Cada ingreso; picos en la mañana y la noche.                               |
| Historias y requisitos relacionados | HU-005, HU-006, HU-007 / RF-003, RF-004, RF-008                            |
| Pantallas / interfaces              | UI-06, UI-07; INT-01                                                       |
| Casos de prueba                     | CP-007 a CP-009                                                            |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                               |
| Estado y versión                    | Implementado (sensor AS608) – MVP                                          |

**CU-005 – Registrar pago de membresía**

| **Campo**                           | **Contenido**                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| ID y nombre                         | CU-005 – Registrar pago de membresía                                                 |
| Objetivo                            | Registrar la membresía pagada por el cliente.                                        |
| Alcance / nivel                     | Usuario                                                                              |
| Actor principal                     | ACT-02 Empleado (también ACT-01)                                                     |
| Actores secundarios                 | Base de datos                                                                        |
| Stakeholders e intereses            | STK-01: control de ingresos; STK-03: no perder días pagados.                         |
| Disparador                          | El cliente paga un plan en la recepción.                                             |
| Precondiciones                      | Cliente registrado; plan activo.                                                     |
| Garantías mínimas                   | Nunca quedan dos membresías activas (transacción).                                   |
| Postcondición de éxito              | Membresía activa con fecha de fin calculada; pago visible en el registro financiero. |
| Flujo principal                     | Ver la tabla de flujo de CU-005 en la sección 9.4.                                   |
| Flujos alternativos                 | A1, E1 (ver sección 9.4)                                                             |
| Excepciones                         | Cliente con membresía activa (se usa renovación); plan inactivo.                     |
| Reglas de negocio                   | RN-003, RN-004, RN-005, RN-006                                                       |
| Datos de entrada y salida           | Entrada: cliente o cédula, plan, fecha de inicio. Salida: membresía creada.          |
| Requisitos especiales               | RNF-002                                                                              |
| Frecuencia / volumen                | Diaria.                                                                              |
| Historias y requisitos relacionados | HU-004, HU-008 / RF-005, RF-006                                                      |
| Pantallas / interfaces              | UI-05                                                                                |
| Casos de prueba                     | CP-012 a CP-014                                                                      |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                                         |
| Estado y versión                    | Implementado – MVP                                                                   |

**CU-006 – Gestionar personal y roles**

| **Campo**                           | **Contenido**                                                          |
| ----------------------------------- | ---------------------------------------------------------------------- |
| ID y nombre                         | CU-006 – Gestionar personal y roles                                    |
| Objetivo                            | Crear y eliminar usuarios del personal con su rol.                     |
| Alcance / nivel                     | Usuario                                                                |
| Actor principal                     | ACT-01 Administrador                                                   |
| Actores secundarios                 | Base de datos                                                          |
| Stakeholders e intereses            | STK-01: control del personal.                                          |
| Disparador                          | Ingresa o se retira un empleado.                                       |
| Precondiciones                      | Administrador autenticado.                                             |
| Garantías mínimas                   | Siempre existe al menos un administrador.                              |
| Postcondición de éxito              | Usuario creado o eliminado.                                            |
| Flujo principal                     | Ver la tabla de flujo de CU-006 en la sección 9.4.                     |
| Flujos alternativos                 | E1, E2 (ver sección 9.4)                                               |
| Excepciones                         | Correo duplicado; eliminar la propia cuenta o al último administrador. |
| Reglas de negocio                   | RN-011, RN-012                                                         |
| Datos de entrada y salida           | Entrada: nombre, correo, contraseña, rol. Salida: usuario creado.      |
| Requisitos especiales               | RNF-001                                                                |
| Frecuencia / volumen                | Ocasional.                                                             |
| Historias y requisitos relacionados | HU-002 / RF-007                                                        |
| Pantallas / interfaces              | UI-08                                                                  |
| Casos de prueba                     | CP-018                                                                 |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                           |
| Estado y versión                    | Implementado – MVP                                                     |

**CU-007 – Consultar registro financiero**

| **Campo**                           | **Contenido**                                                     |
| ----------------------------------- | ----------------------------------------------------------------- |
| ID y nombre                         | CU-007 – Consultar registro financiero                            |
| Objetivo                            | Consultar el resumen de pagos de cada cliente.                    |
| Alcance / nivel                     | Usuario                                                           |
| Actor principal                     | ACT-01 Administrador                                              |
| Actores secundarios                 | Membresías y planes                                               |
| Stakeholders e intereses            | STK-01: reportes financieros reales.                              |
| Disparador                          | El Administrador abre el registro financiero.                     |
| Precondiciones                      | Administrador autenticado; existen membresías.                    |
| Garantías mínimas                   | La consulta no modifica datos.                                    |
| Postcondición de éxito              | Resumen mostrado con los filtros aplicados.                       |
| Flujo principal                     | Ver la tabla de flujo de CU-007 en la sección 9.4.                |
| Flujos alternativos                 | A1, E1 (ver sección 9.4)                                          |
| Excepciones                         | Sin datos para el filtro; fechas inválidas.                       |
| Reglas de negocio                   | RN-004, RN-011                                                    |
| Datos de entrada y salida           | Entrada: filtros. Salida: totales, resumen y detalle por cliente. |
| Requisitos especiales               | RNF-001                                                           |
| Frecuencia / volumen                | Diaria o semanal.                                                 |
| Historias y requisitos relacionados | HU-008 / RF-006                                                   |
| Pantallas / interfaces              | UI-09                                                             |
| Casos de prueba                     | CP-014, CP-015                                                    |
| Responsable de validación           | Liliana Sofía Panesso Méndez (Product Owner)                      |
| Estado y versión                    | Implementado parcialmente – MVP                                   |

**CU-008 – Restablecer contraseña**

| **Campo**                           | **Contenido** |
| ----------------------------------- | ------------- |
| ID y nombre | CU-008 – Restablecer contraseña |
| Objetivo | Recuperar el acceso cuando se olvidó la contraseña, sin depender de otra persona. |
| Alcance / nivel | Usuario |
| Actor principal | ACT-01 Administrador o ACT-02 Empleado (sin sesión) |
| Actores secundarios | ACT-06 Servicio de correo Brevo |
| Stakeholders e intereses | STK-01: nadie conoce la contraseña de otra persona; STK-02: volver a trabajar rápido. |
| Disparador | La persona pulsa «¿Olvidaste tu contraseña?» en el inicio de sesión. |
| Precondiciones | La cuenta existe y el envío de correos está configurado. |
| Garantías mínimas | La respuesta no revela si el correo existe; la contraseña solo cambia con un código válido. |
| Postcondición de éxito | Contraseña nueva guardada con hash, código gastado, sesiones abiertas cerradas y aviso de cambio enviado. |
| Flujo principal | Ver la tabla de flujo de CU-008 en la sección 9.4. |
| Flujos alternativos | A1, A2, E1 a E4 (ver sección 9.4) |
| Excepciones | Código incorrecto, vencido o usado; contraseña inválida o igual a la anterior; demasiadas solicitudes; correo sin configurar. |
| Reglas de negocio | RN-016, RN-017 |
| Datos de entrada y salida | Entrada: correo, código de 6 dígitos, nueva contraseña. Salida: mensajes de cada paso y correos con el código y el aviso. |
| Requisitos especiales | RNF-001 (límites de intentos y hash del código) |
| Frecuencia / volumen | Ocasional. |
| Historias y requisitos relacionados | HU-014 / RF-009 |
| Pantallas / interfaces | UI-10 (Recuperar contraseña) |
| Casos de prueba | CP-023 a CP-028 |
| Responsable de validación | Liliana Sofía Panesso Méndez (Product Owner) |
| Estado y versión | Implementado – MVP |

**CU-009 – Enviar aviso de vencimiento**

| **Campo**                           | **Contenido** |
| ----------------------------------- | ------------- |
| ID y nombre | CU-009 – Enviar aviso de vencimiento |
| Objetivo | Recordar al cliente que su membresía vence en 7 días para que la renueve a tiempo. |
| Alcance / nivel | Sistema |
| Actor principal | ACT-05 Tarea programada (8:00) |
| Actores secundarios | ACT-06 Servicio de correo Brevo; ACT-03 Cliente (recibe el correo) |
| Stakeholders e intereses | STK-01: menos membresías vencidas sin renovar; STK-03: solo recibe correos si los autorizó. |
| Disparador | Son las 8:00, o el servidor arranca entre las 8:00 y las 20:00. |
| Precondiciones | Envío de correos configurado. |
| Garantías mínimas | Ningún cliente recibe dos avisos por la misma membresía ni avisos que no autorizó. |
| Postcondición de éxito | Correo enviado y registrado en avisos_membresia. |
| Flujo principal | Ver la tabla de flujo de CU-009 en la sección 9.4. |
| Flujos alternativos | A1, E1, E2 (ver sección 9.4) |
| Excepciones | Proveedor de correo caído o sin configurar. |
| Reglas de negocio | RN-018, RN-019 |
| Datos de entrada y salida | Entrada: membresías, planes, clientes y avisos enviados. Salida: correos y conteo de enviados y fallidos en el log. |
| Requisitos especiales | Máximo 250 correos por día (límite gratuito de Brevo: 300) |
| Frecuencia / volumen | Diaria; pocas decenas de correos. |
| Historias y requisitos relacionados | HU-015 / RF-010 (CR-010) |
| Pantallas / interfaces | Correo del aviso |
| Casos de prueba | CP-029, CP-030 |
| Responsable de validación | Liliana Sofía Panesso Méndez (Product Owner) |
| Estado y versión | Implementado – MVP |

### 9.4 Plantilla de flujo principal y alternativos

**CU-001 – Iniciar sesión**

| **Paso** | **Actor** | **Acción del actor**         | **Respuesta del sistema**                               | **Regla / dato** |
| -------- | --------- | ---------------------------- | ------------------------------------------------------- | ---------------- |
| 1        | Usuario   | Ingresa correo y contraseña. | Valida los campos en el navegador.                      | —                |
| 2        | Usuario   | Pulsa Iniciar sesión.        | Verifica las credenciales en el servidor.               | bcrypt           |
| 3        | Sistema   | —                            | Emite el token y muestra el Inicio con el menú del rol. | RN-011           |

| **ID alternativo** | **Paso origen** | **Condición**             | **Flujo alternativo**            | **Resultado**           |
| ------------------ | --------------- | ------------------------- | -------------------------------- | ----------------------- |
| A1                 | 1               | Campos vacíos o inválidos | Muestra el error junto al campo. | No se envía la petición |
| E1                 | 2               | Credenciales incorrectas  | Muestra un mensaje genérico.     | Sin sesión              |
| E2                 | 2               | Servidor sin conexión     | Informa que no hay conexión.     | Sin sesión              |

**CU-002 – Registrar cliente**

| **Paso** | **Actor** | **Acción del actor**             | **Respuesta del sistema**                  | **Regla / dato** |
| -------- | --------- | -------------------------------- | ------------------------------------------ | ---------------- |
| 1        | Usuario   | Abre Clientes y elige registrar. | Muestra el formulario.                     | —                |
| 2        | Usuario   | Ingresa los datos del cliente y marca la casilla de términos (y la de avisos si el cliente la autoriza). | Valida formatos y la casilla obligatoria en el navegador. | RN-007, RN-019 |
| 3        | Usuario   | Guarda.                          | Verifica que la cédula no exista y guarda. | RN-007           |
| 4        | Sistema   | —                                | Confirma el registro.                      | —                |

| **ID alternativo** | **Paso origen** | **Condición**              | **Flujo alternativo**          | **Resultado** |
| ------------------ | --------------- | -------------------------- | ------------------------------ | ------------- |
| A1                 | 2               | Datos con formato inválido | Marca el campo con su error.   | No se guarda  |
| E1                 | 3               | Cédula ya registrada       | Informa que el cliente existe. | No se guarda  |
| E2                 | 2               | Términos sin aceptar       | Marca la casilla con su error. | No se guarda  |

**CU-003 – Gestionar planes de membresía**

| **Paso** | **Actor**     | **Acción del actor**             | **Respuesta del sistema** | **Regla / dato** |
| -------- | ------------- | -------------------------------- | ------------------------- | ---------------- |
| 1        | Administrador | Abre Planes.                     | Muestra el catálogo.      | —                |
| 2        | Administrador | Crea, edita o desactiva un plan. | Valida los datos.         | RN-006           |
| 3        | Sistema       | —                                | Guarda los cambios.       | —                |

| **ID alternativo** | **Paso origen** | **Condición**                   | **Flujo alternativo**                         | **Resultado**    |
| ------------------ | --------------- | ------------------------------- | --------------------------------------------- | ---------------- |
| E1                 | 2               | Eliminar un plan con membresías | Impide la eliminación y sugiere desactivarlo. | Plan sin cambios |
| E2                 | 2               | Empleado intenta modificar      | Responde 403.                                 | Sin cambios      |

**CU-004 – Validar acceso**

| **Paso** | **Actor** | **Acción del actor**         | **Respuesta del sistema**                                 | **Regla / dato** |
| -------- | --------- | ---------------------------- | --------------------------------------------------------- | ---------------- |
| 1        | Cliente   | Pone su huella en el lector. | Captura la plantilla.                                     | —                |
| 2        | Sistema   | —                            | Identifica al cliente.                                    | RN-008           |
| 3        | Sistema   | —                            | Consulta la membresía más reciente y evalúa su estado.    | RN-009           |
| 4        | Sistema   | —                            | Permite el acceso y muestra el resultado en la recepción. | —                |
| 5        | Sistema   | —                            | Registra el intento.                                      | RN-010           |

| **ID alternativo** | **Paso origen** | **Condición**                              | **Flujo alternativo**                | **Resultado**                               |
| ------------------ | --------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------- |
| A1                 | 3               | Membresía vencida, cancelada o inexistente | Niega el acceso y muestra el motivo. | Acceso negado; intento registrado           |
| E1                 | 2               | Huella no reconocida                       | Niega el acceso (404).               | Intento registrado                          |
| E2                 | 3               | Error de conexión                          | Muestra el error.                    | Acceso negado; validación manual por cédula |

**CU-005 – Registrar pago de membresía**

| **Paso** | **Actor** | **Acción del actor**                  | **Respuesta del sistema**                                        | **Regla / dato** |
| -------- | --------- | ------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| 1        | Usuario   | Busca al cliente por nombre o cédula. | Muestra el cliente y su membresía.                               | —                |
| 2        | Usuario   | Elige el plan y la fecha de inicio.   | Valida que el plan esté activo y la fecha no sea anterior a hoy. | RN-006           |
| 3        | Usuario   | Confirma.                             | Calcula la fecha de fin y guarda la membresía.                   | RN-004           |
| 4        | Sistema   | —                                     | Muestra la confirmación.                                         | —                |

| **ID alternativo** | **Paso origen** | **Condición**                        | **Flujo alternativo**                   | **Resultado** |
| ------------------ | --------------- | ------------------------------------ | --------------------------------------- | ------------- |
| A1                 | 1               | El cliente ya tiene membresía activa | Ofrece renovar por cédula (encadenada). | RN-005        |
| E1                 | 2               | Faltan datos                         | Solicita completarlos.                  | No se guarda  |

**CU-006 – Gestionar personal y roles**

| **Paso** | **Actor**     | **Acción del actor**       | **Respuesta del sistema**     | **Regla / dato** |
| -------- | ------------- | -------------------------- | ----------------------------- | ---------------- |
| 1        | Administrador | Abre Personal.             | Lista los usuarios.           | RN-011           |
| 2        | Administrador | Crea o elimina un usuario. | Valida datos y restricciones. | RN-012           |
| 3        | Sistema       | —                          | Guarda el cambio.             | —                |

| **ID alternativo** | **Paso origen** | **Condición**                                       | **Flujo alternativo** | **Resultado** |
| ------------------ | --------------- | --------------------------------------------------- | --------------------- | ------------- |
| E1                 | 2               | Correo ya registrado                                | Informa el duplicado. | Sin cambios   |
| E2                 | 2               | Eliminar la propia cuenta o al último administrador | Lo impide.            | Sin cambios   |

**CU-007 – Consultar registro financiero**

| **Paso** | **Actor**     | **Acción del actor**          | **Respuesta del sistema**              | **Regla / dato** |
| -------- | ------------- | ----------------------------- | -------------------------------------- | ---------------- |
| 1        | Administrador | Abre Registro financiero.     | Calcula totales y resumen por cliente. | RN-011           |
| 2        | Administrador | Aplica filtros.               | Valida las fechas y filtra.            | —                |
| 3        | Administrador | Abre Ver pagos de un cliente. | Muestra el detalle de cada pago.       | RN-004           |

| **ID alternativo** | **Paso origen** | **Condición**            | **Flujo alternativo**           | **Resultado** |
| ------------------ | --------------- | ------------------------ | ------------------------------- | ------------- |
| A1                 | 2               | Sin datos para el filtro | Muestra un mensaje informativo. | —             |
| E1                 | 2               | Rango de fechas inválido | Muestra el error.               | Sin consulta  |

**CU-008 – Restablecer contraseña**

| **Paso** | **Actor** | **Acción del actor** | **Respuesta del sistema** | **Regla / dato** |
| -------- | --------- | -------------------- | ------------------------- | ---------------- |
| 1        | Usuario   | Pulsa «¿Olvidaste tu contraseña?» y escribe su correo. | Muestra el mismo mensaje exista o no el correo; si existe, envía un código de 6 dígitos que vence en 10 minutos. | RNF-001 |
| 2        | Usuario   | Escribe el código. | Verifica el código y habilita el paso de la nueva contraseña (token de 10 minutos). | 5 intentos |
| 3        | Usuario   | Escribe y confirma la nueva contraseña. | Valida las reglas, la guarda cifrada, gasta el código y cierra las sesiones abiertas. | RN-016, RN-017 |
| 4        | Sistema   | — | Envía un aviso del cambio al correo y vuelve al inicio de sesión. | — |

| **ID alternativo** | **Paso origen** | **Condición** | **Flujo alternativo** | **Resultado** |
| ------------------ | --------------- | ------------- | --------------------- | ------------- |
| A1 | 2 | No llegó el código | «Reenviar código» (disponible tras la cuenta regresiva). | Se envía un código nuevo |
| A2 | 1 | Correo no registrado | Se muestra el mismo mensaje del paso 1. | No se envía nada |
| E1 | 2 | Código incorrecto | Informa los intentos restantes. | Con 5 fallos el código deja de servir |
| E2 | 2 | Código vencido o ya usado | «El código no es válido o ya venció. Solicita uno nuevo.» | Vuelve al paso 1 |
| E3 | 3 | Contraseña inválida o igual a la anterior | Marca el campo con su error. | No se guarda |
| E4 | 1 | Demasiadas solicitudes o correo sin configurar | Responde 429 o 503 con el mensaje. | Sin código |

**CU-009 – Enviar aviso de vencimiento**

| **Paso** | **Actor** | **Acción del actor** | **Respuesta del sistema** | **Regla / dato** |
| -------- | --------- | -------------------- | ------------------------- | ---------------- |
| 1        | Tarea programada | Se ejecuta a las 8:00. | Busca las membresías activas que vencen en los próximos 7 días. | RN-018 |
| 2        | Sistema   | — | Descarta planes de menos de 15 días, clientes sin avisos autorizados, clientes con membresía pendiente y membresías ya avisadas. | RN-018, RN-019 |
| 3        | Sistema   | — | Envía a cada cliente el correo con el plan, la fecha de fin y los ingresos restantes de la tiquetera. | ACT-06 |
| 4        | Sistema   | — | Registra el envío en avisos_membresia. | Un aviso por membresía |

| **ID alternativo** | **Paso origen** | **Condición** | **Flujo alternativo** | **Resultado** |
| ------------------ | --------------- | ------------- | --------------------- | ------------- |
| A1 | 1 | El servidor arranca entre las 8:00 y las 20:00 | Ejecuta la tarea al arrancar. | Avisos del día al día |
| E1 | 1 | Correo sin configurar | Registra la omisión en el log. | No se envía nada |
| E2 | 3 | El proveedor rechaza un envío | Registra el error y sigue con los demás. | Se reintenta al día siguiente |

### 9.5 Ejemplo resumido

<table>
<tbody>
<tr class="odd">
<td><p><strong>CU-004: Validar acceso</strong></p>
<p>Actor: cliente (supervisa la recepción). Disparador: el cliente pone su huella en el lector. Precondición: cliente con huella registrada y lector operativo. Flujo: el sistema identifica al cliente, consulta su membresía más reciente, evalúa su estado, permite o niega el acceso mostrando el resultado en la recepción, y registra el intento. Alternativos: membresía vencida, cancelada o inexistente; huella no reconocida; error de conexión. Postcondición: intento registrado; el acceso solo se permite si la membresía está activa y vigente.</p></td>
</tr>
</tbody>
</table>

## 10\. Diagramas y relaciones UML

### 10.1 Diagrama de contexto de casos de uso

Incluya un diagrama legible con actores externos y casos de uso de alto nivel. No convierta el diagrama en una lista de cada botón o pantalla.

![Figura 1. Diagrama general de casos de uso (DIA-CU-01).](casos-uso/casos-de-uso.png)

*Figura 1. Diagrama general de casos de uso (DIA-CU-01).*

| **Elemento**       | **Criterio**                                                  |
| ------------------ | ------------------------------------------------------------- |
| Actores            | Representan roles o sistemas externos, no personas concretas. |
| Casos de uso       | Se nombran con verbo y resultado.                             |
| Límite del sistema | Muestra qué pertenece al producto.                            |
| Asociaciones       | Indican interacción real.                                     |
| include            | Reutilización obligatoria de comportamiento común.            |
| extend             | Comportamiento opcional o condicionado.                       |
| Generalización     | Especialización real entre actores o casos.                   |

### 10.2 Registro de diagramas

Fuentes y PNG en [`casos-uso/`](casos-uso/). Los diagramas de arquitectura y datos (contexto, clases, paquetes, entidad-relación, estados y despliegue) están en [`../diagramas/`](../diagramas/) y se registran en [Arquitectura, sección 6.1](../04-arquitectura.md#61-catálogo-de-diagramas).

| **ID** | **Nombre** | **Fuente** | **Versión** | **Artefactos relacionados** |
| --- | --- | --- | --- | --- |
| DIA-CU-01 | Diagrama general de casos de uso | [casos-de-uso.dot](casos-uso/casos-de-uso.dot) (Graphviz) | 2.1 | CU-001 a CU-009, ACT-01 a ACT-06 |
| DIA-SEC-01 | Secuencia: conexión del agente del lector | [secuencia-01-conexion-agente.mmd](casos-uso/secuencia-01-conexion-agente.mmd) | 2.0 | CU-004 · ADR-008 |
| DIA-SEC-02 | Secuencia: iniciar sesión | [secuencia-02-iniciar-sesion.mmd](casos-uso/secuencia-02-iniciar-sesion.mmd) | 2.0 | CU-001 · HU-002 |
| DIA-SEC-03 | Secuencia: gestionar personal y roles | [secuencia-03-gestionar-personal.mmd](casos-uso/secuencia-03-gestionar-personal.mmd) | 2.0 | CU-006 · HU-002 |
| DIA-SEC-04 | Secuencia: registrar cliente | [secuencia-04-registrar-cliente.mmd](casos-uso/secuencia-04-registrar-cliente.mmd) | 2.0 | CU-002 · HU-001 |
| DIA-SEC-05 | Secuencia: gestionar planes de membresía | [secuencia-05-gestionar-planes.mmd](casos-uso/secuencia-05-gestionar-planes.mmd) | 2.0 | CU-003 · HU-003 |
| DIA-SEC-06 | Secuencia: renovar membresía por cédula | [secuencia-06-renovar-membresia.mmd](casos-uso/secuencia-06-renovar-membresia.mmd) | 2.0 | CU-005 · HU-004 |
| DIA-SEC-07 | Secuencia: registrar huella del cliente | [secuencia-07-registrar-huella.mmd](casos-uso/secuencia-07-registrar-huella.mmd) | 2.0 | CU-004 · HU-005 |
| DIA-SEC-08 | Secuencia: validar acceso con la huella | [secuencia-08-validar-acceso.mmd](casos-uso/secuencia-08-validar-acceso.mmd) | 2.0 | CU-004 · HU-006, HU-007 |
| DIA-SEC-09 | Secuencia: registrar pago y consultar el registro financiero | [secuencia-09-pagos-finanzas.mmd](casos-uso/secuencia-09-pagos-finanzas.mmd) | 2.0 | CU-005, CU-007 · HU-008 |
| DIA-SEC-10 | Secuencia: protección de las rutas de la API | [secuencia-10-proteccion-api.mmd](casos-uso/secuencia-10-proteccion-api.mmd) | 2.0 | HU-009, HU-010 |
| DIA-SEC-11 | Secuencia: restablecer contraseña | [secuencia-11-recuperar-contrasena.mmd](casos-uso/secuencia-11-recuperar-contrasena.mmd) | 1.0 | CU-008 · HU-014 |
| DIA-SEC-12 | Secuencia: enviar aviso de vencimiento | [secuencia-12-aviso-vencimiento.mmd](casos-uso/secuencia-12-aviso-vencimiento.mmd) | 1.0 | CU-009 · HU-015 |
| DIA-ACV-01 | Actividad: validar acceso | [actividad-01-validar-acceso.mmd](casos-uso/actividad-01-validar-acceso.mmd) | 2.0 | EP-003 · CU-004 |
| DIA-ACV-02 | Actividad: renovar membresía por cédula | [actividad-02-renovar-membresia.mmd](casos-uso/actividad-02-renovar-membresia.mmd) | 2.0 | EP-002 · CU-005 |
| DIA-ACV-03 | Actividad: iniciar sesión | [actividad-03-iniciar-sesion.mmd](casos-uso/actividad-03-iniciar-sesion.mmd) | 2.0 | EP-001 · CU-001 |
| DIA-ACV-04 | Actividad: registrar cliente | [actividad-04-registrar-cliente.mmd](casos-uso/actividad-04-registrar-cliente.mmd) | 2.0 | EP-001 · CU-002 |
| DIA-ACV-05 | Actividad: gestionar personal | [actividad-05-gestionar-personal.mmd](casos-uso/actividad-05-gestionar-personal.mmd) | 2.0 | EP-001 · CU-006 |
| DIA-ACV-06 | Actividad: gestionar planes | [actividad-06-gestionar-planes.mmd](casos-uso/actividad-06-gestionar-planes.mmd) | 2.0 | EP-002 · CU-003 |
| DIA-ACV-07 | Actividad: registrar huella | [actividad-07-registrar-huella.mmd](casos-uso/actividad-07-registrar-huella.mmd) | 2.0 | EP-003 · CU-004 |
| DIA-ACV-08 | Actividad: registrar pago y consultar finanzas | [actividad-08-pagos-finanzas.mmd](casos-uso/actividad-08-pagos-finanzas.mmd) | 2.0 | EP-004 · CU-005, CU-007 |
| DIA-ACV-09 | Actividad: proteger una petición | [actividad-09-proteger-peticion.mmd](casos-uso/actividad-09-proteger-peticion.mmd) | 2.0 | EP-005 · HU-009, HU-010 |
| DIA-ACV-10 | Actividad: restablecer contraseña | [actividad-10-recuperar-contrasena.mmd](casos-uso/actividad-10-recuperar-contrasena.mmd) | 1.0 | EP-001 · CU-008 |
| DIA-ACV-11 | Actividad: enviar aviso de vencimiento | [actividad-11-aviso-vencimiento.mmd](casos-uso/actividad-11-aviso-vencimiento.mmd) | 1.0 | EP-002 · CU-009 |

### 10.3 Diagramas de secuencia

Cada diagrama numera los mensajes en orden; los bloques «alt» marcan los caminos alternos o de error.

**DIA-SEC-01 – Conexión del agente del lector** (CU-004 · ADR-008)

![Figura 2. Secuencia: Conexión del agente del lector (DIA-SEC-01).](casos-uso/secuencia-01-conexion-agente.png)

*Figura 2. Secuencia: Conexión del agente del lector (DIA-SEC-01).*

**DIA-SEC-02 – Iniciar sesión** (CU-001 · HU-002)

![Figura 3. Secuencia: Iniciar sesión (DIA-SEC-02).](casos-uso/secuencia-02-iniciar-sesion.png)

*Figura 3. Secuencia: Iniciar sesión (DIA-SEC-02).*

**DIA-SEC-03 – Gestionar personal y roles** (CU-006 · HU-002)

![Figura 4. Secuencia: Gestionar personal y roles (DIA-SEC-03).](casos-uso/secuencia-03-gestionar-personal.png)

*Figura 4. Secuencia: Gestionar personal y roles (DIA-SEC-03).*

**DIA-SEC-04 – Registrar cliente** (CU-002 · HU-001)

![Figura 5. Secuencia: Registrar cliente (DIA-SEC-04).](casos-uso/secuencia-04-registrar-cliente.png)

*Figura 5. Secuencia: Registrar cliente (DIA-SEC-04).*

**DIA-SEC-05 – Gestionar planes de membresía** (CU-003 · HU-003)

![Figura 6. Secuencia: Gestionar planes de membresía (DIA-SEC-05).](casos-uso/secuencia-05-gestionar-planes.png)

*Figura 6. Secuencia: Gestionar planes de membresía (DIA-SEC-05).*

**DIA-SEC-06 – Renovar membresía por cédula** (CU-005 · HU-004)

![Figura 7. Secuencia: Renovar membresía por cédula (DIA-SEC-06).](casos-uso/secuencia-06-renovar-membresia.png)

*Figura 7. Secuencia: Renovar membresía por cédula (DIA-SEC-06).*

**DIA-SEC-07 – Registrar huella del cliente** (CU-004 · HU-005)

![Figura 8. Secuencia: Registrar huella del cliente (DIA-SEC-07).](casos-uso/secuencia-07-registrar-huella.png)

*Figura 8. Secuencia: Registrar huella del cliente (DIA-SEC-07).*

**DIA-SEC-08 – Validar acceso con la huella** (CU-004 · HU-006, HU-007)

![Figura 9. Secuencia: Validar acceso con la huella (DIA-SEC-08).](casos-uso/secuencia-08-validar-acceso.png)

*Figura 9. Secuencia: Validar acceso con la huella (DIA-SEC-08).*

**DIA-SEC-09 – Registrar pago y consultar el registro financiero** (CU-005, CU-007 · HU-008)

![Figura 10. Secuencia: Registrar pago y consultar el registro financiero (DIA-SEC-09).](casos-uso/secuencia-09-pagos-finanzas.png)

*Figura 10. Secuencia: Registrar pago y consultar el registro financiero (DIA-SEC-09).*

**DIA-SEC-10 – Protección de las rutas de la API** (HU-009, HU-010)

![Figura 11. Secuencia: Protección de las rutas de la API (DIA-SEC-10).](casos-uso/secuencia-10-proteccion-api.png)

*Figura 11. Secuencia: Protección de las rutas de la API (DIA-SEC-10).*

**DIA-SEC-11 – Restablecer contraseña** (CU-008 · HU-014)

![Figura 12. Secuencia: Restablecer contraseña (DIA-SEC-11).](casos-uso/secuencia-11-recuperar-contrasena.png)

*Figura 12. Secuencia: Restablecer contraseña (DIA-SEC-11).*

**DIA-SEC-12 – Enviar aviso de vencimiento** (CU-009 · HU-015)

![Figura 13. Secuencia: Enviar aviso de vencimiento (DIA-SEC-12).](casos-uso/secuencia-12-aviso-vencimiento.png)

*Figura 13. Secuencia: Enviar aviso de vencimiento (DIA-SEC-12).*

### 10.4 Diagramas de actividades

Cada diagrama empieza en el círculo relleno y termina en el doble círculo; los rombos son decisiones con sus salidas rotuladas.

**DIA-ACV-01 – Validar acceso** (EP-003 · CU-004)

![Figura 14. Actividad: Validar acceso (DIA-ACV-01).](casos-uso/actividad-01-validar-acceso.png)

*Figura 14. Actividad: Validar acceso (DIA-ACV-01).*

**DIA-ACV-02 – Renovar membresía por cédula** (EP-002 · CU-005)

![Figura 15. Actividad: Renovar membresía por cédula (DIA-ACV-02).](casos-uso/actividad-02-renovar-membresia.png)

*Figura 15. Actividad: Renovar membresía por cédula (DIA-ACV-02).*

**DIA-ACV-03 – Iniciar sesión** (EP-001 · CU-001)

![Figura 16. Actividad: Iniciar sesión (DIA-ACV-03).](casos-uso/actividad-03-iniciar-sesion.png)

*Figura 16. Actividad: Iniciar sesión (DIA-ACV-03).*

**DIA-ACV-04 – Registrar cliente** (EP-001 · CU-002)

![Figura 17. Actividad: Registrar cliente (DIA-ACV-04).](casos-uso/actividad-04-registrar-cliente.png)

*Figura 17. Actividad: Registrar cliente (DIA-ACV-04).*

**DIA-ACV-05 – Gestionar personal** (EP-001 · CU-006)

![Figura 18. Actividad: Gestionar personal (DIA-ACV-05).](casos-uso/actividad-05-gestionar-personal.png)

*Figura 18. Actividad: Gestionar personal (DIA-ACV-05).*

**DIA-ACV-06 – Gestionar planes** (EP-002 · CU-003)

![Figura 19. Actividad: Gestionar planes (DIA-ACV-06).](casos-uso/actividad-06-gestionar-planes.png)

*Figura 19. Actividad: Gestionar planes (DIA-ACV-06).*

**DIA-ACV-07 – Registrar huella** (EP-003 · CU-004)

![Figura 20. Actividad: Registrar huella (DIA-ACV-07).](casos-uso/actividad-07-registrar-huella.png)

*Figura 20. Actividad: Registrar huella (DIA-ACV-07).*

**DIA-ACV-08 – Registrar pago y consultar finanzas** (EP-004 · CU-005, CU-007)

![Figura 21. Actividad: Registrar pago y consultar finanzas (DIA-ACV-08).](casos-uso/actividad-08-pagos-finanzas.png)

*Figura 21. Actividad: Registrar pago y consultar finanzas (DIA-ACV-08).*

**DIA-ACV-09 – Proteger una petición** (EP-005 · HU-009, HU-010)

![Figura 22. Actividad: Proteger una petición (DIA-ACV-09).](casos-uso/actividad-09-proteger-peticion.png)

*Figura 22. Actividad: Proteger una petición (DIA-ACV-09).*

**DIA-ACV-10 – Restablecer contraseña** (EP-001 · CU-008)

![Figura 23. Actividad: Restablecer contraseña (DIA-ACV-10).](casos-uso/actividad-10-recuperar-contrasena.png)

*Figura 23. Actividad: Restablecer contraseña (DIA-ACV-10).*

**DIA-ACV-11 – Enviar aviso de vencimiento** (EP-002 · CU-009)

![Figura 24. Actividad: Enviar aviso de vencimiento (DIA-ACV-11).](casos-uso/actividad-11-aviso-vencimiento.png)

*Figura 24. Actividad: Enviar aviso de vencimiento (DIA-ACV-11).*

