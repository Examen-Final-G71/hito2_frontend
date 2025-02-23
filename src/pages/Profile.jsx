import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login"); 
    }

    fetch("https://hito3-backend.onrender.com/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data); 
        } else {
          navigate("/login"); 
        }
      })
      .catch(() => navigate("/login")); 
  }, [token, navigate, setUser]);

  if (!user) {
    return <Navigate to="/login" />;
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