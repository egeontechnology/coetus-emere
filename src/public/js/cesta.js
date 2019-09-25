$(document).ready(function(){
    $('.delete').click(function(){
        $(this).parent().parent().remove();
    });
    $('#vaciarcesta').click(function(){
        $('#articulosCesta').remove();
    })
})