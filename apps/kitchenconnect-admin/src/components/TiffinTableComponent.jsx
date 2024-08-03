/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import TiffinRowComponent from "./TiffinRowComponent";
import "../styles/TiffinTableComponent.css";

const TiffinTableComponent = ({ tiffinData }) => {
  return (
    <table className="tiffin-table">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Description</th>
          <th>FoodType</th>
          <th>TiffinType</th>
          <th>Price</th>
          <th>TakeAway Time</th>
          <th>Delivery Charge</th>
          <th>Delivery Time</th>
          {/* <th>PackingCharge</th> */}
          <th>rating</th>
          <th>review</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th>PriceDetails</th>
        </tr>
      </thead>
      <tbody>
        {tiffinData.map((tiffin) => (
          <TiffinRowComponent key={tiffin._id} tiffin={tiffin} />
        ))}
      </tbody>
    </table>
  );
};

export default TiffinTableComponent;
