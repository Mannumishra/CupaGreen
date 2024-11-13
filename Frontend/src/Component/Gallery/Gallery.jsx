import React from "react";
import Slider from "react-slick";
import gallery1 from "../../Images/gallery1.png";
import gallery2 from "../../Images/gallery2.png";
import gallery3 from "../../Images/gallery3.png";
import "./galary.css";

const Gallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1.5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="our_gallery">
        <div className="heading text-center">
          <h1>Our Gallery</h1>
        </div>
        <div className="container">
          <div className="slider">
            <Slider {...settings}>
              <div className="gallery-item">
                <img src={gallery1} className="w-100" alt="Gallery 1" />
              </div>
              <div className="gallery-item">
                <img src={gallery2} className="w-100" alt="Gallery 2" />
              </div>
              <div className="gallery-item">
                <img src={gallery3} className="w-100" alt="Gallery 3" />
              </div>
              <div className="gallery-item">
                <img src={gallery1} className="w-100" alt="Gallery 1" />
              </div>
              <div className="gallery-item">
                <img src={gallery2} className="w-100" alt="Gallery 2" />
              </div>
              <div className="gallery-item">
                <img src={gallery3} className="w-100" alt="Gallery 3" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="gallerybtnright" onClick={onClick}>
      <button className="btn">
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  );
};

// Custom Previous Arrow
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="gallerybtnleft" onClick={onClick}>
      <button className="btn">
        <i class="bi bi-arrow-left"></i>
      </button>
    </div>
  );
};

export default Gallery;
