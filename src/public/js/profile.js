// Se esconden todas las ventas(apartados) al cargar el documento
$('.profileInfo').hide();
// Se carga la página con el apartado 1 mostrado
$('#apart1').show();

// Datos de pefil


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
function cargarDatos (){
    $('#imgPerfil').attr('src',sessionStorage.getItem('img'))
    $('#nombreApellidosUser').html(sessionStorage.getItem('nombre')+" "+sessionStorage.getItem('apellidos'))
    
    $('#nombreUser p').html(sessionStorage.getItem('nombre'));
    $('#nombreUser input').attr('value', sessionStorage.getItem('nombre'));
    
    $('#apellidosUser p').html(sessionStorage.getItem('apellidos'));
    $('#apellidosUser input').attr('value', sessionStorage.getItem('apellidos'));
    
    $('#emailUser p').html(sessionStorage.getItem('email'));
    $('#emailUser input').attr('value', sessionStorage.getItem('email'));
    
    $('#direccionUser p').html(sessionStorage.getItem('direccion'));
    $('#direccionUser input').attr('value', sessionStorage.getItem('direccion'));
    
    $('#cpUser p').html(sessionStorage.getItem('cp'));
    $('#cpUser input').attr('value', sessionStorage.getItem('cp'));
}

if (sessionStorage.getItem('idGrupo')==1){
    $('#grupoUser p').html('Madrid')
}else if(sessionStorage.getItem('idGrupo')==2){
    $('#grupoUser p').html('Barcelona')
}else{
    $('#grupoUser p').html('')
}

$('#grupoSelect option[value='+sessionStorage.getItem('idGrupo')+']').attr("selected",true);

cargarDatos()

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
    // Datos personales
    $('#editarBtn').off('click').on('click', function(){
        $('.edit').css('display','inline-block')
        $('.show').css('display','none')
    })
    $('#cancelarBtn').off('click').on('click', function(){
        $('.show').css('display','inline-block')
        $('.edit').css('display','none')
    })
    $('#cambiosBtn').off('click').on('click', function(){
        let datos = "user="+sessionStorage.getItem('idUsuario')+"&"+$('#perfilForm').serialize();
        send_post('cambiarDatosPersonales', datos)
    })
    // Contraseña
    $('#cambioPassBtn').off('click').on('click', function(){
        if ($('#pass1').val()!=$('#pass2').val()){
            $('#cambiarPass input').css('border','1px solid red');
            $('#cambiarPass p').html('Las contraseñas no coinciden').css('color','red')
        }else{
            $('#cambiarPass input').css('border','1px solid #ced4da');
            $('#cambiarPass p').html('<br>');
            let datos = 'user='+sessionStorage.getItem('idUsuario')+'&pass='+CryptoJS.SHA3($('#pass1').val(),{ outputLength: 512 });
            send_post('cambiarPass',datos);
        }
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
            send_post('cargarPedidos', user)
        }
    })

    // Añadir prod nuevo
    $('#enviarNuevoProd').off('click').on('click', function(e){
        let datos = $('#nuevoProdForm').serialize()+"&user="+sessionStorage.getItem('idUsuario');
        send_post('nuevoProd', datos)
    })

    // Subir foto
    $('#fotoSubiendo').change(function(){
        console.log('llega')
        $.ajax({
            type: "POST",
            url: 'upload', 
            data: new FormData($('#uploadForm')[0]),
            cache: false,
            contentType: false,
            processData: false,
            success: 
                function(data, status){
                    $('#fotoSubida').val(data);
                    $('#fotoCorrecta').css('display', 'inline-block')
                },
            error: 
                function(err) {
                    console.log( "error " + err.status + ' ' + err.statusText)
                },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                        value: e.loaded,
                        max: e.total,
                        });
                    }
                    }, false);
                }
                return myXhr;
                }
            });
    });	

    $('#fotoSubiendo2').change(function(){
        $.ajax({
            type: "POST",
            url: 'upload2', 
            data: new FormData($('#uploadForm2')[0]),
            cache: false,
            contentType: false,
            processData: false,
            success: 
                function(data, status){
                    $('#fotoSubida2').val(data);
                    $('#fotoCorrecta2').css('display', 'inline-block')
                },
            error: 
                function(err) {
                    console.log( "error " + err.status + ' ' + err.statusText)
                },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                        value: e.loaded,
                        max: e.total,
                        });
                    }
                    }, false);
                }
                return myXhr;
                }
            });
    })

    
})
