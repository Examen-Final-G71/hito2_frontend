import React from "react";
import seguridad from "../assets/img/seguridad.png";
import limpieza from "../assets/img/limpieza.png";
import libreria from "../assets/img/libreria.png";
import Banner from "../components/Banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { AppContext } from "../context/AppContext"; // Importa el contexto para verificar usuario


const Home = () => {
  const categorias = [
    { nombre: "Ropa de seguridad", imagen: seguridad,},
    { nombre: "Productos de limpieza", imagen: limpieza,},
    { nombre: "Artículos de librería", imagen: libreria,},
  ];

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleClick = (categoria) => {
    navigate(`/gallery?category=${categoria.nombre}`); // Navega a /gallery con query parameter
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
        <div className="row">
          {categorias.map((categoria, index) => (
            <div className="col-md-4" key={index}>
              <motion.div // Usa motion.div para la animación de la tarjeta
                className="card clickable" // Agrega la clase clickable
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer", // Cambia el cursor al pasar por encima
                }}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 138, 192, 0.99)" }}
                onClick={() => handleClick(categoria)} // Agrega el evento onClick
              >
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column align-items-center"> {/* Centra vertical y horizontalmente */}
                 <h5 className="card-title text-center">{categoria.nombre}</h5> {/* Centra el texto horizontalmente */}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* NUEVA SECCIÓN PARA VENDER PRODUCTOS */}
        <div className="mt-5 text-center">
          <h3>¿Quieres vender tus productos?</h3>
          <p>Únete a nuestra comunidad y empieza a publicar tus productos hoy mismo.</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button 
              className="btn sell-btn" 
              onClick={handleRedirection}
            >
              Crear Publicación
            </button>
            <button 
              className="btn sell-btn" 
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;