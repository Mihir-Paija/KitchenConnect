import axios from "axios";
import { API_BASE_URL } from "@env";

export const getKitchenFeedBackCustomer = async (kitchenID) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customer/feedBack/${kitchenID}`
      );
      return response;
    } catch (error) {
      console.log("Error in get feedback customer API", error.message);
      throw error.response.data;
    }
  };
  
  export const getTiffinFeedBackCustomer = async (kitchenID, tiffinID) => {
    try {
      console.log(kitchenID);
      const response = await axios.get(
        `${API_BASE_URL}/customer/feedBack/${kitchenID}/${tiffinID}`
      );
      return response;
    } catch (error) {
      console.log("Error in get feedback customer API", error.message);
      throw error.response.data;
    }
  };