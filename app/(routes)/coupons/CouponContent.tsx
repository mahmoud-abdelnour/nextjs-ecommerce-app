'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import dayjs from 'dayjs';
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import CouponTimer from './CouponTimer';

interface CouponContentProps {
  coupons: any;
}

function CouponContent({coupons}: CouponContentProps ){
  const [isCopied, setIsCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const { showingTranslateValue, currency } = useUtilsFunction();

  const handleCopy = (Coupon:any) => {
    navigator.clipboard.writeText(Coupon);
    setIsCopied(true);
    setCopiedCode(Coupon);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
        coupons?.map((coupon: any) => (
        
            <div className="col-6 m-auto mt-20"  key={coupon._id}>

                <div className="coupon d-flex flex-column flex-md-row bg-white rounded shadow-sm">
                
                    <div className="tengah p-4 d-flex align-items-center">
                    <figure className="mb-0 me-4">
                        <Image
                        alt="Summer Gift Voucher"
                        width={120}
                        height={120}
                        className="rounded"
                        src="https://i.ibb.co/4thS4Z1/ins2.jpg"
                        priority={false}
                        />
                    </figure>
                    <div className="ms-3">
                        <div className="mb-2">

                    

                        {dayjs().isAfter(dayjs(coupon.endTime)) ? (

                            <div className="d-flex align-items-center fw-semibold">
                                <span className="d-flex align-items-center justify-content-center text-light bg-danger bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">00</span>:
                                <span className="d-flex align-items-center justify-content-center text-light bg-danger bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">00</span>:
                                <span className="d-flex align-items-center justify-content-center text-light bg-danger bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">00</span>:
                                <span className="d-flex align-items-center justify-content-center text-light bg-danger bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">00</span>
                            </div>

                                
                        ) : (
                            <div className="d-flex align-items-center fw-semibold">
                            <CouponTimer
                                expiryTimestamp={new Date(coupon.endTime)}
                            />
                            </div>

                        )}



                        </div>
                        <h2 className="font-serif fs-5 lh-base fw-medium mb-2">{showingTranslateValue(coupon?.title)}</h2>
                        <h2 className="ps-1 fs-6 fw-medium text-muted">
                            <span className="fs-5 text-danger fw-bold">
                              
                            {coupon?.discountType?.type === "fixed" ? (
                                <span>${coupon?.discountType?.value}</span>
                            ) : (
                                <span>{coupon?.discountType?.value}%</span>
                            )}
                            </span> Off
                        </h2>
                    </div>
                    </div>

                    <div className="border-start  border-dashed w-30 w-md-33 px-4 position-relative">
                    <div className="info d-flex my-3 my-md-4 align-items-center">
                        <div className="w-100">
                        <div className="mb-2">
                            <div className="font-serif fw-medium d-flex align-items-center mb-1">
                            <span>Coupon</span>
                            <div className="ms-2">
                                {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                                    <span className="text-danger d-inline-block">Inactive</span>
                                ) : (
                                    <span className="text-success d-inline-block">Active</span>
                                )}

                            </div>
                            </div>
                            <div className="font-serif border border-dashed  bg-opacity-10 py-2 border-success rounded text-center bg-brand">
                           
                                <button 
                                    className="w-100 border-0 bg-transparent "
                                    onClick={() => handleCopy(coupon.couponCode)}
                                >
                                
                                    {isCopied &&   coupon.couponCode === copiedCode ? (
                                        <span className={`text-light fs-6 fw-semibold ${isCopied ? '' : 'invisible'}`}>
                                            Copied!
                                        </span>
                                    ) : (
                                        <span className={`text-light fs-5 fw-semibold`}>
                                            {coupon.couponCode}
                                        </span>
                                    )}
                                    
                                </button>

                            </div>
                        </div>
                        <p className="small text-muted mt-2">
                          
                        </p>
                        <p className="text-xs leading-4 text-gray-500 mt-2">
                            * This coupon code will apply when you shop for more than  {" "}
                            <span className="fw-bold text-dark">
                            ${coupon.minimumAmount} 
                            </span>
                        </p>
                            
                        </div>
                    </div>
                    </div>

                </div>

            </div>
        ))


    )

}

export default CouponContent
