import React from 'react'
import SearchUser from './SearchUser'
import Users from './Users'
import Footer from './Footer'

// This component renders the sidebar which includes a search bar, list of users, and a footer with logout functionality
const Sidebar = () => {
  return (
    <div className='flex flex-col h-full w-full text-md md:text-xl'>
      <div className="px-1">
        <SearchUser />
      </div>
      <div className='divider my-4 border-white/10'></div>
      <div className="flex-1 overflow-hidden min-h-0">
        <Users />
      </div>
      <div className='border-t border-white/10 pt-3 mt-3 px-1'>
        <Footer />
      </div>
    </div>
  )
}

export default Sidebar

