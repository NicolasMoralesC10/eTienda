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

const nuevo = async (req, res) => {
  // llega el objeto en el boddy del request
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    marca: req.body.marca,
    precio: req.body.precio,
    existencia: req.body.existencia,
    rating: req.body.rating,
    numRevisiones: req.body.numRevisiones,
    estaOfertado: req.body.estaOfertado,
  };
  try {
    // instancia del modelo producto (collection)
    const productoNuevo = new producto(datos);
    productoNuevo.save(); // * Este metodo es el que escribre en el mongo

    // creamos en nuevo documento ( que agregamos a la colletion)

    return res.send({
      estado: true,
      mensaje: "insercion exitosa",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `ha ocurrido un error en la consulta ${error}`,
    });
  }
};

module.exports = {
  listartodos,
  nuevo,
};
