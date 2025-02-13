// rutas para consumir el modulo de productos del SERCIVIO ECOMMERCE

const express = require("express");
const router = express.Router();

// instanciamos el controlador correspondiente
const usuarioCtr = require("../controllers/usuarios");

// rutas que entregara el modulo productos

router.get("/usuarios/listartodos", usuarioCtr.listartodos);
/* router.post("/usuario/nuevo", usuarioCtr.nuevo);
router.get("/usuario/buscarxid/:id", usuarioCtr.buscarxid);
router.delete("/usuario/borrarxid/:id", usuarioCtr.borrarxid);
router.put("/usuario/actualizarxid/:id", usuarioCtr.actualizarxid); */
// .....
module.exports = router;
