document.addEventListener("DOMContentLoaded", function () {
    cargarOpciones("bodega");
    cargarOpciones("moneda");

    // Referencias a campos
    const codigoInput = document.getElementById("codigo");
    const nombreInput = document.getElementById("nombre");
    const bodegaSelect = document.getElementById("bodega");
    const sucursalSelect = document.getElementById("sucursal");
    const monedaSelect = document.getElementById("moneda");
    const precioInput = document.getElementById("precio");
    const descripcionInput = document.getElementById("descripcion");
    const form = document.getElementById("productForm");

    // Función para validar todos los campos obligatorios
    function validarCamposObligatorios() {
        let valido = true;
        let mensaje = "Por favor complete los siguientes campos:\n";

        // Validar código
        if (!validarCodigo()) {
            return false;
        }

        // Validar nombre
        if (!validarNombre()) {
            return false;
        }

        // Validar precio
        if (!validarPrecio()) {
            return false;
        }

        // Validar bodega
        if (!bodegaSelect.value) {
            alert("Debe seleccionar una bodega.");
            bodegaSelect.focus();
            return false;
        }

        // Validar sucursal
        if (!sucursalSelect.value) {
            alert("Debe seleccionar una sucursal para la bodega seleccionada.");
            sucursalSelect.focus();
            return false;
        }

        // Validar moneda
        if (!monedaSelect.value) {
            alert("Debe seleccionar una moneda para el producto.");
            monedaSelect.focus();
            return false;
        }

        // Validar descripción
        if (!validarDescripcion()) {
            return false;
        }

        return valido;
    }

    // Validación del código
    function validarCodigo() {
        const valor = codigoInput.value.trim();
        
        if (valor === "") {
            alert("El código del producto no puede estar en blanco.");
            codigoInput.focus();
            return false;
        } 
        
        if (valor.length < 5 || valor.length > 15) {
            alert("El código del producto debe tener entre 5 y 15 caracteres.");
            codigoInput.focus();
            return false;
        }

        // Validar que contenga al menos una letra y un número
        if (!(/[a-zA-Z]/.test(valor) && /[0-9]/.test(valor))) {
            alert("El código del producto debe contener letras y números");
            codigoInput.focus();
            return false;
        }

        return true;
    }

    // Validación del nombre
    function validarNombre() {
        const valor = nombreInput.value.trim();
        
        if (valor === "") {
            alert("El nombre del producto no puede estar en blanco.");
            nombreInput.focus();
            return false;
        }
        
        if (valor.length < 2 || valor.length > 50) {
            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
            nombreInput.focus();
            return false;
        }

        return true;
    }

    // Validación del precio
    function validarPrecio() {
        const valor = precioInput.value.trim();
        
        if (valor === "") {
            alert("El precio del producto no puede estar en blanco.");
            precioInput.focus();
            return false;
        }

        // Regex para validar número positivo con exactamente dos decimales
        const regex = /^[1-9]\d*,\d{2}$/;
        if (!regex.test(valor)) {
            alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
            precioInput.focus();
            return false;
        }

        return true;
    }

    // Validación de la descripción
    function validarDescripcion() {
        const valor = descripcionInput.value.trim();
        
        if (valor === "") {
            alert("La descripción del producto no puede estar en blanco.");
            descripcionInput.focus();
            return false;
        }
        
        if (valor.length < 10 || valor.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            descripcionInput.focus();
            return false;
        }

        return true;
    }

    document.getElementById("bodega").addEventListener("change", function () {
        let bodegaId = this.value;
        let sucursalSelect = document.getElementById("sucursal");

        if (!bodegaId) {
            sucursalSelect.innerHTML = '<option value=""></option>';
            return;
        }

        cargarOpciones("sucursal", bodegaId);
    });

    // Validación del campo precio en tiempo real
    precioInput.addEventListener("input", function () {
        let value = this.value;
        // Reemplazar punto por coma
        value = value.replace(/\./g, ',');
        // Solo permitir números y una coma
        value = value.replace(/[^0-9,]/g, '')
                     // Evitar ceros al inicio
                     .replace(/^0+(?=\d)/, '')
                     // Permitir solo una coma
                     .replace(/(,.*?),/g, '$1')
                     // Permitir solo dos decimales
                     .replace(/(,\d{2})\d+/, '$1');
        this.value = value;
    });

    precioInput.setAttribute("type", "text");
    precioInput.setAttribute("inputmode", "decimal");
    precioInput.style.textAlign = "left";

    // Validación del Nombre del Producto
    nombreInput.addEventListener("input", function () {
        this.value = this.value.slice(0, 50);
    });

    // Validación de la Descripción
    descripcionInput.addEventListener("input", function () {
        this.value = this.value.slice(0, 1000);
    });

    // Event listener para el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (validarCamposObligatorios() && validarMateriales()) {
            guardarProducto();
        }
    });
});

// Función para validar materiales
function validarMateriales() {
    let checkboxes = document.querySelectorAll('input[name="material[]"]:checked');
    if (checkboxes.length < 2) {
        alert("Debe seleccionar al menos dos materiales.");
        return false;
    }
    return true;
}

// Función para cargar opciones
function cargarOpciones(tipo, bodegaId = null) {
    let url = `php/get_options.php?type=${tipo}`;
    if (bodegaId) url += `&bodega_id=${bodegaId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                let select = document.getElementById(tipo);
                select.innerHTML = '<option value=""></option>';

                data.data.forEach(item => {
                    let option = document.createElement("option");
                    option.value = item.id;
                    option.textContent = item.nombre;
                    select.appendChild(option);
                });
            } else {
                console.error("Error cargando datos:", data.message);
            }
        })
        .catch(error => console.error("Error:", error));
}

// Función para guardar producto
function guardarProducto() {
    let formData = new FormData(document.getElementById("productForm"));

    fetch("php/guardar_producto.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Producto guardado correctamente");
            document.getElementById("productForm").reset();
        } else {
            alert("Error al guardar el producto: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}