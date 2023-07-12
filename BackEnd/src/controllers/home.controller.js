//FUNCIONES QUE SE CONECTAN A LA BASE DE DATOS
const db = require("../bd");
const bycryp = require("bcrypt");
const jwt = require("jsonwebtoken");

const rutaHome = (req, res) => {
  db.conexion.query("SELECT * FROM cursos", (error, result) => {
    if (error) {
      console.error("Error", error);
    } else {
      res.status(200).json({ mensaje: "Cursos encontrados", data: result });
    }
  });
};

const rutaLogin = async (req, res) => {

  try {
    console.log(req.body);
    const { correo, password } = req.body;
    db.conexion.query(
      `SELECT * FROM usuarios WHERE correo = "${correo}"`,
      (error, result) => {
        if (error) {
          res.status(500).json({ mensaje: "Error de servidor", error: error });
        } else {
          console.log(result);
          if (result.length < 1) {
            return res
              .status(404)
              .json({ mensaje: "No existe, intentalo de nuevo" });
          }
          const user = result[0];
          if (!bycryp.compareSync(password, user.password)) {
            return res.status(500).json({ mensaje: "Datos invalidos" });
          } else {
            const token = jwt.sign({
               nombre: user.nombre,
               correo: user.correo      
            }, "key-token-edson")
            return res
              .status(200)
              .json({ mensaje: "Usuario encontrado", data:{token:token, data: result[0]} });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error de servidor", error: error });
  }
};

const rutaRegister = (req, res) => {
  const { nombre, correo, password } = req.body;
  console.log(req.body);
  if (!nombre && !correo && !password) {
    return res.status(404).json({ mensaje: "Datos obligatorios" });
  }
  bycryp.hash(password, 10, (error, hash) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error de encryptacion" });
    } else {
      db.conexion.query(
        `INSERT INTO usuarios (nombre, correo, password, rol) 
            VALUES("${nombre}", "${correo}", "${hash}", "Maestro")`,
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ mensaje: "Error de registro", error: error });
          } else {
            res.status(200).json({ mensaje: "Datos obtenidos", data: result });
          }
        }
      );
    }
  });
};

const rutaRegisterCurso = (req, res) => {
  const { nombreCurso, id_usuario, descripcion_curso } = req.body;
  console.log(req.body);
  if (!nombreCurso && !id_usuario && !descripcion_curso) {
    return res.status(404).json({ mensaje: "Datos obligatirios" });
  }
  db.conexion.query(
    `INSERT INTO cursos (nombreCurso, id_usuario, descripcion_curso) VALUES("${nombreCurso}", "${id_usuario}", "${descripcion_curso}")`,
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ mensaje: "Error de registro", error: error });
      } else {
        res.status(200).json({ mensaje: "Datos obtenidos", data: result });
      }
    }
  );
};

const rutaGetRegister = (req, res) => {
  try {
    // console.log(req.body);
    // const { id_usuario } = req.body;
    db.conexion.query(
      `SELECT * FROM cursos WHERE id_usuario = "${req.params.idUsuario}"`,
      (error, result) => {
        if (error) {
          res.status(500).json({ mensaje: "Error de servidor", error: error });
        } else {
          console.log(result);
          if (result.length < 1) {
            return res.status(404).json({ mensaje: "No existe esta peticion" });
          } else {
            return res
              .status(200)
              .json({ mensaje: "Usuario encontrado", data: result });
          }
        }
      }
    );
    console.log()
  } catch (error) {
    res.status(500).json({ mensaje: "Error de servidor", error: error });
  }
};

const rutaGetTema = (req, res) => {
    
  try {
    // console.log(req.body);
    // const { id_curso } = req.body;
    db.conexion.query(
      `SELECT * FROM temas WHERE id_curso = '${req.params.idCurso}'`,
      (error, result) => {
        if (error) {
          res.status(500).json({ mensaje: "Error de servidor", error: error });
        } else {
          console.log(result);
          if (result.length < 1) {
            return res
              .status(404)
              .json({ mensaje: "No existe, intentalo de nuevo" });
          } else {
            return res.status(200).json({ mensaje: "Temas encontrados", data: result });
          }
        }
      }
    );
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: "Error de servidor", error: error });
  }
};

const rutaPostAddTem = (req, res) => {

  const { nombreTema, id_curso, contenido } = req.body;
  console.log(req.body)
  if(!nombreTema && !id_curso && !contenido){
    return res.status(404).json({ mensaje: "Datos obligatirios" });
  }
  db.conexion.query(
    `INSERT INTO temas (nombreTema, id_curso, contenido) VALUES( "${nombreTema}", "${id_curso}", "${contenido}")`,
    (error, result) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al añadir tema", error: error });
      } else {
        res.status(200).json({ mensaje: "Tema añadido", data: result });
      }
    }
  );
};

const rutaPutEditTem = (req, res) => {

  const { id_tema, nombreTema, id_curso, contenido } = req.body;
  console.log(req.body)

  db.conexion.query(
    `UPDATE temas SET nombreTema = '${nombreTema}', id_curso = '${id_curso}', contenido = '${contenido}'
                       WHERE id_tema = '${id_tema}'`,
    (error, result) => {
      if (error) {
        console.error("Error", error);
      } else {
        res.status(200).json({ mensaje: "Datos obtenidos", data: result });
      }
    }
  );
};
const rutaDeleteTema = (req, res) => {
  const { idTema } = req.params;
  console.log(idTema)
  db.conexion.query(
    `DELETE FROM temas WHERE id_tema = '${idTema}'`,
    (error, result) => {
      if (error) {
        console.error("Error", error);
      } else {
        res
          .status(200)
          .json({ mensaje: "Datos obtenidos para eliminar", data: result });
      }
    }
  );
};

module.exports = {
  rutaHome,
  rutaLogin,
  rutaRegister,
  rutaRegisterCurso,
  rutaGetRegister,
  rutaGetTema,
  rutaPostAddTem,
  rutaPutEditTem,
  rutaDeleteTema,
}; //exportamos un objeto
