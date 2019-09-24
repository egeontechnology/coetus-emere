// Carga los módulos empleados
var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');
var qs = require('querystring');

//Inicializa variables globales
var cond = '';

//Conecta con la base de datos
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database : 'practicas_eoi'
});

con.connect(function(err) {
	if (err) throw err;
	console.log('connected!');
});

//Crea el servidor web en el puerto 8080
http.createServer(function (req, res){

    var q = url.parse(req.url, true);

    //si no se ha especificado el archivo, toma index.html por defecto	
	if(q.pathname=='/'){
		q.pathname='/index.html';
    }
	
	// Actuamos en función del método (POST, GET)
	if (req.method != 'POST') {//Si el método no es POST, devuelve la página solicitada
		console.log('default '+'.' + q.pathname);	
		//lee el archivo especificado	
		fs.readFile('.'+q.pathname, function(err, data) {
			if (err) { // Si no eiste o se produce un error, lo indica
			  res.writeHead(404, {'Content-Type': 'text/html'});
			  res.write(q.pathname+' - error 404 - File not found');
			  res.end();
			}else{ // Si existe lo lee y lo envía
			  res.writeHead(200, {'Content-Type': 'text/html'});
			  res.write(data);
			  res.end();		  
			}
		});
				
	}else{//Si el método es POST, espera a recibir los datos
		//Cuando recibe los datos los convierte en string que usamos como condición de búsqueda
        req.on('data', function(chunk){
			//cond = chunk.toString();
			cond = chunk.toString();
			console.log('la condicion es: '+cond);
        })
		//Cuando termina de recibir los datos los procesa
        req.on('end', function(){
			//decide la acción en funcion de la url
			switch(q.pathname){
				case '/busca_alumnos':
					console.log('voy a buscar buscar alumnos con '+ cond);
					busca_alumnos(cond);
					break
				case '/actualiza_alumno':
					console.log('voy a actualizar el alumno '+ cond);
					actualiza_alumno(cond);
					break
				case '/inserta_alumno':
					console.log('voy a insertar el alumno '+ cond);
					inserta_alumno(cond);
					break

				/* Otras acciones que se necesiten*/
				default:
					break;
			}
        })	
	}

	// Se muestran los registros de la tabla de productos donde el tipo sea cesta y el id del cliente sea el mismo que el del productor de las 
	// cestas 
	// Se añadiran al div #tiposcesta
	function cargarCestas(cond){

		console.log('condición de busqueda mySQL es WHERE : '+cond);
		
		con.query("SELECT idProducto, img, Nombre, Descripcion FROM tproductos join `coetus-emere`.tusuarios u on idProducto = u.idUsuario WHERE tipo=cesta AND u.idUsuario=" + cond, function (err, result, fields) {
			if (err) throw err;

			// Se inicia variable cestas
			cestas = "";

			// Bucle para generar las cestas del grupo
			for(var i=0; i<result.length; i++){
				cestas += '<div class="col-4 cesta mt-5" id='+result[i].idProductos+'><a href="" data-toggle="modal" data-target="#modalCesta">';
				cestas += '<img src="'+result[i].img+'" class="img-fliud" alt="" />'
				cestas += '<div id="textocesta">'
				cestas += '<h4>'+result[i].Nombre+'</h4>';
				cestas += '<p class="mt-2">'+result[i].Descripcion+'</p>';
				cestas += '</div></a></div>';
			}

			//Devuelve la respusta información actualizada con éxito
			res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
			res.write(cestas);
			res.end();	
		});
	}


	// Carga las categorias de los productos del grupo al que pertenece
	// Se añade al div con #categorias
	function cargarCategorias(cond){
		
		console.log('condición de busqueda mySQL es WHERE : '+cond);
		
		con.query("SELECT Nombre FROM `coetus-emere`.tcategorias c join `coetus-emere`.tproductos p on c.idCategoria = p.idCategoria where p.idProveedor =  " + condicion, function (err, result, fields) {
			if (err) throw err;

			// Se inicia variable cestas
			categoria = "";
			
			// Bucle para generar las categorias del grupo
			for(var i=0; i<result.length; i++){
				categoria += '<div class="col-2 producto mt-1"><a href="" data-toggle="modal" data-target="#modalCategoria">';
				categoria += '<div id="marco">'
				categoria += '<img src="'+result[i].img+'">'
				categoria += '</div>';
				categoria += '<div id="texto">'+result[i].Nombre+'</div></a></div>';
			}
			
			//Devuelve la respusta información actualizada con éxito
			res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
			res.write(categoria);
			res.end();	
		});
	}

	// Carga los productos correspondiente a la cesta en la que se ha hecho click
	// #productosCestaModal
	function cargarProductosCesta(cond){

		console.log('condición de busqueda mySQL es WHERE : '+cond);
		
		con.query("SELECT Nombre FROM `coetus-emere`.tcestasproductos cp join tproductos p on cp.idProducto = p.idProducto WHERE tipo=cesta AND " + cond, function (err, result, fields) {
			if (err) throw err;

			// Se inicia variable cestas
			productos = "";

			// Bucle para generar los productos del grupo
			for(var i=0; i<result.length; i++){
				productos += '<li>'+result[i]+'</li>';
			}

			//Devuelve la respusta información actualizada con éxito
			res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
			res.write(productos);
			res.end();	
		});
	}


	// Carga los productos de la categoria cuando se abre el modal en #productosCestaModal
	// where el el grupo sea el mismo que el del usuario y la categoria la misma que la seleccionada
	function cargarProductosCategoria(cond){

		console.log('condición de busqueda mySQL es WHERE : '+cond);
		
		con.query("SELECT Nombre FROM `coetus-emere`.tproductos p join tusuarios u on p.idProveedor = u.idUsuario WHERE tipo=cesta AND " + cond, function (err, result, fields) {
			if (err) throw err;

			// Se inicia variable cestas
			productos = "";

			// Bucle para generar los productos del grupo
			for(var i=0; i<result.length; i++){
				productos += '<li>'+result[i]+'</li>';
			}

			//Devuelve la respusta información actualizada con éxito
			res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
			res.write(cestas);
			res.end();	
		});
	}
		
}).listen(8080); 