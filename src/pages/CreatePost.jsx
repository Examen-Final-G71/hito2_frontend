import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "precio") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Solo números
      setFormData({
        ...formData,
        [name]: numericValue ? `$${numericValue}` : ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Producto a subir:', formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-2 px-md-0">
    <Card className="p-4 border " style={{ width: '100%', maxWidth: '700px', borderColor: 'inherit' }}>
        <h3 className="mb-2">Nuevo Producto</h3>
        <h5 className="text-muted mb-3">Agrega producto para vender</h5>
        <hr />
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="$ Ingresa precio del producto"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="categoria" value={formData.categoria} onChange={handleChange}>
                  <option value="">Seleccione una categoría</option>
                  <option value="Ropa de seguridad">Ropa de seguridad</option>
                  <option value="Productos de limpieza">Productos de limpieza</option>
                  <option value="Artículos de librería">Artículos de librería</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cantidad"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={handleFileChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Subir Producto</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePost;
