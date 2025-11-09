// src/main.jsx
import { Children, Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
    children: [
      {
        index: true,
        element: <Home />, 
      },
      {
        path: 'login',
        element: <Login />, 
      },
      {
        path: 'register',
        element: <Register />, 
      },
    ],
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
 

 <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
 </AuthProvider>
  </StrictMode>,
)
