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
    const response = await axios.get(`${API_BASE_URL}/customer/kitchen`, {
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.log("Error response:", error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error message:", error.message);
    }
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

// customer -> skipSubOrder : POST
export const skipSubOrder = async (subscriptionID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/subscriptionOrders/skip/${subscriptionID}`,
      bodyData
    );
    return response;
  } catch (error) {
    console.error("Error skipSubOrder Customer API:", error);
    console.error("Error skipSubOrder Customer API:", error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const cancelSubscription = async (subscriptionID) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/customer/subscriptionDetail/cancel/${subscriptionID}`
    );
    return response;
  } catch (error) {
    console.error("Error cancelSubscription Customer API:", error);
    console.error("Error cancelSubscription Customer API:", error.message);
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

export const getWalletCustomer = async (customerID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/wallet/${customerID}`
    );
    return response;
  } catch (error) {
    console.log("Error in Get Wallet customer API", error.message);
    throw error.response.data;
  }
};

export const createWalletCustomer = async (customerID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/wallet/${customerID}`,
      bodyData
    );
    return response;
  } catch (error) {
    console.log("Error in Create Wallet customer API", error.message);
    throw error.response.data;
  }
};

export const addMoneyWalletCustomer = async (walletID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/wallet/add/${walletID}`,
      bodyData
    );
    return response;
  } catch (error) {
    console.log("Error in add money Wallet customer API", error.message);
    throw error.response.data;
  }
};

export const withdrawMoneyWalletCustomer = async (walletID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/wallet/withdraw/${walletID}`,
      bodyData
    );
    return response;
  } catch (error) {
    console.log("Error in withdraw money Wallet customer API", error.message);
    throw error.response.data;
  }
};

export const getTransactionHistoryCustomer = async (walletID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/wallet/transactionHistory/${walletID}`
    );
    return response;
  } catch (error) {
    console.log("Error in Get TransactionHistory customer API", error.message);
    throw error.response.data;
  }
};

export const postFeedBackCustomer = async (
  customerID,
  kitchenID,
  tiffinID,
  bodyData
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/feedBack/${customerID}/${kitchenID}/${tiffinID}`,
      bodyData
    );
    return response;
  } catch (error) {
    console.log("Error in post feedback customer API", error.message);
    throw error.response.data;
  }
};

export const getKitchenFeedBackCustomer = async (kitchenID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/feedBack/${kitchenID}`
    );
    return response;
  } catch (error) {
    console.log("Error in get feedback customer API", error.message);
    throw error.response.data;
  }
};

export const getTiffinFeedBackCustomer = async (kitchenID, tiffinID) => {
  try {
    console.log(kitchenID);
    const response = await axios.get(
      `${API_BASE_URL}/customer/feedBack/${kitchenID}/${tiffinID}`
    );
    return response;
  } catch (error) {
    console.log("Error in get feedback customer API", error.message);
    throw error.response.data;
  }
};

// customer -> pushToken : POST
export const pushTokenCustomer = async (customerID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/pushToken/${customerID}`,
      bodyData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// customer -> addAddressCustomer : POST
export const addAddressCustomer = async (customerID, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/address/${customerID}`,
      bodyData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// customer -> fetchCustomerProfile : GET
export const fetchCustomerProfile = async (customerID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customer/profile/details/${customerID}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
