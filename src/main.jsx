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
import { Toaster } from "react-hot-toast";
import AddJob from './pages/AddJobs.jsx';
import UpdateJob from './component/UpdateJob.jsx';
import ErrorPage from './component/ErrorPage.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
     errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, 
      },
      {
        path: '/login',
        element: <Login />, 
      },
      {
        path: '/register',
        element: <Register />, 
      },
      {
  path: "/alljobs",
  element: <AllJobs />,
},{
  path: "/alljobs/:id",
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
},{
  path: "/add-job",
  element: (
    <PrivateRoute>
      <AddJob />
    </PrivateRoute>
  ),
},{
  path: "/update-job/:id",
  element: (
    <PrivateRoute>
      <UpdateJob />
    </PrivateRoute>
  ),
},





    ],
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
 

 <ThemeProvider>
<AuthProvider>

 
   <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-center" />
 </AuthProvider>

 </ThemeProvider>
 {/* <ThemeProvider>
     <AuthProvider>

 
   <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-center" />
 </AuthProvider>
  </ThemeProvider> */}

  </StrictMode>,
)
