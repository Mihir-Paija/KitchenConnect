/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import SubscriptionCard from '../components/subscriptionCard'
import IDSearchComponent from '../components/IDSearchComponent';
import SubOrderCard from '../components/subOrderCard';
import { fetchSubscriptionDetails, fetchSubOrders } from '../services/subscriptionServices';
import { useAuth } from '../contexts/AuthContext'

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

  const { authState } = useAuth()
  const [details, setDetails] = useState()
  const [subOrders, setSubOrders] = useState([])

  //functions
  const submitHandler = async (data) => {
    try {
      const bodyData = {
        subID: data.id,
      };
      const response = await fetchSubscriptionDetails(authState, bodyData)
      if (response && response.status === 200) {
        setDetails(response.data);

      }

      const orders = await fetchSubOrders(authState, bodyData)
      if (orders && orders.status === 200)
        setSubOrders(orders.data)

    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
      <NavbarComponent />
      {authState ?
        <>
          <IDSearchComponent submitHandler={submitHandler} title={"Subscription"} />
          {details ?
            <>
              <SubscriptionCard details={details} />
              {subOrders.length ?
                <div>
                  <SubOrderCard
                    orderDate={<strong>Order Date</strong>}
                    status={<strong>Status</strong>}
                    amount={<strong>Amount</strong>} />
                  {subOrders.map((item, index) => (
                    <SubOrderCard
                      orderDate={item.orderDate}
                      status={item.status}
                      amount={item.amountPaid} />
                  ))}
                </div>
                :
                <>
                </>
              }
            </>
            :
            <></>
          }
        </>
        :
        <div>Please Login</div>
      }

    </>
  )
}

// Customer.propTypes = {}

export default Subscription