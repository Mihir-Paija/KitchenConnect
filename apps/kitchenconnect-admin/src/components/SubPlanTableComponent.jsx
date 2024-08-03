/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "../styles/TiffinTableComponent.css";
import SubPlanRowComponent from './SubPlanRowComponent';
const SubPlanTableComponent = ({subPlanData}) => {
  return (
    <table className="tiffin-table">
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Description</th>
          <th>days</th>
          <th>Price</th>
          <th>discount</th>
          <th>Delivery Charge</th>
          <th>activated?</th>
          <th>PriceDetails</th>
        </tr>
      </thead>
      <tbody>
        {subPlanData.map((subPlan) => (
          <SubPlanRowComponent key={subPlan._id} subPlan={subPlan} />
        ))}
      </tbody>
    </table>
  )
}

export default SubPlanTableComponent