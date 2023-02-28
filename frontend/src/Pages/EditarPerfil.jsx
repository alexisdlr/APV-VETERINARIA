import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import AdminNav from "../Components/AdminNav";
import Alerta from "../Components/Alerta";
import useAuth from "../hooks/useAuth";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

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

  const handleSubmit = async e => {
    e.preventDefault()

    const {name, email} = perfil

    if([name, email].includes('')) {
      setAlerta({
        msg: 'Campos obligatorios',
        error: true
      })
      return
    }
    
    const respuesta = await actualizarPerfil(perfil)

    setAlerta(respuesta)
    setTimeout(() => {
      setAlerta({})
    }, 2500);
    
  }

  const {msg} = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Informacion</span>{" "}
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
                htmlFor="name"
                className="uppercase text-gray-700 font-bold"
              >
                Nombre
              </label>
              <input
                id="name"
                type={"text"}
                name="name"
                value={perfil.name || ''}  
                onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}
                className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
              />
            </motion.div>
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              custom={{ delay: (index + 2) * 0.1 }}
              variants={variants}
              className="mb-3"
            >
              <label
                htmlFor="email"
                className="uppercase text-gray-700 font-bold"
              >
                email
              </label>
              <input
                id="email"
                type={"text"}
                name="email"
                value={perfil.email || ''}
                onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}
                className={`transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700 ${alerta.error? 'border-red-700': 'border-none'} `}
              />
            </motion.div>
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              custom={{ delay: (index + 2) * 0.1 }}
              variants={variants}
              className="mb-3"
            >
              <label
                htmlFor="telefono"
                className="uppercase text-gray-700 font-bold"
              >
                telefono
              </label>
              <input
                id="telefono"
                type={"text"}
                name="telefono"
                value={perfil.telefono || ''}  
                onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}
                className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
              />
            </motion.div>
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              custom={{ delay: (index + 2) * 0.1 }}
              variants={variants}
              className="mb-3"
            >
              <label
                htmlFor="web"
                className="uppercase text-gray-700 font-bold"
              >
                Sitio web
              </label>
              <input
                id="web"
                type={"text"}
                name="web"
                value={perfil.web || ''}  
                onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}
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

export default EditarPerfil;
