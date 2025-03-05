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
  const [compras, setCompras] = useState([]);

  console.log("Usuario recibido:", user);

  //DATOS DEL USUARIO Y PERFIL
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

  //DATOS DE PUBLICACIONES
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        if (!user?.id || !token) return;

        console.log("Obteniendo publicaciones para el usuario:", user.id);

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

  //HISTORIAL DE COMPRAS
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        if (!user?.id || !token) return;

        console.log("Obteniendo compras para el usuario:", user.id);

        const response = await fetch(`https://hito3-backend.onrender.com/transacciones/compras`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();

        // AGRUPAR POR FECHA
        const groupedCompras = data.reduce((acc, compra) => {
        const fechaCompra = new Date(compra.fecha).toLocaleString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          if (!acc[fechaCompra]) {
            acc[fechaCompra] = [];
          }
          acc[fechaCompra].push(compra);

          return acc;
        }, {});
        
        setCompras(data);
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

      {/* Sección Publicaciones */}
      <h3 className="mt-4">Tus Publicaciones</h3>
      {publicaciones.length > 0 ? (
        <div className="row">
          {publicaciones.map((publicacion) => (
            <div key={publicacion.id} className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h5>{publicacion.nombre}</h5>
                  <p>Stock: {publicacion.stock}</p>
                  <small>{new Date(publicacion.fecha_publicacion).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</small>
                  <p>Precio: ${new Intl.NumberFormat("es-CL").format(publicacion.precio)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes publicaciones aún.</p>
      )}

      {/* Sección Historial de Compras */}
      <h3 className="mt-4">Historial de Compras</h3>
      {Object.keys(compras).length > 0 ? (
        <div className="row">
          {Object.keys(compras).map((fecha) => (
            <div key={fecha} className="col-md-12">
              <h4>{fecha}</h4>
              {compras[fecha].map((compra) => (
                <div key={compra.id} className="card mt-3">
                  <div className="card-body">
                    <h5>{compra.publicacion}</h5>
                    <p>Cantidad: {compra.cantidad}</p>
                    <p>Total: ${new Intl.NumberFormat("es-CL").format(compra.subtotal)}</p>
                  </div>
                </div>
              ))}
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



/*import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]); 
  const [compras, setCompras] = useState([]); 
  
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
  }, [storedToken, navigate, setUser, logout]);

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

  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchCompras = async () => {
      try {
        const response = await fetch(`https://hito3-backend.onrender.com/transacciones/compras`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        if (Array.isArray(data)) {
          setCompras(data);
        } else {
          console.error("Datos de compras no válidos:", data);
        }
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
                  <small>{new Date(publicacion.fecha_publicacion).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</small>
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
      {compras.length > 0 ? (
        <div className="row">
          {compras.map((compra) => (
            <div key={compra.id} className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h5>{compra.publicacion}</h5>
                  <p>Cantidad: {compra.cantidad}</p>
                  <p>Total: ${new Intl.NumberFormat("es-CL").format(compra.subtotal)}</p>
                  <small>
                    {new Date(compra.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
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

export default Profile;*/
