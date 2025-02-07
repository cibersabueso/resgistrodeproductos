<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Producto</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h2>Formulario de Producto</h2>
        <form id="productForm">
            <div class="form-group">
                <label for="codigo">Código:</label>
                <input type="text" id="codigo" name="codigo" required>
            </div>

            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>

            <div class="form-group">
                <label for="bodega">Bodega:</label>
                <select id="bodega" name="bodega" required></select>
            </div>

            <div class="form-group">
                <label for="sucursal">Sucursal:</label>
                <select id="sucursal" name="sucursal" required></select>
            </div>

            <div class="form-group">
                <label for="moneda">Moneda:</label>
                <select id="moneda" name="moneda" required></select>
            </div>

            <div class="form-group">
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" required>
            </div>

            <div class="form-group">
                <label>Material del Producto:</label>
                <div class="material-options">
                    <label><input type="checkbox" name="material[]" value="1"> Plástico</label>
                    <label><input type="checkbox" name="material[]" value="2"> Metal</label>
                    <label><input type="checkbox" name="material[]" value="3"> Madera</label>
                    <label><input type="checkbox" name="material[]" value="4"> Vidrio</label>
                    <label><input type="checkbox" name="material[]" value="5"> Textil</label>
                </div>
            </div>

            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" required></textarea>
            </div>

            <button type="submit">Guardar Producto</button>
        </form>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
