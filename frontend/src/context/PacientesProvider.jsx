import { createContext } from "react";
import { useEffect, useState } from "react";
import makeRequest from "../config/axios";

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const crearPaciente = async (paciente) => {
    if (paciente.id) {
      const { data } = await makeRequest.put(
        `/api/pacientes/${paciente.id}`,
        paciente,
        config
      );
      const pacientesAct = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
      setPacientes(pacientesAct)
    } else {
      try {
        const { data } = await makeRequest.post(
          "/api/pacientes",
          paciente,
          config
        );
        const { createdAt, __v, updatedAt, ...Paciente } = data;
        setPacientes([Paciente, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  const editarPaciente = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async id => {
    const confirmar = confirm('Seguro que deseas eliminar?')

    if(confirmar) {
      try {
        const {data}  = await makeRequest.delete(`/api/pacientes/${id}`, config)
        const pacientesFilter = pacientes.filter( p => p._id !== id)
        setPacientes(pacientesFilter)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
  }
  useEffect(() => {
    const obtenerPaciente = async () => {
      try {
        if (!token) return;
        const { data } = await makeRequest("/api/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPaciente();
  }, []);
  return (
    <PacienteContext.Provider
      value={{
        pacientes,
        crearPaciente,
        editarPaciente,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
};

export default PacienteContext;
