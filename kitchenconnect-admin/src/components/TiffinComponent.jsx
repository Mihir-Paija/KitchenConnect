/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/TiffinComponent.css';

const TiffinComponent = ({ tiffin }) => {
  return (
    <div className="tiffin-card">
      <h3>{tiffin.name}</h3>
      <p>{tiffin.shortDescription}</p>
      <p><strong>Type: </strong>{tiffin.foodType}</p>
      <p><strong>Price:</strong> ${tiffin.price}</p>
      <p><strong>Time: </strong>{tiffin.time}</p>
      <p><strong>Delivery Charge: </strong> ${tiffin.deliveryDetails.deliveryCharge}</p>
      <p><strong>Delivery Time: </strong>{tiffin.deliveryDetails.deliveryTime}</p>
    </div>
  )
}

export default TiffinComponent