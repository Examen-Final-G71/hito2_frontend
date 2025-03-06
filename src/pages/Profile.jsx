import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Tab, Nav, Spinner, Col, Card, Row } from "react-bootstrap";

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [compras, setCompras] = useState([]);
  const [activeTab, setActiveTab] = useState("publicaciones");

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
        const comprasAgrupadas = data.reduce((acc, compra) => {
          const { transaccion_id, fecha, subtotal, precio, cantidad, publicacion } = compra;

              //  Aplicamos parse para convertir a Numero
          const subtotalNumber = parseFloat(subtotal) || 0;
          const precioNumber = parseFloat(precio) || 0;

          if (!acc[transaccion_id]) {
            acc[transaccion_id] = {
              transaccion_id,
              fecha,
              total: 0,
              detalles: [],
            };
          }

            const detalle = {
              publicacion, 
              cantidad, 
              subtotal: subtotalNumber, 
            };

          acc[transaccion_id].total += subtotalNumber; // Sumar subtotales
          acc[transaccion_id].detalles.push(detalle);

          return acc;
        }, {});
        
        // Convertir el objeto a un arreglo
        setCompras(Object.values(comprasAgrupadas));
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      } finally {
        setLoading(false);
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
      <div className="card mt-4 p-5" style={{ maxWidth: "400px" }}>
          <h4>{user.nombre}</h4>
          <p>Email: {user.correo}</p>
      </div>


      {/*  Pestañas de Publicaciones y Compras */}
      <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        <Nav variant="tabs" className="mt-4">
          <Nav.Item>
            <Nav.Link eventKey="publicaciones">Tus Publicaciones</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="compras">Historial de Compras</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          {/*  Pestaña de Publicaciones */}
          <Tab.Pane eventKey="publicaciones">
            {publicaciones.length > 0 ? (
              <div className="row">
                {publicaciones.map((publicacion) => (
                  <div key={publicacion.id} className="col-md-4">

                    <Row className="card mt-3">
                    <Col md={6}>
                      <Card.Img 
                        variant="top" 
                        src={publicacion.imagen}
                        alt={publicacion.nombre}
                        style={{ height: "150px", objectFit: "cover" }} 
                      />
                    </Col>
                    <Col md={6}>
                    
                        <h5>{publicacion.nombre}</h5>
                        <p>Stock: {publicacion.stock}</p>
                        <p>Precio: ${new Intl.NumberFormat("es-CL").format(publicacion.precio)}</p>
                    
                    </Col>
                    </Row>

                  </div>
                ))}
              </div>
            ) : (
              <p>No tienes publicaciones aún.</p>
            )}
          </Tab.Pane>


      
          {/*  Pestaña de Compras */}
          <Tab.Pane eventKey="compras">
            {compras.length === 0 ? (
              <p>No tienes compras registradas.</p>
            ) : (
              compras.map((compra) => (
                <div key={compra.transaccion_id} className="card mt-3 p-3">
                  <h3>{new Date(compra.fecha).toLocaleString()}</h3>
                  <p><strong>Total:</strong> ${compra.total.toLocaleString()}</p>
                  <ul>
                    {compra.detalles.map((detalle, index) => (
                      <li key={index}>
                        {detalle.publicacion} - {detalle.cantidad} unidades - ${detalle.subtotal.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Profile;



