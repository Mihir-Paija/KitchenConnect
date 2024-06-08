import React, { createContext, useState, useEffect, useContext } from "react";
import {io} from 'socket.io-client'
import {SOCKET_URL} from "@env";
import { AuthContext } from "./authContext";
import { UserTypeContext } from './userTypeContext';


const ENDPOINT = `${SOCKET_URL}`

export const SocketContext = createContext();

export const SocketProvider = ({children}) =>{
    
    const [socket, setSocket] = useState(null);
    const [authState] = useContext(AuthContext);
    const [userType] = useContext(UserTypeContext);

    useEffect(() =>{
        if(!authState){
          return 
        }

        const newSocket = io(ENDPOINT)
        setSocket(newSocket);
        console.log(newSocket);
        console.log(authState)

        const providerID = authState.authToken;
        if(authState.authType === 'provider'){
          newSocket.on('connect', () => {
              newSocket.emit('register-provider', { providerID });
              console.log('Registered with', socket.id);
          });
        }


    }, [,authState])

    return (
      <SocketContext.Provider value={[socket, setSocket]}>
        {children}
      </SocketContext.Provider>
    );
}