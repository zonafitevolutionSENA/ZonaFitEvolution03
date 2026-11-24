-- Esquema completo de la base de datos zonafitevolution.
-- Es el único script SQL del proyecto: no hay migraciones. Cada cambio de esquema se hace aquí.
-- Uso:
--   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zonafitevolution;"
--   mysql -u root -p zonafitevolution < database/init.sql

-- Codificación del cliente: sin esto, los nombres con tilde (Sesión) pueden guardarse mal según el programa que ejecute el script
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO roles (nombre) VALUES ('admin'), ('empleado');

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Al restablecer la contraseña, los tokens emitidos antes de esta fecha dejan de servir
  contrasena_cambiada_en DATETIME NULL,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Bases ya creadas: agrega la columna si todavía no existe
SET @falta_cambio_contrasena := (
  SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'contrasena_cambiada_en'
);
SET @sql_cambio_contrasena := IF(@falta_cambio_contrasena, 'ALTER TABLE usuarios ADD COLUMN contrasena_cambiada_en DATETIME NULL', 'DO 0');
PREPARE agregar_cambio_contrasena FROM @sql_cambio_contrasena;
EXECUTE agregar_cambio_contrasena;
DEALLOCATE PREPARE agregar_cambio_contrasena;

-- Códigos de verificación para restablecer la contraseña (olvidé mi contraseña).
-- El código se guarda cifrado, vence a los 10 minutos, es de un solo uso y admite 5 intentos.
CREATE TABLE IF NOT EXISTS recuperaciones_contrasena (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  codigo_hash VARCHAR(255) NOT NULL,
  intentos INT NOT NULL DEFAULT 0,
  expira_en DATETIME NOT NULL,
  usado_en DATETIME NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_recuperacion_usuario (usuario_id, usado_en)
);

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100),
  telefono VARCHAR(20),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Consentimientos (Ley 1581): fecha en que aceptó los términos y el tratamiento de datos (obligatorio al
  -- registrar) y fecha en que aceptó recibir avisos por correo (opcional; NULL = no recibe avisos)
  terminos_aceptados_en DATETIME NULL,
  avisos_aceptados_en DATETIME NULL
);

-- Bases ya creadas: agrega las columnas de consentimiento si todavía no existen
SET @falta_terminos := (
  SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'clientes' AND COLUMN_NAME = 'terminos_aceptados_en'
);
SET @sql_terminos := IF(@falta_terminos, 'ALTER TABLE clientes ADD COLUMN terminos_aceptados_en DATETIME NULL, ADD COLUMN avisos_aceptados_en DATETIME NULL', 'DO 0');
PREPARE agregar_consentimientos FROM @sql_terminos;
EXECUTE agregar_consentimientos;
DEALLOCATE PREPARE agregar_consentimientos;

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

-- Avisos por correo ya enviados: cada membresía recibe un solo aviso de cada tipo
-- (hoy solo 'vencimiento_7d': 7 días antes de que venza, en planes de 15 días o más)
CREATE TABLE IF NOT EXISTS avisos_membresia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membresia_id INT NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  enviado_en DATETIME NOT NULL,
  UNIQUE KEY uk_aviso_membresia_tipo (membresia_id, tipo),
  FOREIGN KEY (membresia_id) REFERENCES membresias(id) ON DELETE CASCADE
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
