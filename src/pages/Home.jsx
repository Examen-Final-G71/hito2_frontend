import React, { useContext } from "react";
import seguridad from "../assets/img/seguridad.png";
import limpieza from "../assets/img/limpieza.png";
import libreria from "../assets/img/libreria.png";
import Banner from "../components/Banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { AppContext } from "../context/AppContext"; // Importa el contexto para verificar usuario

const Home = () => {
  const { user } = useContext(AppContext); // Obtiene el usuario autenticado
  const navigate = useNavigate();

  
  const categorias = [
    { nombre: "Ropa de seguridad", imagen: seguridad,},
    { nombre: "Productos de limpieza", imagen: limpieza,},
    { nombre: "Artículos de librería", imagen: libreria,},
  ];


  const handleClick = (categoria) => {
    navigate(`/gallery?category=${categoria.nombre}`); // Navega a /gallery con query parameter
  };

  const handleRedirection = () => {
    if (user) {
      navigate("/crear-publicacion"); // Si hay usuario, va a crear publicación
    } else {
      navigate("/login"); // Si no hay usuario, va al login
    }
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
        <div className="row" style={{ marginBottom: "60px"}}>
          {categorias.map((categoria, index) => (
            <div className="col-md-4" key={index}>
              <motion.div // Usa motion.div para la animación de la tarjeta
                className="card clickable" // Agrega la clase clickable
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer", // Cambia el cursor al pasar por encima
                }}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgb(0, 138, 192)" }}
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
          <h3 style={{marginBottom: "20px"}}>¿Quieres vender tus productos?</h3>
          <p>Únete a nuestra comunidad y empieza a publicar tus productos hoy mismo.</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button 
              onClick={handleRedirection}
              style={{
                border: '2px solid rgb(0, 138, 192)', // Borde celeste
                color: 'rgb(0, 138, 192)', // Letras celestes
                padding: '10px 20px', // Ajusta el padding para el tamaño del botón
                borderRadius: '5px', // Bordes redondeados
                cursor: 'pointer', // Cambia el cursor al pasar por encima
                transition: 'background-color 0.3s, color 0.3s' // Transición suave
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgb(0, 138, 192)'; // Fondo celeste al pasar el mouse
                e.target.style.color = 'white'; // Letras blancas al pasar el mouse
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'; // Fondo transparente al salir el mouse
                e.target.style.color = 'rgb(0, 138, 192)'; // Letras celestes al salir el mouse
              }}
            >
              Crear Publicación
            </button>
            <button 
              onClick={() => navigate("/login")}
              style={{
                border: '2px solid rgb(0, 138, 192)', // Borde celeste
                color: 'rgb(0, 138, 192)', // Letras celestes
                padding: '10px 20px', // Ajusta el padding para el tamaño del botón
                borderRadius: '5px', // Bordes redondeados
                cursor: 'pointer', // Cambia el cursor al pasar por encima
                transition: 'background-color 0.3s, color 0.3s' // Transición suave
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgb(0, 138, 192)'; // Fondo celeste al pasar el mouse
                e.target.style.color = 'white'; // Letras blancas al pasar el mouse
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'; // Fondo transparente al salir el mouse
                e.target.style.color = 'rgb(0, 138, 192)'; // Letras celestes al salir el mouse
              }}
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