import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import ProductView from "./pages/ProductView";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Registro from "./pages/Registro";
import CreatePost from "./pages/CreatePost";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router basename="/">
      <AppProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </AppProvider>
    </Router>
  );
}

export default App;
