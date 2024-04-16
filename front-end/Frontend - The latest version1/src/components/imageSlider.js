import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './imageSlider.css';

import beachtrash1 from './images/beachtrash1.jpg';
import mountaintrash from './images/mountaintrash.jpg';
import riverboat from './images/riverboat.jpg';
import seagultrash from './images/seagultrash.jpg';
import trashonisland from './images/trashonisland.jpg';
import turtletrash from './images/turtletrash.jpg';
import volunteers1 from './images/volunteers1.jpg';
import volunteers2 from './images/volunteers2.jpg';
import volunteers3 from './images/volunteers3.jpg';

function ImageSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
  };

  const images = [
    beachtrash1,
    /*mountaintrash,*/
    riverboat,
    seagultrash,
    trashonisland,
    turtletrash,
    volunteers1,
    volunteers2,
    volunteers3,
    
  ];

  return (
    <Slider {...settings} className="slider-container">
      {images.map((image, index) => (
        <div key={index} className="slider-item">
         <div className="slider-content">
          <div className = "dark-tint"></div>
          <img 
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="overlay-text">
            <h1>OUR MESS.</h1>
            <h1>OUR PROBLEM.</h1>
            <p>Be a part of the solution, today.</p>
          </div>
         </div>
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
