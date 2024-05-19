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
      `${API_BASE_URL}KitchenConnect/api/customer/login/`,
      bodyData
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error.response.data;
  }
};
