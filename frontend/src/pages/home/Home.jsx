import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/MessageContainer/MessageContainer'
import useConversation from '../../zustand/useConversation'

// This component serves as the main home page of the application
const Home = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Main glass card container */}
      <div className="flex w-full h-screen sm:h-[85vh] sm:max-w-5xl bg-slate-900/40 rounded-none sm:rounded-3xl shadow-2xl backdrop-blur-xl border-none sm:border border-white/10 items-stretch overflow-hidden">
        
        {/* Sidebar wrapper */}
        {/* On mobile: show if no conversation is selected. On desktop: always show and set width */}
        <div className={`
          ${selectedConversation ? 'hidden' : 'flex'} 
          sm:flex flex-col w-full sm:w-[320px] md:w-[360px] h-full border-r border-white/10 py-5 px-4 bg-slate-950/20
        `}>
          <Sidebar />
        </div>

        {/* Message container wrapper */}
        {/* On mobile: show if a conversation is selected. On desktop: always show and expand */}
        <div className={`
          ${!selectedConversation ? 'hidden' : 'flex'} 
          sm:flex flex-col flex-1 h-full bg-slate-950/10
        `}>
          <MessageContainer />
        </div>
      
      </div>
    </div>
  )
}

export default Home