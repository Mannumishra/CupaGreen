import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const editor = useRef(null); // Ref for Jodit editor
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [product, setProduct] = useState({
        productName: '',
        productSubDetails: '',
        productDetails: '',
        category: '',
        subcategory: '',
    });
    const [productImage, setProductImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');

    useEffect(() => {
        axios.get('https://www.api.cupagreen.com/api/get-category')
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        axios.get('https://www.api.cupagreen.com/api/get-subcategories')
            .then(response => setSubcategories(response.data))
            .catch(error => console.error("Error fetching subcategories:", error));
    }, []);

    useEffect(() => {
        axios.get(`https://www.api.cupagreen.com/api/get-product/${id}`)
            .then(response => {
                const data = response.data;
                setProduct({
                    productName: data.productName,
                    productSubDetails: data.productSubDetails,
                    productDetails: data.productDetails,
                    category: data.category._id,
                    subcategory: data.subcategory._id,
                });
                setSelectedCategory(data.category._id);
                setExistingImage(data.productImage);

                const initialFiltered = subcategories.filter(
                    subcategory => subcategory.category._id === data.category._id
                );
                setFilteredSubcategories(initialFiltered);
            })
            .catch(error => console.error("Error fetching product:", error));
    }, [id, subcategories]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setProduct({ ...product, category: categoryId, subcategory: '' });

        const filtered = subcategories.filter(
            subcategory => subcategory.category._id === categoryId
        );
        setFilteredSubcategories(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('productSubDetails', product.productSubDetails);
        formData.append('productDetails', product.productDetails);
        formData.append('category', product.category);
        formData.append('subcategory', product.subcategory);
        if (productImage) {
            formData.append('productImage', productImage);
        }

        setIsLoading(true);
        axios.put(`https://www.api.cupagreen.com/api/update-product/${id}`, formData)
            .then(response => {
                toast.success("Product updated successfully");
                setIsLoading(false);
                navigate("/all-products");
            })
            .catch(error => {
                console.error(error);
                toast.error(error.response?.data?.message || "Error updating product");
                setIsLoading(false);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
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
                            value={product.category}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="subcategory" className="form-label">Subcategory</label>
                        <select
                            name="subcategory"
                            className="form-select"
                            id="subcategory"
                            required
                            value={product.subcategory}
                            onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                        >
                            <option value="" disabled>Select Subcategory</option>
                            {filteredSubcategories.map(subcategory => (
                                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Product Name */}
                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            className="form-control"
                            id="productName"
                            required
                            placeholder="Product Name"
                            value={product.productName}
                            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                        />
                    </div>

                    {/* Product Sub Details */}
                    <div className="col-12">
                        <label htmlFor="productSubDetails" className="form-label">Product Sub Details</label>
                        <textarea
                            name="productSubDetails"
                            className="form-control"
                            id="productSubDetails"
                            required
                            placeholder="Product Sub Details"
                            value={product.productSubDetails}
                            onChange={(e) => setProduct({ ...product, productSubDetails: e.target.value })}
                        />
                    </div>

                    {/* Product Details with Jodit Editor */}
                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            ref={editor}
                            value={product.productDetails}
                            onChange={newContent => setProduct({ ...product, productDetails: newContent })}
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
                        />
                        {existingImage && (
                            <div className="mt-2">
                                <img src={existingImage} alt="Existing Product" width="100" />
                                <p>Current Image</p>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center">
                        <button type="submit" className={`${isLoading ? 'not-allowed' : 'allowed'}`} disabled={isLoading}>
                            {isLoading ? "Please Wait..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
