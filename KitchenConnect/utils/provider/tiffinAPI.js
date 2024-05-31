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

export const editTiffin = async(authToken, tiffinID, bodyData) =>{
    try {
        const response = await axios.patch(`${API_BASE_URL}/provider/tiffin/${authToken}/${tiffinID}`, bodyData)
        return response
    } catch (error) {
        console.log("Error In Editing Tiffin", error)

    }
}

export const deleteTiffin = async(authToken, tiffinID) =>{
    try {
        const response = await axios.delete(`${API_BASE_URL}/provider/tiffin/${authToken}/${tiffinID}`)
        return response
    } catch (error) {
        console.log("Error In Deleting Tiffin", error)

    }
}