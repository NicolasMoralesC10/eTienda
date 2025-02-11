// modelo para la conxion productos
// destructuring de l aclaase mongoose -- solo traigo los metodos que me importan
const { Schema, model, Collection } = require("mongoose");

// creamos el schema
const productoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: false,
    },
    existencia: {
      type: Number,
      required: true,
    },
  },
  { Collection: "producto" }
);

module.exports = model("producto,", productoSchema);
