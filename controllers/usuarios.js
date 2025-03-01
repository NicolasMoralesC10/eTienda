// instanciamos la capa modelo correspondiente

let usuarios = require("../models/usuarios");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

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

/* const nuevo = async (req, res) => {
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
}; */

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

const buscarxid = async (req, res) => {
  // recibimos el parametro por el cual debo buscar
  let id = req.params.id;

  try {
    let consulta = await usuarios.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "Consulta exitosa !",
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
    await usuarios.findByIdAndDelete(id).exec();
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
/** 
@description funcion para crear un nuevo usuario
@function nuevo
@param {Object} req - request con la data del formulario de registro del usuario
@param {Object} res - response falso si no exite el usuario, true y mensaje de exito si se crea el usuario
@author Mora
@version 1.0
@returns {Object} - estado y mensaje de la operacion
@class usuarios
*/

const nuevo = async (req, res) => {
  // recibir el data
  let datos = {
    nombre: req.body.nombre,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };

  const usuarioexiste = await usuarios.findOne({ email: datos.email });

  if (usuarioexiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarionuevo = new usuarios(datos);
    await usuarionuevo.save();
    return res.send({
      estado: true,
      mensaje: "usuario creado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};

/** 
@description funcion para validar el login de un usuario con autenticacion de dos factores
@function login
@param {Object} req - request con la password y el email del usuario
@param {Object} res - response falso si los datos no coinciden, true y mensaje de exito si los datos coinciden
@author Mora
@version 1.0
@returns {Object} - estado y mensaje de la operacion
@class usuarios
*/

//? login tradicional : autenticacion de un factor
const login = async (req, res) => {
  //? recibir el data user y password
  let usuarioexiste = await usuarios.findOne({ email: req.body.email });
  // console.log(usuarioexiste);

  //? verificar si el usuario existe en la base de datos
  if (!usuarioexiste) {
    return res.send({
      estado: false,
      mensaje: "no existe el usuario",
    });
  }
  //? Validar las credenciales
  if (bcrypt.compareSync(req.body.password, usuarioexiste.passwordHash)) {
    // autentificacion de dos factores :: JWT
    const token = jwt.sign(
      {
        userId: usuarioexiste.id,
        isAdmin: usuarioexiste.esAdmin,
      },
      //salt de la codificacion o hashing o encriptacion
      "seCreTo",
      {
        expiresIn: "1d",
      }
    );

    if (bcrypt.compareSync(req.body.clave, usuarios.passwordHash)) {
      return res.send({
        estado: true,
        mensaje: "usuario autenticado",
        token,
      });
    } else {
      return res.send({
        estado: false,
        mensaje: "Contraseña incorrecta",
      });
    }
  }
};

module.exports = {
  listartodos,
  nuevo,
  actualizarxid,
  buscarxid,
  borrarxid,
  login,
};
