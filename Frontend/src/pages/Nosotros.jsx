import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grupo3 from "../assets/Grupo3.png";

import {
  Target,
  Eye,
  HeartHandshake,
  Keyboard,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";

function Nosotros() {
  const esencia = [
    {
      titulo: "Valores",
      icono: <HeartHandshake size={58} />,
      texto: "Trabajamos con creatividad, responsabilidad y pasión para ofrecer productos únicos inspirados en el mundo anime y gamer.",
    },
    {
      titulo: "Misión",
      icono: <Target size={58} />,
      texto: "Ofrecer productos tecnológicos personalizados con diseños inspirados en anime, brindando calidad, estilo y una experiencia diferente para cada cliente.",
    },
    {
      titulo: "Visión",
      icono: <Eye size={58} />,
      texto: "Ser una tienda reconocida por unir la tecnología, el anime y el mundo gamer, creando productos originales que destaquen en cualquier setup.",
    },
  ];

  const ventajas = [
    {
      titulo: "Diseños únicos",
      icono: <Keyboard size={58} />,
      texto: "Productos personalizados con estilos exclusivos de tus animes favoritos.",
    },
    {
      titulo: "Estilo gamer",
      icono: <Star size={58} />,
      texto: "Accesorios pensados para setups modernos, llamativos y diferentes.",
    },
    {
      titulo: "Calidad garantizada",
      icono: <ShieldCheck size={58} />,
      texto: "Materiales resistentes, acabados premium y productos que realmente rinden.",
    },
    {
      titulo: "Compra fácil",
      icono: <Truck size={58} />,
      texto: "Encuentra todo lo que necesitas en un solo lugar, con atención rápida y segura.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-16 font-[Poppins]">
  <div className="grid lg:grid-cols-2 gap-14 items-center">
    
    <div>
      <div className="w-36 h-1 bg-[#A855F7] rounded-full mb-6"></div>

      <h1 className="text-5xl font-extrabold leading-tight">
        Creando tecnología
        <br />
        con identidad anime
      </h1>

      <p className="text-xl text-gray-700 mt-8 leading-9">
        En <span className="font-bold text-[#A855F7]">Tec no Jutso</span> somos
        un equipo apasionado por la tecnología, el anime y el diseño. Nuestro
        proyecto nace con la idea de transformar accesorios comunes en productos
        únicos que reflejen la personalidad de cada cliente.
      </p>

      <p className="text-xl text-gray-700 mt-6 leading-9">
        Más que vender teclados, ratones, almohadillas o monitores, buscamos
        crear una experiencia diferente para quienes desean que su setup tenga
        estilo, calidad y una esencia propia.
      </p>
    </div>

    <div className="h-[500px] overflow-hidden rounded-2xl shadow-2xl">
  <img
    src={Grupo3}
    alt="Equipo Tec no Jutso"
    className="w-full h-full object-cover hover:scale-105 transition duration-500"
  />
</div>

  </div>
</section>

      <section className="px-10 py-10"></section>

      <section className="px-10 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold uppercase">
            Nuestra Esencia
          </h1>
          <p className="text-gray-600 mt-2">
            Más que una tienda, una comunidad que comparte tu pasión.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {esencia.map((item, index) => (
            <div
              key={index}
              className="group bg-white text-black border-2 border-[#A855F7] rounded-xl p-8 text-center shadow-[0_0_18px_#A855F7]/40 hover:bg-[#A855F7] hover:text-white hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mx-auto mb-5 w-24 h-24 rounded-full bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] group-hover:bg-white group-hover:text-[#A855F7] transition-all duration-300">
                {item.icono}
              </div>

              <h2 className="text-2xl font-bold text-[#A855F7] group-hover:text-white mb-4">
                {item.titulo}
              </h2>

              <p className="leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold uppercase">
            Nuestras Ventajas
          </h2>
          <p className="text-gray-600 mt-2">
            Lo que nos hace diferentes.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {ventajas.map((item, index) => (
            <div
              key={index}
              className="group bg-white text-black border-2 border-[#A855F7] rounded-xl p-6 text-center shadow-md hover:bg-[#A855F7] hover:text-white hover:-translate-y-2 hover:shadow-[0_0_25px_#A855F7] transition-all duration-300"
            >
              <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] group-hover:bg-white group-hover:text-[#A855F7] transition-all duration-300">
                {item.icono}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.titulo}
              </h3>

              <p className="leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Nosotros;