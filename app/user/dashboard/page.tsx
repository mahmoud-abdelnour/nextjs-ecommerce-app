'use client';

import OrderServices from '@/app/_services/OrderService';
import DashboardContent from './DashboardContent';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import ReactPaginate from "react-paginate";
import OrderCard from '@/app/_components/OrderCard/OrderCard';
import { FaShoppingCart,FaSyncAlt,FaShippingFast   } from "react-icons/fa";
interface Order {
  _id: string;
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  createdAt: string;
  
  // Add other order properties as needed
}

interface OrdersResponse {
  orders: Order[];
  totalDoc:any;
  processing:any;
  pending:any;
  delivered:any;
     
  // Add other response properties if they exist (like total, page, etc.)
}

type OrderStatus = "Delivered" | "Pending" | "Cancel" | "Processing";

const statusColors: Record<OrderStatus, string> = {
  Delivered: "success",
  Pending: "warning",
  Cancel: "danger",
  Processing: "primary",
};


function Dashboard() {
  const { currentPage, } = useContext(GlobalContext);

  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useQuery<OrdersResponse>({
    queryKey: ['orders', currentPage],
    queryFn: () =>
      OrderServices.getOrderCustomer({
        page: currentPage || 1,
        limit: 10,
      }),
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

  const orders = response?.orders || [];
  
  return (
    <>
      <div className="card">
            <div className="card-header">
                <h3 className="mb-0">Dashboard</h3>
            </div>
            <div className="card-body">
                <div className='row '>
                  <div className='col-6 mb-4'>
                      <OrderCard
                          title="Total Orders"
                          Icon={FaShoppingCart}
                          quantity={response?.totalDoc}
                          className="bg-danger"
                      />
                  </div>
                    <div className='col-6 mb-4'>
                      <OrderCard
                          title="Pending"
                          Icon={FaSyncAlt}
                          quantity={response?.pending}
                          className="bg-warning"
                      />
                  </div>
                    <div className='col-6 mb-4'>
                      <OrderCard
                          title="Processing"
                          Icon={FaShippingFast}
                          quantity={response?.processing}
                          className="bg-info"
                      />
                  </div>
                    <div className='col-6 mb-4'>
                      <OrderCard
                          title="Delivered"
                          Icon={FaShippingFast}
                          quantity={response?.delivered}
                          className="bg-success"
                      />
                  </div>
                </div>

                <h5 className='mb-2'>Recent Orders</h5>
                <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders && orders.length > 0 ? (
                          orders.map((order: Order) => (

                            <tr key={order._id}>
                              <td>#
                                {order?._id?.substring(20, 24)}
                              </td>
                              <td>{dayjs(order.createdAt).format('MMMM D, YYYY')}</td>
                              <td>
                                <span className={`badge bg-${statusColors[order.status as OrderStatus]}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>$
                                {order.total.toFixed(2)} 
                              </td>
                              <td>
                                <a
                                  className="btn btn-sm btn-outline-primary"
                                  href={`/user/order/${order._id}`}
                                >
                                  View
                                </a>
                              </td>
                            </tr>

                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-4">
                              No orders found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                </div>
            </div>
        </div> 

    </>
  )
}

export default Dashboard
