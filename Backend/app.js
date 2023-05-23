//CODIGO DE EXPRESS

import express from "express";
import clientesRoutes from './rutas/clientes.js'; //rutas
import cors from "cors"; //para evitar errores de cors

const app = express();

app.use(cors()); //para el error de cors

app.use(express.json()); //para que pueda leer json

//aqui usamos esas rutas
app.use(clientesRoutes);

export default app;