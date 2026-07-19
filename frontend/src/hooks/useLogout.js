import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';

// This hook handles user logout functionality
const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();
    const { socket } = useSocketContext();

    const logout = async () => {
        setLoading(true)

        try {
            const res=await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            })
            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            
            if(socket){
                socket.emit("manual_logout")
            }

            localStorage.removeItem("chatUser")
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, logout}
}

export default useLogout
