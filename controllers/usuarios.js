// instanciamos la capa modelo correspondiente

let usuarios = require("../models/usuarios");

// metodos de la libreria -- metodos de la clase

const listartodos = async (req, res) => {
  try {
    // hacemos la consulta todos sin filtro

    let listaUsuarios = await usuarios.find().exec();
    res.status(200).send({
      exito: true,
      listaUsuarios,
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
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };
  try {
    // instancia del modelo producto (collection)
    const usuariosNuevo = new usuarios(datos);
    usuariosNuevo.save(); // * Este metodo guarda en el mongo

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

// actualizar por id del usuarios
const actualizarxid = async (req, res) => {
  // recibe el parametro de la consulta
  let id = req.params.id;
  // payload que viene en en lody :: los datos que manda el formulario
  let datos = {
    nombre: req.body.nombre,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };

  try {
    let consulta = await usuarios.findByIdAndUpdate(id, datos).exec();

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

module.exports = {
  listartodos,
  nuevo,
  actualizarxid,
};
