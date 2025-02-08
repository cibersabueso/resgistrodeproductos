<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// Validar los datos recibidos
$codigo = trim($_POST['codigo']);
$nombre = trim($_POST['nombre']);
$bodega_id = intval($_POST['bodega']);
$sucursal_id = intval($_POST['sucursal']);
$moneda_id = intval($_POST['moneda']);
$precio = str_replace(",", ".", $_POST['precio']); // Convertir coma en punto
$descripcion = trim($_POST['descripcion']);
$materiales = isset($_POST['material']) ? $_POST['material'] : [];

if (!$codigo || !$nombre || !$bodega_id || !$sucursal_id || !$moneda_id || !$precio || !$descripcion) {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Insertar el producto
    $stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$codigo, $nombre, $bodega_id, $sucursal_id, $moneda_id, $precio, $descripcion]);

    $producto_id = $pdo->lastInsertId();

    // Insertar materiales si existen
    if (!empty($materiales)) {
        $stmt = $pdo->prepare("INSERT INTO productos_materiales (producto_id, material_id) VALUES (?, ?)");
        foreach ($materiales as $material_id) {
            $stmt->execute([$producto_id, $material_id]);
        }
    }

    $pdo->commit();
    echo json_encode(["status" => "success", "message" => "Producto guardado"]);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
