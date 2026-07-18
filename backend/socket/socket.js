import { Server } from "socket.io";
import Redis from "ioredis";
import http from "http"
import express from "express"
import { createAdapter } from "@socket.io/redis-adapter";

const app=express();

// Setting up Redis clients for pub/sub functionality to enable scaling of the socket.io server across multiple instances
const pubClient=new Redis(process.env.REDIS_URL);
const subClient=pubClient.duplicate();

const server=http.createServer(app)

// Importing the necessary modules for socket.io
// and creating a new instance of Server with the HTTP server
const io=new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, "http://localhost:3000"] : "*",
        methods: ["GET", "POST"]
    },
    adapter: createAdapter(pubClient, subClient)
})

// Setting up event listeners for the pubClient to log connection and error events
pubClient.on("connect", ()=>{
    console.log("pub client connected")
})

pubClient.on("error", (err)=>{
    console.log("pub client error: ", err)
})

// Listening for new connections to the socket.io server
// When a user connects, their socket ID is stored in the userSocketMap
// and the list of online users is emitted to all connected clients
// When a user disconnects, their socket ID is removed from the userSocketMap
io.on("connection", async (socket)=>{
    console.log("User connected:", socket.id);

    const userId=socket.handshake.query.userId
    if(userId && userId!=='undefined'){
        // Join the user to a room with their userId so that we can send messages to them specifically
        socket.join(userId);
        // Increment the connection count for the user in Redis
        const connectionCount=await pubClient.hincrby("online_users", userId, 1);

        // If this is the first connection for the user, emit the list of online users to all connected clients
        if(connectionCount === 1){
            const onlineUsers=await pubClient.hkeys("online_users")
            io.emit("getOnlineUsers", onlineUsers);
        }
    }

    socket.on("disconnect", async ()=>{
        console.log("User disconnected: ", socket.id);
        
        if(userId && userId!=="undefined"){
            
            // Decrement the connection count for the user in Redis
            const connectionCount = await pubClient.hincrby("online_users", userId, -1);
            
            // If this was the last connection for the user, emit the updated list of online users to all connected clients
            if(connectionCount <=0){
                await pubClient.hdel("online_users", userId);

                const onlineUsers = await pubClient.hkeys("online_users");
                io.emit("getOnlineUsers", onlineUsers);
            }
        }
    })
})


export {app, io, server, pubClient}