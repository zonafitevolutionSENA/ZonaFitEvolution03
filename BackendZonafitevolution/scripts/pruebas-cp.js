// Ejecuta los casos de prueba CP-001 a CP-022 del Plan de calidad contra una base MySQL de PRUEBAS.
// Levanta la API real (node index.js) con TIPO_LECTOR=remoto y conecta un agente de prueba por WebSocket
// que responde como el AgenteLector, así se recorre el flujo completo sin el sensor físico.
//
// Uso (desde BackendZonafitevolution, con una base vacía creada con database/init.sql):
//   DB_NAME=zonafitevolution_pruebas DB_USER=... DB_PASSWORD=... node scripts/pruebas-cp.js ../docs/pruebas/CIC-01-resultados.md
//
// Por seguridad solo corre si DB_NAME termina en _pruebas: nunca contra la base de producción.
require('dotenv').config();
const { spawn, execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const WebSocket = require('ws');

if (!/_pruebas$/.test(process.env.DB_NAME || '')) {
  console.error('DB_NAME debe terminar en _pruebas (base exclusiva para estas pruebas).');
  process.exit(1);
}

const PUERTO = 3900 + Math.floor(Math.random() * 90);
const BASE = `http://127.0.0.1:${PUERTO}/api`;
const AGENTE_TOKEN = crypto.randomBytes(32).toString('hex');
const ENTORNO = {
  ...process.env,
  PORT: String(PUERTO),
  TIPO_LECTOR: 'remoto',
  AGENTE_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32 ? process.env.JWT_SECRET : crypto.randomBytes(32).toString('hex'),
  BIOMETRIA_SALT: process.env.BIOMETRIA_SALT || 'sal-de-pruebas',
  TZ: 'America/Bogota',
  ORIGEN_FRONTEND: 'http://127.0.0.1:5173',
};
process.env.TZ = 'America/Bogota';

const resultados = [];
const espera = ms => new Promise(r => setTimeout(r, ms));
const hoyISO = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Bogota' });
const sumarDias = (iso, dias) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + dias); return d.toISOString().slice(0, 10); };

async function api(metodo, ruta, { token, cuerpo } = {}) {
  const inicio = performance.now();
  const r = await fetch(BASE + ruta, {
    method: metodo,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
  });
  const texto = await r.text();
  let datos; try { datos = JSON.parse(texto); } catch { datos = texto; }
  return { status: r.status, datos, ms: performance.now() - inicio };
}

async function caso(id, titulo, esperado, fn) {
  try {
    const obtenido = await fn();
    resultados.push({ id, titulo, esperado, obtenido, estado: 'Aprobado' });
    console.log(`✔ ${id} ${titulo}`);
  } catch (error) {
    resultados.push({ id, titulo, esperado, obtenido: error.message, estado: 'Fallido' });
    console.log(`✘ ${id} ${titulo}: ${error.message}`);
  }
}

function exigir(condicion, mensaje) { if (!condicion) throw new Error(mensaje); }
const resumen = r => `${r.status} ${typeof r.datos === 'object' ? JSON.stringify(r.datos.error ? { error: r.datos.error } : r.datos).slice(0, 140) : ''}`;

// ---------- agente de prueba: responde como AgenteLector ----------
const agente = { dedo: null, eliminados: [], ordenes: [] };
function conectarAgente() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${PUERTO}/agente`, { headers: { 'X-Agente-Token': AGENTE_TOKEN } });
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
    ws.on('message', datos => {
      const orden = JSON.parse(datos);
      agente.ordenes.push(orden.tipo);
      const responder = m => ws.send(JSON.stringify({ id: orden.id, ...m }));
      if (orden.tipo === 'registrar') {
        responder({ tipo: 'etapa', etapa: 'primera' });
        responder({ tipo: 'etapa', etapa: 'segunda' });
        responder({ tipo: 'resultado', resultado: agente.dedo });
      } else if (orden.tipo === 'capturar') {
        responder({ tipo: 'resultado', resultado: agente.dedo });
      } else if (orden.tipo === 'eliminar') {
        agente.eliminados.push(orden.datos.template);
        responder({ tipo: 'resultado', resultado: true });
      }
    });
  });
}

// ---------- utilidades del frontend (cálculo de pagos, filtros y permisos) ----------
async function cargarUtilidadesFrontend() {
  const front = path.resolve(__dirname, '../../FrontendZonafitevolution');
  const entrada = path.join(front, '.entrada-pruebas-cp.tmp.js');
  const salida = path.join(os.tmpdir(), `utils-frontend-${process.pid}.mjs`);
  fs.writeFileSync(entrada, ['finanzas', 'filtrosHistorial', 'permisos'].map(m => `export * from "./src/utils/${m}.js";`).join('\n'));
  try {
    execFileSync('npx', ['rolldown', entrada, '--format', 'esm', '--file', salida], { cwd: front, stdio: 'ignore', shell: process.platform === 'win32' });
  } finally {
    fs.rmSync(entrada, { force: true });
  }
  return import('file://' + salida);
}

async function principal() {
  const salidaReporte = process.argv[2];
  const db = require('../src/config/database');
  const usuarioService = require('../src/services/usuario.service');
  const ROLES = require('../src/utils/roles');

  // Datos semilla del ciclo: el primer Administrador se crea como en scripts/crear-admin.js
  const sufijo = Date.now().toString().slice(-6);
  const admin = { nombre: 'Admin Pruebas', correo: `admin${sufijo}@pruebas.local`, contrasena: 'ClaveSegura123' };
  await usuarioService.crearUsuario({ ...admin, rol_id: ROLES.ADMIN });

  const servidor = spawn(process.execPath, ['index.js'], { cwd: path.resolve(__dirname, '..'), env: ENTORNO, stdio: ['ignore', 'pipe', 'pipe'] });
  let bitacora = '';
  servidor.stdout.on('data', d => { bitacora += d; });
  servidor.stderr.on('data', d => { bitacora += d; });
  for (let i = 0; i < 50 && !bitacora.includes('escuchando'); i++) await espera(100);
  exigir(bitacora.includes('escuchando'), 'La API no arrancó: ' + bitacora);
  const ws = await conectarAgente();
  await espera(200);

  const utils = await cargarUtilidadesFrontend();
  let tokenAdmin, tokenEmpleado, cliA, cliB, cliC, plan, planMensual;

  try {
    await caso('CP-016', 'Inicio de sesión válido', '200 con token JWT y rol Administrador', async () => {
      const r = await api('POST', '/auth/login', { cuerpo: { correo: admin.correo, contrasena: admin.contrasena } });
      exigir(r.status === 200 && r.datos.token && r.datos.usuario.rol_id === ROLES.ADMIN, resumen(r));
      tokenAdmin = r.datos.token;
      return `200, token recibido, rol_id ${r.datos.usuario.rol_id}`;
    });
    await caso('CP-017', 'Credenciales inválidas', '401 con mensaje genérico, sin revelar si el correo existe', async () => {
      const r1 = await api('POST', '/auth/login', { cuerpo: { correo: admin.correo, contrasena: 'incorrecta' } });
      const r2 = await api('POST', '/auth/login', { cuerpo: { correo: 'noexiste@pruebas.local', contrasena: 'incorrecta' } });
      exigir(r1.status === 401 && r2.status === 401 && r1.datos.error === r2.datos.error, `${resumen(r1)} / ${resumen(r2)}`);
      return `401 «${r1.datos.error}» en ambos casos`;
    });

    const empleado = { nombre: 'Empleado Pruebas', correo: `empleado${sufijo}@pruebas.local`, contrasena: 'ClaveSegura123', rol_id: ROLES.EMPLEADO };
    const re = await api('POST', '/usuarios', { token: tokenAdmin, cuerpo: empleado });
    exigir(re.status === 201, 'No se pudo crear el empleado: ' + resumen(re));
    tokenEmpleado = (await api('POST', '/auth/login', { cuerpo: { correo: empleado.correo, contrasena: empleado.contrasena } })).datos.token;

    await caso('CP-001', 'Registro de cliente válido', '201 con el cliente creado', async () => {
      const r = await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Cliente A Pruebas', cedula: '10' + sufijo, correo: `a${sufijo}@pruebas.local`, telefono: '3001234567' } });
      exigir(r.status === 201 && r.datos.id, resumen(r));
      cliA = r.datos;
      return `201, cliente id ${r.datos.id}`;
    });
    cliB = (await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Cliente B Pruebas', cedula: '20' + sufijo, correo: `b${sufijo}@pruebas.local`, telefono: '3001234568' } })).datos;
    cliC = (await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Cliente C Pruebas', cedula: '30' + sufijo, correo: `c${sufijo}@pruebas.local`, telefono: '3001234569' } })).datos;

    await caso('CP-002', 'Cédula duplicada', '409 «Ya existe un cliente registrado con esa cédula»', async () => {
      const r = await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Otro', cedula: cliA.cedula, correo: `x${sufijo}@pruebas.local` } });
      exigir(r.status === 409, resumen(r));
      return `409 «${r.datos.error}»`;
    });
    await caso('CP-003', 'Campos inválidos', '400 con el mensaje del campo', async () => {
      const r1 = await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Letras', cedula: '12ab34', correo: `l${sufijo}@pruebas.local` } });
      const r2 = await api('POST', '/clientes', { token: tokenEmpleado, cuerpo: { nombre: 'Sin correo', cedula: '40' + sufijo } });
      exigir(r1.status === 400 && r2.status === 400, `${resumen(r1)} / ${resumen(r2)}`);
      return `400 «${r1.datos.error}»; 400 «${r2.datos.error}»`;
    });

    await caso('CP-004', 'Crear plan', '201 con el plan creado (Administrador)', async () => {
      const r = await api('POST', '/planes', { token: tokenAdmin, cuerpo: { nombre: 'Plan Pruebas ' + sufijo, duracion_dias: 30, precio: 90000 } });
      exigir(r.status === 201 && r.datos.id, resumen(r));
      plan = r.datos;
      return `201, plan id ${r.datos.id}`;
    });
    await caso('CP-006', 'Empleado intenta crear plan', '403 «No tienes permisos…»', async () => {
      const r = await api('POST', '/planes', { token: tokenEmpleado, cuerpo: { nombre: 'Prohibido ' + sufijo, duracion_dias: 30, precio: 1000 } });
      exigir(r.status === 403, resumen(r));
      return `403 «${r.datos.error}»`;
    });

    planMensual = (await api('GET', '/planes', { token: tokenAdmin })).datos.find(p => p.nombre === 'Mensualidad' && p.max_ingresos == null) || plan;
    const hoy = hoyISO();
    const mA = await api('POST', '/membresias', { token: tokenEmpleado, cuerpo: { cliente_id: cliA.id, plan_id: plan.id, fecha_inicio: hoy } });
    exigir(mA.status === 201, 'Membresía del cliente A: ' + resumen(mA));

    await caso('CP-005', 'Eliminar plan con membresías', '409: el plan no se borra y se sugiere desactivarlo', async () => {
      const r = await api('DELETE', `/planes/${plan.id}`, { token: tokenAdmin });
      exigir(r.status === 409, resumen(r));
      return `409 «${r.datos.error}»`;
    });

    await caso('CP-010', 'Registrar huella', '201; el agente recibe la orden «registrar» y se guarda solo el hash', async () => {
      agente.dedo = 'hash-dedo-a-' + sufijo;
      const r = await api('POST', '/biometria/registrar', { token: tokenEmpleado, cuerpo: { cliente_id: cliA.id, captura_id: crypto.randomUUID() } });
      exigir(r.status === 201 && agente.ordenes.includes('registrar'), resumen(r));
      const [filas] = await db.query('SELECT template_hash FROM plantillas_biometricas WHERE cliente_id = ?', [cliA.id]);
      exigir(filas.length === 1, 'No quedó la plantilla en la base');
      exigir(JSON.stringify(r.datos).indexOf(filas[0].template_hash) === -1, 'La respuesta expone el hash');
      return '201; plantilla guardada; la respuesta no expone el hash';
    });
    await caso('CP-011', 'Huella ya registrada para otro cliente', '409 «Esta huella ya está registrada para otro cliente»', async () => {
      const r = await api('POST', '/biometria/registrar', { token: tokenEmpleado, cuerpo: { cliente_id: cliB.id, captura_id: crypto.randomUUID() } });
      exigir(r.status === 409, resumen(r));
      return `409 «${r.datos.error}»`;
    });

    await caso('CP-007', 'Acceso con membresía activa', 'Permitido «Membresía activa y vigente» y queda en el historial', async () => {
      agente.dedo = 'hash-dedo-a-' + sufijo;
      const r = await api('POST', '/acceso-fisico/validar', { token: tokenEmpleado });
      exigir(r.status === 200 && r.datos.permitido === true, resumen(r));
      return `200 permitido «${r.datos.motivo}»`;
    });

    // Cliente C: huella y membresía activa con fecha de fin de ayer (precondición del CP-008)
    agente.dedo = 'hash-dedo-c-' + sufijo;
    await api('POST', '/biometria/registrar', { token: tokenEmpleado, cuerpo: { cliente_id: cliC.id, captura_id: crypto.randomUUID() } });
    const mC = await api('POST', '/membresias', { token: tokenEmpleado, cuerpo: { cliente_id: cliC.id, plan_id: planMensual.id, fecha_inicio: hoy } });
    await db.query('UPDATE membresias SET fecha_inicio = ?, fecha_fin = ? WHERE id = ?', [sumarDias(hoy, -31), sumarDias(hoy, -1), mC.datos.id]);

    await caso('CP-008', 'Acceso con membresía vencida', 'Denegado «Membresía vencida» y queda en el historial', async () => {
      agente.dedo = 'hash-dedo-c-' + sufijo;
      const r = await api('POST', '/acceso-fisico/validar', { token: tokenEmpleado });
      exigir(r.status === 200 && r.datos.permitido === false && /vencida/i.test(r.datos.motivo), resumen(r));
      return `200 denegado «${r.datos.motivo}»`;
    });
    await caso('CP-009', 'Huella no reconocida', '404 «Huella no reconocida» y el intento queda registrado sin cliente', async () => {
      agente.dedo = null;
      const r = await api('POST', '/acceso-fisico/validar', { token: tokenEmpleado });
      exigir(r.status === 404, resumen(r));
      const [filas] = await db.query('SELECT * FROM registros_acceso WHERE cliente_id IS NULL ORDER BY id DESC LIMIT 1');
      exigir(filas.length === 1 && filas[0].resultado === 'denegado', 'No quedó el intento en registros_acceso');
      return `404 «${r.datos.error}»; intento registrado como denegado`;
    });

    await caso('CP-019', 'Filtrar historial', 'El historial devuelve los intentos y el filtro «Denegado» deja solo los denegados', async () => {
      const r = await api('GET', '/acceso-fisico/historial', { token: tokenEmpleado });
      exigir(r.status === 200 && r.datos.length >= 3, resumen(r));
      // Mismas filas que arma accesoService.js en el frontend antes de filtrar
      const filas = r.datos.map(a => ({ id: a.id, cliente: a.nombre_cliente || 'Huella no reconocida', fechaHora: new Date(a.fecha_hora), permitido: a.resultado === 'permitido', motivo: a.motivo }));
      const denegados = utils.filtrarHistorial(filas, { resultado: 'denegado', texto: '', desde: hoyISO(), hasta: hoyISO() });
      exigir(denegados.length >= 2 && denegados.every(f => !f.permitido), 'Filtro incorrecto');
      return `${r.datos.length} registros; ${denegados.length} tras filtrar por «denegado»`;
    });

    await caso('CP-012', 'Renovar vigente', '201: la nueva membresía queda pendiente y empieza el día siguiente al fin de la actual', async () => {
      const actual = (await api('GET', `/membresias/buscar/${cliA.cedula}`, { token: tokenEmpleado })).datos;
      const r = await api('POST', '/membresias/renovar', { token: tokenEmpleado, cuerpo: { cedula: cliA.cedula, plan_id: plan.id } });
      exigir(r.status === 201 && r.datos.estado === 'pendiente', resumen(r));
      const finActual = String(actual.fecha_fin).slice(0, 10);
      const inicioNueva = String(r.datos.fecha_inicio).slice(0, 10);
      exigir(inicioNueva === sumarDias(finActual, 1), `inicio ${inicioNueva}, fin anterior ${finActual}`);
      return `201 pendiente, inicia ${inicioNueva} (fin anterior ${finActual}); no se pierden días`;
    });
    await caso('CP-013', 'Renovar vencida', '201: la nueva membresía queda activa desde hoy', async () => {
      const r = await api('POST', '/membresias/renovar', { token: tokenEmpleado, cuerpo: { cedula: cliC.cedula, plan_id: planMensual.id } });
      exigir(r.status === 201 && r.datos.estado === 'activa' && String(r.datos.fecha_inicio).slice(0, 10) === hoyISO(), resumen(r));
      return `201 activa desde ${String(r.datos.fecha_inicio).slice(0, 10)}`;
    });

    await caso('CP-014', 'Resumen de pagos', 'El total por cliente es la suma de los precios actuales de sus planes', async () => {
      const membresias = (await api('GET', '/membresias', { token: tokenAdmin })).datos;
      const planes = (await api('GET', '/planes', { token: tokenAdmin })).datos;
      const clientes = (await api('GET', '/clientes', { token: tokenAdmin })).datos;
      const resumenes = utils.resumirPorCliente(clientes, utils.construirPagos(membresias, planes));
      const deA = resumenes.find(x => x.cliente.id === cliA.id || x.id === cliA.id);
      exigir(deA, 'Sin resumen del cliente A');
      const total = deA.total ?? deA.totalPagado;
      exigir(Number(total) === 2 * Number(plan.precio), `total ${total}, esperado ${2 * Number(plan.precio)}`);
      return `Cliente A: ${deA.pagos?.length ?? deA.cantidad ?? 2} pagos, total ${total}`;
    });
    await caso('CP-015', 'Empleado sin registro financiero', 'El menú del Empleado no incluye «Registro financiero»', async () => {
      exigir(utils.seccionPermitida(ROLES.EMPLEADO, 'finanzas') === false && utils.seccionPermitida(ROLES.ADMIN, 'finanzas') === true, 'Permisos incorrectos');
      return 'seccionPermitida(Empleado, finanzas) = false; Administrador = true';
    });

    await caso('CP-020', 'Petición sin token', '401 en rutas protegidas', async () => {
      const r = await api('GET', '/clientes');
      exigir(r.status === 401, resumen(r));
      return `401 «${r.datos.error}»`;
    });
    await caso('CP-021', 'Empleado en ruta de Administrador', '403 en /api/usuarios', async () => {
      const r = await api('GET', '/usuarios', { token: tokenEmpleado });
      exigir(r.status === 403, resumen(r));
      return `403 «${r.datos.error}»`;
    });

    await caso('CP-018', 'Eliminar último administrador', '409: nunca queda el sistema sin Administrador ni se borra la propia cuenta', async () => {
      const adminId = (await api('GET', '/usuarios', { token: tokenAdmin })).datos.find(u => u.correo === admin.correo).id;
      const r1 = await api('DELETE', `/usuarios/${adminId}`, { token: tokenAdmin });
      exigir(r1.status === 409, 'Propia cuenta: ' + resumen(r1));
      const admin2 = { nombre: 'Admin Dos', correo: `admin2${sufijo}@pruebas.local`, contrasena: 'ClaveSegura123', rol_id: ROLES.ADMIN };
      await api('POST', '/usuarios', { token: tokenAdmin, cuerpo: admin2 });
      const token2 = (await api('POST', '/auth/login', { cuerpo: { correo: admin2.correo, contrasena: admin2.contrasena } })).datos.token;
      const r2 = await api('DELETE', `/usuarios/${adminId}`, { token: token2 });
      exigir(r2.status === 200, 'Borrar al otro admin: ' + resumen(r2));
      const admin2Id = (await api('GET', '/usuarios', { token: token2 })).datos.find(u => u.correo === admin2.correo).id;
      const r3 = await api('DELETE', `/usuarios/${admin2Id}`, { token: token2 });
      exigir(r3.status === 409, 'Último admin: ' + resumen(r3));
      tokenAdmin = token2;
      return `409 «${r1.datos.error}»; con dos admins se borra uno (200); el último no se puede borrar (409 «${r3.datos.error}»)`;
    });

    await caso('CP-022', 'Eliminar huella', '200; se borra del sensor (orden «eliminar») y de la base', async () => {
      const r = await api('DELETE', `/biometria/${cliC.id}`, { token: tokenAdmin });
      exigir(r.status === 200 && agente.eliminados.includes('hash-dedo-c-' + sufijo), resumen(r));
      const [filas] = await db.query('SELECT id FROM plantillas_biometricas WHERE cliente_id = ?', [cliC.id]);
      exigir(filas.length === 0, 'La plantilla sigue en la base');
      return '200; orden «eliminar» recibida por el agente; plantilla borrada de la base';
    });

    await caso('RN-001', 'Los clientes no se eliminan', '404: la ruta DELETE /api/clientes/:id ya no existe', async () => {
      const r = await api('DELETE', `/clientes/${cliB.id}`, { token: tokenAdmin });
      exigir(r.status === 404, resumen(r));
      return `404 «${r.datos.error}»`;
    });

    // RNF-003: tiempo de procesamiento de la validación en el servidor (sin el tiempo de poner el dedo)
    agente.dedo = 'hash-dedo-a-' + sufijo;
    const tiempos = [];
    for (let i = 0; i < 50; i++) tiempos.push((await api('POST', '/acceso-fisico/validar', { token: tokenEmpleado })).ms);
    tiempos.sort((a, b) => a - b);
    const p95 = tiempos[Math.ceil(0.95 * tiempos.length) - 1];
    await caso('RNF-003', 'Tiempo de validación (servidor)', 'p95 < 2000 ms en 50 validaciones', async () => {
      exigir(p95 < 2000, `p95 ${p95.toFixed(1)} ms`);
      return `p95 ${p95.toFixed(1)} ms; mediana ${tiempos[24].toFixed(1)} ms; máximo ${tiempos[49].toFixed(1)} ms`;
    });
  } finally {
    ws.close();
    servidor.kill();
  }

  const aprobados = resultados.filter(r => r.estado === 'Aprobado').length;
  const [[{ version: mysqlVersion }]] = await db.query('SELECT VERSION() AS version');
  const lineas = [
    '# Ciclo de pruebas CIC-01 · Resultados',
    '',
    `> Generado con \`node scripts/pruebas-cp.js\` el ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'short', timeStyle: 'short' })} (hora de Colombia).`,
    `> Ambiente: API real (Node ${process.version}, Express 5) sobre una base MySQL de pruebas creada con \`database/init.sql\` (MySQL ${mysqlVersion.split('-')[0]}; en producción, MySQL 8.4 en Railway).`,
    '> El sensor AS608 se reemplaza por un agente de prueba que habla el mismo protocolo WebSocket que AgenteLector; las pruebas con el sensor físico están en el Plan de calidad (CP-010, CP-011 y CP-022, 10/11/2026).',
    '',
    `**Resultado: ${aprobados} de ${resultados.length} casos aprobados.**`,
    '',
    '| ID | Caso | Resultado esperado | Resultado obtenido | Estado |',
    '| --- | --- | --- | --- | --- |',
    ...resultados.map(r => `| ${r.id} | ${r.titulo} | ${r.esperado} | ${String(r.obtenido).replace(/\|/g, '\\|')} | ${r.estado} |`),
    '',
  ];
  if (salidaReporte) fs.writeFileSync(path.resolve(salidaReporte), lineas.join('\n'));
  await db.end();
  console.log(`\n${aprobados}/${resultados.length} aprobados`);
  process.exit(aprobados === resultados.length ? 0 : 1);
}

principal().catch(error => { console.error(error); process.exit(1); });
