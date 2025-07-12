'use client';

import OrderServices from '@/app/_services/OrderService';
import React, { useContext, useEffect, useState,use } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import ProductServices from '@/app/_services/ProductService';
import ProductCard from '@/app/_components/products/ProductCard/ProductCard';


interface OrdersResponse {
  products?: any[];
}

interface PageProps {
   searchParams: Promise<{ query?: string; _id?: string }>;
}


function OrderDetails({ searchParams  }: PageProps) {
  
  const { _id,query } =  use(searchParams);


  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery<OrdersResponse>({
    queryKey: ['search', _id, query],

    queryFn: () =>
        ProductServices.getShowingStoreProducts({
            category: _id ? _id : "",
            title: query ? encodeURIComponent(query) : "",
        }),
    staleTime: 0,
  });



  if (isLoading) {
    return <div className='text-center'>Loading orders...</div>;
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
       <section className="product-tabs section-padding position-relative">
              <div className="container">
                    <div className="section-title style-2 wow animate__animated animate__fadeIn">
                      {/* <h3> Products</h3> */}
                    </div>
                    <div className="row product-grid-4">
                          {data?.products && data.products.map((product: any, index: number) => (
                                <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={index*5}>
                                  
                                  <ProductCard
                                    key={index}
                                    product={product}
                                  />
                                </div>
                          ))}
                    </div>
              </div>
            </section>
    </>
  )
}

export default OrderDetails