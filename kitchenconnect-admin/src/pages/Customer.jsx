/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import EmailSearchComponent from "../components/EmailSearchComponent";
import UserCardComponent from "../components/userCardComponent";
import { fetchCustomerDetails } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";
import { fetchCustomerOrderList, fetchCustomerSubscriptionList } from "../services/customerService";
import OrderListTableComponent from "../components/OrderListTableComponent";
import { useParams } from "react-router-dom";
import SubscriptionListTableComponent from "../components/SubscriptionListTableComponent";

const Customer = () => {
  const { authState } = useAuth();
  // console.log(authState);  const navigate = useNavigate()

  //states
  const [customerData, setCustomerData] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [subList, setSubList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select Option");
  // const { providerEmail } = useParams();
  //functions
  const submitHandler = async (data) => {
    try {
      const bodyData = {
        email: data.email,
      };
      // console.log(bodyData);
      const customer_response = await fetchCustomerDetails(
        authState,
        data.email
      );
      const customer = customer_response.data;
      setCustomerData([customer_response.data]);
      if(selectedOption === "Orders"){
        const orderList_response = await fetchCustomerOrderList(
          authState,
          data.email
        );
        // console.log(orderList_response.data);
        setOrderList(orderList_response.data);
      }else if(selectedOption === "Subscriptions"){
        console.log(customer);
        const subList_response = await fetchCustomerSubscriptionList(
          authState,
          customer._id
        );
        // console.log(subList_response.data);
        setSubList(subList_response.data);
      }
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
      <NavbarComponent />
      <EmailSearchComponent
        submitHandler={submitHandler}
        placeholder={"Customer Email"}
        options={["Orders", "Subscriptions"]}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
      {customerData.length > 0 && (
        <UserCardComponent userData={customerData[0]} />
      )}
      {orderList.length > 0 && (
        <OrderListTableComponent orderList={orderList} />
      )}
      {subList.length > 0 && (
        <SubscriptionListTableComponent subList={subList} />
      )}
    </>
  );
};

// Customer.propTypes = {}

export default Customer;
