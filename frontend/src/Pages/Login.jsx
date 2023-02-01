import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../Components/Alerta";
import makeRequest from "../config/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Login = () => {


  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const {setAuth} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes(""))
      return setAlerta({
        msg: "Ningun campo puede estar vacio",
        error: true,
      });

    try {
      const { data } = await makeRequest.post("api/veterinarios/login", {
        email,
        password,
      });
      console.log('desde login',data);
      localStorage.setItem('token', data.token)
      setAuth(data);
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Inicia sesión y Administra tus{" "}
          <span className="text-black">Pacientes.</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          {msg && <Alerta alerta={alerta} />}
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email:
            </label>
            <input
              type={"email"}
              placeholder="Email de registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="transition ease-in-out duration-300 border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
            />
          </div>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password:
            </label>
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="transition ease-in-out duration-300 border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="transition ease-in-out duration-300 w-full uppercase font-bold p-3 bg-indigo-700 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="my-5 sm:flex sm:justify-between px-3">
          <Link
            to={"/registrar"}
            className="transition ease-in-out duration-300 text-gray-500 block text-center my-3  hover:opacity-80"
          >
            No tienes una cuenta?{" "}
            <span className="text-indigo-600">Registrate.</span>
          </Link>
          <Link
            to={"/olvide-password"}
            className="transition ease-in-out duration-300 text-gray-500 block text-center my-3  hover:opacity-80"
          >
            Olvidé mi contraseña.
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
