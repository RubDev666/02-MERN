import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//createBrowserRouter, para crear las rutas mediante objetos
//RouterProvider,reemplaza el App.jsx y ahi se se pasan las rutas como prop
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout'; //layout principal o diseño general de la pagina
import ErrorPage from './components/ErrorPage'; //componente de pagina de error

//la palabra "as", significa que esta renombrando lo que esta importando, de esta forma no chocan los nombres de las funciones similares

//para validar el formulario y su accion agregar cliente
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente';

//todo el indice principal y un loader para obtener los clientes en la base de datos
import Index, { loader as clientesLoader } from './pages/Index';

//componente EditarCliente, y sus loader para cargar datos de un cliente, y la accion para editar
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente';

//accion solo para eliminar el cliente
import { action as eliminarClienteAction } from './components/Cliente';

//aqui se definen las rutas dentro del objeto
const router = createBrowserRouter([
    /* se puede pasar mas de una ruta:
        {
            path: '/', 
            element: <Layout />,
        },
        {
            path: '/otra-ruta', 
            element: <Layout2 />,
        }
    */

    {
        path: '/',  //path, la foma en la que definimos las url's

        //element, lo que se va a mostrar en pantalla, puede ser codigo html o un componente
        element: <Layout />,  //incluye todo el diseño global, y los links de navegacion
        
        //children, para el contenido dinamico segun la ruta en la que estemos y se mostrara en el componente Outlet que esta dentro del componente Layout
        children: [
            {
                index: true, //indicarle que estamos en la pagina principal
                element: <Index />, //componente que muestra el listado de clientes
                loader: clientesLoader, //para cargar los datos de los clientes
                errorElement: <ErrorPage /> //manejar el error de una peticion o de la pagina
            },
            { 
                path: '/clientes/nuevo',
                element: <NuevoCliente />, //formulario de nuevo cliente
                action: nuevoClienteAction, //la accion para validar el form
                errorElement: <ErrorPage />
            },
            {
                path: '/clientes/:clienteId/editar',
                element: <EditarCliente />,
                loader: editarClienteLoader, //:clienteId, lo que esta en el params
                action: editarClienteAction,
                errorElement: <ErrorPage />
            },
            {
                path: '/clientes/:clienteId/eliminar',
                action: eliminarClienteAction
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router /*y aqui se pasa como prop las rutas...*/} />
    </React.StrictMode>,
)
