/*
useNavigate, para el btn de navegacion, se recomienda mas en botones

Form, para poder manejar las acciones de un formulario
*/
import { useNavigate, Form, redirect } from 'react-router-dom';
import { eliminarCliente } from '../data/clientes';

export async function action({ params }) {
    await eliminarCliente(params.clienteId);

    return redirect('/'); //para redireccionar a la pagina que queremos
}

function Cliente({ cliente }) {
    const navigate = useNavigate(); //para ir a la pagina editar 

    //aqui recibe todos los datos del cliente directo de la base de datos desde un prop
    const { nombre, empresa, email, telefono, _id, notas } = cliente;
    return (
        <tr className="border-b">
            <td className='p-6 space-y-2'>
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email} </p>
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono} </p>
            </td>

            <td>
                {notas}
            </td>

            <td className="p-6 flex gap-3 justify-end">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                    onClick={() => navigate(`/clientes/${_id}/editar`)}
                >
                    Editar
                </button>

                <Form
                    method='post'
                    action={`/clientes/${_id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Deseas eliminar este registro?')) {
                            e.preventDefault(); //si es false no ejecuta el action
                        }
                    }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs "
                    >
                        Eliminar
                    </button>
                </Form>

            </td>
        </tr>
    )
}

export default Cliente