import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { obtenerPerfil } from "../services/authService";

function MiCuenta() {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarPerfil();
    }, []);

    async function cargarPerfil() {
        try {
            setLoading(true);

            const response = await obtenerPerfil();

            setPerfil(response.data);
        } catch (err) {
            console.error(err);
            setError("No se pudo cargar la información del perfil");
        } finally {
            setLoading(false);
        }
    }

    const iniciales = perfil?.nombre
        ? perfil.nombre
            .trim()
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "?";

    const campos = perfil
        ? [
            { label: "Nombre completo", valor: perfil.nombre },
            { label: "Usuario", valor: `@${perfil.username}` },
            { label: "Correo electrónico", valor: perfil.correo },
            { label: "Teléfono", valor: perfil.telefono || "No registrado" },
        ]
        : [];

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            <Navbar />

            <section className="flex-1 w-full">
                <div className="max-w-3xl mx-auto px-6 py-16">

                    
                    <div className="mb-10">
                        <span className="text-xs font-semibold tracking-[0.2em] text-[#A855F7] uppercase">
                            Perfil
                        </span>
                        <h1 className="text-4xl font-extrabold mt-2">
                            Mi cuenta
                        </h1>
                    </div>

                    
                    {loading && (
                        <div className="rounded-2xl border border-gray-200 p-10 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#A855F7] animate-spin" />
                            <p className="text-gray-500">Cargando tu información...</p>
                        </div>
                    )}

                    
                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="text-red-600 font-semibold">{error}</p>
                            <button
                                onClick={cargarPerfil}
                                className="mt-3 text-sm text-red-700 underline underline-offset-2 hover:text-red-900"
                            >
                                Intentar de nuevo
                            </button>
                        </div>
                    )}

                    
                    {!loading && !error && perfil && (
                        <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

                            
                            <div className="relative bg-black px-8 pt-10 pb-16">
                                <div
                                    className="absolute inset-0 opacity-40"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 15% 20%, rgba(168,85,247,0.35), transparent 55%)",
                                    }}
                                />
                                <div className="relative flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-[#A855F7] text-white flex items-center justify-center text-xl font-bold shrink-0">
                                        {iniciales}
                                    </div>
                                    <div>
                                        <p className="text-white text-2xl font-bold leading-tight">
                                            {perfil.nombre}
                                        </p>
                                        <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-white/10 px-3 py-1 rounded-full">
                                            {perfil.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="bg-white px-8 -mt-6 relative">
                                <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
                                    {campos.map((campo) => (
                                        <div
                                            key={campo.label}
                                            className="px-6 py-5 flex items-center justify-between gap-6"
                                        >
                                            <span className="text-sm font-medium text-gray-500">
                                                {campo.label}
                                            </span>
                                            <span className="text-base font-semibold text-right">
                                                {campo.valor}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-8" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default MiCuenta;