import { Link } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../assets/LogoTecNoJutso.png";

function Navbar() {
  return (
    <nav className="bg-black h-20 px-10 flex items-center justify-between shadow-lg">
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

        <Link to="/productos" className="text-white hover:text-[#A855F7] transition">
          Productos
        </Link>

        <div className="relative group">
          <button className="text-white hover:text-[#A855F7] transition">
            Acciones ▼
          </button>

          <div className="absolute hidden group-hover:block bg-black border border-[#A855F7] rounded-xl mt-3 w-44 shadow-lg z-50">
            <Link to="/admin/productos" className="block px-5 py-3 text-white hover:bg-[#A855F7] rounded-t-xl">
              Productos
            </Link>
            <Link to="/admin/usuarios" className="block px-5 py-3 text-white hover:bg-[#A855F7]">
              Usuarios
            </Link>
            <Link to="/admin/ventas" className="block px-5 py-3 text-white hover:bg-[#A855F7] rounded-b-xl">
              Ventas
            </Link>
          </div>
        </div>

        <Link
          to="/comprobantes"
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-2 rounded-full transition shadow-lg"
        >
          Comprobantes
        </Link>

        <Link
          to="/login"
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white p-3 rounded-full transition shadow-lg"
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;