require ("dotenv").config();
const app = require("./app");


function main (){
    try {
        app.listen(app.get("port"));
        console.log("Servidor corriendo");
    } catch (error) {
        console.error("error", error);
    }
}
main();