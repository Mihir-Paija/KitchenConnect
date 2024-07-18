/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import { fetchCustomerDetails } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const Customer = () => {
  const [customerData,setCustomerData] = useState([]);
  const {authState} = useAuth();
  // console.log(authState);
  //functions
  const submitHandler = async (data) => {
    try {
      const bodyData = {
        email : data.email,
      };
      // console.log(bodyData);
      const response = await fetchCustomerDetails(authState,data.email);
      // console.log(response);
      setCustomerData([response.data]);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
    <NavbarComponent />
    <EmailSearchComponent submitHandler={submitHandler} title={"Customer"}/>
    {customerData.length>0 && <UserCardComponent userData={customerData[0]}/>}
    
    </>
  )
}

// Customer.propTypes = {}

export default Customer