import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//axios.defaults.withCredentials = true;

export const fetchCustomerDetails = async (authState, bodyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/customer/${authState}/details`, bodyData);
    console.log(response.data)
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

