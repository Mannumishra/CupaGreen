import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allCate, setAllCate] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  // Fetch category data from API
  const getCateData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-category");
      setAllCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch product data from API
  const getProData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-product");
      setAllProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCateData();
    getProData();
  }, []);

  // Handle tab click to filter images based on categories
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter products based on active category tab
  const filteredImages =
    activeTab === "All"
      ? allProduct
      : allProduct.filter((product) => product.category.name === activeTab);

  return (
    <>
      <nav aria-label="breadcrumb" className="breadcrumb">
        <div className="breadOverlay">
          <h1>Photos</h1>
          <p>
            <Link to={"/"}>Home</Link> / <Link to={"/"}>Photos</Link>
          </p>
        </div>
      </nav>
      <div className="allproducts">
        <div className="container my-4">
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "All" ? "active" : ""
              }`}
              onClick={() => handleTabClick("All")}
            >
              All
            </button>
            {allCate.map((item) => (
              <button
                key={item._id}
                className={`btn btn-outline-success allTabsBtn ${
                  activeTab === item.name ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="row">
            {filteredImages.map((image) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={image._id}>
                <div className="card">
                  <img src={`https://api.cupagreen.com/${image.productImage}`} className="card-img-top" style={{aspectRatio:1.2 ,objectFit:"cover"}} alt={image.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
