import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import Swal from 'sweetalert2';

const CreatePost = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const response = await fetch("https://hito3-backend.onrender.com/api/publicaciones", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formDataToSend,
});
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    clasificacion: '',
    descripcion: '',
    stock: '',
    imagen: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si el campo es "precio" o "stock" asegúrate de guardar números, si es necesario.
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imagen: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('precio', formData.precio);
    formDataToSend.append('clasificacion', formData.clasificacion);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('stock', formData.stock);
    if (formData.imagen) {
      formDataToSend.append('imagen', formData.imagen);
    }

    try {
      const response = await fetch("https://hito3-backend.onrender.com/api/publicaciones", {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Publicación creada",
          text: "Tu publicación se ha creado correctamente.",
          icon: "success",
          confirmButtonText: "Ver publicación"
        }).then(() => {
          // Se asume que el backend devuelve el id de la publicación creada
          navigate(`/product/${data.id}`);
        });
      } else {
        Swal.fire("Error", data.message || "Hubo un problema al crear la publicación", "error");
      }
    } catch (error) {
      console.error("Error al subir producto:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-2 px-md-0">
      <Card className="p-4 border" style={{ width: '100%', maxWidth: '700px', borderColor: 'inherit' }}>
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
              type="text"
              placeholder="Ingresa el precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="clasificacion" value={formData.clasificacion} onChange={handleChange} required>
              <option value="">Seleccione una categoría</option>
              <option value="Ropa de seguridad">Ropa de seguridad</option>
              <option value="Productos de limpieza">Productos de limpieza</option>
              <option value="Artículos de librería">Artículos de librería</option>
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
