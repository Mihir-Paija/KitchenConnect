/* eslint-disable no-unused-vars */
import React from 'react'
import styles from '../styles/UserCardComponenet.module.css';

const dummy_data = {
    firstName : "xyz",
    lastName : "xyz",
    email : "xyz@gmail.com",
    phoneno : "789456123",
    city : "abc"
}
const UserCardComponent = () => {
    const { firstName, lastName, email, phoneno, city } = dummy_data;
    // console.log("hi");
  return (
    <div className={styles.card}>
    <h2 className={styles.title}>User Card</h2>
    <div className={styles.field}><strong>First Name:</strong> {firstName}</div>
    <div className={styles.field}><strong>Last Name:</strong> {lastName}</div>
    <div className={styles.field}><strong>Email:</strong> {email}</div>
    <div className={styles.field}><strong>Phone Number:</strong> {phoneno}</div>
    <div className={styles.field}><strong>City:</strong> {city}</div>
  </div>
  )
}

 

export default UserCardComponent;