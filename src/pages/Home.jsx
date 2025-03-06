import React, { useContext } from "react";
import seguridad from "../assets/img/seguridad.png";
import limpieza from "../assets/img/limpieza.png";
import libreria from "../assets/img/libreria.png";
import Banner from "../components/Banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { AppContext } from "../context/AppContext";
import ShareImage from "../assets/img/ShareProduct.jpg";
import Comunidad1 from "../assets/img/ImgHomeComunidad1.jpg";
import Comunidad2 from "../assets/img/ImgHomeComunidad2.jpg";

const Home = () => {
  const { user } = useContext(AppContext); // Obtiene el usuario autenticado
  const navigate = useNavigate();

  const categorias = [
    { nombre: "Ropa de seguridad", imagen: seguridad },
    { nombre: "Productos de limpieza", imagen: limpieza },
    { nombre: "Artículos de librería", imagen: libreria },
  ];

  const handleClick = (categoria) => {
    navigate(`/gallery?category=${categoria.nombre}`); // Navega a /gallery con query parameter
  };

  const handleRedirection = () => {
    navigate("/createpost");
  };

  return (
    <div>
      <Banner></Banner>
      <div className="container mt-5 main-content" style={{ marginBottom: "80px" }}>
        <div className="row">
          <div className="col-12 text-center" style={{ marginBottom: "50px" }}>
            <h1>Categorías</h1>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "60px" }}>
          {categorias.map((categoria, index) => (
            <div className="col-md-4" key={index}>
              <motion.div
                className="card clickable"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgb(0, 138, 192)" }}
                onClick={() => handleClick(categoria)}
              >
                <img src={categoria.imagen} alt={categoria.nombre} className="card-img-top" />
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-center">{categoria.nombre}</h5>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* NUEVA SECCIÓN PARA VENDER PRODUCTOS */}

            {user ? (
              // Vista con usuario autenticado
              <div className="row align-items-center w-100">
                <div className="col-md-6">
                  <img 
                    src={ShareImage}
                    alt="Compartir productos" 
                    className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6 text-center text-md-start">
                  <h3>¿Quieres vender tus productos?</h3>
                  <p>Comienza a publicar y accede a un mundo de colaboradores.</p>
                  <button
                    onClick={handleRedirection}
                    style={buttonStyle}
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    Crear Publicación
                  </button>
                </div>
              </div>
            ) : (
              // Vista sin usuario
            <div
              className="position-relative d-flex align-items-start justify-content-center"
              style={{
                backgroundImage: `url(${Comunidad1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "60vh",
                width: "100%",
              }}
            >
              <div
                className="m-4 p-4 text-center bg-white shadow rounded"
                style={{
                  maxWidth: "500px",
                  opacity: 0.9,
                }}
              >
                <h3>¿Quieres vender tus productos?</h3>
                <p>Únete a nuestra comunidad y empieza a publicar tus productos hoy mismo.</p>
                <button
                  onClick={() => navigate("/login")}
                  style={buttonStyle}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => navigate("/register")}
                  style={buttonStyle}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  Registrarse
                </button>
              </div>
            </div>
              
            )}
          </div>
      </div>
  );
};

const buttonStyle = {
  border: "2px solid rgb(0, 138, 192)",
  color: "rgb(0, 138, 192)",
  padding: "10px 20px",
  margin: "1rem",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
};

const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = "rgb(0, 138, 192)";
  e.target.style.color = "white";
};

const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = "transparent";
  e.target.style.color = "rgb(0, 138, 192)";
};

export default Home;
