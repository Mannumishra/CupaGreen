import React from "react";
import "./Footer.css";
import footer1 from "../../Images/footerImg1.png";
import footer2 from "../../Images/footerImg2.png";
import footer3 from "../../Images/footerImg3.png";
import footer4 from "../../Images/footerImg4.png";
import footer5 from "../../Images/footerImg5.png";
import footer6 from "../../Images/footerImg6.png";
import footer7 from "../../Images/footerImg7.png";
import footer8 from "../../Images/footerImg7.png";
import footerLogo from "../../Images/foterLogo.png";
const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-white">
        <div className="footerOverlay">
          <div className="container">
            <div className="row">
              {/* Logo and Description */}
              <div className="col-md-3 footermb">
                <img src={footerLogo} className="w-50" alt="logo" />
                {/* <h5 className="footer-logo">CupaGreen</h5> */}
                <p>
                  Cupagreen is One-Stop for 100% Eco-friendly, Biodegradable,
                  Disposable products for businesses and organizations.
                  Cupagreen has been involved in manufacturing customized
                  disposables since 2014.
                </p>
                <div className="social-icons footermb">
                  <a href="#" className="me-2">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="me-2">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-twitter"></i>
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-md-3 footermb">
                <h4>All Contacts</h4>
                <p>111 8th Ave, New York, U.S.A</p>
                <p>Office: +123-555-0153</p>
                <p>Email: lorem@ipsum.com</p>
                <p>08 am - 06 pm Sunday closed</p>
              </div>

              {/* Subscribe Section */}
              <div className="col-md-3 footermb">
                <h4>Subscribe</h4>
                <p>
                  Sed ut amet rai in velit veniam bibendum in nec nisi. Etiam
                  ethehdf dui vitae sem.
                </p>
                <div className="input-group footermb">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Insert Your Email"
                  />
                  <button className="btn btn-success" type="button">
                    Send
                  </button>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="col-md-3 footermb">
                <h4>Gallery</h4>
                <div className="row">
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer1} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer2} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer3} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer4} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer5} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer6} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer7} alt="gallery1" className="gallery-img" />
                  </div>
                  <div className="col-md-3 col-3 mb-2">
                    <img src={footer8} alt="gallery1" className="gallery-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center py-4 bg-black text-white">
        © Copyright @2024 Cupagreen. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;