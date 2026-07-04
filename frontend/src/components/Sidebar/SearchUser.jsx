import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

// This component allows users to search for other users by their full name
// When a user is found, it sets the selected conversation to that user
const SearchUser = () => {
  const [search, setSearch] = useState("")
  const {setSelectedConversation}=useConversation()
  const {conversations}=useGetConversation()

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3) return toast.error("Search term must be 3 characters long")
    
    const conversation=conversations.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase())
    )

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }else toast.error("No such user found")

  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 w-full'>
      <div className='relative flex-1'>
        <input 
          type="text" 
          value={search} 
          onChange={(e)=>setSearch(e.target.value)} 
          placeholder='Search friends...' 
          className='w-full pl-10 pr-4 py-2.5 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/65 text-white placeholder:text-white/35 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm' 
        />
        <FaSearch className='absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-3.5 h-3.5' />
      </div>
      <button 
        type='submit' 
        className='p-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center'
      >
        <FaSearch className='w-3.5 h-3.5' />
      </button>
    </form>
  )
}

export default SearchUser

