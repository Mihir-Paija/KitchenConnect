/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container'; 
import EmailSearchComponent from '../components/EmailSearchComponent';
import UserCardComponent from '../components/userCardComponent'
import { fetchCustomerDetails } from '../services/customerService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Customer = () => {

  const [details, setDetails] = useState([]);
  const {authState} = useAuth()
  const navigate = useNavigate()

  useEffect(() =>{
    if(authState === null)
      navigate('/login')
  }, [authState])

  //functions
  const submitHandler = async(data) => {
    try {
      const bodyData = {
        email: data.email,
      };
      console.log(authState)
      const response = await fetchCustomerDetails(authState, bodyData)
      if(response && response.status === 200){
        setDetails(response.data);
      }else{
        alert("search failed. Please try again.");
      }
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
    <NavbarComponent />
    <EmailSearchComponent submitHandler={submitHandler} title={"Customer"}/>
    <UserCardComponent />
    </>
  )
}

// Customer.propTypes = {}

export default Customer