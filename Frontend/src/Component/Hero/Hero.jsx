import React from "react";
import "./hero.css";
import product1 from "../../Images/product1.png";
import product2 from "../../Images/product2.png";
import product3 from "../../Images/product3.png";
import product4 from "../../Images/product4.png";
import product5 from "../../Images/product5.png";
import product6 from "../../Images/product6.png";
import product7 from "../../Images/product7.png";
import product8 from "../../Images/product8.png";
import product9 from "../../Images/product9.png";
import diwali from "../../Images/diwali.png";
function Hero() {
  const products = [
    {
      title: "Option for every design",
      imgarr: [
        { images: product1, name: "Paper Cups" },
        { images: product2, name: "Cup Holder" },
        { images: product3, name: "Lock Box" },
        { images: product4, name: "Dome Shape lid" },
      ],
    },
    {
      title: "Print with your brand",
      imgarr: [{ images: product5 }],
    },
    {
      title: "Disposable high quality paper",
      imgarr: [{ images: product6 }],
    },
    {
      title: "Disposable high quality paper",
      imgarr: [
        { images: product7, name: "All sizes" },
        { images: product8, name: "Ripple High quality" },
        { images: product9, name: "Lock Box" },
      ],
    },
  ];

  return (
    <>
      <section className="hero"></section>
      <section className="productCard_hero">
        <div className="container-fluid">
          <div className="row">
            {products.map((item, index) => (
              <div className="col-md-3 col-6" key={index}>
                <div className="productCard">
                  <h5>{item.title}</h5>
                  <div className="row">
                    {item.imgarr.map((imgItem, imgIndex) => (
                      <div
                        className={
                          item.imgarr.length === 1
                            ? "col-md-12 mt-3"
                            : "col-md-6 col-6 mt-3"
                        }
                        key={imgIndex}
                      >
                        <img
                          src={imgItem.images}
                          className="w-100"
                          alt={imgItem.name}
                        />
                        <p className="text-center">{imgItem.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="divaliImage mt-3">
          <img src={diwali} className="w-100" alt="" />
        </section>
      </section>
    </>
  );
}

export default Hero;
