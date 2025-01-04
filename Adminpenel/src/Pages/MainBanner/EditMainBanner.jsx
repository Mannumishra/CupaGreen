import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMainBanner = () => {
  const [bannerImage, setBannerImage] = useState(null); // For file input
  const [bannerStatus, setBannerStatus] = useState(false); // Boolean status
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams(); // Get banner ID from URL params
  const navigate = useNavigate();

  // Fetch banner details on component mount
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          `https://api.cupagreen.com/api/single-mainbanner/${id}` // Adjusted API endpoint
        );
        setBannerStatus(response.data.bannerStatus); // Convert string to boolean
        setBannerImage(response.data.bannerImage); // Set existing image
      } catch (error) {
        toast.error("Failed to load banner data");
      }
    };
    fetchBanner();
  }, [id]);

  // Handle file input change
  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]); // Update selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("bannerImage", bannerImage); // Append updated file
    formData.append("bannerStatus", bannerStatus); // Pass boolean directly

    try {
      const response = await axios.put(
        `https://api.cupagreen.com/api/update-mainbanner/${id}`, // Adjusted API endpoint
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
      toast.error(error.response?.data?.message || "Failed to update banner");
    } finally {
      setIsLoading(false);
    }
};


  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Main Banner</h4>
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
              required={!bannerImage} // Required only if no existing image
            />
            {bannerImage && typeof bannerImage === "string" && (
              <div className="mt-2">
                <img
                  src={`https://api.cupagreen.com/${bannerImage}`}
                  alt="Current Banner"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="bannerStatus"
                id="bannerStatus"
                checked={bannerStatus}
                onChange={(e) => setBannerStatus(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="bannerStatus">
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
              {isLoading ? "Please Wait..." : "Update Banner"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMainBanner;
