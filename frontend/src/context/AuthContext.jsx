import { createContext, useContext, useState } from "react";

// creates a container named AuthContext to hold authentication state and 
// createContext creates the container
export const AuthContext= createContext();

// This context provides authentication state and functions to manage the authenticated user
// When this hook is used, it returns the container that holds the authentication state
export const useAuthContext=()=>{
    return useContext(AuthContext)
}

// This provider component wraps the application and provides the authentication context
export const AuthContextProvider=({children})=>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chatUser")) || null)

    // returns the provided context with authUser and setAuthUser to all the children components
    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>
}