import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSubcategory = () => {
    const [subcategories, setSubcategories] = useState([]);

    // Fetch all subcategories
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-subcategories'); // Update the endpoint to fetch subcategories
                setSubcategories(response.data);
            } catch (error) {
                toast.error("Failed to load subcategories");
            }
        };
        fetchSubcategories();
    }, []);

    // Delete subcategory
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/delete-subcategories/${id}`); // Update the endpoint as per your backend
                setSubcategories(subcategories.filter(subcategory => subcategory._id !== id));
                toast.success("Subcategory deleted successfully");
            } catch (error) {
                console.log(error)
                toast.error("Failed to delete subcategory");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Subcategory List</h4>
                </div>
                <div className="links">
                    <Link to="/add-subcategory" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Subcategory Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Show in Home Page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.length > 0 ? (
                            subcategories.map((subcategory, index) => (
                                <tr key={subcategory._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{subcategory.name}</td>
                                    <td>{subcategory.category ? subcategory.category.name : "No Category"}</td>
                                    <td>{subcategory.subCateStatus === "True" ? "Yes" : "No"}</td>
                                    <td>
                                        <Link to={`/edit-subcategory/${subcategory._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(subcategory._id)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No subcategories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllSubcategory;
