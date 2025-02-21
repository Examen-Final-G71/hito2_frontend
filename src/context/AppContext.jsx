import React, { createContext, useState, useEffect } from "react";
import productsData from "../assets/data/products.json";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null);
  
  const products = productsData.map((product) => {
    return { ...product }; 
  });

  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const login = (userData) => {
    console.log("Usuario logueado:", userData); // <-- Agregar para verificar que se guarda
    setUser(userData);
};

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, user, login, logout, products, increaseQuantity, decreaseQuantity }}>
      {children}
    </AppContext.Provider>
  );
}
