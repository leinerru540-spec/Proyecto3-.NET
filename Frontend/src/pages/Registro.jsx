import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginFondo from "../assets/LoginFondo.png";
import { registrarUsuario } from "../services/authService";

function Registro() {
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        nombre: "",
        username: "",
        correo: "",
        telefono: "",
        password: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    function manejarCambio(e) {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    }

    async function manejarRegistro(e) {
        e.preventDefault();
        setError("");

        try {
            await registrarUsuario(datos);
            setMensaje("¡Cuenta creada exitosamente!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            const data = err.response?.data;
            if (typeof data === "string") {
                setError(data);
            } else if (data?.errors) {
                const primero = Object.values(data.errors)[0];
                setError(Array.isArray(primero) ? primero[0] : "Error al registrar usuario");
            } else if (data?.title) {
                setError(data.title);
            } else {
                setError("Error al registrar usuario");
            }
        }
    }

    return (
        <>
            <Navbar />

            <div
                className="relative min-h-[calc(100vh-160px)] bg-cover bg-center flex items-center justify-center py-10 px-6"
                style={{ backgroundImage: `url(${loginFondo})` }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative overflow-hidden z-10 w-full max-w-[540px] rounded-3xl bg-white/85 backdrop-blur-md border border-[#A855F7] shadow-2xl">
                    <img
                        src={loginFondo}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                    />

                    <div className="relative z-10 p-8">
                        <h1 className="text-4xl font-extrabold text-center mb-2">
                            Tec <span className="text-[#A855F7]">No</span> Jutso
                        </h1>

                        <p className="text-center text-gray-600 mb-8">
                            Crea tu cuenta
                        </p>

                        {mensaje && (
                            <p className="bg-green-100 text-green-600 text-center rounded-xl py-2 mb-5 font-semibold">
                                {mensaje}
                            </p>
                        )}

                        {error && (
                            <p className="bg-red-100 text-red-600 text-center rounded-xl py-2 mb-5 font-semibold">
                                {error}
                            </p>
                        )}

                        <form onSubmit={manejarRegistro}>
                            <label className="font-bold text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={datos.nombre}
                                onChange={manejarCambio}
                                placeholder="Tu nombre completo"
                                className="w-full mt-2 mb-4 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <label className="font-bold text-gray-700">Usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={datos.username}
                                onChange={manejarCambio}
                                placeholder="Nombre de usuario"
                                className="w-full mt-2 mb-4 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <label className="font-bold text-gray-700">Correo</label>
                            <input
                                type="email"
                                name="correo"
                                value={datos.correo}
                                onChange={manejarCambio}
                                placeholder="correo@ejemplo.com"
                                className="w-full mt-2 mb-4 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <label className="font-bold text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={datos.telefono}
                                onChange={manejarCambio}
                                placeholder="88887777"
                                className="w-full mt-2 mb-4 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <label className="font-bold text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={datos.password}
                                onChange={manejarCambio}
                                placeholder="Mínimo 6 caracteres"
                                className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <button className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white py-3 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-[#A855F7]/60">
                                Registrarse
                            </button>
                        </form>

                        <p className="text-center mt-6 text-gray-700">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="font-bold text-[#A855F7] hover:underline">
                                Iniciar sesión
                            </Link>
                        </p>

                        <Link
                            to="/"
                            className="block text-center mt-5 text-gray-500 hover:text-[#A855F7]"
                        >
                            ← Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Registro;