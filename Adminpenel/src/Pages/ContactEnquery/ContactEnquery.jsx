import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Helper function to format date in dd/mm/yyyy format
const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ContactEnquery = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // To store selected date

    // Fetch all inquiries
    const fetchInquiries = async () => {
        try {
            const res = await axios.get('https://api.cupagreen.com/api/get-contact-inquery');
            setInquiries(res.data); // Set the response data
            setFilteredInquiries(res.data); // Initialize filtered inquiries with all data
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    // Filter inquiries based on the selected date in dd/mm/yyyy format
    const filterInquiriesByDate = (date) => {
        if (date) {
            // Format selected date to dd/mm/yyyy
            const selectedDateString = formatDate(date);
            const filtered = inquiries.filter(inquiry => {
                const inquiryDate = new Date(inquiry.createdAt);
                const formattedInquiryDate = formatDate(inquiryDate);
                return formattedInquiryDate === selectedDateString;
            });
            setFilteredInquiries(filtered);
        } else {
            // If no date is selected, show all inquiries
            setFilteredInquiries(inquiries);
        }
    };

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        filterInquiriesByDate(date);
    };

    // Update inquiry status
    const updateInquiryStatus = async (inquiryId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Pending' ? 'Complete' : 'Pending'; // Toggle status
            await axios.put(`https://api.cupagreen.com/api/update-contact-inquery/${inquiryId}`, { inquiryStatus: newStatus });

            // Update the status locally to reflect the change
            const updatedInquiries = inquiries.map((inquiry) =>
                inquiry._id === inquiryId ? { ...inquiry, inquiryStatus: newStatus } : inquiry
            );
            setInquiries(updatedInquiries);
            setFilteredInquiries(updatedInquiries);
        } catch (error) {
            console.error('Error updating inquiry status:', error);
        }
    };

    useEffect(() => {
        fetchInquiries(); // Fetch inquiries on component mount
    }, []);

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Contact Enquiry</h4>
                </div>
                <div className="date-picker-container">
                    <label className="form-label">Select Date : </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" // Show date in dd/mm/yyyy format
                        placeholderText="Click to select a date"
                        className="form-control"
                    />
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Query</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Enquiry Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((inquiry, index) => (
                                    <tr key={inquiry._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{inquiry.name}</td>
                                        <td>{inquiry.email}</td>
                                        <td>{inquiry.phone}</td>
                                        <td>{inquiry.subject}</td>
                                        <td>{inquiry.query}</td>
                                        <td>{formatDate(new Date(inquiry.createdAt))}</td> {/* Display Date in dd/mm/yyyy format */}
                                        <td>
                                            <button 
                                                className={`btn ${inquiry.inquiryStatus === 'Pending' ? 'btn-warning' : 'btn-success'}`} 
                                                onClick={() => updateInquiryStatus(inquiry._id, inquiry.inquiryStatus)}
                                                disabled={inquiry.inquiryStatus === 'Complete'} // Disable the button if status is 'Complete'
                                            >
                                                {inquiry.inquiryStatus}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No enquiries available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default ContactEnquery;
