import { useState, useEffect, createContext } from "react";
import makeRequest from "../config/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando ] = useState(true)
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');

      console.log('token desde authProvider', token)
      if(!token) {
        setCargando(false)
        return
      }

      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const {data} = await makeRequest('/api/veterinarios/perfil', config)
        console.log(cargando, 'desde context provider ')
        console.log('desde context provider, imprimiendo la data de la api', data)
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg)
        setAuth({})
      }

      setCargando(false)
      console.log(cargando, 'desde fuera de la funcion');
    }

    autenticarUsuario()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setAuth({})
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
