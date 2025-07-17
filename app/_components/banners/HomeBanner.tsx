'use client';

import Slider from "react-slick";
import React, { useRef } from "react";
import 'slick-carousel/slick/slick.css';
import './HomeBanner.scss';

const HomeBanner = () => {
  alert('sxdc');
  let sliderRef = useRef<Slider>(null);
 
    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };


    


    var settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 1000,
        arrows: false,
        autoplay: false,
        slidesToScroll: 1,
        loop: true,
        adaptiveHeight: true,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ],
    };


  return (
    <>
      <section className="home-slider position-relative mb-30">
        <div className="container">
          <div className="home-slide-cover mt-30">
           
            <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
              
              
                <Slider {...settings}
                        ref={slider => {
                            sliderRef.current = slider;
                        }}
                >

                      <div  className="single-hero-slider single-animation-wrap" >

                          
                          <div
                            style={{
                              backgroundImage: "url(assets/imgs/slider/slider-1.png)",
                              width:"100%",
                              height:"100%",
                            }}>

                              <div className="slider-content">
                                <h1 className="display-2 mb-40">
                                  Don’t miss amazing
                                  <br />
                                  grocery deals
                                </h1>
                                <p className="mb-65">Sign up for the daily newsletter</p>
                                <form className="form-subcriber d-flex">
                                  <input placeholder="Your emaill address" type="email" />
                                  <button className="btn" type="submit">
                                    Subscribe
                                  </button>
                                </form>
                              </div>
                          </div>
                      </div>


                      <div  className="single-hero-slider single-animation-wrap" >
                          <div
                                style={{
                                  backgroundImage: "url(assets/imgs/slider/slider-2.png)",
                                  width:"100%",
                                  height:"100%",
                                }}>
                            <div className="slider-content">
                              <h1 className="display-2 mb-40">
                                Fresh Vegetables
                                <br />
                                Big discount
                              </h1>
                              <p className="mb-65">Save up to 50% off on your first order</p>
                              <form className="form-subcriber d-flex">
                                <input placeholder="Your emaill address" type="email" />
                                <button className="btn" type="submit">
                                  Subscribe
                                </button>
                              </form>
                            </div>
                          </div>
                      </div>

                  </Slider>


            </div>


            <div className="slider-arrow hero-slider-1-arrow">

            </div>
          </div>
        </div>
      </section>;

    </>
  );
};

export default HomeBanner;
