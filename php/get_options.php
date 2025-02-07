<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!isset($_GET['type'])) {
    echo json_encode(["status" => "error", "message" => "Tipo de datos no especificado."]);
    exit;
}

$type = $_GET['type'];

try {
    if ($type === 'bodega') {
        $stmt = $pdo->query("SELECT id, nombre FROM public.bodegas ORDER BY id ASC");
    } elseif ($type === 'sucursal' && isset($_GET['bodega_id'])) {
        $bodega_id = intval($_GET['bodega_id']);
        $stmt = $pdo->prepare("SELECT id, nombre FROM public.sucursales WHERE bodega_id = ?");
        $stmt->execute([$bodega_id]);
    } elseif ($type === 'moneda') {
        $stmt = $pdo->query("SELECT id, nombre FROM public.monedas ORDER BY id ASC");
    } else {
        echo json_encode(["status" => "error", "message" => "Tipo de datos no válido."]);
        exit;
    }

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => $data]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error al obtener datos: " . $e->getMessage()]);
}
?>
