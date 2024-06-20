import axios from "axios";
import {API_BASE_URL} from "@env";

export const getMenu = async(id, tiffinID) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/provider/menu/${id}/${tiffinID}`)
        return response.data
    } catch (error) {
        console.log('Error in Get Menu API', error)
        throw error.response.data;
    }
}
export const addMenu = async(id, tiffinID, menu) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/provider/menu/${id}/${tiffinID}`, menu)
        return response
    } catch (error) {
        console.log('Error in Add Menu API', error)
        throw error.response.data;
    }
}

export const editMenuDetails = async(id, tiffinID, menuID, bodyData) =>{
    try {
        console.log(bodyData)
        const response = await axios.patch(`${API_BASE_URL}/provider/menu/${id}/${tiffinID}/${menuID}`, bodyData)
        return response
    } catch (error) {
        console.log('Error in Edit Menu API', error)
        throw error.response.data;
    }
}

