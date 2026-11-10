const { test } = require('node:test');
const assert = require('node:assert/strict');
const pool = require('../src/config/database');
const clientes = require('../src/repositories/cliente.repository');

test('los clientes muestran solo si tienen huella, sin exponer la plantilla', async (prueba) => {
  prueba.mock.method(pool, 'query', async (sql, valores) => {
    assert.match(sql, /EXISTS\(SELECT 1 FROM plantillas_biometricas/);
    assert.doesNotMatch(sql, /template_hash/);
    if (valores) assert.deepEqual(valores, [7]);
    return [[{ id: 7, nombre: 'Cliente Prueba', cedula: '123456', tiene_huella: 1 }]];
  });
  const lista = await clientes.obtenerTodos();
  const cliente = await clientes.obtenerPorId(7);
  assert.equal(lista[0].tiene_huella, true);
  assert.equal(cliente.tiene_huella, true);
  assert.equal(Object.hasOwn(cliente, 'template_hash'), false);
});

test('un cliente sin huella se identifica como registro incompleto', async (prueba) => {
  prueba.mock.method(pool, 'query', async () => [[{ id: 8, nombre: 'Cliente Prueba', tiene_huella: 0 }]]);
  const lista = await clientes.obtenerTodos();
  assert.equal(lista[0].tiene_huella, false);
});