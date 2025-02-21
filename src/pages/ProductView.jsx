import React, { useContext } from 'react';
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
          <Link to="/gallery"> {/* Enlace para volver a la galería */}
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
          <p>Precio: ${product.price}</p> {/* Mostrar el precio */}
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

export default ProductView;