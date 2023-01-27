const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-t p-3 text-center text-white font-bold rounded-xl text-sm uppercase`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
