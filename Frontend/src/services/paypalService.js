import api from "../api/api";

export const crearOrdenPayPal = (amount) =>
    api.post(`/PayPal/create-order?amount=${amount}`);