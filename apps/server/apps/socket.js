import { Server } from 'socket.io';
import {io, providers} from './server.js'
import { verifyJwt } from "./utils/jwt.js";

export const notifyProvider = async(providerID, message) =>{
    console.log(providerID)
    const socketID = providers[providerID]
    console.log(socketID)

    if(socketID)
        io.to(socketID).emit('notification', message);

    else{
        console.log('Provider Not Connected')
    }
}