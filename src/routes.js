import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Reset from './pages/Reset';
import { ProtectedRoute } from './protected';



// ----------------------------------------------------------------------

export default function Router() {
  
  const IsLogged = localStorage.getItem('token');
  return useRoutes([
  
    {
      path: '/dashboard',
      element: IsLogged? <DashboardLayout /> : <Navigate replace to={"/login"} /> ,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'reset-password/:token',
      element: <Reset />,
    },
    {
      path: '/',
      element: IsLogged? <LogoOnlyLayout /> : <Navigate replace to={"/login"} />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
