import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllMainBanner = () => {
    const [banners, setBanners] = useState([]);

    // Fetch all banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('https://api.cupagreen.com/api/all-mainbanner'); // Adjust endpoint as per your backend
                setBanners(response.data);
            } catch (error) {
                toast.error("Failed to load banners");
            }
        };
        fetchBanners();
    }, []);

    // Delete banner
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
                await axios.delete(`https://api.cupagreen.com/api/delete-mainbanner/${id}`); // Adjust endpoint as per your backend
                setBanners(banners.filter(banner => banner._id !== id));
                toast.success("Banner deleted successfully");
            } catch (error) {
                toast.error("Failed to delete banner");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Main Banner List </h4>
                </div>
                <div className="links">
                    <Link to="/add-mainbanner" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.length > 0 ? (
                            banners.map((banner, index) => (
                                <tr key={banner._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img 
                                            src={`https://api.cupagreen.com/${banner.bannerImage}`} 
                                            alt={`Banner ${index + 1}`} 
                                            style={{ width: '100px', height: 'auto' }} 
                                        />
                                    </td>
                                    <td>{banner.bannerStatus ? "Active" : "Inactive"}</td>
                                    <td>
                                        <Link to={`/edit-mainbanner/${banner._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(banner._id)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No banners found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllMainBanner;
