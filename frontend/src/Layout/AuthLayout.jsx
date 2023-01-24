import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className="container py-10 md:py-0 mx-auto md:grid md:grid-cols-2 gap-3 px-5 h-screen items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
