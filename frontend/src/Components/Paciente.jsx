import { motion } from "framer-motion";
import usePacientes from "../hooks/usePacientes";
const Paciente = ({ paciente, index}) => {


  const {editarPaciente, eliminarPaciente} = usePacientes()

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

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


  return (
    <motion.div 
    initial={"hidden"}
    animate={"visible"}
    custom={{ delay: (index + 1) * 0.1 }}
    variants={variants}
    className="bg-white px-5 py-10 mt-8 mx-2 rounded-xl shadow-xl">
      <p className="font-bold uppercase text-indigo-700 my-3">
        nombre:{" "}
        <span className="font-normal normal-case text-black">
          {paciente.nombre}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-3">
        propietario:{" "}
        <span className="font-normal normal-case text-black">
          {paciente.propietario}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-3">
        email de contacto:{" "}
        <span className="font-normal normal-case text-black">
          {paciente.email}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-3">
        fecha:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(paciente.fecha)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-3">
        síntomas:{" "}
        <span className="font-normal normal-case text-black">
          {paciente.sintomas}
        </span>
      </p>
      <div className="flex justify-between my-2">
        <button
        onClick={() => editarPaciente(paciente)}
         className="transition ease-in-out duration-300 uppercase font-bold py-2 px-5 bg-indigo-600 text-white rounded-lg hover:cursor-pointer hover:bg-indigo-800"
         >
          Editar
        </button>
        <button
        onClick={() => eliminarPaciente(paciente._id)}
        className="transition ease-in-out duration-300 uppercase font-bold py-2 px-5 bg-red-600 text-white rounded-lg hover:cursor-pointer hover:bg-red-800"
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
};

export default Paciente;
