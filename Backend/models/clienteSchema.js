//el modelo de nuestra base de datos o de la informacion que le vamos a pasar

import mongoose from "mongoose";

//aqui se define todo el tipo de informacion que vamos a mandar
const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String, //tipo de dato
        required: true, //si es obligatorio, en este caso es si
        trim: true //para eliminar espacios en blanco al principio o final
    }, 
    empresa: {
        type: String, 
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required:  true
    },
    notas: {
        type: String,
        required: true
    }
});

//'clientes' - ese nombre es el que se le da a la carpeta donde contendra cada publicacion en mongo, se puede crear en compas o si no existe la crea y ahi se queda...
export default mongoose.model('clientes', clienteSchema);