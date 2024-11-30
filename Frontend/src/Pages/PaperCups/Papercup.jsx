import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Papercup = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { CategoryName } = useParams();
  const [subcateData, setSubcateData] = useState([]);
  const [productData, setProductData] = useState([]);

  const handleTabClick = async (tab) => {
    setActiveTab(tab);

    if (tab === "All") {
      // Fetch all category-related products
      await fetchProductsByCategory(CategoryName);
    } else {
      // Fetch subcategory-related products
      await fetchProductsBySubCategory(tab);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://api.cupagreen.com/api/get-product/by-categoryname/${category}`
      );
      setProductData(res.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  const fetchProductsBySubCategory = async (subcategory) => {
    try {
      const res = await axios.get(
        `https://api.cupagreen.com/api/get-product/by-subcategoryname/${subcategory}`
      );
      setProductData(res.data);
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
    }
  };

  useEffect(() => {
    // Fetch subcategories on load
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          `https://api.cupagreen.com/api/get-subcategories/by-categoryname/${CategoryName}`
        );
        setSubcateData(res.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
    fetchProductsByCategory(CategoryName); // Load all products by default
  }, [CategoryName]);

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
              className={`btn btn-outline-success allTabsBtn ${activeTab === "All" ? "active" : ""
                }`}
              onClick={() => handleTabClick("All")}
            >
              All Cups
            </button>
            {subcateData.map((item, index) => (
              <button
                key={index}
                className={`btn btn-outline-success allTabsBtn ${activeTab === item.name ? "active" : ""
                  }`}
                onClick={() => handleTabClick(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="row">
            {productData.map((image) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={image._id}>
                <div className="card rounded text-center overflow-hidden border-0 shadow">
                  <Link to={`/product-details/${image.productName}`}>
                    <img
                      src={`https://api.cupagreen.com/${image.productImage}`}
                      className="card-img-top"
                      style={{ aspectRatio: 1.2, objectFit: "cover" }}
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
