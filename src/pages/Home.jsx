import React from "react";
import seguridad from "../assets/img/seguridad.png";
import limpieza from "../assets/img/limpieza.png";
import libreria from "../assets/img/libreria.png";
import Banner from "../components/Banner";

const Home = () => {
  const categorias = [
    {
      nombre: 'Ropa de seguridad',
      imagen: seguridad,
      descripcion: 'Protege a tus empleados',
    },
    {
      nombre: 'Productos de limpieza',
      imagen: limpieza,
      descripcion: 'Mantén tu empresa limpia',
    },
    {
      nombre: 'Artículos de librería',
      imagen: libreria,
      descripcion: 'Equipa tu oficina',
    },
  ];

  return (
    <div>
    <Banner></Banner>
    <div className="container mt-5" style={{ marginBottom: '80px' }}>
      <div className="row">
        <div className="col-12 text-center" style={{ marginBottom: '50px' }} >
          <h2>Categorías</h2>
        </div>
      </div>
      <div className="row">
        {categorias.map((categoria, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img src={categoria.imagen} alt={categoria.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{categoria.nombre}</h5>
                <p className="card-text">{categoria.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
};

export default Home;