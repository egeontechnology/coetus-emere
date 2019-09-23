"use strict"

function editarRRSS(facebook,instagram,twitter,youtube,linkedin,boton){
	boton.innerHTML = (boton.innerHTML == 'Guardar')? 'Editar' : 'Guardar';
	if(boton.innerHTML == 'Guardar'){
				facebook.innerHTML = "<form action=''><input type='text' name='facebook'/></form>";
				instagram.innerHTML = "<form action=''><input type='text' name='instagram'/></form>";
				twitter.innerHTML = "<form action=''><input type='text' name='twitter'/></form>";
				youtube.innerHTML = "<form action=''><input type='text' name='youtube'/></form>";
				linkedin.innerHTML = "<form action=''><input type='text' name='linkedin'/></form>";
		}else{
				facebook.innerHTML = "cambio";
				instagram.innerHTML = "cambio";
				twitter.innerHTML = "cambio";
				youtube.innerHTML = "cambio";
				linkedin.innerHTML = "cambio";
		}
}

function editarPago(tarj,date,cvv,btn){
	btn.innerHTML = (btn.innerHTML == 'Guardar')? 'Editar' : 'Guardar';
	if(btn.innerHTML == 'Guardar'){
				tarj.innerHTML = "<form action=''><input type='text' name='facebook'/></form>";
				date.innerHTML = "<form action=''><input type='text' name='instagram'/></form>";
				cvv.innerHTML = "<form action=''><input type='text' name='twitter'/></form>";
		}else{
				tarj.innerHTML = "cambio";
				date.innerHTML = "cambio";
				cvv.innerHTML = "cambio";	
	}
}