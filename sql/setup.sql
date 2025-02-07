
CREATE DATABASE registro_productos;

-- Seleccionar la base de datos (si es necesario ejecutarlo manualmente)
-- \\c registro_productos;


-- Crear tabla de bodegas
CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla de sucursales
CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    bodega_id INT REFERENCES bodegas(id) ON DELETE CASCADE
);

-- Crear tabla de monedas
CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE CHECK (LENGTH(codigo) BETWEEN 5 AND 15),
    nombre VARCHAR(50) NOT NULL CHECK (LENGTH(nombre) BETWEEN 2 AND 50),
    bodega_id INT REFERENCES bodegas(id) ON DELETE SET NULL,
    sucursal_id INT REFERENCES sucursales(id) ON DELETE SET NULL,
    moneda_id INT REFERENCES monedas(id) ON DELETE SET NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
    descripcion TEXT NOT NULL CHECK (LENGTH(descripcion) BETWEEN 10 AND 1000)
);

-- Crear tabla de materiales
CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla de relación productos-materiales
CREATE TABLE productos_materiales (
    producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
    material_id INT REFERENCES materiales(id) ON DELETE CASCADE,
    PRIMARY KEY (producto_id, material_id)
);

