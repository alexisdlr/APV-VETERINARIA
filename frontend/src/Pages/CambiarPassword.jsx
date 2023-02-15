import AdminNav from "../Components/AdminNav";
import { motion } from "framer-motion";
import Alerta from "../Components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({})
  const {actualizarPassword} = useAuth()
  const [password, setPassword] = useState({
    password: '',
    newPassword: ''
  })
  const index = 0;
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 0.3,
      },
    }),
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === '')) return setAlerta({
      msg: 'Todos los campos son obligatorios',
      error: 'true'
    })

    const res = await actualizarPassword(password)
    setAlerta(res)
  }

  const {msg} = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Password actual</span>{" "}
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
          {msg && <Alerta alerta={alerta} />}

            <motion.div
              initial={"hidden"}
              animate={"visible"}
              custom={{ delay: (index + 2) * 0.1 }}
              variants={variants}
              className="mb-3 mt-3"
            >
              <label
                htmlFor="password"
                className="uppercase text-gray-700 font-bold"
              >
               password actual
              </label>
              <input
                id="password"
                type={"password"}
                name="password"
                onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
              />
            </motion.div>
         
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              custom={{ delay: (index + 2) * 0.2}}
              variants={variants}
              className="mb-3 mt-3"
            >
              <label
                htmlFor="newPassword"
                className="uppercase text-gray-700 font-bold"
              >
                Nuevo password
              </label>
              <input
                id="newPassword"
                type={"password"}
                name="newPassword"
                onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
              />
            </motion.div>
            <input
              type={"submit"}
              value={"Guardar cambios"}
              className="transition ease-in-out duration-300 w-full uppercase font-bold p-3 bg-indigo-600 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800 mb-6"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
