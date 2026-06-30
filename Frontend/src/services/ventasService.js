import api from "../api/api";


export const obtenerVentas = () =>
    api.get("/Ventas");


export const crearVenta = (venta) =>
    api.post("/Ventas", venta);


export const editarVenta = (id, venta) =>
    api.put(`/Ventas/${id}`, venta);


export const eliminarVenta = (id) =>
    api.delete(`/Ventas/${id}`);