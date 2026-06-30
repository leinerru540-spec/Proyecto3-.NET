import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../assets/LogoTecNoJutso.png";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isLoggedIn = !!token;
    const isAdmin = role === "admin";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="bg-black h-20 px-10 flex items-center justify-between shadow-lg relative z-50">

            {/* LOGO */}
            <div className="flex items-center gap-4">
                <Link to="/">
                    <img src={logo} alt="Tec no Jutso" className="w-40 h-40 object-contain" />
                </Link>

                <h1 className="text-white text-2xl font-bold">
                    Tec <span className="text-[#A855F7]">No</span> Jutso
                </h1>
            </div>

            {/* LINKS */}
            <div className="flex items-center gap-10 font-semibold text-xl">

                <Link to="/" className="text-white hover:text-[#A855F7]">
                    Inicio
                </Link>

                <Link to="/nosotros" className="text-white hover:text-[#A855F7]">
                    Nosotros
                </Link>

                <Link to="/productos" className="text-white hover:text-[#A855F7]">
                    Productos
                </Link>

                {/* 🔥 SOLO ADMIN */}
                {isAdmin && (
                    <div className="relative group py-6">
                        <button className="text-white hover:text-[#A855F7]">
                            Acciones ▼
                        </button>

                        <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-black border border-[#A855F7] rounded-xl w-48 shadow-lg z-50 overflow-hidden">

                            <Link to="/admin/productos" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                Productos
                            </Link>

                            <Link to="/admin/usuarios" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                Usuarios
                            </Link>

                            <Link to="/admin/ventas" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                Ventas
                            </Link>

                        </div>
                    </div>
                )}

                {/* LOGIN / LOGOUT */}
                {!isLoggedIn ? (
                    <Link
                        to="/login"
                        className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-3 rounded-full flex items-center gap-2"
                    >
                        <User size={20} />
                        Iniciar sesión
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                    >
                        <User size={20} />
                        Cerrar sesión
                    </button>
                )}

            </div>
        </nav>
    );
}

export default Navbar;