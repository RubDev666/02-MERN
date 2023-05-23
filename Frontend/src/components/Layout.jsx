/*Outlet, sirve como un contenedor dinamico que ira cambiando su contenido en la ruta que vayamos a definir, se importa aqui como componente y en main.jsx se agrega una propiedad llamada children, y ahi se definen las rutas y su contenido que agregamos al Outlet
*/

/*Link, componente que sirve para reemplazar la etiqueta "a" de enlace, para optimizar mejor
el codigo, se recomienda usarlo mas
*/

/*useLocation, sirve para darnos informacion de la pagina actual en la que estemos navegando
Tambien existe otro similar llamado Navlink pero no funciona bien 
*/
import {Outlet, Link, useLocation} from 'react-router-dom';

function Layout() {
    //lo estamos usando para cambiar el color de los botones segun la pagina en que se encuentre
    const location = useLocation(); //devuelve objeto con informacion de la pagina actual

    //lo que esta en Outlet y en el main ira cambiando segun la ruta, mientras todo lo demas se quedara fijo en la pagina
    return (
        <div className='md:flex md:min-h-screen'>
            <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>
                <nav className='mt-10'>
                    <Link 
                        className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 `} 
                        to="/">Clientes</Link>
                    <Link 
                        className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 `} 
                        to="/clientes/nuevo">Nuevo Cliente</Link>
                </nav>
            </aside>

            <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout