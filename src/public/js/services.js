// Se cargan las cestas. Pendiente que la condición sea el grupo al que pertence
let x = {id:1};
send_post('cargarCategorias', x);

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

    $('.btnmas').click(function(){
        console.log(this)
    });
});