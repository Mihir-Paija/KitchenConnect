/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";

const OrderListRowComponenet = ({orderData}) => {
  return (
    <tr key={orderData.order._id}>
          <td>
          {/* {orderData.order._id} */}
            <Link to={`/order/${orderData.order._id}`}>{orderData.order._id}</Link>
          </td>
          <td>
            {/* {orderData.Kitchen.kitchenName} */}
            <Link to={`/provider/${orderData.Kitchen._id}`}>{orderData.Kitchen.kitchenName}</Link>
            </td>
          <td>
            {/* {orderData.Tiffin.name}  */}
    <Link to={`/tiffin/${orderData.Tiffin._id}`}>{orderData.Tiffin.name}</Link>
          </td>
          <td>{orderData.order.wantDelivery ? "Yes" : "No"}</td>
          <td>{orderData.order.noOfTiffins}</td>
          <td>{orderData.order.status}</td>
          <td>{orderData.order.comments}</td>
          <td>{orderData.order.customerPaymentBreakdown.total}</td>
          <td>
            {formatDate(orderData.order.orderDate)} at {formatTime(orderData.order.orderDate)}
          </td>
          {/* <td>
            {formatDate(subPlan.updatedAt)} at {formatTime(subPlan.updatedAt)}
          </td> */}
        </tr>
  )
}

export default OrderListRowComponenet