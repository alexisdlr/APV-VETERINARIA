import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import { useEffect } from "react";

const Form = () => {
  const { auth } = useAuth();
  const { crearPaciente, paciente, editarPaciente } = usePacientes();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});
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

  useEffect(() => {
    if (paciente?._id) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setSintomas(paciente.sintomas);
      setFecha(paciente.fecha)
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Ningun campo puede estar vacio",
        error: true,
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000)
      return;
    }
    crearPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: 'Guardado Correctamente'
    });
    setNombre('');
    setPropietario('');
    setEmail('');
    setSintomas('');
    setFecha('')
    setId('');
    setTimeout(() => {
      setAlerta({})
    }, 2000)
  };
  const { msg } = alerta;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <h2 className="font-black text-3xl text-center">
          Bienvenido {auth.name}
        </h2>
        <p className="text-center text-lg mb-8">
          Crea tus pacientes y {""}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
      </motion.div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl py-10 px-5 mb-10 md:mb-0"
      >
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          custom={{ delay: (index + 1) * 0.1 }}
          variants={variants}
          className="my-5"
        >
          <label
            htmlFor="mascota"
            className="uppercase text-gray-700 font-bold"
          >
            Mascota
          </label>
          <input
            id="mascota"
            type={"text"}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={"Nombre de la mascota"}
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
            htmlFor="propietario"
            className="uppercase text-gray-700 font-bold"
          >
            propietario
          </label>
          <input
            id="propietario"
            type={"text"}
            placeholder={"Nombre del dueño"}
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
          />
        </motion.div>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          custom={{ delay: (index + 3) * 0.1 }}
          variants={variants}
          className="mb-3"
        >
          <label htmlFor="email" className="uppercase text-gray-700 font-bold">
            Email del propietario
          </label>
          <input
            id="email"
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
          />
        </motion.div>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          custom={{ delay: (index + 4) * 0.1 }}
          variants={variants}
          className="mb-3"
        >
          <label
            htmlFor="Sintomas"
            className="uppercase text-gray-700 font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder={"Describe los sintomas"}
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
          />
        </motion.div>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          custom={{ delay: (index + 5) * 0.1 }}
          variants={variants}
          className="mb-3"
        >
          <label htmlFor="fecha" className="uppercase text-gray-700 font-bold">
            Fecha
          </label>
          <input
            id="fecha"
            type={"date"}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
          />
        </motion.div>
        <input
          type={"submit"}
          value={id ? "Guardar cambios" : "Agregar paciente"}
          className="transition ease-in-out duration-300 w-full uppercase font-bold p-3 bg-indigo-600 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800 mb-6"
        />
        {
          id ? <button onClick={() => {
            editarPaciente({})
            setNombre('')
            setEmail('')
            setPropietario('')
            setSintomas('')
            setId(null);
          }} className="transition ease-in-out duration-300 px-6 py-3 bg-red-500 text-white font-bold uppercase rounded-xl w-full hover:cursor-pointer hover:bg-red-800 ">Cancelar</button>  : ''
        }
        {msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};

export default Form;
