/* eslint-disable no-unused-vars */
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTiffinList = async (session, providerID) => {
  console.log(providerID);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${session}/tiffin/list/${providerID}`
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const changeTiffinPrice = async (session, tiffinId, bodyData) => {
  console.log(tiffinId);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/${session}/tiffin/priceChange/${tiffinId}`,
      bodyData
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
