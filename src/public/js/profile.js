// Se esconden todas las ventas(apartados) al cargar el documento
$('.profileInfo').hide();
// Se carga la página con el apartado 1 mostrado
$('#apart1').show();

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
});