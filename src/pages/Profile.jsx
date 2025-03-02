import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");

    if (!storedToken) {
      navigate("/login");
      return;
    }

    fetch("https://hito3-backend.onrender.com/usuarios/perfil", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No autorizado");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.nombre) {
          setUser(data);
        } else {
          throw new Error("Usuario inválido");
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5 main-content">
      <h2 className="text-center">Perfil de Usuario</h2>
      <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h4>{user.nombre}</h4>
          <p>Email: {user.correo}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
