import axios from "axios";
import {API_BASE_URL} from "@env";

export const addMenu = async(id, tiffinID, menu) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/menu/${id}/${tiffinID}`, menu)
        return response
    } catch (error) {
        console.log('Error in Add Menu API', error)
        throw error.response.data;
    }
}