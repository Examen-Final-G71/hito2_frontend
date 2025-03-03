import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { CommentContext } from "../context/ComentariosContext";

function ProductView() {
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(location.state?.product || null);
  const { addToCart, obtenerNombreClasificacion, user, token } = useContext(AppContext);
  const { comentarios, fetchComentarios, addComentario } = useContext(CommentContext);
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState("");

  // Obtener producto si no está en el estado
  useEffect(() => {
    if (!product) {
      fetch(`https://hito3-backend.onrender.com/api/publicaciones/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error al obtener el producto:", err));
    }
  }, [id]);

  // Obtener comentarios
   useEffect(() => {
      fetchComentarios(id);
    }, [id]);

  // Enviar comentario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para comentar");
      return;
    }

    if (!comentario.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }

    try {
      await addComentario(id, comentario, user.id, calificacion); //
      setComentario(""); // Limpia el campo de texto
      setCalificacion(5); // Resetea la calificación
      fetchComentarios(id); // Recarga los comentarios
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al enviar el comentario");
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
    <Container className="mt-5 main-content" style={{ marginBottom: "80px" }}>
      <Row>
        <Col md={6}>
          <Image src={product.imagen} alt={product.nombre} fluid rounded />
        </Col>
        <Col md={6}>
          <h1>{product.nombre}</h1>
          <p>{obtenerNombreClasificacion(product.clasificacion)}</p>
          <p>{product.descripcion}</p>
          <p>Stock disponible: {product.stock}</p>
          <p>{product.usuario_nombre || "Anónimo"}</p>
          <p className="mt-5">
            Precio: ${new Intl.NumberFormat("es-CL").format(product.precio)}
          </p>
          <Button onClick={() => addToCart(product)}>Añadir al Carrito</Button>
        </Col>
      </Row>

      {/* Comentarios */}
      <Row className="mt-5">
        <Col>
          <h3>Comentarios</h3>

          {user ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Calificación:</Form.Label>
            <Form.Select value={calificacion} onChange={(e) => setCalificacion(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} ★</option>
              ))}
            </Form.Select>
          </Form.Group>

        <Form.Group>
          <Form.Label>Comentario:</Form.Label>
          <Form.Control as="textarea" rows={2} value={comment} onChange={(e) => setComentario(e.target.value)} />
        </Form.Group>

              <Button type="submit" disabled={!comment.trim()}>Enviar</Button>
            </Form>
          ) : (
            <p>Debes iniciar sesión para comentar.</p>
          )}
          
          {/* Lista de comentarios (Visible para todos) */}
          <div>
            {comentarios.length > 0 ? (
              comentarios.map((c) => (
                <div key={c.id}>
                  <strong>{c.usuario.id}</strong> ({c.calificacion} ★)
                  <p>{c.comment}</p>
                </div>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </div>
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
