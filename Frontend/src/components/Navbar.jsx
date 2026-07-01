import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";
import logo from "../assets/LogoTecNoJutso.png";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
    const navigate = useNavigate();
    const { carrito, recargarCarrito } = useCarrito();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isLoggedIn = !!token;
    const isAdmin = role === "admin";

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        recargarCarrito();
        navigate("/login");
    };

    return (
        <nav className="bg-black h-20 px-10 flex items-center justify-between shadow-lg relative z-50">

            <div className="flex items-center gap-4">
                <Link to="/">
                    <img src={logo} alt="Tec no Jutso" className="w-40 h-40 object-contain" />
                </Link>

                <h1 className="text-white text-2xl font-bold">
                    Tec <span className="text-[#A855F7]">No</span> Jutso
                </h1>
            </div>

            <div className="flex items-center gap-7 font-semibold text-lg">

                <Link to="/" className="text-white hover:text-[#A855F7]">
                    Inicio
                </Link>

                <Link to="/nosotros" className="text-white hover:text-[#A855F7]">
                    Nosotros
                </Link>

                <Link to="/productos" className="text-white hover:text-[#A855F7]">
                    Productos
                </Link>

                {isLoggedIn && (
                    <Link to="/carrito" className="relative text-white hover:text-[#A855F7]">
                        <ShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#A855F7] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                )}

                {isLoggedIn && (
                    <div className="relative group py-6">
                        <button className="text-white hover:text-[#A855F7] flex items-center gap-1">
                            <User size={16} />
                            {isAdmin ? "Administración ▼" : "Mi Perfil ▼"}
                        </button>

                        <div className="absolute right-0 top-full hidden group-hover:flex flex-col bg-black border border-[#A855F7] rounded-xl w-56 shadow-lg z-50 overflow-hidden">

                            <Link to="/perfil" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                Mi cuenta
                            </Link>

                            <Link to="/perfil/compras" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                Historial de compras
                            </Link>

                            {isAdmin && (
                                <>
                                    <div className="border-t border-[#A855F7]/40 my-1" />

                                    <span className="px-5 pt-2 pb-1 text-xs uppercase tracking-wide text-[#A855F7]">
                                        Administración
                                    </span>

                                    <Link to="/admin/productos" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                        Productos
                                    </Link>

                                    <Link to="/admin/usuarios" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                        Usuarios
                                    </Link>

                                    <Link to="/admin/ventas" className="px-5 py-3 text-white hover:bg-[#A855F7]">
                                        Ventas
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>
                )}

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