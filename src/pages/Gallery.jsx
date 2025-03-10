import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const { products, addToCart, obtenerNombreClasificacion } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

const filteredProducts = (products || []).filter((product) => {
  const titleMatch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
  const categoryMatch = categoryFilter === "all" || product.clasificacion === categoryFilter;
  return titleMatch && categoryMatch;
});

const uniqueCategories = [...new Set((products || []).map((product) => product.clasificacion))];


  const handleVerMas = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Container className="mt-5 main-content">
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} md={6} className="mt-2 mt-md-0">
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">Todas las categorías</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {obtenerNombreClasificacion(category)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredProducts.map((product) => (
          <Col xs={12} sm={6} md={3} lg={3} className="mb-4" key={product.id}>
            <Card className="h-100 cardu">
              <Card.Img
                variant="top"
                src={product.imagen}
                alt={product.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>{obtenerNombreClasificacion(product.clasificacion)}</Card.Text>
                 <Card.Text>Stock: {product.stock}</Card.Text>
                <Card.Text>Precio: ${new Intl.NumberFormat("es-CL").format(product.precio)}</Card.Text>
                <div className="mt-auto d-flex justify-content-center align-items-center">
                  <Button variant="outline-primary" className="me-2" onClick={() => handleVerMas(product)}>
                    Ver más
                  </Button>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Añadir al Carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Gallery;
