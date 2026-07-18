import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js";
import { io } from "../socket/socket.js";

// This function handles sending a message
// It checks if a conversation exists between the sender and receiver, creates one if it doesn't,
// creates a new message, updates the conversation with the new message, and emits the new message to the receiver's socket
// Finally, it sends the new message back in the response
export const sendMessage=async (req, res)=>{
    try {
        const {message}=req.body;
        const {id : receiverId}=req.params;
        const senderId=req.user._id;

        let conversation=await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage= await Message.create({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
            await conversation.save();
        }

        io.to(receiverId).emit("newMessage", newMessage)

        res.send(newMessage)
    } catch (error) {
        console.log(error.message)
       res.status(500).json({error: "Internal server error"}) 
    }
}

// This function retrieves messages from a conversation between the sender and receiver
// It checks if a conversation exists, populates the messages, and sends them back in the response
export const getMessage=async (req, res)=>{
    try {
        const {id: userToChatId} =req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants: { $all :[senderId, userToChatId]}
        }).populate("messages")

        if(!conversation) res.status(200).json([])

        res.send(conversation.messages)
    } catch (error) {
        console.log(error.message)
       res.status(500).json({error: "Internal server error"}) 
    }
}