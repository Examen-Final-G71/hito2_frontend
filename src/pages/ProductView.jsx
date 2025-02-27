import React, { useContext, useEffect, useState } from 'react';
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

export default ProductView;


/*import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

function ProductView() {
  const location = useLocation();
  const product = location.state.product;
  const { addToCart } = useContext(AppContext);

  return (
    <Container className="mt-5" style={{ marginBottom: '80px' }}>
        <Col>
          <Link to="/gallery">
            <Button variant="outline-primary">Volver</Button>
          </Link>
        </Col>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid rounded style={{ maxHeight: '500px', objectFit: 'contain' }} />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p> 
          <button
                className="btn btn-primary"
                onClick={() => addToCart(product)} 
              >
                Añadir al Carrito
              </button>      </Col>
      </Row>
      <Row className="mt-1">
      </Row>
    </Container>
  );
}

export default ProductView;*/
