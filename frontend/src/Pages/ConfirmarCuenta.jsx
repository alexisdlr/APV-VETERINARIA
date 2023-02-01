import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Alerta from "../Components/Alerta";
import makeRequest from "../config/axios";

function ConfirmarCuenta() {
  const params = useParams();
  const { id } = params;
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(true);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const confirmar = async () => {
    try {
      const url = `/api/veterinarios/confirmar/${id}`;
      const { data } = await makeRequest.get(url);
      setCuentaConfirmada(true);
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    confirmar();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Confirma tu cuenta y comienza a administrar tus{" "}
          <span className="text-black">Pacientes.</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
      >
        {!loading && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to={"/"}
            className="text-gray-500 block text-center my-3  hover:opacity-80"
          >
            <span className="text-indigo-600">Inicia sesión.</span>
          </Link>
        )}
      </motion.div>
    </>
  );
}

export default ConfirmarCuenta;
