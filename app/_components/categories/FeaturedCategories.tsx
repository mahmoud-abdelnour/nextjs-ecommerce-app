'use client';
import React, { useContext, useRef } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import CategoryService from "@/app/_services/CategoryService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import { GlobalContext } from "@/app/_context/GlobalContext";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  image?: string;
  children?: Category[];
  [key: string]: any;
}

type CategoriesResponse = Category[];

const FeaturedCategories = () =>{

    const { showingTranslateValue } = useUtilsFunction();
    const router = useRouter();

    const {
        data: categories,
        isLoading,
        error,
        isError,
    } = useQuery<CategoriesResponse>({
        queryKey: ['categories'],
        queryFn: () =>
            CategoryService.getShowingCategory(),
        staleTime: 1000 * 60 * 5,
    });


    const handleCategoryClick = (id:any, category:any) => {
        const category_name = showingTranslateValue(category)
        ?.toLowerCase()
        .replace(/[^A-Z0-9]+/gi, "-");

        router.push(`/search?category=${category_name}&_id=${id}`);
    };




    let sliderRef = useRef<Slider>(null);
 
    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        arrows: false,
        autoplay: false,
        slidesToShow: 10,
        slidesToScroll: 1,
        loop: true,
        adaptiveHeight: true,
        centerPadding: "30px", 
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
            <section className="popular-categories section-padding">
                <div className="container wow animate__animated animate__fadeIn">
                    <div className="section-title">
                        <div className="title">
                            <h3>Featured Categories</h3>
                        </div>
                        <div  className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"  id="carausel-10-columns-arrows" > 
                            <span className="slider-btn slider-prev"  onClick={previous}><i className="fi-rs-arrow-small-left"></i></span>
                            <span className="slider-btn slider-next"  onClick={next}><i className="fi-rs-arrow-small-right"></i></span>
                        </div>
                    </div>

                    <div className="carausel-10-columns-cover position-relative">
                        <div className="carausel-10-columns" id="carausel-10-columns">

                            <Slider {...settings}
                                    ref={slider => {
                                        sliderRef.current = slider;
                                    }}
                            >
                              
                                 
                                {categories && categories[0]?.children?.map((category, i) => (
                                   <div key={i*2} className={`card-2  wow animate__animated animate__fadeInUp  bg-${(i % 7) + 9}`} 
                                        onClick={() =>
                                            handleCategoryClick(category?._id, category.name)
                                        }
                                    > 
                                        <Link href="/">
                                            <figure className="img-hover-scale overflow-hidden">
                                                <img alt={category.name} src={category.icon || "assets/imgs/shop/cat-13.png"} />
                                            </figure>
                                            <h6>
                                                {showingTranslateValue(category.name)}
                                            </h6>
                                         {/*    <span>{category.children?.length ?? 0} items</span> */}
                                        </Link>
                                    </div>
                                ))}


                                {/*   

                                <div  className="card-2 bg-10 wow animate__animated animate__fadeInUp animate__delay-_2s">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-12.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Oganic Kiwi</a>
                                    </h6>
                                    <span>28 items</span>
                                </div>

                                <div className="card-2 bg-11 wow animate__animated animate__fadeInUp animate__delay-_3s" >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-11.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Peach</a>
                                    </h6>
                                    <span>14 items</span>
                                </div>

                                <div  className="card-2 bg-12 wow animate__animated animate__fadeInUp animate__delay-_4s" >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-9.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Red Apple</a>
                                    </h6>
                                    <span>54 items</span>
                                </div>

                                <div  className="card-2 bg-13 wow animate__animated animate__fadeInUp animate__delay-_5s" >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-3.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Snack</a>
                                    </h6>
                                    <span>56 items</span>
                                </div>

                                <div className="card-2 bg-14 wow animate__animated animate__fadeInUp animate__delay-_6s" >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-1.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Vegetables</a>
                                    </h6>
                                    <span>72 items</span>
                                </div>

                                <div className="card-2 bg-15 wow animate__animated animate__fadeInUp animate__delay-_7s" >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-2.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Strawberry</a>
                                    </h6>
                                    <span>36 items</span>
                                </div>

                                <div  className="card-2 bg-12 wow animate__animated animate__fadeInUp animate__delay-_8s"  >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-4.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Black plum</a>
                                    </h6>
                                    <span>123 items</span>
                                </div>

                                <div  className="card-2 bg-10 wow animate__animated animate__fadeInUp animate__delay-_9s"  >
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-5.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Custard apple</a>
                                    </h6>
                                    <span>34 items</span>
                                </div>

                                <div className="card-2 bg-12 wow animate__animated animate__fadeInUp animate__delay-1s">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-14.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Coffe & Tea</a>
                                    </h6>
                                    <span>89 items</span>
                                </div>
                                
                                <div className="card-2 bg-11 wow animate__animated animate__fadeInUp animate__delay-0s">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="shop-grid-right.html">
                                        <img alt="" src="assets/imgs/shop/cat-15.png" />
                                        </a>
                                    </figure>
                                    <h6>
                                        <a href="shop-grid-right.html">Headphone</a>
                                    </h6>
                                    <span>87 items</span>
                                </div> 

                                */}

                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );



}

export default FeaturedCategories;