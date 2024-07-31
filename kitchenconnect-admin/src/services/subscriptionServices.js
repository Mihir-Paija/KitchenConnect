import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//axios.defaults.withCredentials = true;

export const fetchSubscriptionDetails = async (authState, bodyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/${authState}/subscription/details`, bodyData);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchSubOrders = async(authState, bodyData) =>{
    try {
        console.log('subOrders')
        const response = await axios.post(`${API_BASE_URL}/admin/${authState}/subscription/suborders`, bodyData);
        return response;
      } catch (error) {
        // console.log(error);
        throw error.response ? error.response.data : error.message;
      }
}

