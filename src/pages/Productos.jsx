import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductoCard from "../components/ProductoCard";

import TecladoFairy from "../assets/TecladoFairy.png";

function Productos() {
  const productoEjemplo = {
    id: 1,
    nombre: "Teclado Fairy Tail",
    precio: "56 900",
    stock: 8,
    imagen: TecladoFairy,
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">
            Productos
          </h1>

          <p className="text-gray-600 text-xl mt-4">
            Accesorios tecnológicos inspirados en tus animes favoritos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ProductoCard producto={productoEjemplo} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Productos;