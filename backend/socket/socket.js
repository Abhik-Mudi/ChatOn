import { Server } from "socket.io";
import http from "http"
import express from "express"

const app=express();

const server=http.createServer(app)

// Importing the necessary modules for socket.io
// and creating a new instance of Server with the HTTP server
const io=new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, "http://localhost:3000"] : "*",
        methods: ["GET", "POST"]
    }
})

// Function to get the socket ID of a receiver based on their user ID
export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap={} // Object to map user IDs to their socket IDs

// Listening for new connections to the socket.io server
// When a user connects, their socket ID is stored in the userSocketMap
// and the list of online users is emitted to all connected clients
// When a user disconnects, their socket ID is removed from the userSocketMap
io.on("connection", (socket)=>{
    console.log("User connected:", socket.id);

    const userId=socket.handshake.query.userId
    if(userId!="undefined") userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("User disconnected: ", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


export {app, io, server}