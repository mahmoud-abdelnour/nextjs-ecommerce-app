'use client';

import React from 'react'
import { ProductType } from '@/app/_types/product';
import CheckoutCartItem from '@/app/_components/cart/CheckoutCartItem';
import CartItem from '@/app/_components/cart/CartItem';
import CartItemType from '@/app/_types/cartItem';
import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import useUtilsFunction from '@/app/_hooks/useUtilsFunction';
import useCheckoutSubmit from '@/app/_hooks/useCheckoutSubmit';
import Error from "@/app/_components/common/Error";
import Link from 'next/link';

function checkout() {
  const [isMounted, setIsMounted] = useState(false);
  const { showingTranslateValue } = useUtilsFunction();

  const handleApplyCoupon = () => {
  };

    
  const {
    userInfo,
    watch,
    error,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    totalItems,
    items,
    cartTotal,
    register,
    errors,
    showCard,
    setShowCard,
    setValue,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    useExistingAddress,
    hasShippingAddress,
    isCouponAvailable,
  } = useCheckoutSubmit();

  useEffect(() => {
        setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (userInfo?.email) {
      setValue('firstName', userInfo.name || '');
      setValue('lastName', userInfo.lastName || '');
      setValue('email', userInfo.email || '');
      setValue("streetAddress", userInfo?.streetAddress ?? undefined);
      setValue("cityAddress", userInfo?.cityAddress ?? undefined);
      setValue('phone', userInfo.phone || '');
    }
  }, [userInfo, setValue]);

  if (!isMounted) {
      return null; 
  }

  const _password = watch("password"); 

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
            <div className="col-lg-8 mb-40">
              <h1 className="heading-2 mb-10">Checkout</h1>
              <div className="d-flex justify-content-between">
                <h6 className="text-body">
                  There are <span className="text-brand">{totalItems}</span> products in your cart
                </h6>
              </div>
            </div>
          </div>
        <div className="row">

          <div className="col-lg-7">
            <div className="row mb-50">
              <div className="col-lg-6 mb-sm-15 mb-lg-0 mb-md-3">

                {!userInfo && (
                  <div className="toggle_info">
                    <span>
                      <i className="fi-rs-user mr-10" />
                      <span className="text-muted font-lg">
                        Already have an account?
                      </span>{" "}
                      <Link                    
                          href="/auth/login">
                          Click here to login
                      </Link>
                    </span>
                  </div>
                )}

              </div>
          
            </div>

            <div className="row">
              <h4 className="mb-20">1- Contact</h4>
              <form onSubmit={handleSubmit(submitHandler)}  id="couponForm">
                <div className="row">
                  <div className="form-group col-lg-6">
                    <input
                      {...register("firstName", {
                          required: "First Name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long"
                          }
                        })}
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                    />
                    <Error errorName={errors.firstName} />
                  </div>
                  <div className="form-group col-lg-6">
                    <input
                    {...register("lastName", {
                          required: "Last Name is required",
                          minLength: {
                            value: 3,
                            message: "Last Name must be at least 3 characters long"
                          }
                        })}
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                    />
                    <Error errorName={errors.lastName} />
                  </div>
                </div>
          

                <div className="row">
                  
                  <div className="form-group col-lg-6">
                    <input
                       {...register("phone", {
                          required: "Phone is required",
                          minLength: {
                            value: 10,
                            message: "Phone must be at least 10 digits long"
                          }
                        })}
                        placeholder="Phone"
                        name="phone"
                        type="text"
                    />
                    <Error errorName={errors.phone} />
                  </div>

                  <div className="form-group col-lg-6">
                   <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email address"
                            }
                          })}
                          name="email"
                          placeholder="Email"
                          readOnly={userInfo?.email?true:false}
                          type="text"
                    />
                    <Error errorName={errors.email} />
                  </div>

                {!userInfo && (
                  <>
                    <div className="form-group col-lg-6">
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long"
                          }
                        })}
                        placeholder="Password"
                        required
                        type="password"
                      />
                      <Error errorName={errors.password} />
                    </div>

                    <div className="form-group col-lg-6">
                      <input
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) => {
                            return value === _password  || "Passwords do not match";
                          }
                        })}
                        placeholder="Confirm password"
                        required
                        type="password"
                      />
                      <Error errorName={errors.confirmPassword} />
                    </div>
                  </>
                )}

                </div>

              </form>
            </div>



            <div className="shipping_option mt-30">
              <h4 className="mb-20">2- Delivery</h4>
                <div className="row">
                  
                  <div className="col-lg-12">
                    <div className="row payment_option">

                      <div className="custome-radio col-4">
                        <input
                          onClick={() => handleShippingCost('50.88')}
                          {...register(`shippingOption`, {
                            required: `Shipping Option is required!`,
                          })}
                          name="shippingOption"
                          type="radio"
                          value={'local_pickup'}
                          className="form-check-input"
                          id="shippingOption2"
                        />

                        <label
                          className="form-check-label"
                          htmlFor="shippingOption2">
                          Local pickup: 
                          <span className='ml-5 text-primary'>50.88</span>
                          <p className='radio_subtitle'>Delivery 7 Days </p>
                        </label>
                      </div>


                      <div className="custome-radio col-4">
                        <input

                          onClick={() => handleShippingCost('80.88')}
                          {...register(`shippingOption`, {
                            required: `Shipping Option is required!`,
                          })}
                          name="shippingOption"
                          type="radio"
                          value={'flate_rate'}
                          className="form-check-input"
                          id="shippingOption1"
                        />

                        <label
                          className="form-check-label"
                          htmlFor="shippingOption1">
                          Flate rate: 
                          <span className='ml-5 text-primary'>80.88</span>
                          <p className='radio_subtitle'>Delivery 3 Days  </p>
                        </label>
                      </div>


                      
                      <div className="custome-radio col-4">
                        <input
                           onClick={() => handleShippingCost('120.88')}
                          {...register(`shippingOption`, {
                            required: `Shipping Option is required!`,
                          })}
                          name="shippingOption"
                          type="radio"
                          value={'local_pickup'}
                          className="form-check-input"
                          id="shippingOption3"
                        />

                        <label
                          className="form-check-label"
                          htmlFor="shippingOption3">
                          UPS : 
                          <span className='ml-5 text-primary'>120.88</span>
                          <p className='radio_subtitle'>Delivery Today  </p>
                        </label>
                      </div>

                    </div>
                    <Error errorName={errors.shippingOption} />
                  </div>



                  <div className="form-group col-lg-6">

                    <input
                        {...register("streetAddress", {
                          required: "Street Address is required",
                          minLength: {
                              value: 5,
                              message: "Street Address be at least 5 characters long"
                            }
                        })}
                        name="streetAddress"
                        placeholder="Street name"
                        required
                        type="text"
                    />
                    <Error errorName={errors.streetAddress} />
                  </div>

                  <div className="form-group col-lg-6">
                      <input
                        {...register("cityAddress", {
                          required: "City name is required",
                          minLength: {
                              value: 5,
                              message: "City name must be at least 5 characters long"
                            }
                        })}
                        name="cityAddress"
                        placeholder="City name"
                        required
                        type="text"
                    />
                    <Error errorName={errors.cityAddress} />
                  </div>

                </div>
            </div>
            

            <div className='mt-30'></div>
              
            <div className="payment_option">
              <h4 className="mb-20">3- Payment</h4>
              <div className="custome-radio">
                <input
                      {...register(`paymentMethod`, {
                        required: `Payment Option is required!`,
                      })}
                      name="paymentMethod"
                      type="radio"
                      value={'COD'}
                      className="form-check-input"
                      id="paymentOption1"
                />
                <label
                  className="form-check-label"
                  htmlFor="paymentOption1">
                  Cash on delivery
                </label>
                <Error errorName={errors.paymentMethod} />
              </div>
            </div>

          </div>


          <div className="col-lg-5">
            <div className="border p-40 cart-totals ml-30 mb-50">
                  
              <div className="d-flex align-items-end justify-content-between ">
                    {isEmpty ? (
                      <h4>Your cart is empty.</h4>
                    ) : (
                     <h4>Your Order</h4>
                    )}
              </div>

              <div className="container py-4">
                    {isEmpty ? (
                      <div className="fw-bold">
                      
                      </div>
                    ) : (
                      <>
                      {items.map(item => (
                        <CheckoutCartItem 
                          key={item.id}
                          product={item} 
                        />
                      ))}
                      
                      <div className='mt-30'></div>

                      <div className="col-lg-12">
                        {couponInfo?.couponCode ? (
                          <span className="bg-emerald-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                            {" "}
                            <p className="text-emerald-600">Coupon Applied </p>{" "}
                            <span className="text-red-500 text-right">
                              {couponInfo?.couponCode}
                            </span>
                          </span>
                        ) : (
                       
                      

                          <div className="input-group mb-3">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter Coupon Code..." 
                                ref={couponRef}
                                aria-label="Coupon code"
                                aria-describedby="button-apply"
                              />
                         
                       {/*        <button 
                                className="btn btn-primary" 
                                type="button" 
                                id="button-apply"
                                onClick={handleCouponCode}

                              >
                                Apply
                              </button> */}


                                 {isCouponAvailable ? (

                                  <button
                                    disabled={isCouponAvailable}
                                    type="submit"
                                    className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                                  >
                                    <img
                                      src="/loader/spinner.gif"
                                      alt="Loading"
                                      width={20}
                                      height={10}
                                    />
                                    <span className=" ml-2 font-light">Processing</span>
                                  </button>

                                ) : (
                                  <button 
                                    
                                      className="btn btn-primary" 
                                      type="button" 
                                      id="button-apply"
                                      onClick={handleCouponCode}
                                    >
                                    Apply
                                  </button>
                                )}

                          </div>
   
                        )}

                          

                      </div>

                      <div className="mt-4">
                        
                          <div className=" pt-3">

                            <div className="d-flex justify-content-between mb-2">
                              <span className="fs-6 text-muted">Subtotal</span>
                              <span className="fw-bold">${cartTotal?.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                              <span className="fs-6 text-muted">Shipping Cost</span>
                              <span className="fw-bold">${shippingCost?.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                              <span className="fs-6 text-muted">Discount</span>
                              <span className="text-warning">${discountAmount.toFixed(2)}</span>
                            </div>

                            <div className="border-top pt-2 d-flex justify-content-between">
                              <strong>Total</strong>
                              <strong>${total.toFixed(2)}</strong>
                            </div>
                            
                          </div>
                      
                      </div>
                    </>
                  )}
              </div>
                



              <div className="payment ">
                <button
                  className="btn btn-fill-out btn-block mt-30"
                  type="submit"
                  disabled={isEmpty || isCheckoutSubmit}
                  form="couponForm" 
                >

                  {isCheckoutSubmit ? (
                      <span className="flex justify-center text-center">
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />{" "}
                        <span className="ml-2">
                          common:processing
                        </span>
                      </span>
                  ) : (
                      <span className="flex justify-center text-center">
                        Place an Order
                        <i className="fi-rs-sign-out ml-15" />
                      </span>
                  )}


                </button>
              </div>

            </div>
          
          </div>
          
        </div>

      </div>

    </main>

  )
}

export default checkout


