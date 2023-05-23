//RECUERDA CREAR LA VARIABLE DE ENTORNO ".env", se pone url del JSON server cuando ejecutamos
//LAS VARIABLES DE ENTORNO SIEMPRE DEBEN LLEVAR AL PRINCIPIO DE CADA VARIABLE "VITE_...", PARA QUE PUEDAN SER LEIDAS
  
//para obtener todos los clientes
export async function obtenerClientes() {
    // *los metodos get vienen por defecto y no hace falta ponerlos
    const respuesta = await fetch(import.meta.env.VITE_API_URL); //metodo - get por defecto

    const resultado = await respuesta.json();

    return resultado; //retorna los clientes de la base de datos
}
 
//para obtener solo un cliente en especifico
export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);

    const resultado = await respuesta.json();

    return resultado;
}

export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST', //aqui si se pone el metodo por que es otro, en este caso "PUT"
            body: JSON.stringify(datos), //en el body, los datos que se van a enviar
            headers: { //definir que tipo de informacion se esta mandando
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json();
    } catch (error) {
        console.log(error)
    }
}

export async function actualizarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT', //metodo para actualizar
            body: JSON.stringify(datos), //manda los datos actualizados
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json();
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id) {
        try {
        /*const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        })*/

        await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {method: 'DELETE'});
        
        //await respuesta.json(); //da un error de sintaxis
    } catch (error) {
        console.log(error);
    }
}