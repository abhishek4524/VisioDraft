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
import CreateCommunity from './pages/CreateCommunity';
import CommunityChat from './pages/CommunityChat';
import ChangePassword from './pages/ChangePassword';
import AboutDeveloper from "./pages/AboutDeveloper";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  return (
    <div>

            <ToastContainer position="top-right" autoClose={5000} />
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/pyqs' element={<Pyqs/>} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/upload-notes' element={<UploadNotes/>} />
        <Route path='/ask-ai' element={<AskAi/>} />
        <Route path='/profile' element={<UserProfile />} />
         <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/community' element={<Community />} />
        <Route path='/community/create' element={<CreateCommunity />} />
        <Route path='/community/:id/chat' element={<CommunityChat />} />
        <Route path="/change-password" element={<ChangePassword />} />
         <Route path="/about-developer" element={<AboutDeveloper />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </div>
  )
}

export default App