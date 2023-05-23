/*useNavigate, sirve para navegar y redireccionar a otra pagina, se usa mas sobre botones,
por ejemplo al pasar una validacion.

Form, componente que sirve para enviar lo que hay en el formulario, lo equivalente a un onSubmit

redirect, para redireccionar a algun sitio, se utiliza en loaders y actions
*/
import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom'
import { obtenerCliente, actualizarCliente } from '../data/clientes';
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({ params }) {
    //accede a la variable del path en "main.jsx" y la pasamos a la funcion
    //...y extrae ese cliente con el id
    const cliente = await obtenerCliente(params.clienteId);

    //valida que el objeto no este vacio
    if (Object.values(cliente).length === 0) {
        throw new Response('', { //para crear nuestros propios mensajes de error
            status: 404,
            statusText: 'El Cliente no fue encontrado'
        })
    }

    return cliente; //retorna el cliente
}

export async function action({ request, params }) {
    const formData = await request.formData();

    const datos = Object.fromEntries(formData);

    const email = formData.get('email');

    datos.telefono = Number(datos.telefono); //convertir a numero y validar

    // =========================== Validación ======================
    const errores = [];

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errores.push('El Email no es válido');
    }

    //si el usuario escribio una letra, al convertir a numero nos da un NaN, si solo escribe numeros esto no se ejecuta y pasa la validacion
    if (!datos.telefono) {
        errores.push('Numero de telefono no valido');
    }

    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }

    // Actualizar el cliente
    //(id, los datos nuevos)
    await actualizarCliente(params.clienteId, datos);

    return redirect('/');

}

function EditarCliente() {
    const navigate = useNavigate(); //para volver a la pagina anterior con el btn
    const cliente = useLoaderData(); //objeto del cliente unico con su id
    const errores = useActionData(); //acceder al array de errores del action

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>


            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form
                    method='post'
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />

                    <input
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value="Guardar Cambios"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente