import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../../services/productosService";

function AdminProductos() {
  const formularioRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    precio: "",
    stock: "",
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const respuesta = await obtenerProductos();
      setProductos(respuesta.data);
      setMensaje("");
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo conectar con el backend. La vista queda lista para cuando esté activo.");
    }
  }

  function manejarCambio(e) {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  }

  async function guardarProducto(e) {
    e.preventDefault();

    const datos = {
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
    };

    try {
      if (producto.id === 0) {
        await crearProducto(datos);
      } else {
        await editarProducto(producto.id, datos);
      }

      limpiarFormulario();
      cargarProductos();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo guardar. Cuando el backend esté activo, este botón funcionará.");
    }
  }

  function seleccionarProducto(p) {
    setProducto({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
    });

    formularioRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function borrarProducto(id) {
    const confirmar = window.confirm("¿Deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo eliminar. Cuando el backend esté activo, este botón funcionará.");
    }
  }

  function limpiarFormulario() {
    setProducto({
      id: 0,
      nombre: "",
      precio: "",
      stock: "",
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF7FF] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
          <div className="bg-[#E9D5FF] px-8 py-5">
            <h1 className="text-3xl font-bold text-[#6B21A8]">
              Gestión de Productos
            </h1>
          </div>

          <div className="p-8">
            {mensaje && (
              <div className="mb-6 bg-purple-50 border border-purple-200 text-[#6B21A8] px-5 py-3 rounded-xl">
                {mensaje}
              </div>
            )}

            <h2 ref={formularioRef} className="text-xl font-bold text-[#7E22CE] mb-5">
              Crear / Editar Producto
            </h2>

            <form onSubmit={guardarProducto}>
              <div className="grid md:grid-cols-4 gap-5 mb-8">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del producto"
                  value={producto.nombre}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                />

                <input
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  value={producto.precio}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={producto.stock}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                />

                <button className="bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold rounded-xl transition">
                  {producto.id === 0 ? "Guardar" : "Actualizar"}
                </button>
              </div>
            </form>

            {producto.id !== 0 && (
              <button
                onClick={limpiarFormulario}
                className="mb-8 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold"
              >
                Cancelar edición
              </button>
            )}

            <h2 className="text-xl font-bold text-[#7E22CE] mb-5">
              Productos Registrados
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F3E8FF] text-[#6B21A8]">
                    <th className="py-4 px-4 text-left">ID</th>
                    <th className="py-4 px-4 text-left">Nombre</th>
                    <th className="py-4 px-4 text-left">Precio</th>
                    <th className="py-4 px-4 text-left">Stock</th>
                    <th className="py-4 px-4 text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No hay productos registrados o el backend no está disponible.
                      </td>
                    </tr>
                  ) : (
                    productos.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-purple-50 transition">
                        <td className="py-4 px-4">{p.id}</td>
                        <td className="py-4 px-4 font-semibold">{p.nombre}</td>
                        <td className="py-4 px-4 text-[#A855F7] font-bold">
                          ₡{Number(p.precio).toLocaleString("es-CR")}
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                            {p.stock} unidades
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => seleccionarProducto(p)}
                            className="bg-[#DDD6FE] text-[#6B21A8] px-4 py-2 rounded-xl font-bold mr-2 hover:bg-[#C4B5FD]"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => borrarProducto(p.id)}
                            className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-200"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AdminProductos;