# Contrato de la API

El contrato OpenAPI 3 de la API está en [`BackendZonafitevolution/openapi.yaml`](../../BackendZonafitevolution/openapi.yaml). Vive dentro del backend porque Railway solo despliega esa carpeta y la API lo lee al arrancar.

| Dónde                    | Dirección                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| Swagger UI (producción)  | https://zonafitevolution03-production.up.railway.app/api/docs           |
| Swagger UI (local)       | http://localhost:3000/api/docs                                          |
| Contrato en JSON         | `/api/openapi.json`                                                     |

- Para probar rutas protegidas: ejecutar `POST /auth/login`, copiar el `token`, pulsar **Authorize** y pegarlo. El token no se guarda al recargar la página.
- La prueba `BackendZonafitevolution/test/openapi.test.js` compara el contrato con las rutas reales de Express: si se agrega, cambia o elimina una ruta sin actualizar `openapi.yaml`, la integración continua falla.
- Al cambiar la API, actualizar `openapi.yaml` en el mismo pull request.
