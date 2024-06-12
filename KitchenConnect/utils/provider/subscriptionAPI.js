import axios from "axios";
import {API_BASE_URL} from "@env";

export const getSubscriptions = async(id, tiffinID) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/subscription/${id}/${tiffinID}`)
        return response.data

    } catch (error) {
        console.log('Error in Get Subscription API', error)
        throw error.response.data;
    }
}

export const addSubscription = async(id, tiffinID, bodyData) =>{
    try {
        console.log(bodyData)
        const response = await axios.post(`${API_BASE_URL}/provider/subscription/${id}/${tiffinID}`, bodyData)
        return response.data

    } catch (error) {
        console.log('Error in Add Subscription API', error)
        throw error.response.data;
    }
}

export const editSub = async(id, tiffinID, bodyData) =>{
    try {
        console.log(bodyData)
        const response = await axios.patch(`${API_BASE_URL}/provider/subscription/${id}/${tiffinID}`, bodyData)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log('Error in Add Subscription API', error)
        throw error.response.data;
    }
}

export const deleteSubscription = async(id, tiffinID, bodyData) =>{
    try {
        console.log("Deleting")
        const response = await axios.patch(`${API_BASE_URL}/provider/subscription/${id}/${tiffinID}/delete`, bodyData)
        return response.data
    } catch (error) {
        console.log('Error in Delete Subscription API', error)
        throw error.response.data;
    }
}