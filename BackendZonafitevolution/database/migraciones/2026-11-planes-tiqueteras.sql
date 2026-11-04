-- Migración para una base de datos que YA TIENE datos (no borra nada).
-- Ejecutar una sola vez sobre la base zonafitevolution:
--   mysql -u root -p zonafitevolution < database/migraciones/2026-11-planes-tiqueteras.sql
-- Es segura de repetir: no duplica columnas ni planes.

-- Codificación del cliente: evita que "Sesión" se guarde con la tilde dañada
SET NAMES utf8mb4;

-- 1. Tiqueteras: ingresos del plan y control de ingresos en la membresía
ALTER TABLE planes
  ADD COLUMN IF NOT EXISTS max_ingresos INT NULL AFTER precio;

ALTER TABLE membresias
  MODIFY COLUMN fecha_fin DATE NULL,
  ADD COLUMN IF NOT EXISTS ingresos_totales INT NULL,
  ADD COLUMN IF NOT EXISTS ingresos_usados INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fecha_primer_uso DATE NULL,
  -- Una tiquetera descuenta máximo un ingreso por día
  ADD COLUMN IF NOT EXISTS fecha_ultimo_ingreso DATE NULL;

-- 2. Los planes de ejemplo anteriores pasan a las tarifas reales (se conservan sus ids y membresías)
UPDATE IGNORE planes SET nombre = 'Sesión' WHERE nombre = 'diario';
UPDATE IGNORE planes SET nombre = 'Quincena' WHERE nombre = 'quincenal';
UPDATE IGNORE planes SET nombre = 'Mensualidad' WHERE nombre = 'mensual';
UPDATE IGNORE planes SET nombre = 'Trimestre' WHERE nombre = 'trimestral';

-- 3. Tarifas 2026 (si el plan ya existe se actualizan sus valores)
INSERT INTO planes (nombre, duracion_dias, precio, max_ingresos) VALUES
  ('Sesión', 1, 10000, NULL),
  ('Quincena', 15, 50000, NULL),
  ('Mensualidad', 30, 85000, NULL),
  ('Mensualidad Estudiantes', 30, 70000, NULL),
  ('Tiquetera x6', 30, 55000, 6),
  ('Tiquetera x12', 45, 100000, 12),
  ('Trimestre', 90, 245000, NULL),
  ('Trimestre Estudiantes', 90, 210000, NULL)
ON DUPLICATE KEY UPDATE
  duracion_dias = VALUES(duracion_dias),
  precio = VALUES(precio),
  max_ingresos = VALUES(max_ingresos),
  activo = TRUE;
