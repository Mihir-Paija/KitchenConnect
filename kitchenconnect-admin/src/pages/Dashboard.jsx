/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CountComponent from '../components/CountComponent';
import styles from '../styles/dashboard.module.css'
import LoadingComponent from '../components/loadingComponent';
import { fetchCustomerCount, fetchProviderCount } from '../services/userService';
const Dashboard = () => {

  const {authState} = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [customerCount, setCustomerCount] = useState(null)
  const [providerCount, setProviderCount] = useState(null)

  const getCustomerCount = async() =>{
    try {
      setLoading(true)
      const response = await fetchCustomerCount(authState.authToken)
      if(response && response.status === 200)
        setCustomerCount(response.data.count)

      else alert(`Couldn't Fetch Customer Count`);



    } catch (error) {
      console.log(error)
      alert(`Couldn't Fetch Customer Count`)

    }finally{
      setLoading(false)
    }
  }

  
  const getProviderCount = async() =>{
    try {
      setLoading(true)
      const response = await fetchProviderCount(authState.authToken)
      if(response && response.status === 200)
        setProviderCount(response.data.count)

      else alert(`Couldn't Fetch Provider Count`);



    } catch (error) {
      console.log(error)
      alert(`Couldn't Fetch Provider Count`)

    }finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    getCustomerCount()
    getProviderCount()
  }, [])
  
  return (
    <>
        <NavbarComponent title={"KitchenConnect"}/>
        {loading ?
        <LoadingComponent />
        :
        <>
        <div className={styles.count}>
          <CountComponent title={"Customers"} count={customerCount} />
          <CountComponent title={"Providers"} count={providerCount} />
        </div>
        </>
}
    </>
  )
}

export default Dashboard