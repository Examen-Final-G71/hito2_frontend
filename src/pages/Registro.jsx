import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.correo || !formData.password || !formData.confirmPassword) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        if (formData.password.length < 6) {
            Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            const response = await fetch('https://hito3-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    correo: formData.correo,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('¡Registro exitoso!', 'Ahora puedes iniciar sesión', 'success');
                setFormData({ nombre: '', correo: '', password: '', confirmPassword: '' });
                 navigate("/login");
            } else {
                Swal.fire('Error', data.message || 'Hubo un problema al registrarte', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div className="d-flex my-4 main-content justify-content-center align-items-center pt-5 pb-5 bg-light">
            <div className="card p-4" style={{ width: '25rem' }}>
                <h3 className="text-center mb-3">Regístrate</h3>
                <hr />
                <h5 className="text-center mb-4">¡Bienvenido/a!</h5>
                <p className="text-center text-muted small">Para registrarte, completa los siguientes campos:</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Ingresa tu nombre"
                            value={formData.nombre}  
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            placeholder="Ingresa tu correo"
                            value={formData.correo}  
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Crea una contraseña"
                            value={formData.password}  
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Repite tu contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirma tu contraseña"
                            value={formData.confirmPassword}  
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Registrar</button> 
                </form>

                <div className="text-center mt-3">
                    <p className="small">
                        ¿Ya tienes cuenta? 
                        <Link to="/login" className="text-decoration-none"> Iniciar Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registro;
