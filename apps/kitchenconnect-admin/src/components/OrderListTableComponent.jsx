/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/MenuTableComponent.css';
import OrderListRowComponenet from './OrderListRowComponenet';

const OrderListTableComponent = ({orderList}) => {
  return (
    <table className="menu-table">
      <thead>
        <tr>
          <th>OrderID</th>
          <th>kitchenName</th>
          <th>TiffinName</th>
          <th>wantDelivery</th>
          <th>noOfTiffins</th>
          <th>status</th>
          <th>Comments</th>
          <th>CustomerTotal</th>
          <th>OrderDate</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((orderData) => (
          <OrderListRowComponenet key={orderData._id} orderData={orderData} />
        ))}
      </tbody>
    </table>
  )
}

export default OrderListTableComponent