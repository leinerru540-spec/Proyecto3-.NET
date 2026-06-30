import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../services/usuariosService";

function AdminUsuarios() {
  const formularioRef = useRef(null);

  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [usuario, setUsuario] = useState({
    id: 0,
    nombre: "",
    username: "",
    correo: "",
    telefono: "",
    role: "User",
    password: "",
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const respuesta = await obtenerUsuarios();
      setUsuarios(respuesta.data);
      setMensaje("");
    } catch (error) {
      console.error(error);

      setMensaje(
        "No se pudo conectar con el backend. La vista está lista para cuando se conecte."
      );
    }
  }

  function manejarCambio(e) {
    const { name, value } = e.target;

    setUsuario({
      ...usuario,
      [name]: value,
    });
  }

  async function guardarUsuario(e) {
    e.preventDefault();

    try {
      if (usuario.id === 0) {
        await crearUsuario(usuario);
      } else {
        await editarUsuario(usuario.id, usuario);
      }

      limpiarFormulario();
      cargarUsuarios();
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible guardar. Cuando el backend esté activo funcionará automáticamente."
      );
    }
  }

  function editar(u) {
    setUsuario({
      id: u.id,
      nombre: u.nombre,
      username: u.username,
      correo: u.correo,
      telefono: u.telefono,
      role: u.role,
      password: "",
    });

    formularioRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function borrar(id) {
    if (!window.confirm("¿Eliminar usuario?")) return;

    try {
      await eliminarUsuario(id);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  }

  function limpiarFormulario() {
    setUsuario({
      id: 0,
      nombre: "",
      username: "",
      correo: "",
      telefono: "",
      role: "User",
      password: "",
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF7FF] text-black">

      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-12">

        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">

          <div className="bg-[#E9D5FF] px-8 py-5">

            <h1 className="text-3xl font-bold text-[#6B21A8]">
              Gestión de Usuarios
            </h1>

          </div>

          <div className="p-8">

            {mensaje && (
              <div className="bg-purple-50 border border-purple-200 text-[#6B21A8] rounded-xl px-5 py-3 mb-6">
                {mensaje}
              </div>
            )}

            <h2
              ref={formularioRef}
              className="text-xl font-bold text-[#7E22CE] mb-5"
            >
              Crear / Editar Usuario
            </h2>

            <form onSubmit={guardarUsuario}>

              <div className="grid md:grid-cols-3 gap-5 mb-8">

                <input
                  name="nombre"
                  placeholder="Nombre"
                  value={usuario.nombre}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                />

                <input
                  name="username"
                  placeholder="Username"
                  value={usuario.username}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                />

                <input
                  name="correo"
                  placeholder="Correo"
                  value={usuario.correo}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                />

                <input
                  name="telefono"
                  placeholder="Teléfono"
                  value={usuario.telefono}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                />

                <select
                  name="role"
                  value={usuario.role}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                >
                  <option>User</option>
                  <option>Admin</option>
                </select>

                <input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={usuario.password}
                  onChange={manejarCambio}
                  className="border border-purple-200 rounded-xl px-4 py-3"
                />

              </div>

              <button className="bg-[#C084FC] hover:bg-[#A855F7] text-white px-8 py-3 rounded-xl font-bold">

                {usuario.id === 0
                  ? "Guardar Usuario"
                  : "Actualizar Usuario"}

              </button>

            </form>

            {usuario.id !== 0 && (

              <button
                onClick={limpiarFormulario}
                className="mt-5 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-bold"
              >
                Cancelar edición
              </button>

            )}

            <h2 className="text-xl font-bold text-[#7E22CE] mt-12 mb-5">
              Usuarios Registrados
            </h2>

            <table className="w-full">

              <thead>

                <tr className="bg-[#F3E8FF] text-[#6B21A8]">

                  <th className="py-4">ID</th>
                  <th>Nombre</th>
                  <th>Username</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {usuarios.length === 0 ? (

                  <tr>

                    <td colSpan="6" className="py-8 text-center">

                      No hay usuarios registrados.

                    </td>

                  </tr>

                ) : (

                  usuarios.map((u) => (

                    <tr
                      key={u.id}
                      className="border-b hover:bg-purple-50"
                    >

                      <td className="py-4 text-center">{u.id}</td>

                      <td>{u.nombre}</td>

                      <td>{u.username}</td>

                      <td>{u.correo}</td>

                      <td>{u.role}</td>

                      <td className="text-center">

                        <button
                          onClick={() => editar(u)}
                          className="bg-[#DDD6FE] text-[#6B21A8] px-4 py-2 rounded-xl mr-2"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => borrar(u.id)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl"
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default AdminUsuarios;