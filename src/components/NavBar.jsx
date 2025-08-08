import { NavLink } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <header className="navbar bg-base-300 py-6 mb-8">
      <div className="w-full max-w-[1000px] mx-auto flex items-center justify-between">
        <NavLink className="text-3xl font-bold" to="/">
          ToDoApp
        </NavLink>
        <NavLink className="btn btn-soft btn-primary font-bold text-[1.1em]" to="/createNote">
          <PlusIcon></PlusIcon>
          Crear una Nota</NavLink>
      </div>
    </header>
  );
};

export default NavBar;
