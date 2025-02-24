import React, { createContext, useState, useEffect, useCallback  } from "react";
import productsData from "../assets/data/products.json";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  const products = productsData.map((product) => ({ ...product }));

  useEffect(() => {
    if (token && !user) {
      fetch("https://hito3-backend.onrender.com/usuarios/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          sessionStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => logout());
    }
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Manejo del Carro
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

  const getCartTotal = () => {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    return total + price * item.quantity;
  }, 0);
};

  const getItemTotal = (item) => {
    const price = parseFloat(item.price) || 0;
    return price * item.quantity;
  };

  //Manejo de Usuario
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem("token", authToken);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

 const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getItemTotal,
        getCartTotal,
        user,
        setUser,
        token,
        login,
        logout,
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
