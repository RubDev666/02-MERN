//AQUI INICIA TODO EL FLUJO DEL CODIGO

import { conectarMONGO } from "./mongoDB.js";
import { PORT } from "./config.js"; //vairables de entorno
import app from "./app.js"; //express


conectarMONGO(); //base de datos mongo

app.listen(PORT);

console.log('Servidor oyendo en...', PORT);

//si queremos comprobar en la web
//http://localhost:4000/