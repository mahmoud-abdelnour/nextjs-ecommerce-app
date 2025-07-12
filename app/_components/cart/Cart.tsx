

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
// Update the import path below to the correct relative path if needed
import { getUserSession } from "@/app/_lib/auth";
import useAddToCart from "@/app/_hooks/useAddToCart";
import HeaderCartItem from "./HeaderCartItem";
import Link from "next/link";
import CartItemType from '@/app/_types/cartItem';




const Cart = () => {
  const { isEmpty, items, cartTotal, emptyCart } = useCart() as unknown as { items: CartItemType[]; isEmpty: boolean; cartTotal: number; emptyCart: () => void };
  const userInfo = getUserSession();
  const { updateItemQuantity, removeItem } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const [isMounted, setIsMounted] = useState(false);

  const handleCheckout = () => {
    const router = useRouter();
        if (items?.length <= 0) {
        } else {
            if (!userInfo) {
                router.push(`/auth/login?redirectUrl=checkout`);
            } else {
                router.push("/checkout");
            }
        }
    };

    useEffect(() => {
        setIsMounted(true); 
    }, []);


    if (!isMounted) {
        return null; 
    }
 

    return (
        <>
            <div className="cart-dropdown-wrap cart-dropdown-hm2">
                <ul>
                    {isEmpty && (
                            <li className="text-center">
                                <h5 className="text-muted">Your cart is empty</h5>
                            </li>

                    )}

                    {items.map((item, i) => (
                        <HeaderCartItem
                            key={i + 1}
                            product={item}
                        />
                    ))}
                </ul>
                <div className="shopping-cart-footer">
                    <div className="shopping-cart-total">
                        <h4>
                            Total <span>  {cartTotal.toFixed(2)} </span>
                        </h4>
                    </div>
                    <div className="shopping-cart-button">
                        <Link href="/cart"  className="outline">  View cart </Link>
                        <Link href="/checkout"   onClick={handleCheckout} >Checkout</Link>
                    </div>
                </div>

            </div>
        </>
   );

};

export default Cart;
