import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//axios.defaults.withCredentials = true;

export const fetchSubscriptionDetails = async (authState, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/subscription/${authState}/details`,
      bodyData
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchSubOrders = async (authState, bodyData) => {
  try {
    console.log("subOrders");
    const response = await axios.post(
      `${API_BASE_URL}/admin/subscription/${authState}/suborders`,
      bodyData
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const changeSubPlanPrice = async (session, subscriptionID, bodyData) => {
  console.log(subscriptionID);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/${session}/subPlan/priceChange/${subscriptionID}`,
      bodyData
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
