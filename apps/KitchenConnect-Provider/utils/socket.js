import {io} from 'socket.io-client'
import {SOCKET_URL} from '@env';

const ENDPOINT = `${SOCKET_URL}`


export const connectSocket = async(userID) =>{
    const newSocket = io(ENDPOINT,{
      autoConnect: false,
      reconnection: true, // Enable reconnections
      reconnectionAttempts: 10, // Try to reconnect up to 10 times
      reconnectionDelay: 10000, // Start with a 2 seconds delay
      reconnectionDelayMax: 20000, // Maximum delay between reconnections is 10 seconds
      timeout: 30000, // Connection timeout of 30 seconds
    })
    console.log(ENDPOINT)
    console.log(newSocket)


    newSocket.on('connect', () => {
      newSocket.emit('register-provider', { userID });
      console.log('Registered with', newSocket.id);
    });

    return newSocket;
}