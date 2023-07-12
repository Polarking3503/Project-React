const mysql = require("mysql");
let conexion;

try {
    conexion = mysql.createConnection({
        host:process.env.BDHOST, 
        database: process.env.BDNAME,
        user: process.env.BDUSER,
        password: ""
        
    })
} catch (error) {
    console.error("error", error);
}

module.exports = {
    conexion
}

