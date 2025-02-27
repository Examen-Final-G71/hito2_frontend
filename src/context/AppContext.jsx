import React, { createContext, useState, useEffect, useCallback } from "react";

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

  const [token, setToken] = useState(sessionStorage.getItem("token") || null); //manejo de token
  const [products, setProducts] = useState([]); //manejo de productos


  // Cargar publicaciones desde el backend
  useEffect(() => {
    fetch("https://hito3-backend.onrender.com/api/publicaciones")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar publicaciones:", error));
  }, []);

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
  }, [token, user]);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  const addProduct = (newProduct) => {
  setProducts((prevProducts) => [...prevProducts, newProduct]);
};

  // Funciones para el carrito
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

  const getItemTotal = (item) => {
    const price = parseFloat(item.precio) || 0;
    return price * item.quantity;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + getItemTotal(item), 0);
  };
  
  const clearCart = () => {
    setCart([]);
  };

  // Funciones de sesión
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
    sessionStorage.removeItem("user");
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
        clearCart,
        user,
        setUser,
        token,
        login,
        logout,
        products,
        addProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}



/*import React, { createContext, useState, useEffect, useCallback  } from "react";
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
  return cart.reduce((total, item) => total + getItemTotal(item), 0);
};

  const getItemTotal = (item) => {
    const price = parseFloat(item.price) || 0;
    return price * item.quantity;
  };

  const clearCart = () => {
  setCart([]);
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
        clearCart,
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
}*/
