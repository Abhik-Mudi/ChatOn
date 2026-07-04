import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';
import useSendMessage from '../../hooks/useSendMessages';
import useGetMessages from '../../hooks/useGetMessages';
import convertMongoDate from '../../utils/mongodbTimeConvert.js';
import useListenMessages from '../../hooks/useListenMessages.js';

const fallbackImage = "/Profile_avatar_placeholder_large.png";

// This component displays the message container where no chat is selected with a premium card design
const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center p-6 select-none animate-fade-in">
            <div className="p-5 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 border border-white/10 rounded-full mb-4 shadow-xl">
                <TiMessages className='w-14 h-14 text-blue-400 animate-bounce' />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
                Welcome, {authUser?.fullname || "Buddy"}! 👋
            </h2>
            <p className="text-white/60 text-sm max-w-sm">
                Select a contact from the sidebar list to start chatting, sharing, and connecting.
            </p>
        </div>
    )
}

// This component renders the message container where users can view and send messages
const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { authUser } = useAuthContext()
    const { onlineUsers } = useSocketContext();

    // Listen for incoming messages using the custom hook
    useListenMessages();

    const { sendMessage } = useSendMessage()
    const { loading, messages } = useGetMessages();

    const [message, setMessage] = useState("")
    const lastMessageRef = useRef()

    const isOnline = selectedConversation ? onlineUsers.includes(selectedConversation._id) : false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        await sendMessage(message)
        setMessage("");
    }

    // Clear the selected conversation when the component unmounts
    useEffect(() => {
        return () => {
            setSelectedConversation(null)
        }
    }, [setSelectedConversation])

    // Scroll to the last message when messages change
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 50)
    }, [messages])

    return (
        <div className='flex flex-col h-full w-full overflow-hidden'>
            {selectedConversation ? (
                <>
                    {/* Chat Header */}
                    <div className='flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-md'>
                        <div className="flex items-center gap-3">
                            {/* Back button (visible on mobile only) */}
                            <button 
                                onClick={() => setSelectedConversation(null)}
                                className="sm:hidden p-2 hover:bg-white/10 text-white rounded-xl active:scale-95 transition-all cursor-pointer"
                            >
                                <IoArrowBack className="w-5 h-5" />
                            </button>
                            
                            {/* User Avatar */}
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-slate-900">
                                    <img 
                                        src={selectedConversation.profilePic || fallbackImage} 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallbackImage; 
                                        }}
                                        className="w-full h-full object-cover"
                                        alt="user profile" 
                                    />
                                </div>
                                {isOnline && (
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse-online"></span>
                                )}
                            </div>

                            {/* User Name and Status */}
                            <div className="flex flex-col">
                                <span className='font-semibold text-white text-sm md:text-base leading-tight'>
                                    {selectedConversation.fullname}
                                </span>
                                <span className='text-xs text-white/50 leading-none mt-0.5'>
                                    {isOnline ? "Active now" : "Offline"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-slate-950/5'>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="loading loading-spinner text-blue-400"></span>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full text-white/40 text-sm'>
                                <span className="text-3xl mb-2">👋</span>
                                <span>Send a message to start the conversation</span>
                            </div>
                        ) : (
                            messages.map((message, idx) => {
                                const fromMe = message.senderId === authUser.id;
                                const chatClass = fromMe ? "chat-end" : "chat-start";
                                const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
                                const bubbleBg = fromMe 
                                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" 
                                    : "bg-white/10 text-white border border-white/5";

                                return (
                                    <div key={idx} ref={lastMessageRef} className={`chat ${chatClass} animate-fade-in`} >
                                        <div className="chat-image avatar">
                                            <div className="w-8 rounded-full border border-white/10 overflow-hidden bg-slate-900">
                                                <img
                                                    alt="avatar"
                                                    src={profilePic || fallbackImage}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = fallbackImage; 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="chat-header mb-1">
                                            <time className="text-[10px] text-white/40">{convertMongoDate(message.createdAt)}</time>
                                        </div>
                                        <div className={`chat-bubble ${bubbleBg} text-sm py-2.5 px-4 rounded-2xl max-w-[85%] md:max-w-[70%] break-words shadow-md`}>
                                            {message.message}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Input Form Footer */}
                    <div className='p-4 border-t border-white/10 bg-slate-950/20 backdrop-blur-md'>
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <input 
                                type="text" 
                                placeholder="Type a message..." 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                className="flex-1 px-4 py-3 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/65 text-white placeholder:text-white/35 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm" 
                            />
                            <button 
                                type="submit" 
                                className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
                            >
                                <IoIosSend className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    )
}

export default MessageContainer

