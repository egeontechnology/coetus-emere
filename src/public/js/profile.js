// Se esconden todas las ventas(apartados) al cargar el documento
$('.profileInfo').hide();
// Se carga la página con el apartado 1 mostrado
$('#apart1').show();

// Datos de pefil
$('#imgPerfil').attr('src',sessionStorage.getItem('img'))

// Pedidos
let user = { user : sessionStorage.getItem('idUsuario')}
if (sessionStorage.getItem('rol')==('Consumidor') || sessionStorage.getItem('rol')==('Ambos')){
    send_post('cargarPedidos', user);
}
if(sessionStorage.getItem('rol')==('Productor') || sessionStorage.getItem('rol')==('Ambos')){
    send_post('cargarMisProductos', user);
    send_post('cargarEstadisticas', user);
}

// Estadísticas


$(document).ready(()=>{

    // Al hacer click en alguno de los links se ocultan todos y se muestra el seleccionado
    $('#apart1Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart1').show();
    })
    $('#apart2Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart2').show();
    })
    $('#apart3Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart3').show();
    })
    $('#apart4Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart4').show();
    })
    $('#apart5Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart5').show();
    })
    $('#repetirPedido').off('click').on('click',function(){
        let lineas = $(this).parent().siblings().eq(1).children();
        for (let i = 0; i < lineas.length ; i++){
            let producto = lineas.eq(i).children();
            datoLinea = {
                idUsuario : sessionStorage.getItem('idUsuario'),
                idProducto : producto.eq(0).attr('id'),
                cantidad : producto.eq(2).html(),
            }
            send_post('comprarProducto',datoLinea)
        }
    })
    $('#enviarNuevoProd').off('click').on('click', function(e){
        e.preventDefault()
        let img = $('#imgProd').prop('files')
        let datos = $('#nuevoProdForm').serialize();
        send_post('nuevoProd', datos)
    })
})
