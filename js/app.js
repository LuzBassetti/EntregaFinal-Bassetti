function mostrarProductos() {
    let productosText = "Detallamos a continuacion nuestros productos y sus precios:\n";
    productos.forEach(producto => {
        productosText += `${producto.nombre}:`;
        productosText += ` -${producto.size}....$${producto.precio}\n`;
    });
    alert(productosText);
}

function precioTotal() {
    let total = 0
    for (let i = 0; i < productos.length; i++) {
        total += (productos[i].precio * productos[i].cantidad);
    }
    return total;
}
class producto {
    constructor(nombreId, nombre, sizeId, size, precio) {
        this.nombreId = nombreId;
        this.nombre = nombre;
        this.sizeId = sizeId;
        this.size = size;
        this.precio = precio;
        this.cantidad = 0;
    }
}

const productos = [];
productos.push(new producto("1", "Chocotorta", "1", "Pequeña", "4000"));
productos.push(new producto("1", "Chocotorta", "2", "Mediana", "5500"));
productos.push(new producto("1", "Chocotorta", "3", "Grande", "7000"));
productos.push(new producto("2", "Cheesecake", "1", "Pequeño", "4500"));
productos.push(new producto("2", "Cheesecake", "2", "Mediano", "6000"));
productos.push(new producto("2", "Cheesecake", "3", "Grande", "8000"));
productos.push(new producto("3", "Lemon Pie", "1", "Pequeño", "3500"));
productos.push(new producto("3", "Lemon Pie", "2", "Mediano", "4500"));
productos.push(new producto("3", "Lemon Pie", "3", "Grande", "6500"));

let nombreUser;
let sizeName;
let productName;
let sizeUser;
let decision;
let opcion;
let precio;


alert("Bienvenido a `Pasteleria y decoracion`");
opcion = prompt("Menu de opciones: \n1-Comprar \n2-Contactanos \n3-Salir");

while ((opcion != "1") && (opcion != "2") && (opcion != "3")) {
    alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
    opcion = prompt("Menu de opciones: 1-Comprar 2-Contactanos 3-Salir");
}
switch (opcion) {
    case "1":
        do {
            mostrarProductos()
            nombreUser = prompt("Ingrese el numero correspondiente al producto elegido (1 a 3)\nproducto : \n1-Chocotorta \n2-Cheesecake \n3-Lemon Pie");
            while ((nombreUser != "1") && (nombreUser != "2") && (nombreUser != "3")) {
                alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
                nombreUser = prompt("Ingrese el número correspondiente al producto elegido (1 a 3)\nproducto : \n1-Chocotorta \n2-Cheesecake \n3-Lemon Pie");
            }

            productos.forEach(producto => {
                if (producto.nombreId === nombreUser) {
                    productName = producto.nombre;
                }
            });

            alert("Usted eligió el producto " + productName + ". Por favor ahora elija el tamaño:");
            sizeUser = prompt("Ingrese el número correspondiente al tamaño elegido (1 a 3) \nTamaños: \n1-Pequeño \n2-Mediano \n3-Grande");
            while ((sizeUser != "1") && (sizeUser != "2") && (sizeUser != "3")) {
                alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
                size = prompt("Ingrese el número correspondiente al tamaño elegido (1 a 3) \nTamaños: \n1-Pequeño \n2-Mediano \n3-Grande");
            }

            productos.forEach(producto => {
                if ((producto.sizeId === sizeUser) && (producto.nombreId === nombreUser)) {
                    sizeName = producto.size;
                    console.log(sizeName);
                    producto.cantidad++;
                    precio = producto.precio;
                }
            });

            alert("Usted eligió el producto " + productName + " y el tamaño " + sizeName + " \n por el precio de " + precio + "\n \n El total de la compra es de " + precioTotal());

            decision = prompt("Desdea seguir comprando? (si/no)").toLowerCase();
            while ((decision != "si") && (decision != "no")) {
                console.log("desicion");
                alert("Opcion no válida, por favor intente nuevamente");
                decision = prompt("Desdea seguir comprando? (si/no)").toLowerCase();
            }
        } while (decision != "no");


        alert("Gracias por su compra!");
        break;

    case "2":
        alert("Para comunicarse con nosotros puede hacerlo a traves de Whatsapp al 34139999999");
        break;

    case "3":
        alert("Gracias por visitar nuestro sitio. Lo esperamos nuevamente!");
        break;

    default:
        alert("Opcion ingresada no válida. Hasta luego.");
        break;
}