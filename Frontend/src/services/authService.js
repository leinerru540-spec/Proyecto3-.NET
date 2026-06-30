import api from "../api/api";

export const loginUsuario = (datos) => api.post("/Auth/login", datos);
export const obtenerPerfil = () => api.get("/Auth/me");