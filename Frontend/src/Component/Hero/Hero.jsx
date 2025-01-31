import React from "react";
import "./hero.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Correct import for modules
import product1 from "../../Images/product1.png";
import product2 from "../../Images/product2.png";
import product3 from "../../Images/product3.png";
import product4 from "../../Images/product4.png";
import product5 from "../../Images/product5.png";
import product6 from "../../Images/product6.png";
import product7 from "../../Images/product7.png";
import product8 from "../../Images/product8.png";
import product9 from "../../Images/product9.png";
import diwali from "../../Images/diwali.png";
import banner from "../../Images/Section.png"
import { useState } from "react";

import axios from "axios"
import { useEffect } from "react";


function Hero() {
  const products = [
    {
      title: "Option for every design",
      imgarr: [
        { images: product1, name: "Paper Cups" },
        { images: product2, name: "Cup Holder" },
        { images: product3, name: "Lock Box" },
        { images: product4, name: "Dome Shape lid" },
      ],
    },
    {
      title: "Print with your brand",
      imgarr: [{ images: product5 }],
    },
    {
      title: "Disposable high quality paper",
      imgarr: [{ images: product6 }],
    },
    {
      title: "Disposable high quality paper",
      imgarr: [
        { images: product7, name: "All sizes" },
        { images: product8, name: "Ripple High quality" },
        { images: product9, name: "Lock Box" },
      ],
    },
  ];
  const [mainBanner, setMainBanner] = useState([])

  const getBannerData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/all-mainbanner")
      console.log(res)
      if (res.status === 200) {
        const newData = res.data
        const fileterData = newData.filter((x) => x.bannerStatus === true)
        setMainBanner(fileterData)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [data, setData] = useState([])

  const getApiData = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/all-banner")
      console.log(res)
      if (res.status === 200) {
        const newData = res.data
        const fileterData = newData.filter((x) => x.bannerStatus === true)
        setData(fileterData)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApiData()
    getBannerData()
  }, [])

  return (
    <>
      <section className="hero">
        <Swiper
          autoplay={{
            delay: 5000, // 10 seconds
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]} // Register Autoplay module
          className="mySwiper"
        >
          {mainBanner.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={`https://api.cupagreen.com/${image.bannerImage}`} className="w-100" alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="productCard_hero">
        <div className="container-fluid">
          <div className="row">
            {products.map((item, index) => (
              <div className="col-md-3 col-6" key={index}>
                <div className="productCard">
                  <h5>{item.title}</h5>
                  <div className="row">
                    {item.imgarr.map((imgItem, imgIndex) => (
                      <div
                        className={
                          item.imgarr.length === 1
                            ? "col-md-12 mt-3"
                            : "col-md-6 col-6 mt-3"
                        }
                        key={imgIndex}
                      >
                        <img
                          src={imgItem.images}
                          className="w-100"
                          alt={imgItem.name}
                        />
                        <p className="text-center">{imgItem.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="divaliImage mt-3">
          <Swiper
            autoplay={{
              delay: 5000, // 10 seconds
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]} // Register Autoplay module
            className="mySwiper"
          >
            {data.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={`https://api.cupagreen.com/${image.bannerImage}`} className="w-100" alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </section>
    </>
  );
}

export default Hero;
