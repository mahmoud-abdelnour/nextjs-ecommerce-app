
'use client';

import React from 'react';
import { ProductType } from '../../_types/product';
import { Trash2, Minus, Plus } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import useAddToCart from '@/app/_hooks/useAddToCart';
import { useCart } from 'react-use-cart';
import CartItemType from '@/app/_types/cartItem';

interface CartItemProps {
  product: CartItemType;

}

const CheckoutCartItem: React.FC<CartItemProps> = ({ product }) => {
  const { showingTranslateValue } = useUtilsFunction();
  const { updateItemQuantity, removeItem } = useCart();
  const { handleAddItem,handleIncreaseQuantity } = useAddToCart();


  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="d-flex align-items-center border-bottom py-3">
      <div className="d-flex align-items-center flex-grow-1">
       
        {product.image && product.image.length > 0 && (
              <>
                  <img
                        alt={showingTranslateValue(product?.title) || "Product Image"}
                     className="rounded object-fit-cover me-3"
                       style={{ width: "60px", height: "60px" }}
                      src={product.image[0]}
                  />
              
              </>
        )}

        {(!product.image || product.image.length === 0) && (
              <>
                  <img
                        alt={showingTranslateValue(product?.title) || "Product Image"}
                     className="rounded object-fit-cover me-3"
                       style={{ width: "60px", height: "60px" }}

                      src="assets/imgs/shop/product-2-2.jpg"
                  />
              </>
        )} 

      
        <div className="flex-grow-1">
          <h6 className="mb-0">
                {showingTranslateValue(product?.title)}
          </h6>
          <div className="text-muted small">Item Price ${product.price?.toFixed(2) || product.price.toFixed(2)}</div>
          <div className="fw-bold mt-1 cart_item_price" >${product.price.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="d-flex align-items-center">
             
        <div className="detail-extralink mr-15">

            <div className="detail-qty border radius">
                <a className="qty-down" href="#"
                  onClick={(e) => {updateItemQuantity((product?._id), (product?.quantity ?? 1) - 1);e.preventDefault() } }
                  >
                  <i className="fi-rs-angle-small-down" />
                </a>

                <div className="qty-val ">
                    {product?.quantity ?? 0}
                </div>

                <a className="qty-up"  onClick={(e) => {handleIncreaseQuantity(product) ;e.preventDefault()} }>
                  <i className="fi-rs-angle-small-up" />
                </a>
            </div>
          </div>

          <a 
            className=" text-danger border-0"
            onClick={handleRemove}
            aria-label="Remove item"
          >
            <Trash2 size={20} color="#ff6b6b" />
            
          </a>  

      </div>
      
    </div>
  );
};

export default CheckoutCartItem;