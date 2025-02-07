# 📌 Proyecto: Registro de Productos

Este proyecto es una aplicación web para registrar productos con opciones de selección de bodega, sucursal y moneda, además de permitir la asignación de materiales al producto.

## 📂 Estructura del Proyecto

```
registro_productos/
│── css/
│   ├── styles.css      # Estilos de la interfaz
│── js/
│   ├── script.js       # Funcionalidad y validaciones del formulario
│── php/
│   ├── config.php      # Configuración de la base de datos
│   ├── get_options.php # Obtiene opciones de bodega, sucursal y moneda
│   ├── guardar_producto.php # Procesa y guarda productos en la base de datos
│── index.php           # Página principal con el formulario
│── setup.sql           # Script SQL para la base de datos
│── README.md           # Documentación del proyecto
```

## ⚙️ Requisitos Previos

1. **Servidor Web y Base de Datos:**
   - Apache (MAMP, XAMPP o similar)
   - PostgreSQL (Versión 14 o superior)

2. **Lenguajes y Tecnologías:**
   - PHP 7.4+
   - JavaScript
   - HTML5 & CSS3

## 🚀 Instalación y Configuración

### 1️⃣ Configurar la Base de Datos

Ejecutar el siguiente comando en PostgreSQL:

CREATE DATABASE registro_productos;

Luego, importar el script SQL con:

psql -U postgres -d registro_productos -f setup.sql



### 2️⃣ Configurar la Conexión a la Base de Datos
Abrir `php/config.php` y modificar las credenciales según tu configuración:

$host = "localhost";
$dbname = "registro_productos";
$username = "postgres";
$password = "tu_contraseña";

### 3️⃣ Iniciar el Servidor Local
Si usas **MAMP**:
- Asegúrate de que Apache y PostgreSQL estén activos.
- Mueve la carpeta del proyecto a `htdocs`.
- Accede a `http://localhost/registro_productos/index.php`

Si usas **XAMPP**:
- Inicia Apache y PostgreSQL en el panel de control.
- Navega a `http://localhost/registro_productos/index.php`

## 📋 Funcionalidades

✅ **Carga dinámica** de bodegas, sucursales y monedas.
✅ **Validación en tiempo real** de datos ingresados en el formulario.
✅ **Registro de productos con materiales asociados.**
✅ **Uso de prepared statements en PHP para mayor seguridad.**
✅ **Diseño responsivo optimizado con CSS.**

## 📜 API Endpoints

### 🔹 Obtener Opciones de Selección

GET /php/get_options.php?type=bodega | sucursal | moneda

### 🔹 Guardar un Producto

POST /php/guardar_producto.php

**Parámetros:**
    json
{  
  "codigo": "P12345",
  "nombre": "Producto Ejemplo",
  "bodega": 1,
  "sucursal": 2,
  "moneda": 1,
  "precio": 100.50,
  "descripcion": "Un producto de prueba",
  "material": [1, 3, 5]
}
```

 Mejoras Implementadas

- Optimización de seguridad** con prepared statements en PHP.
- Reemplazo de `fetch().then()` por `async/await`** para mejor manejo de errores en JS.
- Restricciones de clave foránea con `ON DELETE CASCADE/SET NULL`** en SQL.
- Uso de índices** en las consultas para mejorar el rendimiento de la BD.
- Diseño mejorado con flexbox y estilos responsivos.**

## 🏆 Autor
👨‍💻 **Desarrollador:** Enrique Garrido
📧 **Contacto:** kgarridofa@gmail.com

---

¡Gracias por usar este sistema! 🚀

