import React from 'react'
import useGetConversation from '../../hooks/useGetConversation'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const fallbackImage = "/Profile_avatar_placeholder_large.png";

const handleError = (e) => {
    // 1. Prevent an infinite loop if the fallback image also fails
    e.target.onerror = null;
    // 2. Set the src to the fallback image
    e.target.src = fallbackImage;
};

// This component renders a list of users (conversations) in the sidebar
const Users = () => {
    const { loading, conversations } = useGetConversation();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    return (
        <div className='flex flex-col gap-1.5 h-full overflow-y-auto pr-1'>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className='loading loading-spinner text-blue-400'></span>
                </div>
            ) : conversations.length === 0 ? (
                <div className="text-center text-white/40 text-sm py-8">No chats available</div>
            ) : (
                conversations.map((conversation, idx) => {
                    const isOnline = onlineUsers.includes(conversation._id)
                    const isSelected = selectedConversation?._id === conversation._id

                    return (
                        <div 
                            key={idx} 
                            className={`flex text-sm md:text-base gap-3 hover:cursor-pointer rounded-2xl px-4 py-3 items-center transition-all duration-300 active:scale-[0.98] ${
                                isSelected 
                                    ? "bg-gradient-to-r from-blue-600/60 to-indigo-600/60 border border-white/10 shadow-lg shadow-blue-500/10 text-white" 
                                    : "hover:bg-white/5 text-white/80 hover:text-white border border-transparent"
                            }`}
                            onClick={() => setSelectedConversation(conversation)}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-slate-950/20">
                                    <img 
                                        src={conversation.profilePic || fallbackImage} 
                                        onError={handleError} 
                                        className="w-full h-full object-cover" 
                                        alt="user" 
                                    />
                                </div>
                                {isOnline && (
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse-online"></span>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className='font-semibold truncate'>{conversation.fullname || "Unknown User"}</span>
                                <span className="text-xs text-white/40 truncate">
                                    {isOnline ? "Online" : "Offline"}
                                </span>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Users

