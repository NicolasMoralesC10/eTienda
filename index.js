const express = require("express");
const app = express();
const cors = require("cors");

// middleware de la app
app.use(cors());
app.use(express.json());

// llamamos la libreria de conexion
const conexion = require("./models/bd_conexion.js");
conexion();

// rutas globales de la app
const productoRuta = require("./routes/productos.js");

// usamos la rutas
app.use("/api", productoRuta);

app.listen(4000, () => {
  console.log(`listen en el puerto ${4000}`);
});
