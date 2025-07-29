import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App