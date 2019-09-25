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

function procesa_datos_recibidos(data, status, accion, datos){
    switch(accion){
        case 'cargarCestas':
            $('#tiposcesta').html(data);
            break;
$(document).ready(function(){
    function send_post(accion, datos){
    }
});