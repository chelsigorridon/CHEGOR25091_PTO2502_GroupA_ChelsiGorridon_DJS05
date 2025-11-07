import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'

const Router = createBrowserRouter([]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RouterProvider router={Router} />
  </StrictMode>,
)
