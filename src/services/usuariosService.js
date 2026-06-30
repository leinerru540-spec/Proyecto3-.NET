import api from "../api/api";

export const obtenerUsuarios = () => api.get("/Auth/users");

export const crearUsuario = (usuario) =>
  api.post("/Auth/users", usuario);

export const editarUsuario = (id, usuario) =>
  api.put(`/Auth/users/${id}`, usuario);

export const eliminarUsuario = (id) =>
  api.delete(`/Auth/users/${id}`);