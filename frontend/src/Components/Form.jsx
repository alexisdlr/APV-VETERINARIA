import useAuth from "../hooks/useAuth"

const Form = () => {
  const {auth} = useAuth()
  return (
    <>
       <p className="text-center text-lg mb-1">Bienvenido {''}
        <span className="text-indigo-600 font-bold">{auth.nombre}</span>
      </p>
      <p className="text-center text-lg mb-10">Crea tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form>
        <div className="mb-5">
          <label htmlFor="mascota">Mascota</label>
          <input 
          id="mascota"
          type={'text'}
          placeholder={'Nombre de la mascota'}
          className='transition ease-in-out duration-300 border-2 w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0 focus:border-indigo-700'
        />
        </div>
      </form>
    </>
  )
}

export default Form