'use client';

import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from 'react-use-cart';
import CartItem from '@/app/_components/cart/CartItem';
import CartItemType from '@/app/_types/cartItem';
import { useState, useEffect } from 'react';
import Link from 'next/link';


function cart() {
    const { isEmpty, items, cartTotal, emptyCart } = useCart() as unknown as { items: CartItemType[]; isEmpty: boolean; cartTotal: number; emptyCart: () => void };
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
          setIsMounted(true); 
    }, []);


    if (!isMounted) {
        return null; 
    }
  return (
    <main className="main">

        <div className="page-header breadcrumb-wrap">
            <div className="container">
                <div className="breadcrumb">
                    <a href="index.html" rel="nofollow"><i className="fi-rs-home mr-5"></i>Home</a>
                    <span></span> Shop
                    <span></span> Cart
                </div>
            </div>
        </div>
        <div className="container mb-80 mt-50">

            <div className="row">
                <div className="col-lg-8">
                    <div className="table-responsive shopping-summery">
                        {isEmpty && (
                                <div className="text-center mb-50">
                                    <h5 className="text-muted">Your cart is empty</h5>
                                </div>
                        )}

                        {!isEmpty && (
                            <table className="table table-wishlist">
                                <thead>
                                    <tr className="main-heading">
                                        <th colSpan={2} scope="col" className='pl-30'>
                                            Product
                                        </th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                        <th className="end" scope="col">
                                            Remove
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>


                                    {items.map((item, i) => (
                                        <CartItem
                                            key={i + 1}
                                            product={item}
                                        />
                                    ))}
                                  
                                </tbody>
                            </table>
                        )}
                    </div>


                    <div className="divider-2 mb-30" />

                    <div className="cart-action d-flex justify-content-between">
                        <a className="btn ">
                            <i className="fi-rs-arrow-left mr-10" />
                            Continue Shopping
                        </a>
                    </div>

                 
                
                </div>

                <div className="col-lg-4">
                    <div className="border p-md-4 cart-totals ml-30">
                        <div className="table-responsive">
                        <table className="table no-border">
                            <tbody>
                            <tr>
                                <td className="cart_total_label">
                                    <h6 className="text-muted">Total</h6>
                                </td>
                                <td className="cart_total_amount">
              
                                <h4 className="text-brand text-end">${cartTotal.toFixed(2)}</h4>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <Link className="btn mb-20 w-100" href="/checkout">
                            Proceed To CheckOut
                            <i className="fi-rs-sign-out ml-15" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    </main>
  )
}

export default cart
