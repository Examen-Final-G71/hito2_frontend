import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";

function Cart() {
  const { cart, removeFromCart } = useContext(AppContext);

  if (cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="cart">
      {cart.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={`Cantidad: ${item.quantity}`}
          image={item.image}
          buttonText="Eliminar"
          onClick={() => removeFromCart(item.id)}
        />
      ))}
    </div>
  );
}

export default Cart;