import path from "path"
import express from "express"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";

// Load environment variables first
dotenv.config();

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.routes.js"
import messagesRouter from "./routes/message.routes.js"
import usersRouter from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// API routes
app.use("/api/auth", authRouter) 
app.use("/api/messages", messagesRouter) 
app.use("/api/users", usersRouter) 

// Serve static assets in production or when serving static files is enabled
if (process.env.NODE_ENV === "production" || process.env.SERVE_STATIC === "true") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

// Start the server and connect to MongoDB
server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})