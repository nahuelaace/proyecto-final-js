/* arreglo auxiliar donde se guarda el pedido */
let arrayPedido = [];
/* contador de productos pedidos */
let contadorProductos = 1;
/* catalogo completo */
let urlCatalogo = "stock.json";

/* Ejecucion */
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

                                <a id="btn-${prenda.id}" tabindex="0" class="btn btn-dark" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="bottom">COMPRAR</a>

                            </div>

                        </div>
                        <!-- Fin card 2 -->

                    </div>
                    <!-- Fin card 1 y card 2 -->
                    `
                  );
                  /* Fin pintado de productos */


                    /* Agregado de producto al Carrito por boton de compra*/
                    $(`#btn-${prenda.id}`).click(function (e) {
                        
                        /* Animacion de agregado al carrito */
                        $('.mostrar-carrito').fadeOut(200, ()=>{
                            
                        $('.mostrar-carrito').fadeIn(200)
                                             .fadeOut(200)
                                             .fadeIn(200)
                                             .fadeOut(200)
                                             .fadeIn(200);
            
                        });
                        /* Fin animacion */
            
                        /* Armado del pedido */
                        /* Guardamos id del producto */
                        let productoSeleccionadoId = parseInt(prenda.id);
                        
                        /* Buscamos en el catalogo el producto con el mismo id y lo guardamos en una variable */
                        let productoElegido = catalogo.find(producto => producto.id === productoSeleccionadoId)
                        
                        /* Guardamos los datos en un nuevo objeto */
                        let pedido = new ProductoPedido(contadorProductos, productoElegido.producto, productoElegido.img, productoElegido.precio);
                        
                        /* Agregamos al array de pedido */
                        arrayPedido.push(pedido);
                        
                        /* Guardado del pedido actualizado en el Local Storage */
                        localStorage.setItem('pedido', JSON.stringify(arrayPedido))
            
                        /* Pintado producto seleccionado en el carrito */
                        /* Busqueda de producto en catalogo */
                        let productoSeleccionado = catalogo.find(producto => producto.id === prenda.id);
                        
                        /* Control de escritura en el carrito, para evitar desborde de productos, maximo 20 productos mostrados */
                        if (JSON.parse(localStorage.getItem('contador')) < 20) {
                            $('#grilla-de-compra').append(
                                `      
                                <div class="item-carrito" id='item-carrito'>
                                    <img class="img-carrito" src="${productoSeleccionado.img}" alt="">
                                    <p class="">${productoSeleccionado.producto}</p>
                                    <p>$${productoSeleccionado.precio}</p> 
                                </div>
                                `   
                            )
                        } 

                        /* Advertencia de muestra maxima en carrito */
                        if (JSON.parse(localStorage.getItem('contador')) == 19) {
                            alert('El maximo de productos para mostrar en carrito es de 20, si sigue agregando se seguiran acumulando pero no se mostraran');
                        }
                        
                        /* Actualizacion de contador en local storage */
                        localStorage.setItem('contador', JSON.stringify(contadorProductos))
                        contadorProductos++;
                        
                        total = 0;
                        
                        /* monto total de compra */
                        arrayPedido.map(suma => total += suma.precio)
                        $('#total-carrito').html(`
                    
                          ${parseInt(total*1.21)}
                    
                        `);
                    });

                    

                };
            };
        }
    );
    

    /* Tra??da de datos del Local Storage */
    let pedido = JSON.parse(localStorage.getItem('pedido'))
    
    /* Seteo de carrito de compras para cuando el carrito ya ha sido cargado anteriormente */
    if (pedido != null) {
        
        contadorProductos = JSON.parse(localStorage.getItem('contador'))
            
        for (const productoPedido of pedido) {
            
            /* Seteo de arreglo auxiliar */
            arrayPedido.push(productoPedido)
            
            /* Pintado de productos en carrito */
            $('#grilla-de-compra').append(
                `      
                <div class="item-carrito">
                    <img class="img-carrito" src="${productoPedido.img}" alt="">
                    <p class="">${productoPedido.producto}</p>
                    <p>$${productoPedido.precio}</p>
                </div>
                `
            );

        }
        
        /* Seteo de monto total */
        pedido.map(suma => total += suma.precio)
    
        $('#total-carrito').html(`
                        
            ${parseInt(total*1.21)}

        `);
        
        contadorProductos++;
    }
});



/* Boton muestra de carrito */
$('#mostrar-carrito').click(function (e) { 
    
    $('#carrito').fadeIn(100);
    $('#mostrar-carrito').fadeOut(100);

});
/* Fin boton muestra de carrito */

/* Boton salir del carrito */
$('#salir-carrito').click(function (e) { 
    
    $('#carrito').fadeOut(100);
    $('#mostrar-carrito').fadeIn(100);

});
/* Fin boton salir de carrito */

/* Boton vaciar carrito */
$('#vaciar-carrito').click(function (e) { 
    
    /* Reset de acumuladores y local storage */
    localStorage.setItem('pedido',null)
    localStorage.setItem('contador',null)
    arrayPedido = [];
    contadorProductos = 1;
    /* Fin reset */

    /* Reset de carrito */
    let itemsABorrar = document.getElementById('grilla-de-compra');
    itemsABorrar.parentNode.removeChild(itemsABorrar);

    $('#contenedor-grilla').append(
        `      
        <section id="grilla-de-compra">

        </section>
        `
    );
    $('#total-carrito').html(`
                    
        0

    `);
    /* Fin reset de carrito */
});
/* Fin boton vaciar carrito */




  
