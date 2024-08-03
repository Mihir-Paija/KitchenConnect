/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import '../styles/MenuTableComponent.css';
import SubscriptionListRowComponent from './SubscriptionListRowComponent';


const SubscriptionListTableComponent = ({subList}) => {
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
          {/* <th>Comments</th> */}
          {/* <th>CustomerTotal</th> */}
          <th>OrderDate</th>
        </tr>
      </thead>
      <tbody>
        {subList.map((subData) => (
          <SubscriptionListRowComponent key={subData._id} subData={subData} />
        ))}
      </tbody>
    </table>
  )
}

export default SubscriptionListTableComponent