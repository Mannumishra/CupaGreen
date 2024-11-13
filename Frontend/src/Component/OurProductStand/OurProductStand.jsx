import React from "react";
import companyLogo1 from "../../Images/companyLogo1.png";
import companyLogo2 from "../../Images/companyLogo2.png";
import companyLogo3 from "../../Images/companyLogo3.png";
import companyLogo4 from "../../Images/companyLogo4.png";
import product from "../../Images/product1.png";
import "./outProductstand.css";
const OurProductStand = () => {
  return (
    <>
      <div className="allproducts productStand">
        <div className="container">
          <div className="heading text-center mb-5">
            <h1>Our products stand out because </h1>
          </div>

          <div>
            <div className="row">
              <div className="col-md-3 col-6 mb-2 text-center">
                <img
                  src={companyLogo1}
                  alt="company logo"
                  className="circle-image animated-circle"
                />
              </div>
              <div className="col-md-3 col-6 mb-2 text-center">
                <img
                  src={companyLogo2}
                  alt="company logo"
                  className="circle-image animated-circle-two"
                />
              </div>

              <div className="col-md-3 col-6 mb-2 text-center">
                <img src={companyLogo3} alt="companylogo" className="w-50" />
              </div>
              <div className="col-md-3 col-6 mb-2 text-center">
                <img src={companyLogo4} alt="companylogo" className="w-50" />
              </div>
            </div>
            <div
              className="row mt-3"
              style={{ alignItems: "center", display: "flex" }}
            >
              <div className="col-md-4 col-12 mb-2">
                <img src={product} className="w-100" alt="product" />
              </div>
              <div className="col-md-8 col-12 mb-2">
                <div className="presenting">
                  <h3>PRESENTING</h3>
                  <h1 className="greenheading">100% Biodegradable</h1>
                  <h5>Paper Products</h5>
                  <p>
                    Plastic coated cups are not compostable and cannot be easily
                    recycled while PLA lined cups can only be compostable under
                    controlled conditions and are rarely recycled. In most
                    cases, they end up in landfill or are washed into
                    waterbodies.
                  </p>
                  <p>
                    With the growing need to conserve the environment and
                    protectionists spreading awareness the paper based
                    disposables are the future face of the industry, for the
                    simple reason that they are eco-friendly and degradation is
                    easy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurProductStand;
