import logo from "../assets/LogoTecNoJutso.png";

function Footer() {
  return (
    <footer className="bg-black text-white px-10 py-10">
      <div className="grid md:grid-cols-3 gap-10 items-center">
        
        <div>
          
          <h2 className="text-xl font-bold text-[#A855F7]">
            Tec no Jutso
          </h2>
          <p className="text-gray-300 mt-3">
            Tecnología personalizada con estilo anime.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3 text-[#A855F7]">
            Contacto
          </h3>
          <p>Teléfono: 86597476</p>
          <p>Correo: contacto@tecnojutso.com</p>
          <p>Ubicación: Costa Rica</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3 text-[#A855F7]">
            Horario
          </h3>
          <p>Lunes a viernes: 9:00 a.m. - 6:00 p.m.</p>
          <p>Sábado: 9:00 a.m. - 2:00 p.m.</p>
          <p>Domingo: Cerrado</p>
        </div>
      </div>

      <div className="border-t border-[#A855F7] mt-8 pt-5 text-center text-gray-400">
        © 2026 Tec no Jutso. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;