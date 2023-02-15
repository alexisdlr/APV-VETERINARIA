import { useState, useEffect, createContext } from "react";
import makeRequest from "../config/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await makeRequest("/api/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (perfil) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await makeRequest.put(
        `/api/veterinarios/perfil/${perfil._id}`,
        perfil,
        config
      );
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await makeRequest.put(
        `/api/veterinarios/cambiar-password`,
        datos,
        config
      );
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  }
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, cargando, logout, actualizarPerfil, actualizarPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
