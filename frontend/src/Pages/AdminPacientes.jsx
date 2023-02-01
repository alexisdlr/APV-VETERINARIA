import { useState } from "react";
import Form from "../Components/Form";
import ListadoPacientes from "../Components/ListadoPacientes";

const AdminPacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button 
      onClick={() => {setMostrarForm(!mostrarForm)}}
      className="transition ease-in-out duration-300 uppercase font-bold p-3 bg-indigo-600 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800 md:hidden mb-10">
        {mostrarForm ? 'Cerrar Form' : 'Mostrar formulario' }
      </button>
      <div className={`${mostrarForm ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
        <Form />
      </div>
      <div className="md:w-1/2 lg:w-2/5 ">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdminPacientes;
