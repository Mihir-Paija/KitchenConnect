import axios from "axios";
import { API_BASE_URL } from "@env";

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

export const logoutCustomer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/logout`);
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response.data;
  }
};

export const getKitchenCustomer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/kitchen`);
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response.data;
  }
};
