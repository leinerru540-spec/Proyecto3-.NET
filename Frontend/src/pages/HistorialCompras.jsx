import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { obtenerHistorialCompras } from "../services/historialComprasService";

function HistorialCompras() {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarHistorial();
    }, []);

    async function cargarHistorial() {
        try {
            setLoading(true);

            const response = await obtenerHistorialCompras();

            console.log("Historial:", response.data);

            setCompras(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("No se pudo cargar el historial de compras.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF7FF] text-black">
            <Navbar />

            <section className="max-w-7xl mx-auto px-8 py-12">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">

                    <div className="bg-[#E9D5FF] px-8 py-5">
                        <h1 className="text-3xl font-bold text-[#6B21A8]">
                            Mi Historial de Compras
                        </h1>
                    </div>

                    <div className="p-8">

                        {loading && (
                            <div className="mb-6 bg-purple-50 border border-purple-200 text-[#6B21A8] px-5 py-3 rounded-xl text-center">
                                Cargando historial...
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {!loading && !error && (
                            <>
                                <h2 className="text-xl font-bold text-[#7E22CE] mb-5">
                                    Compras Registradas
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#F3E8FF] text-[#6B21A8]">
                                                <th className="py-4 px-4 text-left">Fecha</th>
                                                <th className="py-4 px-4 text-left">Imagen</th>
                                                <th className="py-4 px-4 text-left">Producto</th>
                                                <th className="py-4 px-4 text-left">Cantidad</th>
                                                <th className="py-4 px-4 text-left">Total</th>
                                                <th className="py-4 px-4 text-left">Método de Pago</th>
                                                <th className="py-4 px-4 text-left">Estado</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {compras.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="py-8 text-center text-gray-500"
                                                    >
                                                        Todavía no tienes compras registradas.
                                                    </td>
                                                </tr>
                                            ) : (
                                                compras.map((c) => (
                                                    <tr
                                                        key={c.ventaId}
                                                        className="border-b hover:bg-purple-50 transition"
                                                    >
                                                        <td className="py-4 px-4">
                                                            {new Date(c.fecha).toLocaleDateString("es-CR")}
                                                        </td>

                                                        <td className="py-4 px-4">
                                                            {c.imagen ? (
                                                                <img
                                                                    src={c.imagen}
                                                                    alt={c.productoNombre}
                                                                    className="w-14 h-14 object-cover rounded-xl border border-purple-200"
                                                                />
                                                            ) : (
                                                                <span className="text-gray-400 text-sm">
                                                                    Sin imagen
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="py-4 px-4 font-semibold">
                                                            {c.productoNombre}
                                                        </td>

                                                        <td className="py-4 px-4">
                                                            {c.cantidad}
                                                        </td>

                                                        <td className="py-4 px-4 text-[#A855F7] font-bold">
                                                            ₡{Number(c.total).toLocaleString("es-CR")}
                                                        </td>

                                                        <td className="py-4 px-4">
                                                            {c.metodoPago}
                                                        </td>

                                                        <td className="py-4 px-4">
                                                            {c.estadoPago}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HistorialCompras;