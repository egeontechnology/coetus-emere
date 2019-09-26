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
});