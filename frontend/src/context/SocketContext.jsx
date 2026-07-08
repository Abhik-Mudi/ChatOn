import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {io} from "socket.io-client"

export const SocketContext=createContext();

// This context provides the socket connection and online users list
export const useSocketContext=()=>{
    return useContext(SocketContext)
}

// This provider component wraps the application and provides the socket context
// It connects to the socket server and listens for online users
export const SocketContextProvider=({children})=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser}=useAuthContext();

    useEffect(() => {
      if(authUser){
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 
            (import.meta.env.DEV ? "http://localhost:5000" : window.location.origin);

        const socket=io(backendUrl, {
            query: {
                userId: authUser.id
            }
        })

        setSocket(socket)

        socket.on("getOnlineUsers", (users)=>{
            setOnlineUsers(users)
        })

        return ()=> socket.close();
      } else {
        if(socket){
            socket.close();
            setSocket(null)
        }
      }

    }, [authUser])
    

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}> 
            {children}
        </SocketContext.Provider>
    )
}