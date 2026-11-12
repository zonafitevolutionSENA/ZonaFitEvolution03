# Manual técnico y de operación

> Proyecto **Zona Fit Evolution** · SENA ADSO · ficha 3223873.  
> Versión formal entregable: [`entregables/05_Manuales/Manual_Tecnico_y_de_Operacion_ZonaFitEvolution.pdf`](entregables/05_Manuales/Manual_Tecnico_y_de_Operacion_ZonaFitEvolution.pdf). Este Markdown es la versión viva: se actualiza en el mismo PR que cambia el código.

## Control documental

| **Versión** | **Fecha**  | **Descripción del cambio**                                                                                          | **Elaboró**                  | **Revisó** | **Aprobó** | **Estado**  |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------- | ---------- | ----------- |
| 0.1         | 20/10/2026 | Manual técnico inicial en el documento maestro (sección 10)                                                         | Liliana Sofía Panesso Méndez |            |            | Borrador    |
| 1.0         | 03/11/2026 | Plantilla institucional; sensor AS608 y hosting por definir                                                         | Juan Diego Mejía Llano       |            |            | En revisión |
| 1.1         | 10/11/2026 | Sensor AS608 integrado: variables PUERTO\_LECTOR, incidentes 0x17 y simulador eliminado; init.sql como único script | Juan Diego Mejía Llano       |            |            | En revisión |
| 1.2         | 11/11/2026 | Despliegue en la nube (Vercel y Railway), agente del lector, variables nuevas, procedimiento, registro y pruebas de humo del despliegue | Juan Diego Mejía Llano       |            |            | En revisión |

### Aprobaciones

| **Rol**                          | **Nombre**                   | **Responsabilidad de validación**                   | **Fecha** | **Firma / aprobación** |
| -------------------------------- | ---------------------------- | --------------------------------------------------- | --------- | ---------------------- |
| Responsable técnico              | Liliana Sofía Panesso Méndez | Exactitud de instalación, configuración y operación |           |                        |
| Líder del proyecto               | Juan Diego Mejía Llano       | Correspondencia con la versión entregada            |           |                        |
| Instructor / evaluador           |                              | Verificabilidad y suficiencia técnica               |           |                        |
| Administrador de infraestructura |                              | Despliegue y operación, cuando aplique              |           |                        |

### Estado del documento

| **Estado**  | **Descripción**                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| Borrador    | Documento en construcción; aún no debe usarse como referencia operativa definitiva. |
| En revisión | Contenido sometido a validación técnica y funcional.                                |
| Aprobado    | Documento autorizado para la versión indicada del producto.                         |
| Obsoleto    | Documento reemplazado por una versión posterior; se conserva solo como histórico.   |

## 1\. Propósito y alcance del manual

Este manual documenta los procedimientos técnicos y operativos necesarios para reproducir, desplegar y mantener el sistema. Debe corresponder con el código fuente, la arquitectura, las variables de entorno, las migraciones, los scripts y la versión realmente entregada.

<table>
<tbody>
<tr class="odd">
<td><strong>Regla de consistencia<br />
</strong>Toda instrucción incluida debe poder ejecutarse. Los comandos, rutas, nombres de servicios, puertos, variables y dependencias deben coincidir con el repositorio y con el ambiente entregado. Una explicación elegante pero imposible de reproducir no cumple el propósito del manual.</td>
</tr>
</tbody>
</table>

### 1.1 Objetivos específicos

  - Describir los requisitos de hardware, software, red y acceso.

  - Explicar la estructura del repositorio y los componentes principales.

  - Documentar la configuración de variables y secretos sin exponer credenciales reales.

  - Establecer procedimientos reproducibles de instalación, migración y ejecución.

  - Definir el despliegue por ambiente y la estrategia de reversión.

  - Documentar monitoreo, logs, alertas, respaldo y recuperación.

  - Facilitar mantenimiento correctivo, adaptativo y evolutivo.

  - Proporcionar procedimientos de diagnóstico y solución de problemas.

### 1.2 Audiencia

| **Perfil**                              | **Uso esperado del manual**                           | **Conocimiento mínimo**                   |
| --------------------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Desarrollador                           | Instalación local, pruebas, mantenimiento y evolución | Lenguaje, framework, Git y terminal       |
| Administrador de sistemas               | Despliegue, configuración, monitoreo y recuperación   | SO, redes, servicios y seguridad          |
| DevOps / responsable de infraestructura | CI/CD, ambientes, secretos y observabilidad           | Automatización e infraestructura          |
| Instructor / evaluador                  | Comprobar reproducibilidad, operación y calidad       | Fundamentos de desarrollo y despliegue    |
| Soporte técnico                         | Diagnóstico de incidentes y recuperación básica       | Uso de logs y procedimientos documentados |

### 1.3 Fuera de alcance

|                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No cubre: capacitación de usuarios finales (ver Manual de Usuario), apertura automática de la puerta (fuera del MVP, CR-005), pagos en línea ni facturación electrónica, ni la administración del proveedor de hosting (por definir). |

## 2\. Documentos y artefactos relacionados

| **Documento / artefacto**              | **Código o ubicación**                   | **Versión**       | **Relación con este manual**                    |
| -------------------------------------- | ---------------------------------------- | ----------------- | ----------------------------------------------- |
| Arquitectura, Datos y Diseño Técnico   | ARQ-01                                   | 1.0               | Fuente de estructura, componentes y despliegue  |
| Plan de Calidad, Pruebas y Aceptación  | CAL-01                                   | 1.0               | Comandos, ambientes y criterios de verificación |
| Alcance y Especificación de Requisitos | REQ-01                                   | 1.0               | Restricciones técnicas y operativas             |
| README                                 | README.md (raíz del monorepo)            | main (26/10/2026) | Inicio rápido y comandos principales            |
| Contrato de API                        | No existe (por crear: OpenAPI)           |                   | Operación e integración                         |
| Migraciones                            | No existe (esquema en database/init.sql) |                   | Creación y evolución de base de datos           |
| Pipeline CI/CD                         | No existe (TT-008)                       |                   | Automatización de build y despliegue            |
| CHANGELOG                              | No existe                                |                   | Historial de versiones y cambios                |
| ADR                                    | Documento maestro, sección 5.12; ARQ-01  | 1.0               | Decisiones técnicas relevantes                  |

## 3\. Identificación técnica del producto

| **Campo**                  | **Valor**                                                               |
| -------------------------- | ----------------------------------------------------------------------- |
| Nombre técnico del sistema | ZonaFitEvolution03 (BackendZonafitevolution + FrontendZonafitevolution) |
| Versión o etiqueta Git     | Sin etiqueta; v1.0.0 prevista para el 12/12/2026                        |
| Repositorio principal      | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03              |
| Rama de entrega            | main                                                                    |
| Tipo de solución           | Aplicación web SPA + API REST                                           |
| Arquitectura general       | Cliente-servidor con backend en capas (ARQ-01)                          |
| Licencia                   |                                                                         |
| Propietario técnico        | Liliana Sofía Panesso Méndez                                            |
| Canal de soporte           |                                                                         |
| Ambiente de referencia     | Desarrollo local (Windows, CMD)                                         |

### 3.1 Resumen tecnológico

| **Capa / servicio**  | **Tecnología**                             | **Versión**                | **Función**                       | **Fuente de versión**                 |
| -------------------- | ------------------------------------------ | -------------------------- | --------------------------------- | ------------------------------------- |
| Frontend             | React + Vite                               | react ^19.2.8, vite ^8.3.0 | SPA del personal                  | FrontendZonafitevolution/package.json |
| Backend              | Express                                    | express ^5.2.1             | API REST bajo /api                | BackendZonafitevolution/package.json  |
| Base de datos        | MySQL / MariaDB + mysql2                   | mysql2 ^3.24.4             | Persistencia                      | package.json; servidor según ambiente |
| Servidor web / proxy |                                            |                            |                                   |                                       |
| Runtime              | Node.js                                    | LTS reciente               | Ejecución del backend y del build | README                                |
| Contenedores         | No aplica                                  |                            |                                   |                                       |
| CI/CD                | No existe (TT-008)                         |                            |                                   |                                       |
| Monitoreo            |                                            |                            |                                   |                                       |
| Servicios externos   | Sensor AS608 + CP2102; hosting por definir |                            | Captura de huella; publicación    |                                       |

### 3.2 Componentes desplegables

| **ID** | **Componente**       | **Artefacto generado**    | **Puerto / endpoint** | **Dependencias**             | **Responsable**              |
| ------ | -------------------- | ------------------------- | --------------------- | ---------------------------- | ---------------------------- |
| CMP-01 | Frontend SPA         | dist/ (npm run build)     | 5173 en desarrollo    | VITE\_API\_URL               | Juan Diego Mejía Llano       |
| CMP-02 | API REST             | Código fuente (npm start) | 3000 · /api           | MySQL, .env                  | Liliana Sofía Panesso Méndez |
| CMP-03 | Base de datos        | Esquema init.sql          | 3306                  | —                            | Liliana Sofía Panesso Méndez |
| CMP-04 | Adaptador del sensor | src/hardware              | USB-serie (CP2102)    | TIPO\_LECTOR, PUERTO\_LECTOR | Liliana Sofía Panesso Méndez |

## 4\. Requisitos de infraestructura

### 4.1 Requisitos mínimos y recomendados

| **Recurso**              | **Mínimo** | **Recomendado** | **Observaciones**                      |
| ------------------------ | ---------- | --------------- | -------------------------------------- |
| CPU                      |            |                 |                                        |
| Memoria RAM              |            |                 |                                        |
| Almacenamiento           |            |                 |                                        |
| Sistema operativo        |            |                 | Windows (comandos del manual en CMD)   |
| Conectividad             |            |                 | Internet para npm; en producción, internet en el portátil del lector (wifi o datos del celular) |
| Navegador / cliente      |            |                 | Chrome, Edge o Firefox actualizados    |
| Resolución / dispositivo |            |                 | Desde 360 px de ancho                  |

### 4.2 Dependencias de software

| **Dependencia**          | **Versión exacta o rango**      | **Obligatoria**      | **Instalación / fuente**     | **Verificación**   |
| ------------------------ | ------------------------------- | -------------------- | ---------------------------- | ------------------ |
| Git                      |                                 | Sí                   | git-scm.com                  | git --version      |
| Runtime / SDK            | Node.js LTS reciente            | Sí                   | nodejs.org                   | node -v            |
| Gestor de paquetes       | npm (incluido con Node.js)      | Sí                   | nodejs.org                   | npm -v             |
| Motor de base de datos   | MySQL o MariaDB (p. ej., XAMPP); MySQL 8.4 en Railway | Sí                   | XAMPP en local; Railway en producción | mysql --version    |
| Docker / equivalente     | No aplica                       | No                   | —                            | —                  |
| Herramientas adicionales | Controlador del CP2102; Node.js 20 o superior para AgenteLector | Solo en el portátil del lector | Fabricante del conversor; nodejs.org | Puerto COM visible; node -v |

### 4.3 Puertos, protocolos y conectividad

| **Servicio**     | **Puerto**        | **Protocolo**                    | **Origen permitido**         | **Destino**  | **Justificación**     |
| ---------------- | ----------------- | -------------------------------- | ---------------------------- | ------------ | --------------------- |
| Frontend         | 5173 (desarrollo) / 443 (Vercel) | HTTP local / HTTPS en producción | Navegador del personal       | API          | Servidor de Vite; Vercel en producción |
| Backend / API    | 3000 (local) / 8080 detrás del proxy de Railway (443) | HTTP local / HTTPS y WSS en producción | Frontend (ORIGEN\_FRONTEND) y agente del lector (/agente) | MySQL        | PORT lo asigna Railway |
| Base de datos    | 3306              | TCP                              | Solo la API (red privada de Railway) | —            | No exponer a internet |
| Monitoreo        | 443               | HTTPS                            | Railway (healthcheck)        | /api/salud   | Estado de la API y del lector |
| Servicio externo | USB (COM)         | Serie (UART)                     | Sensor AS608                 | AgenteLector | CP2102; el agente sale a internet por WSS (sin abrir puertos) |

### 4.4 Cuentas y accesos requeridos

| **Recurso**      | **Tipo de acceso**  | **Rol mínimo** | **Responsable de otorgar**                              | **Procedimiento** |
| ---------------- | ------------------- | -------------- | ------------------------------------------------------- | ----------------- |
| Repositorio      | Lectura / escritura |                | Administradores de la organización zonafitevolutionSENA |                   |
| Servidor / nube  | Railway y Vercel (inicio de sesión con GitHub) | Dueño del proyecto | Juan Diego Mejía Llano | Invitar al miembro desde Railway y Vercel |
| Base de datos    | Variables de MySQL en Railway; editor de consultas y consola del servicio | Dueño del proyecto | Liliana Sofía Panesso Méndez | Desde el proyecto de Railway; nunca compartir la contraseña por chat |
| DNS / dominio    | Dominios gratuitos *.vercel.app y *.up.railway.app | — | — | No se usa dominio propio |
| Servicio externo | AGENTE\_TOKEN y PANTALLA\_TOKEN | Personal autorizado | Juan Diego Mejía Llano | Entregar el token solo a quien opera el lector o la pantalla de ingreso |

## 5\. Estructura del repositorio

<table>
<tbody>
<tr class="odd">
<td><strong>Criterio de mantenibilidad<br />
</strong>La estructura debe permitir que otro desarrollador identifique rápidamente código fuente, configuración, migraciones, pruebas, documentación y scripts. No se deben conservar archivos generados, secretos ni código obsoleto sin justificación.</td>
</tr>
</tbody>
</table>

### 5.1 Árbol principal

<table>
<tbody>
<tr class="odd">
<td><p>ZonaFitEvolution03/</p>
<p>├── README.md</p>
<p>├── BackendZonafitevolution/</p>
<p>│ ├── database/init.sql</p>
<p>│ ├── scripts/crear-admin.js</p>
<p>│ ├── src/ (config, controllers, estadosAcceso, hardware, middlewares, models, repositories, routes, services, utils, app.js)</p>
<p>│ ├── .env.example</p>
<p>│ ├── index.js</p>
<p>│ └── package.json</p>
<p>├── FrontendZonafitevolution/</p>
<p>│ ├── src/ (pages, components, services, utils, assets)</p>
<p>│ ├── index.html</p>
<p>│ ├── vite.config.js</p>
<p>│ └── package.json</p>
<p>└── docs/analisis/</p></td>
</tr>
</tbody>
</table>

### 5.2 Descripción de directorios

| **Ruta**                     | **Contenido**                           | **Responsabilidad**          | **Artefactos principales**                              |
| ---------------------------- | --------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| /BackendZonafitevolution/src | API en capas                            | Liliana Sofía Panesso Méndez | routes, controllers, services, repositories             |
| /tests                       | No existe (TT-007)                      |                              |                                                         |
| /docs                        | Documentos del proyecto                 | Juan Diego Mejía Llano       | analisis/Historias\_de\_Usuario\_y\_Casos\_de\_Uso.docx |
| /migrations                  | No existe; esquema en database/init.sql | Liliana Sofía Panesso Méndez | init.sql                                                |
| /scripts                     | Utilidades del backend                  | Liliana Sofía Panesso Méndez | crear-admin.js                                          |
| /config                      | Conexión a la base (src/config)         | Liliana Sofía Panesso Méndez | database.js (pool)                                      |
| /infra                       | No existe                               |                              |                                                         |
| /.github/workflows           | No existe (TT-008)                      |                              |                                                         |

### 5.3 Archivos fundamentales

| **Archivo**  | **Propósito**                          | **Debe contener**                            | **No debe contener**           |
| ------------ | -------------------------------------- | -------------------------------------------- | ------------------------------ |
| README.md    | Inicio rápido                          | Descripción, instalación, comandos y enlaces | Información desactualizada     |
| .env.example | Variables requeridas                   | Nombres y valores ficticios seguros          | Secretos o credenciales reales |
| CHANGELOG.md | No existe                              | Cambios, correcciones e incompatibilidades   | Cambios sin versión            |
| LICENSE      | No existe                              | Licencia y atribuciones                      | Licencias incompatibles        |
| Lockfile     | package-lock.json (backend y frontend) | Versiones resueltas                          | Edición manual injustificada   |

## 6\. Configuración y gestión de variables

### 6.1 Matriz de variables de entorno

| **Variable**                     | **Descripción**                         | **Tipo**       | **Obligatoria**     | **Valor de ejemplo**          | **Secreto**          | **Ambientes** |
| -------------------------------- | --------------------------------------- | -------------- | ------------------- | ----------------------------- | -------------------- | ------------- |
| DB\_HOST, DB\_PORT               | Servidor y puerto de MySQL              | Texto / número | Sí                  | localhost, 3306               | No                   | Todos         |
| DB\_USER, DB\_PASSWORD, DB\_NAME | Credenciales y base                     | Texto          | Sí                  | root, —, zonafitevolution     | Sí (DB\_PASSWORD)    | Todos         |
| PORT                             | Puerto de la API                        | Número         | No                  | 3000                          | No                   | Todos         |
| JWT\_SECRET, JWT\_EXPIRES\_IN    | Firma y duración del token              | Texto          | Sí                  | \<valor largo aleatorio\>, 8h | Sí (JWT\_SECRET)     | Todos         |
| BIOMETRIA\_SALT, TIPO\_LECTOR    | Sal de plantillas; adaptador del sensor | Texto          | Sí                  | \<valor aleatorio\>, as608    | Sí (BIOMETRIA\_SALT) | Todos         |
| PUERTO\_LECTOR, LECTOR\_BAUDIOS  | Puerto COM y velocidad del sensor AS608 | Texto / número | Sí con as608 (en AgenteLector/.env en producción) | COM3, 57600 | No | Todos |
| TIPO\_LECTOR                     | as608 (USB en el equipo de la API) o remoto (agente) | Texto | No (as608 por defecto) | as608 en local; remoto en Railway | No | Todos |
| AGENTE\_TOKEN                    | Token compartido entre el backend y AgenteLector | Texto | Sí con remoto | \<64 caracteres aleatorios\> | Sí | Producción |
| PANTALLA\_TOKEN                  | Token de la pantalla de ingreso en la nube; vacío = solo el mismo equipo | Texto | Sí en producción | \<64 caracteres aleatorios\> | Sí | Producción |
| ORIGEN\_FRONTEND                 | Orígenes permitidos por CORS, separados por comas | URL | Sí en producción | https://zona-fit-evolution03.vercel.app | No | Todos |
| TZ                               | Zona horaria del servidor               | Texto          | Sí en producción    | America/Bogota                | No                   | Todos         |
| API\_WS\_URL (AgenteLector)      | Dirección WebSocket del backend          | URL            | Sí                  | wss://zonafitevolution03-production.up.railway.app/agente | No | Producción |
| VITE\_API\_URL                   | URL base de la API (frontend); en Vercel es de tipo Config | URL | Sí | http://localhost:3000/api; https://zonafitevolution03-production.up.railway.app/api | No | Todos |

<table>
<tbody>
<tr class="odd">
<td><strong>Seguridad obligatoria<br />
</strong>El manual debe explicar dónde se obtienen y cómo se configuran los secretos, pero nunca debe incluir valores reales. Los secretos no deben almacenarse en el repositorio, capturas, archivos de ejemplo ni documentos compartidos.</td>
</tr>
</tbody>
</table>

### 6.2 Configuración por ambiente

| **Aspecto**        | **Desarrollo**                                    | **Pruebas**              | **Producción**                           |
| ------------------ | ------------------------------------------------- | ------------------------ | ---------------------------------------- |
| Base de datos      | MySQL local, base zonafitevolution                |                          | MySQL 8.4 en Railway, base railway (volumen persistente) |
| Nivel de logs      | Consola del backend                               |                          | Deploy Logs de Railway; consola del agente |
| Dominio / URL      | Local (localhost)                                 |                          | https://zona-fit-evolution03.vercel.app (frontend); https://zonafitevolution03-production.up.railway.app/api (API) |
| Servicios externos | Sensor AS608 (TIPO\_LECTOR=as608, PUERTO\_LECTOR) |                          | Sensor AS608 vía AgenteLector (TIPO\_LECTOR=remoto) |
| Datos permitidos   | Sintéticos                                        | Ficticios o anonimizados | Reales                                   |
| Depuración         | Consola del backend                               | Limitada                 | Deshabilitada                            |
| Secretos           | .env local (fuera de Git)                         | Gestor del ambiente      | Variables de Railway y AgenteLector/.env; secretos nuevos |

### 6.3 Verificación de configuración

1.  Confirmar que el archivo de ejemplo contiene todas las variables necesarias.

2.  Validar que ninguna variable crítica tenga un valor vacío.

3.  Comprobar conectividad con base de datos y servicios externos.

4.  Ejecutar validación automática de esquema de configuración, cuando exista.

5.  Verificar que los logs no muestren secretos ni datos sensibles.

<table>
<tbody>
<tr class="odd">
<td><p>git --version</p>
<p>node -v</p>
<p>npm -v</p>
<p>mysql --version</p>
<p>mysql -u root -p -e "USE zonafitevolution; SHOW TABLES;"</p></td>
</tr>
</tbody>
</table>

## 7\. Instalación y ejecución en ambiente local

### 7.1 Preparación

6.  Instalar las dependencias de software definidas en la sección 4.

7.  Clonar el repositorio desde la ubicación oficial.

8.  Cambiar a la rama o etiqueta aprobada para la versión.

9.  Crear la configuración local a partir del archivo de ejemplo.

10. Instalar dependencias utilizando el gestor y el lockfile del proyecto.

11. Crear o conectar la base de datos.

12. Aplicar migraciones y datos semilla.

13. Ejecutar pruebas mínimas de verificación.

14. Iniciar los servicios.

15. Confirmar salud y acceso al sistema.

### 7.2 Comandos de instalación

| **Paso**               | **Comando**                                                                                                                     | **Resultado esperado**           | **Evidencia / verificación**                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------- |
| Clonar repositorio     | git clone https://github.com/zonafitevolutionSENA/ZonaFitEvolution03.git                                                        | Código descargado                | Carpeta ZonaFitEvolution03                            |
| Seleccionar versión    | git checkout main                                                                                                               | Rama de entrega                  | git branch                                            |
| Instalar dependencias  | cd BackendZonafitevolution && npm install; cd ..\\FrontendZonafitevolution && npm install                                       | node\_modules creados            | Sin errores de npm                                    |
| Crear configuración    | copy .env.example .env (backend); echo VITE\_API\_URL=http://localhost:3000/api\> .env (frontend)                               | .env completos                   | DB\_PASSWORD, JWT\_SECRET y BIOMETRIA\_SALT definidos |
| Preparar base de datos | mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;" y mysql -u root -p zonafitevolution \< database\\init.sql | 7 tablas creadas                 | SHOW TABLES                                           |
| Ejecutar pruebas       | No hay pruebas automatizadas (TT-007)                                                                                           |                                  |                                                       |
| Iniciar aplicación     | npm start (backend); npm run dev (frontend)                                                                                     | API en :3000 y frontend en :5173 | Abrir http://localhost:5173                           |

### 7.3 Verificación inicial

| **Verificación**           | **Método**                                                                     | **Resultado esperado**           | **Cumple**     |
| -------------------------- | ------------------------------------------------------------------------------ | -------------------------------- | -------------- |
| Compilación / build        | npm run build (frontend)                                                       | Finaliza sin errores             | Sí / No        |
| Conexión a base de datos   | Iniciar el backend y abrir una pantalla con datos                              | Conexión exitosa                 | Sí / No        |
| Health check               | No existe endpoint /health; la raíz responde { "error": "Ruta no encontrada" } | Estado saludable                 | Sí / No        |
| Inicio de sesión de prueba | Usuario creado con scripts/crear-admin.js                                      | Acceso según rol                 | Sí / No / N.A. |
| Flujo crítico              | Registrar cliente, asignar membresía y validar acceso                          | Se completa sin bloqueo          | Sí / No        |
| Logs                       | Consola del backend                                                            | Sin errores críticos ni secretos | Sí / No        |

## 8\. Base de datos, migraciones y datos semilla

### 8.1 Creación y configuración

<table>
<tbody>
<tr class="odd">
<td><p>cd BackendZonafitevolution</p>
<p>mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"</p>
<p>mysql -u root -p zonafitevolution &lt; database\init.sql</p>
<p>Atención: init.sql borra y vuelve a crear roles, usuarios y membresias; no ejecutarlo sobre una base con datos. Crea los 8 planes de 2026 (Sesión, Quincena, Mensualidad, Trimestre, tarifas de estudiantes y tiqueteras x6 y x12). Es el único script SQL: ante un cambio de esquema se recrea la base.</p>
<p>Usuario técnico con permisos mínimos: por definir para producción.</p></td>
</tr>
</tbody>
</table>

### 8.2 Migraciones

| **Operación**         | **Comando / procedimiento**                                                                         | **Precondición** | **Resultado esperado** | **Rollback** |
| --------------------- | --------------------------------------------------------------------------------------------------- | ---------------- | ---------------------- | ------------ |
| Consultar estado      | mysql -u root -p -e "USE zonafitevolution; SHOW TABLES;"                                            |                  |                        |              |
| Aplicar migraciones   | No hay migraciones: database\\init.sql es el único script (recrear la base ante cambios de esquema) |                  |                        |              |
| Crear nueva migración | Editar database\\init.sql y recrear la base                                                         |                  |                        |              |
| Revertir migración    | Restaurar respaldo                                                                                  |                  |                        |              |
| Validar esquema       | SHOW TABLES y DESCRIBE \<tabla\>                                                                    |                  |                        |              |

### 8.3 Datos semilla

| **Conjunto**          | **Finalidad**        | **Ambiente permitido** | **Comando**                                                                 | **Contiene datos personales** |
| --------------------- | -------------------- | ---------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| Datos mínimos         | Arranque y catálogos | Todos según control    | init.sql (planes) + node scripts\\crear-admin.js "Nombre" correo contraseña | No                            |
| Datos de demostración | Sustentación         | Local / pruebas        |                                                                             | No                            |
| Datos de prueba       | Automatización       | Pruebas                |                                                                             | No                            |

### 8.4 Integridad y mantenimiento

  - Definir restricciones, índices y relaciones en migraciones reproducibles.

  - No depender únicamente de validaciones del frontend para proteger integridad.

  - Documentar la política de borrado físico, lógico o archivado.

  - Registrar procedimientos de mantenimiento, limpieza y optimización.

  - Verificar que una instalación limpia pueda reconstruir todo el esquema.

<table>
<tbody>
<tr class="odd">
<td><p>Respaldo diario: mysqldump -u root -p zonafitevolution &gt; respaldo_zonafit_AAAAMMDD.sql (guardar fuera del servidor).</p>
<p>No cambiar BIOMETRIA_SALT con huellas registradas.</p>
<p>Depuración de registros_acceso: retención por definir con el propietario.</p></td>
</tr>
</tbody>
</table>

## 9\. Compilación, pruebas y verificación técnica

### 9.1 Comandos principales

| **Actividad**             | **Comando**              | **Ambiente** | **Criterio de éxito**                    |
| ------------------------- | ------------------------ | ------------ | ---------------------------------------- |
| Lint                      | npm run lint (frontend)  | Local / CI   | Sin errores críticos                     |
| Formato                   |                          | Local / CI   | Sin diferencias pendientes               |
| Pruebas unitarias         |                          | Local / CI   | Suite aprobada                           |
| Pruebas de integración    |                          | Pruebas      | Suite aprobada                           |
| Pruebas E2E               |                          | Pruebas      | Flujos críticos aprobados                |
| Cobertura                 |                          | CI           | Meta analizada y sin regresión crítica   |
| Build                     | npm run build (frontend) | Local / CI   | Artefacto generado                       |
| Auditoría de dependencias | npm audit                | CI           | Sin vulnerabilidades críticas sin tratar |

### 9.2 Criterios antes de desplegar

| **Control**                    | **Obligatorio** | **Evidencia**               | **Responsable** | **Estado** |
| ------------------------------ | --------------- | --------------------------- | --------------- | ---------- |
| Build reproducible             | Sí              | npm run build sin errores   |                 |            |
| Pruebas críticas aprobadas     | Sí              |                             |                 |            |
| Migraciones verificadas        | Sí              | No aplica (sin migraciones) |                 |            |
| Secretos fuera del repositorio | Sí              | .gitignore excluye .env     |                 |            |
| Auditoría de dependencias      | Sí              |                             |                 |            |
| Documentación actualizada      | Sí              |                             |                 |            |
| Plan de rollback probado       | Condicionado    |                             |                 |            |

## 10\. Construcción y artefactos de entrega

| **Artefacto**        | **Ruta de generación**        | **Comando**            | **Contenido**                | **Destino**                        |
| -------------------- | ----------------------------- | ---------------------- | ---------------------------- | ---------------------------------- |
| Frontend compilado   | FrontendZonafitevolution/dist | npm run build          | HTML, JS y CSS estáticos     | Hosting del frontend (por definir) |
| Backend empaquetado  | BackendZonafitevolution       | npm install --omit=dev | Código fuente y dependencias | Hosting de la API (por definir)    |
| Imagen de contenedor | No aplica                     |                        |                              |                                    |
| Migraciones          | database/init.sql             |                        | Esquema completo             | Base vacía                         |
| Documentación API    | README (tablas de endpoints)  |                        |                              |                                    |
| Reporte de pruebas   |                               |                        |                              |                                    |

### 10.1 Versionamiento

| **Elemento**         | **Convención**                  | **Ejemplo** | **Responsable** |
| -------------------- | ------------------------------- | ----------- | --------------- |
| Versión de producto  | SemVer o estrategia definida    | 1.0.0       |                 |
| Etiqueta Git         | v\<versión\>                    | v1.0.0      |                 |
| Imagen de contenedor | \<app\>:\<versión\>             | No aplica   |                 |
| Migración            | Secuencia y descripción         | —           |                 |
| Documento            | Versión compatible con producto | 1.0         |                 |

### 10.2 Integridad de artefactos

  - Conservar lockfiles y versiones de runtime.

  - Generar artefactos desde una etiqueta o commit identificable.

  - No modificar artefactos manualmente después de construidos.

  - Registrar hash o digest cuando la criticidad lo justifique.

  - Conservar el vínculo entre versión, pipeline y despliegue.

## 11\. Despliegue por ambiente

### 11.1 Inventario de ambientes

| **Ambiente** | **Propósito**      | **URL / host**                           | **Responsable**                                                                 | **Datos** | **Acceso**          |
| ------------ | ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------- | --------- | ------------------- |
| Desarrollo   | Construcción local | localhost:5173 / localhost:3000          | Juan Diego Mejía Llano, Liliana Sofía Panesso Méndez y Maileth Begambre Movilla | Ficticios | Equipo              |
| Pruebas      |                    |                                          |                                                                                 |           |                     |
| Aceptación   |                    |                                          |                                                                                 |           |                     |
| Producción   | Uso del gimnasio y sustentación | https://zona-fit-evolution03.vercel.app (frontend, Vercel); https://zonafitevolution03-production.up.railway.app (API y MySQL, Railway) | Juan Diego Mejía Llano y Liliana Sofía Panesso Méndez | Reales / demostración | Personal autorizado |

### 11.2 Procedimiento de despliegue

El despliegue de producción se hizo el 11/11/2026. Los cambios posteriores se publican solos al fusionar en `main`: Railway redespliega el backend cuando cambia `BackendZonafitevolution/` y Vercel redespliega el frontend.

**Primera instalación (una sola vez)**

1. **Vercel:** importar el repositorio con Root Directory `FrontendZonafitevolution`, preset Vite, Build Command `npm run build`, Output Directory `dist`, rama `main`. Crear `VITE_API_URL` como variable de tipo **Config** (no Secret, porque las variables `VITE_` quedan en el código del navegador).
2. **Railway:** crear el proyecto desde el repositorio y agregar el servicio **MySQL** (Database → MySQL).
3. **Railway, servicio del backend:** Root Directory `/BackendZonafitevolution`, rama `main`, Watch Paths `/BackendZonafitevolution/**`, Start Command `npm start`, Healthcheck Path `/api/salud`, dominio público generado en el puerto 8080.
4. **Variables del backend (Raw Editor):** `DB_HOST=${{MySQL.MYSQLHOST}}`, `DB_PORT=${{MySQL.MYSQLPORT}}`, `DB_USER=${{MySQL.MYSQLUSER}}`, `DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}`, `DB_NAME=${{MySQL.MYSQLDATABASE}}`, `JWT_SECRET`, `JWT_EXPIRES_IN=8h`, `BIOMETRIA_SALT` (el mismo de siempre), `TZ=America/Bogota`, `ORIGEN_FRONTEND`, `TIPO_LECTOR=remoto`, `AGENTE_TOKEN` y `PANTALLA_TOKEN`. Los tokens se generan con `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
5. **Esquema:** ejecutar las sentencias de `database/init.sql` en el editor de consultas del servicio MySQL (Database → Data), una por una.
6. **Administrador:** en la consola del backend (Console) cargar el entorno del contenedor y ejecutar `npm run crear-admin -- "Nombre" correo contraseña`. La consola no trae el PATH de Node; se carga con `set -a; . <(tr '\0' '\n' < /proc/1/environ | grep -E '^(PATH|DB_[A-Z]+|TZ)=' | sed "s/=/='/; s/\$/'/"); set +a`. Al terminar, borrar el historial con `history -c`.
7. **Vercel:** actualizar `VITE_API_URL` con la URL de la API y redesplegar sin caché.
8. **Agente del lector:** en el portátil, `AgenteLector/.env` con `API_WS_URL=wss://<api>/agente`, el mismo `AGENTE_TOKEN`, `PUERTO_LECTOR` y `BIOMETRIA_SALT`; luego `npm install` en `BackendZonafitevolution` y en `AgenteLector`, y `npm start` en `AgenteLector`.
9. **Pantalla de ingreso:** abrir una vez `https://zona-fit-evolution03.vercel.app/?pantalla=acceso&token=<PANTALLA_TOKEN>` en el navegador que la mostrará.

**Despliegues siguientes**

1. Confirmar que el PR pasó a `main` con las pruebas (`npm test`) en verde.
2. Esperar el despliegue automático de Railway y Vercel.
3. Comprobar `/api/salud` y las pruebas de humo de la sección 11.4.
4. Si un cambio toca `init.sql`, recrear la base desde un respaldo (DT-010): no hay migraciones.
5. Registrar el despliegue en la sección 11.3.

### 11.3 Registro de despliegue

| **Fecha / hora** | **Ambiente** | **Versión** | **Responsable** | **Migraciones** | **Resultado** | **Evidencia** |
| ---------------- | ------------ | ----------- | --------------- | --------------- | ------------- | ------------- |
| 11/11/2026 18:48 | Producción   | main · PR \#60 (despliegue en la nube) | Juan Diego Mejía Llano | init.sql cargado en MySQL de Railway (7 tablas, 2 roles, 8 planes) | Exitoso | /api/salud responde; healthcheck de Railway en verde |
| 11/11/2026 19:05 | Producción   | Vercel con VITE\_API\_URL de Railway | Juan Diego Mejía Llano | — | Exitoso | Login, cliente, membresía, huella e ingreso permitido desde la nube |
|                  |              |             |                 |                 |               |               |

### 11.4 Pruebas de humo posteriores

| **ID** | **Verificación**               | **Resultado esperado**              | **Resultado real** | **Estado** |
| ------ | ------------------------------ | ----------------------------------- | ------------------ | ---------- |
| SMK-01 | GET /api/salud                 | {"estado":"ok","lector":"conectado"} con el agente encendido | {"estado":"ok","lector":"conectado"} | Cumple |
| SMK-02 | Iniciar sesión en Vercel       | Panel del Administrador             | Login correcto con el Admin creado en Railway | Cumple |
| SMK-03 | Registrar cliente y su huella  | Cliente y huella guardados          | 1 cliente y 1 huella en MySQL de Railway | Cumple |
| SMK-04 | Asignar membresía              | Membresía activa                    | 1 membresía activa | Cumple |
| SMK-05 | Validar acceso en la pantalla de ingreso | Ingreso permitido con membresía vigente | Permitido: «Membresía activa y vigente» | Cumple |
| SMK-06 | Consultar historial            | Hora de Colombia en los registros   | Registros con la hora local | Cumple |

## 12\. Reversión y recuperación ante despliegue fallido

<table>
<tbody>
<tr class="odd">
<td><strong>Condición crítica<br />
</strong>No debe ejecutarse un despliegue con cambios incompatibles de datos sin definir previamente cómo se recuperará el servicio. El rollback de código no siempre implica rollback seguro de base de datos.</td>
</tr>
</tbody>
</table>

### 12.1 Criterios para activar rollback

  - El sistema no inicia o pierde disponibilidad.

  - Un flujo crítico queda bloqueado.

  - Se detecta corrupción o pérdida de datos.

  - Aparece una vulnerabilidad crítica introducida por la versión.

  - Las métricas superan umbrales operativos definidos.

  - El responsable de liberación declara No-Go.

### 12.2 Procedimiento de rollback

| **Paso** | **Acción**                             | **Responsable**              | **Comando / procedimiento** | **Verificación** |
| -------- | -------------------------------------- | ---------------------------- | --------------------------- | ---------------- |
| 1        | Detener o aislar la versión defectuosa | Liliana Sofía Panesso Méndez |                             |                  |
| 2        | Restaurar versión anterior             | Liliana Sofía Panesso Méndez |                             |                  |
| 3        | Revertir configuración                 | Liliana Sofía Panesso Méndez |                             |                  |
| 4        | Tratar migraciones o restaurar datos   | Liliana Sofía Panesso Méndez |                             |                  |
| 5        | Ejecutar pruebas de humo               | Liliana Sofía Panesso Méndez |                             |                  |
| 6        | Registrar incidente y notificar        | Liliana Sofía Panesso Méndez |                             |                  |

### 12.3 Registro de reversión

| **Fecha** | **Versión retirada** | **Versión restaurada** | **Motivo** | **Impacto** | **Responsable** | **Resultado** |
| --------- | -------------------- | ---------------------- | ---------- | ----------- | --------------- | ------------- |
|           |                      |                        |            |             |                 |               |
|           |                      |                        |            |             |                 |               |

## 13\. Operación rutinaria

### 13.1 Arranque y detención

| **Operación**         | **Comando / procedimiento**               | **Orden**          | **Verificación** | **Riesgo** |
| --------------------- | ----------------------------------------- | ------------------ | ---------------- | ---------- |
| Iniciar base de datos | Iniciar MySQL (panel de XAMPP o servicio) | 1                  |                  |            |
| Iniciar backend       | npm start en BackendZonafitevolution      | 2                  |                  |            |
| Iniciar frontend      | npm run dev en FrontendZonafitevolution   | 3                  |                  |            |
| Detener servicios     | Ctrl+C en cada consola                    | Inverso o definido |                  |            |
| Reiniciar servicio    | Ctrl+C y volver a iniciar                 |                    |                  |            |

### 13.2 Tareas periódicas

| **Tarea**                       | **Frecuencia**            | **Responsable** | **Procedimiento**                                  | **Evidencia** |
| ------------------------------- | ------------------------- | --------------- | -------------------------------------------------- | ------------- |
| Revisión de logs                | Diaria / según criticidad |                 | Consola del backend (errores 500)                  |               |
| Verificación de respaldos       |                           |                 | Restaurar el último respaldo en una base de prueba |               |
| Revisión de capacidad           |                           |                 |                                                    |               |
| Auditoría de dependencias       |                           |                 | npm audit                                          |               |
| Renovación de certificados      |                           |                 | Lo gestiona el hosting                             |               |
| Revisión de usuarios y permisos |                           |                 | Revisar usuarios en Personal                       |               |
| Mantenimiento de base de datos  |                           |                 | mysqldump diario                                   |               |

### 13.3 Ventanas de mantenimiento

| **Actividad** | **Ventana** | **Duración estimada** | **Impacto** | **Notificación** | **Aprobación** |
| ------------- | ----------- | --------------------- | ----------- | ---------------- | -------------- |
|               |             |                       |             |                  |                |
|               |             |                       |             |                  |                |

## 14\. Logs, monitoreo y observabilidad

### 14.1 Registro de eventos

| **Fuente**    | **Ubicación**                       | **Formato** | **Nivel**         | **Retención** | **Datos prohibidos**                 |
| ------------- | ----------------------------------- | ----------- | ----------------- | ------------- | ------------------------------------ |
| Aplicación    | Consola del backend (console.error) | Texto       | info, warn, error |               | Contraseñas, tokens, datos sensibles |
| Servidor web  |                                     |             |                   |               |                                      |
| Base de datos | Servidor MySQL                      |             |                   |               |                                      |
| Pipeline      | No existe                           |             |                   |               |                                      |
| Auditoría     | Tabla registros\_acceso             | Tabla       |                   |               |                                      |

### 14.2 Métricas y umbrales

| **Métrica**         | **Fuente** | **Umbral normal**              | **Umbral de alerta** | **Acción** |
| ------------------- | ---------- | ------------------------------ | -------------------- | ---------- |
| Disponibilidad      |            |                                |                      |            |
| Tiempo de respuesta |            | \< 2 s en validación (RNF-003) |                      |            |
| Tasa de errores     |            |                                |                      |            |
| CPU                 |            |                                |                      |            |
| Memoria             |            |                                |                      |            |
| Almacenamiento      |            |                                |                      |            |
| Conexiones BD       |            |                                |                      |            |
| Colas / trabajos    |            | No aplica                      |                      |            |

### 14.3 Health checks

| **Endpoint / mecanismo** | **Verifica**        | **Respuesta esperada** | **Frecuencia** | **Consumidor** |
| ------------------------ | ------------------- | ---------------------- | -------------- | -------------- |
| /health (no existe)      | Proceso principal   | 200 / estado healthy   |                |                |
| /ready (no existe)       | Dependencias listas | 200 / ready            |                |                |
| /live (no existe)        | Proceso vivo        | 200 / alive            |                |                |
|                          |                     |                        |                |                |

### 14.4 Alertas

| **Alerta**                   | **Condición** | **Severidad** | **Canal** | **Responsable** | **Tiempo de respuesta** |
| ---------------------------- | ------------- | ------------- | --------- | --------------- | ----------------------- |
| Servicio no disponible       |               | Crítica       |           |                 |                         |
| Errores elevados             |               | Alta          |           |                 |                         |
| Espacio bajo                 |               | Alta          |           |                 |                         |
| Respaldo fallido             |               | Crítica       |           |                 |                         |
| Certificado próximo a vencer |               | Media         |           |                 |                         |

## 15\. Respaldo y recuperación

### 15.1 Política de respaldo

| **Recurso**        | **Tipo**             | **Frecuencia**  | **Retención** | **Ubicación**            | **Cifrado** | **Responsable**              |
| ------------------ | -------------------- | --------------- | ------------- | ------------------------ | ----------- | ---------------------------- |
| Base de datos      | Completo (mysqldump) | Diaria          |               | Almacenamiento externo   |             | Liliana Sofía Panesso Méndez |
| Archivos / objetos | No aplica            |                 |               |                          |             |                              |
| Configuración      | .env (fuera de Git)  | Con cada cambio |               | Gestor seguro del equipo |             | Liliana Sofía Panesso Méndez |
| Artefactos         | Repositorio Git      | Continuo        |               | GitHub                   |             | Juan Diego Mejía Llano       |

### 15.2 Objetivos de recuperación

| **Servicio / dato**     | **RPO objetivo** | **RTO objetivo** | **Justificación** | **Evidencia** |
| ----------------------- | ---------------- | ---------------- | ----------------- | ------------- |
| Base de datos principal |                  |                  |                   |               |
| Archivos                |                  |                  |                   |               |
| Aplicación              |                  |                  |                   |               |

### 15.3 Procedimiento de restauración

26. Confirmar la causa y el alcance de la pérdida o corrupción.

27. Seleccionar el punto de recuperación autorizado.

28. Aislar el ambiente afectado cuando sea necesario.

29. Restaurar datos y configuración en un ambiente controlado.

30. Validar integridad y consistencia.

31. Ejecutar pruebas técnicas y funcionales.

32. Autorizar retorno a operación.

33. Registrar tiempos, responsables y resultados.

<table>
<tbody>
<tr class="odd">
<td><p>mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"</p>
<p>mysql -u root -p zonafitevolution &lt; respaldo_zonafit_AAAAMMDD.sql</p>
<p>Verificar con SHOW TABLES y un inicio de sesión. Las huellas solo siguen siendo válidas si el servidor conserva el mismo BIOMETRIA_SALT.</p></td>
</tr>
</tbody>
</table>

### 15.4 Prueba de restauración

| **Fecha** | **Recurso** | **Respaldo utilizado** | **Tiempo real** | **Resultado** | **Hallazgos** | **Responsable** |
| --------- | ----------- | ---------------------- | --------------- | ------------- | ------------- | --------------- |
|           |             |                        |                 |               |               |                 |
|           |             |                        |                 |               |               |                 |

## 16\. Seguridad operativa

### 16.1 Principios mínimos

  - Aplicar mínimo privilegio a usuarios, servicios y cuentas de base de datos.

  - Separar credenciales por ambiente.

  - Rotar secretos y revocar accesos cuando cambie el equipo.

  - Usar HTTPS y certificados vigentes en ambientes públicos.

  - Mantener dependencias auditadas y actualizadas.

  - Evitar datos personales reales en ambientes de desarrollo y prueba.

  - Registrar acciones sensibles sin exponer información protegida.

  - Revisar permisos de repositorio, nube, base de datos y dominios.

### 16.2 Matriz de accesos técnicos

| **Rol técnico**          | **Repositorio**                      | **Servidor** | **Base de datos** | **Secretos** | **Logs** | **Producción** |
| ------------------------ | ------------------------------------ | ------------ | ----------------- | ------------ | -------- | -------------- |
| Desarrollador            | Lectura / escritura (ramas feature/) |              |                   |              |          |                |
| Líder técnico            | Administración                       |              |                   |              |          |                |
| DevOps / infraestructura |                                      |              |                   |              |          |                |
| Soporte                  |                                      |              |                   |              |          |                |
| Auditor / instructor     | Lectura                              |              |                   |              |          |                |

### 16.3 Gestión de vulnerabilidades

| **Fuente**       | **Frecuencia** | **Severidad crítica** | **Responsable** | **Tratamiento** | **Evidencia** |
| ---------------- | -------------- | --------------------- | --------------- | --------------- | ------------- |
| Dependencias     |                |                       |                 |                 |               |
| Contenedores     |                |                       |                 |                 |               |
| Código           |                |                       |                 |                 |               |
| Infraestructura  |                |                       |                 |                 |               |
| Pruebas manuales |                |                       |                 |                 |               |

### 16.4 Respuesta ante incidente

34. Detectar y clasificar el incidente.

35. Contener el impacto y preservar evidencias.

36. Revocar o rotar credenciales comprometidas.

37. Corregir la causa técnica.

38. Recuperar el servicio y validar integridad.

39. Comunicar a los responsables según severidad.

40. Documentar causa raíz, acciones y prevención.

## 17\. Mantenimiento y evolución

### 17.1 Tipos de mantenimiento

| **Tipo**   | **Propósito**                   | **Ejemplo**                   | **Proceso de aprobación** |
| ---------- | ------------------------------- | ----------------------------- | ------------------------- |
| Correctivo | Resolver defectos               | Corregir error en una regla   |                           |
| Adaptativo | Responder a cambios del entorno | Actualizar versión de runtime |                           |
| Perfectivo | Mejorar calidad o rendimiento   | Reducir tiempo de respuesta   |                           |
| Preventivo | Reducir riesgos futuros         | Actualizar dependencias       |                           |
| Evolutivo  | Agregar capacidades aprobadas   | Nuevo módulo                  |                           |

### 17.2 Flujo de mantenimiento

41. Registrar solicitud, incidente o necesidad.

42. Analizar impacto en requisitos, arquitectura, datos, seguridad y pruebas.

43. Priorizar y aprobar el cambio.

44. Crear rama o unidad de trabajo.

45. Implementar y revisar mediante pull request.

46. Actualizar pruebas y documentación.

47. Ejecutar pipeline y pruebas de regresión.

48. Versionar, desplegar y registrar el cambio.

### 17.3 Calendario técnico

| **Actividad**                 | **Frecuencia** | **Última ejecución** | **Próxima ejecución** | **Responsable** | **Estado** |
| ----------------------------- | -------------- | -------------------- | --------------------- | --------------- | ---------- |
| Actualización de dependencias |                |                      |                       |                 |            |
| Revisión de seguridad         |                |                      |                       |                 |            |
| Prueba de restauración        |                |                      |                       |                 |            |
| Revisión de capacidad         |                |                      |                       |                 |            |
| Renovación de certificados    |                |                      |                       |                 |            |
| Limpieza de datos / logs      |                |                      |                       |                 |            |

### 17.4 Deuda técnica

| **ID** | **Descripción**                                                                        | **Impacto**                                                    | **Riesgo** | **Prioridad** | **Plan**                                                                                       | **Versión objetivo** |
| ------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| DT-01  | No existe tabla de pagos: el registro financiero estima con el precio actual del plan. | Histórico financiero inexacto; no se guarda el método de pago. |            |               | Crear la tabla pagos (TT-005).                                                                 |                      |
| DT-02  | Resuelto: el sensor AS608 está integrado y el simulador se eliminó (PR \#53).          | —                                                              |            |               | —                                                                                              |                      |
| DT-03  | Vencimiento marcado desde el frontend, no con tarea programada.                        | Estado guardado desactualizado.                                |            |               | Tarea programada en el backend (TT-006).                                                       |                      |
| DT-04  | La ruta DELETE /api/clientes/:id sigue en main (contradice RN-001).                    | Contradicción regla–API.                                       |            |               | Integrar TT-002.                                                                               |                      |
| DT-05  | La regla del último administrador solo se valida en el frontend.                       | Se puede saltar llamando la API.                               |            |               | Integrar TT-001.                                                                               |                      |
| DT-06  | Sin límite de intentos de inicio de sesión; CORS abierto.                              | Fuerza bruta y exposición en producción.                       |            |               | Integrar TT-003 y TT-004.                                                                      |                      |
| DT-07  | Token JWT en localStorage sin revocación.                                              | Exposición ante XSS.                                           |            |               | Evaluar cookies httpOnly.                                                                      |                      |
| DT-08  | Sin pruebas automatizadas ni pipeline de integración continua.                         | Regresiones dependen de pruebas manuales.                      |            |               | TT-007 y TT-008.                                                                               |                      |
| DT-09  | Navegación por estado, sin React Router.                                               | Pantallas sin URL propia.                                      |            |               | Incorporar React Router.                                                                       |                      |
| DT-10  | Esquema creado con init.sql, sin migraciones.                                          | Actualizar una base con datos exige scripts manuales.          |            |               | Decisión del equipo: init.sql es el único script; ante un cambio de esquema se recrea la base. |                      |
| DT-11  | Sistema no desplegado; hosting de la API por definir.                                  | Solo funciona en local.                                        |            |               | TT-009.                                                                                        |                      |
| DT-12  | Archivos vacíos cd y npm en la raíz del backend.                                       | Ruido en el repositorio.                                       |            |               | Eliminarlos con un commit chore.                                                               |                      |

## 18\. Diagnóstico y solución de problemas

### 18.1 Procedimiento general

49. Identificar el síntoma, alcance, usuario y momento de inicio.

50. Confirmar versión, ambiente y cambios recientes.

51. Revisar salud de servicios, capacidad y conectividad.

52. Consultar logs usando un identificador de correlación cuando exista.

53. Reproducir el problema en un ambiente controlado.

54. Aplicar una solución documentada o escalar.

55. Verificar la recuperación y registrar la causa.

### 18.2 Catálogo de incidentes frecuentes

| **Código** | **Síntoma**                                                    | **Causa probable**                          | **Diagnóstico**              | **Solución**                                                   | **Escalar cuando**            |
| ---------- | -------------------------------------------------------------- | ------------------------------------------- | ---------------------------- | -------------------------------------------------------------- | ----------------------------- |
| INC-01     | La aplicación no inicia                                        | Puerto 3000 ocupado (EADDRINUSE)            | netstat -ano | findstr :3000 | taskkill /PID \<PID\> /F y volver a iniciar                    | Persiste tras reiniciar       |
| INC-02     | 'mysql' no se reconoce como un comando                         | MySQL no está en el PATH                    | where mysql                  | Usar la ruta completa, p. ej. C:\\xampp\\mysql\\bin\\mysql.exe | —                             |
| INC-03     | Table 'zonafitevolution.clientes' doesn't exist                | Base incompleta o esquema antiguo           | SHOW TABLES                  | Ejecutar database\\init.sql en una base vacía                  | Hay datos que conservar       |
| INC-04     | Error 500: JWT\_SECRET no está configurado                     | Falta la variable en .env                   | Revisar .env                 | Definir JWT\_SECRET y reiniciar                                | —                             |
| INC-05     | Error al registrar huella: BIOMETRIA\_SALT no está configurado | Falta la variable en .env                   | Revisar .env                 | Definirla y no cambiarla después                               | Huellas ya registradas        |
| INC-06     | «No se pudo conectar con el servidor»                          | Backend apagado o VITE\_API\_URL incorrecta | Abrir la URL de la API       | Encender el backend, corregir .env y reiniciar npm run dev     | —                             |
| INC-07     | «Token inválido o expirado»                                    | Sesión de más de 8 horas                    | —                            | Cerrar sesión e ingresar de nuevo                              | —                             |
| INC-08     | «No tienes permisos para realizar esta acción»                 | El rol no tiene acceso                      | Rol del usuario              | Ingresar con un Administrador                                  | —                             |
| INC-09     | «El lector no detectó un dedo nuevo» (código 0x17)             | Huella residual o dedo sin retirar          | —                            | Retirar el dedo, limpiar el lector y repetir                   | Persiste con el lector limpio |
| INC-10     | Tipo de lector no soportado: simulador                         | .env antiguo con TIPO\_LECTOR=simulador     | Revisar .env                 | Cambiar a TIPO\_LECTOR=as608 y definir PUERTO\_LECTOR          | —                             |

### 18.3 Información mínima para escalar

  - Fecha y hora con zona horaria.

  - Ambiente y versión.

  - Usuario o rol afectado, sin exponer datos innecesarios.

  - Pasos para reproducir.

  - Mensaje de error y código.

  - Identificador de correlación o solicitud.

  - Fragmento de log depurado.

  - Cambios recientes.

  - Acciones ya intentadas.

## 19\. Modelo de soporte y escalamiento

| **Nivel**         | **Responsabilidad**         | **Ejemplos**                         | **Tiempo objetivo** | **Escalamiento** |
| ----------------- | --------------------------- | ------------------------------------ | ------------------- | ---------------- |
| Nivel 1           | Recepción y solución básica | Acceso, uso y verificación inicial   |                     |                  |
| Nivel 2           | Análisis técnico            | Logs, configuración y datos          |                     |                  |
| Nivel 3           | Equipo de desarrollo        | Defectos de código y arquitectura    |                     |                  |
| Infraestructura   | Servicios y plataforma      | Red, servidor, dominio, certificados |                     |                  |
| Proveedor externo | Servicio contratado         | Correo, pagos, nube, identidad       |                     |                  |

### 19.1 Contactos técnicos

| **Rol / servicio**               | **Nombre**                   | **Canal** | **Horario** | **Responsabilidad** |
| -------------------------------- | ---------------------------- | --------- | ----------- | ------------------- |
| Líder técnico                    | Liliana Sofía Panesso Méndez |           |             |                     |
| Administrador de infraestructura |                              |           |             |                     |
| Base de datos                    | Liliana Sofía Panesso Méndez |           |             |                     |
| Seguridad                        |                              |           |             |                     |
| Proveedor externo                |                              |           |             |                     |

### 19.2 Severidad de incidentes

| **Severidad** | **Definición**                                          | **Ejemplo**                         | **Respuesta esperada** |
| ------------- | ------------------------------------------------------- | ----------------------------------- | ---------------------- |
| Crítica       | Servicio indisponible o riesgo grave de seguridad/datos | Pérdida de acceso total             |                        |
| Alta          | Flujo crítico afectado sin alternativa razonable        | No se pueden registrar operaciones  |                        |
| Media         | Función degradada con alternativa                       | Reporte temporalmente no disponible |                        |
| Baja          | Impacto menor o cosmético                               | Texto incorrecto                    |                        |

## 20\. Continuidad y recuperación ante desastres

| **Escenario**              | **Impacto** | **Prevención** | **Respuesta** | **Recuperación** |
| -------------------------- | ----------- | -------------- | ------------- | ---------------- |
| Fallo del servidor         |             |                |               |                  |
| Pérdida de base de datos   |             |                |               |                  |
| Compromiso de credenciales |             |                |               |                  |
| Caída de proveedor externo |             |                |               |                  |
| Pérdida del repositorio    |             |                |               |                  |
| Error humano               |             |                |               |                  |

### 20.1 Dependencias críticas

| **Dependencia**         | **Criticidad** | **Alternativa** | **Tiempo tolerable** | **Responsable** |
| ----------------------- | -------------- | --------------- | -------------------- | --------------- |
| Base de datos           | Crítica        |                 |                      |                 |
| Proveedor de identidad  |                |                 |                      |                 |
| Correo / notificaciones |                |                 |                      |                 |
| Almacenamiento          |                |                 |                      |                 |
| Dominio / DNS           |                |                 |                      |                 |

## 21\. Transferencia técnica y entrega

### 21.1 Paquete técnico de entrega

| **Elemento**             | **Formato / ubicación**                                    | **Versión** | **Verificado** | **Observaciones**         |
| ------------------------ | ---------------------------------------------------------- | ----------- | -------------- | ------------------------- |
| Repositorio y etiqueta   | https://github.com/zonafitevolutionSENA/ZonaFitEvolution03 |             |                | Etiqueta v1.0.0 pendiente |
| README                   | README.md (raíz)                                           |             |                |                           |
| Manual técnico           | MAN-01                                                     | 1.0         |                |                           |
| Manual de usuario        | MAN-02                                                     |             |                |                           |
| Migraciones y semillas   | database/init.sql, scripts/crear-admin.js                  |             |                |                           |
| API / OpenAPI            | No existe                                                  |             |                |                           |
| Pipeline                 | No existe                                                  |             |                |                           |
| Pruebas y cobertura      | No existen                                                 |             |                |                           |
| Configuración de ejemplo | BackendZonafitevolution/.env.example                       |             |                |                           |
| Respaldo / restauración  | Sección 10 de este manual                                  |             |                |                           |
| Licencia y atribuciones  | No existe LICENSE                                          |             |                |                           |

### 21.2 Sesión de transferencia

| **Tema**                | **Responsable expositor**    | **Participantes** | **Fecha** | **Evidencia** | **Resultado** |
| ----------------------- | ---------------------------- | ----------------- | --------- | ------------- | ------------- |
| Arquitectura            | Liliana Sofía Panesso Méndez |                   |           |               |               |
| Instalación             | Liliana Sofía Panesso Méndez |                   |           |               |               |
| Despliegue              | Liliana Sofía Panesso Méndez |                   |           |               |               |
| Operación y monitoreo   | Liliana Sofía Panesso Méndez |                   |           |               |               |
| Respaldo y recuperación | Liliana Sofía Panesso Méndez |                   |           |               |               |
| Soporte y mantenimiento | Liliana Sofía Panesso Méndez |                   |           |               |               |

## 22\. Lista de verificación del manual técnico

| **N.°** | **Verificación**                                             | **Cumple**     | **Evidencia** | **Observaciones** |
| ------- | ------------------------------------------------------------ | -------------- | ------------- | ----------------- |
| 1       | El manual corresponde a la versión entregada.                | Sí / No / N.A. |               |                   |
| 2       | Los requisitos de hardware y software están definidos.       | Sí / No / N.A. |               |                   |
| 3       | Las versiones de dependencias son identificables.            | Sí / No / N.A. |               |                   |
| 4       | La estructura del repositorio está explicada.                | Sí / No / N.A. |               |                   |
| 5       | Existe archivo de configuración de ejemplo sin secretos.     | Sí / No / N.A. |               |                   |
| 6       | Las variables de entorno están documentadas.                 | Sí / No / N.A. |               |                   |
| 7       | La instalación puede ejecutarse en un ambiente limpio.       | Sí / No / N.A. |               |                   |
| 8       | Las migraciones crean el esquema completo.                   | Sí / No / N.A. |               |                   |
| 9       | Los datos semilla no contienen información personal real.    | Sí / No / N.A. |               |                   |
| 10      | Los comandos de pruebas, lint y build están documentados.    | Sí / No / N.A. |               |                   |
| 11      | Los artefactos de entrega son reproducibles.                 | Sí / No / N.A. |               |                   |
| 12      | Los ambientes están claramente separados.                    | Sí / No / N.A. |               |                   |
| 13      | El procedimiento de despliegue es verificable.               | Sí / No / N.A. |               |                   |
| 14      | Existe estrategia de rollback cuando aplica.                 | Sí / No / N.A. |               |                   |
| 15      | Los logs no exponen secretos ni datos sensibles.             | Sí / No / N.A. |               |                   |
| 16      | Se definen métricas, health checks y alertas.                | Sí / No / N.A. |               |                   |
| 17      | La política de respaldo incluye frecuencia y retención.      | Sí / No / N.A. |               |                   |
| 18      | La restauración ha sido probada cuando aplica.               | Sí / No / N.A. |               |                   |
| 19      | Los accesos técnicos siguen mínimo privilegio.               | Sí / No / N.A. |               |                   |
| 20      | Existe procedimiento de respuesta a incidentes.              | Sí / No / N.A. |               |                   |
| 21      | Las tareas de mantenimiento tienen responsable y frecuencia. | Sí / No / N.A. |               |                   |
| 22      | El catálogo de problemas frecuentes está diligenciado.       | Sí / No / N.A. |               |                   |
| 23      | Los contactos y niveles de soporte están definidos.          | Sí / No / N.A. |               |                   |
| 24      | El paquete técnico de entrega está completo.                 | Sí / No / N.A. |               |                   |
| 25      | Una persona distinta al equipo pudo seguir el manual.        | Sí / No / N.A. |               |                   |

### 22.1 Criterios de aprobación

| **Criterio**     | **Condición mínima**                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| Reproducibilidad | Otra persona puede instalar y ejecutar el sistema con las instrucciones.     |
| Correspondencia  | Comandos, rutas, variables y versiones coinciden con la entrega.             |
| Seguridad        | No contiene secretos ni prácticas inseguras.                                 |
| Operación        | Incluye arranque, monitoreo, respaldo, recuperación y soporte según aplique. |
| Mantenibilidad   | Permite comprender estructura, configuración y evolución.                    |
| Evidencia        | Los procedimientos importantes fueron probados o cuentan con evidencia.      |

## 23\. Registro de revisión y aprobación

| **Revisor** | **Rol**                | **Aspecto revisado**       | **Resultado** | **Observaciones** | **Fecha** |
| ----------- | ---------------------- | -------------------------- | ------------- | ----------------- | --------- |
|             | Responsable técnico    | Exactitud técnica          |               |                   |           |
|             | Infraestructura        | Despliegue y operación     |               |                   |           |
|             | Calidad                | Pruebas y reproducibilidad |               |                   |           |
|             | Instructor / evaluador | Suficiencia documental     |               |                   |           |

### 23.1 Declaración de conformidad

Se declara que el presente manual corresponde a la versión indicada del producto, que los procedimientos principales han sido revisados y que no se incluyen credenciales reales ni datos sensibles.

| **Nombre** | **Rol** | **Firma / aceptación** | **Fecha** |
| ---------- | ------- | ---------------------- | --------- |
|            |         |                        |           |
|            |         |                        |           |
|            |         |                        |           |

## Anexo A. Plantilla rápida de procedimiento técnico

| **Campo**          | **Contenido** |
| ------------------ | ------------- |
| ID y nombre        |               |
| Objetivo           |               |
| Responsable        |               |
| Precondiciones     |               |
| Riesgos            |               |
| Pasos              |               |
| Comandos           |               |
| Resultado esperado |               |
| Verificación       |               |
| Rollback           |               |
| Evidencia          |               |

## Anexo B. Plantilla de comando

| **Campo**               | **Descripción** |
| ----------------------- | --------------- |
| Comando                 |                 |
| Directorio de ejecución |                 |
| Usuario / permisos      |                 |
| Variables requeridas    |                 |
| Resultado esperado      |                 |
| Errores frecuentes      |                 |
| Alternativa segura      |                 |

## Anexo C. Convenciones

| **Elemento**  | **Convención sugerida** | **Ejemplo** |
| ------------- | ----------------------- | ----------- |
| Componente    | CMP-\#\#                | CMP-01      |
| Ambiente      | AMB-\#\#                | AMB-01      |
| Procedimiento | PRC-\#\#                | PRC-01      |
| Incidente     | INC-\#\#                | INC-01      |
| Alerta        | ALT-\#\#                | ALT-01      |
| Respaldo      | BKP-\#\#                | BKP-01      |
| Despliegue    | DEP-\#\#                | DEP-01      |
| Evidencia     | EV-\#\#\#               | EV-001      |

## Anexo D. Errores frecuentes al elaborar este manual

| **Error**                                 | **Por qué es problemático**             | **Corrección esperada**                      |
| ----------------------------------------- | --------------------------------------- | -------------------------------------------- |
| Copiar comandos no ejecutados             | No demuestra reproducibilidad           | Probarlos en ambiente limpio                 |
| Usar versiones genéricas                  | Produce instalaciones diferentes        | Registrar versiones y lockfiles              |
| Publicar secretos                         | Genera riesgo crítico                   | Usar ejemplos ficticios y gestor de secretos |
| Documentar solo instalación               | Ignora operación y recuperación         | Cubrir todo el ciclo técnico                 |
| Describir arquitectura distinta al código | La documentación pierde confiabilidad   | Actualizar documento o implementación        |
| No documentar rollback                    | Aumenta impacto de fallos               | Definir reversión antes de desplegar         |
| No probar restauración                    | Un respaldo no probado puede ser inútil | Ejecutar y registrar restauración            |
| Usar capturas como única evidencia        | No son ejecutables ni mantenibles       | Incluir comandos, rutas y artefactos         |
