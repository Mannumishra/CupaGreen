import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./allproducts.css";

function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories and products on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.cupagreen.com/api/get-category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.cupagreen.com/api/get-product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Helper function to get products by category
  const getProductsByCategory = (categoryName) => {
    return products.filter(product => product.category.name === categoryName);
  };

  // Initialize useNavigate
  const navigate = useNavigate();

  return (
    <div className="allproducts">
      <div className="container">
        {categories.map((category) => {
          if (category.cateStatus === "True") {
            const categoryProducts = getProductsByCategory(category.name);
            return (
              <section key={category._id} className={category.name.toLowerCase()}>
                <h2>{category.name}</h2>
                <div className="row">
                  {categoryProducts.splice(0, 6).map((item) => (
                    <div key={item._id} className="col-md-4 col-6 mb-2" style={{ cursor: "pointer" }} onClick={() => navigate(`/product-details/${item.productName}`)}>
                      <div className="card rounded text-center overflow-hidden border-0 shadow" style={{ maxWidth: "100%" }}>
                        <img
                          src={`https://api.cupagreen.com/${item.productImage}`} // Ensure this path is correct for image rendering
                          className="card-img-top" style={{ aspectRatio: 1.2, objectFit: "cover" }}
                          alt={item.productName}
                        />
                        <div className="card-body bg-dark text-white">
                          <h5 className="card-title product_title">{item.productName}</h5>
                          <Link to={`/product-details/${item.productName}`} className="btn btn-light px-3 rounded-pill bynowBtn">
                            <i className="bi bi-bag-check-fill"></i> Enquire Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-white">
                  <Link className="btn btn-success mt-3" to={`/Category/${category.name}`}>
                    <i className="bi bi-bag-check-fill"></i> View all
                  </Link>
                </div>
              </section>
            );
          }
          return null; // If category is not active (cateStatus === "False"), do not render it
        })}
      </div>
    </div>
  );
}

export default AllProducts;
