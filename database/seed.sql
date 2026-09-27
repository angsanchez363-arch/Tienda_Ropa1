USE tienda_ropa;

DELETE FROM detalle_venta;
DELETE FROM ventas;
DELETE FROM prendas;
DELETE FROM clientes;

-- Clientes
INSERT INTO clientes (nombre, contacto, departamento, ciudad) VALUES
('Laura Pérez', '3001234567', 'Antioquia', 'Medellín'),
('María Gómez', '3109876543', 'Cundinamarca', 'Bogotá'),
('Camila Rodríguez', '3205551234', 'Valle del Cauca', 'Cali'),
('Ana López', '3154447890', 'Atlántico', 'Barranquilla'),
('Sofía Martínez', '3012223333', 'Santander', 'Bucaramanga');

-- Colección de ropa
INSERT INTO prendas (nombre, cantidad, precio) VALUES
('Vestido satinado negro', 15, 189900.00),
('Blazer beige clásico', 12, 229900.00),
('Camisa blanca oversize', 20, 119900.00),
('Jean recto azul', 25, 159900.00),
('Falda midi plisada', 18, 139900.00),
('Chaqueta de cuero', 10, 289900.00),
('Suéter tejido crema', 22, 129900.00),
('Bolso de hombro camel', 14, 179900.00);

-- Ventas
INSERT INTO ventas (id_cliente, fecha_venta, total) VALUES
(1, '2026-01-15', 369800.00),
(2, '2026-02-10', 349800.00),
(3, '2026-03-05', 279800.00),
(1, '2026-03-20', 159900.00),
(4, '2026-04-01', 409800.00);

-- Detalle de ventas
INSERT INTO detalle_venta (id_venta, id_prenda, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 189900.00, 189900.00),
(1, 7, 1, 129900.00, 129900.00),
(1, 3, 1, 119900.00, 119900.00),
(2, 2, 1, 229900.00, 229900.00),
(2, 4, 1, 159900.00, 159900.00),
(3, 5, 2, 139900.00, 279800.00),
(4, 4, 1, 159900.00, 159900.00),
(5, 6, 1, 289900.00, 289900.00),
(5, 8, 1, 179900.00, 179900.00);
