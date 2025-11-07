import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Showdetails from '.Showdetails.jsx';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/showdetails/:podcastId",
    element: <Showdetails /> ,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
