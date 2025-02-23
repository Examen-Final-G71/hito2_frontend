import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const Login = () => {
  const { user, login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://hito3-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: formData.correo,  
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario recibido:", data.user);
        login(data.user);
      } else {
        Swal.fire("Error", data.message || "Error al iniciar sesión", "error");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire("Error", "Error de conexión con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando email de restablecimiento a:", resetEmail);
      Swal.fire(
        "Enviado",
        "Se ha enviado un email de restablecimiento a: " + resetEmail,
        "success"
      );
      setShowResetForm(false);
    } catch (error) {
      console.error("Error al enviar email de restablecimiento:", error);
      Swal.fire("Error", "Error al enviar email de restablecimiento", "error");
    }
  };

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="d-flex justify-content-center vh-80 bg-light">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        <hr />
        <h5 className="text-center mb-4">¡Bienvenido/a!</h5>
        <p className="text-center text-muted small">
          Ingresa tu usuario y contraseña para iniciar sesión
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="Ingresa tu email"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <Link
              to="#"
              className="text-decoration-none small"
              onClick={() => setShowResetForm(true)}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Iniciando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="small">
            ¿Eres nuevo?{" "}
            <Link to="/registro" className="text-decoration-none">
              Regístrate
            </Link>
          </p>
        </div>
      </div>

      <Modal show={showResetForm} onHide={() => setShowResetForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Restablecer contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="resetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;