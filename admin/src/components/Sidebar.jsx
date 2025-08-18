import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r00 px-3 py-2 rounded-lg active:bg-blue-50">
            <img src={assets.add} alt="" className='w-5 h-5'/>
            <p className='hidden md:block'>Add Note</p>
            </NavLink>

            <NavLink to="/notes" className="flex items-center gap-3 border border-gray-300 border-r00 px-3 py-2 rounded-lg active:bg-blue-50">
            <img src={assets.pyqList} alt="" className='w-5 h-5'/>
            <p className='hidden md:block'>List Notes</p>
            </NavLink>

            <NavLink to="/users" className="flex items-center gap-3 border border-gray-300 border-r00 px-3 py-2 rounded-lg active:bg-blue-50">
            <img src={assets.userList} alt="" className='w-5 h-5'/>
            <p className='hidden md:block'>List Users</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar