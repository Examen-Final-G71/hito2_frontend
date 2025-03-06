import React, { useState, useContext } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

const CreatePost = () => {
  const { token, addProduct } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    clasificacion: "",
    descripcion: "",
    stock: "",
    imagen: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imagen: e.target.files[0],
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!formData.imagen) {
    Swal.fire("Error", "Debes subir una imagen", "error");
    setLoading(false);
    return;
  }

  const formDataToSend = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataToSend.append(key, formData[key]);
  });

  try {
    const response = await fetch(
      "https://hito3-backend.onrender.com/api/publicaciones",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      }
    );

    const data = await response.json();
    if (response.ok) {
      setFormData({
        nombre: "",
        precio: "",
        clasificacion: "",
        descripcion: "",
        stock: "",
        imagen: null,
      });

      Swal.fire({
        title: "Publicación creada",
        text: "Tu publicación se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "Ver publicación",
      }).then(() => {
        addProduct(data);
        navigate(`/product/${data.id}`, { state: { product: data } });
      });
    } else {
      Swal.fire(
        "Error",
        data.message || "Hubo un problema al crear la publicación",
        "error"
      );
    }
  } catch (error) {
    console.error("Error al subir producto:", error);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  } finally {
    setLoading(false);
  }
};


  return (
     <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/df2lqpvry/image/upload/v1741278246/argjp6b9qx1bniaks9zk.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      
      <Card className="p-4 border card" style={{ width: "100%", maxWidth: "700px" }}>
        <h3 className="mb-2">Nuevo Producto</h3>
        <h5 className="text-muted mb-3">Agrega producto para vender</h5>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el título"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa el precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="clasificacion"
              value={formData.clasificacion}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="epp">Ropa de seguridad</option>
              <option value="art_aseo">Productos de limpieza</option>
              <option value="libreria">Artículos de librería</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa la descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cantidad en stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Subiendo..." : "Subir Producto"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePost;




/*import React, { useState } from 'react';
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

export default CreatePost;*/
