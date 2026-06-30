import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Productos from "./pages/Productos";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminVentas from "./pages/admin/AdminVentas";
import Login from "./pages/Login";
import PagoExitoso from "./pages/PagoExitoso";
import PagoCancelado from "./pages/PagoCancelado";
import HistorialCompras from "./pages/HistorialCompras";
import MiCuenta from "./pages/MiCuenta";

function RutaPrivada({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/admin/productos" element={<AdminProductos />} />
                <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                <Route path="/admin/ventas" element={<AdminVentas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pago-exitoso" element={<PagoExitoso />} />
                <Route path="/pago-cancelado" element={<PagoCancelado />} />

                <Route
                    path="/perfil/compras"
                    element={
                        <RutaPrivada>
                            <HistorialCompras />
                        </RutaPrivada>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <RutaPrivada>
                            <MiCuenta />
                        </RutaPrivada>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;