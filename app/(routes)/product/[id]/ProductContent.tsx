'use client'
import Discount from "@/app/_components/common/Discount";
import { useWishlist } from "@/app/_context/WishlistContext";
import useAddToCart from "@/app/_hooks/useAddToCart";
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import ProductServices from "@/app/_services/ProductService";
import { ProductType } from "@/app/_types/product";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Slider, { Settings } from "react-slick";
import { useCart } from "react-use-cart";
import 'slick-carousel/slick/slick.css';


interface ProductContentProps {
  product: ProductType;
  relatedProducts: ProductType[];
}

 function ProductContent({ product, relatedProducts }: ProductContentProps) {
    const params = useParams();
    const slug = params.id;
 
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
    const { handleAddItem, item, setItem,handleIncreaseQuantity } = useAddToCart();
    const { showingTranslateValue } = useUtilsFunction();

    const [modalOpen, setModalOpen] = useState(false);
    const { items, addItem, updateItemQuantity, inCart ,emptyCart} = useCart();

    const handleModalOpen = (event: boolean, id: string) => {
        setModalOpen(event);
    };

    const isWishlisted = (id: string | number) => {
        return wishlist.some((item) => String(item.id) === String(id));
    };


    const handleAddToCart = (product: ProductType) => {
        handleAddItem(product);
    };


    const handleWishlistItem = (product: ProductType) => {
        const { slug, description, ...updatedProduct } = product;
        const newItem = {
            ...updatedProduct,
            title:  showingTranslateValue(product?.title),
            id: String(product._id),
            price: product.prices.price,
            image: product.image?.[0] || "assets/imgs/shop/product-2-2.jpg", // Default image if none provided
        };
        addToWishlist(newItem);
    };


  const category_name = showingTranslateValue(product?.category?.name)
    .toLowerCase()
    .replace(/[^A-Z0-9]+/gi, "-");

 
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);


    // Slider settings
    const mainSliderSettings: Settings = {
        asNavFor: nav2 ?? undefined,
        dots: false,
        fade: true,
        infinite: true,
        speed: 1000,
        arrows: false,
        autoplay: false,
        slidesToScroll: 1,
        adaptiveHeight: true,
        slidesToShow: 3,
    };

    const navSliderSettings: Settings = {
        asNavFor: nav1 ?? undefined,
        slidesToShow: 6,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
    };
  

  return (
    <div>
     
      <div className="container mb-30">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="slider-container">
                <div className="product-detail accordion-detail">
                  <div className="row mb-50 mt-30">
                      <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                        <div className="detail-gallery">
                          <span className="zoom-icon">
                            <i className="fi-rs-search" />
                          </span>
                          <div className="product-image-slider">
                              <Slider {...mainSliderSettings} ref={sliderRef1}>
                                  {product?.image.map((p: string | Blob | undefined) => (
                                      <figure className="border-radius-10">
                                        <img
                                          alt="product image"
                                          src={p}
                                        />
                                      </figure>
                                    ))}
                              </Slider>

                              <Slider {...navSliderSettings} ref={sliderRef2}>
                                  {product?.image.map((pr: string | Blob | undefined) => (
                                        <div>
                                          <img
                                            alt="product image"
                                            src={pr}
                                          />
                                        </div>
                                      ))}
                              </Slider>
                              </div>
                          </div>
                      </div>
                      

                      <div className="col-md-6 col-sm-12 col-xs-12">
                          <div className="detail-info pr-30 pl-30">
                            {product?.prices?.originalPrice >  product?.prices?.price && (
                                <span className="stock-status out-stock"> Sale Off </span>
                            )}

                            <h2 className="title-detail">
                                {showingTranslateValue(product?.title)}
                            </h2>


                            <div className="clearfix product-price-cover">
                              <div className="product-price primary-color float-left">
                                {product?.prices?.originalPrice >  product?.prices?.price ? 
                                (
                                    <>                                
                                        <span className="current-price text-brand">${product?.prices?.price}</span>
                                        <span>
                                            <Discount showPercentage product={product} />
                                            <span className="old-price font-md ml-15">${product?.prices?.originalPrice}</span>
                                        </span>
                                    </>
                                ) : (
                                  <>
                                      <span className="current-price text-brand">${product?.prices?.price}</span>
                                  </>
                                )}
                              </div>
                            </div>

                         


                            <div className="short-desc mb-30">
                              <p className="font-lg">
                                {showingTranslateValue(product?.description)}
                              </p>
                            </div>
                           
                            <div className="detail-extralink mb-50">
                              <div className="detail-qty border radius">

                                <a 
                                  className={`qty-down${item === 1 ? " disabled" : ""}`}
                                    onClick={(e) => {
                                        if (item === 1) {
                                        e.preventDefault();
                                        return;
                                        }
                                        setItem(item - 1);
                                    }}
                                    
                                >
                                  <i className="fi-rs-angle-small-down" />
                                </a>

                                <span className="qty-val">
                                    {item}
                                </span>
                                <a 
                                
                                   className={`qty-up${product.quantity <= item ? " disabled" : ""}`}
                                    onClick={e => {
                                  if (product.quantity <= item) {
                                    e.preventDefault();
                                    return;
                                  }
                                  setItem(item + 1);
                                }}>
                                  <i className="fi-rs-angle-small-up" />
                                </a>

                              </div>
                              <div className="product-extra-link2">
                                <button className="button button-add-to-cart"  onClick={() => handleAddToCart(product)}>
                                  <i className="fi-rs-shopping-cart" />
                                  Add to cart
                                </button>
                                
                                {isWishlisted(product._id) ? (
                                    <a
                                        className="action-btn hover-up"
                                        onClick={() => removeFromWishlist(String(product._id))}>
                                        <FaHeart className="wishlistIcon" color="red"  size={17} />
                                    </a>
                                ) : (
                                    <a
                                        className="action-btn hover-up"
                                        onClick={() => handleWishlistItem(product)}>
                                        <FiHeart className="wishlistIcon" size={17}   />
                                    </a>
                                )} 
                                
                              </div>
                            </div>
                            <div className="font-xs">
                              <ul className="mr-50 float-start">
                                <li className="mb-5">
                                  Category: <span className="text-brand">{category_name}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                      </div>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




export default ProductContent
