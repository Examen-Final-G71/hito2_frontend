import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useContext(AppContext);
    const navigate = useNavigate();

    if (!user) {
        return <p className="text-center mt-5">No has iniciado sesión. <a href="/login">Inicia sesión</a></p>;
    }

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirigir al login después de cerrar sesión
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Perfil de Usuario</h2>
            <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
                <div className="card-body text-center">
                    <h4>{user.nombre}</h4> {/*FALTA AJUSTAR */}
                    <p>Email: {user.email}</p>
                    <p>Rol: {user.rol || "Usuario"}</p>
                    <button className="btn btn-danger mt-3" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

