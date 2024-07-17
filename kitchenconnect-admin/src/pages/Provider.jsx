/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import EmailSearchComponent from '../components/EmailSearchComponent'
const Provider = () => {

  //functions
  const submitHandler = (data) => {
    try {
      const bodyData = {
        emailProvider : data.email,
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
    <EmailSearchComponent submitHandler={submitHandler} title={"Provider"}/>
    </>
  )
}

export default Provider