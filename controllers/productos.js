// controlador para el manejo de los productos
// conectamos el controllador con su modelo corespondientes

let producto = require("../models/productos.js");

// toda la logica de un crud tipico listartodos, listarporid,crear,actualizar

const listartodos = async (req, res) => {
  try {
    // hacemos la consulta todos sin filtro

    let listaProductos = await producto.find().exec();
    res.status(200).send({
      exito: true,
      listaProductos,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

module.exports = {
  listartodos,
};
