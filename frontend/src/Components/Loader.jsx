import { Ring } from "@uiball/loaders";

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Ring size={40} lineWeight={5} speed={2} color="#4f46e5d9" />
    </div>
  );
}

export default Loader;
