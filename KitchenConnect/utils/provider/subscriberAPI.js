import axios from "axios";
import {API_BASE_URL} from "@env";

export const getSubscribers = async(id) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/subscriber/${id}`)
        return response.data
    } catch (error) {
        console.log('Error in Get Subscriber API', error)
        throw error.response.data;
    }
}

export const decideStatus = async(id, subID, bodyData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/subscriber/${id}/${subID}`, bodyData)
        return response.data
    } catch (error) {
        console.log('Error in Decide Status API', error)
        throw error.response.data;
    }
}