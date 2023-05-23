//SOLO CARGAR LAS VARIABLES DE ENTORNO

import dotenv from 'dotenv'; //leer variables de entorno ".env"

dotenv.config();

//esta es sintaxis para variables de entorno
export const MONGO_URI = process.env.MONGO_URI;

export const PORT = process.env.PORT || 4000;