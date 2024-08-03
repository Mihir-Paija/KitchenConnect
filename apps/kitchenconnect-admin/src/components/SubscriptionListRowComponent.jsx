/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";

const SubscriptionListRowComponent = ({subData}) => {
  console.log(subData.Kitchen)
  return (
    <tr key={subData.Subscription._id}>
          <td>
          {subData.Subscription._id}
            {/* <Link to={`/order/${subData.Subscription._id}`}>{subData.Subscription._id}</Link> */}
          </td>
          <td>
            {/* {subData.Kitchen.kitchenName} */}
            <Link to={`/provider/${subData.Kitchen.email}`}>{subData.Kitchen.kitchenName}</Link>
            </td>
          <td>
            {/* {subData.Tiffin.name}  */}
    <Link to={`/tiffin/${subData.Tiffin._id}`}>{subData.Tiffin.name}</Link>
          </td>
          <td>{subData.Subscription.wantDelivery ? "Yes" : "No"}</td>
          <td>{subData.Subscription.noOfTiffins}</td>
          <td>{subData.Subscription.subscriptionStatus}</td>
          {/* <td>{subData.order.comments}</td> */}
          {/* <td>{subData.order.customerPaymentBreakdown.total}</td> */}
          <td>
            {formatDate(subData.Subscription.orderDate)} at {formatTime(subData.Subscription.orderDate)}
          </td>
          {/* <td>
            {formatDate(subPlan.updatedAt)} at {formatTime(subPlan.updatedAt)}
          </td> */}
        </tr>
  )
}

export default SubscriptionListRowComponent