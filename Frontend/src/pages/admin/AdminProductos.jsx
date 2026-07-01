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

    
    const [imagen, setImagen] = useState(null);

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
            setMensaje("No se pudo conectar con el backend.");
        }
    }

    function manejarCambio(e) {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    }

    function manejarImagen(e) {
        setImagen(e.target.files[0]);
    }

    
    async function guardarProducto(e) {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("nombre", producto.nombre);
            formData.append("precio", Number(producto.precio));
            formData.append("stock", Number(producto.stock));

            
            if (imagen) {
                formData.append("imagen", imagen);
            }

            if (producto.id === 0) {
                await crearProducto(formData);
            } else {
                await editarProducto(producto.id, formData);
            }

            limpiarFormulario();
            cargarProductos();

        } catch (error) {
            console.error("Error producto:", error.response?.data);
            setMensaje("No se pudo guardar el producto.");
        }
    }

    function seleccionarProducto(p) {
        setProducto({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock,
        });

        setImagen(null);

        formularioRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    async function borrarProducto(id) {
        const confirmar = window.confirm("¿Deseas eliminar este producto?");
        if (!confirmar) return;

        try {
            await eliminarProducto(id);
            cargarProductos();
        } catch (error) {
            console.error(error);
            setMensaje("No se pudo eliminar.");
        }
    }

    function limpiarFormulario() {
        setProducto({
            id: 0,
            nombre: "",
            precio: "",
            stock: "",
        });

        setImagen(null);
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
                            <div className="grid md:grid-cols-4 gap-5 mb-5">

                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={producto.nombre}
                                    onChange={manejarCambio}
                                    className="border rounded-xl px-4 py-3"
                                    required
                                />

                                <input
                                    type="number"
                                    name="precio"
                                    placeholder="Precio"
                                    value={producto.precio}
                                    onChange={manejarCambio}
                                    className="border rounded-xl px-4 py-3"
                                    required
                                />

                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock"
                                    value={producto.stock}
                                    onChange={manejarCambio}
                                    className="border rounded-xl px-4 py-3"
                                    required
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={manejarImagen}
                                    className="border rounded-xl px-4 py-3"
                                />

                                <button className="bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold rounded-xl">
                                    {producto.id === 0 ? "Guardar" : "Actualizar"}
                                </button>
                            </div>
                        </form>

                        {producto.id !== 0 && (
                            <button
                                onClick={limpiarFormulario}
                                className="mb-8 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-bold"
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
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Imagen</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {productos.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-6">
                                                No hay productos
                                            </td>
                                        </tr>
                                    ) : (
                                        productos.map((p) => (
                                            <tr key={p.id} className="border-b">

                                                <td>{p.id}</td>
                                                <td className="font-semibold">{p.nombre}</td>

                                                <td>₡{Number(p.precio).toLocaleString("es-CR")}</td>

                                                <td>{p.stock}</td>

                                                
                                                <td>
                                                    {p.imagen && (
                                                        <img
                                                            src={p.imagen}
                                                            alt={p.nombre}
                                                            className="w-14 h-14 object-cover rounded"
                                                        />
                                                    )}
                                                </td>

                                                <td>
                                                    <button
                                                        onClick={() => seleccionarProducto(p)}
                                                        className="bg-purple-200 px-3 py-1 rounded mr-2"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => borrarProducto(p.id)}
                                                        className="bg-red-200 px-3 py-1 rounded"
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