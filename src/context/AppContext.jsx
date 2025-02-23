import React, { createContext, useState, useEffect } from "react";
import productsData from "../assets/data/products.json";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });

  const products = productsData.map((product) => ({ ...product }));

  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

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

  const login = (userData, authToken) => {
    console.log("Usuario logueado:", userData);
    setUser(userData);
    setToken(authToken); // Guardar el token
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("cart");
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        user,
        token,
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
