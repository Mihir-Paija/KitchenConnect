import axios from "axios";
import {API_BASE_URL} from "@env";

export const withdrawMoney = async(id, walletID, bodyData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/wallet/${id}/${walletID}/withdraw`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Withdraw Money', error)
        throw error.response.data;
    }
}