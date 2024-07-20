/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import { fetchCustomerDetails } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchCustomerOrderList } from '../services/customerService';
import OrderListTableComponent from '../components/OrderListTableComponent';


const Customer = () => {
  const {authState} = useAuth();
  // console.log(authState);  const navigate = useNavigate()
  //states
  const [customerData,setCustomerData] = useState([]);
  const [orderList, setOrderList] = useState([]);
  //functions
  const submitHandler = async (data) => {
    try {
      const bodyData = {
        email : data.email,
      };
      // console.log(bodyData);
      const customer_response = await fetchCustomerDetails(authState,data.email);
      // console.log(response);
      setCustomerData([customer_response.data]);
      const orderList_response = await fetchCustomerOrderList(
        authState,
        data.email
      );
      console.log(orderList_response.data);
      setOrderList(orderList_response.data);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
    <NavbarComponent />
    <EmailSearchComponent submitHandler={submitHandler} placeholder={"Customer Email"}/>
    {customerData.length>0 && <UserCardComponent userData={customerData[0]}/>}
    {orderList.length>0 && <OrderListTableComponent orderList={orderList}/>}
    </>
  )
}

// Customer.propTypes = {}

export default Customer