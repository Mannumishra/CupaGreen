import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDetails, setProductDetails] = useState(''); // State for Jodit editor content

    const editor = useRef(null); // Ref for Jodit editor

    // Fetch categories and subcategories from the backend
    useEffect(() => {
        axios.get('https://www.api.cupagreen.com/api/get-category')
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        axios.get('https://www.api.cupagreen.com/api/get-subcategories')
            .then(response => setSubcategories(response.data))
            .catch(error => console.error("Error fetching subcategories:", error));
    }, []);

    // Handle category change to filter subcategories
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);

        // Filter subcategories based on the selected category
        const filtered = subcategories.filter(
            subcategory => subcategory.category._id === categoryId
        );
        setFilteredSubcategories(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const productName = e.target.productName.value;
        const productSubDetails = e.target.productSubDetails.value;
        const category = e.target.category.value;
        const subcategory = e.target.subcategory.value;

        formData.append('productName', productName);
        formData.append('productSubDetails', productSubDetails);
        formData.append('productDetails', productDetails); // Use state for product details
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        if (productImage) {
            formData.append('productImage', productImage);
        }

        setIsLoading(true);
        axios.post('https://www.api.cupagreen.com/api/create-product', formData)
            .then(response => {
                toast.success("Product added successfully");
                setIsLoading(false);
                navigate("/all-products");
                console.log(response)
            })
            .catch(error => {
                console.log(error);
                // toast.error(error.response.data.message);
                setIsLoading(true);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="row g-3">
                    {/* Category Dropdown */}
                    <div className="col-md-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            name="category"
                            className="form-select"
                            id="category"
                            required
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="" selected disabled>Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory Dropdown */}
                    <div className="col-md-3">
                        <label htmlFor="subcategory" className="form-label">Subcategory</label>
                        <select name="subcategory" className="form-select" id="subcategory" required>
                            <option value="" selected disabled>Select Subcategory</option>
                            {filteredSubcategories.map(subcategory => (
                                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Product Name */}
                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" name="productName" className="form-control" id="productName" required placeholder='Product Name' />
                    </div>

                    {/* Product Sub Details */}
                    <div className="col-12">
                        <label htmlFor="productSubDetails" className="form-label">Product Sub Details</label>
                        <textarea name="productSubDetails" className="form-control" id="productSubDetails" required placeholder='Product Details'></textarea>
                    </div>

                    {/* Product Details (Jodit React Editor) */}
                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            ref={editor}
                            value={productDetails}
                            onChange={newContent => setProductDetails(newContent)}
                        />
                    </div>

                    {/* Product Image Upload */}
                    <div className="col-12">
                        <label htmlFor="productImage" className="form-label">Product Image</label>
                        <input
                            type="file"
                            name="productImage"
                            className="form-control"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center">
                        <button type="submit" className={`${isLoading ? 'not-allowed' : 'allowed'}`} disabled={isLoading}>
                            {isLoading ? "Please Wait..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
