import { useState } from "react";

function ProductoCard({ producto }) {
  const [cantidad, setCantidad] = useState(1);

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

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_#A855F7]/40 transition-all duration-300">
      
      <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-3">
          {producto.nombre}
        </h2>

        <p className="text-3xl font-extrabold text-[#A855F7] mb-2">
          ₡ {producto.precio}
        </p>

        <p className="text-gray-600 mb-5">
          Stock: <span className="font-bold">{producto.stock}</span>
        </p>

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

        <button className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white py-3 rounded-2xl font-bold text-lg transition shadow-lg">
          Comprar ahora
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;