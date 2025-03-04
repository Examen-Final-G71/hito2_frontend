import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]); 
  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {

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

  const fetchPublicaciones = (user, storedToken) => {
    fetch(`https://hito3-backend.onrender.com/api/publicaciones/${user.Id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => setPublicaciones(data))
      .catch((error) => console.error("Error al obtener publicaciones:", error));
  };

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
        <h3 className="mt-4">Tus Publicaciones</h3>
          {publicaciones.length > 0 ? (
            <div className="row">
              {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="col-md-4">
                  <div className="card mt-3">
                    <div className="card-body">
                      <h5>{publicacion.titulo}</h5>
                      <p>{publicacion.descripcion}</p>
                      <p><strong>Precio:</strong> ${publicacion.precio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes publicaciones aún.</p>
          )}
    </div>
  );
};

export default Profile;

/*import React, { useContext, useState, useEffect } from "react";
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

export default Profile;*/
