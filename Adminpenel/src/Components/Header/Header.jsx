import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [sidetoggle,setSideToggle] = useState(false)

  const handletoggleBtn =()=>{
    setSideToggle(!sidetoggle)
  }

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("login");
    
    // Navigate to the login page
    window.location.href="/"
  };

  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Cupagreen Admin Panel</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank">
              <i class="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : "" } `  }>
          <ul>
            <li><Link to="/dashboard" onClick={handletoggleBtn}> <i class="fa-solid fa-gauge"></i> Dashboard</Link></li>
            <li><Link to="/all-product-enquery" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> All Product Enquery</Link></li>
            <li><Link to="/all-contact-enquery" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> All Contact Enquery</Link></li>
            <li><Link to="/all-category" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Category</Link></li>
            <li><Link to="/all-subcategory" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage SubCategory</Link></li>
            <li><Link to="/all-products" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Manage Product</Link></li>
            <li><Link to="/all-mainbanner" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Manage Main Banner</Link></li>
            <li><Link to="/all-banner" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Manage Banner</Link></li>
            {/* <li><Link to="/all-tags" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage Tags</Link></li>
            <li><Link to="/all-banners" onClick={handletoggleBtn}> <i class="fa-regular fa-images"></i> Manage Banners</Link></li>
            <li><Link to="/all-shop-banners" onClick={handletoggleBtn}> <i class="fa-brands fa-unsplash"></i> Manage Shop Banners</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}> <i class="fa-brands fa-cc-discover"></i> Manage Voucher</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}> <i class="fa-solid fa-truck-arrow-right"></i> Manage Orders</Link></li> */}
            
            <button className='logout mb-5' onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header