var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesController")

//creacion
router.get("/create", moviesController.create);
router.post("/create", moviesController.store);

//lectura
router.get("/", moviesController.all);
router.get("/new", moviesController.estreno);
router.get("/recommended", moviesController.recomendadas);

/*buscar*/
router.get("/search", moviesController.busqueda);
router.post("/search", moviesController.search);

//detalle
router.get("/detail/:id", moviesController.detail)

//actualizacion
router.get("/edit/:id", moviesController.edit)
router.post("/edit/:id", moviesController.change)

//borrado
router.post("/delete/:id", moviesController.delete)

module.exports = router; 
