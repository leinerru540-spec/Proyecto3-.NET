import api from "../api/api";

export const obtenerProductos = () => api.get("/Productos");

export const crearProducto = (producto) => api.post("/Productos", producto);

export const editarProducto = (id, producto) =>
  api.put(`/Productos/${id}`, producto);

export const eliminarProducto = (id) =>
  api.delete(`/Productos/${id}`);