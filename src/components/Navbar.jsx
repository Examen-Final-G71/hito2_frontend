import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";  
import { AppContext } from "../context/AppContext"; 
import logo from "../assets/img/novatec.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, user, logout } = useContext(AppContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src={logo} alt="Logo" style={{ width: "150px", height: "auto" }} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto pe-3">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/gallery">
                Catálogo
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/profile">
                    Mi perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/createpost">
                    Crear Publicación <i class="fa-solid fa-square-plus fa-xl"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ingresar
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/registro">
                      Regístrate
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => navigate("/cart")}
            >
              Mi carrito ({totalItems})
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
