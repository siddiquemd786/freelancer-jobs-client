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
import AllJobs from './pages/AllJobs.jsx';
import MyAcceptedTasks from './component/MyAcceptedTasks.jsx';
import JobDetails from './component/JobDetails.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';


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
      },{
       path: "/jobs",
  element: <AllJobs />,
},{
  path: "/allJobs/:id",
  element: (
    <PrivateRoute>
      <JobDetails />
    </PrivateRoute>
  ),
},
{
  path: "/my-accepted-tasks",
  element: (
    <PrivateRoute>
      <MyAcceptedTasks />
    </PrivateRoute>
  ),
}



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
