import axios from "axios";
import {API_BASE_URL} from "@env";

export const fetchHistory = async(id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/history/${id}/get`)
        return response
    } catch (error) {
        console.log('Error in Fetch History API', error)
        throw error.response.data;
    } 
}