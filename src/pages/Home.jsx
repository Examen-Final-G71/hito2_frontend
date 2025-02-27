import React from "react";
import seguridad from "../assets/img/seguridad.png";
import limpieza from "../assets/img/limpieza.png";
import libreria from "../assets/img/libreria.png";
import Banner from "../components/Banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 


const Home = () => {
  const categorias = [
    {
      nombre: "Ropa de seguridad",
      imagen: seguridad,
    },
    {
      nombre: "Productos de limpieza",
      imagen: limpieza,
    },
    {
      nombre: "Artículos de librería",
      imagen: libreria,
    },
  ];

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleClick = (categoria) => {
    navigate(`/gallery?category=${categoria.nombre}`); // Navega a /gallery con query parameter
  };


 
  return (
    <div>
      <Banner></Banner>
      <div className="container mt-5" style={{ marginBottom: "80px" }}>
        <div className="row">
          <div className="col-12 text-center" style={{ marginBottom: "50px" }}>
          <h2>Categorías</h2>
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
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(88, 114, 230, 0.99)" }}
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
      </div>
    </div>
  );
};

export default Home;