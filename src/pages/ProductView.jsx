import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { AppContext } from "../context/AppContext";

const ProductView = () => {
  const { id } = useParams(); 
  const { products, cart, addToCart } = useContext(AppContext); 
  const navigate = useNavigate(); 

  const product = products.find((product) => product.id === parseInt(id));
  const productInCart = cart.find((item) => item.id === product.id);
  const quantity = productInCart ? productInCart.quantity : 0;

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-link mb-3"
        onClick={() => navigate("/gallery")} 
      >
        Volver
      </button>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-12 col-md-6">
            <img
              src={product.image}
              className="img-fluid rounded-start"
              alt={product.title}
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="card-body">
              <h5 className="card-title"> 
                {product.title} {quantity > 0 && `(${quantity})`} 
              </h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)} 
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
