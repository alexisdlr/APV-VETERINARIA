import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../Components/Alerta";
import makeRequest from "../config/axios";
function OlvidePassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlerta({ msg: "El email no puede estar vacio", error: true });
      return;
    }
    try {
      const { data } = await makeRequest.post(
        "/api/veterinarios/olvide-password",
        { email }
      );
      setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Recupera tu acceso y no pierdas tus{" "}
          <span className="text-black">Pacientes.</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
      >
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email de recuperación:
            </label>
            <input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu email de recuperación"
              className="transition ease-in-out duration-300 border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
            />
          </div>
          <input
            type="submit"
            value="enviar instrucciones"
            className="transition ease-in-out duration-300 w-full uppercase font-bold p-3 bg-indigo-600 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="my-5 sm:flex sm:justify-between px-3">
          <Link
            to={"/"}
            className="transition ease-in-out duration-300 text-gray-500 block text-center my-3  hover:opacity-80"
          >
            Ya tienes una cuenta?{" "}
            <span className="text-indigo-600">Inicia sesión.</span>
          </Link>
          <Link
            to={"/registrar"}
            className="transition ease-in-out duration-300 text-gray-500 block text-center my-3  hover:opacity-80"
          >
            No tienes una cuenta?{" "}
            <span className="text-indigo-600">Registrate.</span>
          </Link>
        </nav>
      </motion.div>
    </>
  );
}

export default OlvidePassword;
