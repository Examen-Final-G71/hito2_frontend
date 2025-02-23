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
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const login = (userData) => {
    console.log("Usuario logueado:", userData); 
    setUser(userData);
  };

  const logout = () => {
    setUser(null); 
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        user,
        login,
        logout,
        products,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}