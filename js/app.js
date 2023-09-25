// class producto {
//     constructor(id, nombre, precio, imagen, size) {
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.imagen = imagen;
//         this.size = size;
//     }
// }

// const productos = [];
// productos.push(new producto(1, "Chocotorta", 4000, "img/chocotorta.jpeg", "Pequeña",));
// productos.push(new producto(2, "Chocotorta", 5500, "img/chocotorta.jpeg", "Mediana"));
// productos.push(new producto(3, "Chocotorta", 7000, "img/chocotorta.jpeg", "Grande"));
// productos.push(new producto(4, "Cheesecake", 4500, "img/cheesecake.jpeg", "Pequeño"));
// productos.push(new producto(5, "Cheesecake", 6000, "img/cheesecake.jpeg", "Mediano"));
// productos.push(new producto(6, "Cheesecake", 8000, "img/cheesecake.jpeg", "Grande"));
// productos.push(new producto(7, "Lemon Pie", 3500, "img/lemon.jpeg", "Pequeño"));
// productos.push(new producto(8, "Lemon Pie", 4500, "img/lemon.jpeg", "Mediano"));
// productos.push(new producto(9, "Lemon Pie", 6500, "img/lemon.jpeg", "Grande"));

// productos.forEach(producto => {
//     console.log(producto)
// });

let carrito = [];
let data = [];
const divisa = '$';
const DOMitems = document.getElementById('items');
const DOMcarrito = document.getElementById('carrito');
const DOMtotal = document.getElementById('total');
const DOMbotonVaciar = document.getElementById('boton-vaciar');
const DOMbotonComprar = document.getElementById('boton-comprar');
const miLocalStorage = window.localStorage;


// Funciones

/**
 * Trae productos desde base de datos
 */
const fetchData = async () => {
    try {
        const response = await fetch('./json/products.json');
        data = await response.json();
        console.log(data);

        renderizarProductos(data);

    } catch (error) {
        console.error (`Error al obetener productos`, error);
        throw error;
    }
}


/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    data.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        //Tamaño
        const miNodoSize = document.createElement('h6');
        miNodoSize.classList.add('card-text');
        miNodoSize.textContent = info.size;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
        // Inserto
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoSize);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function agregarProductoAlCarrito(evento) {
    //Agregado de toastify
    Toastify({
        text: "Producto agregado!",
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

    // Agrego el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualiza el carrito 
    renderizarCarrito();
    // Actualiz el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vacio todo el html
    DOMcarrito.textContent = '';
    // Saco los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Genero los Nodos a partir de carrito
    console.log(carritoSinDuplicados)
    carritoSinDuplicados.forEach((item) => {
        // Obtengo el item que necesitamos de la variable base de datos
        const miItem = data.filter((itemBaseDatos) => {
            console.log (itemBaseDatos)
            // Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        console.log(miItem)
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        console.log(miItem)
        console.log(numeroUnidadesItem)
        // Creo el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].size[0]} - ${divisa}${miItem[0].precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclo nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizo el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    //Agregado de toastify
    Toastify({
        text: "Producto borrado",
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #F34530, #F5731A)",
        },
    }).showToast();
    // Obtengo el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borro todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // vuelvo a renderizar
    renderizarCarrito();
    // Actualizo el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorro el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = data.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumo al total
        return total + miItem[0].precio;
    }, 0);
}

/**
 * Vacia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    //Agregado de SWEETALERT
    Swal.fire({
        title: 'Estas seguro?',
        text: "Estas a punto de vaciar tu carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, vaciar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Vaciado!',
                'Tu carrito no contiene ningun producto.',
                'success'
            )
            // Limpio los productos guardados
            carrito = [];
            // Renderizo los cambios
            renderizarCarrito();
            // Borra LocalStorage
            localStorage.clear();
        }
    })
}

/**
 * Finaliza compra deberia dirigir al pago pero por ahora solo vacia el carrito y vuelve a dibujarlo
 */
function finalizarCompra() {
    //Agregado de SWEETALERT
    Swal.fire(
        'Haz finalizado tu compra!',
        'Gracias por confiar en nuestros productos!',
        'success'
    )
    // Limpio los productos guardados
    carrito = [];
    // Renderizo los cambios
    renderizarCarrito();
    // Borra LocalStorage
    localStorage.clear();
}


function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    // Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', finalizarCompra);// aca se supone que redirige a pasarela de pagos para pagar

// Inicio
fetchData();
cargarCarritoDeLocalStorage();

renderizarCarrito();


