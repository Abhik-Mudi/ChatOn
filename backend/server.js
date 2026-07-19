import path from "path"
import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";

// Load environment variables first
dotenv.config();

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.routes.js"
import messagesRouter from "./routes/message.routes.js"
import usersRouter from "./routes/user.routes.js"
import { app, pubClient, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
const allowedOrigins = ["http://localhost:3000"];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// API routes
app.use("/api/auth", authRouter) 
app.use("/api/messages", messagesRouter) 
app.use("/api/users", usersRouter) 

// Serve static assets in production or when serving static files is enabled
app.get("/", (req, res) => {
    res.send("API is running...");
})

// Start the server and connect to MongoDB
server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})

const gracefulShutdown = async (signal)=>{
    console.log(`Received ${signal}. Cleaning up zombie connections...`);

    try {
        for(const [socketId, socket] of io.sockets.sockets){
            const userId = socket.handshake.query.userId;
            if(userId && userId !== "undefined"){
                // Decrement the connection count for the user in Redis
                const connectionCount = await pubClient.hincrby("online_users", userId, -1);
                if(connectionCount <= 0){
                    await pubClient.hdel("online_users", userId);
                }
            }
            socket.disconnect(true)
        }

        const onlineUsers = await pubClient.hkeys("online_users");
        io.emit("getOnlineUsers", onlineUsers)

        await pubClient.quit()
        await subClient.quit()

        console.log("Zombie processes cleanup completed");

        process.exit(0)
    } catch (error) {
        console.error("Error during graceful shutdown:", error);
        process.exit(1);
    }
}

// Listen for Ctrl+C in terminal
process.on("SIGINT", async () => await gracefulShutdown("SIGINT"));
// Listen for standard termination signals (like Docker stopping the container)
process.on("SIGTERM", async () => await gracefulShutdown("SIGTERM"));
// Listen for Nodemon restart signals
process.on("SIGUSR2", async () => await gracefulShutdown("SIGUSR2"));