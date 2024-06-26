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

export const getPendingOrders = async(id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/order/${id}/pending`)
        return response.data
    } catch (error) {
        console.log('Error in Get Pending Order API', error)
        throw error.response.data;
    }
}

export const decideOrderStatus = async(id, orderID, status) =>{
    try {
        const bodyData = {
            status: status
        }
        const response = await axios.post(`${API_BASE_URL}/provider/order/${id}/${orderID}`, bodyData)
        return response.data
    } catch (error) {
        console.log('Error in Decide Order API', error)
        throw error.response.data;
    }
} 

export const optOut = async(id, bodyData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/order/${id}/out`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Opt Out API', error)
        throw error.response.data;
    }
}

export const sendOTP = async(id, bodyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/order/${id}/otp`, bodyData)
        return response
    } catch (error) {
        console.log('Error in OTP API', error)
        throw error.response.data;
    }
}