//  Instanciar la libreria mongoose
const mongoose = require("mongoose")

const conexion = async() =>{
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/Tienda');
      console.log(`ok conectado`)
    } catch (error) {
        console.log(`error en la funcion: ${error}`)
        //throw new Error(error)
    }
}
module.exports = conexion



