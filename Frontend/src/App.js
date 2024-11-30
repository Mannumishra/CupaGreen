import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Home from "./Component/Home/Home";
import Footer from "./Component/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GalleryPage from "./Pages/GalleryPage/GalleryPage";
import Papercup from "./Pages/PaperCups/Papercup";
import Allproducts from "./Pages/AllProducts/Allproducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import './AllMediaQuery.css'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="page-content"> {/* Apply the margin class here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/Category/:CategoryName" element={<Papercup />} />
          {/* <Route path="/containers" element={<Container />} />
          <Route path="/cutlery" element={<Cutlery />} /> */}
          <Route path="/all-products" element={<Allproducts/>} />
          <Route path="/product-details/:productname" element={<ProductDetails/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
