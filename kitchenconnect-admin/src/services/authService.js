import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (bodyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login/`, bodyData);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

