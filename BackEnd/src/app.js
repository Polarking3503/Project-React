const express = require ("express");
const rutas = require ("./rutas/home.routes");
const cors = require("cors"); //Para darle seguridad cuando este montado

const app = express();
//Configuracion

app.set("port", process.env.PORT);
app.set("host", process.env.HOST);
app.use(cors());


app.use(express.json()); //Nuestra apliacion por medio de express va usar json

//RUTAS
app.use("/api-v1", rutas);


module.exports = app; //Exportando la aplicacion

