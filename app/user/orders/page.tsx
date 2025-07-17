'use client'

import React from 'react'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BriefcaseBusiness, KeyRound, LocationEdit, LogOut, Settings,ShoppingCart, User } from 'lucide-react';


function Orders() {
  const [key, setKey] = useState('home');


  return (

    <div className="card">
      <div className="card-header">
        <h3 className="mb-0">Orders</h3>
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
              <tr>
                <td>#2468</td>
                <td>June 29, 2020</td>
                <td>Completed</td>
                <td>$364.00 for 5 item</td>
                <td>
                  <a className="btn-small d-block" href="#">
                    View
                  </a>
                </td>
              </tr>
              <tr>
                <td>#2366</td>
                <td>August 02, 2020</td>
                <td>Completed</td>
                <td>$280.00 for 3 item</td>
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

export default Orders
