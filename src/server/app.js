const express = require('express');
const app = express();
const mysql = require('mysql');


// Se crea ruta de archivos estáticos
app.use("/", express.static("./../public"));

// Se añade funcionalidad para interpretar JSON
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


//Conecta con la base de datos
var con = mysql.createConnection({
    host: "localhost",
	user: "root",
	password: "1234",
	database : "coetus-emere",
});

con.connect((err) => {
    if (err) throw err;
	console.log('¡Conectado a la base de datos!');
});


// Consultas a la base de datos
app.get('cargarCestas', (cond, cestas)=>{
    console.log('Se cargan las cestas con la condición WHERE idGrupo='+cond);
		
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
    });
});

app.post('/cargarCategorias', (req, res) =>{
    // Accesi al valor del objeto
    const cond = req.body.id
    console.log('Se cargan todas las categorias WHERE '+cond);

    // Se inicia variable cestas
    let categoria = "";
		
    con.query("SELECT c.idCategoria, c.Nombre FROM `coetus-emere`.tcategorias c join `coetus-emere`.tproductos p on c.idCategoria = p.idCategoria join `coetus-emere`.tusuarios u on u.idUsuario = p.idProveedor where "+cond+" group by c.Nombre;", function (err, result, fields) {
        // console.log('sql='+result)
        if (err) throw err;

        
        // Bucle para generar las categorias del grupo
        for(var i=0; i<result.length; i++){
            categoria += '<div class="col-2 producto mt-1" id="'+result[i].idCategoria+'"><a href="" data-toggle="modal" data-target="#modalCategoria">';
            categoria += '<div id="marco">'
            // categoria += '<img src="'+result[i].img+'">'
            categoria += '</div>';
            categoria += '<div id="texto">'+result[i].Nombre+'</div></a></div>';
        }
        console.log('categorias creadas');
        res.send(categoria);
    });
})

// Se configura el puerto del servidor 
const server = app.listen(8080);