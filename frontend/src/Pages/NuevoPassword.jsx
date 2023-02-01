import Alerta from "../Components/Alerta";
import makeRequest from "../config/axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
const NuevoPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [repPass, setRepPass] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const { token } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "Introduce un password de más de 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== repPass) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    try {
      const { data } = await makeRequest.post(
        `/api/veterinarios/olvide-password/${token}`,
        { password }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: "Hubo un error al reestablecer el password",
      });
    }
  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await makeRequest(`/api/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu nuevo password", error: false });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace.",
          error: true,
        });
        setTokenValido(false);
      }
    };
    comprobarToken();
  }, []);
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Reestablece tu password y no pierdas acceso a tu{" "}
          <span className="text-black">Cuenta.</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo password:
                </label>
                <input
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu nuevo password"
                  className="transition ease-in-out duration-300 border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
                />
                <input
                  type={"password"}
                  value={repPass}
                  onChange={(e) => setRepPass(e.target.value)}
                  placeholder="Repite tu nuevo password"
                  className="transition ease-in-out duration-300 border w-full mt-6 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
                />
              </div>
              <input
                type="submit"
                value="reestablecer password"
                className="transition ease-in-out duration-300 w-full uppercase font-bold p-3 bg-indigo-700 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800"
              />
            </form>
            <nav className="my-5 sm:flex sm:justify-between px-3">
              <Link
                to={"/"}
                className="transition ease-in-out duration-300 text-gray-500 block text-center my-3  hover:opacity-80"
              >
                <span className="text-indigo-600">Inicia sesión.</span>
              </Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
