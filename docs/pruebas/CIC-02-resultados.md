# Ciclo de pruebas CIC-02 · Sensor real en producción

> Fecha: 23/11/2026, 12:43 – 12:47 p. m. (hora de Colombia).
> Ambiente: producción (frontend en Vercel, API y MySQL en Railway), portátil de recepción con AgenteLector y sensor AS608 en COM3.
> Evidencia: grabación de pantalla `pruebas_huellero_zonafit.mp4` (3 min; se conserva fuera del repositorio) e historial de accesos del sistema. Cuadros del video en `docs/evidencias/`; los datos de otros clientes se difuminaron.

**Resultado: 5 de 5 casos aprobados.**

| ID | Caso | Resultado esperado | Resultado obtenido | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- |
| CP-010 | Registrar huella | Huella registrada para el cliente | «Registro de "Prueba Seguridad" completado con huella.» | Video seg. 33; [captura](../evidencias/cic02-cp010-registrar-huella.jpg) | Aprobado |
| CP-011 | Huella ya registrada para otro cliente | «Esta huella ya está registrada para otro cliente» | Mensaje exacto al registrar el mismo dedo en el cliente «juan m» | Video seg. 99; [captura](../evidencias/cic02-cp011-huella-duplicada.jpg) | Aprobado |
| CP-009 | Huella no reconocida | «Acércate a recepción para registrar tu huella» y el intento queda registrado | Mensaje exacto en la pantalla de ingreso; historial 12:46:17 «Huella no reconocida» | Video seg. 150; [captura](../evidencias/cic02-cp009-huella-no-registrada.jpg) | Aprobado |
| CP-008 | Acceso denegado | «Acceso denegado» con el motivo y registro en el historial | «Acceso denegado · Prueba Seguridad · El cliente no tiene ninguna membresía registrada»; historial 12:46:25 | Video seg. 156; [captura](../evidencias/cic02-cp008-acceso-denegado.jpg) | Aprobado |
| CP-007 | Acceso con membresía activa | «Acceso permitido» y registro en el historial | «Acceso permitido · juan mejia · Membresía activa y vigente»; historial 12:46:34 | Video seg. 165; [captura](../evidencias/cic02-cp007-acceso-permitido.jpg) | Aprobado |

**Observaciones**

- CP-008 se ejecutó con un cliente sin membresía; el motivo «Membresía vencida» está aprobado en el ciclo CIC-01 (`docs/pruebas/CIC-01-resultados.md`).
- Antes del ciclo, la pantalla quedó en «Conectando con el lector…»: el agente no había detectado los reinicios del backend. Se reinició el agente y se agregó un latido (ping cada 15 s) para que se reconecte solo.
- Los clientes «Prueba Seguridad» (900000001) y «juan m» (100022222) son de prueba y quedan en la base para la demostración.
