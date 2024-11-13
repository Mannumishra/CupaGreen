import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFolder, FaSitemap, FaBoxOpen, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState(0);
  const [subcategories, setSubcategories] = useState(0);
  const [products, setProducts] = useState(0);
  const [productEnquiries, setProductEnquiries] = useState(0);
  const [contactEnquiries, setContactEnquiries] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const categoryRes = await axios.get('http://localhost:8000/api/get-category');
      console.log(categoryRes)
      const subcategoryRes = await axios.get('http://localhost:8000/api/get-subcategories');
      const productRes = await axios.get('http://localhost:8000/api/get-product');
      const productEnquiryRes = await axios.get('http://localhost:8000/api/get-inquery');
      const contactEnquiryRes = await axios.get('http://localhost:8000/api/get-contact-inquery');
      
      setCategories(categoryRes.data.length);
      setSubcategories(subcategoryRes.data.length);
      setProducts(productRes.data.length);
      setProductEnquiries(productEnquiryRes.data.length);
      setContactEnquiries(contactEnquiryRes.data.length);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaFolder className="dashboard-icon" />
          <h3>All Categories</h3>
          <p>{categories}</p>
        </div>
        <div className="dashboard-card">
          <FaSitemap className="dashboard-icon" />
          <h3>Subcategories</h3>
          <p>{subcategories}</p>
        </div>
        <div className="dashboard-card">
          <FaBoxOpen className="dashboard-icon" />
          <h3>Products</h3>
          <p>{products}</p>
        </div>
        <div className="dashboard-card">
          <FaQuestionCircle className="dashboard-icon" />
          <h3>Product Enquiries</h3>
          <p>{productEnquiries}</p>
        </div>
        <div className="dashboard-card">
          <FaEnvelope className="dashboard-icon" />
          <h3>Contact Enquiries</h3>
          <p>{contactEnquiries}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
