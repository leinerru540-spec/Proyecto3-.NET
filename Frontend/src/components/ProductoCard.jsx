import { useState } from "react";
import { crearOrdenPayPal } from "../services/paypalService";
import { useCarrito } from "../context/CarritoContext";

function ProductoCard({ producto }) {
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(false);
    const { agregarProducto } = useCarrito();

    const sinStock = producto.stock <= 0;

    const aumentar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuir = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    function manejarAgregarCarrito() {
        if (sinStock) return;
        agregarProducto(producto, cantidad);
        alert(`${producto.nombre} agregado al carrito`);
    }

    async function manejarCompra() {
        if (sinStock) return;

        try {
            setLoading(true);
            const amount = producto.precio * cantidad;

            localStorage.setItem("productoId", producto.id);
            localStorage.setItem("cantidad", cantidad);

            const res = await crearOrdenPayPal(amount);
            const data = res.data;
            const approveUrl = data.links.find((l) => l.rel === "approve")?.href;

            if (!approveUrl) {
                throw new Error("No se encontró URL de aprobación");
            }

            window.location.href = approveUrl;
        } catch (error) {
            console.error(error);
            alert("Error al iniciar pago");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_#A855F7]/40 transition-all duration-300">

            <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className={`w-full h-full object-cover ${sinStock ? "opacity-50" : ""}`}
                />
                {sinStock && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Sin stock
                    </span>
                )}
            </div>

            <div className="p-6">

                <h2 className="text-2xl font-bold mb-3">
                    {producto.nombre}
                </h2>

                <p className="text-3xl font-extrabold text-[#A855F7] mb-2">
                    ₡ {Number(producto.precio).toLocaleString("es-CR")}
                </p>

                <p className="text-gray-600 mb-5">
                    Stock:{" "}
                    <span className={`font-bold ${sinStock ? "text-red-600" : ""}`}>
                        {producto.stock}
                    </span>
                </p>

                {!sinStock && (
                    <div className="flex items-center justify-between mb-6">
                        <p className="font-semibold">Cantidad</p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={disminuir}
                                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                            >
                                -
                            </button>

                            <span className="text-xl font-bold w-8 text-center">
                                {cantidad}
                            </span>

                            <button
                                onClick={aumentar}
                                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <button
                        onClick={manejarAgregarCarrito}
                        disabled={sinStock}
                        className="w-full bg-white border-2 border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7] hover:text-white py-3 rounded-2xl font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#A855F7]"
                    >
                        {sinStock ? "Sin stock" : "Agregar al carrito"}
                    </button>

                    <button
                        onClick={manejarCompra}
                        disabled={loading || sinStock}
                        className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white py-3 rounded-2xl font-bold text-lg transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {sinStock ? "Sin stock" : loading ? "Redirigiendo..." : "Comprar ahora"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProductoCard;