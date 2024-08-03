/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import MenuRowComponent from './MenuRowComponent'
import '../styles/MenuTableComponent.css';

const MenuTableComponent = ({menuData}) => {
  return (
    <table className="menu-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {menuData.map((dayData) => (
          <MenuRowComponent key={dayData._id} dayData={dayData} />
        ))}
      </tbody>
    </table>
  )
}

export default MenuTableComponent