<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// Recibir datos del formulario
$codigo = trim($_POST["codigo"] ?? '');
$nombre = trim($_POST["nombre"] ?? '');
$bodega_id = $_POST["bodega"] ?? null;
$sucursal_id = $_POST["sucursal"] ?? null;
$moneda_id = $_POST["moneda"] ?? null;
$precio = $_POST["precio"] ?? 0;
$descripcion = trim($_POST["descripcion"] ?? '');
$materiales = $_POST["material"] ?? [];

// Validaciones
if (strlen($codigo) < 5 || strlen($codigo) > 15) {
    echo json_encode(["status" => "error", "message" => "El código debe tener entre 5 y 15 caracteres."]);
    exit;
}

if (strlen($nombre) < 2 || strlen($nombre) > 50) {
    echo json_encode(["status" => "error", "message" => "El nombre debe tener entre 2 y 50 caracteres."]);
    exit;
}

if ($precio <= 0 || !is_numeric($precio)) {
    echo json_encode(["status" => "error", "message" => "El precio debe ser un número mayor a 0."]);
    exit;
}

if (strlen($descripcion) < 10 || strlen($descripcion) > 1000) {
    echo json_encode(["status" => "error", "message" => "La descripción debe tener entre 10 y 1000 caracteres."]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Insertar producto
    $stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) 
                           VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id");
    $stmt->execute([$codigo, $nombre, $bodega_id, $sucursal_id, $moneda_id, $precio, $descripcion]);

    $producto_id = $pdo->lastInsertId();

    // Insertar materiales asociados al producto
    if (!empty($materiales)) {
        $stmtMaterial = $pdo->prepare("INSERT INTO productos_materiales (producto_id, material_id) VALUES (?, ?)");
        foreach ($materiales as $material_id) {
            $stmtMaterial->execute([$producto_id, $material_id]);
        }
    }

    $pdo->commit();
    echo json_encode(["status" => "success", "message" => "Producto guardado exitosamente"]);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => "Error al guardar el producto: " . $e->getMessage()]);
}
?>
