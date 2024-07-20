/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import EmailSearchComponent from "../components/EmailSearchComponent";
import { fetchCustomerOrderDetails } from "../services/customerService";
import OrderDetailsComponent from "../components/OrderDetailsComponent";
import { useParams } from "react-router-dom";

const Order = () => {
  //states
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();
  const [orderData, setOrderData] = useState(null);
    //params
    const { orderID } = useParams();
  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const bodyData = {
        orderID: data.email,
      };
      //   console.log(bodyData);
      const orderData_response = await fetchCustomerOrderDetails(
        authState,
        data.email
      );
      // console.log(orderData_response.data);
      setOrderData(orderData_response.data);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderID) submitHandler({ email: orderID });
  }, [orderID]);

  return (
    <>
      <NavbarComponent />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <EmailSearchComponent
            submitHandler={submitHandler}
            placeholder={"Order ID"}
            type={"ID"}
            inputValue={orderID ? orderID : ""}
          />
          <div>
            {orderData && (
              <OrderDetailsComponent orderData={orderData} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Order;
