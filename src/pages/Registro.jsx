import React from 'react';

const Registro = () => {
  return (
    <div className="d-flex justify-content-center align-items-center pt-5 pb-5 bg-light">
      <div className="card p-4" style={{ width: '25rem' }}>
        <h3 className="text-center mb-3">Regístrate</h3>
        <hr />
        <h5 className="text-center mb-4">¡Bienvenido/a!</h5>
        <p className="text-center text-muted small">Para registrarte debes rellenar los siguientes campos:</p>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" placeholder="Ingresa nuevo usuario" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Ingresa nueva contraseña" />
          </div>
<div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Repite tu contraseña</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Ingresa nueva contraseña" />
          </div>

          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div className="text-center mt-3">
          <p className="small">¿Ya eres usuario? <a href="#" className="text-decoration-none">Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  );
}

export default Registro;