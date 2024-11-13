import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const [category, setCategory] = useState({ name: '', cateStatus: false });
    const [btnLoading, setBtnLoading] = useState(false);
    const { id } = useParams(); // Get category ID from URL params
    const navigate = useNavigate()

    // Fetch category details on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get-category/${id}`); // Update the endpoint as per your backend
                setCategory({
                    name: response.data.name,
                    cateStatus: response.data.cateStatus === "True" // Convert string to boolean
                });
            } catch (error) {
                toast.error("Failed to load category data");
            }
        };
        fetchCategory();
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        
        try {
            await axios.put(`http://localhost:8000/api/update-category/${id}`, {
                name: category.name,
                cateStatus: category.cateStatus ? "True" : "False" // Convert boolean to string
            });
            toast.success("Category updated successfully");
            navigate("/all-category"); // Redirect to category list after update
        } catch (error) {
            toast.error("Failed to update category");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                            className="form-control"
                            id="categoryName"
                            required
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="cateStatus"
                                checked={category.cateStatus}
                                onChange={handleChange}
                                id="categoryActive"
                            />
                            <label className="form-check-label" htmlFor="categoryActive">
                                Active in Homepage
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {btnLoading ? "Please Wait..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
