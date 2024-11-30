import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSubcategory = () => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCateStatus, setSubCateStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories to populate the dropdown
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.cupagreen.com/api/get-category');
                setCategories(response.data);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://api.cupagreen.com/api/create-subcategories', {
                name,
                categoryId,
                subCateStatus: subCateStatus ? "True" : "False"
            });
            toast.success(response.data.message);
            navigate('/all-subcategory');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add subcategory");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Subcategory</h4>
                </div>
                <div className="links">
                    <Link to="/all-subcategories" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                        <label htmlFor="categorySelect" className="form-label">Category</label>
                        <select 
                            className="form-select" 
                            id="categorySelect" 
                            value={categoryId} 
                            onChange={(e) => setCategoryId(e.target.value)} 
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="subcategoryName" className="form-label">Subcategory Name</label>
                        <input 
                            type="text" 
                            name="subcategoryName" 
                            className="form-control" 
                            id="subcategoryName" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='SubCategory Name'
                        />
                    </div>
                   
                    {/* <div className="col-12">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="subcategoryActive" 
                                id="subcategoryActive" 
                                checked={subCateStatus}
                                onChange={(e) => setSubCateStatus(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="subcategoryActive">
                                Active in Homepage
                            </label>
                        </div>
                    </div> */}
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Subcategory"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddSubcategory;
