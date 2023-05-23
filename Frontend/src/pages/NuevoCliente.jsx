/*useNavigate, sirve para navegar y redireccionar a otra pagina, se usa mas sobre botones,
por ejemplo al pasar una validacion.
 
Form, componente que sirve para enviar lo que hay en el formulario, lo equivalente a un onSubmit

redirect, para redireccionar a algun sitio, se utiliza en loaders y actions
*/
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom';

import Formulario from '../components/Formulario'; // componente de formulario
import Error from '../components/Error';
import { agregarCliente } from '../data/clientes';

//lo exportamos para usarlo en el main.jsx, se recomienda llamarlo "action"
//aqui se mandara a llamar cuando el usuario de en el boton de enviar
export async function action({request}) { //siempre tiene que ser request, es un obj
    //por si solo esto no devuelve nada...
    const formData = await request.formData(); //solo extraer lo que esta en "formData"

    //ya retorna un objeto con todos los inputs y values del formulario
    const datos = Object.fromEntries(formData); //aqui si ya se puede acceder a los datos
    
    const email = formData.get('email'); //para poder validar el email solamente

    datos.telefono = Number(datos.telefono); //convertir a numero y validar

    // ============================ Validación =================
    const errores = []; //para almacenar los errores

    //".values", accede a todoslos valores del objeto unicamente
    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    //esto es pra que se valide el email y sea un email correcto
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    //".test" metodo que existe para comprobar un expresion regular
    if(!regex.test(email)) {
        errores.push('El Email no es válido');
    }

    //si el usuario escribio una letra, al convertir a numero nos da un NaN, si solo escribe numeros esto no se ejecuta y pasa la validacion
    if(!datos.telefono){
        errores.push('Numero de telefono no valido');
    }

    // Retornar datos si hay errores
    if(Object.keys(errores).length) { //valida si hay algo en el array de errores
        return errores;
    }

    // aqui ya la validacion fue exitosa y manda los datos a la funcion
    //esta se tiene completar primero para que se ejecute la siguiente linea de codigo...
    await agregarCliente(datos);

    //una vez termine la validacion, nos redirecciona al inicio de la pagina
    return redirect('/');
}

function NuevoCliente() {
    const errores = useActionData(); // se usa con el action, y se puede usar en el componente

    //para la navegacion entre las paginas
    //(-1), retrocede a la pagina anterior
    //('/'), o alguna otra parte del sitio
    const navigate = useNavigate(); 

    //console.log(errores?.length); //esto se llama un Optional Chaining
    //regresa undefined si no hay nada, se usa cuando no se evalua por un true o false como tal

    //"noValidate", eso sirve para desactivar la validacion por defecto de emails de html5
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>
 

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}
                
                <Form
                    method='post'
                    noValidate
                >
                    <Formulario />

                    <input
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default NuevoCliente