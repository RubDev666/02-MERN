//TODAS LAS RUTAS DE LAS PUBLICACIONES

import { Router } from "express";
import {clientes, nuevoCliente, actualizarCliente, borrarCliente, cliente} from "../controladores/clientesControllers.js";

const router = Router();

//cuando yo visite la pagina principal, mostramos mensaje
//router.get('/', (req, res) => res.send('Putos'));

//rutas
//para mostrar todos los clientes que haya en la base de datos
router.get('/clientes', clientes);

//para crear o subir cliente nuevo
router.post('/clientes', nuevoCliente);

//para actualizar un cliente. ":id", eso es un REQUEST PARAMS
router.put('/clientes/:id', actualizarCliente);

//para borrar un cliente
router.delete('/clientes/:id', borrarCliente);

//para mostrar solo un cliente en especifico
router.get('/clientes/:id', cliente);

export default router;