import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginFondo from "../assets/LoginFondo.png";
import { obtenerPerfil } from "../services/authService";

function MiCuenta() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function cargarPerfil() {
    try {
      setLoading(true);
      const response = await obtenerPerfil();
      setPerfil(response.data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la información del perfil");
    } finally {
      setLoading(false);
    }
  }

  const iniciales = perfil?.nombre
    ? perfil.nombre
        .trim()
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const campos = perfil
    ? [
        { label: "Nombre completo", valor: perfil.nombre },
        { label: "Usuario", valor: `@${perfil.username}` },
        { label: "Correo electrónico", valor: perfil.correo },
        { label: "Teléfono", valor: perfil.telefono || "No registrado" },
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Navbar />

      <section
        className="relative flex-1 bg-cover bg-center px-6 py-16"
        style={{ backgroundImage: `url(${loginFondo})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#A855F7] font-bold tracking-[8px] uppercase text-sm">
              ✦ Perfil ✦
            </p>
          </div>

          {loading && (
            <div className="bg-white/90 rounded-3xl p-10 text-center shadow-2xl">
              <p className="text-gray-600 font-semibold">
                Cargando tu información...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 rounded-3xl p-8 text-center shadow-2xl">
              <p className="text-red-600 font-bold">{error}</p>
              <button
                onClick={cargarPerfil}
                className="mt-4 text-red-700 underline font-bold"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {!loading && !error && perfil && (
            <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-[#C084FC] shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              <img
                src={loginFondo}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />

              <div className="relative z-10 bg-[#F3E8FF] px-8 py-10 border-b border-[#E9D5FF]">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[#C084FC] text-[#A855F7] flex items-center justify-center text-3xl font-black shadow-[0_0_20px_rgba(168,85,247,0.45)]">
                    {iniciales}
                  </div>

                  <div>
                    <h2 className="text-[#6B21A8] text-3xl font-black">
                      {perfil.nombre}
                    </h2>

                    <span className="inline-block mt-2 text-xs font-bold uppercase tracking-wider text-[#6B21A8] bg-white px-4 py-1 rounded-full border border-[#D8B4FE]">
                      {perfil.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-8">
                <div className="overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white">
                  {campos.map((campo) => (
                    <div
                      key={campo.label}
                      className="px-6 py-5 flex items-center justify-between gap-6 border-b border-[#F3E8FF] last:border-b-0 hover:bg-[#FAF5FF] transition"
                    >
                      <span className="text-sm font-bold text-[#7E22CE]">
                        {campo.label}
                      </span>

                      <span className="text-base font-bold text-right text-black">
                        {campo.valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MiCuenta;
