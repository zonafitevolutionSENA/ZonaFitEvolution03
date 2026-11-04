-- Codificación del cliente: sin esto, los nombres con tilde (Sesión) pueden guardarse mal según el programa que ejecute el script
SET NAMES utf8mb4;

-- Corrección de roles: ahora son del personal, no de clientes
DROP TABLE IF EXISTS membresias;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (nombre) VALUES ('admin'), ('empleado');

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100),
  telefono VARCHAR(20),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS membresias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado ENUM('activa', 'vencida', 'cancelada') NOT NULL DEFAULT 'activa',
  cliente_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Épica 2, Sprint 1: catálogo de planes
CREATE TABLE IF NOT EXISTS planes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  duracion_dias INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  -- NULL = plan por tiempo. Con valor = tiquetera: cantidad de ingresos que incluye
  max_ingresos INT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tarifas 2026. En las tiqueteras la duración cuenta desde el primer día de uso.
-- INSERT IGNORE: el script se puede volver a ejecutar sin fallar por nombres duplicados
INSERT IGNORE INTO planes (nombre, duracion_dias, precio, max_ingresos) VALUES
  ('Sesión', 1, 10000, NULL),
  ('Quincena', 15, 50000, NULL),
  ('Mensualidad', 30, 85000, NULL),
  ('Mensualidad Estudiantes', 30, 70000, NULL),
  ('Tiquetera x6', 30, 55000, 6),
  ('Tiquetera x12', 45, 100000, 12),
  ('Trimestre', 90, 245000, NULL),
  ('Trimestre Estudiantes', 90, 210000, NULL);

-- Ajustar membresias para referenciar el plan
ALTER TABLE membresias
  ADD COLUMN plan_id INT NULL AFTER cliente_id,
  ADD CONSTRAINT fk_membresia_plan FOREIGN KEY (plan_id) REFERENCES planes(id);

-- Migración (Épica 2, Sprint 1, Día 5): el plan pasa a ser la única fuente de tipo y precio.
-- Al ejecutar este script completo, membresias se recrea vacía, así que el ALTER siempre aplica.
-- Para una base de datos ya existente, ejecutar solo este ALTER (una sola vez) y solo si
-- no hay membresías con plan_id NULL:
ALTER TABLE membresias
  DROP COLUMN tipo,
  DROP COLUMN precio,
  MODIFY COLUMN plan_id INT NOT NULL;

-- Tiqueteras: fecha_fin queda en NULL hasta el primer ingreso (ahí empieza a contar la duración).
-- ingresos_totales es una copia de los ingresos del plan al momento de la venta (NULL = membresía por tiempo).
ALTER TABLE membresias
  MODIFY COLUMN fecha_fin DATE NULL,
  ADD COLUMN ingresos_totales INT NULL,
  ADD COLUMN ingresos_usados INT NOT NULL DEFAULT 0,
  ADD COLUMN fecha_primer_uso DATE NULL;

CREATE TABLE IF NOT EXISTS plantillas_biometricas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL UNIQUE,
  template_hash VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS registros_acceso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NULL,
  resultado ENUM('permitido', 'denegado') NOT NULL,
  motivo VARCHAR(100) NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
