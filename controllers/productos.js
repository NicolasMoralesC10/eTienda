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
    productoNuevo.save(); // * Este metodo guarda en el mongo

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

// actualizar por id del productos
const actualizarxid = async (req, res) => {
  // recibe el parametro de la consulta
  let id = req.params.id;
  // payload que viene en en lody :: los datos que manda el formulario
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
    let consulta = await producto.findByIdAndUpdate(id, datos).exec();

    return res.send({
      estado: true,
      mensaje: "actualizacion exitosa",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error en la actualizacion: ${error}`,
    });
  }
};

// buscar por id o por otro parametro

const buscarxid = async (req, res) => {
  // todo: Otra manera de mandar el parametro
  /*  let id1 = {
    id: req.params.id,
  }; 

  if (req.params.id) {
  let id = id
}else{
  console.log("le falta el parametro")
}
  */
  // recibimos el parametro por el cual debo buscar
  let id = req.params.id;

  try {
    // otra manera
    /* let consulta = await producto.findById({id: req.params.id}).exec(); */
    // logica de buscar y mostrar resultado del query
    let consulta = await producto.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "insercion exitosa !",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error, ${error}`,
    });
  }
};

// borrar por id :: recuerde que este es un borrado didactico
const borrarxid = async (req, res) => {
  // recibimos el parametro
  let id = req.params.id;

  try {
    // * otra manera
    //  await producto.findByIdAndDelete({ _id: id }).exec();
    await producto.findByIdAndDelete(id).exec();
    return res.send({
      estado: true,
      mensaje: "borrado exitoso !",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error:${error}`,
    });
  }
};

module.exports = {
  listartodos,
  nuevo,
  buscarxid,
  borrarxid,
  actualizarxid,
};
