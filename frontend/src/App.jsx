import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PacienteProvider } from "./context/PacientesProvider";
import AuthLayout from "./Layout/AuthLayout";
import ProtectedRoutes from "./Layout/ProtectedRoutes";
import AdminPacientes from "./Pages/AdminPacientes";
import CambiarPassword from "./Pages/CambiarPassword";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import EditarPerfil from "./Pages/EditarPerfil";
import Login from "./Pages/Login";
import NuevoPassword from "./Pages/NuevoPassword";
import OlvidePassword from "./Pages/OlvidePassword";
import Registrar from "./Pages/Registrar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoutes />}>
              <Route index element={<AdminPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />

            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
