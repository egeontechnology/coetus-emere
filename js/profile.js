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
    nombre.innerHTML = "<input type='text' class='form-control' name='nombre' id='nombre'/>";
    apellidos.innerHTML = "<input type='text' class='form-control' name='apellidos' id='apellidos'/>";
    calle.innerHTML = "<input type='text' class='form-control' name='calle' id='calle'/>";
    provincia.innerHTML = "<input type='text' class='form-control' name='provincia' id='provincia'/>";
    localidad.innerHTML = "<input type='text' class='form-control' name='localidad' id='localidad'/>";
    cp.innerHTML = "<input type='number' class='form-control' name='cp' id='cp'/>";
    cuenta.innerHTML = "<input type='number' class='form-control' name='numCuenta' id='numCuenta'>";
    document.getElementById('btnEditar').style.display = 'none';
    document.getElementById('btnGuardar').style.display = 'block';
    document.getElementById('btnCancelar').style.display = 'block';    
}


function guardar(){
//Ocultar boton guardar y cancelar, aparece boton editar
    document.getElementById('btnCancelar').style.display = 'none';
    document.getElementById('btnEditar').style.display = 'block';    
    document.getElementById('btnGuardar').style.display = 'none';
//Petición para guardar la info en la base de datos
//Petición para que aparezca la información correspondiente desde la base de datos
}

function cancelar(){
//Ocultar boton guardar y cancelar, aparece boton editar
    document.getElementById('btnCancelar').style.display = 'none';
    document.getElementById('btnEditar').style.display = 'block';    
    document.getElementById('btnGuardar').style.display = 'none';
}

//Validación de formularios
function valemail(email){
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (! emailRegex.test(email) && emailRegex.length != 0){
        console.log("Error", "El correo electrónico no cumple el formato predefinido (xxxxxxxxxx@xxxxx.com)", "warning");
        document.getElementById("changeEmail").focus();
        document.getElementById("btnSaveEmail").setAttribute("disabled","disabled");         
    }else{
        console.log("email ok");
//Se desbloquearía el botón de guardar tras comprobar que las contraseñas coinciden pero de momento no realizo dicha comprobación
        document.getElementById("btnSaveEmail").removeAttribute("disabled");
    }
}
