import api from "../api/api";

export const obtenerProductos = () => {
    return api.get("/Productos");
};

export const obtenerProducto = (id) => {
    return api.get(`/Productos/${id}`);
};

export const crearProducto = (producto) => {
    return api.post("/Productos", producto);
};

export const editarProducto = (id, producto) => {
    return api.put(`/Productos/${id}`, producto);
};

export const eliminarProducto = (id) => {
    return api.delete(`/Productos/${id}`);
};