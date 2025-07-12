'use client';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import { GlobalContext } from '@/app/_context/GlobalContext';

interface DashboardContentProps {
  orders: any;
}



function DashboardContent({orders}: DashboardContentProps ){
    const { isLoading, setIsLoading, currentPage } = useContext(GlobalContext);


    useEffect(() => {
        setIsLoading(false);
    }, []);



    return (
       
        <div className="card">
            <div className="card-header">
                <h3 className="mb-0">Recent Orders</h3>
            </div>
            <div className="card-body">

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
                    <tr>
                        <td>#1357</td>
                        <td>March 45, 2020</td>
                        <td>Processing</td>
                        <td>$125.00 for 2 item</td>
                        <td>
                        <a className="btn-small d-block" href="#">
                            View
                        </a>
                        </td>
                    </tr>
                    
                    </tbody>
                </table>
                </div>
            </div>
        </div> 

    )

}

export default DashboardContent
