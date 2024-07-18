/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from '../styles/UserCardComponenet.module.css';

// const dummy_data = {
//     firstName : "xyz",
//     lastName : "xyz",
//     email : "xyz@gmail.com",
//     phoneno : "789456123",
//     city : "abc"
// }

const UserCardComponent = ({userData}) => {
    // const { firstName, lastName, email, phoneno, city } = dummy_data;
    // console.log("userData",userData);
  return (
    <div className="card">
    <h2 className="title">{userData.name}{" "}lastName</h2>
    {/* <div className="field"><strong>First Name:</strong> {userData.name}</div>
    <div className="field"><strong>Last Name:</strong> lastName</div> */}
    <div className="field"><strong>Email:</strong> {userData.email}</div>
    <div className="field"><strong>Phone Number:</strong> {userData.mobile}</div>
    <div className="field"><strong>City:</strong> {userData.city}</div>
  </div>
  )
}

 

export default UserCardComponent;