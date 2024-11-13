import React from "react";
import aboutImage from "../../Images/about.png";
import "./about.css";
import { Link } from "react-router-dom";
import cultery1 from "../../Images/cutlery1.png";
import cultery2 from "../../Images/cutlery2.png";
import cultery3 from "../../Images/cutlery3.png";

const AboutCupagreen = () => {
  const cutlery = [
    {
      productImage: cultery1,
      productName: "3CP (Compartments)",
    },
    {
      productImage: cultery2,
      productName: "Plain Paper Plate",
    },
    {
      productImage: cultery3,
      productName: "Corn Starch FORKS",
    },
    // {
    //   productImage: cultery4,
    //   productName: "Bagasse Cups and Lids",
    // },
  ];
  return (
    <>
      <div className="allproducts">
        <div className="aboutSection">
          <div className="aboutContainer">
            <div className="aboutContent">
              <h2>About Cupagreen</h2>
              <p>
                Cupagreen is a one-stop shop for 100% eco-friendly,
                biodegradable, disposable products for businesses and
                organizations. Since 2014, Cupagreen has been manufacturing
                customized disposables with a strong focus on high-quality
                biodegradable paper cups.
              </p>
            </div>
            <div className="aboutImage">
              <img src={aboutImage} className="w-100" alt="About Cupagreen" />
            </div>
          </div>
        </div>
        <div className="container">
          <section className="cutlery">
            <h2>Most Used Products</h2>
            <div className="row">
              {cutlery.map((item, index) => (
                <div className="col-md-4 col-6 mb-2">
                  <div
                    class="card rounded text-center overflow-hidden border-0 shadow"
                    style={{ maxWidth: "100%" }}
                  >
                    <img
                      src={item.productImage}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body bg-dark text-white">
                      <h5 class="card-title product_title">{item.productName}</h5>
                      <a href="#" class="btn btn-light px-3 rounded-pill bynowBtn">
                        <i class="bi bi-bag-check-fill"></i> Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-white">
              <Link className="btn btn-success mt-3" to={"/"}>
                <i class="bi bi-bag-check-fill"></i> View all
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutCupagreen;
