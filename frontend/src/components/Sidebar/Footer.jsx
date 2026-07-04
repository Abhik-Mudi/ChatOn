import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';

// This component renders the footer of the sidebar with a logout button
const Footer = () => {
  const {loading, logout}=useLogout();
  return (
    <div 
      className='flex items-center gap-3 py-2.5 px-4 hover:bg-red-500/10 rounded-2xl text-rose-400 hover:text-rose-300 transition-all duration-300 cursor-pointer self-start w-auto select-none active:scale-[0.98]' 
      onClick={logout}
    >
      {loading ? (
        <span className='loading loading-spinner loading-sm'></span>
      ) : ( 
        <>
          <RiLogoutBoxLine className='w-5 h-5'/>
          <span className="text-sm font-semibold tracking-wide">Logout</span>
        </>
      )}
    </div>
  )
}

export default Footer

