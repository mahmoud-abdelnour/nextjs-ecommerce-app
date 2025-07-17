
'use client';

import { GlobalContext } from "@/app/_context/GlobalContext";
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import CategoryService from "@/app/_services/CategoryService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from 'react';
import { useWishlist  } from "../../_context/WishlistContext";

interface Category {
  id: number;
  name: string;
  image?: string;
  children?: Category[];
  [key: string]: any;
}

type CategoriesResponse = Category[];

const HeaderBottom = () => {
    const { wishlistCount } = useWishlist();
  
    const { showingTranslateValue } = useUtilsFunction();

    const [isOpen,setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


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
        toggleMenu();
    };

    const children = categories?.[0]?.children || [];
    const midIndex = Math.ceil(children.length / 2);
    const firstHalf = children.slice(0, midIndex);
    const secondHalf = children.slice(midIndex);

    const { drawerOpen,toggleDrawer, closeDrawer  } = useContext(GlobalContext);

    return (

        <div className="header-bottom header-bottom-bg-color sticky-bar">
        <div className="container">
          <div className="header-wrap header-space-between position-relative">
            <div className="logo logo-width-1 d-block d-lg-none">
              <a href="index.html">
                <img src="/assets/imgs/theme/logo.svg" alt="Logo" />
              </a>
            </div>
            <div className="header-nav d-none d-lg-flex">
              <div className="main-categori-wrap d-none d-lg-block">
                <a className="categories-button-active" onClick={toggleMenu}>
                  <span className="fi-rs-apps" /> <span className="et">Browse</span>{" "}
                  All Categories
                  <i className="fi-rs-angle-down" />
                </a>
                <div className={` ${isOpen ? 'open' : ''} categories-dropdown-wrap categories-dropdown-active-large font-heading`}  >
                  <div className="d-flex categori-dropdown-inner">
                    <ul className="">
                        {firstHalf.map((category, i) => (
                            <li key={i*2} >
                              <a   onClick={() =>
                                    handleCategoryClick(category?._id, category.name)
                                }>
                                {" "}
                                <img alt={category.name} src={category.menu_icon || "assets/imgs/shop/cat-13.png"} />
                                {showingTranslateValue(category.name)}

                              </a>
                            </li>
                        ))}
                      </ul>

                      <ul className="end">
                      
                          {secondHalf.map((category, i) => (
                            <li key={i*2} >
                              <a   onClick={() =>
                                    handleCategoryClick(category?._id, category.name)
                                }>
                                {" "}
                                <img alt={category.name} src={category.menu_icon || "assets/imgs/shop/cat-13.png"} />
                                {showingTranslateValue(category.name)}

                              </a>
                            </li>
                        ))}

                    </ul>
                  </div>
                
                </div>
              </div>
              
              <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
                <nav>
                  <ul>

                    <li>
                      <Link className="active" href={'/'}>
                        Home 
                      </Link>
                    </li>

                    <li className="hot-deals">
                      <img
                        src="/assets/imgs/theme/icons/icon-hot.svg"
                        alt="hot deals"
                      />
                      <Link href={'/coupons'}>Coupons</Link>
                    </li>

                    <li>
                      <Link href={'/about'} >About</Link>
                    </li>

                    <li>
                      <Link href={'/contact'} >Contact</Link>
                    </li>

                  </ul>
                </nav>
              </div>
            </div>
            <div className="hotline d-none d-lg-flex">
              <img src="/assets/imgs/theme/icons/icon-headphone.svg" alt="hotline" />
              <p>
                1900 - 888<span>24/7 Support Center</span>
              </p>
            </div>
            <div className="header-action-icon-2 d-block d-lg-none">
              
              <div className="burger-icon burger-icon-white" onClick={toggleDrawer}>
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>

            </div>
            <div className="header-action-right d-block d-lg-none">
              <div className="header-action-2">
                <div className="header-action-icon-2">
                    <Link href="/wishlist" >
                      <img alt="Nest" src="/assets/imgs/theme/icons/icon-heart.svg" />
                      <span className="pro-count white">{wishlistCount}</span>
                  </Link>
                </div>
                <div className="header-action-icon-2">
                  <a className="mini-cart-icon" href="#">
                    <img alt="Nest" src="/assets/imgs/theme/icons/icon-cart.svg" />
                    <span className="pro-count white">2</span>
                  </a>
                  <div className="cart-dropdown-wrap cart-dropdown-hm2">
                    <ul>
                      <li>
                        <div className="shopping-cart-img">
                          <a href="shop-product-right.html">
                            <img
                              alt="Nest"
                              src="/assets/imgs/shop/thumbnail-3.jpg"
                            />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="shop-product-right.html">
                              Plain Striola Shirts
                            </a>
                          </h4>
                          <h3>
                            <span>1 × </span>$800.00
                          </h3>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fi-rs-cross-small" />
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="shopping-cart-img">
                          <a href="shop-product-right.html">
                            <img
                              alt="Nest"
                              src="/assets/imgs/shop/thumbnail-4.jpg"
                            />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="shop-product-right.html">Macbook Pro 2024</a>
                          </h4>
                          <h3>
                            <span>1 × </span>$3500.00
                          </h3>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fi-rs-cross-small" />
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div className="shopping-cart-footer">
                      <div className="shopping-cart-total">
                        <h4>
                          Total <span>$383.00</span>
                        </h4>
                      </div>
                      <div className="shopping-cart-button">
                        <Link href="/cart">View cart</Link>
                        <Link href="/checkout">Checkout</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

}


export default HeaderBottom;