import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image2 from "../../Images/containers2.png";
import axios from "axios";

const Papercup = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { CategoryName } = useParams();
  const [subcateData, setSubcateData] = useState([]);
  const [productData, setProductData] = useState([]); // Store filtered products

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getApiData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-subcategories");
      const newData = res.data;
      const filterData = newData.filter((x) => x.category.name === CategoryName);
      setSubcateData(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-product");
      const products = res.data;

      // Filter products based on the CategoryName from URL and selected subcategory
      const filteredProducts = products.filter((product) => {
        // Check if the product category matches the CategoryName from URL
        const matchesCategory = product.category.name === CategoryName;

        // If "All" is selected, return products that match the category
        // If a specific subcategory is selected, filter by both category and subcategory
        return activeTab === "All"
          ? matchesCategory
          : matchesCategory && product.subcategory.name === activeTab;
      });

      setProductData(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
    getProductData();
  }, [CategoryName, activeTab]); // Re-fetch data when CategoryName or activeTab changes

  console.log(productData); // Check filtered products

  return (
    <>
      <div>
        <nav aria-label="breadcrumb" className="breadcrumb">
          <div className="breadOverlay">
            <h1>{CategoryName}</h1>
            <p>
              <Link to={"/"}>HOME</Link> / <Link to={"/"}>{CategoryName}</Link>
            </p>
          </div>
        </nav>
      </div>
      <div className="allproducts">
        <div className="container my-4">
          <div className="gap-2 d-flex mb-4">
            <button
              className={`btn btn-outline-success allTabsBtn ${activeTab === "All" ? "active" : ""}`}
              onClick={() => handleTabClick("All")}
            >
              All Cups
            </button>
            {subcateData.map((item, index) => (
              <button
                key={index}
                className={`btn btn-outline-success allTabsBtn ${activeTab === item.name ? "active" : ""}`}
                onClick={() => handleTabClick(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Image Gallery */}

          <div className="row">
            {productData.map((image) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={image._id}>
                <div className="card rounded text-center overflow-hidden border-0 shadow">
                  <Link to={`/product-details/${image.productName}`}>
                    <img
                      src={`https://api.cupagreen.com/${image.productImage}`}
                      className="card-img-top" style={{aspectRatio:1.2 ,objectFit:"cover"}}
                      alt="Item"
                    />
                  </Link>
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title product_title">
                      {image.productName}
                    </h5>
                    <Link
                      to={`/product-details/${image.productName}`}
                      className="btn btn-light px-3 rounded-pill bynowBtn"
                    >
                      <i className="bi bi-bag-check-fill"></i> Enquire Now
                    </Link>
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

export default Papercup;
