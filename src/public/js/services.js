if(!sessionStorage.getItem('idGrupo')) window.location.href = 'nogroup.html'


// Se cargan las cestas. Pendiente que la condición sea el grupo al que pertence
let idGrupo = 'idGrupo='+sessionStorage.getItem('idGrupo');
send_post('cargarCategorias', idGrupo);
send_post('cargarCestas', idGrupo);


$(document).ready(function(){
    $('#comprarProducto').off('click').on('click', function(){
        let productosCategoria = $('#articulosCesta').children();
        for (index = 0 ; index < productosCategoria.length ; index++){
            let cantidad = $('#articulosCesta').children().eq(index).children().eq(3).children().eq(1).val();
            if (cantidad != 0) {
                let id = $('#articulosCesta').children().eq(index).attr('id');
                let datos = {
                    idProducto: id,
                    cantidad: cantidad,
                    idUsuario : sessionStorage.getItem('idUsuario'),
                    };
                send_post('comprarProducto', datos);
            }
        }
    })
});