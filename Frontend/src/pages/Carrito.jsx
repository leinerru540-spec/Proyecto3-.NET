import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    if (item.cantidad < item.stock) actualizarCantidad(item.id, item.cantidad + 1);
  }

  function disminuir(item) {
    if (item.cantidad > 1) actualizarCantidad(item.id, item.cantidad - 1);
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
      const approveUrl = res.data.links.find((l) => l.rel === "approve")?.href;

      if (!approveUrl) throw new Error("No se encontró URL de aprobación");

      window.location.href = approveUrl;
    } catch (error) {
      console.error(error);

      const erroresBackend = error.response?.data?.errores;

      if (erroresBackend?.length > 0) {
        setErrores(erroresBackend);
      } else {
        alert("Error al iniciar el pago");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-14">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-black">
            <span className="mx-4">Carrito de compras</span>
          </h1>

          <p className="text-gray-500 mt-4">
            Revisa tus productos antes de completar la compra.
          </p>
        </div>

        {carrito.length === 0 ? (
          <div className="bg-[#FAF7FF] border border-purple-100 rounded-3xl p-14 text-center shadow-lg">
            <h2 className="text-3xl font-black text-[#6B21A8] mb-4">
              Tu carrito está vacío
            </h2>

            <p className="text-gray-600 mb-8">
              Agregá productos desde la tienda para verlos acá.
            </p>

            <button
              onClick={() => navigate("/productos")}
              className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-8 py-3 rounded-2xl font-bold transition shadow-lg"
            >
              Ir a productos
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <section className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-[#F3E8FF] px-6 py-4 border-b border-purple-100">
                <h2 className="text-xl font-black text-[#6B21A8]">
                  Productos seleccionados
                </h2>
              </div>

              {errores.length > 0 && (
                <div className="m-6 bg-red-100 border border-red-300 text-red-700 rounded-2xl p-4">
                  <p className="font-bold mb-2">No se pudo procesar la compra:</p>
                  <ul className="list-disc list-inside">
                    {errores.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="divide-y divide-gray-100">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="grid md:grid-cols-[110px_1fr_150px_120px_40px] gap-5 items-center p-6 hover:bg-[#FAF5FF] transition"
                  >
                    <div className="w-28 h-28 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-black">{item.nombre}</h3>
                      <p className="text-[#A855F7] font-black mt-1">
                        ₡ {Number(item.precio).toLocaleString("es-CR")}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Stock disponible: {item.stock}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => disminuir(item)}
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-black">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => aumentar(item)}
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-[#A855F7] hover:text-white font-bold transition"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-right font-black text-[#6B21A8]">
                      ₡ {(item.precio * item.cantidad).toLocaleString("es-CR")}
                    </p>

                    <button
                      onClick={() => eliminarProducto(item.id)}
                      className="text-red-500 hover:text-red-700 font-black text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-[#FAF7FF] rounded-3xl border border-purple-100 shadow-lg p-6 sticky top-28">
              <h2 className="text-2xl font-black text-[#6B21A8] mb-6">
                Resumen
              </h2>

              <div className="space-y-4 border-b border-purple-200 pb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Productos</span>
                  <span>{carrito.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₡ {total.toLocaleString("es-CR")}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>Por confirmar</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="font-black text-xl">Total</span>
                <span className="text-3xl font-black text-[#A855F7]">
                  ₡ {total.toLocaleString("es-CR")}
                </span>
              </div>

              <button
                onClick={manejarPago}
                disabled={loading}
                className="w-full mt-8 bg-[#A855F7] hover:bg-[#9333EA] text-white py-4 rounded-2xl font-black text-lg transition shadow-lg disabled:opacity-60"
              >
                {loading ? "Validando stock..." : "Pagar todo"}
              </button>

              <button
                onClick={vaciarCarrito}
                className="w-full mt-4 text-gray-500 hover:text-red-500 font-bold transition"
              >
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Carrito;