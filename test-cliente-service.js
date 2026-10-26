// test-cliente-service.js
const clienteService = require('./src/services/cliente.service');

async function probar() {
  try {
    const cliente = await clienteService.registrarCliente({
      nombre: 'Ana Torres',
      cedula: '987654321',
      correo: 'ana@example.com',
      telefono: '3009876543'
    });
    console.log('Cliente registrado:', cliente);

    try {
      await clienteService.registrarCliente({
        nombre: 'Otro',
        cedula: '987654321',
        correo: 'otro@example.com',
        telefono: '3000000000'
      });
    } catch (error) {
      console.log('Error esperado (cédula duplicada):', error.message);
    }

    await clienteService.eliminarCliente(cliente.id);
    console.log('Cliente de prueba eliminado');

    process.exit(0);
  } catch (error) {
    console.error('Error inesperado:', error.message);
    process.exit(1);
  }
}

probar();
