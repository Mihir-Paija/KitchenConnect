import axios from "axios";
import {API_BASE_URL} from "@env";

export const getOrders = async(id) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/order/${id}`)
        return response.data
    } catch (error) {
        console.log('Error in Get Order API', error)
        throw error.response.data;
    }
}
