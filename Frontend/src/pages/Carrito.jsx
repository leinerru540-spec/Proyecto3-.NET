import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { crearOrdenPayPal } from "../services/paypalService";
import api from "../api/api";

function Carrito() {
    const { carrito, actualizarCantidad, eliminarProducto, vaciarCarrito, total } =
        useCarrito();
    const [loading, setLoading] = useState(false);
    const [errores, setErrores] = useState([]);
    const navigate = useNavigate();

    function aumentar(item) {
        if (item.cantidad < item.stock) {
            actualizarCantidad(item.id, item.cantidad + 1);
        }
    }

    function disminuir(item) {
        if (item.cantidad > 1) {
            actualizarCantidad(item.id, item.cantidad - 1);
        }
    }

    async function manejarPago() {
        if (carrito.length === 0) return;

        setErrores([]);

        try {
            setLoading(true);

            const items = carrito.map((item) => ({
                productoId: item.id,
                cantidad: item.cantidad,
            }));

            
            await api.post("/Ventas/validar-stock", items);

           
            localStorage.setItem("carritoCompra", JSON.stringify(carrito));

            const res = await crearOrdenPayPal(total);
            const data = res.data;

            const approveUrl = data.links.find((l) => l.rel === "approve")?.href;

            if (!approveUrl) {
                throw new Error("No se encontró URL de aprobación");
            }

            window.location.href = approveUrl;
        } catch (error) {
            console.error(error);

            const erroresBackend = error.response?.data?.errores;

            if (erroresBackend && erroresBackend.length > 0) {
                setErrores(erroresBackend);
            } else {
                alert("Error al iniciar el pago");
            }
        } finally {
            setLoading(false);
        }
    }

    if (carrito.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-600 mb-8">
                    Agregá productos desde la tienda para verlos acá.
                </p>
                <button
                    onClick={() => navigate("/productos")}
                    className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-3 rounded-2xl font-bold transition"
                >
                    Ir a productos
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#A855F7] font-semibold mb-6 transition"
            >
                ← Volver
            </button>

            <h1 className="text-3xl font-bold mb-8">Carrito de compras</h1>

            {errores.length > 0 && (
                <div className="bg-red-100 border border-red-300 text-red-700 rounded-2xl p-4 mb-6">
                    <p className="font-bold mb-2">No se pudo procesar la compra:</p>
                    <ul className="list-disc list-inside">
                        {errores.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {carrito.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white rounded-2xl shadow border border-gray-200 p-4"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="font-bold text-lg">{item.nombre}</h2>
                            <p className="text-[#A855F7] font-bold">
                                ₡ {Number(item.precio).toLocaleString("es-CR")}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => disminuir(item)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                            >
                                -
                            </button>
                            <span className="w-6 text-center font-bold">
                                {item.cantidad}
                            </span>
                            <button
                                onClick={() => aumentar(item)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                            >
                                +
                            </button>
                        </div>

                        <p className="font-bold w-28 text-right">
                            ₡ {(item.precio * item.cantidad).toLocaleString("es-CR")}
                        </p>

                        <button
                            onClick={() => eliminarProducto(item.id)}
                            className="text-red-500 hover:text-red-700 font-bold px-2"
                            title="Eliminar"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={vaciarCarrito}
                    className="text-gray-500 hover:text-red-500 font-semibold transition"
                >
                    Vaciar carrito
                </button>

                <div className="text-right">
                    <p className="text-gray-600 mb-1">Total</p>
                    <p className="text-3xl font-extrabold text-[#A855F7]">
                        ₡ {total.toLocaleString("es-CR")}
                    </p>
                </div>
            </div>

            <button
                onClick={manejarPago}
                disabled={loading}
                className="w-full mt-8 bg-[#A855F7] hover:bg-[#9333EA] text-white py-4 rounded-2xl font-bold text-lg transition shadow-lg disabled:opacity-60"
            >
                {loading ? "Validando stock..." : "Pagar todo"}
            </button>
        </div>
    );
}

export default Carrito;