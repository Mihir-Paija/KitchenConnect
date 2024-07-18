import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTiffinList = async (authState, providerID) => {
  console.log(providerID);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/tiffin/list/${providerID}`
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
