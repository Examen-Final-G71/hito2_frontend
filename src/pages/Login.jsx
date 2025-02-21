import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AppContext);  // Obtener la función login del contexto
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

const [showResetForm, setShowResetForm] = useState(false); // Estado para mostrar/ocultar modal
const [resetEmail, setResetEmail] = useState('');


const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Usuario recibido:", data.usuario); // Verificar datos del usuario
                login(data.usuario);
                navigate('/profile');
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
            } catch (error) {
            console.error('Error en el login:', error);
            alert('Error de conexión con el servidor');
          }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Aquí va la lógica para enviar el email de restablecimiento
            console.log("Enviando email de restablecimiento a:", resetEmail);
            alert("Se ha enviado un email de restablecimiento a: " + resetEmail); // Simulación
            setShowResetForm(false); // Cierra el modal después del envío
        } catch (error) {
            console.error("Error al enviar email de restablecimiento:", error);
            alert("Error al enviar email de restablecimiento");
        }
    };

return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4" style={{ width: '22rem' }}>
                <h3 className="text-center mb-3">Iniciar sesión</h3>
                <hr />
                <h5 className="text-center mb-4">¡Bienvenido/a!</h5>
                <p className="text-center text-muted small">Ingresa tu usuario y contraseña para iniciar sesión</p>

                <form onSubmit={handleSubmit}> 
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Ingresa tu email" 
                            value={formData.email}  
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Ingresa tu contraseña" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>

                <div className="mb-3">
                    <Link
                        href="#" 
                        className="text-decoration-none small"
                        onClick={() => setShowResetForm(true)}> 
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>

                <div className="text-center mt-3">
                    <p className="small">¿Eres nuevo? 
                    <Link to="/registro" className="text-decoration-none"> Regístrate</Link></p>
                </div>
            </div>

            {/* Modal para restablecer contraseña */}
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
}

export default Login;