/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/UserCardComponenet.css';

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
    <div className="card">
    <h2 className="title">User Card</h2>
    <div className="field"><strong>First Name:</strong> {firstName}</div>
    <div className="field"><strong>Last Name:</strong> {lastName}</div>
    <div className="field"><strong>Email:</strong> {email}</div>
    <div className="field"><strong>Phone Number:</strong> {phoneno}</div>
    <div className="field"><strong>City:</strong> {city}</div>
  </div>
  )
}

 

export default UserCardComponent;