import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="text-center text-3xl font-black">
            Listado de Pacientes
          </h2>
          <p className="text-center text-lg">
            Administra tus {""}
            <span className="font-bold text-indigo-600">Pacientes y Citas</span>
          </p>

          <div className="flex flex-wrap justify-center">
            {pacientes.map((paciente, index) => (
              <Paciente key={index} paciente={paciente} index={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-3xl font-black">No hay pacientes</h2>
          <p className="text-center text-xl">
            Comienza a agregar pacientes {""}
            <span className="font-bold text-indigo-600">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
