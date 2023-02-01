import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import ProtectedRoutes from "./Layout/ProtectedRoutes";
import AdminPacientes from "./Pages/AdminPacientes";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import Login from "./Pages/Login";
import NuevoPassword from "./Pages/NuevoPassword";
import OlvidePassword from "./Pages/OlvidePassword";
import Registrar from "./Pages/Registrar";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <AuthLayout />
      ),
      children: [
        {
          path: "/",
          index: true,
          element: (
              <Login />
          ),
        },
        {
          path: "registrar",
          element: (
              <Registrar />
          ),
        },
        {
          path: "olvide-password",
          element: (
              <OlvidePassword />
          ),
        },
        {
          path: "olvide-password/:token",
          element: (
              <NuevoPassword />
          ),
        },
         {
          path: "confirmar/:id",
          element: (
              <ConfirmarCuenta />
          ),
        },
       
      ],
    },
    {
      path: '/admin',
      element: (<ProtectedRoutes />),
      children: [
        {
          path: '/admin',
          index: true,
          element: (<AdminPacientes />)
        },
      ]
      
    }

  ]);
  return <RouterProvider router={router} />;
}

export default App;
