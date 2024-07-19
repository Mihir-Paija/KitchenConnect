/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import NavbarComponent from '../components/NavbarComponent'
import EmailSearchComponent from '../components/EmailSearchComponent'
import UserCardComponent from '../components/userCardComponent'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Provider = () => {

  const {authState} = useAuth()
  const navigate = useNavigate()

  useEffect(() =>{
    if(authState === null)
      navigate('/login')
  }, [authState])

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
    <UserCardComponent />
    </>
  )
}

export default Provider