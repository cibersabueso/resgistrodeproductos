<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!isset($_GET['codigo'])) {
    echo json_encode(["status" => "error", "message" => "Código no proporcionado"]);
    exit;
}

$codigo = trim($_GET['codigo']);

try {
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM productos WHERE codigo = ?");
    $stmt->execute([$codigo]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "exists" => $result['count'] > 0
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Error al verificar el código: " . $e->getMessage()
    ]);
}
?>