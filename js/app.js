function sumaProd(producto, size) {
    if (producto == 1 && size == 1) {
        precio = chocoP
        return precio
    }
    else if (producto == 1 && size == 2) {
        precio = chocoM
        return precio
    }
    else if (producto == 1 && size == 3) {
        precio = chocoG
        return precio
    }
    else if (producto == 2 && size == 1) {
        precio = cheeseP
        return precio
    }
    else if (producto == 2 && size == 2) {
        precio = cheeseM
        return precio
    }
    else if (producto == 2 && size == 3) {
        precio = cheeseG
        return precio
    }
    else if (producto == 3 && size == 1) {
        precio = lemonP
        return precio
    }
    else if (producto == 3 && size == 2) {
        precio = lemonM
        return precio
    }
    else if (producto == 3 && size == 3) {
        precio = lemonG
        return precio
    }
}
function precioTotal(precio, cantChoco, cantCheese, cantLemon){
let total=(precio*cantChoco)+(precio*cantCheese)+(precio*cantLemon)
return total
}

let producto
let size
let productName
let sizeName
let decision
let opcion
let precio
let chocoP = 4000, chocoM = 5500, chocoG = 7000, cheeseP = 4500, cheeseM = 6000, cheeseG = 8000, lemonP = 3500, lemonM = 4500, lemonG = 6500
let cantChoco=0, cantCheese=0, cantLemon=0


alert("Bienvenido a `Pasteleria y decoracion`");
opcion = prompt("Menu de opciones: \n1-Comprar \n2-Contactanos \n3-Salir");

while ((opcion != "1") && (opcion != "2") && (opcion != "3")) {
    alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
    opcion = prompt("Menu de opciones: 1-Comprar 2-Contactanos 3-Salir");
}
switch (opcion) {
    case "1":
        do {
            alert("Detallamos a continuacion nuestros productos y sus precios: \n1-Chocotorta: \n  -pequeña....$4000 \n  -mediana....$5500 \n  -grande.......$7000 \n2-Cheesecake: \n  -pequeño....$4500 \n  -mediano....$6000 \n  -grande.......$8000 \n3-Lemon Pie: \n  -pequeño....$3500 \n  -mediano....$4500 \n  -grande.......$6500");
            producto = prompt("Ingrese el numero correspondiente al producto elegido (1 a 3)\nProductos: \n1-Chocotorta \n2-Cheesecake \n3-Lemon Pie");
            while ((producto != "1") && (producto != "2") && (producto != "3")) {
                alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
                producto = prompt("Ingrese el número correspondiente al producto elegido (1 a 3)\nProductos: \n1-Chocotorta \n2-Cheesecake \n3-Lemon Pie");
            }
            if (producto == 1) {
                productName = "Chocotorta";
                cantChoco=cantChoco+1;
            }
            else if (producto == 2) {
                productName = "Cheesecake";
                cantCheese=cantCheese+1;
            }
            else if (producto == 3) {
                productName = "Lemon Pie";
                cantLemon=cantLemon+1;
            }
            alert("Usted eligió el producto " + productName + ". Por favor elija el tamaño:");
            size = prompt("Ingrese el número correspondiente al tamaño elegido (1 a 3) \nTamaños: \n1-Pequeño \n2-Mediano \n3-Grande");
            while ((size != "1") && (size != "2") && (size != "3")) {
                alert("Opcion ingresada no válida. Por favor ingrese un número del 1 al 3.");
                size = prompt("Ingrese el número correspondiente al tamaño elegido (1 a 3) \nTamaños: \n1-Pequeño \n2-Mediano \n3-Grande");
            }
            if (size == 1) {
                sizeName = "Pequeño";
            }
            else if (size == 2) {
                sizeName = "Mediano";
            }
            else if (size == 3) {
                sizeName = "Grande";
            }
            alert("Usted eligió el producto " + productName + " y el tamaño " + sizeName + " \n por el precio de " + sumaProd(producto, size)+ "\n \n El total de la compra es de "+ precioTotal(precio, cantChoco, cantCheese, cantLemon));

            decision = prompt("Desdea seguir comprando? (si/no)").toLowerCase()
        } while (decision != "no")
        alert("Gracias por su compra!")
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