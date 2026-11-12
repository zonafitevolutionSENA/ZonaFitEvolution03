# Agente del lector de huellas

Programa que conecta el sensor **AS608 + CP2102** de un portátil con la API de ZonaFit Evolution en la nube (Railway). La API no tiene acceso al USB del portátil, así que el agente abre el puerto serial, se conecta **hacia afuera** con la API por WebSocket y ejecuta las órdenes que recibe: `registrar`, `capturar` y `eliminar`. Como la conexión sale del portátil, funciona con cualquier wifi o con los datos del celular, sin abrir puertos.

Reutiliza `BackendZonafitevolution/src/hardware/as608Lector.adapter.js`: el protocolo del sensor y los templates son los mismos que en local (ADR-008).

## Requisitos

- Node.js 20 o superior.
- Controlador del CP2102 instalado (el lector aparece como `COMx` en el Administrador de dispositivos).
- Internet en el portátil.
- Dependencias del backend instaladas, porque de ahí sale `serialport`.

## Instalación

```powershell
cd BackendZonafitevolution
npm install
cd ..\AgenteLector
npm install
copy .env.example .env
```

## Configuración (`.env`)

| Variable         | Valor                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `API_WS_URL`     | `wss://zonafitevolution03-production.up.railway.app/agente` (en local: `ws://localhost:3000/agente`) |
| `AGENTE_TOKEN`   | El mismo valor de `AGENTE_TOKEN` configurado en el backend (Railway)                       |
| `PUERTO_LECTOR`  | Puerto COM del CP2102, por ejemplo `COM3`                                                   |
| `LECTOR_BAUDIOS` | `57600`                                                                                     |
| `BIOMETRIA_SALT` | El **mismo** valor con el que se registraron las huellas; si cambia, ninguna huella coincide |

El archivo `.env` no se sube a Git.

## Uso

```powershell
cd AgenteLector
npm start
```

| Mensaje                                              | Significado                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `[agente] conectado al servidor, lector listo`       | Conectado a la API; `GET /api/salud` muestra `"lector":"conectado"` |
| `[agente] huella leída: reconocida`                  | La pantalla de ingreso leyó una huella guardada en el sensor        |
| `[agente] huella leída: no registrada en el lector`  | El dedo no está registrado                                          |
| `[agente] orden: registrar` / `registrar: completado` | Registro de una huella desde Clientes                               |
| `[agente] desconectado; reintento en N s`            | Se cayó la conexión; el agente se reconecta solo (1 a 30 s)         |
| `[agente] el servidor rechazó el AGENTE_TOKEN`       | El token no coincide con el de Railway                              |
| `No se pudo abrir el lector en COM3`                 | Lector desconectado o puerto ocupado (por ejemplo, el backend local) |

Mientras la pantalla de ingreso espera un dedo, el agente no imprime nada: cada 15 segundos sin dedo es parte del ciclo normal de lectura.

Deja la ventana abierta mientras se use el lector y configura el portátil para que no se suspenda. Sin el agente, el resto del sistema sigue funcionando; solo las funciones de huella responden «Lector desconectado».
