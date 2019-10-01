// Procesa los datos de la llamada a AJAX
function procesa_datos_recibidos(data, status, accion, datos){
    switch(accion){
        case 'cargarCategorias':
            $('#categorias').html(data);
            $('.producto').click(function(){
                // let idGrupo = 'idGrupo='+sessionStorage.getItem('idGrupo');
                // let idCategoria = 'idCategoria='+this.id;
                let datosEnviados = {
                    idGrupo: sessionStorage.getItem('idGrupo'),
                    idCategoria : this.id
                };
                send_post('cargarProductosCategorias', datosEnviados);
                $('#tituloCategoriaModal').html($(this).children().children().eq(1).html())
            });
            break;
        case 'cargarCestas':
            $('#tiposcesta').html(data);
            $('.cesta').off('click').on('click', function() {
                let idCesta = 'idCesta='+this.id;
                send_post('cargarProductosCestas', idCesta)
                // Se hereda la foto y título del div que dispara el modal
                $('#tituloCestaModal').html(($(this).children().children().eq(1).children().eq(0).html()));
                $('#fotoCestaModal').children().attr('src',$(this).children().children().eq(0).attr('src'));
                $('.btnComprar').attr('id', this.id).off('click').on('click',function(){
                    let datos = {
                        idProducto : this.id,
                        cantidad: 1,
                        idUsuario : sessionStorage.getItem('idUsuario'),
                    }
                    send_post('comprarProducto', datos);
                });
            });
            break;
        case 'comprarProducto':
            if (data =='ok') {
                swal("¡Producto añadido a tu carrito!", "", "success")
            };
            break;
        case 'cargarProductosCestas':
            console.log(data);
            $('#productosCestasModal').html(data);
            break;
        case 'cargarProductosCategorias':
            $('#articulosCesta').html(data);
            // Funcionalidades de botones
            // Incrementa en 1 el input de cantidad
            $('.btnmas').click(function(){
                let temp= $(this).siblings().eq(1).attr('value');
                let precioUnidad = $(this).parent().siblings().eq(2).children().html();
                temp++;
                let totalProducto = temp * precioUnidad;
                $(this).siblings().eq(1).attr('value', temp);
                $(this).parent().siblings().eq(3).children().children().html(totalProducto);
            });
            // Disminuye en 1 el input de cantidad
            $('.btnmenos').click(function(){
                let temp= $(this).siblings().eq(0).attr('value');
                let precioUnidad = $(this).parent().siblings().eq(2).children().html();
                if (temp > 0) {temp--};
                let totalProducto = temp * precioUnidad;
                $(this).siblings().eq(0).attr('value', temp);
                $(this).parent().siblings().eq(3).children().children().html(totalProducto);
            });
            break;
        case 'login':
            if(data=='ko'){
                console.log('contraseña incorrecta');
            } else {
                dataLogin = JSON.parse(data);
                sessionStorage.setItem('login', true);
                sessionStorage.setItem('idUsuario', dataLogin[0].idUsuario);
                sessionStorage.setItem('nombre', dataLogin[0].nombre);
                sessionStorage.setItem('apellidos', dataLogin[0].apellidos);
                sessionStorage.setItem('rol', dataLogin[0].rol);
                sessionStorage.setItem('idGrupo', dataLogin[0].idGrupo);
                sessionStorage.setItem('img', dataLogin[0].img);
                window.location.href = "services.html";
            }
            break;
        case 'cargarCarrito':
            $('#articulosCesta').html(data.carrito);
            $('#totalPedido').html(data.totalPedido);
            $('#nArticulos').html(data.contItems);
            $('.delete').click(function(){
                $(this).parent().parent().remove();
            });
            $('#vaciarcesta').click(function(){
                $('#articulosCesta').remove();
            });
            break;
    }
}

// Función base para las llamadas al servidor
function send_post(accion, datos){
    $.ajax({
        type: "POST",
        url: accion, 
        data: datos,
        success: 
            function(data, status){
                procesa_datos_recibidos(data, status, accion, datos);
            },
        error: 
            function(err) {
                console.log( "error " + err.status + ' ' + err.statusText);
            }
    });					
}	

$(document).ready(function(){
    $('#botonLogin').click(()=>{
        datosLogin = 'user='+$('#userName').val()+'&pass='+CryptoJS.SHA3($('#userPass').val(),{ outputLength: 512 });
        send_post('login', datosLogin);
    })
});