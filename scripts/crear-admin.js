// Uso: node scripts/crear-admin.js "Nombre" correo@ejemplo.com contrasena
// Crea el primer usuario Admin (el resto se crea desde la API con un token de Admin).
require('dotenv').config();
const usuarioService = require('../src/services/usuario.service');
const ROLES = require('../src/utils/roles');

async function crearAdmin() {
  const [nombre, correo, contrasena] = process.argv.slice(2);
  try {
    const usuario = await usuarioService.crearUsuario({
      nombre,
      correo,
      contrasena,
      rol_id: ROLES.ADMIN
    });
    console.log('Admin creado:', usuario);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

crearAdmin();
