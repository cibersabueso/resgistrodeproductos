<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT NOW()");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "✅ Conexión exitosa. Fecha y hora del servidor: " . $row['now'];
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
