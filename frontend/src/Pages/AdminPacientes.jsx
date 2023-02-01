import Form from "../Components/Form";
import ListadoPacientes from "../Components/ListadoPacientes";

const AdminPacientes = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 lg:w-2/5 ">
        <Form />
      </div>
      <div className="md:w-1/2 lg:w-2/5 ">
      
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdminPacientes;
