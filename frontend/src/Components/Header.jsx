import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const {logout} = useAuth()
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container px-8 mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-2xl text-center text-indigo-200 font-bold">
          Administrador de pacientes de{" "}
          <span className="text-white font-black">veterinaria</span>
        </h1>

        <nav className="flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4">
          <Link
            to={"/admin"}
            className="text-sm transition ease-in-out duration-300  text-white uppercase font-bold hover:opacity-70"
          >
            Pacientes
          </Link>
          <Link
            to={"/perfil"}
            className="text-sm transition ease-in-out duration-300 text-white uppercase font-bold hover:opacity-70"
          >
            Perfil
          </Link>
          <button 
          onClick={logout}
          className="text-sm transition ease-in-out duration-300 text-white uppercase font-bold hover:opacity-70">
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
