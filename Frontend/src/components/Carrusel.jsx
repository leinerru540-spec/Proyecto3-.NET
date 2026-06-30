import { useEffect, useState } from "react";
import Carrusel1 from "../assets/Carrusel1.png";
import Carrusel2 from "../assets/Carrusel2.png";
import Carrusel3 from "../assets/Carrusel3.png";
import Carrusel4 from "../assets/Carrusel4.png";
import Carrusel5 from "../assets/Carrusel5.png";
import Carrusel6 from "../assets/Carrusel6.png";

function Carrusel() {
    const imagenes = [
        Carrusel1,
        Carrusel2,
        Carrusel3,
        Carrusel4,
        Carrusel5,
        Carrusel6,
    ];

    const [actual, setActual] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setActual((prev) => (prev + 1) % imagenes.length);
        }, 4000);

        return () => clearInterval(intervalo);
    }, [imagenes.length]);

    const siguiente = () => {
        setActual((prev) => (prev + 1) % imagenes.length);
    };

    const anterior = () => {
        setActual((prev) =>
            prev === 0 ? imagenes.length - 1 : prev - 1
        );
    };

    return (
        <section className="relative  w-full h-[300px] overflow-hidden shadow-2xl mt-0 bg-black">
            <img
                src={imagenes[actual]}
                alt="Carrusel Tec no Jutso"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />

            <button
                onClick={anterior}
                className="absolute left-6 top-1/2 -translate-y-1/2
                w-14 h-14 rounded-full
                bg-black/45 backdrop-blur-sm
                text-white text-3xl
                flex items-center justify-center
                hover:bg-[#A855F7]
                hover:scale-110
                transition-all duration-300"
            >
                ❮
            </button>

            <button
                onClick={siguiente}
                className="absolute right-6 top-1/2 -translate-y-1/2
                w-14 h-14 rounded-full
                bg-black/45 backdrop-blur-sm
                text-white text-3xl
                flex items-center justify-center
                hover:bg-[#A855F7]
                hover:scale-110
                transition-all duration-300"
            >
                ❯
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
                {imagenes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActual(index)}
                        className={`w-3 h-3 rounded-full transition ${actual === index ? "bg-[#A855F7] scale-125" : "bg-white/70"
                            }`}
                    ></button>
                ))}
            </div>
        </section>
    );
}

export default Carrusel;