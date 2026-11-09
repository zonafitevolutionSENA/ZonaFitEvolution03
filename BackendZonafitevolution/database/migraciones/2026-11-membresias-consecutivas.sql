-- Migración para una base de datos que YA TIENE datos (no borra nada).
-- Ejecutar una sola vez sobre la base zonafitevolution, después de 2026-11-planes-tiqueteras.sql:
--   mysql -u root -p zonafitevolution < database/migraciones/2026-11-membresias-consecutivas.sql

-- Estado 'pendiente': membresía comprada mientras el cliente tiene otra activa; la tarea diaria la activa en su fecha de inicio
ALTER TABLE membresias
  MODIFY COLUMN estado ENUM('pendiente', 'activa', 'vencida', 'cancelada') NOT NULL DEFAULT 'activa';

-- Acelera la consulta diaria de pendientes por fecha de inicio
CREATE INDEX idx_membresias_estado_inicio ON membresias (estado, fecha_inicio);
