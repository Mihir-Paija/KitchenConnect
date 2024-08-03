import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCustomerCount = async(authState) =>{
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/customer/count`,
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchProviderCount = async(authState) =>{
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/kitchen/count`,
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchCustomerDetails = async (authState, email) => {
  // console.log(email);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/customer/details/${email}`
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchProviderDetails = async (authState, email) => {
  //bodyData
  /*
  {
    "email" : 
  }
  */
  // console.log("email", email);
  try {
    console.log(API_BASE_URL);
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/kitchen/details/${email}`
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
