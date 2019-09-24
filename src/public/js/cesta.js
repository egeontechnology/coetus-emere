$(document).ready(function(){
    $('#delete').click(function(){
        // $(this).parent().parent().remove();
        console.log('e')
    });
    $('#vaciarcesta').click(function(){
        $('#articulosCesta').remove();
    })
})