import React, { useState, useEffect } from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pyqs from './pages/Pyqs';
import Notes from './pages/Notes';
import UploadNotes from './pages/UploadNotes';
import AskAi from './pages/AskAi';
import SetupProfile from './pages/setupProfile';
import UserProfile from './pages/UserProfile';
import Chat from './pages/Chat';
import Community from './pages/Community';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/setup-profile' element={<SetupProfile/>} />
        <Route path='/pyqs' element={<Pyqs/>} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/upload-notes' element={<UploadNotes/>} />
        <Route path='/ask-ai' element={<AskAi/>} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/community' element={<Community />} />
      </Routes>
    </div>
  )
}

export default App