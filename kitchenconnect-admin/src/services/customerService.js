import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//axios.defaults.withCredentials = true;

export const fetchCustomerDetails = async (authState, bodyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/customer/${authState}/details`,
      bodyData
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchCustomerOrderList = async (authState, customerEmail) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/customer/orders/list/${customerEmail}`
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchCustomerOrderDetails = async (authState, orderID) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/customer/orders/details/${orderID}`
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
