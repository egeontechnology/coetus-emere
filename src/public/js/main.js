// Función base para las llamadas al servidor
function send_post(accion, datos){
    $.ajax({
        type: "GET",
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
    
    // Se cargan las cestas y categorías al iniciar la página
    send_post('cargarCategorias', 1)

    
});