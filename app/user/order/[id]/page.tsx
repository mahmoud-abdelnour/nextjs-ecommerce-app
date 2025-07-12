'use client';

import OrderServices from '@/app/_services/OrderService';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';
import { useQuery } from '@tanstack/react-query';


interface OrdersResponse {
  orderDetails: any;
  cart?: any[];
  paymentMethod?: any; 
  shippingCost?:any;
  discount?:any; 
  total?:any;
}

interface PageProps {
  params: { id: string };
}




function OrderDetails( ) {


  

  return (
  <>

  bbbb
  </>
  );
}

export default OrderDetails
