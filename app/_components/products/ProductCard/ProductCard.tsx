'use client';

import { ProductType } from "@/app/_types/product";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import ProductModal from "../ProdcutModal";
import { notifyError } from "@/app/_utils/toast";
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import { useWishlist } from "../../../_context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaPlus } from "react-icons/fa";
import useAddToCart from "@/app/_hooks/useAddToCart";
import { FiPlus,FiMinus } from "react-icons/fi";
import Discount from "../../common/Discount";
import { useRouter } from "next/navigation";

type ProductCardProps = {
    product: ProductType; 
};
const IconStyle = {
  strokeWidth: "5", // Adjust this value to make strokes thicker
};


const ProductCard = ({ product }: ProductCardProps) => {
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
    const { handleAddItem, item, setItem,handleIncreaseQuantity } = useAddToCart();
    const { showingTranslateValue } = useUtilsFunction();
    const router = useRouter();
  
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
            slug: String(product.slug),
            price: product.prices.price,
            image: product.image?.[0] || "assets/imgs/shop/product-2-2.jpg", // Default image if none provided
        };

        addToWishlist(newItem);
    };


    const cart_product = items.find((i) => String(i._id) === String(product._id));
    
    
    const handleMoreInfo = (slug:any) => {
        setModalOpen(false);
        router.push(`/product/${slug}`);
    };

    return (
        <>

            {modalOpen && (
                <ProductModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    product={product}
                />
            )}

        

            <div className="product-cart-wrap mb-30 wow animate__animated animate__fadeIn animate__delay-_2s"
                data-wow-delay=".2s">
                    <div className="product-img-action-wrap">

                        <div className="product-img product-img-zoom" 
                                
                        >
                            <a 
                            onClick={(e) => { handleModalOpen(!modalOpen, product.id); e.preventDefault()}}
                            >
                                {(product.image?.length ?? 0) > 0 && (
                                    <>
                                        <img
                                            alt=""
                                            className="default-img"
                                            src={product.image?.[0]}
                                        />
                                        <img
                                            alt=""
                                            className="hover-img"
                                            src={product.image?.[2]}
                                        />
                                    </>
                                )}

                                {product.image?.length === 0 && (
                                    <>
                                       <img
                                            alt=""
                                            className="default-img"
                                            src="assets/imgs/shop/product-2-2.jpg"

                                        />
                                    </>
                                )}

                            </a>
                        </div>
                                 

                        <div className="product-action-1">
                                {isWishlisted(product._id) ? (
                                        <a
                                            className="action-btn"
                                            onClick={() => removeFromWishlist(String(product._id))}>
                                            <FaHeart className="wishlistIcon" color="red"  size={17} />
                                        </a>
                                ) : (
                                       <a
                                            className="action-btn"
                                            onClick={() => handleWishlistItem(product)}>
                                            <FiHeart className="wishlistIcon" size={17}   />
                                        </a>
                                )}                       
                            <a
                                onClick={() => { handleModalOpen(!modalOpen, product.id) }}
                                aria-label="Quick view"
                                className="action-btn" >
                                <i className="fi-rs-eye" />
                            </a>
                        </div>

                    


                        {product?.prices?.originalPrice >  product?.prices?.price && (
                            <div className="product-badges product-badges-position product-badges-mrg">
                                <span className="sale">Sale</span>
                            </div>
                        )}

                    </div>

                    <div className="product-content-wrap">
                        <div className="product-category">
                            <a >
                                {showingTranslateValue(product?.category?.name)}
                            </a>
                        </div>
                        <h2>
                            <a  onClick={() => handleMoreInfo(product.slug)}>
                                {showingTranslateValue(product?.title)}
                            </a>
                        </h2>
                    
                    
                        <div className="product-card-bottom">

                            <div className="product-price">

                                {product?.prices?.originalPrice >  product?.prices?.price ? 
                                (
                                    <>
                                        <span>${product?.prices?.price}</span>
                                        <span className="old-price">${product?.prices?.originalPrice}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>${product?.prices?.price}</span>
                                    </>
                                )}
                            </div>

                            <div className="add-cart">
                                 
                                {inCart(String(product._id)) ? (
                                    <div className="input-group  " style={{ width: 86 }}>
                                        
                                     
                                        <button className="btn btn-outline-secondary col-4 p-2" type="button" 
                                             onClick={() => updateItemQuantity((cart_product?._id), (cart_product?.quantity ?? 1) - 1)}
                                        >
                                            <FiMinus  size={14} style={IconStyle} />
                                        </button>
                                        <div className="col-4 text-center d-flex align-items-center justify-content-center bg-brand text-white">
                                            {cart_product?.quantity ?? 0}
                                        </div>
                                        <button className="btn btn-outline-secondary col-4 p-2" type="button"   
                                             onClick={() =>   handleIncreaseQuantity(cart_product)}
                                        >
                                            <FaPlus size={14} />
                                        </button>
                                    </div>
                                ) : (   
                                    <a className="add" onClick={() => handleAddToCart(product)} >
                                    
                                        <i className={inCart(String(product._id)) ? "fi-rs-check mr-5" : "fi-rs-shopping-cart mr-5"}  />
                                        {inCart(String(product._id)) ? "Added" : "Add"}

                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
            </div>
        </>
    );

};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
