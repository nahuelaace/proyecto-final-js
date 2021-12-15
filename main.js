let arrayPedido = [];
let contadorProductos = 1;

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

                                <a id="btn-${prenda.id}" tabindex="0" class="btn btn-dark" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="bottom">COMPRAR</a>

                            </div>

                        </div>
                        <!-- Fin card 2 -->

                    </div>
                    <!-- Fin card 1 y card 2 -->
                    `
                  );


                    /* Agregado de productos al Carrito */
                    $(`#btn-${prenda.id}`).click(function (e) { 
                        
                        
                        
                        /* Animacion de agregado al carrito */
                        $('.mostrar-carrito').fadeOut(200, ()=>{
                            
                        $('.mostrar-carrito').fadeIn(200)
                                             .fadeOut(200)
                                             .fadeIn(200)
                                             .fadeOut(200)
                                             .fadeIn(200);
            
                        });
            
                        /* Armado del pedido */
                        let productoSeleccionadoId = parseInt(prenda.id);
            
                        let productoElegido = catalogo.find(producto => producto.id === productoSeleccionadoId)
            
                        let pedido = new ProductoPedido(contadorProductos, productoElegido.producto, productoElegido.img, productoElegido.precio);
            
                        arrayPedido.push(pedido);
            
                        /* Guardado del predido al Local Storage */
                        localStorage.setItem('pedido', JSON.stringify(arrayPedido))
            
            
                        /* Pintado producto seleccionado al carrito */
                        let productoSeleccionado = catalogo.find(producto => producto.id === prenda.id);
                        
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
                        }else{
                            alert('Los productos se seguiran acumulando en el carrito pero solo se mostraran los primeros 20 pedidos');
                        }
                        
            
                        localStorage.setItem('contador', JSON.stringify(contadorProductos))
                        contadorProductos++;
            
                        total = 0;
            
                        arrayPedido.map(suma => total += suma.precio)
                        $('#total-carrito').html(`
                    
                        ${parseInt(total*1.21)}
                    
                        `);
                    });

                };
            };
        }
    );
    

    /* Traída de datos del Local Storage */
    let pedido = JSON.parse(localStorage.getItem('pedido'))
        
    if (pedido != null) {
  
      contadorProductos = JSON.parse(localStorage.getItem('contador'))
  
      for (const productoPedido of pedido) {
  
        arrayPedido.push(productoPedido)
  
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
  
      pedido.map(suma => total += suma.precio)
  
      $('#total-carrito').html(`
                    
        ${parseInt(total*1.21)}

    `);
  
      contadorProductos++;
    }
});




$('#mostrar-carrito').click(function (e) { 
    
    $('#carrito').fadeIn(100);
    $('#mostrar-carrito').fadeOut(100);

});

$('#salir-carrito').click(function (e) { 
    
    $('#carrito').fadeOut(100);
    $('#mostrar-carrito').fadeIn(100);

});


$('#vaciar-carrito').click(function (e) { 
    
    localStorage.setItem('pedido',null)
    localStorage.setItem('contador',null)
    let itemsABorrar = document.getElementById('grilla-de-compra');
    itemsABorrar.parentNode.removeChild(itemsABorrar);
    arrayPedido = [];
    contador = 1;
    $('#contenedor-grilla').append(
        `      
        <section id="grilla-de-compra">

        </section>
        `
    );
    $('#total-carrito').html(`
                    
        0

    `);
});




  
