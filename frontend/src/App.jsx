import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./Layout/AuthLayout";
import ProtectedRoutes from "./Layout/ProtectedRoutes";
import AdminPacientes from "./Pages/AdminPacientes";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import Login from "./Pages/Login";
import NuevoPassword from "./Pages/NuevoPassword";
import OlvidePassword from "./Pages/OlvidePassword";
import Registrar from "./Pages/Registrar";

function App() {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />} >
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route index element={<AdminPacientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
