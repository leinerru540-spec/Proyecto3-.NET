import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  obtenerVentas,
  crearVenta,
  editarVenta,
  eliminarVenta,
} from "../../services/ventasService";

import { obtenerProductos } from "../../services/productosService";
import { obtenerUsuarios } from "../../services/usuariosService";

function AdminVentas() {
  const editarRef = useRef(null);

  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [venta, setVenta] = useState({
    id: 0,
    userId: "",
    productoId: "",
    cantidad: 1,
    fecha: "",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const ventasRes = await obtenerVentas();
      const usuariosRes = await obtenerUsuarios();
      const productosRes = await obtenerProductos();

      setVentas(ventasRes.data);
      setUsuarios(usuariosRes.data);
      setProductos(productosRes.data);
      setMensaje("");
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo conectar con el backend. La vista está lista para cuando se conecte.");
    }
  }

  function manejarCambio(e) {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: value });
  }

  async function guardarVenta(e) {
    e.preventDefault();

    const datos = {
      id: venta.id,
      userId: Number(venta.userId),
      productoId: Number(venta.productoId),
      cantidad: Number(venta.cantidad),
      fecha: venta.fecha || new Date().toISOString(),
      total: 0,
    };

    try {
      if (venta.id === 0) {
        await crearVenta(datos);
      } else {
        await editarVenta(venta.id, datos);
      }

      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error(error);
      setMensaje("No fue posible guardar. Cuando el backend esté activo funcionará.");
    }
  }

  function seleccionarVenta(v) {
    setVenta({
      id: v.id,
      userId: v.userId,
      productoId: v.productoId,
      cantidad: v.cantidad,
      fecha: v.fecha ? v.fecha.substring(0, 10) : "",
    });

    editarRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function borrarVenta(id) {
    if (!window.confirm("¿Deseas eliminar esta venta?")) return;

    try {
      await eliminarVenta(id);
      cargarDatos();
    } catch (error) {
      console.error(error);
      setMensaje("No fue posible eliminar. Cuando el backend esté activo funcionará.");
    }
  }

  function limpiarFormulario() {
    setVenta({
      id: 0,
      userId: "",
      productoId: "",
      cantidad: 1,
      fecha: "",
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF7FF] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
          <div className="bg-[#E9D5FF] px-8 py-5">
            <h1 className="text-3xl font-bold text-[#6B21A8]">
              Gestión de Ventas
            </h1>
          </div>

          <div className="p-8">
            {mensaje && (
              <div className="mb-6 bg-purple-50 border border-purple-200 text-[#6B21A8] px-5 py-3 rounded-xl">
                {mensaje}
              </div>
            )}

            <h2 ref={editarRef} className="text-xl font-bold text-[#7E22CE] mb-5">
              {venta.id === 0 ? "Crear Venta" : "Editar Venta"}
            </h2>

            <form onSubmit={guardarVenta}>
              <div className="grid md:grid-cols-5 gap-5 mb-8">
                <select
                  name="userId"
                  value={venta.userId}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                >
                  <option value="">Seleccione usuario</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>

                <select
                  name="productoId"
                  value={venta.productoId}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                >
                  <option value="">Seleccione producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="cantidad"
                  min="1"
                  placeholder="Cantidad"
                  value={venta.cantidad}
                  onChange={manejarCambio}
                  required
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                />

                <input
                  type="date"
                  name="fecha"
                  value={venta.fecha}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C084FC]"
                />

                <button className="bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold rounded-xl transition">
                  {venta.id === 0 ? "Guardar" : "Actualizar"}
                </button>
              </div>
            </form>

            {venta.id !== 0 && (
              <button
                onClick={limpiarFormulario}
                className="mb-8 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold"
              >
                Cancelar edición
              </button>
            )}

            <h2 className="text-xl font-bold text-[#7E22CE] mb-5">
              Ventas Registradas
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F3E8FF] text-[#6B21A8]">
                    <th className="py-4 px-4 text-left">ID</th>
                    <th className="py-4 px-4 text-left">Usuario</th>
                    <th className="py-4 px-4 text-left">Producto</th>
                    <th className="py-4 px-4 text-left">Precio unidad</th>
                    <th className="py-4 px-4 text-left">Cantidad</th>
                    <th className="py-4 px-4 text-left">Total</th>
                    <th className="py-4 px-4 text-left">Fecha</th>
                    <th className="py-4 px-4 text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {ventas.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-500">
                        No hay ventas registradas o el backend no está disponible.
                      </td>
                    </tr>
                  ) : (
                    ventas.map((v) => (
                      <tr key={v.id} className="border-b hover:bg-purple-50 transition">
                        <td className="py-4 px-4">{v.id}</td>

                        <td className="py-4 px-4 font-semibold">
                          {v.user?.nombre || `Usuario ID: ${v.userId}`}
                        </td>

                        <td className="py-4 px-4">
                          {v.producto?.nombre || `Producto ID: ${v.productoId}`}
                        </td>

                        <td className="py-4 px-4 text-[#7E22CE] font-bold">
                          ₡{Number(v.producto?.precio || 0).toLocaleString("es-CR")}
                        </td>

                        <td className="py-4 px-4">{v.cantidad}</td>

                        <td className="py-4 px-4 text-[#A855F7] font-bold">
                          ₡{Number(v.total).toLocaleString("es-CR")}
                        </td>

                        <td className="py-4 px-4">
                          {v.fecha ? new Date(v.fecha).toLocaleDateString("es-CR") : "Sin fecha"}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => seleccionarVenta(v)}
                            className="bg-[#DDD6FE] text-[#6B21A8] px-4 py-2 rounded-xl font-bold mr-2 hover:bg-[#C4B5FD]"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => borrarVenta(v.id)}
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

export default AdminVentas;