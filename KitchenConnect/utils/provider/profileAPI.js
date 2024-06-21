import axios from "axios";
import {API_BASE_URL} from "@env";

export const editPersonalDetails = async(id, bodyData) =>{
    try {
        const response = await axios.patch(`${API_BASE_URL}/provider/profile/${id}/personal`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Edit Profile API', error)
        throw error.response.data;
    }
}

export const editKitchenDetails = async(id, bodyData) =>{
    try {
        const response = await axios.patch(`${API_BASE_URL}/provider/profile/${id}/kitchen`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Edit Profile API', error)
        throw error.response.data;
    }
}

export const changeStatus = async(id, bodyData) =>{
    try {
        const response = await axios.patch(`${API_BASE_URL}/provider/profile/${id}/status`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Change Status API', error)
        throw error.response.data;
    }
}


export const deleteProvider = async(id) =>{
    try {
        const response = await axios.delete(`${API_BASE_URL}/provider/profile/${id}`)
        return response
    } catch (error) {
        console.log('Error in Delete Provider API', error)
        throw error.response.data;
    }
}
