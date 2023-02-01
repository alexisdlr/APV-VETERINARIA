import { useContext } from "react";
import PacienteContext from "../context/PacientesProvider";

const usePacientes = () => {
  return useContext(PacienteContext);
}

export default usePacientes