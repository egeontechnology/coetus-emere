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


// Login en la aplicación
app.post('/login', (req, res) =>{
    // Acceso al valor del objeto
    const cond = req.body
    con.query("SELECT idUsuario, nombre, apellidos, rol, idGrupo, img FROM `coetus-emere`.tusuarios where Email='"+cond.user+"' AND Password='"+cond.pass+"';", function (err, result, fields) {
        if (err) throw err;
        if(result.length != 0) {
            resultado = JSON.stringify(result)
        } else {
            resultado = 'ko'
        }
        res.send(resultado);
    });
})


// Consultas a la base de datos
app.post('/cargarCestas', (req, res)=>{

    const cond = req.body.idGrupo
		
    // Se inicia variable cestas
    let cestas = "";

    con.query("SELECT p.idProducto, p.img, p.nombre, p.descripcion, p.precio FROM tproductos p join `coetus-emere`.tusuarios u on p.idUsuario = u.idUsuario WHERE tipo='cesta' AND u.idGrupo=" + cond, function (err, result, fields) {
        if (err) throw err;

        // Bucle para generar las cestas del grupo
        for(var i=0; i<result.length; i++){
            cestas += '<div class="col-4 cesta mt-5" id="'+result[i].idProducto+'"><a id="enlaceCesta" href="" data-toggle="modal" data-target="#modalCesta">';
            cestas += '<img src="'+result[i].img+'" class="img-fliud" alt="" />'
            cestas += '<div id="textocesta">'
            cestas += '<h4>'+result[i].nombre+'</h4>';
            cestas += '<p class="mt-2">'+result[i].descripcion+'</p>';
            cestas += '</div></a></div>';
        }	
        res.send(cestas);
    });
});

app.post('/cargarCategorias', (req, res) =>{
    // Acceso al valor del objeto
    const cond = req.body.idGrupo

    // Se inicia variable cestas
    let categoria = "";
		
    con.query("select c.nombre, c.idPadre, c.idCategoria from `coetus-emere`.tcategorias c	inner join (select p.idCategoria from tproductos p inner join (SELECT u.idUsuario FROM `coetus-emere`.tusuarios u where u.rol!='consumidor' and u.idGrupo="+cond+") x on p.idUsuario=x.idUsuario) y on c.idCategoria=y.idCategoria group by c.idCategoria;"
    , function (err, result, fields) {
        if (err) throw err;

        
        // Bucle para generar las categorias del grupo
        for(var i=0; i<result.length; i++){
            categoria += '<div class="col-2 producto mt-1" id="'+result[i].idCategoria+'"><a href="" data-toggle="modal" data-target="#modalCategoria">';
            categoria += '<div id="marco">'
            categoria += '<img src="'+result[i].img+'">'
            categoria += '</div>';
            categoria += '<div id="texto">'+result[i].nombre+'</div></a></div>';
        }
        res.send(categoria);
    });
});

app.post('/cargarProductosCestas', (req,res) => {
    // Acceso al valor del objeto
    const cond = req.body;

    //  Se inicia la variable productos
    let productos = "";

    con.query("SELECT p.nombre, cp.cantidad FROM `coetus-emere`.tcestasproductos cp inner join tproductos p on p.idProducto=cp.idProducto where cp.idCesta='"+cond.idCesta+"';", function (err, result, fields) {
        if (err) throw err;

        // Bucle para cargar todos los productos de la cesta
        for(var i=0; i<result.length; i++){
            productos += '<li>'+result[i].cantidad+' unidades de '+result[i].nombre+'</li>';
        }

        //Se devulve al cliente los productos
        res.send(productos);
    });
});

app.post('/cargarProductosCategorias', (req, res) => {
    // Acceso al valor del objeto
    const cond = req.body;

    //  Se inicia la variable productos
    let productos = "";

    // Consulta a la base de datos
    con.query("select p.idProducto, p.nombre, p.img, p.precio from tproductos p inner join (SELECT u.idUsuario FROM `coetus-emere`.tusuarios u where u.rol!='consumidor' and u.idGrupo="+cond.idGrupo+") x on p.idUsuario=x.idUsuario where p.idCategoria="+cond.idCategoria+";", function (err, result, fields) {
        if (err) throw err;

        // Bucle para cargar todos los productos de la cesta
        for(var i=0; i<result.length; i++){
            productos += '<div id='+result[i].idProducto+' class="articulo my-4 row">';    
            productos += '<div class="col-1" id="fotoArticulo"><img src="'+result[i].img+'" alt=""></div>';    
            productos += '<div class="col-4"><p>'+result[i].nombre+'</p><span class="infoPequeño">Precio: '+result[i].precio+'€ Unidades:2 <strong>Total:<span class="totalProducto"></span>€</strong></span></div>';    
            productos += '<div class="col-2 coste infoGrande"><span>'+result[i].precio+'</span> €</div>';    
            productos += '<div class="input-group mb-3 align-middle col-3" id="contadorcesta"><button class="btn btn-outline-secondary btnmenos">-</button><input class="form-control" type="numeric" value="0"><button class="btn btn-outline-secondary btnmas">+</button></div>';    
            productos += '<div class="col-2 coste infoGrande"><strong><span class="totalProducto">0</span> €</strong></div></div>';
        }

        //Se devulve al cliente los productos
        res.send(productos);
    });
});

app.post('/comprarProducto', (req,res)=>{
    // Acceso al valor del objeto
    const cond = req.body;

    // Se inicializa variable de respuesta
    let respuesta = "";
    // Se comprueba que no tiene un pedido pendiente
    con.query("SELECT idPedido FROM `coetus-emere`.tpedidos where idUsuario="+cond.idUsuario+" AND estado='pendiente';", function (err, result, fields) {
        if (err) throw err;
        // En caso de que tenga un pedido pendiente se usa añade a tlineapedido con el mismo idPedido
        if(result.length !== 0){
            con.query("INSERT INTO `coetus-emere`.`tlineaspedido` (`idPedido`, `idProducto`, `cantidad`, `descuento`) VALUES ('"+result[0].idPedido+"', '"+cond.idProducto+"', '"+cond.cantidad+"', '0');", function (err, result, fields) {
                if (err) throw err;
                respuesta = 'ok';
                res.send(respuesta);
            })
        // En caso de que no tenga un pedido pendiente
        }else{
            // Se crea un nuevo pedido
            con.query("INSERT INTO `coetus-emere`.`tpedidos` (`idUsuario`, `estado`) VALUES ('"+cond.idUsuario+"', 'pendiente');", function (err, result, fields) {
                if (err) throw err;
            });
            // Se busca el id del nuevo pedido
            con.query("SELECT idPedido FROM `coetus-emere`.tpedidos where idUsuario="+cond.idUsuario+" AND estado='pendiente';", function (err, result, fields) {
                if (err) throw err;

                //Se añade la cesta a ese Pedido pendiente
                con.query("INSERT INTO `coetus-emere`.`tlineaspedido` (`idPedido`, `idProducto`, `cantidad`, `descuento`) VALUES ('"+result[0].idPedido+"', '"+cond.idProducto+"', '1', '0');", function (err, result, fields) {
                    if (err) throw err;
                    respuesta = 'ok';
                    res.send(respuesta);
                })
            })
        };
    });
});

app.post('/cargarCarrito', (req, res) => {
    // Acceso al valor del objeto
    const cond = req.body;

    // Se inicializa variable de carrito, contador de items y totalPedido
    let carrito = "";
    let contItems = 0;
    let totalPedido = 0;

    con.query("SELECT p.idPedido, lp.cantidad, x.nombre, x.precio, x.img, lp.idLinea, lp.totalLinea FROM `coetus-emere`.tlineaspedido lp inner join tpedidos p  on p.idPedido=lp.idPedido inner join (select * from tproductos) x on x.idProducto = lp.idProducto where p.estado = 'pendiente' and p.idUsuario="+cond.idUsuario+";", function (err, result, fields) {
        if (err) throw err;

        for(var i=0; i<result.length; i++) {
            contItems++
            totalPedido += result[i].totalLinea
            carrito += '<div class="articulo my-4 row" id='+result[i].idLinea+'>';
            carrito += '<div class="col-1" id="fotoArticulo"><img src="'+result[i].img+'" alt=""></div>';
            carrito += '<div class="col-5"><p>'+result[i].nombre+'</p><span class="infoPequeño">Precio: '+result[i].precio+'€ Unidades:'+result[i].cantidad+' <strong>Total:'+result[i].totalLinea+'€</strong></span></div>';
            carrito += '<div class="col-2 coste infoGrande">'+result[i].precio+' €</div>';
            carrito += '<div class="col-2 coste infoGrande">'+result[i].cantidad+'</div>';
            carrito += '<div class="col-1 coste infoGrande"><strong>'+result[i].totalLinea+' €</strong></div>';
            carrito += '<div class="col-1"><img src="images/close.png" alt="" class="delete"></div></div>'
        }

        let rta = {
            carrito : carrito, 
            contItems : contItems,
            totalPedido : totalPedido
        }

        res.send(rta);
    })
})

app.post('/eliminarLinea', (req, res) => {
    // Acceso al valor del objeto
    const cond = req.body;

    // Query de MySQL
    con.query("DELETE FROM `coetus-emere`.`tlineaspedido` WHERE (`idLinea` = '"+cond.idLinea+"');", function (err, result, fields) {
        if (err) throw err;
    })
});

app.post('/eliminarCarrito', (req, res) => {
    // Acceso al valor del objeto
    const cond = req.body;

    // Query de MySQL
    con.query("delete lp FROM `coetus-emere`.`tlineaspedido` lp inner join tpedidos p on lp.idPedido=p.idPedido WHERE (`idUsuario` = "+cond.idUsuario+" AND `estado`='pendiente')", function (err, result, fields) {
        if (err) throw err;
    })
});

// Se configura el puerto del servidor 
const server = app.listen(8080);