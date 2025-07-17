'use client';

import OrderServices from '@/app/_services/OrderService';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams,useParams  } from 'next/navigation';


interface OrdersResponse {
  orderDetails: any;
  cart?: any[];
  paymentMethod?: any; 
  shippingCost?:any;
  discount?:any; 
  total?:any;
}



function OrderDetails( ) {
  const { currentPage, } = useContext(GlobalContext);
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;



  const {
    data: orderDetails,
    isLoading,
    error,
    isError,
  } = useQuery<OrdersResponse>({
    queryKey: ['orderDetails', currentPage],
    queryFn: () =>
      OrderServices.getOrderById(id,{}),
    staleTime: 1000 * 60 * 5,
  });


  if (isLoading) {
    return <div>Loading orders...</div>;
  }


  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        {error instanceof Error ? error.message : 'Failed to fetch orders'}
      </div>
    );
  }

  return (
    <>
        <div className="card">
            <h4 className='mb-3'>Order Details</h4>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Item Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails?.cart?.map((item, i) => (
                           <tr key={i}  >
                                <td>{i+1}</td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td> {item.price}</td>
                                <td>{item.itemTotal}</td>
                           </tr>
                        ))}
                    </tbody>
                </table>
                <br />

                <div className="border-top border-bottom p-4 ">
                    <div className="d-flex flex-column flex-md-row justify-content-between pt-3">
                        <div className="mb-3 mb-md-0 d-flex flex-column flex-wrap">
                            <span className="mb-1 fw-bold text-uppercase  small">Payment Method</span>
                            <span className="small fw-semibold text-muted">{orderDetails?.paymentMethod}</span>
                        </div>

                        <div className="mb-3 mb-md-0 d-flex flex-column flex-wrap">
                            <span className="mb-1 fw-bold text-uppercase  small">Shipping Cost</span>
                            <span className="small fw-semibold text-muted">${orderDetails?.shippingCost}</span>
                        </div>

                        <div className="mb-3 mb-md-0 d-flex flex-column flex-wrap">
                            <span className="mb-1 fw-bold text-uppercase  small">Discount</span>
                            <span className="small fw-semibold text-muted">${orderDetails?.discount}</span>
                        </div>

                        <div className="d-flex flex-column flex-wrap">
                            <span className="mb-1 fw-bold text-uppercase  small">Total Amount</span>
                            <span className="fs-4 fw-bold text-danger">${orderDetails?.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
}

export default OrderDetails
