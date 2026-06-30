import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductoCard from "../components/ProductoCard";

import { obtenerProductos } from "../services/productosService";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarProductos();
    }, []);

    async function cargarProductos() {
        try {
            setLoading(true);

            const response = await obtenerProductos();

            setProductos(response.data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los productos");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            <section className="max-w-7xl mx-auto px-8 py-14">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold">Productos</h1>

                    <p className="text-gray-600 text-xl mt-4">
                        Accesorios tecnológicos inspirados en tus animes favoritos.
                    </p>
                </div>

               
                {loading && (
                    <p className="text-center text-gray-500">
                        Cargando productos...
                    </p>
                )}

                
                {error && (
                    <p className="text-center text-red-500 font-bold">
                        {error}
                    </p>
                )}

                
                {!loading && !error && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <ProductoCard
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No hay productos disponibles
                            </p>
                        )}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Productos;