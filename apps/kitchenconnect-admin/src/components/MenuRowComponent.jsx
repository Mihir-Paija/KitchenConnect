/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const MenuRowComponent = ({dayData}) => {
  return (
    <>
    {dayData.items.map((item, index) => (
        <tr key={item._id}>
          {index === 0 && (
            <td rowSpan={dayData.items.length}>
              {dayData.day}
            </td>
          )}
          <td>{item.itemName}</td>
          <td>{item.quantity}</td>
          <td>{item.unit}</td>
        </tr>
      ))}
      </>
  )
}

export default MenuRowComponent