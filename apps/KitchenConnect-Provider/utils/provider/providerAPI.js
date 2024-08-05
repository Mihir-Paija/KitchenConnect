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

export const logoutProvider = async() =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/provider/logout`);
    return response
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


export const getProfile = async(authToken) =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/provider/${authToken}`);
    return response.data
    
  } catch (error) {
    console.error('Error In Getting Profile:', error);
    throw error.response.data;
  }
}

export const getLunchTiffins = async(authToken) =>{
  try {
    console.log(API_BASE_URL)
    const response = await axios.get(`${API_BASE_URL}/provider/tiffin/${authToken}/lunch`);
    return response.data
  } catch (error) {
    console.error('Error In Getting Tiffins:', error);
    throw error.response.data;
  }
}

export const getDinnerTiffins = async(authToken) =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/provider/tiffin/${authToken}/dinner`);
    return response.data
  } catch (error) {
    console.error('Error In Getting Tiffins:', error);
    throw error.response.data;
  }
}

export const setFCMToken = async(authToken, bodyData) =>{
  try {
    const response = await axios.post(`${API_BASE_URL}/provider/${authToken}/setFCMToken`, bodyData);
    return response.data
  } catch (error) {
    console.error('Error In Setting Token:', error);
    throw error.response.data;
  }  
}

export const isExpired = async(authToken) =>{
  try {
    console.log(API_BASE_URL)
    const response = await axios.get(`${API_BASE_URL}/provider/${authToken}/expired`);
    return response
  } catch (error) {
    console.error('Error In Checking Token:', error);
    throw error.response.data;
  }
}
