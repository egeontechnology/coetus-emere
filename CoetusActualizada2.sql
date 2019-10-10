CREATE DATABASE  IF NOT EXISTS `coetus-emere` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `coetus-emere`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: coetus-emere
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblog`
--

DROP TABLE IF EXISTS `tblog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblog` (
  `idPublicacion` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `contenido` longtext,
  `etiquetas` varchar(45) DEFAULT NULL,
  `validacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPublicacion`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `autor` FOREIGN KEY (`idUsuario`) REFERENCES `tusuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblog`
--

LOCK TABLES `tblog` WRITE;
/*!40000 ALTER TABLE `tblog` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tcategorias`
--

DROP TABLE IF EXISTS `tcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tcategorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `idPadre` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tcategorias`
--

LOCK TABLES `tcategorias` WRITE;
/*!40000 ALTER TABLE `tcategorias` DISABLE KEYS */;
INSERT INTO `tcategorias` VALUES (1,'Leche y derivados',NULL,NULL),(2,'Carne, pescado y huevos',NULL,NULL),(3,'Arroces, legumbres y frutos secos',NULL,NULL),(4,'Verduras y hortalizas',NULL,NULL),(5,'Frutas',NULL,NULL),(6,'Pan, pasta y cereales',NULL,NULL),(7,'Mantecas y aceites',NULL,NULL),(8,'Bebidas con alcohol',NULL,NULL),(9,'Cafés, tés y zumos',NULL,NULL),(10,'Productos para el desayuno',NULL,NULL),(11,'Cosmética y productos de limpieza',NULL,NULL);
/*!40000 ALTER TABLE `tcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tcestasproductos`
--

DROP TABLE IF EXISTS `tcestasproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tcestasproductos` (
  `idCesta` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `Cantidad` varchar(45) DEFAULT NULL,
  KEY `idProducto_idx` (`idProducto`),
  CONSTRAINT `idProductoFK` FOREIGN KEY (`idProducto`) REFERENCES `tproductos` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tcestasproductos`
--

LOCK TABLES `tcestasproductos` WRITE;
/*!40000 ALTER TABLE `tcestasproductos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tcestasproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tfacturas`
--

DROP TABLE IF EXISTS `tfacturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tfacturas` (
  `idFactura` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date DEFAULT NULL,
  `idPedido` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `idPedido_idx` (`idPedido`),
  CONSTRAINT `idPedidoFK` FOREIGN KEY (`idPedido`) REFERENCES `tpedidos` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tfacturas`
--

LOCK TABLES `tfacturas` WRITE;
/*!40000 ALTER TABLE `tfacturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tfacturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tgrupos`
--

DROP TABLE IF EXISTS `tgrupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tgrupos` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `Localidad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tgrupos`
--

LOCK TABLES `tgrupos` WRITE;
/*!40000 ALTER TABLE `tgrupos` DISABLE KEYS */;
INSERT INTO `tgrupos` VALUES (1,'Madrid'),(2,'Barcelona');
/*!40000 ALTER TABLE `tgrupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiva`
--

DROP TABLE IF EXISTS `tiva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiva` (
  `idIVA` int(11) NOT NULL AUTO_INCREMENT,
  `Porcentaje` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idIVA`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiva`
--

LOCK TABLES `tiva` WRITE;
/*!40000 ALTER TABLE `tiva` DISABLE KEYS */;
INSERT INTO `tiva` VALUES (1,'21'),(2,'10'),(3,'4');
/*!40000 ALTER TABLE `tiva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tlineaspedido`
--

DROP TABLE IF EXISTS `tlineaspedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tlineaspedido` (
  `idLinea` int(11) NOT NULL AUTO_INCREMENT,
  `idPedido` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` varchar(45) DEFAULT NULL,
  `descuento` varchar(45) DEFAULT NULL,
  `precio unitario` varchar(45) DEFAULT NULL,
  `precio total` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idLinea`),
  KEY `idPedido_idx` (`idPedido`),
  KEY `idProducto_idx` (`idProducto`),
  CONSTRAINT `idPedido` FOREIGN KEY (`idPedido`) REFERENCES `tpedidos` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `idProducto` FOREIGN KEY (`idProducto`) REFERENCES `tproductos` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tlineaspedido`
--

LOCK TABLES `tlineaspedido` WRITE;
/*!40000 ALTER TABLE `tlineaspedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `tlineaspedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpedidos`
--

DROP TABLE IF EXISTS `tpedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpedidos` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `tusuarios` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpedidos`
--

LOCK TABLES `tpedidos` WRITE;
/*!40000 ALTER TABLE `tpedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tproductos`
--

DROP TABLE IF EXISTS `tproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tproductos` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` longtext,
  `img` varchar(45) DEFAULT NULL,
  `precio` varchar(45) DEFAULT NULL,
  `stock` varchar(45) DEFAULT NULL,
  `temporada` varchar(45) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idIva` int(11) DEFAULT NULL,
  `Tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `idProveedor_idx` (`idUsuario`),
  KEY `idIva_idx` (`idIva`),
  KEY `idCategoria_idx` (`idCategoria`),
  CONSTRAINT `idCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `tcategorias` (`idCategoria`),
  CONSTRAINT `idIva` FOREIGN KEY (`idIva`) REFERENCES `tiva` (`idIVA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `idProveedor` FOREIGN KEY (`idUsuario`) REFERENCES `tusuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tproductos`
--

LOCK TABLES `tproductos` WRITE;
/*!40000 ALTER TABLE `tproductos` DISABLE KEYS */;
INSERT INTO `tproductos` VALUES (1,'Huevos ecológicos 1/2',NULL,NULL,'2,70','15',NULL,2,1,3,'Producto'),(2,'Huevos ecológicos docena',NULL,NULL,'5,20','20',NULL,2,1,3,'Producto'),(3,'Pan hogaza multicereales con semillas 500 gr',NULL,NULL,'2,80','10',NULL,6,1,3,'Producto'),(4,'Cornflakes Bio 500gr',NULL,NULL,'2,60','14',NULL,6,1,3,'Producto'),(5,'Galletas María de espelta y naranja 250 gr',NULL,NULL,'2,10','12',NULL,10,1,3,'Producto'),(6,'Café ecológico en grano Bolsa 1 Kg',NULL,NULL,'16','13',NULL,9,1,3,'Producto'),(7,'Copos integrales de avena  500 gr',NULL,NULL,'1,60','8',NULL,6,1,3,'Producto'),(8,'Mermelada 4 frutas Bio 370 gr',NULL,NULL,'3','16',NULL,10,1,3,'Producto'),(9,'Paté vegetal tofu y finas hierbas ',NULL,NULL,'2,30','12',NULL,10,1,3,'Producto'),(10,'Miel de tomillo 500 gr',NULL,NULL,'5','14',NULL,10,1,3,'Producto'),(11,'Leche semidesnatada ecológica 1 litro',NULL,NULL,'2','20',NULL,1,1,3,'Producto'),(12,'Leche entera ecológica 1 litro',NULL,NULL,'1,80','30',NULL,1,1,3,'Producto'),(13,'Yogur con arándano Bio 500 gr ',NULL,NULL,'3','14',NULL,1,1,3,'Producto'),(14,'Yogur con frambuesa Bio 500 gr',NULL,NULL,'3','8',NULL,1,1,3,'Producto'),(15,'Zumo de zanahoria Sana Potum 700 ml',NULL,NULL,'3','12',NULL,9,1,3,'Producto'),(16,'Zumo de manzana Sana Potum 700 ml',NULL,NULL,'2','14',NULL,9,1,3,'Producto'),(17,'Zumo de tomate Sana Potum 700 ml',NULL,NULL,'2','15',NULL,9,1,3,'Producto'),(18,'Zumo de granada Sana Potum 700 ml',NULL,NULL,'3,20','7',NULL,9,1,2,'Producto'),(19,'Zumo de uva Sana Potum 700 ml',NULL,NULL,'3,70','4',NULL,9,1,3,'Producto'),(20,'Cesta de zumos Bio Sana Potum','Lote de 6 botellas de 700 ml que incluye los siguientes sabores: zanahoria, manzana y kiwi, pera y limón, tomate, granada, y pera.',NULL,'16','10',NULL,NULL,1,3,'Cesta'),(21,'Cesta desayuno básico','Incluye: huevos ecológicos 1/2; pan hogaza multicereales con semillas 500 gr; cornflakes Bio 500 gr; galletas María de espelta y naranja 250 gr; leche entera ecológica 2 litros; y mermelada 4 frutas Bio 370 gr.',NULL,'17','14',NULL,NULL,1,3,'Cesta'),(22,'Cesta desayuno deluxe','Incluye: huevos ecológicos docena; pan hogaza multicereales con semillas 500 gr; cornflakes Bio 500 gr; café ecológico en grano bolsa 500 gr; mermelada 4 frutas Bio 370 gr; miel de tomillo 500 gr; leche entera ecológica 4 litros; yogúr con arándano Bio 500 gr; y zumo de granada Sana Potum 700 ml. ',NULL,'36','12',NULL,NULL,1,3,'Cesta'),(23,'Cesta La Granjera Frutas y Verduras 10 Kg','Cesta mixta con 12 productos diferentes: 1 Kg tomates; 1 Kg cebollas; 1 Kg calabacín; 1 Kg peras; 1 Kg naranjas; 1 Kg patatas; 1 Kg plátanos; 1 Kg manzanas; 1 Kg zanahorias; 0,5 Kg lechuga; y 0,5 Kg puerro.',NULL,'30','18',NULL,NULL,2,3,'Cesta'),(24,'Cesta La Granjera Frutas 7-8 Kg','Incluye: 1 Kg manzanas; 1 kg peras; 1 Kg naranjas; 1 Kg plátanos; 1 Kg limones; 1 Kg pomelo; 1 Kg granada; y 1 Kg melón.',NULL,'24','20',NULL,NULL,2,3,'Cesta'),(25,'Cesta La Granjera Verduras 7-8 Kg','Incluye: 500 gr acelgas; 500 gr espinacas; 1 Kg tomates; 500 gr zanahorias; 1 Kg patatas; 1 Kg calabacín; 500 gr puerro; 300 gr lechuga; 800 gr judías verdes; y 1 Kg cebolla.',NULL,'24','24',NULL,NULL,2,3,'Producto'),(26,'Manzanas ecológicas La Granjera Bolsa 1 Kg',NULL,NULL,'2','13',NULL,5,2,3,'Producto'),(27,'Peras ecológicas La Granjera Bolsa 1 Kg',NULL,NULL,'2','10',NULL,5,2,3,'Producto'),(28,'Naranjas ecológicas La Granjera Bolsa 1 Kg',NULL,NULL,'2','8',NULL,5,2,3,'Producto'),(29,'Plátanos ecológicos La Granjera Bolsa 1 Kg',NULL,NULL,'3','9',NULL,5,2,3,'Producto'),(30,'Pomelo ecológico La Granjera Bolsa 1 Kg',NULL,NULL,'2,50','4',NULL,5,2,3,'Producto'),(31,'Limones ecológicos La Granjera Bolsa 1 Kg',NULL,NULL,'3',NULL,NULL,5,2,3,'Producto'),(32,'Lechuga batavia La Granjera',NULL,NULL,'5',NULL,NULL,4,2,3,'Producto'),(33,'Arándanos Bolsa 500 gr',NULL,NULL,'4',NULL,NULL,5,2,3,'Producto'),(34,'Acelgas ecológicas La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(35,'Espinacas ecológicas La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(36,'Col ecológica La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(37,'Lechuga ecológica La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(38,'Puerro ecológico La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(39,'Tomate ecológico La Granjera ',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(40,'Zanahorias ecológicas La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(41,'Patatas ecológicas La Granjera Bolsa 2 Kg',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(42,'Remolacha ecológica La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(43,'Brócoli ecológico La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(44,'Calabacín ecológico La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(45,'Cebolla ecológica La Granjera Bolsa 1 Kg',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(46,'Ajo blanco La Granjera Bolsa 500 gr',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(47,'Pepino ecológico La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(48,'Pimiento verde La Granjera',NULL,NULL,NULL,'5',NULL,4,2,3,'Producto'),(49,'Pimiento rojo La Granjera',NULL,NULL,NULL,'0',NULL,4,2,3,'Producto'),(50,'Berenjena ecológica La Granjera',NULL,NULL,NULL,NULL,NULL,4,2,3,'Producto'),(51,'Cesta Vinum Delicae','Incluye 5 botellas: Vino tinto bio Albert Ferrer 750 ml; vino blanco bio Albert Ferrer 750 ml; vino rosado ecológico familia Ferrer; vino tinto ecológico tempranillo familia Ferrer; y cava Brut Aldeu 750 ml bio.  ',NULL,'31','11',NULL,NULL,16,3,'Cesta'),(52,'Vino tinto bio Albert Ferrer 750 ml',NULL,NULL,'6','15',NULL,8,16,3,'Producto'),(53,'Vino rosado ECO Sergi Ferrer 750 ml',NULL,NULL,'30','3',NULL,8,16,3,'Producto'),(54,'Vino blanco bio Albert Ferrer 750 ml',NULL,NULL,'7','8',NULL,8,16,3,'Producto'),(55,'Licor de chocolate 20%vol 500 ml bio',NULL,NULL,'17','6',NULL,8,16,3,'Producto'),(56,'Vino blanco ecológico verdejo familia Ferrer',NULL,NULL,'4','10',NULL,8,16,3,'Producto'),(57,'Vino rosado ecológico familia Ferrer',NULL,NULL,'5','10',NULL,8,16,3,'Producto'),(58,'Vino tinto ecológico tempranillo familia Ferrer',NULL,NULL,'9','9',NULL,8,16,3,'Producto'),(59,'Cava Brut Aldeu 750 ml bio',NULL,NULL,'8','6',NULL,8,16,3,'Producto'),(60,'Champagne Bio Toulouse ',NULL,NULL,'32','2',NULL,8,16,3,'Producto'),(61,'Champagne Bio Marguet',NULL,NULL,'36','4',NULL,8,16,3,'Producto'),(62,'Cesta Coetus Emere Premium',NULL,NULL,'68','8',NULL,NULL,17,3,'Cesta'),(63,'Pistacho en cáscara tostado Coetus 500 gr',NULL,NULL,'16','4',NULL,3,17,3,'Producto'),(64,'Arándanos sin azúcar Coetus 125 gr',NULL,NULL,'4,25','8',NULL,3,17,3,'Producto'),(65,'Avellanas bio Coetus 100 gr',NULL,NULL,'3,10','14',NULL,3,17,3,'Producto'),(66,'Almendras bio Coetus 100 gr',NULL,NULL,'3,50','7',NULL,3,17,3,'Producto'),(67,'Bayas de Goji Coetus 125 gr',NULL,NULL,'5,40','5',NULL,3,17,3,'Producto'),(68,'Arroz integral redondo Coetus 1 Kg',NULL,NULL,'4,50','23',NULL,3,17,3,'Producto'),(69,'Arroz integral largo Coetus 1 Kg',NULL,NULL,'5','17',NULL,3,17,3,'Producto'),(70,'Guisantes bio Coetus 2 Kg',NULL,NULL,'6,80','13',NULL,3,17,3,'Producto'),(71,'Judia pinta bio Coetus 500 gr',NULL,NULL,'2,80','10',NULL,3,17,3,'Producto'),(72,'Garbanzos bio Coetus 500 gr',NULL,NULL,'2,30','11',NULL,3,17,3,'Producto'),(73,'Lentejas bio Coetus 500 gr',NULL,NULL,'2,80','8',NULL,3,17,3,'Producto'),(74,'Alubia roja bio Coetus 500 gr',NULL,NULL,'2,40','6',NULL,3,17,3,'Producto'),(75,'Aceite de oliva virgen extra Coetus 500 ml',NULL,NULL,'6','25',NULL,7,17,3,'Producto'),(76,'Aceite vegetal de aguacate Coetus 300 ml',NULL,NULL,'9,40','7',NULL,7,17,3,'Producto'),(77,'Aceite de oliva extra Coetus garrafa 2 L',NULL,NULL,'20','16',NULL,7,17,3,'Producto'),(78,'Vinagre de manzana balsámico Coetus 300 ml',NULL,NULL,'4','13',NULL,7,17,3,'Producto'),(79,'Apio verde ecológico Coetus 1 Kg',NULL,NULL,'2,95',NULL,NULL,4,17,3,'Producto'),(80,'Berenjena negra Coetus 1 Kg',NULL,NULL,'2,80',NULL,NULL,4,17,3,'Producto'),(81,'Hinojo ecológico Coetus 1 Kg',NULL,NULL,'4,70',NULL,NULL,4,17,3,'Producto'),(82,'Lechuga maravilla Coetus 1 ud',NULL,NULL,'1,90',NULL,NULL,4,17,3,'Producto'),(83,'Zanahorias Chantenay 1 Kg',NULL,NULL,'2,70',NULL,NULL,4,17,3,'Producto'),(84,'Tomate en rama Coetus 1 Kg',NULL,NULL,'2,80',NULL,NULL,4,17,3,'Producto'),(85,'Tomate cherry ecológico Coetus bandeja 250 gr',NULL,NULL,'1,60',NULL,NULL,4,17,3,'Producto'),(86,'Espárragos verdes Coetus manojo de 250 gr',NULL,NULL,'4,50',NULL,NULL,4,17,3,'Producto'),(87,'Calabaza cacahuete Coetus 1 Kg',NULL,NULL,'3,50',NULL,NULL,4,17,3,'Producto'),(88,'Col lombarda ecológica Coetus 1 ud',NULL,NULL,'5',NULL,NULL,4,17,3,'Producto'),(89,'Batatas ecológicas Coetus 1 Kg',NULL,NULL,'3',NULL,NULL,4,17,3,'Producto'),(90,'Col repollo ecológica Coetus 1 ud',NULL,NULL,'3,50',NULL,NULL,4,17,3,'Producto'),(91,'Calabacín ecológico Coetus 1 Kg',NULL,NULL,'2,40',NULL,NULL,4,17,3,'Producto'),(92,'Cebollas ecológicas Coetus 1 Kg',NULL,NULL,'3,50',NULL,NULL,4,17,3,'Producto'),(102,'Pimientos verdes eco Coetus 1 Kg',NULL,NULL,'3,50',NULL,NULL,4,17,3,'Producto'),(103,'Pimientos rojos eco Coetus 1 Kg',NULL,NULL,'4,50',NULL,NULL,4,17,3,'Producto'),(104,'Patatas blancas eco Coetus 1 Kg',NULL,NULL,'2,20',NULL,NULL,4,17,3,'Producto'),(105,'Cesta Coetus Emere Básica ',NULL,NULL,'40','32',NULL,NULL,17,2,'Cesta'),(106,'Cesta Nettoyage','Cesta mixta de productos para el cuidado personal y la limpieza del hogar:',NULL,NULL,NULL,NULL,11,18,2,'Cesta'),(107,'Tónico Termal Claro de Luna bio 50 ml',NULL,NULL,'11,20',NULL,NULL,11,18,2,'Producto'),(108,'Jabón con aceite de árbol del té  Nature',NULL,NULL,'2,30',NULL,NULL,11,18,2,'Producto'),(109,'Gel hidratante baba de caracol con aloe 250 ml',NULL,NULL,'12,40',NULL,NULL,11,18,2,'Producto'),(110,'Vela panal 3,8 x 10 cm Nature',NULL,NULL,'3,56',NULL,NULL,11,18,2,'Producto'),(111,'Jabón natural Aloe vera Nature 100 g',NULL,NULL,'2,44',NULL,NULL,11,18,NULL,'Producto'),(112,'Aceite de árbol del té 10ml Nature',NULL,NULL,'4,16',NULL,NULL,11,18,NULL,'Producto'),(113,'Crema para callosidades y grietas árbol del té Nature',NULL,NULL,'10,50',NULL,NULL,11,18,NULL,'Producto'),(114,'Crema exfoliante con baba de caracol Nature',NULL,NULL,'8,36',NULL,NULL,11,18,NULL,'Producto'),(115,'Gel higiene íntima (con manzanilla y caléndula)',NULL,NULL,'6,40',NULL,NULL,11,18,NULL,'Producto'),(116,'Crema facial hidratante bio 50 ml olivaolivae',NULL,NULL,'18,24',NULL,NULL,11,18,NULL,'Producto'),(117,'Aceite corporal Alcohol de romero Madreselva 500 ml',NULL,NULL,'11,35',NULL,NULL,11,18,NULL,'Producto'),(118,'Jabón natural Algas Nature 100 g',NULL,NULL,'2,43',NULL,NULL,11,18,NULL,'Producto'),(119,'Champú y gel de ducha relajante con Sándalo',NULL,NULL,'11,68',NULL,NULL,11,18,NULL,'Producto'),(120,'Calmante para picaduras y quemaduras bio Nature 10 ml',NULL,NULL,'7,80',NULL,NULL,11,18,NULL,'Producto'),(121,'Spray bucal de própolis bio 20 ml',NULL,NULL,'5,40',NULL,NULL,11,18,NULL,'Producto'),(122,'Papel armenia Nature (antiséptico ambiental)',NULL,NULL,'3,70',NULL,NULL,11,18,NULL,'Producto'),(123,'Bolsas de basura compostables 49L ',NULL,NULL,'6,80',NULL,NULL,11,18,NULL,'Producto');
/*!40000 ALTER TABLE `tproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsuscripcion`
--

DROP TABLE IF EXISTS `tsuscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsuscripcion` (
  `idsuscripcion` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`idsuscripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsuscripcion`
--

LOCK TABLES `tsuscripcion` WRITE;
/*!40000 ALTER TABLE `tsuscripcion` DISABLE KEYS */;
INSERT INTO `tsuscripcion` VALUES (1,'albertorodriguez@gmail.com'),(2,'pedroexperience@hotmail.com'),(3,'edu@protonmail.com'),(4,'canallita@gmail.com');
/*!40000 ALTER TABLE `tsuscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tusuarios`
--

DROP TABLE IF EXISTS `tusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tusuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  `Apellidos` varchar(45) DEFAULT NULL,
  `DNI` varchar(9) DEFAULT NULL,
  `Telefono` varchar(9) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Codigo postal` int(11) DEFAULT NULL,
  `Datos bancarios` varchar(45) DEFAULT NULL,
  `Rol` varchar(45) DEFAULT NULL,
  `idGrupo` int(11) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idGrupo_idx` (`idGrupo`),
  CONSTRAINT `idGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `tgrupos` (`idGrupo`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tusuarios`
--

LOCK TABLES `tusuarios` WRITE;
/*!40000 ALTER TABLE `tusuarios` DISABLE KEYS */;
INSERT INTO `tusuarios` VALUES (1,'Juan Antonio','Corral Serra','17437877J','771108031','juanancorralserra@gmail.com','calle Falsa 123',28055,'ES8790009086165788011137','Ambos',1,NULL,NULL),(2,'Ariadna','Franco Martos','46835515V','755475794','4qgik9nyn@btinternet.com','calle Inventada 36',28010,'ES4730987123078496598614','Productor',1,NULL,NULL),(3,'Marcelino','Romera Muñoz','91093834B','796143907','3mohbwmof@techie.com','calle del Tintorete 28',28010,'ES1520760652456698708323','Consumidor',1,NULL,NULL),(4,'Antonio','Juarez Cardenas','95366662Z','647417292','nzlfkgih@mail.com','Plaza de Tordesillas 12',41014,'ES7431831098296363013407','Consumidor',1,NULL,NULL),(5,'Guadalupe','Chamorro Pavon','95654162Z','757827518','8f1g7ywn3@iname.com','calle de las Hermanas Descalzas 43',41020,'ES7512369010865678692486','Consumidor',1,NULL,NULL),(6,'Guillermo','Agudo Villalba','45192693Q','706042132','x3ymiz2dv@blu.it','Paseo Trepollassin, 169A 20ºC',8031,'ES8430844191872200574995','Consumidor',1,NULL,NULL),(7,'Mariano','Heras Cuadrado','67510510J','685565068','spgl9ldzk@gmail.com','Paseo Ronda de la Trinidads, 64A',41009,'ES7000619616724185931226','Consumidor',1,NULL,NULL),(8,'Felipe','Exposito Fernandez','23397352G','665187334','phqx8ti369@hotmail.co.uk','Carrer Esbotifarrat Xaragallan, 238A 12ºA',8904,'ES3720866711011632849039','Consumidor',1,NULL,NULL),(9,'Miriam','Soria Hernandez','90794370F','731614015','mir459@aim.com','Calle Salivi, 51A',46035,'ES4130542298342778570418','Consumidor',1,NULL,NULL),(10,'Remedios','Palomo Cruz','60904908B','633168333','remepalomo@whoever.com','Carrera Alicatat femeller, 158B 15ºH',46008,'ES1100106463916125616675','Consumidor',1,NULL,NULL),(11,'Alfonso','Roig Garcia','71943486S','696062199','alfonsoroig@msn.com','Glorieta Despecegada Antunes, 219A 10ºD',46003,'ES8321067406688491246221','Consumidor',1,NULL,NULL),(12,'Francisco Manuel','Esteban Moyano','97966223T','722118977','ubggvv1f4@blu.it','Paseo de Extremadura, 123 1ºA',28011,'ES5400738286955782793362','Consumidor',1,NULL,NULL),(13,'Lorena','Aragon Blazquez','01804186C','793439894','3n5zbdiey@blu.it','Calle de las Trinitarias, 47 2ºB',8026,'ES2502004748491740569025','Consumidor',1,NULL,NULL),(14,'Caridad','Aguado Saavedra','53174009X','630593783','g8chlc2n@iname.com','Plaza Eixalbares Euskalerria, 72A 11ºC',48008,'ES6901246225398536343932','Consumidor',1,NULL,NULL),(15,'Lucas','Abad Aguilera','19896009C','750656922','3x2t3e8cvx@gmail.com','Cuesta Geldí, 210B 19ºG',8011,'ES5204882695648991678854','Consumidor',1,NULL,NULL),(16,'Aida','Iglesias Cerezo','15216950N','778686324','j5n5zlir8@blu.it','Glorieta Etxeberria, 104 17ºC',48012,'ES9031295728779252312511','Productor',2,NULL,NULL),(17,'Florentina','Piñero Ibañez','00000336Z','627958726','florentina_43@hotmail.com','Cuesta de Cristobal Colón, 28 1ºC',41030,'ES4800819170679203367846','Productor',2,NULL,NULL),(18,'Filomena','Diaz Correa','59607260T','717498319','filomena_95@yahoo.es','Cuesta Horno, 75',23924,'ES5531601481457233821374','Ambos',2,NULL,NULL),(19,'Kevin','Garzon Cabezas','90892169X','678960570','kevingarca@gmail.com','Camino Iglesia, 84',17858,'ES3300016056624571443692','Consumidor',2,NULL,NULL),(20,'Emma','Villar Salcedo','94575980A','643722156','emmavillar@hotmail.com','Corredera Pedralbes, 27',41016,'ES2314975111819469739426','Consumidor',2,NULL,NULL),(21,'Joaquin','Paniagua Paz','73545115Q','780635978','joaquin_69@hotmail.com','Paseo Nueva, 62',45105,'ES5202249272472584479957','Consumidor',2,NULL,NULL),(22,'Adam','Arroyo Freire','12862483D','720853236','adamfreire@gmail.com','Paseo de España, 61',43142,'ES8101980019826286733097','Consumidor',2,NULL,NULL),(23,'Meritxell','Yeste Arnaiz','51602053N','622461253','meritxellmorenika@yahoo.es','Via Iglesia, 29 3ºA',48010,'ES8811648805280278495447','Consumidor',2,NULL,NULL),(24,'Laura','Escribano Romero','25479092Z','787365195','lauramadrid@hotmail.com','Cuesta de España, 18 1ºD',46480,'ES6000310877182676165021','Consumidor',2,NULL,NULL),(25,'Pau','Paredes Gallardo','91546678P','790744721','pau_gallardo@gmail.com','Avenida Nueva, 49 Bajo Izq',46766,'ES7530720388549478789412','Consumidor',2,NULL,NULL),(26,'Urzaiz','Rojas Alba','08865655Y','703929118','urzaizbilbo@hotmail.com','Pasaje Mayor, 42',48015,'ES6331028698218461869078','Consumidor',2,NULL,NULL),(27,'Vasile','Navas Pobeda','37148679E','608001297','vasile_45@hotmail.com','Pasaje Nueva, 19',48017,'ES5700092844920394041299','Consumidor',2,NULL,NULL),(28,'Patxi','Belmonte Uribe','60685485P','684623812','patxibelmon@gmail.com','Rua Madrid, 13 2º Dcha',8030,'ES5320543254108001945271','Consumidor',2,NULL,NULL),(29,'Igor','Pereira Amador','19431944A','735507381','igorpereira44@hotmail.com','Gran Via Ilgesia, 65',17239,'ES5320532679069621265022','Consumidor',2,NULL,NULL),(30,'Macarena','Sola Vazquez','54658622L','603777912','macavazquez@yahoo.es','Paseo Real, 20 Bajo ',23040,'ES2511648492153089188263','Consumidor',2,NULL,NULL);
/*!40000 ALTER TABLE `tusuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-10 12:28:05
