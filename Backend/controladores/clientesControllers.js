//FUNCIONES QUE VAN A IR EN CADA SOLICITUD


import clienteSchema from '../models/clienteSchema.js'; //schema mongodb


/*TOMA EN CUENTA LO SIGUIENTE:

(req, res), req, es lo que el cliente envia, y res, es lo que le vamos a enviar al cliente
*/

export const clientes = async (req, res) => {
    try {
        const clientes = await clienteSchema.find(); //hace la consulta

        res.send(clientes); //y aqui manda lo que encontro en la base de datos
    
        //la base de datos por defecto si no encuentra nada manda un arreglo vacio
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}; 

export const nuevoCliente = async (req, res) => {
    try {
        const {nombre, empresa, email, telefono, notas, id} = req.body; //recibimos los datos del cliente y extraemos

        //esto es lo que se manda al schema o el modelo de los datos, y con los datos que estamos pasando aqui, se rellenan..., es decir que estos son los datos que el schema de "clienteSchema.js" en "models" estan esperando recibir.
        const newCliente = new clienteSchema({nombre, empresa, email, telefono, notas, id}); //creamos el nuevo dato
    
        await newCliente.save(); //lo guardamos en la base de datos

        return res.json(newCliente); //y le respondemos al cliente
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        const clienteActualizado = await clienteSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send(clienteActualizado);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const borrarCliente = async (req, res) => {
    try {
        const clienteEliminado = await clienteSchema.findByIdAndDelete(req.params.id);

        if(!clienteEliminado) return res.sendStatus(404); // 404, no encontrado
    
        return res.sendStatus(204); //204, si encontrado
    } catch (error) {
        return res.status(500).json({message: error.message});   
    }
};

export const cliente = async (req, res) => {
    try {
        const cliente = await clienteSchema.findById(req.params.id);

        if(!cliente) return res.sendStatus(404); // 404, no encontrado
    
        return res.send(cliente);
    } catch (error) {
        return res.status(500).json({message: error.message});   
    }
};
