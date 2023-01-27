import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Components/Alerta";
import makeRequest from "../config/axios";
function Registrar() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPass, setRepPass] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault()

    if([name, email, password, repPass].includes('')) {
      setAlerta({
        msg: 'Ningún campo debe estar vacío',
        error: true
      })
      return
    }
    if(password !== repPass) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }
    if(password.length <= 6) {
      setAlerta({
        msg: 'La contraseña debe ser de más de 6 caracteres',
        error: true
      })
      return
    }
    setAlerta({})
    try {
      const url = '/api/veterinarios'
      await makeRequest.post(url, {name, email, password})
      setAlerta({
        msg: 'Creado correctamente, revisa tu email!',
        error: false
      })
    } catch (error) {
      setAlerta(
        {
          msg: error.response.data.msg,
          error: true
        }
      )
    }
  }
  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-5xl lg:text-7xl font-black">
          Crea tu cuenta y Administra tus{" "}
          <span className="text-black">Pacientes.</span>
        </h1> 
      </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} />}
          
          <form onSubmit={handleSubmit}>
          <div className="my-6">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nombre:
              </label>
              <input
                type={"text"}
                placeholder="Tu nombre"
                className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="my-6">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email:
              </label>
              <input
                type={"email"}
                placeholder="Email de registro"
                className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="my-6">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password:
              </label>
              <input
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
              />
            </div>
            <div className="my-6">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repetir password:
              </label>
              <input
                type={"password"}
                placeholder="Repite tu password"
                onChange={e => setRepPass(e.target.value)}
                value={repPass}
                className="border w-full mt-3 p-3 bg-gray-50 rounded-xl focus:outline-0"
              />
            </div>
            <input
              type="submit"
              value="crear cuenta"
              className="w-full uppercase font-bold p-3 bg-indigo-700 text-white rounded-xl hover:cursor-pointer hover:bg-indigo-800"
            />
          </form>
          <nav className="my-5 sm:flex sm:justify-between px-3">
            <Link
              to={"/"}
              className="text-gray-500 block text-center my-3  hover:opacity-80"
            >
              Ya tienes una cuenta?{" "}
              <span className="text-indigo-600">Inicia sesión.</span>
            </Link>
         
          </nav>
      </div>
    </>
  );
}

export default Registrar;
