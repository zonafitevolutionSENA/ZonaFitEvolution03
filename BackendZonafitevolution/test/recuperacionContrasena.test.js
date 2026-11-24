const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'secreto-de-prueba-con-mas-de-32-caracteres';
const app = require('../src/app');
const recuperacionService = require('../src/services/recuperacion.service');
const correoService = require('../src/services/correo.service');
const usuarioRepository = require('../src/repositories/usuario.repository');
const recuperacionRepository = require('../src/repositories/recuperacion.repository');
const ROLES = require('../src/utils/roles');

const USUARIO = { id: 9, nombre: 'Ana', correo: 'ana@zonafit.com', rol_id: ROLES.EMPLEADO, contrasena: bcrypt.hashSync('ClaveVieja123', 4) };

function prepararCorreo(prueba) {
  prueba.mock.method(correoService, 'estaConfigurado', () => true);
  return {
    codigo: prueba.mock.method(correoService, 'enviarCodigoRecuperacion', async () => {}),
    aviso: prueba.mock.method(correoService, 'enviarAvisoCambio', async () => {})
  };
}

const tokenRestablecer = (datos = {}) => jwt.sign(
  { proposito: recuperacionService.PROPOSITO, id: USUARIO.id, rid: 77, ...datos },
  process.env.JWT_SECRET,
  { expiresIn: '10m' }
);

test('paso 1: solicitar código', async (contexto) => {
  await contexto.test('a un correo registrado le envía un código de 6 dígitos y guarda solo su hash', async (prueba) => {
    const correo = prepararCorreo(prueba);
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => USUARIO);
    const crear = prueba.mock.method(recuperacionRepository, 'crear', async () => {});
    const respuesta = await recuperacionService.solicitarCodigo({ correo: '  ANA@zonafit.com ' });
    assert.match(respuesta.mensaje, /Si el correo está registrado/);
    const { codigo } = correo.codigo.mock.calls[0].arguments[0];
    assert.match(codigo, /^\d{6}$/);
    const guardado = crear.mock.calls[0].arguments[0];
    assert.equal(guardado.minutos, 10);
    assert.notEqual(guardado.codigo_hash, codigo);
    assert.ok(await bcrypt.compare(codigo, guardado.codigo_hash));
  });

  await contexto.test('a un correo inexistente le responde lo mismo y no envía nada', async (prueba) => {
    const correo = prepararCorreo(prueba);
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => null);
    const crear = prueba.mock.method(recuperacionRepository, 'crear', async () => {});
    const respuesta = await recuperacionService.solicitarCodigo({ correo: 'nadie@zonafit.com' });
    assert.match(respuesta.mensaje, /Si el correo está registrado/);
    assert.equal(crear.mock.callCount(), 0);
    assert.equal(correo.codigo.mock.callCount(), 0);
  });

  await contexto.test('sin Gmail configurado responde 503', async (prueba) => {
    prueba.mock.method(correoService, 'estaConfigurado', () => false);
    await assert.rejects(recuperacionService.solicitarCodigo({ correo: 'ana@zonafit.com' }), { status: 503 });
  });

  await contexto.test('rechaza un correo con formato inválido', async () => {
    await assert.rejects(recuperacionService.solicitarCodigo({ correo: 'no-es-correo' }), { status: 400 });
  });
});

test('paso 2: verificar código', async (contexto) => {
  const hash = await bcrypt.hash('123456', 4);

  await contexto.test('un código correcto entrega un token que solo sirve para restablecer', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => USUARIO);
    prueba.mock.method(recuperacionRepository, 'obtenerVigente', async () => ({ id: 77, codigo_hash: hash, intentos: 0 }));
    prueba.mock.method(recuperacionRepository, 'reservarIntento', async () => true);
    const { tokenRestablecer: token } = await recuperacionService.verificarCodigo({ correo: 'ana@zonafit.com', codigo: '123456' });
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    assert.equal(datos.proposito, recuperacionService.PROPOSITO);
    assert.equal(datos.id, USUARIO.id);
    assert.equal(datos.rid, 77);
    assert.ok(datos.exp - datos.iat <= 600);
  });

  await contexto.test('un código incorrecto informa los intentos restantes', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => USUARIO);
    prueba.mock.method(recuperacionRepository, 'obtenerVigente', async () => ({ id: 77, codigo_hash: hash, intentos: 2 }));
    prueba.mock.method(recuperacionRepository, 'reservarIntento', async () => true);
    await assert.rejects(
      recuperacionService.verificarCodigo({ correo: 'ana@zonafit.com', codigo: '000000' }),
      { status: 400, message: 'Código incorrecto. Te quedan 2 intentos.' }
    );
  });

  await contexto.test('sin intentos disponibles no compara el código', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => USUARIO);
    prueba.mock.method(recuperacionRepository, 'obtenerVigente', async () => ({ id: 77, codigo_hash: hash, intentos: 5 }));
    prueba.mock.method(recuperacionRepository, 'reservarIntento', async () => false);
    await assert.rejects(
      recuperacionService.verificarCodigo({ correo: 'ana@zonafit.com', codigo: '123456' }),
      { status: 400, message: /no es válido o ya venció/ }
    );
  });

  await contexto.test('sin código vigente (vencido, usado o correo inexistente) responde igual', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorCorreo', async () => null);
    await assert.rejects(
      recuperacionService.verificarCodigo({ correo: 'nadie@zonafit.com', codigo: '123456' }),
      { status: 400, message: /no es válido o ya venció/ }
    );
  });

  await contexto.test('exige exactamente 6 dígitos', async () => {
    await assert.rejects(recuperacionService.verificarCodigo({ correo: 'ana@zonafit.com', codigo: '12a456' }), { status: 400 });
  });
});

test('paso 3: restablecer contraseña', async (contexto) => {
  await contexto.test('guarda la nueva contraseña cifrada, gasta el código y envía el aviso', async (prueba) => {
    const correo = prepararCorreo(prueba);
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => USUARIO);
    const restablecer = prueba.mock.method(recuperacionRepository, 'restablecer', async () => true);
    const respuesta = await recuperacionService.restablecerContrasena({ tokenRestablecer: tokenRestablecer(), contrasena: 'ClaveNueva456' });
    assert.match(respuesta.mensaje, /Contraseña actualizada/);
    const datos = restablecer.mock.calls[0].arguments[0];
    assert.equal(datos.id, 77);
    assert.equal(datos.usuario_id, USUARIO.id);
    assert.ok(await bcrypt.compare('ClaveNueva456', datos.contrasena));
    assert.equal(correo.aviso.mock.callCount(), 1);
  });

  await contexto.test('aplica las reglas de contraseña', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => USUARIO);
    await assert.rejects(
      recuperacionService.restablecerContrasena({ tokenRestablecer: tokenRestablecer(), contrasena: '12345678' }),
      { status: 400, message: 'La contraseña debe combinar letras y números' }
    );
  });

  await contexto.test('no acepta la misma contraseña anterior', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => USUARIO);
    await assert.rejects(
      recuperacionService.restablecerContrasena({ tokenRestablecer: tokenRestablecer(), contrasena: 'ClaveVieja123' }),
      { status: 400, message: /distinta de la anterior/ }
    );
  });

  await contexto.test('un token de sesión normal no sirve para restablecer', async () => {
    const tokenSesion = jwt.sign({ id: USUARIO.id, rol_id: USUARIO.rol_id }, process.env.JWT_SECRET);
    await assert.rejects(
      recuperacionService.restablecerContrasena({ tokenRestablecer: tokenSesion, contrasena: 'ClaveNueva456' }),
      { status: 400 }
    );
  });

  await contexto.test('un código ya usado no se puede volver a usar', async (prueba) => {
    prepararCorreo(prueba);
    prueba.mock.method(usuarioRepository, 'obtenerPorId', async () => USUARIO);
    prueba.mock.method(recuperacionRepository, 'restablecer', async () => false);
    await assert.rejects(
      recuperacionService.restablecerContrasena({ tokenRestablecer: tokenRestablecer(), contrasena: 'ClaveNueva456' }),
      { status: 400, message: /ya se usó/ }
    );
  });
});

test('cierre de sesiones al cambiar la contraseña', async (contexto) => {
  const servidor = app.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  contexto.after(() => new Promise(resolve => servidor.close(resolve)));
  const url = `http://127.0.0.1:${servidor.address().port}/api/usuarios`;
  const pedir = token => fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const ahora = Math.floor(Date.now() / 1000);
  const tokenAdmin = (iat) => jwt.sign({ id: 1, rol_id: ROLES.ADMIN, iat }, process.env.JWT_SECRET);

  await contexto.test('una sesión iniciada después del cambio sigue funcionando', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerTodos', async () => []);
    prueba.mock.method(usuarioRepository, 'obtenerSesion', async () => ({ id: 1, contrasena_cambiada_en: new Date((ahora - 60) * 1000) }));
    assert.equal((await pedir(tokenAdmin(ahora))).status, 200);
  });

  await contexto.test('una sesión iniciada antes del cambio queda cerrada', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerSesion', async () => ({ id: 1, contrasena_cambiada_en: new Date(ahora * 1000) }));
    assert.equal((await pedir(tokenAdmin(ahora - 60))).status, 401);
  });

  await contexto.test('la sesión de un usuario eliminado queda cerrada', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerSesion', async () => null);
    assert.equal((await pedir(tokenAdmin(ahora))).status, 401);
  });

  await contexto.test('el token temporal de restablecer no sirve para entrar', async (prueba) => {
    prueba.mock.method(usuarioRepository, 'obtenerSesion', async () => ({ id: USUARIO.id, contrasena_cambiada_en: null }));
    assert.equal((await pedir(tokenRestablecer())).status, 401);
  });
});
