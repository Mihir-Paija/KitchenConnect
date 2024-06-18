import {io} from 'socket.io-client'
import {SOCKET_URL} from "@env";

const ENDPOINT = `${SOCKET_URL}`

export const connectSocket = async(userID, type) =>{
    const newSocket = io(ENDPOINT)
    console.log(newSocket)

    if(type == 'provider'){
    newSocket.on('connect', () => {
      newSocket.emit('register-provider', { userID });
      console.log('Registered with', newSocket.id);
    });
}
    return newSocket;
}