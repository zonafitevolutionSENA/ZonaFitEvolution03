const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'secreto-de-prueba-con-mas-de-32-caracteres';
const app = require('../src/app');
const usuarioRepository = require('../src/repositories/usuario.repository');
const ROLES = require('../src/utils/roles');

const token = (id, rol_id) => 'Bearer ' + jwt.sign({ id, rol_id }, process.env.JWT_SECRET);

test('reglas de seguridad de la API', async (contexto) => {
  const servidor = app.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  contexto.after(() => new Promise(resolve => servidor.close(resolve)));
  const base = `http://127.0.0.1:${servidor.address().port}/api`;

  await contexto.test('CP-020: sin token responde 401', async () => {
    assert.equal((await fetch(`${base}/clientes`)).status, 401);
  });

  await contexto.test('CP-021: un Empleado no entra a rutas de Administrador', async () => {
    const respuesta = await fetch(`${base}/usuarios`, { headers: { Authorization: token(2, ROLES.EMPLEADO) } });
    assert.equal(respuesta.status, 403);
  });

  await contexto.test('CP-018: no se elimina el último administrador', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => ({ id: 5, rol_id: ROLES.ADMIN }));
    prueba.mock.method(usuarioRepository, 'contarPorRol', async () => 1);
    const borrar = prueba.mock.method(usuarioRepository, 'eliminar', async () => true);
    const respuesta = await fetch(`${base}/usuarios/5`, { method: 'DELETE', headers: { Authorization: token(1, ROLES.ADMIN) } });
    assert.equal(respuesta.status, 409);
    assert.deepEqual(await respuesta.json(), { error: 'No se puede eliminar el último administrador' });
    assert.equal(borrar.mock.callCount(), 0);
  });

  await contexto.test('no se puede eliminar la propia cuenta', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => ({ id: 1, rol_id: ROLES.ADMIN }));
    prueba.mock.method(usuarioRepository, 'contarPorRol', async () => 3);
    const borrar = prueba.mock.method(usuarioRepository, 'eliminar', async () => true);
    const respuesta = await fetch(`${base}/usuarios/1`, { method: 'DELETE', headers: { Authorization: token(1, ROLES.ADMIN) } });
    assert.equal(respuesta.status, 409);
    assert.equal(borrar.mock.callCount(), 0);
  });

  await contexto.test('sí se elimina un administrador cuando quedan otros', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => ({ id: 5, rol_id: ROLES.ADMIN }));
    prueba.mock.method(usuarioRepository, 'contarPorRol', async () => 2);
    const borrar = prueba.mock.method(usuarioRepository, 'eliminar', async () => true);
    const respuesta = await fetch(`${base}/usuarios/5`, { method: 'DELETE', headers: { Authorization: token(1, ROLES.ADMIN) } });
    assert.equal(respuesta.status, 200);
    assert.equal(borrar.mock.callCount(), 1);
  });

  await contexto.test('RN-001: ya no existe la ruta para borrar clientes', async () => {
    const respuesta = await fetch(`${base}/clientes/1`, { method: 'DELETE', headers: { Authorization: token(1, ROLES.ADMIN) } });
    assert.equal(respuesta.status, 404);
  });
});
