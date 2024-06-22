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
    throw error.response.data;
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
    const response = await axios.get(`${API_BASE_URL}/customer/kitchen`);
    return response;
  } catch (error) {
    console.error("Error getKitchen Customer API:", error);
    throw error.response.data;
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
