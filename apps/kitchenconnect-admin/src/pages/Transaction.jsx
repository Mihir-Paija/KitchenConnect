/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
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
import styles from '../styles/transactionPage.module.css'
import LoadingComponent from '../components/loadingComponent';
import { useNavigate } from 'react-router-dom';
import PriceComponent from '../components/priceComponent';
import PaymentBreakdownComponent from '../components/paymentBreakdownComponent';
import TransactionCard from '../components/transactionCard';
import { fetchAdminTransactions } from '../services/walletService';


const Transactions = () => {

  const { authState } = useAuth()
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  
  const getTransactions = async() =>{
    try {
    setLoading(true);
    const response = await fetchAdminTransactions(authState.authToken)
    if(response && response.status === 200)
        setDetails(response.data);
    
    else alert("Failed to fetch transactions")
    } catch (error) {
        console.log('Error in fetching transactions ', error);
        alert("Failed to fetch transactions");
    }finally{
        setLoading(false);
    }
  }
  
  useEffect(() =>{
    getTransactions();
  },[])

  return (
    <>
      <NavbarComponent />
      {authState.authToken ?
        <>
          {loading ? 
        <LoadingComponent />
      :
      <>
          {details.length ?
          <>
            <div class = {styles.page}>
                <div class = {styles.subOrders}>
                  <TransactionCard
                    orderDate={<strong>Transaction Date</strong>}
                    type={<strong>Type</strong>}
                    amount={<strong>Amount</strong>} />
                  {details.map((item, index) => (
                    <TransactionCard
                      orderDate={item.createdAt}
                      type={item.transactionType}
                      amount={item.amount} />
                  ))}
                </div> 
            </div>
            </>
              : <>
              <div className={styles.emptyPage}>No Transactions</div>
              </>}
             </>
             
        }
        </>
        :
        <div className={styles.emptyPage}>Please Login</div>
      }

    </>
  )
}

// Customer.propTypes = {}

export default Transactions