//useLoaderData, sirve para acceder a lo que se retorne en loader
import { useLoaderData } from 'react-router-dom';
import { obtenerClientes } from '../data/clientes'; //fetch para la base de datos
import Cliente from '../components/Cliente';
 
//funciona como un useEffect, se puede retornar un objeto, strings, array o lo que sea
export function loader() { //siempre tiene que llamarse "loader"
    const clientes = obtenerClientes(); //esta funcion retorna los clientes de la base de datos
 
    return clientes; // y siempre debe retornar algo
}
 
function Index() {
    //los clientes de la base de datos
    const clientes = useLoaderData(); //aqui accedemos a la informacion de loader

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>

            {clientes.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Cliente</th>
                            <th className='p-2'>Contacto</th>
                            <th className='p-2'>Notas</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente
                                cliente={cliente}
                                key={cliente._id}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">No Hay Clientes aún</p>
            )}
        </>
    )
}

export default Index