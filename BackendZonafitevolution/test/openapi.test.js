// El contrato OpenAPI (openapi.yaml) debe coincidir con las rutas reales de Express:
// cada ruta del código está documentada y el contrato no tiene rutas que ya no existen.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const raiz = path.join(__dirname, '..');
const contrato = YAML.parse(fs.readFileSync(path.join(raiz, 'openapi.yaml'), 'utf8'));
const METODOS = ['get', 'post', 'put', 'patch', 'delete'];

function rutasDelContrato() {
  const rutas = new Set();
  for (const [ruta, operaciones] of Object.entries(contrato.paths)) {
    for (const metodo of METODOS) {
      if (operaciones[metodo]) rutas.add(`${metodo.toUpperCase()} ${ruta}`);
    }
  }
  return rutas;
}

function rutasDeExpress() {
  const rutas = new Set();
  const indice = fs.readFileSync(path.join(raiz, 'src/routes/index.js'), 'utf8');

  // router.use('/clientes', clienteRoutes) + const clienteRoutes = require('./cliente.routes')
  for (const [, prefijo, variable] of indice.matchAll(/router\.use\('([^']+)',\s*(\w+)\)/g)) {
    const archivo = indice.match(new RegExp(`const ${variable} = require\\('\\./([^']+)'\\)`))[1];
    const router = require(path.join(raiz, 'src/routes', archivo));
    for (const capa of router.stack) {
      if (!capa.route) continue;
      const ruta = (prefijo + (capa.route.path === '/' ? '' : capa.route.path)).replace(/:(\w+)/g, '{$1}');
      for (const metodo of Object.keys(capa.route.methods)) rutas.add(`${metodo.toUpperCase()} ${ruta}`);
    }
  }
  // Rutas definidas directamente en index.js
  for (const [, metodo, ruta] of indice.matchAll(/router\.(get|post|put|patch|delete)\('([^']+)'/g)) {
    rutas.add(`${metodo.toUpperCase()} ${ruta}`);
  }
  return rutas;
}

describe('contrato OpenAPI', () => {
  test('es OpenAPI 3 y tiene la versión de la entrega', () => {
    assert.match(contrato.openapi, /^3\./);
    assert.equal(contrato.info.version, require('../package.json').version);
  });

  test('cada ruta de Express está documentada y no sobra ninguna', () => {
    const codigo = rutasDeExpress();
    const documentadas = rutasDelContrato();
    const sinDocumentar = [...codigo].filter(r => !documentadas.has(r));
    const sobrantes = [...documentadas].filter(r => !codigo.has(r));
    assert.ok(codigo.size > 30, `se esperaban más de 30 rutas, hay ${codigo.size}`);
    assert.deepEqual(sinDocumentar, [], 'rutas sin documentar');
    assert.deepEqual(sobrantes, [], 'rutas del contrato que no existen');
  });

  test('las rutas protegidas declaran 401 y las públicas no piden token', () => {
    const publicas = new Set(['GET /salud', 'POST /auth/login', 'POST /acceso-fisico/pantalla/validar']);
    for (const [ruta, operaciones] of Object.entries(contrato.paths)) {
      for (const metodo of METODOS) {
        const op = operaciones[metodo];
        if (!op) continue;
        const clave = `${metodo.toUpperCase()} ${ruta}`;
        if (publicas.has(clave)) {
          assert.ok(op.security && !op.security.some(s => s.bearerAuth), `${clave} no debería pedir JWT`);
        } else {
          assert.equal(op.security, undefined, `${clave} debe usar la seguridad global (bearerAuth)`);
          assert.ok(op.responses['401'], `${clave} debe documentar 401`);
        }
      }
    }
  });

  test('Swagger UI se sirve en /api/docs y el JSON en /api/openapi.json', async () => {
    const app = require('../src/app');
    const servidor = app.listen(0);
    try {
      const base = `http://127.0.0.1:${servidor.address().port}/api`;
      const docs = await fetch(`${base}/docs/`);
      assert.equal(docs.status, 200);
      assert.match(await docs.text(), /swagger-ui/i);
      const json = await fetch(`${base}/openapi.json`).then(r => r.json());
      assert.equal(json.info.title, contrato.info.title);
    } finally {
      servidor.close();
    }
  });
});
