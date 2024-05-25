import axios from "axios";
import {API_BASE_URL} from "@env";

export const addTiffin = async(authToken, bodyData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/tiffin/${authToken}`, bodyData)
        return response
    } catch (error) {
        console.log("Error In Adding Tiffin", error)
        
    }
}