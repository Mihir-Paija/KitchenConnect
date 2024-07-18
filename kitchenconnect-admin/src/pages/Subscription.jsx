/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import SubscriptionCardComponent from '../components/subscriptionCard'
import IDSearchComponent from '../components/IDSearchComponent';
import SubOrderCard from '../components/subOrderCard';

// src/data.js
const dummyData = [
  {
    orderDate: '2024-07-01',
    status: 'Completed',
    amount: '$100.00',
  },
  {
    orderDate: '2024-07-02',
    status: 'Pending',
    amount: '$200.00',
  },
  {
    orderDate: '2024-07-03',
    status: 'Cancelled',
    amount: '$0.00',
  },
];


const Subscription = () => {

  const [subOrders, setSubOrders] = useState(dummyData)

  //functions
  console.log(`subscription`)
  const submitHandler = (data) => {
    try {
      const bodyData = {
        emailCustomer : data.email,
      };
      console.log(bodyData);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
    <NavbarComponent />
    <IDSearchComponent submitHandler={submitHandler} title={"Subscription"}/>
    <SubscriptionCardComponent />
    
    <div>
    <SubOrderCard 
    orderDate={<strong>Order Date</strong>}
    status={<strong>Status</strong>}
    amount={<strong>Amount</strong>} />
      {subOrders.map((item, index) =>(
        <SubOrderCard
        orderDate = {item.orderDate}
        status = {item.status}
        amount = {item.amount}/>
      ))}
    </div>
    
    </>
  )
}

// Customer.propTypes = {}

export default Subscription