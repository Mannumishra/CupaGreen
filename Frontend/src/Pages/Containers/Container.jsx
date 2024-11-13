import React, { useState } from "react";
import { Link } from "react-router-dom";
import image2 from "../../Images/containers4.png";
const Container = () => {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const images = [
    {
      id: 1,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cups",
    },
    {
      id: 2,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cups",
    },
    {
      id: 3,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Container",
    },
    {
      id: 4,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cups",
    },
    {
      id: 5,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cups",
    },
    {
      id: 6,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cutlery",
    },
    {
      id: 7,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Cups",
    },
    {
      id: 8,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "Container",
    },
    {
      id: 9,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "single-wall-cups",
    },
    {
      id: 10,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "single-wall-cups",
    },
    {
      id: 11,
      src: image2,
      url: "/products/product-details",
      productName: "Plain Paper Plate",
      category: "single-wall-cups",
    },
  ];

  const filteredImages =
    activeTab === "All"
      ? images
      : images.filter((image) => image.category === activeTab);

  return (
    <>
      <div>
        <nav aria-label="breadcrumb" className="breadcrumb">
          <div className="breadOverlay">
            <h1>CONTAINERS</h1>
            <p>
              <Link to={"/"}>HOME</Link> / <Link to={"/"}>CONTAINERS</Link>
            </p>
          </div>
        </nav>
      </div>
      <div className="allproducts">
        <div className="container my-4">
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "All" ? "active" : ""
              }`}
              onClick={() => handleTabClick("All")}
            >
              All Cups
            </button>
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "Cups" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Cups")}
            >
              Double Wall Cups
            </button>
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "Container" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Container")}
            >
              Embossed Cups
            </button>
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "Cutlery" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Cutlery")}
            >
              Rippled Cups
            </button>
            <button
              className={`btn btn-outline-success allTabsBtn ${
                activeTab === "single-wall-cups" ? "active" : ""
              }`}
              onClick={() => handleTabClick("single-wall-cups")}
            >
              Single Wall Cups
            </button>
          </div>

          {/* Image Gallery */}
          <div className="row">
            {filteredImages.map((image) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={image.id}>
                <div className="card rounded text-center overflow-hidden border-0 shadow">
                  <Link to={image.url}>
                    <img src={image.src} className="card-img-top" alt="Item" />
                  </Link>
                  <div class="card-body bg-dark text-white">
                    <h5 class="card-title product_title">{image.productName}</h5>
                    <Link
                      to={image.url}
                      class="btn btn-light px-3 rounded-pill bynowBtn"
                    >
                      <i class="bi bi-bag-check-fill"></i> Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <button className="btn btn-success">
                <i class="bi bi-arrow-clockwise"></i> Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
