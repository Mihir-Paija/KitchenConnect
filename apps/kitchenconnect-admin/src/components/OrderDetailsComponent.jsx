/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/OrderDetailsComponent.css';

const OrderDetailsComponent = ({ orderData }) => {
  const { order, Kitchen, Tiffin } = orderData;
  

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <div className="order-section">
        <h3>Order Information</h3>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer Name:</strong> {order.customerName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Comments:</strong> {order.comments}</p>
        <p><strong>Want Delivery:</strong> {order.wantDelivery ? "Yes" : "No"}</p>
        <p><strong>No of Tiffins:</strong> {order.noOfTiffins}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
      </div>

      <div className="price-section">
        <div className="section-heading">
          <h3>Price Details</h3>
          
        </div>
        <p><strong>Tiffin Price:</strong> ₹{order.price.tiffinPrice}</p>
        <p><strong>Delivery Charge:</strong> ₹{order.price.deliveryCharge}</p>
        <p><strong>Platform Commission:</strong> {order.price.platformCommission * 100}%</p>
        <p><strong>GST on Tiffin:</strong> {order.price.GST_on_tiffin * 100}%</p>
        <p><strong>GST on Service:</strong> {order.price.GST_on_service * 100}%</p>
        <p><strong>Service Discount:</strong> ₹{order.price.serviceDiscount}</p>
        <p><strong>Kitchen Discount:</strong> ₹{order.price.kitchenDiscount}</p>
        {/* <p><strong>Total:</strong> ₹{order.customerPaymentBreakdown.total}</p> */}
      </div>

      <div className="order-section">
        <h3>Customer Payement BreakDown</h3>
        <p><strong>Order Price:</strong> ₹{order.customerPaymentBreakdown.orderPrice}</p>
        <p><strong>Platform Charge :</strong> ₹{order.customerPaymentBreakdown.platformCharge}</p>
        <p><strong>Tax :</strong> ₹{order.customerPaymentBreakdown.tax}</p>
        <p><strong>Delivery Charge:</strong> ₹{order.customerPaymentBreakdown.deliveryCharge}</p>
        <p><strong>Discount :</strong> - ₹{order.customerPaymentBreakdown.discount}</p>
        <p><strong>Total :</strong> ₹{order.customerPaymentBreakdown.total}</p>
        {/* <p><strong>Kitchen Discount:</strong> ₹{order.price.kitchenDiscount}</p>
        <p><strong>Total:</strong> ₹{order.customerPaymentBreakdown.total}</p> */}
      </div>

      <div className="order-section">
        <h3>Provider Payement BreakDown</h3>
        <p><strong>Order Price:</strong> ₹{order.kitchenPaymentBreakdown.orderPrice}</p>
        <p><strong>Platform Charge :</strong> - ₹{order.kitchenPaymentBreakdown.platformCharge}</p>
        <p><strong>Tax :</strong> + ₹{order.kitchenPaymentBreakdown.tax}</p>
        <p><strong>Delivery Charge:</strong> + ₹{order.kitchenPaymentBreakdown.deliveryCharge}</p>
        <p><strong>Discount :</strong> - ₹{order.kitchenPaymentBreakdown.discount}</p>
        <p><strong>Total :</strong> ₹{order.kitchenPaymentBreakdown.total}</p>
        {/* <p><strong>Kitchen Discount:</strong> ₹{order.price.kitchenDiscount}</p>
        <p><strong>Total:</strong> ₹{order.customerPaymentBreakdown.total}</p> */}
      </div>

      <div className="kitchen-section">
        <h3>Kitchen Information</h3>
        <p><strong>Kitchen Name:</strong> {Kitchen.kitchenName}</p>
        <p><strong>Email:</strong> {Kitchen.email}</p>
        <p><strong>Mobile:</strong> {Kitchen.mobile}</p>
        <p><strong>Address:</strong> {Kitchen.address.flatNumber}, {Kitchen.address.street}, {Kitchen.address.landmark}</p>
      </div>

      <div className="tiffin-section">
        <h3>Tiffin Information</h3>
        <p><strong>Tiffin Name:</strong> {Tiffin.name}</p>
        <p><strong>Food Type:</strong> {Tiffin.foodType}</p>
        <p><strong>Tiffin Type:</strong> {Tiffin.tiffinType}</p>
        <p><strong>Time:</strong> {Tiffin.time}</p>
        <p><strong>Delivery Time:</strong> {Tiffin.deliveryDetails.deliveryTime}</p>
      </div>
      
     

    </div>



  );
};

export default OrderDetailsComponent;
