'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, KeyRound, LocationEdit, LogOut, Settings,ShoppingCart, User } from 'lucide-react';
import { signOut } from "next-auth/react";


export default function UserLayout({ children }) {

    const pathname = usePathname(); 

    const handleLogOut = () => {
      signOut();
      Cookies.remove("couponInfo");
      router.push("/");
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
            <div className="col-lg-10 m-auto">
              <div className="row">

                <div className="col-md-3">
                  <div className="dashboard-menu">
  
                    <ul className="nav flex-column" role="tablist">
                      <li className="nav-item">
                        <Link href="/user/dashboard"    className={`nav-link ${pathname === "/user/dashboard" ? "active" : ""}`} >
                            <Settings className='mr-10' />
                            Dashboard
                        </Link>
                      </li>
  
                      <li className="nav-item">
                        <Link href="/user/orders"    className={`nav-link ${pathname === "/user/orders" ? "active" : ""}`} >
                            <BriefcaseBusiness className='mr-10' />
                            Orders
                        </Link>
                      </li>
                   
                      <li className="nav-item">
                        <Link href="/user/address" className={`nav-link ${pathname === "/user/address" ? "active" : ""}`} >
                            <LocationEdit className='mr-10' />
                            My Address
                        </Link>
                      </li>
  
                      <li className="nav-item">
                        <Link href="/user/update-profile" className={`nav-link ${pathname === "/user/update-profile" ? "active" : ""}`} >
                            <User className='mr-10' />
                            Update Profile
                        </Link>
                      </li>
  
                      <li className="nav-item">
                        <Link href="/user/change-password" className={`nav-link ${pathname === "/user/change-password" ? "active" : ""}`} >
                            <KeyRound className='mr-10' />
                            Change Password 
                        </Link>
                      </li>
  
                      <li className="nav-item">
                        <a  onClick={handleLogOut}   className={`nav-link ${pathname === "/user/logout" ? "active" : ""}`} >
                            <LogOut className="mr-10" />  
                            Logout 
                        </a>
                      </li>
  
                    </ul>
  
                  </div>
                </div>
  
                <div className="col-md-9">
                  <div className="tab-content account dashboard-content pl-50">
  
                    <div
                      aria-labelledby="dashboard-tab"
                      className="tab-pane fade active show"
                      id="dashboard"
                      role="tabpanel">
                      <div className="card">
                       
                        <div className="card-body">
                            {children}
                        </div>

                      </div>
                    </div>
  
                  </div>
                </div>
  
  
              </div>
            </div>
          </div>
        </div>
  
  
  
  
      </main>
    );
  }
  