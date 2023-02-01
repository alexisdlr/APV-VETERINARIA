import { createContext } from "react";
import { useContext, useEffect, useState } from "react";
import makeRequest from "../config/axios";


const PacienteContext = createContext()

export const PacienteProvider = ({children}) => {
  const [pacientes, setPacientes] = useState([])


  const crearPaciente = async (paciente) => {
    console.log(paciente);
  }

  return (
    <PacienteContext.Provider
      value={{
        pacientes,
        crearPaciente
      }}
      >
      {children}
    </PacienteContext.Provider>
  )
}


export default PacienteContext
