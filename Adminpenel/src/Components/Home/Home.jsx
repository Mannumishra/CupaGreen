import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllSubcategory from '../../Pages/Subcategory/AllSubcategory'
import AddSubcategory from '../../Pages/Subcategory/AddSubcategory'
import EditSubcategory from '../../Pages/Subcategory/EditSubcategory'
import EditProduct from '../../Pages/Products/EditProduct'
import AllProductEnquery from '../../Pages/ProductEnquery/AllProductEnquery'
import ContactEnquery from '../../Pages/ContactEnquery/ContactEnquery'
import Login from '../auth/Login'
import AllBanner from '../../Pages/Banner/AllBanner'
import AddBanner from '../../Pages/Banner/AddBanner'
import EditBanner from '../../Pages/Banner/EditBanner'

const Home = () => {
  const isLoggedIn = sessionStorage.getItem("login");
  return (
    <>
      {
        isLoggedIn ? (
          <>

            <Header />
            <div className="rightside">
              <Routes>
                <Route path={"/dashboard"} element={<Dashboard />} />

                {/* Banner --  */}
                <Route path={"/all-banner"} element={<AllBanner />} />
                <Route path={"/add-banner"} element={<AddBanner />} />
                <Route path={"/edit-banner/:id"} element={<EditBanner />} />

                {/* Category --  */}
                <Route path={"/all-category"} element={<AllCategory />} />
                <Route path={"/add-category"} element={<AddCategory />} />
                <Route path={"/edit-category/:id"} element={<EditCategory />} />

                {/* Category --  */}
                <Route path={"/all-subcategory"} element={<AllSubcategory />} />
                <Route path={"/add-subcategory"} element={<AddSubcategory />} />
                <Route path={"/edit-subcategory/:id"} element={<EditSubcategory />} />

                {/* Product --  */}
                <Route path={"/all-products"} element={<AllProduct />} />
                <Route path={"/add-product"} element={<AddProduct />} />
                <Route path={"/edit-product/:id"} element={<EditProduct />} />


                {/* --- Orders --- */}
                <Route path={"/all-product-enquery"} element={<AllProductEnquery />} />
                <Route path={"/all-contact-enquery"} element={<ContactEnquery />} />

  
                {/* all-shop */}

              </Routes>
            </div>

          </>
        ) :
          <Login />
      }
    </>
  )
}

export default Home