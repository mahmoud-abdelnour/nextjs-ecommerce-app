'use client';

import Slider from "react-slick";
import React, { useRef } from "react";
import 'slick-carousel/slick/slick.css';

const HomeCategories = () => {

  return (
    <>
          <section className="banners mb-25">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay="0">
                    <img alt="" src="assets/imgs/banner/banner-1.png" />
                    <div className="banner-text">
                      <h4>
                        Everyday Fresh & <br />
                        Clean with Our
                        <br />
                        Products
                      </h4>
                      <a className="btn btn-xs" href="shop-grid-right.html">
                        Shop Now <i className="fi-rs-arrow-small-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay=".2s">
                    <img alt="" src="assets/imgs/banner/banner-2.png" />
                    <div className="banner-text">
                      <h4>
                        Make your Breakfast
                        <br />
                        Healthy and Easy
                      </h4>
                      <a className="btn btn-xs" href="shop-grid-right.html">
                        Shop Now <i className="fi-rs-arrow-small-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 d-md-none d-lg-flex">
                  <div
                    className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".4s">
                    <img alt="" src="assets/imgs/banner/banner-3.png" />
                    <div className="banner-text">
                      <h4>
                        The best Organic <br />
                        Products Online
                      </h4>
                      <a className="btn btn-xs" href="shop-grid-right.html">
                        Shop Now <i className="fi-rs-arrow-small-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

    </>
  );
};

export default HomeCategories;
