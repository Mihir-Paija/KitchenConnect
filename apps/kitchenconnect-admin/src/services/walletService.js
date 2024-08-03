import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAdminTransactions = async(authState) =>{
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/${authState}/wallet/transactions`,
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
