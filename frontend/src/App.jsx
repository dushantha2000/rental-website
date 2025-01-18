import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Header from "./components/common/Header";
import Hero from "./components/common/Hero";
import PropertyFilter from "./components/common/PropertyFilter";
import AboutUs from "./components/common/AboutUs";
import Footer from "./components/common/Footer";
import Recommendation from "./components/common/Recommendation";
import Listings from "./components/Listings";
import AboutPage from "./components/AboutPage";
import Contact from "./components/Contact";
import Login from "./components/common/Login";
import Register from "./components/common/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/header" element={<Header/>} />
          <Route path="/hero" element={<Hero/>} />
          <Route path="/property-filter" element={<PropertyFilter/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/recommendation" element={<Recommendation/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
