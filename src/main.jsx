import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './router.jsx'
import './config/chartConfig';
import './index.css'

//en lugar de renderizar App  se renderiza el RouterProvider
//se decide qué mostrar según la URL.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
