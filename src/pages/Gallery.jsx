import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";

function Gallery() {
  const { products, addToCart } = useContext(AppContext); 
  console.log("Productos en Gallery:", products);

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-md-4 col-lg-3 mb-4" key={product.id}>
            <Card
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}  
              buttonText="Añadir al Carrito"
              id={product.id} 
              onClick={() => addToCart(product)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
