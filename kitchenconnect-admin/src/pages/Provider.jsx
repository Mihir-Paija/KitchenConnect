/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import EmailSearchComponent from '../components/EmailSearchComponent'
import UserCardComponent from '../components/userCardComponent'
import { useAuth } from '../contexts/AuthContext';
import { fetchProviderDetails } from '../services/userService'

const Provider = () => {
  const [providerData,setProviderData] = useState([]);
  const {authState} = useAuth();
  //functions
  const submitHandler = async (data) => {
    try {
      const bodyData = {
        email : data.email,
      };
      // console.log(bodyData);
      const response = await fetchProviderDetails(authState,data.email);
      // console.log(response.data);
      setProviderData([response.data]);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
    <NavbarComponent />
    <EmailSearchComponent submitHandler={submitHandler} title={"Provider"}/>
    {providerData.length>0 && <UserCardComponent userData={providerData[0]}/>}

    </>
  )
}

export default Provider