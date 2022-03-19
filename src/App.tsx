import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Services from "./pages/Services";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="services/:slug" element={<Services />} />
      <Route path="checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
