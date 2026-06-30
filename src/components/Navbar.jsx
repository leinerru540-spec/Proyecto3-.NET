import { Link } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../assets/LogoTecNoJutso.png";

function Navbar() {
  return (
    <nav className="bg-black h-20 px-10 flex items-center justify-between shadow-lg relative z-50">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src={logo}
            alt="Tec no Jutso"
            className="w-40 h-40 object-contain hover:scale-105 transition duration-300"
          />
        </Link>

        <h1 className="text-white text-2xl font-bold">
          Tec <span className="text-[#A855F7]">No</span> Jutso
        </h1>
      </div>

      <div className="flex items-center gap-10 font-semibold text-xl">
        <Link to="/" className="text-white hover:text-[#A855F7] transition">
          Inicio
        </Link>

        <Link to="/nosotros" className="text-white hover:text-[#A855F7] transition">
          Nosotros
        </Link>

        <Link
          to="/productos"
          className="text-white hover:text-[#A855F7] transition duration-300"
        >
          Productos
        </Link>

        <div className="relative group py-6">
          <button className="text-white hover:text-[#A855F7] transition">
            Acciones ▼
          </button>

          <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-black border border-[#A855F7] rounded-xl  w-48 shadow-lg z-50 overflow-hidden">
            <Link
              to="/admin/productos"
              className="block px-5 py-3 text-white hover:bg-[#A855F7] transition"
            >
              Productos
            </Link>

            <Link
              to="/admin/usuarios"
              className="block px-5 py-3 text-white hover:bg-[#A855F7] transition"
            >
              Usuarios
            </Link>

            <Link
              to="/admin/ventas"
              className="block px-5 py-3 text-white hover:bg-[#A855F7] transition"
            >
              Ventas
            </Link>
          </div>

        </div>

        <Link
          to="/login"
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-3 rounded-full flex items-center gap-2 transition shadow-lg"
        >
          <User size={20} />
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;