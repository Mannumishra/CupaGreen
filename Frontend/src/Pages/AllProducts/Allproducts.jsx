import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Allproducts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allCate, setAllCate] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  const getCateData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-category");
      setAllCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Filter products based on activeTab category
  const filteredProducts =
    activeTab === "All"
      ? allProduct
      : allProduct.filter((product) => product.category.name === activeTab);

  return (
    <>
      <div>
        <nav aria-label="breadcrumb" className="breadcrumb">
          <div className="breadOverlay">
            <h1>ALL PRODUCTS</h1>
            <p>
              <Link to={"/"}>HOME</Link> / <Link to={"/"}>ALL PRODUCTS</Link>
            </p>
          </div>
        </nav>
      </div>

      <div className="allproducts">
        <div className="container my-4">
          {/* Category Filter Tabs */}
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "All" ? "active" : ""
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            {allCate.map((item, index) => (
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

          {/* Product Gallery */}
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={product._id}>
                <div className="card rounded text-center overflow-hidden border-0 shadow">
                  <Link to={`/product-details/${product.productName}`}>
                    <img
                      src={`https://api.cupagreen.com/${product.productImage}`} // Assuming productImage is the path
                      className="card-img-top" style={{aspectRatio:1.2 ,objectFit:"cover"}}
                      alt={product.productName}
                    />
                  </Link>
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title product_title">{product.productName}</h5>
                    <button className="btn btn-light px-3 rounded-pill bynowBtn">
                      <i className="bi bi-bag-check-fill"></i> Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Allproducts;
