import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import Notes from './pages/Notes';
import Users from './pages/Users';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import $ from 'jquery';
import 'jquery.ripples';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const rippleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Initialize water ripple effect
  useEffect(() => {
    const $el = $(rippleRef.current);

    const supportsWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext('webgl') || c.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    })();

    const cfg = {
      resolution: 256,
      dropRadius: 18,
      perturbance: 0.02,
      interactive: true,
      throttleMs: 80
    };

    function initRipples() {
      $el.ripples({
        resolution: cfg.resolution,
        dropRadius: cfg.dropRadius,
        perturbance: cfg.perturbance,
        interactive: cfg.interactive,
        crossOrigin: ''
      });
    }

    function destroyRipples() {
      try {
        $el.ripples('destroy');
      } catch {}
    }

    if (supportsWebGL) {
      initRipples();
    }

    let lastTime = 0;
    $el.on('pointermove', function (e) {
      if (e.target.closest && e.target.closest('.no-ripple')) return;

      const now = Date.now();
      if (now - lastTime < cfg.throttleMs) return;
      lastTime = now;

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      $el.ripples('drop', x, y, Math.max(8, cfg.dropRadius * 0.6), 0.02);
    });

    $el.on('click', function (e) {
      if (e.target.closest && e.target.closest('.no-ripple')) return;
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      $el.ripples('drop', x, y, cfg.dropRadius * 1.4, 0.06);
    });

    window.addEventListener('resize', () => {
      destroyRipples();
      if (supportsWebGL) initRipples();
    });

    return () => {
      destroyRipples();
    };
  }, []);

  return (
    <div
      ref={rippleRef}
      style={{
        minHeight: '100vh',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}
    >
      <div className='bg-gray-50/80 min-h-screen'>
        <ToastContainer />
        {token === '' ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/notes' element={<Notes token={token} />} />
                  <Route path='/users' element={<Users token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
