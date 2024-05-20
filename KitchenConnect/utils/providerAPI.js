import axios from "axios";
import {API_BASE_URL} from "@env";

export const signupProvider = async (bodyData) => {
  try {
    console.log(API_BASE_URL)
    const response = await axios.post(
      `${API_BASE_URL}/provider/signup/`,
      bodyData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginProvider = async (bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/provider/login/`,
      bodyData
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error.response.data;
  }
};
