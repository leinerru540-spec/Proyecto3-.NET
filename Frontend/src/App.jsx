import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminVentas from "./pages/admin/AdminVentas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PagoExitoso from "./pages/PagoExitoso";
import PagoCancelado from "./pages/PagoCancelado";
import HistorialCompras from "./pages/HistorialCompras";
import MiCuenta from "./pages/MiCuenta";

function RutaPrivada({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

function RutaAdmin({ children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return <Navigate to="/login" replace />;
    if (role !== "admin") return <Navigate to="/" replace />;
    return children;
}

function App() {
    return (
        <CarritoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/pago-exitoso" element={<PagoExitoso />} />
                    <Route path="/pago-cancelado" element={<PagoCancelado />} />

                    <Route path="/carrito" element={
                        <RutaPrivada>
                            <Carrito />
                        </RutaPrivada>
                    } />

                    <Route path="/admin/productos" element={
                        <RutaAdmin>
                            <AdminProductos />
                        </RutaAdmin>
                    } />
                    <Route path="/admin/usuarios" element={
                        <RutaAdmin>
                            <AdminUsuarios />
                        </RutaAdmin>
                    } />
                    <Route path="/admin/ventas" element={
                        <RutaAdmin>
                            <AdminVentas />
                        </RutaAdmin>
                    } />

                    <Route path="/perfil/compras" element={
                        <RutaPrivada>
                            <HistorialCompras />
                        </RutaPrivada>
                    } />

                    <Route path="/perfil" element={
                        <RutaPrivada>
                            <MiCuenta />
                        </RutaPrivada>
                    } />
                </Routes>
            </BrowserRouter>
        </CarritoProvider>
    );
}

export default App;