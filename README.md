# ATELIER 27 — Tienda de Ropa

Proyecto completo para administrar una tienda de ropa y accesorios.

- **Frontend**: React + Vite + React Router + Axios + React Bootstrap + CSS personalizado
- **Backend**: Express + MySQL2 + CORS + dotenv
- **Base de datos**: MySQL (`tienda_ropa`)

## Estructura

```
atelier27_tienda_ropa/
├── backend/          # Servidor Express (puerto 3000)
│   └── routes/
│       ├── clientes.js
│       ├── prendas.js
│       └── ventas.js
├── frontend/         # Aplicación React/Vite (puerto 5173)
├── database/         # Scripts SQL (schema + seed)
└── README.md
```

## Base de datos

**Nombre:** `tienda_ropa`

| Tabla | Descripción |
|---|---|
| `clientes` | Clientes de la tienda |
| `prendas` | Catálogo de prendas y accesorios |
| `ventas` | Registro de cada venta |
| `detalle_venta` | Detalle de cada venta |

### Campos principales

**clientes:** `id_cliente`, `nombre`, `contacto`, `departamento`, `ciudad`  
**prendas:** `id_prenda`, `nombre`, `cantidad`, `precio`  
**ventas:** `id_venta`, `id_cliente`, `fecha_venta`, `total`  
**detalle_venta:** `id_detalle`, `id_venta`, `id_prenda`, `cantidad`, `precio_unitario`, `subtotal`

## Secciones de la interfaz

| Ruta | Descripción |
|---|---|
| `/` | Inicio con estadísticas y accesos rápidos |
| `/prendas` | Catálogo de ropa |
| `/clientes` | Gestión de clientes |
| `/ventas` | Historial de ventas |

## Requisitos

- Node.js 18+
- MySQL 8+ o MariaDB
- npm

## Configuración de la base de datos

```bash
mysql -u root -p
```

```sql
SOURCE /ruta/completa/a/atelier27_tienda_ropa/database/schema.sql;
SOURCE /ruta/completa/a/atelier27_tienda_ropa/database/seed.sql;
```

Verifica:

```sql
USE tienda_ropa;
SHOW TABLES;
SELECT * FROM prendas;
SELECT * FROM clientes;
```

## Backend

```bash
cd backend
cp .env.example .env
# Configura tu contraseña de MySQL
npm install
npm start
```

Servidor: `http://localhost:3000`

### API

- `GET/POST/PUT/DELETE /clientes`
- `GET/POST/PUT/DELETE /prendas`
- `GET /ventas` y `GET /ventas/:id`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Identidad visual

ATELIER 27 utiliza una estética de boutique: tonos crema, beige y café, tipografía editorial, tarjetas de prendas y navegación minimalista.
