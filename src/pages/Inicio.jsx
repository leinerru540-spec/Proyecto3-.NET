import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Carrusel from "../components/Carrusel";
import InicioImagen from "../assets/InicioImagen.png";

function Inicio() {
  return (
    <div className="min-h-screen bg-white text-black">

      <Navbar />

      <Carrusel />

       <section className="w-full py-10 flex justify-center">
        <img
          src={InicioImagen}
          alt="Inicio Tec No Jutso"
          className="w-full"
        />
      </section>

      <Footer />

    </div>
  );
}

export default Inicio;