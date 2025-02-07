document.addEventListener("DOMContentLoaded", function () {
    cargarOpciones("bodega");
    cargarOpciones("moneda");

    document.getElementById("bodega").addEventListener("change", function () {
        let bodegaId = this.value;
        if (bodegaId) {
            cargarOpciones("sucursal", bodegaId);
        }
    });

    document.getElementById("productForm").addEventListener("submit", function (event) {
        event.preventDefault();
        guardarProducto();
    });
});

async function cargarOpciones(tipo, bodegaId = null) {
    let url = `php/get_options.php?type=${tipo}`;
    if (bodegaId) url += `&bodega_id=${bodegaId}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.status === "success") {
            let select = document.getElementById(tipo);
            select.innerHTML = '<option value="">Seleccione una opción</option>';
            data.data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.nombre;
                select.appendChild(option);
            });
        } else {
            console.error("Error cargando datos:", data.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

async function guardarProducto() {
    let formData = new FormData(document.getElementById("productForm"));

    // Validaciones antes de enviar
    if (!formData.get("codigo") || formData.get("codigo").length < 5 || formData.get("codigo").length > 15) {
        alert("El código debe tener entre 5 y 15 caracteres.");
        return;
    }

    if (!formData.get("nombre") || formData.get("nombre").length < 2 || formData.get("nombre").length > 50) {
        alert("El nombre debe tener entre 2 y 50 caracteres.");
        return;
    }

    if (!formData.get("precio") || parseFloat(formData.get("precio")) <= 0) {
        alert("El precio debe ser mayor a 0.");
        return;
    }

    if (!formData.get("descripcion") || formData.get("descripcion").length < 10 || formData.get("descripcion").length > 1000) {
        alert("La descripción debe tener entre 10 y 1000 caracteres.");
        return;
    }

    try {
        let response = await fetch("php/guardar_producto.php", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (data.status === "success") {
            alert(data.message);
            document.getElementById("productForm").reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error al conectar con el servidor.");
    }
}
