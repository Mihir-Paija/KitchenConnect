/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { formatDate, formatTime } from "../../../server/apps/utils/formatDate";
import { Link } from "react-router-dom";
const SubPlanRowComponent = ({subPlan}) => {
    return (
        <tr key={subPlan._id}>
          <td>
          {subPlan._id}
            {/* <Link to={`/tiffin/${subPlan._id}`}>{subPlan._id}</Link> */}
          </td>
          <td>{subPlan.title}</td>
          <td>{subPlan.description}</td>
          <td>{subPlan.days}</td>
          <td>{subPlan.price}</td>
          <td>{subPlan.discount}</td>
          <td>{subPlan.deliveryCharge}</td>
          <td>{subPlan.activated ? "activated" : "deactivated"}</td>
          {/* <td>
            {formatDate(subPlan.createdAt)} at {formatTime(subPlan.createdAt)}
          </td>
          <td>
            {formatDate(subPlan.updatedAt)} at {formatTime(subPlan.updatedAt)}
          </td> */}
        </tr>
      );
}

export default SubPlanRowComponent