"use client"

import { notifyError } from "@/app/_utils/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState,useRef } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import { GlobalContext } from "@/app/_context/GlobalContext";
import useAddToCart from "@/app/_hooks/useAddToCart";
import useUtilsFunction from "@/app/_hooks/useUtilsFunction"; 
import MainModal from "../modal/MainModal";
import Slider, { Settings } from "react-slick";
import { ProductType } from "@/app/_types/product";
import Discount from "../common/Discount";
import { useCart } from "react-use-cart";


/* 
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import Tags from "@components/common/Tags";
import MainModal from "@components/modal/MainModal";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction"; 
*/



interface ProductModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  product: ProductType
}

const ProductModal = ({
  modalOpen,
  setModalOpen,
  product,
}: ProductModalProps) => {

  const router = useRouter();
  const { setIsLoading, isLoading } = useContext(GlobalContext);
  const { handleAddItem, setItem, item, } = useAddToCart();
  const { lang, showingTranslateValue, getNumber, getNumberTwo } = useUtilsFunction();
  const { items, addItem, updateItemQuantity, inCart ,emptyCart} = useCart();

  // react hook
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
      //setStock(product?.stock);
      setImg(product?.image && product.image.length > 0 ? product.image[0] : "");
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    //product?.stock,
  ]);


  const handleAddToCart = (p:  any) => {
    //if (stock <= 0) return notifyError("Insufficient stock");
   
    const {  categories, description, ...updatedProduct } = product;
    const newItem = {
        ...updatedProduct,
        id:p._id ,
        title: showingTranslateValue(p.title),
        image: img,
        price: getNumber(price),
        originalPrice:getNumber(originalPrice),
    };


      handleAddItem(updatedProduct);
  }



  const handleMoreInfo = (slug:any) => {
    setModalOpen(false);
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };


      
  const category_name = (product?.category?.name);
/*   ?.toLowerCase()
  ?.replace(/[^A-Z0-9]+/gi, "-");  */
   

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
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    };




  return (
    <>
          <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen} >
            
                    <div className="row">
                      <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
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


                              {product?.image.length > 1 && (
                                <Slider {...navSliderSettings} ref={sliderRef2}>
                                    {product?.image.map((pr: string | Blob | undefined) => (
                                        <figure className="border-radius-10">
                                          <img
                                            alt="product image"
                                            src={pr}
                                          />
                                        </figure>
                                      ))}
                                </Slider>
                              )}
                          </div>
                    

                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="detail-info pr-30 pl-30">

                          {product?.prices?.originalPrice >  product?.prices?.price && (
                            <span className="stock-status out-stock"> Sale Off </span>
                          )}

                          <h3 className="title-detail">
                            <a className="text-heading" href="shop-product-right.html">
                                {showingTranslateValue(product?.title)}
                            </a>
                          </h3>
                      
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

                          <div className="detail-extralink mb-30">
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
                                }}
                                
                              >
                                <i className="fi-rs-angle-small-up" />
                              </a>

                            </div>

                            <div className="product-extra-link2">
                    
                              <button className="button button-add-to-cart" onClick={() => handleAddToCart(product)}>
                                <i className="fi-rs-shopping-cart" />
                                Add to cart
                              </button>
                            </div>
                          </div>



                          <div className="font-xs">
                            <ul>
                              <li className="mb-5">
                                
                                Category: <span className="text-brand">{showingTranslateValue(product?.category?.name)}</span>
                              </li>
                              <li className="mb-5">
                                More Info: <span className="text-brand">
                                  <a onClick={() => handleMoreInfo(product.slug)}>Product Details</a>
                                </span>
                              </li>
                            </ul>
                          </div>

                        </div>
                      </div>
                    </div>
                
              

          </MainModal>
    </>
  );
};



export default ProductModal;
function setModalOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

