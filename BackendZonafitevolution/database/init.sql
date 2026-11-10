-- Esquema completo de la base de datos zonafitevolution.
-- Es el único script SQL del proyecto: no hay migraciones. Cada cambio de esquema se hace aquí.
-- Uso:
--   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"
--   mysql -u root -p zonafitevolution < database/init.sql

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

-- Catálogo de planes
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

-- El plan es la única fuente de tipo y precio de la membresía.
-- Estado 'pendiente': membresía adquirida mientras el cliente tiene otra activa; la tarea diaria la activa en su fecha de inicio.
-- Tiqueteras: fecha_fin queda en NULL hasta el primer ingreso (ahí empieza a contar la duración);
-- ingresos_totales es una copia de los ingresos del plan al momento de la venta (NULL = membresía por tiempo).
CREATE TABLE IF NOT EXISTS membresias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NULL,
  estado ENUM('pendiente', 'activa', 'vencida', 'cancelada') NOT NULL DEFAULT 'activa',
  cliente_id INT NOT NULL,
  plan_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ingresos_totales INT NULL,
  ingresos_usados INT NOT NULL DEFAULT 0,
  fecha_primer_uso DATE NULL,
  fecha_ultimo_ingreso DATE NULL, -- una tiquetera descuenta máximo un ingreso por día
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_membresia_plan FOREIGN KEY (plan_id) REFERENCES planes(id),
  -- Acelera la consulta diaria de pendientes por fecha de inicio
  INDEX idx_membresias_estado_inicio (estado, fecha_inicio)
);

CREATE TABLE IF NOT EXISTS plantillas_biometricas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL UNIQUE,
  -- UNIQUE: la misma huella no puede quedar registrada para dos clientes
  template_hash VARCHAR(255) NOT NULL UNIQUE,
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
