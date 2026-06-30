import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext();

function getStorageKey() {
    const userId = localStorage.getItem("userId");
    return userId ? `carrito_${userId}` : "carrito_invitado";
}

function leerCarritoGuardado() {
    const guardado = localStorage.getItem(getStorageKey());
    return guardado ? JSON.parse(guardado) : [];
}

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => leerCarritoGuardado());

    // Guarda cada cambio bajo la key del usuario actual
    useEffect(() => {
        localStorage.setItem(getStorageKey(), JSON.stringify(carrito));
    }, [carrito]);

    // Se llama después de login/logout para cargar el carrito correcto
    function recargarCarrito() {
        setCarrito(leerCarritoGuardado());
    }

    function agregarProducto(producto, cantidad) {
        if (producto.stock <= 0) return;

        setCarrito((prev) => {
            const existente = prev.find((item) => item.id === producto.id);

            if (existente) {
                const nuevaCantidad = Math.min(
                    existente.cantidad + cantidad,
                    producto.stock
                );
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: nuevaCantidad }
                        : item
                );
            }

            const cantidadFinal = Math.min(cantidad, producto.stock);

            return [
                ...prev,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    stock: producto.stock,
                    cantidad: cantidadFinal,
                },
            ];
        });
    }

    function actualizarCantidad(id, cantidad) {
        setCarrito((prev) =>
            prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
        );
    }

    function eliminarProducto(id) {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    }

    function vaciarCarrito() {
        setCarrito([]);
        localStorage.removeItem(getStorageKey());
    }

    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarProducto,
                actualizarCantidad,
                eliminarProducto,
                vaciarCarrito,
                recargarCarrito,
                total,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}