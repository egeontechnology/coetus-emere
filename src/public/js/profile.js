// Se esconden todas las ventas(apartados) al cargar el documento
$('.profileInfo').hide();
// Se carga la página con el apartado 1 mostrado
$('#apart1').show();

// Datos de pefil
$('#imgPerfil').attr('src',sessionStorage.getItem('img'))
$('#nombreApellidosUser').html(sessionStorage.getItem('nombre')+" "+sessionStorage.getItem('apellidos'))

// Pedidos
let user = { user : sessionStorage.getItem('idUsuario')}
if (sessionStorage.getItem('rol')==('Consumidor') || sessionStorage.getItem('rol')==('Ambos')){
    send_post('cargarPedidos', user);
}
if(sessionStorage.getItem('rol')==('Productor') || sessionStorage.getItem('rol')==('Ambos')){
    send_post('cargarMisProductos', user);
    send_post('cargarEstadisticas', user);
}

if(sessionStorage.getItem('rol')==('Productor')){
    $('.cons').css('display','none');
}
if(sessionStorage.getItem('rol')==('Consumidor')){
    $('.prod').css('display','none');
}

// Datos perfil
$('#nombreUser p').html(sessionStorage.getItem('nombre'))
$('#nombreUser input').attr('value', sessionStorage.getItem('nombre'))

$('#apellidosUser p').html(sessionStorage.getItem('apellidos'))
$('#apellidosUser input').attr('value', sessionStorage.getItem('apellidos'))

$('#emailUser p').html(sessionStorage.getItem('email'))
$('#emailUser input').attr('value', sessionStorage.getItem('email'))

$('#direccionUser p').html(sessionStorage.getItem('direccion'))
$('#direccionUser input').attr('value', sessionStorage.getItem('direccion'))

$('#cpUser p').html(sessionStorage.getItem('cp'))
$('#cpUser input').attr('value', sessionStorage.getItem('cp'))


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

    // Editar datos perfil
    $('#editarBtn').off('click').on('click', function(){
        $('.edit').css('display','inline-block')
        $('.show').css('display','none')
    })
    $('#cancelarBtn').off('click').on('click', function(){
        $('.show').css('display','inline-block')
        $('.edit').css('display','none')
    })


    // Pedidos
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

    // Añadir prod nuevo
    $('#enviarNuevoProd').off('click').on('click', function(e){
        e.preventDefault()
        let img = $('#imgProd').prop('files')
        let datos = $('#nuevoProdForm').serialize();
        send_post('nuevoProd', datos)
    })
})
