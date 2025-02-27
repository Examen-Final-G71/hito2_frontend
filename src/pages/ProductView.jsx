import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

function ProductView() {
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(location.state?.product || null);
  const { addToCart, obtenerNombreClasificacion, user } = useContext(AppContext);
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  
  console.log("ID del producto:", id);

  // Obtener producto si no está en el estado
  useEffect(() => {
    if (!product) {
      fetch(`https://hito3-backend.onrender.com/api/publicaciones/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error al obtener el producto:", err));
    }
  }, [id, product]);

  // Obtener comentarios
  useEffect(() => {
    fetch(`https://hito3-backend.onrender.com/api/comentarios/${id}`)
      .then((res) => res.json())
      .then((data) => setComentarios(data))
      .catch((err) => console.error("Error al cargar comentarios:", err));
  }, [id]);

  // Enviar comentario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = sessionStorage.getItem("token"); // Obtiene el token de sessionStorage
    if (!token) {
      alert("Debes iniciar sesión para comentar");
      return;
    }

    if (!comentario.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }

    const nuevoComentario = {
      calificacion,
      comment: comentario,
    };

    console.log("Enviando comentario:", nuevoComentario);

   try {
      const token = user?.token || sessionStorage.getItem("token");
    
      if (!token) {
        console.error("No hay token disponible. No se puede enviar la solicitud.");
        return;
      }

    const res = await fetch(`https://hito3-backend.onrender.com/api/comentarios/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoComentario),
      });
    
      const data = await res.json();
    
      if (!res.ok) {
        throw new Error(data.message || "Error al enviar el comentario");
      }
    
      console.log("Comentario enviado correctamente:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

      if (res.ok) {
        setComentarios([data, ...comentarios]); // Agrega el nuevo comentario al estado
        setComentario(""); // Limpia el campo de texto
        setCalificacion(5); // Resetea la calificación
      } else {
        alert(data.error || "Error al enviar comentario");
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

  if (!product) {
    return (
      <Container className="mt-5">
        <p>Producto no encontrado.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ marginBottom: "80px" }}>
      <Row>
        <Col md={6}>
          <Image
            src={product.imagen}
            alt={product.nombre}
            fluid
            rounded
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1>{product.nombre}</h1>
          <p>{obtenerNombreClasificacion(product.clasificacion)}</p>
          <p>{product.descripcion}</p>
          <p>Stock disponible: {product.stock}</p>
          <p>Publicado por: {product.usuario_nombre}</p>
          <p className="mt-5">
            Precio: ${new Intl.NumberFormat("es-CL").format(product.precio)}
          </p>

          <Button variant="primary" onClick={() => addToCart(product)}>
            Añadir al Carrito
          </Button>
          <Link to="/gallery">
            <Button variant="outline-primary" className="mt-3">
              Volver a la Galería
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Sección de Comentarios */}
      <Row className="mt-5">
        <Col>
          <h3>Comentarios</h3>

          {user ? (
            <Form onSubmit={handleSubmit} className="mb-4">
              <Form.Group>
                <Form.Label>Calificación:</Form.Label>
                <Form.Select
                  value={calificacion}
                  onChange={(e) => setCalificacion(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} ★
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Comentario:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escribe tu comentario aquí..."
                />
              </Form.Group>

              <Button type="submit" className="mt-2">
                Enviar
              </Button>
            </Form>
          ) : (
            <p>Debes iniciar sesión para comentar.</p>
          )}

          <ul className="list-unstyled">
            {Array.isArray(comentarios) && comentarios.length > 0 ? (
              comentarios.map((c) => (
                <li key={c?.id || Math.random()} className="mb-3 border-bottom pb-2">
                  <strong>{c?.usuario_nombre || "Usuario"}</strong> ({c?.calificacion} ★)
                  <p>{c?.comment}</p>
                </li>
              ))
            ) : (
              <p>Aún no hay comentarios.</p>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductView;




/*import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

function ProductView() {
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct ] = useState(location.state?.product || null);
  const { addToCart, obtenerNombreClasificacion } = useContext(AppContext);

  useEffect(() => {
    if (!product) {
      fetch(`https://hito3-backend.onrender.com/api/publicaciones/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error al obtener el producto:", err));
    }
  }, [id, product]);
  
  if (!product) {
    return <Container className="mt-5"><p>Producto no encontrado.</p></Container>;
  }
  

  return (
    <Container className="mt-5" style={{ marginBottom: '80px' }}>
      <Row>
        <Col md={6}>
          <Image src={product.imagen} alt={product.nombre} fluid rounded style={{ maxHeight: '500px', objectFit: 'contain' }} />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1>{product.nombre}</h1>
          <p>{obtenerNombreClasificacion(product.clasificacion)}</p>
          <p>{product.descripcion}</p>
          <p>Stock disponible: {product.stock}</p>
          <p>Publicado por: {product.usuario_nombre}</p>
          <p className="mt-5">Precio: ${new Intl.NumberFormat("es-CL").format(product.precio)}</p>
          
          <Button variant="primary" onClick={() => addToCart(product)}>
            Añadir al Carrito
          </Button>
          <Link to="/gallery">
            <Button variant="outline-primary" className="mt-3">Volver a la Galería</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductView;*/
