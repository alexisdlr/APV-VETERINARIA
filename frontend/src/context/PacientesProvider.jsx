import { createContext } from "react";
import { useEffect, useState } from "react";
import makeRequest from "../config/axios";


const PacienteContext = createContext()

export const PacienteProvider = ({children}) => {
  const [pacientes, setPacientes] = useState([])

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  const crearPaciente = async (paciente) => {
    try {
      const {data} = await makeRequest.post('/api/pacientes', paciente, config)
      const {createdAt, __v, updatedAt, ...Paciente} = data
      setPacientes([Paciente, ...pacientes])
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  useEffect(() => {
    const obtenerPaciente = async () => {
      try {
        if (!token) return
        const {data} = await makeRequest('/api/pacientes', config);
        setPacientes(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPaciente()
  }, [])
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
