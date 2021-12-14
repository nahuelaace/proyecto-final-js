/* 
// Clase pedido
class Pedido{

    // Atributos  de la clase pedido
    constructor(listaCombra){

        // Cantidad de productos pedidos
        this.cantidadRemeras = listaCombra[0];
        this.cantidadPantalones = listaCombra[1];
        this.cantidadZapatillas = listaCombra[2];

        // Cantidad de productos sin descuento en el pedido
        this.cantRemerasSinDesc = 0;
        this.cantPantalonesSinDesc = 0;
        this.cantZapatillasSinDesc = 0;

        // Precios de productos
        this.precioRemera = 3000;
        this.precioPantalon = 2500;
        this.precioZapatilla = 22000;

        // Monto total por cada producto del carrito del cliente
        this.montoRemeras = 0;
        this.montoPantalones = 0;
        this.montoZapatillas = 0;

        // Monto total
        this.montoTotal = 0;
    }
    

    // Metodo que calcula la cantidad de productos que no llevan descuento. ej: si tengo 5 mouses, solo 3 tienen descuento, si tengo 8, solo 6 tienen descuento
    calculoProductosSinDescuento() {
        this.cantRemerasSinDesc = this.cantidadRemeras % 3;
        this.cantPantalonesSinDesc = this.cantidadPantalones % 3;
        this.cantZapatillasSinDesc = this.cantidadZapatillas % 3;
    }

    // Metodo que calcula el monto de compra sobre un tipo de producto, y devuelve ese valor
    calcularMontoProducto(cantProducto, cantSinDescuento, precio){
        let montoProducto;

        if (cantProducto<=2) {
            // Si tenemos 2 productos o menos solo se calcula el monto sin descuento
            montoProducto = precio * cantProducto;
        } else {
            // Aqui se le aplica el descuento a los productos que les corresponde
            montoProducto = precio * (cantProducto - cantSinDescuento) * 0.85; 
            // Aqui se suman los productos que no tienen descuento
            montoProducto = montoProducto + precio * cantSinDescuento;
        }

        return montoProducto;
    }
    
    // Metodo para calcular monto total y actualiza los atributos de montos por producto
    calcularMontoTotal() {
        let resultado;

        // Actualiza un atributo de monto por cada vuelta, 3 vueltas
        for (let i = 0; i < 3; i++) {

            switch (i) {
                // Teclados
                case 0:
                    resultado = this.calcularMontoProducto(this.cantidadRemeras, this.cantRemerasSinDesc, this.precioRemera);
                    this.montoRemeras = resultado;
                    break;
                // Mouses
                case 1:
                    resultado = this.calcularMontoProducto(this.cantidadPantalones, this.cantPantalonesSinDesc, this.precioPantalon);
                    this.montoPantalones = resultado;
                    break;
                // Monitores
                case 2:
                    resultado = this.calcularMontoProducto(this.cantidadZapatillas, this.cantZapatillasSinDesc, this.precioZapatilla);
                    this.montoZapatillas = resultado;
                    break;
                default:
                    break;
            }

            // Actualiza monto total de compra
            this.montoTotal = this.montoTotal + resultado;
        }
        
    }

    // Metodo para reguistrar el pedido
    confirmarPedido(){
        this.calculoProductosSinDescuento();
        this.calcularMontoTotal();

    }

    // Metodo mostrar por pantalla el pedido registrado
    mostrarPedido(){
        alert("Pedido registrado \n"+this.cantidadRemeras+" Remeras $"+this.montoRemeras+"\n"+this.cantidadPantalones+" Pantalones $"+this.montoPantalones+"\n"+this.cantidadZapatillas+" Zapatillas $"+this.montoZapatillas+"\nTOTAL: $"+this.montoTotal);
    }
    
}

// Clase de carrito
class Carrito{

    // Atributos donde se guarda la cantidad de productos que se van a comprar
    constructor() {

        // La primera posicion pertenece a los teclados, la segunda a los mouses y la tercera a los monitores.
        // Por cuestiones de tiempo no lo pude hacer mas entendible, pero lo mejorare
        this.contProductos = [0,0,0];
    }
    
    // Metodo para agregar productos al carrito
    agregarAlCarrito(){
        do {

            // Muestra de precios y opciones de compra
            let compra = prompt("PRECIOS: \n1. Remera: $3000 \n2. Pantalon: $2500 \n3. Zapatilla: $22000 \nQue desea comprar? Ej. Para comprar Remeras ingrese el 1");
            let cantidad;
    
            // Acumuladores por cada producto
            switch (compra) {
                // Remeras
                case "1":
                    cantidad = parseInt(prompt("Cuantos Remeras quiere comprar?"));
                    if (cantidad && (cantidad >= 0)) {
                        this.contProductos[0] = this.contProductos[0] + cantidad;
                        alert("Usted ha agregado "+cantidad+" Remeras a su carrito");
                    } else {
                        alert("El dato ingresado no es valido")
                    }
                    
                    break;
                // Pantalones
                case "2":
                    cantidad = parseInt(prompt("Cuantos Pantalones quiere comprar?"));
                    if (cantidad && (cantidad >= 0)) {
                        this.contProductos[1] = this.contProductos[1] + cantidad;
                        alert("Usted ha agregado "+cantidad+" Pantalones a su carrito");
                    } else {
                        alert("El dato ingresado no es valido")
                    }
                    
                    break;
                // Zapatillas
                case "3":
                    cantidad = parseInt(prompt("Cuantos Zapatillas quiere comprar?"));
                    if (cantidad && (cantidad >= 0)) {
                        this.contProductos[2] = this.contProductos[2] + cantidad;
                        alert("Usted ha agregado "+cantidad+" Zapatillas a su carrito");
                    }else{
                        alert("El dato ingresado no es valido")
                    }
                    
                    break;
                // Mensaje de dato mal cargado
                default:
                    alert("El dato ingresado no coincide con ningun producto en nuestra lista");
                    break;
            }
    
            // Muesta de productos en carrito
            alert("Lista de productos en carrito: \n"+this.contProductos[0]+" Remeras \n"+this.contProductos[1]+" Pantalones \n"+this.contProductos[2]+" Zapatillas");            
            
        } while (confirm("Quiere agregar mas cosas al carrito?"))
    }

}


let bigBoxWith = document.getElementById("realizar-pedido");

bigBoxWith.addEventListener('click', (e) => {
    realizarPedido();
});

function realizarPedido() {

    // Saludo al cliente
    alert("Buenas! Somos una tienda de ropa \n \nA continuacion le mostramos nuestra lista de precios");

    // Recordatorio de descuentos cada 3 productos
    alert("Le recordamos que tenemos una PROMOCION \nCada 3 de un mismo producto usted tendra un 15% de descuento sobre esos 3");

    // Agregando productos al carrito
    const carrito = new Carrito();
    carrito.agregarAlCarrito();

    // Mostrando pedido resgistrado1
    const pedido = new Pedido(carrito.contProductos);
    pedido.confirmarPedido();
    console.log(pedido);

    // Despedida
    alert("Gracias por comprar adios!");

    // Muestra de pedido por pantalla
    let presupuesto = document.getElementById("presupuesto");
    let contenidoPedido = document.createElement("div");
    contenidoPedido.innerHTML = "<h4 class='padding-presupuesto'>Pedido registrado</h4> <br>"+pedido.cantidadRemeras+" remeras $"+pedido.montoRemeras+"<br>"+pedido.cantidadPantalones+" pantalones $"+pedido.montoPantalones+"<br>"+pedido.cantidadZapatillas+" zapatillas $"+pedido.montoZapatillas+"<br><strong>TOTAL:</strong> $"+pedido.montoTotal;
    presupuesto.appendChild(contenidoPedido);

} */


let urlCatalogo = "stock.json";

$(document).ready(function (e) { 

    $.getJSON(urlCatalogo,
        function (catalogo, estado) {
            
            if (estado === "success") {
                for (const prenda of catalogo){
                    
                  /* Pintado productos */
                  $('#catalogo').append(
                    `                    
                    <!-- Card 1 y card 2 -->
                    <div class="card">
        
                        <!-- Card 1 -->
                        <div class="recuadro-cards card-1">
        
                            <!-- Contenedor imagen -->
                            <div class="container-imagen">
                                <img class="imagen" src="${prenda.img}" alt="${prenda.producto}">
                            </div>
                            <!-- Fin contentedor imagen -->
        
                            <!-- Contenedor descripcion -->
                            <div class="container-precio">
        
                                <!-- Precio -->
                                <p class="precio"> <strong>$${prenda.precio}</strong></p>
        
                                <!-- Estado en stock -->
                                <p class="estado-stock"><strong>${prenda.estado}</strong></p>    
        
                            </div>
                            <!-- Fin contenedor descripcion -->
        
                        </div>
                        <!-- Fin card 1 -->
        
                        <!-- Card 2 -->
                        <div class="recuadro-cards card-2">
        
                            <!-- contenedor descripcion y formulario -->
                            <div class="container-imagen descripcion">
                                
                                <!-- Descripcion -->
                                <p>Abgrigo Grande Hombre</p>
                                <!-- Fin decripcion -->
        
                                <!-- Formulario -->
                                <form method="POST" action="enviar2.php">
                                    
                                    <!-- Seleccion de talle -->
                                    <label class="talle" for="talle">Talle</label>
                                    <section class="opciones">
                                        <div><input type="radio" name="talle-xs" value="xs" id="talle"> XS</div>
                                        <div><input type="radio" name="talle-s" value="s" id="talle"> S</div>
                                        <div><input type="radio" name="talle-m" value="m" id="talle"> M</div>
                                        <div><input type="radio" name="talle-l" value="l" id="talle"> L </div>
                                        <div><input type="radio" name="talle-xl" value="xl" id="talle"> XL</div>
                                        <div><input type="radio" name="talle-xxl" value="xxl" id="talle"> XXL</div>
                                    </section>
                                    <!-- Fin seleccion de talle -->
        
                                    <!-- Datos del cliente -->
                                    <section class='datos-de-cliente'>
                                        <label for="nombre">Nombre</label> 
                                        <input type="text" name="nombre" id="nombre" placeholder="Nombre"> 
                                        <label for="email-cliente">Email</label>
                                        <input type="email" name="email-cliente" id="email-cliente" placeholder="Email">
                                    </section>
                                    <!-- Fin datos del cliente -->
        
                                </form>
                                <!-- Fin formulario -->
        
                            </div>
                            <div class="reserva">
                                
                                <a tabindex="0" class="btn btn-dark " role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="bottom" title="Reservado!" data-bs-content="Ya hemos recibido tu reserva, acercate a la tienda con tu nombre y correo electronico para retirar tu pedido">RESERVAR</a>
                    
                            </div>
        
                        </div>
                        <!-- Fin card 2 -->
        
                    </div>
                    <!-- Fin card 1 y card 2 -->
                    `
                  );
    
                };
            };
        }
    );
    
});