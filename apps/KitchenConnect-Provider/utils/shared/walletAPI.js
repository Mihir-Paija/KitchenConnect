import axios from "axios";
import { API_BASE_URL } from "@env";

export const getWallet = async(id) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/wallet/${id}/get`)
        return response
    } catch (error) {
        console.log('Error in Get Wallet API', error)
        throw error.response.data;
    }
}

export const createWallet = async(id, bodyData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/wallet/${id}/create`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Create Wallet API', error)
        throw error.response.data;
    }
}

