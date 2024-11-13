import React, { useEffect, useState } from "react";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const ProductDetails = () => {
  const { productname } = useParams();
  const [productData, setProductData] = useState(null);

  const [formData, setFormData] = useState({
    productId:'',
    name: '',
    email: '',
    phone: '',
    subject: '',
    query: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch product data
  const getApiData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get-product-by-name/${productname}`);
      console.log(res)
      setProductData(res.data); 
      setFormData((prevData) => ({
        ...prevData,
        productId: res.data._id, 
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [productname]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/send-inquery", formData);
      if (response.status===201) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          query: ''
        }); 
         // Show success message with SweetAlert2
         Swal.fire({
          title: "Success!",
          text: "Your enquiry has been sent successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!productData) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <>
      <div>
        <nav aria-label="breadcrumb" className="breadcrumb">
          <div className="breadOverlay">
            <h1>{productData.productName}</h1> {/* Dynamic product name */}
            <p>
              <Link to={"/"}>HOME</Link> / <Link to={`/${productData.category.name}`}>{productData.category.name}</Link>
            </p>
          </div>
        </nav>
      </div>

      <div className="allbackgrounds">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-5">
              <img
                src={`http://localhost:8000/${productData.productImage || "default-image.png"}`} // Dynamic product image
                className="w-100"
                alt="product Image"
              />
            </div>
            <div className="col-md-7">
              <div className="productDetailsContent">
                <h3>{productData.productSubDetails}</h3> {/* Dynamic product name */}
                <div dangerouslySetInnerHTML={{ __html: productData.productDetails }} /> {/* Dynamic description */}
                <p className="mt-2">
                  <b>Ability:</b> {productData.ability || "N/A"}
                </p>
                <p>
                  {/* <b>Categories:</b> {productData.categories.join(", ")} Dynamic categories */}
                </p>
                <p>
                  {/* <b>Tags: </b>{productData.tags.join(", ")} Dynamic tags */}
                </p>
                <div className="productDetail_social_media">
                  <b>Share: </b>
                  <div className="socialMedia">
                    <i className="bi bi-whatsapp"></i>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-github"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contactForm container">
          <h2 className="mb-4">Enquire Below</h2>
          {success && <div className="alert alert-success">Your enquiry has been sent successfully!</div>}
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
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone No."
                  required
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
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  name="query"
                  value={formData.query}
                  onChange={handleInputChange}
                  placeholder="Write any query..."
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Sending..." : "SEND"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
