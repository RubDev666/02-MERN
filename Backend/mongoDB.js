//BASE DE DATOS

import mongoose from "mongoose";
import dotenv from 'dotenv'; //leer variables de entorno ".env"
import { MONGO_URI } from "./config.js"; //las variables de entorno

dotenv.config();

//para conectar la base de datos mongoDB
export async function conectarMONGO() {
    try {
        const db = await mongoose.connect(MONGO_URI);
 
        //solo nombre base de datos
        console.log('conectado a mongo', db.connection.name);
    } catch (error) {
        console.log(error)
    }
};