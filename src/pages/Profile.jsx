import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://hito3-backend.onrender.com/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.nombre) {
          setUser(data);
        } else {
          logout(); 
          navigate("/login");
        }
      })
      .catch(() => {
        logout();
        navigate("/login");
      })
      .finally(() => setLoading(false)); 
  }, [token, navigate, setUser, logout]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Perfil de Usuario</h2>
      <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h4>{user.nombre}</h4>
          <p>Email: {user.correo}</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
