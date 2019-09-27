// Procesa los datos de la llamada a AJAX
function procesa_datos_recibidos(data, status, accion, datos){
    switch(accion){
        case 'cargarCategorias':
            $('#categorias').html(data);
            break;
        case 'login':
            if(data=='ko'){
                console.log('contraseña incorrecta');
            } else {
                data = JSON.parse(data);
                console.log(data);
            }
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
        // datosLogin = {
        //     user: $('#userName').val(),
        //     pass: CryptoJS.SHA3($('#userPass').val(),{ outputLength: 512 })
        // };
        datosLogin = 'user='+$('#userName').val()+'&pass='+CryptoJS.SHA3($('#userPass').val(),{ outputLength: 512 });
        send_post('login', datosLogin);
        console.log(datosLogin);
    })
});