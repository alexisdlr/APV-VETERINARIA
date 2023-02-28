import usePacientes from "../hooks/usePacientes";
import BuscarPacientes from "./BuscarPaciente";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes, searchParams } = usePacientes();
  const filter = searchParams.get("filter") ?? ""

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
          
            <BuscarPacientes />
          
          <div className="flex flex-wrap justify-center">
            {
          
            pacientes.filter(paciente => {
              if (!filter) return true;
              
              return paciente.nombre.toLowerCase().includes(filter.toLowerCase()) || paciente.propietario.toLowerCase().includes(filter.toLowerCase());
            })
            .map((paciente, index) => (
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
