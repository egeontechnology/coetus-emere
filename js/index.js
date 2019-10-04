function valemail(email){
	console.log("email");
   let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (! emailRegex.test(email) && emailRegex.length != 0){
        console.log("Error", "El correo electrónico no cumple el formato predefinido (xxxxxxxxxx@xxxxx.com)", "warning");
        document.getElementById("suscripcionEmail").focus();
        document.getElementById("btnSuscribir").setAttribute("disabled","disabled");

    }else{
    	document.getElementById("btnSuscribir").removeAttribute("disabled");
    	/*var result = document.getElementById("resultSubmit");
    	result.innerHTML = "email ok";*/	

    }
}

$('#suscripcion').on('submit',function(e){
			//Evita la ejecución del submit
			e.preventDefault(); 
			
				datos = $('#suscripcion').serialize();//Coge los campos del formulario
				console.log('suscribirEmail '+ datos);
				send_post('suscribirEmail', datos)		

			
			

		});

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

		function procesa_datos_recibidos(data, status, accion, datos){
			switch(accion){
				case 'suscribirEmail':
					if (data=='OK'){
						console.log("grabado");
					}else{
						console.log("error de grabado");
					}
					break;
				default:
					break;
			}
		}


//btnSuscribir
//function enviar()

//INSERT INTO `coetus-emere`.tsuscripcion(email) VALUES ('canallita@gmail.com');