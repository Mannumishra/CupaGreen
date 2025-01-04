import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMainBanner = () => {
  const [bannerImage, setBannerImage] = useState(null); // For file input
  const [bannerStatus, setBannerStatus] = useState(false); // Boolean status
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]); // Save the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("bannerImage", bannerImage); // Append file
    formData.append("bannerStatus", bannerStatus); // Append status

    try {
      const response = await axios.post(
        "https://api.cupagreen.com/api/add-mainbanners", // Adjusted API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/all-mainbanner"); // Adjusted navigation path
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add banner");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Main Banner</h4>
        </div>
        <div className="links">
          <Link to="/all-mainbanners" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="bannerImage" className="form-label">
              Banner Image
            </label>
            <input
              type="file"
              name="bannerImage"
              className="form-control"
              id="bannerImage"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="bannerActive"
                id="bannerActive"
                checked={bannerStatus}
                onChange={(e) => setBannerStatus(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="bannerActive">
                Active
              </label>
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "not-allowed" : "allowed"}`}
            >
              {isLoading ? "Please Wait..." : "Add Banner"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMainBanner;
