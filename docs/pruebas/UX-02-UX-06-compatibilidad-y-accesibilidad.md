# UX-02 y UX-06 · Compatibilidad de dispositivos y accesibilidad

> Fecha: 23/11/2026. Ambiente: producción (https://zona-fit-evolution03.vercel.app), navegador Chrome (RNF-007 ajustado a Chrome por CR-009).

## UX-02 · Interfaz responsive (RNF-007)

Se verificó que ninguna pantalla se desborde a lo ancho (`scrollWidth` igual al ancho de la ventana) y que todos los controles sean visibles.

| Dispositivo | Pantalla | Resultado | Evidencia |
| --- | --- | --- | --- |
| Celular 375×812 | Inicio de sesión | Completo, sin cortes | [captura](../evidencias/ux02-celular-login.jpg) |
| Celular | Inicio | Tarjetas en una columna | [captura](../evidencias/ux02-celular-inicio.jpg) |
| Celular | Menú | Se abre con ⋮ y muestra todas las opciones | [captura](../evidencias/ux02-celular-menu.jpg) |
| Celular | Clientes | La tabla se desplaza dentro de su recuadro; la página no se desborda | [captura](../evidencias/ux02-celular-clientes.jpg) |
| Celular | Membresías (asignar) | Formulario completo y botones visibles | [captura](../evidencias/ux02-celular-membresias.jpg) |
| Celular | Historial | Filtros apilados | [captura](../evidencias/ux02-celular-historial.jpg) |
| Tablet 768×1024 | Inicio | Tarjetas en dos columnas | [captura](../evidencias/ux02-tablet-inicio.jpg) |
| Tablet | Clientes | Tabla con desplazamiento horizontal dentro del recuadro | [captura](../evidencias/ux02-tablet-clientes.jpg) |
| Computador | Inicio | Menú lateral, tarjetas en tres columnas | [captura](../evidencias/ux02-escritorio-inicio.jpg) |

**Resultado: Cumple.** Los datos de clientes reales se difuminaron en las capturas.

## UX-06 · Accesibilidad básica (Lighthouse)

| Pantalla | Modo | Resultado | Evidencia |
| --- | --- | --- | --- |
| Inicio de sesión | Navigation (Desktop) | 96/100. Hallazgo: «Document does not have a main landmark» | [captura](../evidencias/ux06-lighthouse-login.jpg) |
| Aplicación con sesión abierta | Snapshot | 24/24 verificaciones aprobadas | [captura](../evidencias/ux06-lighthouse-sesion.jpg) |

**Corrección:** `FrontendZonafitevolution/src/pages/Login.jsx` usa ahora `<main>` como contenedor (las pantallas internas ya lo usaban en `App.jsx`). Las 10 «verificaciones manuales» de Lighthouse son recomendaciones genéricas.

**Resultado: Cumple.**
