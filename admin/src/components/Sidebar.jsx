import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = ({ setSidebarOpen }) => {
  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm'>
      <div className='p-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Admin Panel</h2>
        <p className='text-sm text-gray-600'>Manage your content</p>
      </div>
      
      <div className='flex flex-col gap-2 p-4'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.add} alt="" className='w-5 h-5'/>
          <span>Add Pyq</span>
        </NavLink>

        <NavLink 
          to="/notes" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.pyqList} alt="" className='w-5 h-5'/>
          <span>List Notes</span>
        </NavLink>

        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.userList} alt="" className='w-5 h-5'/>
          <span>List Users</span>
        </NavLink>

        <NavLink 
          to="/pyq" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.pyq} alt="" className='w-5 h-5'/>
          <span>List PYQ</span>
        </NavLink>

        <NavLink 
          to="/community" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.community} alt="" className='w-5 h-5'/>
          <span>List Communities</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;