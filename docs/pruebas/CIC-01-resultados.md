# Ciclo de pruebas CIC-01 · Resultados

> Generado con `node scripts/pruebas-cp.js` el 22/11/26, 12:04 p. m. (hora de Colombia).
> Ambiente: API real (Node v22.23.5, Express 5) sobre una base MySQL de pruebas creada con `database/init.sql` (MySQL 8.0.46; en producción, MySQL 8.4 en Railway).
> El sensor AS608 se reemplaza por un agente de prueba que habla el mismo protocolo WebSocket que AgenteLector; las pruebas con el sensor físico están en el Plan de calidad (CP-010, CP-011 y CP-022, 10/11/2026).

**Resultado: 24 de 24 casos aprobados.**

| ID | Caso | Resultado esperado | Resultado obtenido | Estado |
| --- | --- | --- | --- | --- |
| CP-016 | Inicio de sesión válido | 200 con token JWT y rol Administrador | 200, token recibido, rol_id 1 | Aprobado |
| CP-017 | Credenciales inválidas | 401 con mensaje genérico, sin revelar si el correo existe | 401 «Credenciales inválidas» en ambos casos | Aprobado |
| CP-001 | Registro de cliente válido | 201 con el cliente creado | 201, cliente id 1 | Aprobado |
| CP-002 | Cédula duplicada | 409 «Ya existe un cliente registrado con esa cédula» | 409 «Ya existe un cliente registrado con esa cédula» | Aprobado |
| CP-003 | Campos inválidos | 400 con el mensaje del campo | 400 «La cédula debe contener solo números (6 a 15 dígitos)»; 400 «El correo es obligatorio» | Aprobado |
| CP-004 | Crear plan | 201 con el plan creado (Administrador) | 201, plan id 9 | Aprobado |
| CP-006 | Empleado intenta crear plan | 403 «No tienes permisos…» | 403 «No tienes permisos para realizar esta acción» | Aprobado |
| CP-005 | Eliminar plan con membresías | 409: el plan no se borra y se sugiere desactivarlo | 409 «No se puede eliminar el plan: tiene 1 membresía(s) activa(s) asociada(s). Desactívalo en su lugar.» | Aprobado |
| CP-010 | Registrar huella | 201; el agente recibe la orden «registrar» y se guarda solo el hash | 201; plantilla guardada; la respuesta no expone el hash | Aprobado |
| CP-011 | Huella ya registrada para otro cliente | 409 «Esta huella ya está registrada para otro cliente» | 409 «Esta huella ya está registrada para otro cliente» | Aprobado |
| CP-007 | Acceso con membresía activa | Permitido «Membresía activa y vigente» y queda en el historial | 200 permitido «Membresía activa y vigente» | Aprobado |
| CP-008 | Acceso con membresía vencida | Denegado «Membresía vencida» y queda en el historial | 200 denegado «Membresía vencida» | Aprobado |
| CP-009 | Huella no reconocida | 404 «Huella no reconocida» y el intento queda registrado sin cliente | 404 «Huella no reconocida»; intento registrado como denegado | Aprobado |
| CP-019 | Filtrar historial | El historial devuelve los intentos y el filtro «Denegado» deja solo los denegados | 3 registros; 2 tras filtrar por «denegado» | Aprobado |
| CP-012 | Renovar vigente | 201: la nueva membresía queda pendiente y empieza el día siguiente al fin de la actual | 201 pendiente, inicia 2026-12-23 (fin anterior 2026-12-22); no se pierden días | Aprobado |
| CP-013 | Renovar vencida | 201: la nueva membresía queda activa desde hoy | 201 activa desde 2026-11-22 | Aprobado |
| CP-014 | Resumen de pagos | El total por cliente es la suma de los precios actuales de sus planes | Cliente A: 2 pagos, total 180000 | Aprobado |
| CP-015 | Empleado sin registro financiero | El menú del Empleado no incluye «Registro financiero» | seccionPermitida(Empleado, finanzas) = false; Administrador = true | Aprobado |
| CP-020 | Petición sin token | 401 en rutas protegidas | 401 «Token de autenticación requerido» | Aprobado |
| CP-021 | Empleado en ruta de Administrador | 403 en /api/usuarios | 403 «No tienes permisos para realizar esta acción» | Aprobado |
| CP-018 | Eliminar último administrador | 409: nunca queda el sistema sin Administrador ni se borra la propia cuenta | 409 «No puedes eliminar tu propia cuenta»; con dos admins se borra uno (200); el último no se puede borrar (409 «No puedes eliminar tu propia cuenta») | Aprobado |
| CP-022 | Eliminar huella | 200; se borra del sensor (orden «eliminar») y de la base | 200; orden «eliminar» recibida por el agente; plantilla borrada de la base | Aprobado |
| RN-001 | Los clientes no se eliminan | 404: la ruta DELETE /api/clientes/:id ya no existe | 404 «Ruta no encontrada» | Aprobado |
| RNF-003 | Tiempo de validación (servidor) | p95 < 2000 ms en 50 validaciones | p95 6.4 ms; mediana 5.4 ms; máximo 8.8 ms | Aprobado |
