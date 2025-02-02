import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";

function Gallery() {
  const { addToCart } = useContext(AppContext);

  const products = [
    { id: 1, title: "Producto A", description: "Descripción A", image: "/img/a.jpg" },
    { id: 2, title: "Producto B", description: "Descripción B", image: "/img/b.jpg" },
    { id: 3, title: "Producto C", description: "Descripción C", image: "/img/c.jpg" },
  ];

  return (
    <div className="gallery">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
          buttonText="Añadir al Carrito"
          onClick={() => addToCart(product)}
        />
      ))}
    </div>
  );
}

export default Gallery;