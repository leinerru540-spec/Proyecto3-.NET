import api from "../api/api";

export const loginUsuario = (datos) => api.post("/Auth/login", datos);
export const registrarUsuario = (datos) => api.post("/Auth/register", datos);
export const obtenerPerfil = () => api.get("/Auth/me");