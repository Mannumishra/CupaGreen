import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://www.api.cupagreen.com/api/get-product'); // Replace with your actual endpoint
                console.log(response)
                setProducts(response.data);
                setLoading(false); // Stop loading when data is fetched
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
                toast.error('Failed to load products');
            }
        };

        fetchProducts();
    }, []);

    // Handle Delete
    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://www.api.cupagreen.com/api/delete-product/${productId}`); // Replace with your actual endpoint
                    setProducts(products.filter((product) => product._id !== productId)); // Remove the product from state
                    Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'There was a problem deleting the product.', 'error');
                }
            }
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Product List</h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* Filter options can be added here */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search</label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subcategory</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Sub Details</th>
                            <th scope="col">Product Details</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.category.name}</td> {/* This should display the category name */}
                                    <td>{product.subcategory.name}</td> {/* This should display the subcategory name */}
                                    <td>{product.productName}</td>
                                    <td>{product.productSubDetails}</td>
                                    <td dangerouslySetInnerHTML={{ __html: product.productDetails }}></td>
                                    <td>
                                        <img src={`https://www.api.cupagreen.com/${product.productImage}`} alt={product.productName} width="50" height="50" />
                                    </td>
                                    <td>
                                        <Link to={`/edit-product/${product._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllProduct;
