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




/* import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>hola</h1>
    </div>
  )
}
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

*/