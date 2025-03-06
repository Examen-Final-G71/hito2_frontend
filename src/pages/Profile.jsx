import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [compras, setCompras] = useState({});

  const storedToken = token || localStorage.getItem("token");
  
        // Obtener perfil del usuario
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
  }, [storedToken, navigate, setUser, logout]);
  
      // Obtener publicaciones del usuario
  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchPublicaciones = async () => {
      try {
        const response = await fetch(`https://hito3-backend.onrender.com/api/publicaciones/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };
    fetchPublicaciones();
  }, [user?.id, token]);

         // Obtener compras del usuario
  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchCompras = async () => {
      try {
        const response = await fetch(`https://hito3-backend.onrender.com/transacciones/compras`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        
        // Agrupar compras por ID de transacción
        const groupedCompras = data.reduce((acc, compra) => {
          if (!acc[compra.transaccion_id]) {
            acc[compra.transaccion_id] = {
              fecha: compra.fecha,
              total: 0,
              items: []
            };
          }
          acc[compra.transaccion_id].items.push(compra);
          acc[compra.transaccion_id].total += compra.subtotal;
          return acc;
        }, {});
        
        setCompras(groupedCompras);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };
    
    fetchCompras();
  }, [user?.id, token]);

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
                  <h5>{publicacion.nombre}</h5>
                  <p>Stock: {publicacion.stock}</p>
                  <p>Precio: ${new Intl.NumberFormat("es-CL").format(publicacion.precio)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes publicaciones aún.</p>
      )}

      <h3 className="mt-4">Historial de Compras</h3>
      {Object.keys(compras).length > 0 ? (
        <div className="row">
          {Object.entries(compras).map(([transaccionId, transaccion]) => (
            <div key={transaccionId} className="col-md-6">
              <div className="card mt-3">
                <div className="card-body">
                  <h5>Transacción #{transaccionId}</h5>
                  <small>{new Date(transaccion.fecha).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</small>
                  <h6 className="mt-2">Total: ${new Intl.NumberFormat("es-CL").format(transaccion.total)}</h6>
                  <ul className="mt-2">
                    {transaccion.items.map((compra) => (
                      <li key={compra.id}>
                        {compra.publicacion} - {compra.cantidad} unidades - ${new Intl.NumberFormat("es-CL").format(compra.subtotal)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes compras registradas.</p>
      )}
    </div>
  );
};

export default Profile;



