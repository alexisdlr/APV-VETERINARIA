import { Navigate, Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Loader from "../Components/Loader"
import useAuth from "../hooks/useAuth"
const ProtectedRoutes = () => {
  const {auth, cargando} = useAuth()

  console.log(auth, 'desde protected routes, imprimiendo el auth')
  console.log(cargando ,'desde pr');
  if (cargando) return <Loader />
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10 px-8">
          <Outlet />
        </main>
      ) : <Navigate to={'/'} />}
      <Footer />
    </>
  )
}

export default ProtectedRoutes