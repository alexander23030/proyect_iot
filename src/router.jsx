import { createBrowserRouter } from 'react-router';
import App from './App';
import {DashboardPage} from './pages/DashboardPage.jsx';
import {NotFoundPage} from './pages/NotFoundPage.jsx' ;
import { PruebasPage } from './pages/PruebasPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      //ruta por defecto
      { index: true, element: <DashboardPage /> },
      {path: 'Pruebas', element: <PruebasPage/>},
      //URL no coincide con ninguna otra ruta definida
      {path: '*', element: <NotFoundPage/>}
    ],
  },
]);
