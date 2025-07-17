'use client'
import Link from "next/link";
import DropdownCategories from "./DropdownCategories";
import { useWishlist  } from "../../_context/WishlistContext";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/app/_lib/auth";
import Cart from "@/app/_components/cart/Cart";


const HeaderMiddle = () => {
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const userInfo = getUserSession();

  const [searchText, setSearchText] = useState("");



    useEffect(() => {
      setMounted(true);
    }, []);
    
    
    const handleSubmit = (e:any) => {
      e.preventDefault();
      if (searchText) {
        router.push(`/search?query=${searchText}`);
        setSearchText("");
      } else {
        router.push(`/ `);
        setSearchText("");
      }
    };


    const handleLogOut = () => {
      signOut();
      Cookies.remove("couponInfo");
      router.push("/");
    };

    return  (
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="header-wrap">
            <div className="logo logo-width-1">
              <Link href="/">
                <img src="/assets/imgs/theme/logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="header-right">
              <div className="search-style-2">
                <form onSubmit={handleSubmit}>
              


                  <input type="text" placeholder="Search for items..." 
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                  />
                </form>

              </div>
              <div className="header-action-right">
                <div className="header-action-2">
                
              
                  <div className="header-action-icon-2">
                    <Link href="/wishlist" >
                        <img
                          className="svgInject"
                          alt="Nest"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count blue">{wishlistCount}</span>
                    </Link>
                    <Link href="/wishlist" >
                      <span className="lable">Wishlist</span>
                    </Link>
                  </div>
                  
                  <div className="header-action-icon-2">
                    <Link href="/cart"  className="mini-cart-icon">
                        <img alt="Nest" src="/assets/imgs/theme/icons/icon-cart.svg" />
                        <span className="pro-count blue">{mounted ? totalItems:0}</span>
                    </Link>
                    <Link href="/cart"  >
                      <span className="lable">Cart</span>
                    </Link>

                    <Cart />

                  </div>

                  <div className="header-action-icon-2">
                    {userInfo?.email ? (
                      <>
                        <Link href="/user/dashboard" >
                          <img
                            className="svgInject"
                            alt="Nest"
                            src="/assets/imgs/theme/icons/icon-user.svg"
                          />
                        </Link>
                  
                        <Link href="/user/dashboard" >
                            <span className="lable ml-0">Account</span>
                        </Link>

                        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                          <ul>
                            <li>
                              <Link href="/user/dashboard">
                                <i className="fi fi-rs-user mr-10" />
                                My Account
                              </Link>
                            </li>
                            <li>
                              <Link href="/user/orders">
                                <i className="fi fi-rs-location-alt mr-10" />
                                Order Tracking
                              </Link>
                            </li>
                            <li>
                              <Link href="/user/address">
                                <i className="fi fi-rs-label mr-10" />
                                My Voucher
                              </Link>
                            </li>
                            <li>
                              <Link href="/wishlist">
                                <i className="fi fi-rs-heart mr-10" />
                                My Wishlist
                              </Link>
                            </li>
                            <li>
                              <Link href="/user/update-profile">
                                <i className="fi fi-rs-settings-sliders mr-10" />
                                Setting
                              </Link>
                            </li>
                            <li>
                              <a onClick={handleLogOut} >
                                <i className="fi fi-rs-sign-out mr-10" />
                                Sign out
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login" >
                            <img
                              className="svgInject"
                              alt="Nest"
                              src="/assets/imgs/theme/icons/icon-user.svg"
                            />
                        </Link>
                        <Link href="/auth/login" >
                            <span className="lable ml-0">Login</span>
                        </Link>
                      </>
                    )}  
                  </div>
               

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

}


export default HeaderMiddle;