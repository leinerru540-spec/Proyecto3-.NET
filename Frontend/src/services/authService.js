import api from "../api/api";

export const loginUsuario = (datos) => api.post("/Auth/login", datos);