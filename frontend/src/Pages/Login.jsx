import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div >
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Inicia sesión y Administra tus{" "}
          <span className="text-black">Pacientes.</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email:
            </label>
            <input
              type={"email"}
              placeholder="Email de registro"
              className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
            />
          </div>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password:
            </label>
            <input
              type={"password"}
              placeholder="Password"
              className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
            />
          </div>
          <input type="submit" value="Iniciar sesion" className="w-full uppercase font-bold p-3 bg-indigo-700 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800" />
        </form>
        <nav className="my-5 sm:flex sm:justify-between px-3">
          <Link to={'/registrar'} className='text-gray-500 block text-center my-3  hover:opacity-80'>No tienes una cuenta? <span className="text-indigo-600">Registrate.</span></Link>
          <Link to={'/olvide-password'}className='text-gray-500 block text-center my-3  hover:opacity-80'>Olvidé mi contraseña.</Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
