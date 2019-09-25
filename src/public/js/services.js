// Procesa los datos de la llamada a AJAX
function procesa_datos_recibidos(data, status, accion, datos){
    switch(accion){
        case 'cargarCategorias':
            $('#categorias').html(data);
            break;
    }
}

// Se cargan las cestas. Pendiente que la condición sea el grupo al que pertence
send_post('cargarCategorias', '1')

$(document).ready(function(){
    // Al hacer click en la cesta el modal emplea el titulo y foto de su original
    $('.cesta').click(function(){
        $('#tituloCestaModal').html(($(this).children().children().eq(1).children().eq(0).html()));
        $('#fotoCestaModal').children().attr('src',$(this).children().children().eq(0).attr('src'));
    })

    // Al hacer click en la categoria el modal conserva el título del original
    $('.producto').click(function(){
        $('#tituloCategoriaModal').html($(this).children().children().eq(1).html())
        // console.log($(this).children().children().eq(1).html())
    })

    $('.btnmas .btnmenos').click(function(){
        console.log('e')
    });
});