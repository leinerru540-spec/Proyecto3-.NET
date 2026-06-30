import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PagoCancelado() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAF7FF] text-black flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">
                        Pago cancelado
                    </h1>
                    <p className="text-gray-600 mb-6">
                        El pago fue cancelado. ¿Deseas intentarlo de nuevo?
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-3 rounded-xl font-bold transition duration-300"
                    >
                        Volver
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default PagoCancelado;