'use client';

import React from 'react';
import { ProductType } from '../../_types/product';
import { Trash2, Minus, Plus } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import CartItemType from '@/app/_types/cartItem';
import { useCart } from 'react-use-cart';
import useAddToCart from '@/app/_hooks/useAddToCart';

interface CartItemProps {
  product: CartItemType;

}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
    const { updateItemQuantity, removeItem } = useCart();
    const { handleAddItem,handleIncreaseQuantity } = useAddToCart();

    const { showingTranslateValue } = useUtilsFunction();

    const handleRemove = () => {
        removeItem(product.id);
    };

  return (
    < >
        
        <tr>
            <td className="image product-thumbnail pl-30">
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
            </td>
            <td className="product-des product-name">
                <h6 className="mb-5">
                <a
                    className="product-name mb-10 text-heading"
                    href="shop-product-right.html">
                   {(product.title)}
                </a>
                </h6>
               
            </td>
            <td className="price" data-title="Price">
                <h4 className="text-body">{(product.prices.price)}</h4>
            </td>
            <td className="text-center detail-info" data-title="Stock">
                <div className="detail-extralink mr-15">
                    <div className="detail-qty border radius">

                        <a className="qty-down" 
                         onClick={(e) => {updateItemQuantity((product?._id), (product?.quantity ?? 1) - 1);e.preventDefault() } }
                        >
                            <i className="fi-rs-angle-small-down" />
                        </a>
                        
                  
                        <div className="qty-val ">
                            {product?.quantity ?? 0}
                        </div>

                    

                        <a className="qty-up" href="#"
                            onClick={(e) =>   {handleIncreaseQuantity(product) ;e.preventDefault() }  }
                        >
                            <i className="fi-rs-angle-small-up" />
                        </a>



                    </div>
                </div>
            </td>
            <td className="price" data-title="Price">
                <h4 className="text-brand">{(product.price * product.quantity).toFixed(2)} </h4>
            </td>
            <td className="action text-center" data-title="Remove">
                <a   className=" text-danger border-0"   onClick={handleRemove} >
                    <Trash2 size={20} color="#ff6b6b" />
                </a>
            </td>
        </tr>
    </>
  );
};

export default CartItem;