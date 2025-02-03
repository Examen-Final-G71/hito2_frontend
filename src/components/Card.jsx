import React, { useContext } from "react";
import { AppContext } from "../context/AppContext"; 
import { Link } from "react-router-dom"; 

const Card = ({ id, title, description, image, price, onClick }) => {
  const { cart } = useContext(AppContext); 

  const productInCart = cart.find(item => item.id === id);
  const quantity = productInCart ? productInCart.quantity : 0; 

  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">
          {title} {quantity > 0 && `(${quantity})`} 
        </h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Precio: ${price}</p>
        <Link to={`/product/${id}`} className="btn btn-outline-secondary me-2">
          Ver más
        </Link> 
        <button className="btn btn-primary " onClick={onClick}>
          Añadir al Carrito
        </button>
        

      </div>
    </div>
  );
};

export default Card;
