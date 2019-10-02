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
    $('#apart6Btn').click(()=>{
        $('.profileInfo').hide();
        $('#apart6').show();
    })
});

//Aparecen los input para editar los datos personales
function editar(nombre,apellidos,calle,provincia,localidad,cp,cuenta,btnEditar){
    nombre.innerHTML = "<input type='text' name='nombre'/>";
    apellidos.innerHTML = "<input type='text' name='apellidos'/>";
    calle.innerHTML = "<input type='text' name='calle'/>";
    provincia.innerHTML = "<input type='text' name='provincia'/>";
    localidad.innerHTML = "<input type='text' name='apellidos'/>";
    cp.innerHTML = "<input type='text' name='apellidos'/>";
    cuenta.innerHTML = "<input type='text' name='apellidos'/>";
    document.getElementById('btnEditar').style.display = 'none';
    document.getElementById('btnGuardar').style.display = 'block';
    document.getElementById('btnCancelar').style.display = 'block';    
}

//Validación de formularios
function valemail(email){
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (! emailRegex.test(email) && emailRegex.length != 0){
        swal("Error", "El correo electrónico no cumple el formato predefinido (xxxxxxxxxx@xxxxx.com)", "warning");
        document.getElementsByClassName("cambioEmail").focus();
    }
}
