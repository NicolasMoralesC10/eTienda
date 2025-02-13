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

module.exports = {
  listartodos,
};
