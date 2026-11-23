# Contribución individual verificable (GES-04)

> Fuente: historial Git del repositorio [zonafitevolutionSENA/zonafitevolution03](https://github.com/zonafitevolutionSENA/zonafitevolution03), consultado el 23/11/2026.
> Commits sin contar los de merge. La barra **Insights → Contributors** del repositorio muestra el mismo reparto: <https://github.com/zonafitevolutionSENA/zonafitevolution03/graphs/contributors>.

| Integrante | Rol | Usuario GitHub | Commits propios | Período | Pull requests |
| --- | --- | --- | --- | --- | --- |
| Juan Diego Mejía Llano | Frontend, Scrum Master | juanmejia017 | 93 en main | 17/10/2026 – 23/11/2026 | 78 de 79 (#6 a #79) |
| Liliana Sofía Panesso Méndez | Backend, Product Owner | LPAMENDEZ | 49 en ramas `feature/*` y `release/*` y 7 en main | 19/09/2026 – 09/11/2026 | Integró sus ramas por merge directo a develop |
| Maileth Begambre Movilla | UX/UI | MMBEGAMBRE | 8 en main | 18/10/2026 – 21/11/2026 | Integró por merge directo |

## Juan Diego Mejía Llano

- **Commits:** <https://github.com/zonafitevolutionSENA/zonafitevolution03/commits?author=juanmejia017>
- **Aporte:** frontend React completo (pantallas, servicios y validaciones del cliente), despliegue en Railway y Vercel, AgenteLector y pantalla de ingreso en recepción, integración continua (GitHub Actions), pruebas automáticas, reglas de seguridad del backend y documentación (Word, PDF y Markdown).
- **Capacidad de sustentación:** frontend React, despliegue en la nube, agente del lector, integración continua y documentación.

## Liliana Sofía Panesso Méndez

- **Commits:** <https://github.com/zonafitevolutionSENA/zonafitevolution03/commits?author=LPAMENDEZ>
- **Ramas:** `feature/rediseno-modelo-usuario-cliente`, `feature/patron-state-acceso`, `feature/modelo-biometria-adapter`, `feature/servicio-validacion-acceso`, `feature/servicio-renovacion`, `release/sprint1-epica1-usuarios-roles`, `release/sprint1-epica2-catalogo-planes`, `release/sprint1-epica3-biometria`, `release/sprint2-epica1-frontend-empleado`, `release/sprint2-epica2-renovacion-rapida`, `release/sprint2-epica3-validacion-acceso`.
- **Aporte (commits representativos):**

| Commit | Fecha | Cambio |
| --- | --- | --- |
| aaa178e | 19/09/2026 | Rediseño del modelo usuario/cliente y esquema de base de datos |
| bbcac74 | 19/09/2026 | Middlewares, autenticación JWT, usuarios, roles, membresías y arranque |
| 5735d84 | 19/09/2026 | Patrón State para evaluar el acceso según el estado de la membresía |
| a0ac6c5 | 19/09/2026 | Patrón Adapter con simulador del lector biométrico |
| 35bd6a7 | 19/09/2026 | Servicio de validación de acceso con auditoría (Facade) |
| c1da963 | 19/09/2026 | Renovación de membresía con encadenamiento de fechas |
| d727563 | 19/09/2026 | Tabla registros_acceso para auditoría de ingresos |
| d69cec7 | 09/11/2026 | Membresía pendiente cuando ya hay una activa |
| 1cea285 | 09/11/2026 | Activación diaria de membresías pendientes |
| 2dd682a | 09/11/2026 | Correo válido obligatorio al registrar y editar clientes |

- **Nota:** los commits de las ramas del sprint 1 y 2 tienen fecha 19/09/2026 porque ese día se reorganizaron las ramas (force-push); el trabajo corresponde a los sprints 1 y 2.
- **Capacidad de sustentación:** modelo de datos, autenticación JWT y roles, servicios de clientes, planes y membresías, patrones State, Adapter y Facade, y activación diaria de membresías.

## Maileth Begambre Movilla

- **Commits:** <https://github.com/zonafitevolutionSENA/zonafitevolution03/commits?author=MMBEGAMBRE>

| Commit | Fecha | Cambio |
| --- | --- | --- |
| b57f9d3 | 18/10/2026 | Mejorar la interfaz del frontend |
| 8f318eb | 19/10/2026 | Pantallas de gestión responsive |
| 17e72b6 | 19/10/2026 | Menú responsive compacto |
| bc15bc3 | 20/10/2026 | Cerrar la sesión del frontend al recibir 401 |
| fe07a97 | 09/11/2026 | Integrar el lector biométrico y la pantalla de ingreso |
| 15deedc | 09/11/2026 | Registro de huellas desde Clientes |
| cf5292d | 21/11/2026 | Orientar al socio en la espera y cuando la huella no está registrada |

- **Capacidad de sustentación:** diseño de la interfaz y responsive, manejo de sesión, integración del lector biométrico y pantalla de ingreso.
