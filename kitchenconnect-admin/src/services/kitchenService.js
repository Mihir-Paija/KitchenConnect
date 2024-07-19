import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMenuList = async (authState, tiffinID) => {
  console.log(tiffinID);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/tiffin/menu/${tiffinID}`
    );
    // console.log("response.data :", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchSubPlanList = async (authState, tiffinID) => {
  console.log(tiffinID);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/tiffin/subPlan/${tiffinID}`
    );
    // console.log("response.data :", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
