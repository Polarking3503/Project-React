//generamos las rutas
 const express = require("express");
 //Extraer un objeto de la constante express
 const{
    Router
 }= express;

 const rutas = Router();
 const {rutaHome, rutaLogin, rutaRegister, rutaRegisterCurso, rutaGetRegister, rutaGetTema, rutaPostAddTem, rutaPutEditTem, rutaDeleteTema} = require("../controllers/home.controller") //Importamos la ruta para usar sus funciones del proyecto

//definimos las rutas
 rutas.route("/home").get(rutaHome)
 rutas.route("/login").post(rutaLogin)
 rutas.route("/register").post(rutaRegister)
 rutas.route("/register/curso").post(rutaRegisterCurso)
 rutas.route("/register/curso/:idUsuario").get(rutaGetRegister)
 rutas.route("/registro/tema").post(rutaPostAddTem).put(rutaPutEditTem)
 rutas.route("/registro/tema/:idTema").delete(rutaDeleteTema)
 rutas.route("/registro/tema/:idCurso").get(rutaGetTema)




 module.exports = rutas
