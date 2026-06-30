import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginFondo from "../assets/LoginFondo.png";
import { loginUsuario } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        username: "",
        password: "",
    });

    const [mensaje, setMensaje] = useState("");

    function manejarCambio(e) {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    }

    async function iniciarSesion(e) {
        e.preventDefault();

        try {
            const respuesta = await loginUsuario(datos);

            // 🔥 TOKEN
            localStorage.setItem("token", respuesta.data.token);

            // 🔥 USER COMPLETO
            localStorage.setItem("user", JSON.stringify(respuesta.data.user));

            // 🔥 ROLE (ESTO ES LO QUE TE FALTABA)
            localStorage.setItem(
                "role",
                (respuesta.data.user.role || "").toLowerCase()
            );

            navigate("/");
        } catch (error) {
            console.error(error);
            setMensaje("Usuario o contraseña incorrectos.");
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
                            Inicia sesión para continuar
                        </p>

                        {mensaje && (
                            <p className="bg-red-100 text-red-600 text-center rounded-xl py-2 mb-5 font-semibold">
                                {mensaje}
                            </p>
                        )}

                        <form onSubmit={iniciarSesion}>
                            <label className="font-bold text-gray-700">Usuario</label>

                            <input
                                type="text"
                                name="username"
                                value={datos.username}
                                onChange={manejarCambio}
                                placeholder="Ingresa tu usuario"
                                className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <label className="font-bold text-gray-700">Contraseña</label>

                            <input
                                type="password"
                                name="password"
                                value={datos.password}
                                onChange={manejarCambio}
                                placeholder="Ingresa tu contraseña"
                                className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-[#A855F7]"
                                required
                            />

                            <button className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white py-3 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-[#A855F7]/60">
                                Iniciar Sesión
                            </button>
                        </form>

                        <p className="text-center mt-6 text-gray-700">
                            ¿No tienes cuenta?{" "}
                            <Link to="/registro" className="font-bold text-[#A855F7] hover:underline">
                                Registrarse
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

export default Login;