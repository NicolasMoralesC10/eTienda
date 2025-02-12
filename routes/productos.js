// rutas para consumir el modulo de productos del SERCIVIO ECOMMERCE

const express = require("express");
const router = express.Router();

// instanciamos el controlador correspondiente
const productoCtr = require("../controllers/productos");

// rutas que entregara el modulo productos

router.get("/producto/listartodos", productoCtr.listartodos);
router.post("/producto/nuevo", productoCtr.nuevo);
// .....
module.exports = router;
