import React from 'react';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '22rem' }}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        <hr />
        <h5 className="text-center mb-4">¡Bienvenido/a!</h5>
        <p className="text-center text-muted small">Ingresa tu usuario y contraseña para iniciar sesión</p>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
          </div>

          <div className="mb-3">
            <a href="#" className="text-decoration-none small">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div className="text-center mt-3">
          <p className="small">¿Eres nuevo? <a href="#" className="text-decoration-none">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;