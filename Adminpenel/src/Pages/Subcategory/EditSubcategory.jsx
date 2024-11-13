import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSubcategory = () => {
    const [subcategory, setSubcategory] = useState({ name: '', cateStatus: false, categoryId: '' });
    const [categories, setCategories] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);
    const { id } = useParams(); // Get subcategory ID from URL params
    const navigate = useNavigate();

    // Fetch all categories for the dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-category'); // Fetch categories
                setCategories(response.data); // Set categories
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    // Fetch subcategory details on component mount
    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get-subcategories/${id}`); // Fetch subcategory by ID
                setSubcategory({
                    name: response.data.name,
                    cateStatus: response.data.cateStatus === "True", // Convert string to boolean
                    categoryId: response.data.category ? response.data.category._id : '' // Link to category ID
                });
            } catch (error) {
                toast.error("Failed to load subcategory data");
            }
        };
        fetchSubcategory();
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSubcategory((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        
        try {
            await axios.put(`http://localhost:8000/api/update-subcategories/${id}`, {
                name: subcategory.name,
                cateStatus: subcategory.cateStatus ? "True" : "False", // Convert boolean to string
                categoryId: subcategory.categoryId // Send the selected category ID
            });
            toast.success("Subcategory updated successfully");
            navigate("/all-subcategory"); // Redirect to subcategory list after update
        } catch (error) {
            console.log(error)
            toast.error("Failed to update subcategory");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Subcategory</h4>
                </div>
                <div className="links">
                    <Link to="/all-subcategory" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="subcategoryName" className="form-label">Subcategory Name</label>
                        <input
                            type="text"
                            name="name"
                            value={subcategory.name}
                            onChange={handleChange}
                            className="form-control"
                            id="subcategoryName"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            name="category"
                            value={subcategory.categoryId}
                            onChange={handleChange}
                            className="form-control"
                            id="category"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="cateStatus"
                                checked={subcategory.cateStatus}
                                onChange={handleChange}
                                id="subcategoryActive"
                            />
                            <label className="form-check-label" htmlFor="subcategoryActive">
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
                            {btnLoading ? "Please Wait..." : "Update Subcategory"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditSubcategory;
