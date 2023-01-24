import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import Login from "./Pages/Login";
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
        }, {
          path: "confirmar/:id",
          element: (
              <ConfirmarCuenta />
          ),
        },
       
      ],
    },
    {
      path: '/admin',
      
    }

  ]);
  return <RouterProvider router={router} />;
}

export default App;
