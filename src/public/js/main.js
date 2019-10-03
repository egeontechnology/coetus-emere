// Procesa los datos de la llamada a AJAX
function procesa_datos_recibidos(data, status, accion, datos){
    switch(accion){
        case 'cargarCategorias':
            $('#categorias').html(data);
            $('.producto').click(function(){
                let datosEnviados = {
                    idGrupo: sessionStorage.getItem('idGrupo'),
                    idCategoria : this.id
                };
                send_post('cargarProductosCategorias', datosEnviados);
                $('#tituloCategoriaModal').html($(this).children().children().eq(1).html())
            });
            break;
        case 'cargarCestas':
            $('#tiposcesta').html(data);
            $('.cesta').off('click').on('click', function() {
                let idCesta = 'idCesta='+this.id;
                send_post('cargarProductosCestas', idCesta)
                // Se hereda la foto y título del div que dispara el modal
                $('#tituloCestaModal').html(($(this).children().children().eq(1).children().eq(0).html()));
                $('#fotoCestaModal').children().attr('src',$(this).children().children().eq(0).attr('src'));
                $('.btnComprar').attr('id', this.id).off('click').on('click',function(){
                    let datos = {
                        idProducto : this.id,
                        cantidad: 1,
                        idUsuario : sessionStorage.getItem('idUsuario'),
                    }
                    send_post('comprarProducto', datos);
                });
            });
            break;
        case 'comprarProducto':
            if (data =='ok') {
                swal("¡Producto añadido a tu carrito!", "", "success")
            };
            break;
        case 'cargarProductosCestas':
            console.log(data);
            $('#productosCestasModal').html(data);
            break;
        case 'cargarProductosCategorias':
            $('#articulosCesta').html(data);
            // Funcionalidades de botones
            // Incrementa en 1 el input de cantidad
            $('.btnmas').click(function(){
                let temp= $(this).siblings().eq(1).attr('value');
                let precioUnidad = $(this).parent().siblings().eq(2).children().html();
                temp++;
                let totalProducto = temp * precioUnidad;
                $(this).siblings().eq(1).attr('value', temp);
                $(this).parent().siblings().eq(3).children().children().html(totalProducto);
            });
            // Disminuye en 1 el input de cantidad
            $('.btnmenos').click(function(){
                let temp= $(this).siblings().eq(0).attr('value');
                let precioUnidad = $(this).parent().siblings().eq(2).children().html();
                if (temp > 0) {temp--};
                let totalProducto = temp * precioUnidad;
                $(this).siblings().eq(0).attr('value', temp);
                $(this).parent().siblings().eq(3).children().children().html(totalProducto);
            });
            break;
        case 'login':
            console.log(data)
            if(data=='ko'){
                console.log('contraseña incorrecta');
            } else {
                dataLogin = JSON.parse(data);
                sessionStorage.setItem('login', true);
                sessionStorage.setItem('idUsuario', dataLogin[0].idUsuario);
                sessionStorage.setItem('nombre', dataLogin[0].nombre);
                sessionStorage.setItem('apellidos', dataLogin[0].apellidos);
                sessionStorage.setItem('rol', dataLogin[0].rol);
                sessionStorage.setItem('idGrupo', dataLogin[0].idGrupo);
                sessionStorage.setItem('img', dataLogin[0].img);
                window.location.href = "services.html";
            }
            break;
        case 'cargarCarrito':
            $('#articulosCesta').html(data.carrito);
            $('#totalPedido').html(data.totalPedido);
            $('#nArticulos').html(data.contItems);
            $('.delete').click(function(){
                $(this).parent().parent().remove();
                let datos = {
                    idLinea :$(this).parent().parent().attr('id'),
                }
                send_post('eliminarLinea', datos);
            });
            $('#vaciarcesta').off('click').on('click', function(){
                $('#articulosCesta').remove();
                let datos = {
                    idUsuario : sessionStorage.getItem('idUsuario'),
                }
                send_post('eliminarCarrito', datos);
                send_post('cargarCarrito', datos)
            });
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

// Login/Registro Modal
function ValidarEmail(userName) {
    var m = /\w+@\w+\.+[a-z]/;

    if (userName.match(m)) {
        $("#checkuser").css("visibility", "visible");
        $("#wronguser").css("visibility", "hidden");
    } else {
        $("#wronguser").css("visibility", "visible");
        $("#checkuser").css("visibility", "hidden");

    }
};


function ValidarPassword(userPass) {
    var m = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{6,})$/;

    if (userPass.match(m)) {
        $("#checkpass").css("visibility", "visible");
        $("#wrongpass").css("visibility", "hidden");
    } else {
        $("#wrongpass").css("visibility", "visible");
        $("#checkpass").css("visibility", "hidden");
    }
};

function ValidarEmailRegistro(userName_Reg) {
    var m = /\w+@\w+\.+[a-z]/;

    if (userName_Reg.match(m)) {
        $("#checkuser_2").css("visibility", "visible");
        $("#wronguser_2").css("visibility", "hidden");
    } else {
        $("#wronguser_2").css("visibility", "visible");
        $("#checkuser_2").css("visibility", "hidden");

    }
};

function ValidarPasswordRegistro(userPass_Reg) {
    var m = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{6,})$/;

    if (userPass_Reg.match(m)) {
        $("#checkpassreg").css("visibility", "visible");
        $("#wrongpassreg").css("visibility", "hidden");
    } else {
        $("#wrongpassreg").css("visibility", "visible");
        $("#checkpassreg").css("visibility", "hidden");
    }
};

function ValidarPasswordRegistro2(userPass_Reg2) {
    var m = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{6,})$/;

    if (userPass_Reg2.match(m)) {
        $("#checkpassreg2").css("visibility", "visible");
        $("#wrongpassreg2").css("visibility", "hidden");
    } else {
        $("#wrongpassreg2").css("visibility", "visible");
        $("#checkpassreg2").css("visibility", "hidden");
    }
};

function ValidarNombre(userNombre) {
    var m = /^([a-z ñáéíóú]{3,30})$/;

    if (userNombre.match(m)) {
        $("#checkNombre").css("visibility", "visible");
        $("#wrongNombre").css("visibility", "hidden");
    } else {
        $("#wrongNombre").css("visibility", "visible");
        $("#checkNombre").css("visibility", "hidden");
    }
};

function ValidarApellidos(userApellido) {
    var m = /^([a-z ñáéíóú]{5,60})$/;

    if (userApellido.match(m)) {
        $("#checkApellido").css("visibility", "visible");
        $("#wrongApellido").css("visibility", "hidden");
    } else {
        $("#wrongApellido").css("visibility", "visible");
        $("#checkApellido").css("visibility", "hidden");
    }
};


$("boton").click(function(event) {
$(".form_reg")[0].reset();
});


$(document).ready(function(){
    $('#botonLogin').click(()=>{
        datosLogin = 'user='+$('#userName').val()+'&pass='+CryptoJS.SHA3($('#userPass').val(),{ outputLength: 512 });
        send_post('login', datosLogin);
    })
    if(sessionStorage.getItem('login')=='true'){
        $('.loged').css('display','inline-block')
        $('#loginIcon').attr('data-toggle', '').attr('data-target', '').attr('href','profile.html')
    }
});