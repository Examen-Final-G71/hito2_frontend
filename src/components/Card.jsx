import React from "react";

import seguridadImg from "../assets/img/seguridad.png";
import limpiezaImg from "../assets/img/limpieza.png";
import libreriaImg from "../assets/img/libreria.png";

const Cardsmain = () => {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5 gap-3"> {/* gap-3 agrega espacio entre las cards */}
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={seguridadImg}
          className="card-img-top"
          alt="Ropa de seguridad"
        />
        <div className="card-body">
          <h5 className="card-title">Ropa de seguridad</h5>
          <p className="card-text">
            Ropa especializada para protección en diversos ambientes de trabajo.
          </p>
          <a href="#" className="btn btn-primary">
            Ver más
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <img
          src={limpiezaImg}
          className="card-img-top"
          alt="Productos de limpieza"
        />
        <div className="card-body">
          <h5 className="card-title">Productos de limpieza</h5>
          <p className="card-text">
            Una variedad de productos para mantener tus espacios impecables.
          </p>
          <a href="#" className="btn btn-primary">
            Ver más
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <img
          src={libreriaImg}
          className="card-img-top"
          alt="Artículos de librería"
        />
        <div className="card-body">
          <h5 className="card-title">Artículos de librería</h5>
          <p className="card-text">
            Artículos esenciales para tu oficina o espacio de estudio.
          </p>
          <a href="#" className="btn btn-primary">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cardsmain;
