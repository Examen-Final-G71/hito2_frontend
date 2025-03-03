import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import  carrito  from "../assets/img/carritoVacio.png";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getCartTotal, getItemTotal, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "60vh"}}>
        <h2>Tu carrito está vacío</h2>
        <img src={carrito} alt="Carrito" style={{ width: "60px", height: "auto" }} />
      </div>
    );
  }

  const handlePagar = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ minHeight: "115vh"}}>
      <h2 className="mb-4">Carro de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="d-flex align-items-center border-bottom py-3" key={item.id}>
            <img src={item.imagen} alt={item.nombre} className="me-3" style={{ width: "90px", height: "90px", objectFit: "cover" }} />
            <div className="flex-grow-1">
              <h6 className="mb-0">{item.nombre}</h6>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>{item.descripcion}</p>
              {item.stock === 0 && <p className="text-danger fw-bold">Sin stock</p>}
            </div>
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
              <span className="px-2">{item.quantity}</span>
              <button className="btn btn-outline-primary btn-sm me-3" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <p className="fw-bold mb-0">${getItemTotal(item).toFixed(2)}</p>
            <button className="btn btn-link text-danger ms-3" onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end align-items-center mt-4 gap-3">
        <h4 className="mb-0">
          Total: ${new Intl.NumberFormat("es-CL").format(parseFloat(getCartTotal().toFixed(2)))}
        </h4>
        <button className="btn btn-success ms-4" onClick={handlePagar}>Pagar</button>
      </div>
    </div>
  );
};

export default Cart;




/*import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getCartTotal, getItemTotal, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2>El carrito está vacío</h2>
      </div>
    );
  }

  const handlePagar = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div className="card mb-3" key={item.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.image}
                className="img-fluid rounded-start"
                alt={item.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Precio: ${item.price}</p>
                <p className="card-text">
                  Total: ${getItemTotal(item).toFixed(2)}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-dark me-2"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <p className="card-text mb-0 me-2">
                      <strong>{item.quantity}</strong>
                    </p>
                    <button 
                      className="btn btn-outline-dark me-2"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-end mt-3 mb-3">
        <h4>Total a pagar: ${getCartTotal().toFixed(2)}</h4>
        <button className="btn btn-success mt-3 mb-3" onClick={handlePagar}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;*/
