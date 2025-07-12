'use client';

import { useWishlist, WishlistItem } from '@/app/_context/WishlistContext';
import useAddToCart from '@/app/_hooks/useAddToCart';
import { ProductType } from '@/app/_types/product';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useCart } from 'react-use-cart';


function wishlist() {
    const { updateItemQuantity,addItem, removeItem,inCart,items } = useCart();

    const { addToWishlist, removeFromWishlist, wishlist ,wishlistCount} = useWishlist();
    const { handleAddItem, handleIncreaseQuantity } = useAddToCart();
    const handleAddToCart = (product: WishlistItem) => {
        const productForCart = {
            ...product,
            _id: product.id,
        };
        handleAddItem(productForCart);
    };

    
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
                <div className="col-xl-10 col-lg-12 m-auto">

                    {wishlistCount > 0 && (
                        <>
                            <div className="mb-50">
                                <h1 className="heading-2 mb-10">Your Wishlist</h1>
                                <h6 className="text-body">
                                    There are <span className="text-brand">{wishlistCount}</span> products in this list
                                </h6>
                            </div>
                    

                            <div className="table-responsive shopping-summery">
                                <table className="table table-wishlist">
                                <thead>
                                    <tr className="main-heading">
                                        <th className="custome-checkbox start pl-30">
                                        
                                        </th>
                                        <th colSpan={2} scope="col">
                                            Product
                                        </th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Action</th>
                                        <th className="end" scope="col">
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {wishlist.map((product) => (
                                    
                                        <tr className="pt-30" key={product.id}>
                                            <td className="custome-checkbox pl-30">
                                            
                                            </td>
                                            <td className="image product-thumbnail pt-40">

                                                {product.image  && (
                                                        <>
                                                            <img
                                                                alt=""
                                                                className="default-img"
                                                                src={product.image}
                                                            />
                                                        </>
                                                    )}

                                                    {product.image.length == 0 && (
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
                                                <h6>
                                                    <Link className="product-name mb-10" href={`/product/${product.slug}`}>
                                                        {product.title}
                                                    </Link>
                                                </h6>
                                            </td>
                                            <td className="price" data-title="Price">
                                                <h3 className="text-brand">${product.price}</h3>
                                            </td>
                                          
                                            <td className="text-right" data-title="Cart">
                                                    <a
                                                        className="btn btn-sm"
                                                        onClick={() => {
                                                            handleAddToCart(product);
                                                        }}
                                                    >
                                                        <i className={inCart(String(product.id)) ? "fi-rs-check mr-5" : "fi-rs-shopping-cart mr-5"} />
                                                        {inCart(String(product.id)) ? "Added" : "Add"}
                                                    </a>
                                            </td>
                                            <td className="action text-center" data-title="Remove">
                                                <a className="text-body" href="#"  onClick={(e) => {removeFromWishlist(String(product.id)); e.preventDefault();} }>
                                                    <Trash2 size={20} color="#ff6b6b" />
                                                </a>

                                            </td>
                                        </tr>
                                    ))}
                                
                                

                                </tbody>
                                </table>
                            </div>
                        </>
                    )}  

                    {wishlistCount === 0 && (
                        <div className="text-center">
                            <h2 className="text-muted">Your Wishlist is Empty</h2>
                            <p className="text-muted">Add items to your wishlist to see them here.</p>
                        </div>
                    )}  

                </div>
            </div>
        </div>
        </main>

    )
}

export default wishlist
