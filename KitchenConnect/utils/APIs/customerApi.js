import axios from "axios";
import { API_BASE_URL } from "@env";

// customer -> SignUP : POST
export const signupCustomer = async (bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/signup/`,
      bodyData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// customer -> Login : POST
export const loginCustomer = async (bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/login/`,
      bodyData
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> LogOut : GET
export const logoutCustomer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/logout`);
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response.data;
  }
};

// customer -> getKitchen : GET
export const getKitchenCustomer = async () => {
  try {
    // console.log(API_BASE_URL);
    const response = await axios.get(`${API_BASE_URL}/customer/kitchen`);
    return response;
  } catch (error) {
    console.error("Error getKitchen Customer API:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> getTiffin : GET
export const getTiffinCustomer = async (kitchenId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/tiffin/${kitchenId}`
    );
    return response;
  } catch (error) {
    console.error("Error getTiffin Customer API:", error);
    throw error.response.data;
  }
};

// customer -> getMenu : GET
export const getMenuCustomer = async (kitchenID, tiffinID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/menu/${kitchenID}/${tiffinID}`
    );
    return response;
  } catch (error) {
    console.error("Error getMenu Customer API:", error);
    throw error.response.data;
  }
};

// customer -> getSubscriptionPlanCustomer : GET
export const getSubscriptionPlanCustomer = async (kitchenID, tiffinID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/subscriptionPlans/${kitchenID}/${tiffinID}`
    );
    return response;
  } catch (error) {
    console.error("Error getSubscriptionPlan Customer API:", error);
    throw error.response.data;
  }
};

// customer -> subscribeCustomer : POST
export const subscribeCustomer = async (
  customerID,
  kitchenID,
  tiffinID,
  subscriptionID,
  bodyData
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/subscription/${customerID}/${kitchenID}/${tiffinID}/${subscriptionID}`,
      bodyData
    );
    return response.data;
  } catch (error) {
    console.error("Error subscribeCustomer POST Customer API:", error);
    console.error("Error subscribeCustomer POST Customer API:", error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> getSubscriptionDetails : GET
export const getSubscriptionDetailsCustomer = async (subscriptionID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/subscriptionDetail/${subscriptionID}`
    );
    return response;
  } catch (error) {
    console.error("Error getSubscriptionDetailsCustomer Customer API:", error);
    throw error.response.data;
  }
};

// customer -> getSubscriptionsList : GET
export const getSubscriptionsList = async (customerID) => {
  try {
    // console.log("got it");
    const response = await axios.get(
      `${API_BASE_URL}/customer/subscription/${customerID}`
    );
    return response;
  } catch (error) {
    console.error("Error getSubscriptionsList Customer API:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> SubOrderList : GET
export const getSubscriptionOrderList = async (subscriptionID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/subscriptionOrders/${subscriptionID}`
    );
    return response;
  } catch (error) {
    console.error("Error getSubscriptionOrderList Customer API:", error);
    console.error(
      "Error getSubscriptionOrderList Customer API:",
      error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> placeOrder : POST
export const placeOrder = async (customerID, kitchenID, tiffinID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/order/${customerID}/${kitchenID}/${tiffinID}/`,
      bodyData
    );
    return response.data;
  } catch (error) {
    console.error("Error placeOrder POST Customer API:", error);
    console.error("Error placeOrder POST Customer API:", error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> OrderList : GET
export const getOrderList = async (customerID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/order/${customerID}`
    );
    return response;
  } catch (error) {
    console.error("Error getOrderList Customer API:", error);
    console.error("Error getOrderList Customer API:", error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> orderDetails : GET
export const getOrderDetails = async (orderID) => {
  try {
    // console.log("got it");

    const response = await axios.get(
      `${API_BASE_URL}/customer/orderDetails/${orderID}`
    );
    return response;
  } catch (error) {
    console.error("Error getOrderDetails Customer API:", error);
    console.error("Error getOrderDetails Customer API:", error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// customer -> updateProfileCustomer : PATCH
export const updateProfileCustomer = async (customerID, bodyData) => {
  try {
    // console.log("got it");
    const response = await axios.patch(
      `${API_BASE_URL}/customer/profile/details/${customerID}`,
      bodyData
    );
    return response.data;
  } catch (error) {
    console.error("Error updateProfileCustomer PATCH Customer API:", error);
    console.error(
      "Error updateProfileCustomer PATCH Customer API:",
      error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};
