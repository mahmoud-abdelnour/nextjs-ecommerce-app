
'use client';

import { useContext } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';
import Link from 'next/link';

const  MobileHeader = () => {

    const { drawerOpen,toggleDrawer, closeDrawer  } = useContext(GlobalContext);

    return (
        
        <div className={`mobile-header-active mobile-header-wrapper-style    ${drawerOpen ? "sidebar-visible" : ""}`}>

            <div className="mobile-header-wrapper-inner">
                <div className="mobile-header-top">
                <div className="mobile-header-logo">
                 
                        <Link href="/">
                            <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                        </Link>
                </div>
                <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                    <button className="close-style search-close" onClick={toggleDrawer}>
                    <i className="icon-top" />
                    <i className="icon-bottom" />
                    </button>
                </div>
                </div>
                <div className="mobile-header-content-area">
                <div className="mobile-search search-style-3 mobile-header-border">
                  
                </div>
                <div className="mobile-menu-wrap mobile-header-border">
                    <nav>
                    <ul className="mobile-menu font-heading">
                        <li className="menu-item-has-children">
                        <a href="index.html">Home</a>
                        <ul className="dropdown">
                            <li>
                                <a href="index.html">Home 1</a>
                            </li>
                        
                        </ul>
                        </li>
                    </ul>
                    </nav>
                </div>
                <div className="mobile-header-info-wrap">
                    <div className="single-mobile-header-info">
                    <a href="page-contact.html">
                        <i className="fi-rs-marker" /> Our location{" "}
                    </a>
                    </div>
                    <div className="single-mobile-header-info">
                    <a href="page-login.html">
                        <i className="fi-rs-user" />
                        Log In / Sign Up{" "}
                    </a>
                    </div>
                    <div className="single-mobile-header-info">
                    <a href="#">
                        <i className="fi-rs-headphones" />
                        (+01) - 2345 - 6789{" "}
                    </a>
                    </div>
                </div>
                <div className="mobile-social-icon mb-50">
                    <h6 className="mb-15">Follow Us</h6>
                    <a href="#">
                    <img alt="" src="assets/imgs/theme/icons/icon-facebook-white.svg" />
                    </a>
                    <a href="#">
                    <img alt="" src="assets/imgs/theme/icons/icon-twitter-white.svg" />
                    </a>
                    <a href="#">
                    <img alt="" src="assets/imgs/theme/icons/icon-instagram-white.svg" />
                    </a>
                    <a href="#">
                    <img alt="" src="assets/imgs/theme/icons/icon-pinterest-white.svg" />
                    </a>
                    <a href="#">
                    <img alt="" src="assets/imgs/theme/icons/icon-youtube-white.svg" />
                    </a>
                </div>
                <div className="site-copyright">
                    Copyright 2024 © Nest. All rights reserved. Powered by AliThemes.
                </div>
                </div>
            </div>
        </div>


    );

}

export default MobileHeader;