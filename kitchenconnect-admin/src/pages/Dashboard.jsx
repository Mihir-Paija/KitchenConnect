/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

  const {authState} = useAuth()
  const navigate = useNavigate()
  useEffect(() =>{
    if(authState === null)
      navigate('/login')
  }, [authState])

  return (
    <>
        <NavbarComponent title={"KitchenConnect"}/>
    </>
  )
}

export default Dashboard