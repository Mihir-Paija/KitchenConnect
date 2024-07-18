/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import SubscriptionCardComponent from '../components/subscriptionCard'

const Subscription = () => {

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
    <EmailSearchComponent submitHandler={submitHandler} title={"Subscription"}/>
    <SubscriptionCardComponent />
    </>
  )
}

// Customer.propTypes = {}

export default Subscription