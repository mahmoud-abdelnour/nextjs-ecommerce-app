import CartItemType from '@/app/_types/cartItem';
import React from 'react';
import { useCart } from "react-use-cart";

interface HeaderCartItemProps {
  product: CartItemType;
}


const HeaderCartItem: React.FC<HeaderCartItemProps> = ({ product }) => {

  const { updateItemQuantity, removeItem } = useCart();

  const handleRemove = () => {
    removeItem(product.id);
  };


  return (
        <li>
            <div className="shopping-cart-img">
                <a href="shop-product-right.html">
                  {/*   <img
                    alt="Nest"
                    src="/assets/imgs/shop/thumbnail-2.jpg"
                    /> */}

                       {product.image && product.image.length > 0 && (
                            <>
                            
                                <img
                                    alt=""
                                    className="default-img"
                                    src={product.image[0]}
                                />
                          
                            </>
                        )}

                        {(!product.image || product.image.length === 0) && (
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
            <div className="shopping-cart-title">
                <h4>
                    <a href="shop-product-right.html">{product.title}</a>
                </h4>
                <h4><span>{product.quantity} × </span>${product.prices.originalPrice}</h4>
            </div>
            <div className="shopping-cart-delete"  onClick={handleRemove}>
                <a href="#">
                    <i className="fi-rs-cross-small" />
                </a>
            </div>
        </li> 
  );
};

export default HeaderCartItem;