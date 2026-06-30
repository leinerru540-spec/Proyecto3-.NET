import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import { useCarrito } from "../context/CarritoContext";

function PagoExitoso() {
    const [params] = useSearchParams();
    const [estado, setEstado] = useState("Procesando pago...");
    const ejecutado = useRef(false);
    const { vaciarCarrito } = useCarrito();

    useEffect(() => {
        if (ejecutado.current) return;
        ejecutado.current = true;

        const token = params.get("token");

        if (!token) {
            setEstado("Error: pago inválido");
            return;
        }

        async function capturarYGuardar() {
            try {
                await api.post(`/PayPal/capture-order?token=${token}`);
                console.log("Capture OK");
            } catch (err) {
                console.error("capture-order:", err.response?.data);
                setEstado("Error al capturar pago");
                return;
            }

            try {
                const carrito = JSON.parse(
                    localStorage.getItem("carritoCompra") || "[]"
                );

                if (carrito.length === 0) {
                    setEstado("Pago OK pero no se encontró el carrito");
                    return;
                }

                const userId = Number(localStorage.getItem("userId"));

                for (const item of carrito) {
                    const venta = {
                        userId,
                        productoId: item.id,
                        cantidad: item.cantidad
                    };
                    console.log("Venta:", venta);

                    const ventaRes = await api.post("/Ventas", venta);
                    console.log("Venta OK:", ventaRes.data.id);

                    await api.post("/Pagos", {
                        ventaId: ventaRes.data.id,
                        clienteId: userId,
                        monto: ventaRes.data.total,
                        metodoPago: "PayPal",
                        codigoAutorizacion: token,
                        estado: "Completado"
                    });
                    console.log("Pago registrado para venta", ventaRes.data.id);
                }

                localStorage.removeItem("carritoCompra");
                vaciarCarrito();

                setEstado("¡Pago exitoso y venta guardada!");

            } catch (err) {
                console.error("Error:", err.response?.data);
                setEstado("Pago OK pero error al guardar venta");
            }
        }

        capturarYGuardar();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF7FF] text-black flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
                    <h1 className="text-3xl font-bold text-green-600">
                        {estado}
                    </h1>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default PagoExitoso;