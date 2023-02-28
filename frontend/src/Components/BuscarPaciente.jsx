import usePacientes from "../hooks/usePacientes";

const BuscarPacientes = () => {
  const {setSearchParams} = usePacientes()
  function handleSearch(e) {
    setSearchParams({ filter: e.target.value })
  }

  return (
    <div className="flex justify-center items-center my-5 gap-3">
      <input
        type="text"
        onChange={handleSearch}
        placeholder='Busca tus pacientes...'
        className={
          "transition ease-in-out duration-300 border-2 w-1/2 mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700"
        }
      />
    </div>
  );
};
export default BuscarPacientes;
