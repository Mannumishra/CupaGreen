import React, { useState } from "react";
import { Link } from "react-router-dom";
import contactImage from "../../Images/contact.png";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./contact.css";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    query: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api.cupagreen.com/api/send-contact-inquery", formData)
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Enquery Sent!",
          text: "Your Enquery has been sent successfully.",
          confirmButtonText: "OK",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          query: "",
        });
      }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="allproducts">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <div className="breadOverlay">
            <h1>CONTACT</h1>
            <p>
              <Link to={"/"}>HOME</Link> / <Link to={"/"}>CONTACT US</Link>
            </p>
          </div>
        </nav>
        <div className="contactSection">
          <div className="container">
            <div className="heading text-center">
              <h1>Reach Out To Us!</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <h4>Address</h4>
                  <p> <strong>Head Office :</strong> 143, DDA Market, Rajouri Garden, Opposite Surya Grand Hotel, New Delhi-110027</p>
                  <p><strong>Registered Office :</strong> W-17, Rajouri Garden, New Delhi-110027</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:modcupagreen@gmail.com" style={{textDecoration:"none" ,color:"black"}}>modcupagreen@gmail.com</a></p>
                </div>

                <div class="contactnumber">
                  <h4>Contact</h4>
                  <p>
                    <a href="tel:+918700819378">+91-8700819378</a> /
                    <a href="tel:+919811303100">9811303100</a>
                  </p>

                  <h4 class="mt-2">Office Contact</h4>
                  <p>
                    <a href="tel:+911145520997">011-4552-0997</a>
                  </p>
                </div>

                <div className="mt-2">
                  <h4>Opening Time</h4>
                  <p>10:00 am to 06:00 pm (Sunday Closed)</p>
                </div>
                <div className="mt-3">
                  <h4>Social Media</h4>
                  <div>
                    <ul className="social-menu">
                      <li className="social-btn facebook" tooltip="Facebook">
                        <a href="#">
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li className="social-btn instagram" tooltip="Instagram">
                        <a href="#">
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                      <li className="social-btn pinterest" tooltip="Pinterest">
                        <a href="#">
                          <i className="bi bi-pinterest"></i>
                        </a>
                      </li>
                      <li className="social-btn linkedin" tooltip="LinkedIn">
                        <a href="#">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={contactImage}
                  className="w-100"
                  alt="contact image"
                />
              </div>
            </div>
            <div className="contactForm">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="First Name..."
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email..."
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject..."
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <textarea
                      className="form-control"
                      name="query"
                      value={formData.query}
                      onChange={handleInputChange}
                      placeholder="Write any query..."
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <button className="btn btn-success w-100">SEND</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2765.1887443904293!2d77.08410077429787!3d28.730771579614938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07440faeeedd%3A0x7fd3b4b030819bdf!2sDigi%20India%20Solutions!5e1!3m2!1sen!2sin!4v1730200303898!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
