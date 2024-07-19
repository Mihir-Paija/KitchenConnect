/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";

const TiffinRowComponent = ({ tiffin }) => {
  return (
    <tr key={tiffin._id}>
      <td>
        <Link to={`/tiffin/${tiffin._id}`}>{tiffin._id}</Link>
      </td>
      <td>{tiffin.name}</td>
      <td>{tiffin.shortDescription}</td>
      <td>{tiffin.foodType}</td>
      <td>{tiffin.tiffinType}</td>
      <td>{tiffin.price}</td>
      <td>{tiffin.time}</td>
      <td>
        {tiffin.deliveryDetails.availability
          ? tiffin.deliveryDetails.deliveryCharge
          : "xx"}
      </td>
      <td>
        {tiffin.deliveryDetails.availability
          ? tiffin.deliveryDetails.deliveryTime
          : "xx"}
      </td>
      <td>
        {tiffin.deliveryDetails.providePacking
          ? tiffin.deliveryDetails.packingCharge
          : "xx"}
      </td>
      <td>{tiffin.rating}</td>
      <td>{tiffin.ratingsize}</td>
      <td>
        {formatDate(tiffin.createdAt)} at {formatTime(tiffin.createdAt)}
      </td>
      <td>
        {formatDate(tiffin.updatedAt)} at {formatTime(tiffin.updatedAt)}
      </td>
    </tr>
  );
};

export default TiffinRowComponent;
